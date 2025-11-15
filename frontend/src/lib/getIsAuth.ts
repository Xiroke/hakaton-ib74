import { readUsersMeApiV1UserMeGet } from '@/api/generated'

export const getIsAuth = async () => {
  const data = await readUsersMeApiV1UserMeGet()

  return !!data
}
