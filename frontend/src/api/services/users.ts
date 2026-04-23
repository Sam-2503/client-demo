import api from '../client'
import type { User } from '../../types'

export const userService = {
  getMe: async (): Promise<User> => {
    const response = await api.get<User>('/api/users/me')
    return response.data
  },

  getClients: async (): Promise<User[]> => {
    const response = await api.get<User[]>('/api/users/clients')
    return response.data
  },

  getAll: async (): Promise<User[]> => {
    const response = await api.get<User[]>('/api/users')
    return response.data
  },

  getById: async (id: string): Promise<User> => {
    const response = await api.get<User>(`/api/users/${id}`)
    return response.data
  },
}
