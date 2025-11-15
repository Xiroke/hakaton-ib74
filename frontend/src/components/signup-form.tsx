import { useForm } from '@tanstack/react-form'
import { useMutation } from '@tanstack/react-query'
import { Link, useNavigate } from '@tanstack/react-router'

import { writeUserApiV1UserPostMutation } from '@/api/generated/@tanstack/react-query.gen'
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

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const signupMutation = useMutation(writeUserApiV1UserPostMutation())
  const navigate = useNavigate({
    from: '/signup',
  })

  const form = useForm({
    defaultValues: {
      confirmPassword: '',
      email: '',
      name: '',
      password: '',
      username: '',
    },
    onSubmit: async ({ value }) => {
      try {
        await signupMutation.mutateAsync({
          body: {
            email: value.email,
            name: value.name,
            password: value.password,
            username: value.username,
          },
        })

        navigate({ to: '/login' })
      }
      catch (error) {
        // Error handling is done by the mutation
        console.error('Signup error:', error)
      }
    },
  })

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Создать учетную запись</CardTitle>
        <CardDescription>
          Введите о себе информацию, чтобы создать учетную запись
        </CardDescription>
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
            <form.Field
              name="name"
              validators={{
                onChange: ({ value }) =>
                  !value ? 'ФИО обязательно' : undefined,
              }}
            >
              {field => (
                <Field>
                  <FieldLabel htmlFor={field.name}>ФИО</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    onBlur={field.handleBlur}
                    onChange={e => field.handleChange(e.target.value)}
                    placeholder="Иванов Иван Иванович"
                    required
                    type="text"
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
            <form.Field
              name="username"
              validators={{
                onChange: ({ value }) =>
                  !value ? 'Имя пользователя обязательно' : undefined,
              }}
            >
              {field => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Имя пользователя</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    onBlur={field.handleBlur}
                    onChange={e => field.handleChange(e.target.value)}
                    placeholder="username"
                    required
                    type="text"
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
            <form.Field
              name="email"
              validators={{
                onChange: ({ value }) => {
                  if (!value) return 'Почта обязательна'
                  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    return 'Пожалуйста, введите корректный адрес электронной почты.'
                  }
                  return undefined
                },
              }}
            >
              {field => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    onBlur={field.handleBlur}
                    onChange={e => field.handleChange(e.target.value)}
                    placeholder="m@example.com"
                    required
                    type="email"
                    value={field.state.value}
                  />
                  <FieldDescription>
                    Мы используем его для связи с вами. Мы не передадим ваш адрес электронной почты другим людям.
                  </FieldDescription>
                  {field.state.meta.errors.length > 0 && (
                    <FieldDescription className="text-destructive">
                      {field.state.meta.errors[0]}
                    </FieldDescription>
                  )}
                </Field>
              )}
            </form.Field>
            <form.Field
              name="password"
              validators={{
                onChange: ({ value }) => {
                  if (!value) return 'Пароль обязателен'
                  if (value.length < 8) {
                    return 'Пароль должен быть длиной не менее 8 символов.'
                  }
                  return undefined
                },
              }}
            >
              {field => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Пароль</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    onBlur={field.handleBlur}
                    onChange={e => field.handleChange(e.target.value)}
                    placeholder="***********"
                    required
                    type="password"
                    value={field.state.value}
                  />
                  <FieldDescription>
                    Должен быть длиной не менее 8 символов.
                  </FieldDescription>
                  {field.state.meta.errors.length > 0 && (
                    <FieldDescription className="text-destructive">
                      {field.state.meta.errors[0]}
                    </FieldDescription>
                  )}
                </Field>
              )}
            </form.Field>
            <form.Field
              name="confirmPassword"
              validators={{
                onChange: ({ fieldApi, value }) => {
                  if (!value) return 'Подтвердите пароль'

                  const allValues = fieldApi.form.state.values as {
                    password: string
                  }
                  const password = allValues.password

                  if (value !== password) {
                    return 'Пароли не совпадают'
                  }
                  return undefined
                },
              }}
            >
              {field => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Подтвердите пароль</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    onBlur={field.handleBlur}
                    onChange={e => field.handleChange(e.target.value)}
                    placeholder="***********"
                    required
                    type="password"
                    value={field.state.value}
                  />
                  <FieldDescription>
                    Пожалуйста подтвердите пароль.
                  </FieldDescription>
                  {field.state.meta.errors.length > 0 && (
                    <FieldDescription className="text-destructive">
                      {field.state.meta.errors[0]}
                    </FieldDescription>
                  )}
                </Field>
              )}
            </form.Field>
            {signupMutation.isError && (
              <Field>
                <FieldDescription className="text-destructive">
                  {signupMutation.error instanceof Error
                    ? signupMutation.error.message
                    : 'Регистрация не удалась. Проверьте введенные данные.'}
                </FieldDescription>
              </Field>
            )}
            <FieldGroup>
              <Field>
                <Button disabled={signupMutation.isPending} type="submit">
                  {signupMutation.isPending
                    ? 'Регистрируем...'
                    : 'Зарегистрироваться'}
                </Button>
                <FieldDescription className="px-6 text-center">
                  У вас уже есть своя учетная запись?
                  {' '}
                  <Link to="/login">Войти</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
