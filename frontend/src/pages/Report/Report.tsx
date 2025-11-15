import { useParams } from '@tanstack/react-router'
import { type FC } from 'react'

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

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Найденные уязвимости</h3>
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
