import { Form, Link, useActionData } from '@remix-run/react'
import { useEffect } from 'react'
import { getFormError } from '~/lib/getFormError'
import { ILoginAction } from '~/routes/_auth.login'
import Input from '../shared/Input'
import SubmitButton from '../shared/SubmitButton'
import { toast } from '../ui/use-toast'

export default function LoginForm() {
  const actionData = useActionData<ILoginAction>()

  useEffect(() => {
    if (actionData?.response) {
      toast({
        title: 'Authentication',
        description: actionData?.response,
      })
    }
  }, [actionData])
  return (
    <Form method="POST" className="max-w-s flex flex-col gap-[20px]">
      <Input
        label="Email"
        type="text"
        name={'email'}
        error={getFormError('email', actionData?.errors)}
      />
      <div>
        <Input
          label="Password"
          type="password"
          name={'password'}
          error={getFormError('password', actionData?.errors)}
        />
        <Link
          to={'/forgot-password'}
          className="mt-2 font-montserrat text-xs font-medium text-[#0085FF]"
        >
          I’ve forgotten my password
        </Link>
        <div className="mt-[30px] flex justify-end lg:mt-8">
          <SubmitButton
            className="rounded-primary bg-primary px-[52px] py-[17px] font-bold text-white disabled:opacity-90"
            label="Log in"
          />
        </div>
      </div>
    </Form>
  )
}
