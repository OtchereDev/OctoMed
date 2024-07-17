import Input from '../shared/Input'
import PhoneInput from '../shared/PhoneInput'
import { Close } from '../shared/icons'

export default function SignupForm() {
  return (
    <div>
      <div className="max-w-s flex flex-col gap-[20px] lg:grid lg:grid-cols-2">
        <Input label="Name" type="text" name={'name'} />
        <Input label="Email" type="text" name="email" />
        <PhoneInput country={'gb'} />
        <Input label="Date of Birth" type="date" name="dob" />
        <Input label="Password" type="password" name="password" />
        <Input label="Confirm Password" type="password" name="confirm_password" />
      </div>

      <div className="mt-[15px] hidden lg:block">
        <p className="font-montserrat text-xs font-medium text-[#191919]">
          Your password must include:
        </p>
        <div className="mt-2 grid w-[400px] grid-cols-2 gap-3">
          <div className="flex items-center gap-1">
            <Close color="#DC2626" />
            <p className="text-xs text-[#667085]">At least 8 characters</p>
          </div>
          <div className="flex items-center gap-1">
            <Close color="#DC2626" />
            <p className="text-xs text-[#667085]">Lowercase letters</p>
          </div>
          <div className="flex items-center gap-1">
            <Close color="#DC2626" />
            <p className="text-xs text-[#667085]">Uppercase letters</p>
          </div>
          <div className="flex items-center gap-1">
            <Close color="#DC2626" />
            <p className="text-xs text-[#667085]">Numbers</p>
          </div>
          <div className="flex items-center gap-1">
            <Close color="#DC2626" />
            <p className="text-xs text-[#667085]">Special characters</p>
          </div>
        </div>
      </div>
      <div className="mt-[10px] flex justify-end lg:mt-8">
        <button className="rounded-primary bg-primary px-[52px] py-[17px] font-bold text-white">
          Sign Up
        </button>
      </div>
    </div>
  )
}
