import { Form, useActionData } from '@remix-run/react'
import { useEffect } from 'react'
import { getFormError } from '~/lib/getFormError'
import { IForgotPasswordAction } from '~/routes/_auth.forgot-password'
import Input from '../shared/Input'
import SubmitButton from '../shared/SubmitButton'
import { toast } from '../ui/use-toast'

export default function ForgotPasswordForm() {
  const actionData = useActionData<IForgotPasswordAction>()

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
      <SubmitButton
        label="Send Link"
        className="mt-[30px] w-full rounded-primary bg-primary px-[52px] py-[17px] font-bold text-white disabled:bg-opacity-90"
      />
    </Form>
  )
}
