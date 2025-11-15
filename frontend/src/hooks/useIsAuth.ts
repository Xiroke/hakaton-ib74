import { useQuery } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'

import { readUsersMeApiV1UserMeGetOptions } from '@/api/generated/@tanstack/react-query.gen'

export const useIsAuth = () => {
  const { data, isError, isLoading, isSuccess } = useQuery(
    readUsersMeApiV1UserMeGetOptions(),
  )

  if (isLoading) return null // Еще загружается
  if (isError) return false // Ошибка = не авторизован
  return isSuccess && !!data // Успех + есть данные = авторизован
}

export const useRedirectIfNotAuth = () => {
  const isAuth = useIsAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuth === false) {
      navigate({ to: '/login' })
    }
  }, [isAuth, navigate])
}
