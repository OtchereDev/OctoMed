import { LoaderFunctionArgs, MetaFunction } from '@remix-run/node'
import { Link, json, redirect } from '@remix-run/react'
import LoginForm from '~/components/auth/LoginForm'
import { preventLoggedInUser } from '~/lib/preventLoggedInUser'

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
