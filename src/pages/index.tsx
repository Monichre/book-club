import Footer from '@/components/Footer';
import { Card, Container } from '@nextui-org/react';
import { useSessionContext, useSupabaseClient } from '@supabase/auth-helpers-react';
import { Auth, ThemeSupa } from '@supabase/auth-ui-react';
import { useRouter } from 'next/router';

const Home: any = () => {
  const { isLoading, session, error } = useSessionContext()
  console.log('isLoading: ', isLoading)
  console.log('error: ', error)

  console.log('session: ', session)

  // const getUser = async () => {
  //   const {
  //     data: { user: maybe },
  //   } = await supabase.auth.getUser()
  //   console.log('maybe: ', maybe)
  // }

  const supabase = useSupabaseClient()
  let router = useRouter()

  // useEffect(() => {
  //   getUser()
  // }, [])

  // useEffect(() => {
  //   if (session) {
  //     const { user } = session
  //     console.log('user: ', user)
  //     router.push(`/profile/${user?.id}`)
  //   }
  // }, [session])

  // if(session && user) {

  // }

  if (!session) {
    return (
      <Container fluid>
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
        <Footer />
      </Container>
    )
  }
  return <div></div>
}

export default Home
