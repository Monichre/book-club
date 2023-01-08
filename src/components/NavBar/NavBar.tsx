import { FriendRequests } from '@/components/FriendRequests';
import { SearchResults } from '@/components/SearchResults';
import { UserAvatar } from '@/components/UserAvatar';
import UserContext from '@/features/auth/UserContext';
import { NotificationsContext } from '@/features/notifications/NotificationsContext';
import { useSearch } from '@/hooks/useSearch';
import { searchUsers } from '@/lib/Store';
import { Badge, Button, Dropdown, Input, Navbar as NextUiNav, Text, Tooltip } from '@nextui-org/react';
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
  const { notifications, friendRequests } =
    React.useContext(NotificationsContext)

  const supabaseClient = useSupabaseClient()

  const {
    results,
    handleEnterKeyPress,
    currentSearchString,
    handleSearchString,
  } = useSearch(searchUsers)

  const handleSignOut = async () => await supabaseClient.auth.signOut()
  return (
    <NextUiNav isBordered variant={'sticky'}>
      <NextUiNav.Brand>
        <Text b color='inherit' hideIn='xs'>
          Book Club
        </Text>
      </NextUiNav.Brand>

      {currentUser && (
        <NextUiNav.Content>
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
            <Dropdown.Trigger>
              <NextUiNav.Item>
                <Tooltip
                  placement='bottom'
                  trigger='hover'
                  content={<FriendRequests />}
                >
                  <Badge
                    size='lg'
                    content={friendRequests?.length}
                    bordered
                    color='secondary'
                    placement='top-left'
                  >
                    <UserAvatar {...currentUser} />
                  </Badge>
                </Tooltip>
              </NextUiNav.Item>
            </Dropdown.Trigger>
            <Dropdown.Menu
              aria-label='User menu actions'
              color='secondary'
              onAction={(actionKey) => console.log({ actionKey })}
            >
              <Dropdown.Item key='create-book-club' withDivider color='error'>
                <Link href={{ pathname: '/book-clubs/new' }}>
                  Create A Book Club
                </Link>
              </Dropdown.Item>

              <Dropdown.Item key='settings' withDivider>
                <Link href={{ pathname: `/profile/${currentUser?.id}` }}>
                  Profile
                </Link>
              </Dropdown.Item>

              <Dropdown.Item key='logout' withDivider color='error'>
                <Button auto flat onClick={handleSignOut} href='#'>
                  Sign Out
                </Button>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </NextUiNav.Content>
      )}
      <SearchResults results={results} />
    </NextUiNav>
  )
}
