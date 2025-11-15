import { useForm } from '@tanstack/react-form'
import { useMutation } from '@tanstack/react-query'
import { Link, useNavigate } from '@tanstack/react-router'

import { loginForAccessTokenApiV1LoginPostMutation } from '@/api/generated/@tanstack/react-query.gen'
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

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const loginMutation = useMutation(loginForAccessTokenApiV1LoginPostMutation())
  const navigate = useNavigate({
    from: '/login',
  })

  const form = useForm({
    defaultValues: {
      password: '',
      username: '',
    },
    onSubmit: async ({ value }) => {
      try {
        const result = await loginMutation.mutateAsync({
          body: {
            password: value.password,
            username: value.username,
          },
        })

        if (result.access_token) {
          localStorage.setItem('accessToken', result.access_token)
        }

        navigate({ to: '/' })
      }
      catch (error) {
        // Error handling is done by the mutation
        console.error('Login error:', error)
      }
    },
  })

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your username below to login to your account
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
                name="username"
                validators={{
                  onChange: ({ value }) =>
                    !value ? 'Username is required' : undefined,
                }}
              >
                {field => (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Username</FieldLabel>
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
                name="password"
                validators={{
                  onChange: ({ value }) =>
                    !value ? 'Password is required' : undefined,
                }}
              >
                {field => (
                  <Field>
                    <div className="flex items-center">
                      <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                      <a
                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                        href="#"
                      >
                        Forgot your password?
                      </a>
                    </div>
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
                    {field.state.meta.errors.length > 0 && (
                      <FieldDescription className="text-destructive">
                        {field.state.meta.errors[0]}
                      </FieldDescription>
                    )}
                  </Field>
                )}
              </form.Field>
              {loginMutation.isError && (
                <Field>
                  <FieldDescription className="text-destructive">
                    {loginMutation.error instanceof Error
                      ? loginMutation.error.message
                      : 'Login failed. Please check your credentials.'}
                  </FieldDescription>
                </Field>
              )}
              <Field>
                <Button disabled={loginMutation.isPending} type="submit">
                  {loginMutation.isPending ? 'Logging in...' : 'Login'}
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account?
                  {' '}
                  <Link to="/signup">Sign up</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
