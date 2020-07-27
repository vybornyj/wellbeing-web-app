import getConfig from 'next/config'

const { publicRuntimeConfig }: GetConfig = getConfig()

type ApiRequestClientUploadImage = (data?: File) => Promise<{ imageUrl: string }>

export const apiRequestClientUploadImage: ApiRequestClientUploadImage = async file => {
  try {
    const apiResponse = await fetch(`${publicRuntimeConfig.URL_APP}/api/image/upload`, {
      method: 'POST',
      body: file,
      headers: {
        'Content-Type': file.type
      }
    })

    const json = (await apiResponse.json()) || {}
    const isError = Object.keys(json).length === 0
    return isError ? { error: true } : { ...json }
  } catch (e) {
    return { error: true }
  }
}
