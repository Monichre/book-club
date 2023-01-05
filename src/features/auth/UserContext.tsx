import { fetchUser } from '@/lib/Store';
import { CurrentAppUser } from '@/types';
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
  const [currentUser, setCurrentUser] = useState(null)
  const router = useRouter()
  const updateCurrentUser = (u) => {
    setCurrentUser(u)
  }
  const getUser = useCallback(async (email) => {
    return await fetchUser({ email })
  }, [])

  useEffect(() => {
    const { subscription: authListener }: any =
      supabaseClient.auth.onAuthStateChange(
        async (event: any, session: any) => {
          if (event === 'SIGNED_OUT') {
            router.push('/')
          }
          if (event === 'SIGNED_IN' && session?.user && !currentUser) {
            console.log('SIGNED_IN: ')
            const {
              user: {
                email,
                user_metadata: { avatar_url },
              },
            } = session
            const user = await getUser(email)
            console.log('user: ', user)

            if (user) {
              setCurrentUser({
                ...user,
                avatar_url,
              })
              router.push(`/profile/${user.id}`)
            }
          }
        }
      )
  }, [currentUser])

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
