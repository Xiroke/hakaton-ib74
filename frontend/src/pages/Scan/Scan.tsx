import { useForm } from '@tanstack/react-form'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { createScanApiV1ScanPostMutation } from '@/api/generated/@tanstack/react-query.gen'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

export const Scan = ({ className, ...props }: React.ComponentProps<'div'>) => {
  const scanMutation = useMutation(createScanApiV1ScanPostMutation())

  const form = useForm({
    defaultValues: {
      host: '',
      port: '',
      title: '',
    },
    onSubmit: async ({ value }) => {
      try {
        await scanMutation.mutateAsync({ body: {
          host: value.host,
          port: Number(value.port),
          title: value.title,
        } })
        toast.success('Сканирование запущено')
      }
      catch (error) {
        toast.error('Ошибка при запуске сканирования')
        console.error(error)
      }
    },
  })

  return (
    <div className={cn('flex flex-col gap-6 w-1/3 mx-auto', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Сканирование</CardTitle>
          <CardDescription>Введите название, цель и порт для сканирования</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              e.stopPropagation()
              form.handleSubmit()
            }}
          >
            <FieldGroup>
              {/* Title */}
              <form.Field
                name="title"
                validators={{
                  onChange: ({ value }) =>
                    !value ? 'Название сканирования обязательно' : undefined,
                }}
              >
                {field => (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Название</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      onBlur={field.handleBlur}
                      onChange={e => field.handleChange(e.target.value)}
                      placeholder="Введите название сканирования"
                      value={field.state.value}
                    />
                    {field.state.meta.errors.length > 0 && (
                      <FieldDescription className="text-destructive">
                        {field.state.meta.errors[0]}
                      </FieldDescription>
                    )}
                  </Field>
                )}
              </form.Field>

              {/* Target */}
              <form.Field
                name="host"
                validators={{
                  onChange: ({ value }) =>
                    !value ? 'Цель сканирования обязательна' : undefined,
                }}
              >
                {field => (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Цель</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      onBlur={field.handleBlur}
                      onChange={e => field.handleChange(e.target.value)}
                      placeholder="Введите Домен или IP"
                      value={field.state.value}
                    />
                    {field.state.meta.errors.length > 0 && (
                      <FieldDescription className="text-destructive">
                        {field.state.meta.errors[0]}
                      </FieldDescription>
                    )}
                  </Field>
                )}
              </form.Field>

              {/* Port */}
              <form.Field
                name="port"
                validators={{
                  onChange: ({ value }) => {
                    const portNum = Number(value)
                    if (!value) return 'Порт обязателен'
                    if (!/^\d+$/.test(value)) return 'Порт должен быть числом'
                    if (portNum < 1 || portNum > 65535) return 'Порт должен быть от 1 до 65535'
                  },
                }}
              >
                {field => (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Порт</FieldLabel>
                    <Input
                      id={field.name}
                      max={65535}
                      min={1}
                      name={field.name}
                      onBlur={field.handleBlur}
                      onChange={e => field.handleChange(e.target.value)}
                      placeholder="Введите порт"
                      type="number"
                      value={field.state.value}
                    />
                    {field.state.meta.errors.length > 0 && (
                      <FieldDescription className="text-destructive">
                        {field.state.meta.errors[0]}
                      </FieldDescription>
                    )}
                  </Field>
                )}
              </form.Field>

              {/* Errors from mutation */}
              {scanMutation.isError && (
                <Field>
                  <FieldDescription className="text-destructive">
                    {scanMutation.error instanceof Error
                      ? scanMutation.error.message
                      : 'Не удалось запустить сканирование'}
                  </FieldDescription>
                </Field>
              )}

              <Field>
                <Button disabled={scanMutation.isPending} type="submit">
                  {scanMutation.isPending ? 'Сканирование...' : 'Сканировать'}
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
