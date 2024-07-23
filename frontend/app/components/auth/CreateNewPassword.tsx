import { Form, useActionData } from '@remix-run/react'
import { useEffect, useState } from 'react'
import { getFormError } from '~/lib/getFormError'
import { IResetPasswordAction } from '~/routes/_auth.reset.$uid.$token'
import Input from '../shared/Input'
import { Close, Mark } from '../shared/icons'
import { toast } from '../ui/use-toast'
import { PasswordChecks } from './SignupForm'

export default function CreateNewPassword() {
  const actionData = useActionData<IResetPasswordAction>()
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (actionData?.response) {
      toast({
        title: 'Authentication',
        description: actionData?.response,
      })
    }
  }, [actionData])

  function checkPasswordRequirements(requirement: string) {
    switch (requirement) {
      case 'length':
        return password.length >= 8
      case 'lower':
        return /[a-z]/.test(password)
      case 'upper':
        return /[A-Z]/.test(password)
      case 'number':
        return /\d/.test(password)
      case 'special':
        return /[!@#\$%\^&\*]/.test(password)
      default:
        return false
    }
  }

  return (
    <Form method="POST" className="max-w-s flex flex-col gap-[20px]">
      <div>
        <Input
          label="New Password"
          type="password"
          name={'password'}
          error={getFormError('password', actionData?.errors)}
          callback={setPassword}
        />
        <div className="mt-4 grid w-[400px] grid-cols-2 gap-3">
          {PasswordChecks.map((check) => (
            <div key={check.key} className="flex items-center gap-1">
              {checkPasswordRequirements(check.key) ? <Mark /> : <Close color="#DC2626" />}
              <p className="text-xs text-[#667085]">{check.message}</p>
            </div>
          ))}
        </div>
      </div>
      <Input
        label="Confirm New Password"
        type="password"
        name={'confirm_password'}
        error={getFormError('confirm_password', actionData?.errors)}
      />
      <button className="mt-[30px] w-full rounded-primary bg-primary px-[52px] py-[17px] font-bold text-white">
        Reset Password
      </button>
    </Form>
  )
}
