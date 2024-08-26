import { ActionFunctionArgs, LoaderFunctionArgs, MetaFunction } from '@remix-run/node'
import { Link, json, redirect } from '@remix-run/react'
import LoginForm from '~/components/auth/LoginForm'
import { LoginDTO } from '~/dto/user.dto'
import { IError, formatZodErrors } from '~/lib/formatZodError'
import { preventLoggedInUser } from '~/lib/preventLoggedInUser'
import { login } from '~/server/user.server'
import { commitSession, getSession } from '~/sessions'

export const meta: MetaFunction = () => [
  {
    title: 'Login - OctoMed | Your AI Health Assistant',
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
  const session = await getSession(request.headers.get('Cookie'))
  let redirectUrl = '/'

  try {
    const result = LoginDTO.parse({ email, password })

    const response = await login(result)
    if (response.status && response.user) {
      session.set('accessToken', response.access_token)
      session.set('id', response.user.id)
      session.set('email', response.user.email)
      session.set('firstName', response.user.full_name.split(' ')[0])

      if (!response.user.skip_onboarding) {
        if (!response.user.biodata_setup) {
          redirectUrl = '/onboarding/biodata'
        } else if (!response.user.healthdata_setup) {
          redirectUrl = '/onboarding/health-details'
        } else if (!response.user.healthdata_setup) {
          redirectUrl = '/onboarding/location'
        }
      }

      session.flash('toast', 'Successfully logged in')

      return redirect(redirectUrl, {
        headers: {
          'Set-Cookie': await commitSession(session),
        },
      })
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

export type ILoginAction = typeof action

export default function Login() {
  return (
    <section>
      <p className="mt-[10px] hidden text-right font-montserrat text-[#4F4F4F] lg:block">
        Don’t have an accoun?{' '}
        <Link to={'/signup'} className="font-bold text-primary">
          Sign Up
        </Link>
      </p>
      <section className="lg:mx-auto lg:max-w-[500px] lg:pb-[50px]">
        <h1 className="mt-[60px] font-raleway font-bold text-primary lg:mt-[140px] lg:text-2xl">
          Welcome!
        </h1>
        <p className="mb-[30px] mt-[20px] font-montserrat text-sm text-[#191919] lg:text-base">
          Login to your account
        </p>
        <LoginForm />
      </section>
      <p className="mt-[70px] pb-[40px] text-center font-montserrat text-[#4F4F4F] lg:hidden">
        Don’t have an accoun?{' '}
        <Link to={'/login'} className="font-bold text-primary">
          Sign Up
        </Link>
      </p>
    </section>
  )
}
