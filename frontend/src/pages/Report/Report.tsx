import { useQuery } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'
import mermaid from 'mermaid'
import { type FC, useEffect, useRef } from 'react'

import { apiGetChainApiScanScanIdChainGetOptions, apiGetLogApiScanScanIdLogGetOptions, apiGetReportApiReportScanIdGetOptions } from '@/api/generated/@tanstack/react-query.gen'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'

const MermaidChart = ({ chart }: { chart: string }) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const renderDiagram = async () => {
      if (ref.current && chart) {
        try {
          const { svg } = await mermaid.render(`mermaid-${Date.now()}`, chart)
          ref.current.innerHTML = svg
        }
        catch (error) {
          console.error('Mermaid rendering failed:', error)
          ref.current.innerHTML = `<pre>Diagram Error: ${chart}</pre>`
        }
      }
    }

    renderDiagram()
  }, [chart])

  return <div ref={ref} />
}
export const Report: FC = () => {
  const { id } = useParams({ from: '/dashboard/report/$id' })
  const { data: reportLogs, isSuccess, refetch } = useQuery(apiGetLogApiScanScanIdLogGetOptions({ path: { scan_id: Number(id) } }))
  const { data: reportData } = useQuery(apiGetReportApiReportScanIdGetOptions({ path: { scan_id: Number(id) } }))
  const { data: reportDiagram } = useQuery(apiGetChainApiScanScanIdChainGetOptions({ path: { scan_id: Number(id) } }))
  console.log(reportDiagram)
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

      <h3 className="text-lg font-semibold mt-10 mb-4 whitespace-pre-wrap">Отчет</h3>
      <div className="whitespace-pre-wrap">
        {reportData?.report?.replace(/###/g, '') ?? 'Здесь пусто'}
      </div>

      {reportDiagram && (
        <div className="mt-10">
          <h3 className="text-lg font-semibold mt-10 mb-4 whitespace-pre-wrap">Диграмма</h3>
          <MermaidChart chart={reportDiagram} />
        </div>
      )}
    </div>
  )
}
