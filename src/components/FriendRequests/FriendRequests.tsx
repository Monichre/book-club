import { UsersTable } from '@/components/UsersTable';
import { NotificationsContext } from '@/features/notifications/NotificationsContext';
import { Button, Card, Text, User } from '@nextui-org/react';
import * as React from 'react';
import { useContext } from 'react';

export type FriendRequestsProps = {}

export const FriendRequests: React.FunctionComponent<
  FriendRequestsProps
> = ({}) => {
  const { notifications, friendRequests, handleAcceptFriendRequest } =
    useContext(NotificationsContext)

  const columns = [
    { name: 'FROM', uid: 'from' },
    { name: 'STATUS', uid: 'status' },
    { name: 'ACTIONS', uid: 'actions' },
  ]

  if (!friendRequests) {
    return null
  }

  const users = friendRequests?.map(({ from, ...rest }) => ({
    from,
    ...rest,
    actions: '',
  }))

  const renderCell = (item, columnKey) => {
    const accept = async () => {
      await handleAcceptFriendRequest(item)
    }
    const cellValue = item[columnKey]

    switch (columnKey) {
      case 'from':
        return (
          <User squared src={item.avatar} name={cellValue.name} css={{ p: 0 }}>
            {cellValue.email}
          </User>
        )

      case 'actions':
        return (
          <Button.Group color='gradient' ghost>
            <Button onClick={accept}>Accept</Button>
            <Button>Ignore</Button>
          </Button.Group>
        )
      default:
        return cellValue
    }
  }

  return (
    <Card css={{ p: '$6' }}>
      <Card.Header>
        <Text h4 css={{ lineHeight: '$xs' }}>
          Friend Requests
        </Text>
      </Card.Header>
      <Card.Body css={{ py: '$2' }}>
        <UsersTable columns={columns} users={users} renderCell={renderCell} />
      </Card.Body>
    </Card>
  )
}
