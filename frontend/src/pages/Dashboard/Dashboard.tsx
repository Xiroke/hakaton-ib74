import type { FC } from 'react'

import { Outlet } from '@tanstack/react-router'

import { AppSidebar } from '@/components/sidebar'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { useRedirectIfNotAuth } from '@/hooks/useIsAuth'

export const Dashboard: FC = () => {
  useRedirectIfNotAuth()

  return (
    <>
      <AppSidebar />
      <div className="flex-1">
        <SidebarTrigger className="w-10 h-10" />
        <div className="py-6 px-6">
          <Outlet />
        </div>
      </div>
    </>
  )
}
