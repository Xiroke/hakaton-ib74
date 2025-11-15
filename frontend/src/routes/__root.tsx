import type { QueryClient } from '@tanstack/react-query'

import { TanStackDevtools } from '@tanstack/react-devtools'
import { createRootRouteWithContext, Outlet, redirect } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'

import { refreshAccessTokenApiV1RefreshPost } from '@/api/generated'
import { SidebarProvider } from '@/components/ui/sidebar'

import TanStackQueryDevtools from '../integrations/tanstack-query/devtools'

interface MyRouterContext {
  queryClient: QueryClient
}

const routesWithoutAuth = ['/login', '/signup']

export const Route = createRootRouteWithContext<MyRouterContext>()({

  beforeLoad: async ({ location }) => {
    const isWithoutAuth = routesWithoutAuth.some(path => location.pathname.startsWith(path))

    if (isWithoutAuth) {
      return
    }

    const token = await refreshAccessTokenApiV1RefreshPost({
      credentials: 'include',
    })

    if (token.data) {
      localStorage.setItem('accessToken', token.data.access_token)
    }
    else {
      throw redirect ({ to: '/login' })
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
