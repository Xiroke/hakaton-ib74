import type { QueryClient } from '@tanstack/react-query'

import { createRootRouteWithContext, Outlet, redirect } from '@tanstack/react-router'

import { refreshAccessTokenApiV1RefreshPost } from '@/api/generated'
import { SidebarProvider } from '@/components/ui/sidebar'
import { Toaster } from '@/components/ui/sonner'

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
      <Toaster position="top-center" />
      <SidebarProvider>
        <Outlet />
      </SidebarProvider>
    </>
  ),
})
