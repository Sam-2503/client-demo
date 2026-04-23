import api from '../client'
import type { Update, CreateUpdateRequest } from '../../types'

export const updateService = {
  getByProject: async (projectId: string): Promise<Update[]> => {
    const response = await api.get<Update[]>(
      `/api/updates?project_id=${projectId}`
    )
    return response.data
  },

  getById: async (id: string): Promise<Update> => {
    const response = await api.get<Update>(`/api/updates/${id}`)
    return response.data
  },

  create: async (payload: CreateUpdateRequest): Promise<Update> => {
    const response = await api.post<Update>('/api/updates', payload)
    return response.data
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/api/updates/${id}`)
  },
}
