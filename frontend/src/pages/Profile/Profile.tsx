import type { FC } from 'react'

import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'

import {
  logoutApiV1LogoutPostMutation,
  readUsersMeApiV1UserMeGetOptions,
} from '@/api/generated/@tanstack/react-query.gen'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

export const Profile: FC = () => {
  const navigate = useNavigate({ from: '/dashboard/profile' })
  const { data } = useQuery(
    readUsersMeApiV1UserMeGetOptions(),
  )

  const logout = useMutation(logoutApiV1LogoutPostMutation())
  const handleLogout = async () => {
    await logout.mutateAsync({})
    localStorage.setItem('accessToken', '')
    navigate({ to: '/login' })
  }

  return (
    <div className="w-full">
      {data && (
        <div className="flex justify-between">
          <div className="flex gap-4 justify-center items-center">
            <Avatar className="size-12 shrink-0">
              <AvatarFallback className="size-12 shrink-0">{data.name.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="">{data.name}</div>
          </div>

          <Button onClick={handleLogout} variant="destructive">
            Выйти из аккаунта
          </Button>
        </div>
      )}
    </div>
  )
}
