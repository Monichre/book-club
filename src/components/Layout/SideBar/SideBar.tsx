import UserContext from '@/features/auth/UserContext';
import { useStore } from '@/lib/Store';
import { Avatar, Button, Collapse, Grid, Text } from '@nextui-org/react';
import { useUser } from '@supabase/auth-helpers-react';
import Link from 'next/link';
import * as React from 'react';
import { useContext, useEffect } from 'react';

import { SideBarWrapper } from './SideBar.style';

export type SideBarProps = {}

export const SideBar: React.FunctionComponent<SideBarProps> = (
  props: SideBarProps
) => {
  const user = useUser()
  const { currentUser } = useContext(UserContext)

  const [userChannels, setUserChannels] = React.useState([])

  const bookClubs = currentUser?.book_clubs
  // getTotalBookClubMembers
  // getBookClub

  const { channels } = useStore({ userId: user?.id })
  console.log('channels: ', channels)

  useEffect(() => {
    if (channels?.length && bookClubs?.length) {
      const channelsWithBookClubData = channels.map((channel) => {
        const bookClub = bookClubs.find(
          (bookClub) => bookClub.id === channel.book_club_id
        )
        return {
          ...channel,
          bookClub,
        }
      })
      console.log('channelsWithBookClubData: ', channelsWithBookClubData)

      setUserChannels(channelsWithBookClubData)
    }
  }, [channels, bookClubs])

  return (
    <SideBarWrapper>
      <Grid.Container gap={2}>
        <Grid>
          <Text h2>Chats</Text>
          <Collapse.Group shadow>
            {userChannels.map((channel) => {
              const link = `/book-clubs/${channel.bookClub.id}/channels/${channel.id}`
              console.log('link: ', link)
              return (
                <Collapse
                  title={<Text h4>{channel.name}</Text>}
                  // subtitle='4 unread messages'
                  contentLeft={
                    <Avatar
                      size='lg'
                      src={channel.bookClub.image_url}
                      color='secondary'
                      bordered
                      squared
                    />
                  }
                >
                  <Button shadow color='gradient' auto>
                    <Link
                      href={{
                        pathname: link,
                      }}
                    >
                      {channel.name}
                    </Link>
                  </Button>
                </Collapse>
              )
            })}
          </Collapse.Group>
        </Grid>
        <Grid>
          <Text h2>Book Clubs</Text>
          <Collapse.Group>
            {bookClubs
              ? bookClubs.map((bookClub) => {
                  return (
                    <Collapse
                      title={<Text h4>{bookClub?.name}</Text>}
                      subtitle='3 incompleted steps'
                      contentLeft={
                        <Avatar
                          size='lg'
                          src={bookClub.image_url}
                          color='success'
                          bordered
                          squared
                        />
                      }
                    >
                      <Text>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat.
                      </Text>
                    </Collapse>
                  )
                })
              : null}
          </Collapse.Group>
        </Grid>
      </Grid.Container>
    </SideBarWrapper>
  )
}
