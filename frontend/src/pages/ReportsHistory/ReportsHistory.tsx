import type { FC } from 'react'

import { useQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'

import { getMyScansApiV1ScanMyGetOptions } from '@/api/generated/@tanstack/react-query.gen'
import {
  Table, TableBody, TableCell, TableHead,
  TableHeader, TableRow,
} from '@/components/ui/table'

export const ReportsHistory: FC = () => {
  const scans = useQuery(getMyScansApiV1ScanMyGetOptions())

  return (
    <div>
      <h3>Ваши отчеты</h3>

      {scans.isLoading
        ? <div>Загрузка…</div>

        : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Название</TableHead>
                  <TableHead>Host</TableHead>
                  <TableHead>Port</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead>Создан</TableHead>
                  <TableHead>Действия</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {scans.data?.map(scan => (
                  <TableRow key={scan.id}>
                    <TableCell>{scan.title}</TableCell>
                    <TableCell>{scan.host}</TableCell>
                    <TableCell>{scan.port}</TableCell>
                    <TableCell>{scan.status}</TableCell>
                    <TableCell>{new Date(scan.created_at).toLocaleString()}</TableCell>
                    <TableCell><Link params={{ id: scan.id }} to="/dashboard/report/$id">Перейти</Link></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
    </div>
  )
}
