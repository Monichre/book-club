import { Avatar, Button, Navbar as NextUiNav, Text } from '@nextui-org/react';
import { useSessionContext, useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import * as React from 'react';

export type NavBarProps = {}

export const NavBar: React.FunctionComponent<NavBarProps> = (
  props: NavBarProps
) => {
  const { isLoading, session, error } = useSessionContext()
  const user = useUser()
  const supabaseClient = useSupabaseClient()

  console.log('user: ', user)
  const handleSignOut = async () => await supabaseClient.auth.signOut()
  return (
    <NextUiNav isBordered variant={'sticky'}>
      <NextUiNav.Brand>
        <Text b color='inherit' hideIn='xs'>
          Book Club
        </Text>
      </NextUiNav.Brand>
      <NextUiNav.Content hideIn='xs'>
        <NextUiNav.Link href='#'>Features</NextUiNav.Link>
        <NextUiNav.Link isActive href='#'>
          Customers
        </NextUiNav.Link>
        <NextUiNav.Link href='#'>Pricing</NextUiNav.Link>
        <NextUiNav.Link href='#'>Company</NextUiNav.Link>
      </NextUiNav.Content>
      {user ? (
        <NextUiNav.Content>
          <NextUiNav.Item>
            <Avatar
              size='lg'
              src='https://i.pravatar.cc/150?u=a042581f4e25056704b'
              color='gradient'
              bordered
            />
          </NextUiNav.Item>
          <NextUiNav.Item>
            <Button auto flat onClick={handleSignOut} href='#'>
              Sign Out
            </Button>
          </NextUiNav.Item>
        </NextUiNav.Content>
      ) : (
        <NextUiNav.Content>
          {/* <NextUiNav.Link color='inherit' href='#'>
            Login
          </NextUiNav.Link>
          <NextUiNav.Item>
            <Button auto flat as={Link} href='#'>
              Sign Up
            </Button>
          </NextUiNav.Item> */}
        </NextUiNav.Content>
      )}
    </NextUiNav>
  )
}
