import api from '../client'
import type { Token, LoginRequest, RegisterRequest } from '../../types'

export const authService = {
  login: async (email: string, password: string): Promise<Token> => {
    const response = await api.post<Token>('/api/auth/login', {
      email,
      password,
    } as LoginRequest)
    return response.data
  },

  register: async (payload: RegisterRequest): Promise<Token> => {
    const response = await api.post<Token>('/api/auth/register', payload)
    return response.data
  },
}
