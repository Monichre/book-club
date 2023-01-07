import { FriendRequest } from '@/components/SearchResults/FriendRequest';
import UserContext from '@/features/auth/UserContext';
import { Button, Grid, Modal, Text } from '@nextui-org/react';
import * as React from 'react';
import { useContext, useEffect } from 'react';

export type SearchResultsProps = {
  results: any
}

export const SearchResults: React.FunctionComponent<SearchResultsProps> = ({
  results,
}: SearchResultsProps) => {
  const { currentUser } = useContext(UserContext)
  const [open, setOpen] = React.useState(results)

  const close = () => setOpen(false)

  useEffect(() => {
    if (results?.length > 0) {
      setOpen(true)
    }
  }, [results])

  return (
    <Modal
      closeButton
      aria-labelledby='modal-title'
      open={open}
      onClose={close}
    >
      <Modal.Header>
        <Text id='modal-title' size={18}>
          Welcome to
          <Text b size={18}>
            NextUI
          </Text>
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Grid.Container gap={2} justify='flex-start'>
          {results &&
            results.map((result, index) => (
              <Grid key={index}>
                <FriendRequest
                  key={result.id}
                  invitee={result}
                  requestor={currentUser}
                  // handleFriendRequentSent={addFriendRequestNotification}
                />
              </Grid>
            ))}
        </Grid.Container>
      </Modal.Body>
      <Modal.Footer>
        <Button auto flat color='error' onClick={close}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
