import 'rc-time-picker/assets/index.css';

import { Layout } from '@/components/Layout';
import { NavBar } from '@/components/NavBar';
import { UserContextProvider } from '@/features/auth/UserContext';
import NotificationsProvider from '@/features/notifications/NotificationsContext';
import { GlobalStyle } from '@/styles/GlobalStyles';
import { StyleProvider } from '@ant-design/cssinjs';
import { createTheme, NextUIProvider } from '@nextui-org/react';
import { createBrowserSupabaseClient, Session } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { useState } from 'react';

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
  const [supabaseClient] = useState(() =>
    createBrowserSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    )
  )

  return (
    <StyleProvider hashPriority='high'>
      <NextUIProvider theme={darkTheme}>
        <SessionContextProvider
          supabaseClient={supabaseClient}
          initialSession={pageProps.initialSession}
        >
          <GlobalStyle />

          <UserContextProvider supabaseClient={supabaseClient}>
            <NotificationsProvider>
              <NavBar />
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </NotificationsProvider>
          </UserContextProvider>
        </SessionContextProvider>
      </NextUIProvider>
    </StyleProvider>
  )
}

export default MyApp
