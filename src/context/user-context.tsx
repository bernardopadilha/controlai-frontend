import { useVerifyLogin } from '@/features/auth/api/use-verify-login'
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

interface User {
  id: string
  name: string
  email: string
}

interface UserContextProps {
  user: User | null
  setUser: (user: User | null) => void
  isLoading: boolean
  resetUser: () => void
  setNewUser: () => void
}

const UserContext = createContext<UserContextProps | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const { data, isLoading } = useVerifyLogin()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    if (data) {
      setUser(data)
    } else if (data === null) {
      setUser(null)
    }
  }, [data])

  const resetUser = () => {
    setUser(null)
  }

  const setNewUser = () => {
    setUser(data)
  }

  return (
    <UserContext.Provider
      value={{ user, setUser, isLoading, resetUser, setNewUser }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser deve ser usado dentro de um UserProvider')
  }
  return context
}
