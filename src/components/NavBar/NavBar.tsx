import { SearchResults } from '@/components/SearchResults';
import UserContext from '@/features/auth/UserContext';
import { useSearch } from '@/hooks/useSearch';
import { searchUsers } from '@/lib/Store';
import { Avatar, Button, Dropdown, Input, Navbar, Navbar as NextUiNav, Text } from '@nextui-org/react';
import { useSessionContext, useSupabaseClient } from '@supabase/auth-helpers-react';
import Link from 'next/link';
import * as React from 'react';

export const SearchIcon = ({
  size,
  fill,
  width = 24,
  height = 24,
  ...props
}) => {
  return (
    <svg
      fill='none'
      height={size || height}
      viewBox='0 0 24 24'
      width={size || width}
      {...props}
    >
      <path
        d='M11.5 21a9.5 9.5 0 1 0 0-19 9.5 9.5 0 0 0 0 19ZM22 22l-2-2'
        stroke={fill}
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
      />
    </svg>
  )
}

export type NavBarProps = {}

export const NavBar: React.FunctionComponent<NavBarProps> = (
  props: NavBarProps
) => {
  const { isLoading, session, error } = useSessionContext()
  const { currentUser } = React.useContext(UserContext)
  const supabaseClient = useSupabaseClient()

  const {
    results,
    handleEnterKeyPress,
    currentSearchString,
    handleSearchString,
  } = useSearch(searchUsers)
  console.log('results: ', results)

  // const getUser = useCallback(async () => {
  //   if (currentSearchString && (!results || !results.length)) {
  //     const res = await fetchUser({ email: currentSearchString }, null)
  //     if (res) {
  //       setResults(res)
  //     }
  //   }
  // }, [currentSearchString, results])

  console.log({ results })

  const handleSignOut = async () => await supabaseClient.auth.signOut()
  return (
    <>
      <NextUiNav isBordered variant={'sticky'}>
        <NextUiNav.Brand>
          <Text b color='inherit' hideIn='xs'>
            Book Club
          </Text>
        </NextUiNav.Brand>

        {currentUser ? (
          <NextUiNav.Content>
            <NextUiNav.Item>
              <Link href={{ pathname: '/book-clubs/new' }}>
                Create A Book Club
              </Link>
            </NextUiNav.Item>

            <NextUiNav.Item
              css={{
                '@xsMax': {
                  w: '100%',
                  jc: 'center',
                },
              }}
            >
              <Input
                clearable
                onChange={handleSearchString}
                onKeyPress={handleEnterKeyPress}
                value={currentSearchString}
                contentLeft={
                  <SearchIcon fill='var(--nextui-colors-accents6)' size={16} />
                }
                contentLeftStyling={false}
                css={{
                  w: '100%',
                  '@xsMax': {
                    mw: '300px',
                  },
                  '& .nextui-input-content--left': {
                    h: '100%',
                    ml: '$4',
                    dflex: 'center',
                  },
                }}
                placeholder='Search...'
              />
            </NextUiNav.Item>

            <Dropdown placement='bottom-right'>
              <Navbar.Item>
                <Dropdown.Trigger>
                  <Avatar
                    bordered
                    as='button'
                    color='primary'
                    size='md'
                    src='https://i.pravatar.cc/150?u=a042581f4e29026704d'
                  />
                </Dropdown.Trigger>
              </Navbar.Item>
              <Dropdown.Menu
                aria-label='User menu actions'
                color='secondary'
                onAction={(actionKey) => console.log({ actionKey })}
              >
                <Dropdown.Item key='profile' css={{ height: '$18' }}>
                  <Text b color='inherit' css={{ d: 'flex' }}>
                    {currentUser.email}
                  </Text>
                </Dropdown.Item>
                <Dropdown.Item key='settings' withDivider>
                  My Settings
                </Dropdown.Item>
                <Dropdown.Item key='team_settings'>Team Settings</Dropdown.Item>
                <Dropdown.Item key='analytics' withDivider>
                  Analytics
                </Dropdown.Item>
                <Dropdown.Item key='system'>System</Dropdown.Item>
                <Dropdown.Item key='configurations'>
                  Configurations
                </Dropdown.Item>
                <Dropdown.Item key='help_and_feedback' withDivider>
                  Help & Feedback
                </Dropdown.Item>
                <Dropdown.Item key='logout' withDivider color='error'>
                  <Button auto flat onClick={handleSignOut} href='#'>
                    Sign Out
                  </Button>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
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
      <SearchResults results={results} />
    </>
  )
}
