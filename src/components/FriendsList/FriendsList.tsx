import UserContext from '@/features/auth/UserContext';
import { getUsersFriends } from '@/lib/Store';
import { Avatar } from '@nextui-org/react';
import * as React from 'react';

import { FriendsListWrapper } from './FriendsList.style';

export type FriendsListProps = {
  onClick?: (friend) => {}
}

interface FriendAvatarProps {
  onClick?: (friend) => {}
  friend: any
}

const FriendAvatar: React.FC<FriendAvatarProps> = ({ friend, onClick }) => {
  console.log('friend: ', friend)
  const handleClick = () => {
    onClick(friend)
  }

  return (
    <Avatar
      onClick={handleClick}
      key={friend.id}
      size='lg'
      pointer
      // src={friend.avatar_url || null}
      text={friend.name || friend.email}
      stacked
    />
  )
}

export const FriendsList: React.FunctionComponent<FriendsListProps> = ({
  onClick,
}: FriendsListProps) => {
  const { currentUser }: any = React.useContext(UserContext)
  const [friends, setFriends]: any = React.useState([])

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
            }) => <FriendAvatar friend={friend} onClick={onClick} />
          )}
      </Avatar.Group>
    </FriendsListWrapper>
  )
}
