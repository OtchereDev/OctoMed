import { Link } from '@remix-run/react'
import { useState } from 'react'
import ForgotPasswordForm from '~/components/auth/ForgotPasswordForm'

export default function ForgotPassword() {
  const [success, setSuccess] = useState(false)
  return (
    <section>
      <p className="mt-[10px] hidden text-right font-montserrat text-[#4F4F4F] lg:block">
        Don’t have an accoun?{' '}
        <Link to={'/signup'} className="font-bold text-primary">
          Sign Up
        </Link>
      </p>
      <section className="lg:mx-auto lg:max-w-[400px] lg:pb-[50px]">
        {success ? (
          <div className="text-center">
            <h1 className="mt-[60px] font-raleway font-bold text-primary lg:mt-[180px] lg:text-2xl">
              Reset link sent
            </h1>
            <p className="mb-[30px] mt-[20px] font-montserrat text-sm text-[#191919] lg:text-base">
              The reset link has been sent to your email. Click on the link to reset your password.
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
              Forgot your password?
            </h1>
            <p className="mb-[30px] mt-[20px] font-montserrat text-sm text-[#191919] lg:text-base">
              Enter the email on your account and we’ll send you a reset link.
            </p>
            <ForgotPasswordForm />
            <Link to={'/login'} className="mt-[25px] block text-center font-bold text-primary">
              Return to login
            </Link>
          </>
        )}
      </section>
    </section>
  )
}
