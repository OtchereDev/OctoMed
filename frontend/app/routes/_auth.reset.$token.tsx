import { Link } from '@remix-run/react'
import { useState } from 'react'
import CreateNewPassword from '~/components/auth/CreateNewPassword'

export default function ResetPassword() {
  const [success, setSuccess] = useState(true)
  return (
    <section>
      <p className="mt-[10px] hidden text-right font-montserrat text-[#4F4F4F] lg:block">
        Don’t have an accoun?{' '}
        <Link to={'/signup'} className="font-bold text-primary">
          Sign Up
        </Link>
      </p>
      <section className="lg:mx-auto lg:max-w-[500px] lg:pb-[50px]">
        {success ? (
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
            <p className="mb-[30px] mt-[20px] font-montserrat text-sm text-secondary lg:text-base">
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
