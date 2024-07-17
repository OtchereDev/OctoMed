import Input from '../shared/Input'

export default function ForgotPasswordForm() {
  return (
    <form className="max-w-s flex flex-col gap-[20px]">
      <Input label="Email" type="text" name={'name'} />
      <button className="mt-[30px] w-full rounded-primary bg-primary px-[52px] py-[17px] font-bold text-white">
        Send Link
      </button>
    </form>
  )
}
