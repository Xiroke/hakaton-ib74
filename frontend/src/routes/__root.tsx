import type { QueryClient } from '@tanstack/react-query'

import { TanStackDevtools } from '@tanstack/react-devtools'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'

import { refreshAccessTokenApiV1RefreshPost } from '@/api/generated'
import { SidebarProvider } from '@/components/ui/sidebar'

import TanStackQueryDevtools from '../integrations/tanstack-query/devtools'

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  beforeLoad: async () => {
    const token = await refreshAccessTokenApiV1RefreshPost({
      credentials: 'include',
    })
    if (token.data) {
      localStorage.setItem('accessToken', token.data.access_token)
    }
  },
  component: () => (
    <>
      <SidebarProvider>
        <Outlet />
      </SidebarProvider>
      <TanStackDevtools
        config={{
          position: 'bottom-right',
        }}
        plugins={[
          {
            name: 'Tanstack Router',
            render: <TanStackRouterDevtoolsPanel />,
          },
          TanStackQueryDevtools,
        ]}
      />
    </>
  ),
})
