import { fetchUser, updateUserOnlineStatus } from '@/lib/Store';
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
  const [currentUser, setCurrentUser] = useState(null)

  const router = useRouter()

  const updateCurrentUser = (u) => {
    setCurrentUser(u)
  }
  const getUser = useCallback(async (id) => {
    return await fetchUser({ userId: id })
  }, [])

  useEffect(() => {
    if (!currentUser && session?.user) {
      const {
        user: {
          email,
          id,
          user_metadata: { avatar_url },
        },
      } = session
      updateUserOnlineStatus(id).then((res) => {
        console.log('res: ', res)
        if (res) {
          setCurrentUser({
            ...res,
          })
          // router.push(`/profile/${res.id}`)
        }
      })
    }
  }, [currentUser, session, getUser])

  useEffect(() => {
    const { subscription }: any = supabaseClient.auth.onAuthStateChange(
      async (event: any, session: any) => {
        if (!session) {
          router.push('/')
        }
        if (event === 'SIGNED_IN') {
          router.push(`/profile/${session?.user?.id}`)
        }
        if (event === 'SIGNED_OUT') {
          router.push('/')
        }
      }
    )
  }, [])

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
