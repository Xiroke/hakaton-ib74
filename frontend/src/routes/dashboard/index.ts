import { createFileRoute } from '@tanstack/react-router'

import { DashboardMain } from '@/pages/DashboardMain'

export const Route = createFileRoute('/dashboard/')({
  component: DashboardMain,
})
