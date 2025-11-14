import type { FC } from 'react'

import { AppSidebar } from '@/components/sidebar'
import { SidebarTrigger } from '@/components/ui/sidebar'

export const Dashboard: FC = () => {
  return (
    <>
      <AppSidebar />
      <div className="">
        <SidebarTrigger className="w-10 h-10" />
      </div>
    </>
  )
}
