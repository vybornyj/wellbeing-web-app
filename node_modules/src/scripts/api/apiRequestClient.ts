import { apiRequestServer } from 'src/scripts/api/apiRequestServer'

type ApiRequestClient = (url: string, data?: any) => Promise<any>

export const apiRequestClient: ApiRequestClient = async (url, data = {}) => apiRequestServer(null, url, data)
