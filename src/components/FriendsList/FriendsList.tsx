import UserContext from '@/features/auth/UserContext';
import * as React from 'react';

import { FriendsListWrapper, ListElement } from './FriendsList.style';

export type FriendsListProps = {}

export const FriendsList: React.FunctionComponent<
  FriendsListProps
> = ({}: FriendsListProps) => {
  const { currentUser }: any = React.useContext(UserContext)
  const [friends, setFriends]: any = React.useState([])
  // console.log('friends: ', friends)
  // const getFriends = useCallback(() => {
  //   fetchUsersFriends(currentUser.id).then(({ friends: friendsList }) =>
  //     return friendsList
  //   )
  // }, [friends, currentUser])

  // React.useEffect(() => {
  //   if (currentUser && (!friends || !friends?.length)) {
  //     getFriends()
  //   }
  // }, [currentUser, friends])

  return (
    <FriendsListWrapper>
      <ListElement>
        {friends?.length &&
          friends.map(
            (friend: {
              name:
                | string
                | number
                | boolean
                | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                | React.ReactFragment
                | React.ReactPortal
                | null
                | undefined
            }) => <li>{friend.name}</li>
          )}
      </ListElement>
    </FriendsListWrapper>
  )
}
