import { Form, useActionData } from '@remix-run/react'
import { useEffect, useState } from 'react'
import { getFormError } from '~/lib/getFormError'
import { ISignupAction } from '~/routes/_auth.signup'
import Input from '../shared/Input'
import PhoneInput from '../shared/PhoneInput'
import SubmitButton from '../shared/SubmitButton'
import { Close, Mark } from '../shared/icons'
import { toast } from '../ui/use-toast'

export const PasswordChecks = [
  {
    key: 'length',
    message: 'At least 8 characters',
  },
  {
    key: 'lower',
    message: 'Lowercase letters',
  },
  {
    key: 'upper',
    message: 'Uppercase letters',
  },
  {
    key: 'number',
    message: 'Numbers',
  },
  {
    key: 'special',
    message: 'Special characters',
  },
]

export default function SignupForm() {
  const actionData = useActionData<ISignupAction>()
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
    <Form method="POST">
      <div className="max-w-s flex flex-col gap-[20px] lg:grid lg:grid-cols-2">
        <Input
          label="Name"
          type="text"
          name={'full_name'}
          error={getFormError('full_name', actionData?.errors)}
        />
        <Input
          label="Email"
          type="text"
          name="email"
          error={getFormError('email', actionData?.errors)}
        />
        <div>
          <PhoneInput
            country={'gb'}
            inputProps={{
              name: 'phone_number',
            }}
          />
          {
            <p className="mt-1 font-montserrat text-xs text-red-500">
              {getFormError('phone_number', actionData?.errors)}
            </p>
          }
        </div>
        <Input
          label="Date of Birth"
          type="date"
          name="dob"
          error={getFormError('dob', actionData?.errors)}
        />
        <Input
          label="Password"
          type="password"
          name="password"
          error={getFormError('password', actionData?.errors)}
          callback={setPassword}
        />
        <Input
          label="Confirm Password"
          type="password"
          name="confirm_password"
          error={getFormError('confirm_password', actionData?.errors)}
        />
      </div>

      <div className="mt-[15px] hidden lg:block">
        <p className="font-montserrat text-xs font-medium text-[#191919]">
          Your password must include:
        </p>
        <div className="mt-2 grid w-[400px] grid-cols-2 gap-3">
          {PasswordChecks.map((check) => (
            <div key={check.key} className="flex items-center gap-1">
              {checkPasswordRequirements(check.key) ? <Mark /> : <Close color="#DC2626" />}
              <p className="text-xs text-[#667085]">{check.message}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-[10px] flex justify-end lg:mt-8">
        <SubmitButton
          label="Sign Up"
          className="rounded-primary bg-primary px-[52px] py-[17px] font-bold text-white disabled:opacity-90"
        />
      </div>
    </Form>
  )
}
