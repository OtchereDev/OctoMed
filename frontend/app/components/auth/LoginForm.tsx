import { Link } from '@remix-run/react'
import Input from '../shared/Input'

export default function LoginForm() {
  return (
    <form className="max-w-s flex flex-col gap-[20px]">
      <Input label="Email" type="text" name={'name'} />
      <div>
        <Input label="Password" type="password" name={'name'} />
        <Link to={'/forgot-password'} className="mt-2 text-xs text-[#0085FF]">
          I’ve forgotten my password
        </Link>
        <div className="mt-[30px] flex justify-end lg:mt-8">
          <button className="rounded-primary bg-primary px-[52px] py-[17px] font-bold text-white">
            Log in
          </button>
        </div>
      </div>
    </form>
  )
}
