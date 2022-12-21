import { NavBar } from '@/components/NavBar';
import UserContext from '@/lib/UserContext';
import { GlobalStyle } from '@/styles/GlobalStyles';
import { createTheme, NextUIProvider } from '@nextui-org/react';
import { createBrowserSupabaseClient, Session } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
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
  const [currentUser, setCurrentUser] = useState(null)

  const [session, setSession] = useState(null)
  const [userRoles, setUserRoles] = useState([])
  const router = useRouter()

  useEffect(() => {
    // supabaseClient.auth
    //   .getSession()
    //   .then(async () => {
    //     console.log('sessionData: ', sessionData)
    //     setSession(sessionData)
    //     setUserLoaded(sessionData ? true : false)
    //     if (sessionData?.user) {
    //       console.log('sessionData: ', sessionData)
    //       const userData = await fetchUser(sessionData?.user.id, setUser)
    //       router.push('/profile/[id]', `/profile/${userData.id}`)
    //     }
    //   })
  })

  const { subscription: authListener }: any =
    supabaseClient.auth.onAuthStateChange(async (event: any, session: any) => {
      console.log('event: ', event)
      if (event === 'SIGNED_OUT') {
        router.push('/')
      }

      // const currentUser: any = session?.user
      // setUser(currentUser ?? null)
      // setUserLoaded(!!currentUser)
    })

  useEffect(() => {
    return () => {
      authListener.unsubscribe()
    }
  }, [authListener])

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <NextUIProvider theme={darkTheme}>
        <ThemeProvider theme={{}}>
          <GlobalStyle />

          <UserContext.Provider
            value={{
              userLoaded,
              currentUser,
              userRoles,
            }}
          >
            <NavBar />

            <Component {...pageProps} />
          </UserContext.Provider>
        </ThemeProvider>
      </NextUIProvider>
    </SessionContextProvider>
  )
}

// export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
//   // Create authenticated Supabase Client
//   const supabase = createServerSupabaseClient(ctx);
//   // Check if we have a session
//   const {
//     data: { session }
//   } = await supabase.auth.getSession();

//   if (!session)
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false
//       }
//     };

//   // Run queries with RLS on the server

//   return {
//     props: {
//       initialSession: session,
//       user: session.user,

//     }
//   };
// };

export default MyApp
