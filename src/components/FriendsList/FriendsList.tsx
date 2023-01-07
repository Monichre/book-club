import UserContext from '@/features/auth/UserContext';
import { getUsersFriends } from '@/lib/Store';
import { Avatar } from '@nextui-org/react';
import * as React from 'react';

import { FriendsListWrapper } from './FriendsList.style';

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

  React.useEffect(() => {
    if (currentUser) {
      const res = getUsersFriends(currentUser.id).then((res) => {
        console.log('res: ', res)
        setFriends(res)
      })
    }
  }, [currentUser])

  return (
    <FriendsListWrapper>
      <Avatar.Group count={friends?.length}>
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
            }) => (
              <Avatar
                key={friend.id}
                size='lg'
                pointer
                src={friend.avatar_url}
                stacked
              />
            )
          )}
      </Avatar.Group>
    </FriendsListWrapper>
  )
}
