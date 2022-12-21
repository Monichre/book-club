import Footer from '@/components/Footer';
import { Card, Container } from '@nextui-org/react';
import { useSessionContext, useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { Auth, ThemeSupa } from '@supabase/auth-ui-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Home: any = () => {
  const session = useSessionContext()
  console.log('session: ', session)
  const user = useUser()

  const supabase = useSupabaseClient()
  let router = useRouter()

  useEffect(() => {
    if (user) {
      router.push(`/profile/${user.id}`)
    }
  }, [user])

  if (user) {
  }
  return (
    <Container fluid>
      {!user ? (
        <Card css={{ w: '50%', h: '100px', margin: '200px auto 0' }}>
          <Card.Body css={{ p: 0 }}>
            <Auth
              providers={['google', 'facebook']}
              supabaseClient={supabase}
              appearance={{
                theme: ThemeSupa,
                className: {
                  container: 'auth-container',
                  button: 'auth-button',
                },
              }}
              theme='dark'
            />
          </Card.Body>
        </Card>
      ) : (
        <>
          <Link
            href={{
              pathname: '/account',
            }}
          >
            Account
          </Link>
        </>
      )}

      <Footer />
    </Container>
  )
}

export default Home
