import { Outlet } from '@remix-run/react'
import Mindset from '~/assets/images/auth.png'
import { Logo } from '~/components/shared/icons'

export default function Auth() {
  return (
    <section className="auth-layout lg:grid lg:min-h-screen lg:p-[10px]">
      <section className="hidden rounded-[20px] lg:relative lg:col-span-1 lg:col-start-1 lg:block lg:h-full lg:bg-primary lg:p-[35px]">
        <Logo className="h-[27.22px] w-[115px] text-white" />

        <div className="absolute bottom-0 left-1/2 w-[456px] -translate-x-1/2">
          <p className="mb-[50px] ml-[35px] font-raleway text-2xl font-bold text-white">
            Lorem ipsum dolor sit amet, consectetur.
          </p>
          <img src={Mindset} />
        </div>
      </section>

      <section className="px-[25px] pt-[50px] lg:col-span-1 lg:col-start-2 lg:pt-[10px]">
        <div className="lg:hidden">
          <Logo className="h-[27.22px] w-[115px] text-primary" />
        </div>

        <Outlet />
      </section>
    </section>
  )
}
