import type { FC } from 'react'

import { useQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'

import { getMyScansApiScanMyGetOptions } from '@/api/generated/@tanstack/react-query.gen'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

const ShortcutCard = ({ className, description, link, title}: { className?: string, description: string, link: string, title: string }) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {description}
      </CardContent>
      <CardFooter>
        <Link to={link}><Button type="button">Перейти</Button></Link>
      </CardFooter>
    </Card>
  )
}

export const DashboardMain: FC = () => {
  const scans = useQuery(getMyScansApiScanMyGetOptions())

  const shortcuts = [{ description: 'Актуальная сводка выявленных уязвимостей и результатов последнего анализа безопасности.', link: `/dashboard/report/${scans.data?.[0]?.id}`, title: 'Последний отчет' }, {
    description: 'Инициация нового анализа системы для выявления потенциальных угроз и отклонений.', link: '/dashboard/scan', title: 'Сканирование' }, {
    description: 'Архив предыдущих отчетов с детализацией проведённых проверок и динамикой изменений.', link: '/dashboard/reports-history', title: 'История отчетов',
  }]

  return (
    <div className="">
      <h2>Возможные действия</h2>
      <div className="flex flex-wrap gap-4">
        {shortcuts.map(shortcut => <ShortcutCard className="w-90" key={shortcut.title} {...shortcut} />)}
      </div>
    </div>
  )
}
