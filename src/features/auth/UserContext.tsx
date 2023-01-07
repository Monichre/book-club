import { fetchUser, fetchUsers } from '@/lib/Store';
import { CurrentAppUser } from '@/types';
import { useSessionContext } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';
import { createContext, FunctionComponent, useCallback, useEffect, useState } from 'react';

export type UserContextType = {
  currentUser: CurrentAppUser | null
}
const UserContext = createContext({
  currentUser: null,
  updateCurrentUser: (u) => {},
})

export default UserContext
interface UserContextProviderProps {
  children: any
  supabaseClient: any
}

export const UserContextProvider: FunctionComponent<
  UserContextProviderProps
> = ({ children, supabaseClient }) => {
  const { isLoading, session, error } = useSessionContext()
  console.log('session: ', session)

  const [currentUser, setCurrentUser] = useState(null)
  console.log('currentUser: ', currentUser)
  const router = useRouter()
  const updateCurrentUser = (u) => {
    setCurrentUser(u)
  }
  const getUser = useCallback(async (id) => {
    return await fetchUser({ userId: id })
  }, [])

  useEffect(() => {
    if (!currentUser && session) {
      console.log('session: ', session)

      if (session?.user) {
        const {
          user: {
            email,
            id,
            user_metadata: { avatar_url },
          },
        } = session
        getUser(id).then((res) => {
          console.log('res: ', res)
          if (res) {
            setCurrentUser({
              ...res,
              avatar_url,
            })
            router.push(`/profile/${res.id}`)
          }
        })
      }
    }
  }, [currentUser, session, getUser])

  useEffect(() => {
    fetchUsers().then((res) => {
      console.log('all users: ', res)
    })
    const { subscription: authListener }: any =
      supabaseClient.auth.onAuthStateChange(
        async (event: any, session: any) => {
          console.log('event: ', event)

          if (!session) {
            router.push('/')
          }
          if (event === 'SIGNED_OUT') {
            router.push('/')
          }
          // if (event === 'SIGNED_IN' && session?.user && !currentUser) {
          //   console.log('SIGNED_IN: ')
          //   const {
          //     user: {
          //       email,
          //       user_metadata: { avatar_url },
          //     },
          //   } = session
          // const user = await getUser(email)
          // console.log('user: ', user)

          // if (user) {
          //   setCurrentUser({
          //     ...user,
          //     avatar_url,
          //   })
          // router.push(`/profile/${user.id}`)
          // }
        }
        // }
      )
  }, [])
  console.log('currentUser: ', currentUser)

  return (
    <UserContext.Provider
      value={{
        currentUser,
        updateCurrentUser,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
