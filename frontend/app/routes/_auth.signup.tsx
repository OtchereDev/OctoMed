import { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node'
import { Link, MetaFunction, json, redirect } from '@remix-run/react'
import SignupForm from '~/components/auth/SignupForm'
import { SignupDTO } from '~/dto/user.dto'
import { IError, formatZodErrors } from '~/lib/formatZodError'
import { preventLoggedInUser } from '~/lib/preventLoggedInUser'
import { signup } from '~/server/user.server'

export const meta: MetaFunction = () => [
  {
    title: 'Signup - OctoMed | Your AI Health Assistant',
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

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()

  const email = formData.get('email') ?? ''
  const password = formData.get('password') ?? ''
  const phone_number = (formData.get('phone_number') as string).replace(/ /g, '') ?? ''
  const dob = formData.get('dob') ?? ''
  const full_name = formData.get('full_name') ?? ''
  const confirm_password = formData.get('confirm_password') ?? ''

  try {
    const result = SignupDTO.parse({
      email,
      password,
      phone_number,
      dob,
      full_name,
      confirm_password,
    })
    const response = await signup({ ...result, dob: new Date(dob as string).toISOString() })

    if (response.status) {
      return redirect('/login')
    } else {
      return json({
        errors: [] as IError[],
        response: response.message,
      })
    }
  } catch (error: any) {
    if (error.errors?.length) {
      return json({
        errors: formatZodErrors(error.errors),
        response: 'Validation Errors',
      })
    }
  }
}

export type ISignupAction = typeof action

export default function Signup() {
  return (
    <section>
      <p className="mt-[10px] hidden text-right font-montserrat text-[#4F4F4F] lg:block">
        Already have an account?{' '}
        <Link to={'/login'} className="font-bold text-primary">
          Login
        </Link>
      </p>
      <section className="lg:mx-auto lg:max-w-[630px] lg:pb-[50px]">
        <h1 className="mt-[60px] font-raleway font-bold text-primary lg:mt-[140px] lg:text-2xl">
          Welcome! Let’s get started.{' '}
        </h1>
        <p className="mb-[30px] mt-[20px] font-montserrat text-sm text-[#191919] lg:text-base">
          Provide your details to create an account
        </p>
        <SignupForm />
      </section>
      <p className="mt-[70px] pb-[40px] text-center font-montserrat text-[#4F4F4F] lg:hidden">
        Already have an account?{' '}
        <Link to={'/login'} className="font-bold text-primary">
          Login
        </Link>
      </p>
    </section>
  )
}
