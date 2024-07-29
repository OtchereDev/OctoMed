import { Form } from '@remix-run/react'
import Input from '../shared/Input'
import PhoneInput from '../shared/PhoneInput'

export default function ProfileDetailForm() {
  return (
    <Form>
      <div className="my-[30px] flex flex-1 flex-col gap-[30px] lg:grid lg:grid-cols-3">
        <Input name="name" label="Name" type="string" />
        <Input name="email" label="Email" type="email" />
        <PhoneInput
          country={'gb'}
          inputProps={{
            name: 'phone_number',
          }}
        />
        <Input label="Date of Birth" type="date" name="dob" />
        <Input label="Password" type="password" name="password" defaultValue="Tehdsndjee" />
      </div>

      <button className="rounded-primary bg-[#1282A2] px-8 py-[10px] font-raleway font-bold text-white">
        Save
      </button>
    </Form>
  )
}
