import UserContext from '@/features/auth/UserContext';
import { useStore } from '@/lib/Store';
import { Avatar, Button, Collapse, Grid, Text } from '@nextui-org/react';
import { useUser } from '@supabase/auth-helpers-react';
import { Space } from 'antd';
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

  const [bookClubsWithChannel, setbookClubsWithChannel] = React.useState([])

  const bookClubs = currentUser?.book_clubs
  // getTotalBookClubMembers
  // getBookClub

  const { channels } = useStore({ userId: user?.id })
  console.log('channels: ', channels)

  useEffect(() => {
    if (channels?.length && bookClubs?.length) {
      console.log('channels: ', channels)
      const enriched = bookClubs.map((bookClub) => {
        console.log('bookClub: ', bookClub)
        const channel = channels.find(
          (channel) => bookClub.id === channel.book_club_id
        )
        return {
          ...bookClub,
          channel,
        }
      })
      console.log('enriched: ', enriched)
      setbookClubsWithChannel(enriched)
    }
  }, [channels, bookClubs])

  return (
    <SideBarWrapper>
      <Grid.Container gap={2}>
        <Grid>
          <Text h2>Book Clubs</Text>
          <Collapse.Group>
            {bookClubsWithChannel?.length
              ? bookClubsWithChannel.map((bookClub) => {
                  const { channel } = bookClub
                  console.log('channel: ', channel)
                  const bookClubLink = `/book-clubs/${bookClub.id}`
                  const channelLink = channel
                    ? `${bookClubLink}/channels/${channel.id}`
                    : null
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
                      <Space>
                        <Button shadow color='gradient' auto>
                          <Link
                            href={{
                              pathname: bookClubLink,
                            }}
                          >
                            Home
                          </Link>
                        </Button>
                        <Button shadow color='gradient' auto>
                          <Link
                            href={{
                              pathname: channelLink,
                            }}
                          >
                            Chat
                          </Link>
                        </Button>
                      </Space>
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
