import { createContext, useContext, useState, type ReactNode } from 'react'
import api from '../api/client'
import type { User, LoginRequest, RegisterRequest, Token } from '../types'

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<User>
  register: (payload: RegisterRequest) => Promise<User>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('rjs_user')
      return saved ? JSON.parse(saved) : null
    } catch {
      return null
    }
  })
  const [loading, setLoading] = useState(false)

  const login = async (email: string, password: string): Promise<User> => {
    setLoading(true)
    try {
      const res = await api.post<Token>('/api/auth/login', {
        email,
        password,
      } as LoginRequest)
      const { access_token, user: u } = res.data
      localStorage.setItem('rjs_token', access_token)
      localStorage.setItem('rjs_user', JSON.stringify(u))
      setUser(u)
      return u
    } finally {
      setLoading(false)
    }
  }

  const register = async (payload: RegisterRequest): Promise<User> => {
    setLoading(true)
    try {
      await api.post('/api/auth/register', payload)
      return await login(payload.email, payload.password)
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('rjs_token')
    localStorage.removeItem('rjs_user')
    setUser(null)
  }

  return (
      <AuthContext.Provider value={{ user, loading, login, register, logout }}>
        {children}
      </AuthContext.Provider>
    )
  }

  export function useAuth(): AuthContextType {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error('useAuth must be used within AuthProvider')
    return ctx
  }
