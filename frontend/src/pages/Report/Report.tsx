import type { FC } from 'react'

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const vulnerabilities = [
  {
    cve: 'CVE-2023-12345',
    description: 'Позволяет выполнить произвольные SQL-запросы через уязвимые параметры.',
    name: 'SQL Injection',
    severity: 'Критическая',
  },
  {
    cve: 'CVE-2022-45216',
    description: 'Вставка вредоносного JavaScript в параметры запросов.',
    name: 'XSS (Reflected)',
    severity: 'Возможная',
  },
  {
    cve: 'CVE-2024-01452',
    description: 'Злоумышленник получает доступ выше предусмотренного уровня.',
    name: 'Privilege Escalation',
    severity: 'Критическая',
  },
  {
    cve: 'CVE-2021-31703',
    description: 'Чтение файлов вне корневой директории через обход пути.',
    name: 'Directory Traversal',
    severity: 'Возможная',
  },
  {
    cve: 'CVE-2023-22118',
    description: 'Выполнение действий от имени пользователя без его ведома.',
    name: 'CSRF',
    severity: 'Возможная',
  },
]

export const Report: FC = () => {
  return (
    <div className="">
      <h3>Найденнные уязвимости</h3>
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
          {vulnerabilities.map(vuln => (
            <TableRow key={vuln.cve}>
              <TableCell className="font-medium">{vuln.name}</TableCell>
              <TableCell>{vuln.description}</TableCell>
              <TableCell>
                <a
                  className="text-primary underline"
                  href={`https://cve.mitre.org/cgi-bin/cvename.cgi?name=${vuln.cve}`}
                  rel="noreferrer"
                  target="_blank"
                >
                  {vuln.cve}
                </a>
              </TableCell>
              <TableCell className={vuln.severity === 'Критическая' ? 'text-red-600' : 'text-yellow-600'}>
                {vuln.severity}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>
              Всего найдено:
              {vulnerabilities.length}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  )
}
