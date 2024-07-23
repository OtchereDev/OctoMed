import { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node'
import { Link, MetaFunction, json, redirect, useActionData } from '@remix-run/react'
import CreateNewPassword from '~/components/auth/CreateNewPassword'
import { ResetPasswordDTO } from '~/dto/user.dto'
import { IError, formatZodErrors } from '~/lib/formatZodError'
import { preventLoggedInUser } from '~/lib/preventLoggedInUser'
import { requestPassword } from '~/server/user.server'

export const meta: MetaFunction = () => [
  {
    title: 'Set A New Password - OctoMed | Your AI Health Assistant',
  },
  {
    name: 'description',
    content: 'Your AI Health Assistant',
  },
]

export async function loader({ request }: LoaderFunctionArgs) {
  if (await preventLoggedInUser(request)) {
    return redirect('/')
  }

  return json({})
}

export async function action({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData()
  const password = formData.get('password') ?? ''
  const confirm_password = formData.get('confirm_password') ?? ''

  try {
    const result = ResetPasswordDTO.parse({
      confirm_password,
      password,
      user: parseInt(params?.uid as string),
      token: params?.token,
    })

    const response = await requestPassword(result)

    return json({
      errors: [] as IError[],
      response: response.message,
      success: response.status,
    })
  } catch (error: any) {
    if (error.errors?.length) {
      return json({
        errors: formatZodErrors(error.errors),
        response: 'Validation Errors',
        success: false,
      })
    }
  }
}
export type IResetPasswordAction = typeof action

export default function ResetPassword() {
  const actionData = useActionData<IResetPasswordAction>()
  return (
    <section>
      <p className="mt-[10px] hidden text-right font-montserrat text-[#4F4F4F] lg:block">
        Don’t have an accoun?{' '}
        <Link to={'/signup'} className="font-bold text-primary">
          Sign Up
        </Link>
      </p>
      <section className="lg:mx-auto lg:max-w-[500px] lg:pb-[50px]">
        {actionData?.success ? (
          <div className="text-center">
            <h1 className="mt-[60px] font-raleway font-bold text-primary lg:mt-[180px] lg:text-2xl">
              Password reset successful
            </h1>
            <p className="mb-[30px] mt-[20px] font-montserrat text-sm text-[#191919] lg:text-base">
              Your password has been successfully reset. You can log into your account now.
            </p>
            <Link to={'/login'}>
              <button className="mt-[10px] w-full rounded-primary bg-primary px-[52px] py-[17px] font-bold text-white lg:mt-[60px]">
                Return To Login
              </button>
            </Link>
          </div>
        ) : (
          <>
            <h1 className="mt-[60px] font-raleway font-bold text-primary lg:mt-[140px] lg:text-2xl">
              Create new password
            </h1>
            <p className="mb-[30px] mt-[20px] font-montserrat text-sm text-[#191919] lg:text-base">
              Create a new password for your account
            </p>
            <CreateNewPassword />
            <Link to={'/login'} className="mt-[25px] block text-center font-bold text-primary">
              Return to login
            </Link>
          </>
        )}
      </section>
    </section>
  )
}
