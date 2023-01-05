import { sendFriendRequest } from '@/lib/Store';
import { Avatar, Button, Grid, Popover, Row, Text, User } from '@nextui-org/react';
import { useState } from 'react';

export type FriendRequestProps = {
  invitee: any
  // handleFriendRequentSent: any
  requestor: any
}
export const FriendRequest = ({ invitee, requestor }) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleFriendRequest = async () => {
    const request = await sendFriendRequest({
      requestorId: requestor?.id,
      inviteeId: invitee?.id,
    })
  }

  return (
    <Popover isOpen={isOpen} onOpenChange={setIsOpen}>
      <Popover.Trigger>
        {invitee?.avatar_url ? (
          <User
            src={invitee.avatar_url}
            size='xl'
            as='button'
            name={invitee.name || invitee.email}
            description={invitee.status}
          />
        ) : (
          <Avatar
            text={invitee.name || invitee.email}
            size='xl'
            // as="button"
            color='gradient'
            textColor='white'
          />
        )}
      </Popover.Trigger>
      <Popover.Content css={{ px: '$4', py: '$2' }}>
        <Grid.Container
          css={{ borderRadius: '14px', padding: '0.75rem', maxWidth: '330px' }}
        >
          <Row justify='center' align='center'>
            <Text b>New Friend Request</Text>
          </Row>
          <Row>
            <Text>Send {invitee.name || invitee.email} a friend request</Text>
          </Row>
          <Grid.Container justify='space-between' alignContent='center'>
            <Grid>
              <Button size='sm' light onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
            </Grid>
            <Grid>
              <Button
                size='sm'
                shadow
                color='error'
                onClick={handleFriendRequest}
              >
                Send
              </Button>
            </Grid>
          </Grid.Container>
        </Grid.Container>
      </Popover.Content>
    </Popover>
  )
}
