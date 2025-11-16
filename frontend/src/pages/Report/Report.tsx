import { useQuery } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'
import { type FC } from 'react'

import { apiGetLogApiScanScanIdLogGetOptions } from '@/api/generated/@tanstack/react-query.gen'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

type Vuln = {
  cve: string
  description: string
  name: string
  severity: string
}

export const Report: FC = () => {
  const { id } = useParams({ from: '/dashboard/report/$id' })
  const vulns = []
  const { data: reportLogs, isSuccess, refetch } = useQuery(apiGetLogApiScanScanIdLogGetOptions({ path: { scan_id: Number(id) } }))

  return (
    <div>
      <div className="flex justify-between">
        <h3 className="text-lg font-semibold mb-4">Логи сканирования</h3>
        <Button onClick={() => refetch()}>Обновить</Button>
      </div>

      {isSuccess && (
        <Card>
          <Collapsible>
            <CardContent className="whitespace-pre-wrap break-all">
              {reportLogs ? reportLogs.slice(0, 500) : 'Здесь пусто'}
              <CollapsibleContent className="inline">{reportLogs.slice(500, reportLogs.length)}</CollapsibleContent>
            </CardContent>
            <CollapsibleTrigger asChild>
              <div className="text-center">
                <Button variant="ghost">Показать полностью</Button>
              </div>
            </CollapsibleTrigger>
          </Collapsible>
        </Card>
      )}

      <h3 className="text-lg font-semibold mt-10 mb-4">Найденные уязвимости</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Название</TableHead>
            <TableHead>Описание</TableHead>
            <TableHead className="w-[160px]">CVE</TableHead>
            <TableHead className="w-[160px]">Степень</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vulns.map(v => (
            <TableRow key={v.cve}>
              <TableCell className="font-medium">{v.name}</TableCell>
              <TableCell>{v.description}</TableCell>
              <TableCell>
                <a
                  className="text-primary underline"
                  href={`https://cve.mitre.org/cgi-bin/cvename.cgi?name=${v.cve}`}
                  rel="noreferrer"
                  target="_blank"
                >
                  {v.cve}
                </a>
              </TableCell>
              <TableCell
                className={
                  v.severity === 'Критическая' ? 'text-red-600' : 'text-yellow-600'
                }
              >
                {v.severity}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>
              Всего найдено:
              {vulns.length}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  )
}
