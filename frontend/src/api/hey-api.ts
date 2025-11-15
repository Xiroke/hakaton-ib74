import { settings } from '@/config.ts'

import type { CreateClientConfig } from './generated/client.gen'

export const createClientConfig: CreateClientConfig = (config) => {
  const token = localStorage.getItem('accessToken')

  return {
    ...config,
    auth: async () => `Bearer ${token}`,
    baseUrl: settings.VITE_BACKEND_URL,
    credentials: 'include',
  }
}
