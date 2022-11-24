import { fetchUser, fetchUserRoles, supabase } from '@/lib/Store';
import UserContext from '@/lib/UserContext';
import { GlobalStyle } from '@/styles/GlobalStyles';
import { Button, createTheme, Link, Navbar, NextUIProvider, Text } from '@nextui-org/react';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { Session, SessionContextProvider } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';

import type { AppProps } from 'next/app'
// import '../styles/globals.css'

const darkTheme = createTheme({
  type: 'dark',
})
function MyApp({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session
}>) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient())

  const [userLoaded, setUserLoaded] = useState(false)
  const [user, setUser] = useState(null)
  const [session, setSession] = useState(null)
  const [userRoles, setUserRoles] = useState([])
  const router = useRouter()
  console.log('user: ', user)

  const signIn = async () => {
    await fetchUserRoles((userRoles) =>
      setUserRoles(userRoles.map((userRole) => userRole.role))
    )
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (!error) {
      router.push('/')
    }
  }

  useEffect(() => {
    supabaseClient.auth
      .getSession()
      .then(async ({ data: { session } }: any) => {
        setSession(session)
        setUserLoaded(session ? true : false)
        if (session?.user) {
          return fetchUser(session?.user.id, setUser)
        }
      })
      .then((fetchedUser) => {
        console.log('fetchedUser: ', fetchedUser)
        signIn()
        router.push('/channels/[id]', '/channels/1')
      })
  }, [])

  useEffect(() => {
    const { subscription: authListener }: any = supabase.auth.onAuthStateChange(
      async (event: any, session: any) => {
        setSession(session)
        const currentUser: any = session?.user
        setUser(currentUser ?? null)
        setUserLoaded(!!currentUser)
      }
    )

    return () => {
      authListener.unsubscribe()
    }
  }, [])

  return (
    <NextUIProvider theme={darkTheme}>
      <ThemeProvider theme={{}}>
        <GlobalStyle />
        <SessionContextProvider
          supabaseClient={supabaseClient}
          initialSession={pageProps.initialSession}
        >
          <UserContext.Provider
            value={{
              userLoaded,
              user,
              userRoles,
              signIn,
              signOut,
            }}
          >
            <Navbar isBordered variant={'sticky'}>
              <Navbar.Brand>
                <Text b color='inherit' hideIn='xs'>
                  Book Club
                </Text>
              </Navbar.Brand>
              <Navbar.Content hideIn='xs'>
                <Navbar.Link href='#'>Features</Navbar.Link>
                <Navbar.Link isActive href='#'>
                  Customers
                </Navbar.Link>
                <Navbar.Link href='#'>Pricing</Navbar.Link>
                <Navbar.Link href='#'>Company</Navbar.Link>
              </Navbar.Content>
              <Navbar.Content>
                <Navbar.Link color='inherit' href='#'>
                  Login
                </Navbar.Link>
                <Navbar.Item>
                  <Button auto flat as={Link} href='#'>
                    Sign Up
                  </Button>
                </Navbar.Item>
              </Navbar.Content>
            </Navbar>
            <Component {...pageProps} />
          </UserContext.Provider>
        </SessionContextProvider>
      </ThemeProvider>
    </NextUIProvider>
  )
}

export default MyApp
