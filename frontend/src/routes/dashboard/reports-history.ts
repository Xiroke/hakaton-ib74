import { createFileRoute } from '@tanstack/react-router'

import { ReportsHistory } from '@/pages/ReportsHistory'

export const Route = createFileRoute('/dashboard/reports-history')({
  component: ReportsHistory,
})
