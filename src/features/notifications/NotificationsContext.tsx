import { NotificationsHub } from '@/components/Notifications';
import UserContext from '@/features/auth/UserContext';
import { acceptFriendRequest, getFriendRequests, supabase } from '@/lib/Store';
import { createContext, FunctionComponent, useContext, useEffect, useMemo, useRef, useState } from 'react';

export const NotificationsContext = createContext({
  notifications: {},
  friendRequests: [],
  newNotification: null,
  handleAcceptFriendRequest: (req) => {},
  // addFriendRequestNotification: (latest) => {},
})

const objToArray = (obj) => Object.keys(obj).map((key) => obj[key])
const arrayToMap = (arr) =>
  arr.reduce((acc, item) => {
    const { id } = item
    if (!acc[id]) {
      acc[id] = item
    }
    return acc
  }, {})

interface NotificationsProviderProps {
  children: any
}

const NotificationsProvider: FunctionComponent<NotificationsProviderProps> = ({
  children,
}) => {
  const [friendRequests, setFriendRequests] = useState([])

  const [notifications, setNotifications] = useState({})

  const [newNotification, setNewNotification] = useState(null)
  const { currentUser } = useContext(UserContext)

  const handleFriendRequestNotifications = (latest) => {
    const arr = friendRequests?.length ? [...friendRequests, latest] : [latest]
    setFriendRequests(arr)

    // const notificationsArr = notifications?.length
    //   ? [...notifications, latest]
    //   : [latest]
    // setNotifications(notificationsArr)
  }

  const handleAcceptFriendRequest = useMemo(
    () => async (request) => {
      console.log('request: ', request)
      const status = await acceptFriendRequest(request)
      console.log('status: ', status)
      const requests = friendRequests.filter((req) => req.id !== request.id)
      console.log('requests: ', requests)

      setFriendRequests(requests)
    },
    [acceptFriendRequest, friendRequests]
  )

  const handleSubscription = (payload) => {
    handleFriendRequestNotifications(payload.new)
    setNewNotification(payload.new)
  }

  const retrieveFriendRequests = async (user) => {
    const requests = await getFriendRequests(user.id)

    setFriendRequests(requests)
  }

  useEffect(() => {
    if (currentUser) {
      retrieveFriendRequests(currentUser)
      const friendRequestListener = supabase
        .channel(`public:friend_requests:invitee_id=eq.${currentUser.id}`)
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'friend_requests',
            filter: `invitee_id=eq.${currentUser.id}`,
          },
          handleSubscription
        )
        .on(
          'postgres_changes',
          { event: 'UPDATE', schema: 'public', table: 'friend_requests' },
          (payload) => {
            console.log('payload: ', payload)
          }
        )
        .subscribe()
    }

    // return () => {
    //   // supabase.removeChannel(`public:friend_requests`)
    // }
  }, [currentUser])

  useEffect(() => {
    if (friendRequests?.length) {
      const uniques = friendRequests.filter(
        (req) => !Object.keys(notifications).includes(req.id)
      )

      setNotifications((notifications) => ({
        ...notifications,
        ...arrayToMap(uniques),
      }))
    }
  }, [friendRequests])

  let ref: any = useRef<null | Function>(null)

  useEffect(() => {
    if (ref?.current && newNotification) ref.current(() => newNotification)
    // return () => {
    //   ref = null
    // }
  }, [newNotification, ref])

  return (
    <NotificationsContext.Provider
      value={{
        friendRequests,
        notifications,
        newNotification,
        handleAcceptFriendRequest,
      }}
    >
      <NotificationsHub
        children={(add: Function) => {
          ref.current = add
        }}
      />
      {children}
    </NotificationsContext.Provider>
  )
}

export default NotificationsProvider
