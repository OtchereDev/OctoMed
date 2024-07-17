import { Link, MetaFunction } from '@remix-run/react'
import SignupForm from '~/components/auth/SignupForm'

export const meta: MetaFunction = () => [
  {
    title: 'Login - OctoMed | Your AI Health Assistant',
  },
  {
    name: 'description',
    content: 'Your AI Health Assistant',
  },
]

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
