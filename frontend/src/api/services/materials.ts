import api from '../client'
import type { Material, CreateMaterialRequest } from '../../types'

export const materialService = {
  getByProject: async (projectId: string): Promise<Material[]> => {
    const response = await api.get<Material[]>(
      `/api/materials?project_id=${projectId}`
    )
    return response.data
  },

  getById: async (id: string): Promise<Material> => {
    const response = await api.get<Material>(`/api/materials/${id}`)
    return response.data
  },

  create: async (payload: CreateMaterialRequest): Promise<Material> => {
    const response = await api.post<Material>('/api/materials', payload)
    return response.data
  },

  update: async (
    id: string,
    payload: Partial<CreateMaterialRequest>
  ): Promise<Material> => {
    const response = await api.put<Material>(`/api/materials/${id}`, payload)
    return response.data
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/api/materials/${id}`)
  },
}
