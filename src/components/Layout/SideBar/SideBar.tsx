import UserContext from '@/features/auth/UserContext';
import { useStore } from '@/lib/Store';
import { Avatar, Collapse, Grid, Text } from '@nextui-org/react';
import { useUser } from '@supabase/auth-helpers-react';
import * as React from 'react';
import { useContext } from 'react';

import { SideBarWrapper } from './SideBar.style';

export type SideBarProps = {}

export const SideBar: React.FunctionComponent<SideBarProps> = (
  props: SideBarProps
) => {
  const user = useUser()
  const { currentUser } = useContext(UserContext)

  const bookClubs = currentUser?.book_clubs

  const { channels } = useStore({ userId: user?.id })

  const slugify = (text) => {
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/[^\w-]+/g, '') // Remove all non-word chars
      .replace(/--+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, '') // Trim - from end of text
  }

  const newChannel = async () => {
    const slug = prompt('Please enter your name')
    if (slug) {
      // addChannel(slugify(slug), user.id)
    }
  }
  return (
    <SideBarWrapper>
      <Grid.Container gap={2}>
        <Grid>
          <Text h2>Chats</Text>
          <Collapse.Group shadow>
            {channels.map((channel) => {
              return (
                <Collapse
                  title={<Text h4>{channel.name}</Text>}
                  // subtitle='4 unread messages'
                  contentLeft={
                    <Avatar
                      size='lg'
                      src='https://i.pravatar.cc/150?u=a042581f4e29026024d'
                      color='secondary'
                      bordered
                      squared
                    />
                  }
                >
                  <Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </Text>
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
                      title={<Text h4>Janelle Lenard</Text>}
                      subtitle='3 incompleted steps'
                      contentLeft={
                        <Avatar
                          size='lg'
                          src='https://i.pravatar.cc/150?u=a042581f4e29026704d'
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
