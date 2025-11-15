import { useForm } from '@tanstack/react-form'
import { useMutation } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'

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
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
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
                  !value ? 'Full name is required' : undefined,
              }}
            >
              {field => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Full Name</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    onBlur={field.handleBlur}
                    onChange={e => field.handleChange(e.target.value)}
                    placeholder="John Doe"
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
                    placeholder="johndoe"
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
                  if (!value) return 'Email is required'
                  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    return 'Please enter a valid email address'
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
                    We&apos;ll use this to contact you. We will not share your
                    email with anyone else.
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
                  if (!value) return 'Password is required'
                  if (value.length < 8) {
                    return 'Password must be at least 8 characters long'
                  }
                  return undefined
                },
              }}
            >
              {field => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    onBlur={field.handleBlur}
                    onChange={e => field.handleChange(e.target.value)}
                    required
                    type="password"
                    value={field.state.value}
                  />
                  <FieldDescription>
                    Must be at least 8 characters long.
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
                onChange: ({ form, value }) => {
                  if (!value) return 'Please confirm your password'
                  const password = form.getFieldValue('password')
                  if (value !== password) {
                    return 'Passwords do not match'
                  }
                  return undefined
                },
              }}
            >
              {field => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Confirm Password</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    onBlur={field.handleBlur}
                    onChange={e => field.handleChange(e.target.value)}
                    required
                    type="password"
                    value={field.state.value}
                  />
                  <FieldDescription>
                    Please confirm your password.
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
                    : 'Signup failed. Please check your information.'}
                </FieldDescription>
              </Field>
            )}
            <FieldGroup>
              <Field>
                <Button disabled={signupMutation.isPending} type="submit">
                  {signupMutation.isPending
                    ? 'Creating account...'
                    : 'Create Account'}
                </Button>
                <FieldDescription className="px-6 text-center">
                  Already have an account?
                  {' '}
                  <Link to="/login">Sign in</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
