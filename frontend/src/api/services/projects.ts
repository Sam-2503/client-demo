import api from '../client'
import type {
  Project,
  CreateProjectRequest,
  UpdateProjectRequest,
} from '../../types'

export const projectService = {
  getAll: async (): Promise<Project[]> => {
    const response = await api.get<Project[]>('/api/projects')
    return response.data
  },

  getById: async (id: string): Promise<Project> => {
    const response = await api.get<Project>(`/api/projects/${id}`)
    return response.data
  },

  create: async (payload: CreateProjectRequest): Promise<Project> => {
    const response = await api.post<Project>('/api/projects', payload)
    return response.data
  },

  update: async (id: string, payload: UpdateProjectRequest): Promise<Project> => {
    const response = await api.put<Project>(`/api/projects/${id}`, payload)
    return response.data
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/api/projects/${id}`)
  },
}
