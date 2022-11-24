import Footer from '@/components/Footer';
import { Card, Container } from '@nextui-org/react';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { Auth, ThemeSupa } from '@supabase/auth-ui-react';
import Link from 'next/link';

const Home: any = () => {
  const session = useSession()
  const supabase = useSupabaseClient()

  return (
    <Container fluid>
      {!session ? (
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
