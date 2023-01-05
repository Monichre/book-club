import { NotificationsHub } from '@/components/Notifications';
import UserContext from '@/features/auth/UserContext';
import { supabase } from '@/lib/Store';
import { createContext, FunctionComponent, useContext, useEffect, useRef, useState } from 'react';

export const NotificationsContext = createContext({
  notifications: [],
  friendRequests: [],
  newNotification: null,
  // addFriendRequestNotification: (latest) => {},
})

interface NotificationsProviderProps {
  children: any
}

const NotificationsProvider: FunctionComponent<NotificationsProviderProps> = ({
  children,
}) => {
  const [friendRequests, setFriendRequests] = useState([])
  console.log('friendRequests: ', friendRequests)
  const [notifications, setNotifications] = useState([])
  console.log('notifications: ', notifications)
  const [newNotification, setNewNotification] = useState(null)
  const { currentUser } = useContext(UserContext)

  const handlePayload = (payload) => {
    const arr = friendRequests?.length
      ? [...friendRequests, payload.new]
      : [payload.new]
    setFriendRequests(arr)

    const notificationsArr = notifications?.length
      ? [...notifications, payload.new]
      : [payload.new]
    setNotifications(notificationsArr)
    setNewNotification(payload.new)
  }

  useEffect(() => {
    if (currentUser) {
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
          handlePayload
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
  }, [])

  // useEffect(() => {
  //   if (notifications?.length) {
  //     setNewNotification(notifications[notifications?.length - 1])
  //   }
  // }, [notifications])

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
