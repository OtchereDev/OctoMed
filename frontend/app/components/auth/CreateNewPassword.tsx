import { Close } from '../shared/icons'
import Input from '../shared/Input'

export default function CreateNewPassword() {
  return (
    <form className="max-w-s flex flex-col gap-[20px]">
      <div>
        <Input label="New Password" type="password" name={'password'} />
        <div className="mt-4 grid w-[400px] grid-cols-2 gap-3">
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
      <Input label="Confirm New Password" type="password" name={'confirm_password'} />
      <button className="mt-[30px] w-full rounded-primary bg-primary px-[52px] py-[17px] font-bold text-white">
        Reset Password
      </button>
    </form>
  )
}
