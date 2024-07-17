import { Link, MetaFunction } from '@remix-run/react'
import Onboard from '~/assets/images/onboarding.png'
import Input from '~/components/shared/Input'
import Modal from '~/components/shared/Modal'
import PhoneInput from '~/components/shared/PhoneInput'
import Stepper from '~/components/shared/Stepper'
import { BackArrow } from '~/components/shared/icons'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'

export const meta: MetaFunction = () => [
  {
    title: 'Onboarding - OctoMed | Your AI Health Assistant',
  },
  {
    name: 'description',
    content: 'Your AI Health Assistant',
  },
]

export default function Location() {
  return (
    <section className="mt-14 lg:mt-0">
      <Link
        to={'/signup'}
        className="mt-[10px] hidden text-right font-montserrat font-semibold text-[#191919] lg:block"
      >
        <p className="">Save and continue later</p>
      </Link>
      <section className="lg:relative lg:mx-auto lg:mt-[80px] lg:max-w-[700px] lg:pb-[190px]">
        <Stepper stage={3} title="03 - Location Info" />
        <h1 className="mt-[30px] font-raleway font-bold text-primary lg:text-2xl">
          Provide your location details
        </h1>
        <h3 className="mb-[30px] mt-[20px] font-montserrat text-sm text-[#191919] lg:mb-[40px] lg:mt-[30px] lg:text-base">
          Where are you located?
        </h3>

        <div className="flex flex-col gap-y-4 lg:grid lg:grid-cols-2 lg:gap-[30px]">
          <Select>
            <SelectTrigger className="w-full rounded-primary border-[#667085] !py-[24px] focus:outline-none">
              <SelectValue placeholder="Country" className="text-[#667085]" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-full rounded-primary border-[#667085] !py-[24px] focus:outline-none">
              <SelectValue placeholder="State/Region" className="text-[#667085]" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
          <Input type="text" label="City" name="city" />
          <Input type="text" label="Street" name="street" />
        </div>

        <div className="mt-6">
          <p className="mb-3 font-montserrat text-[#191919]">Emergency Contact</p>
          <div className="flex flex-col gap-4 lg:grid lg:grid-cols-2 lg:gap-[30px]">
            <Input type="text" label="Name" name="name" />
            <PhoneInput country={'gb'} />
          </div>
        </div>

        <Modal isOpen={false}>
          <img src={Onboard} className="mx-auto mt-[50px] h-[219px] w-[214px]" />
          <h3 className="mt-[40px] text-center font-raleway text-base font-semibold text-primary lg:text-2xl">
            Putting together your dashboard......
          </h3>
          <p className="mt-[30px] pb-[30px] text-center font-montserrat font-medium text-[#191919] lg:pb-[79px]">
            Just a few minutes
          </p>
        </Modal>

        <div className="bottom-0 left-0 mt-20 flex justify-between border-t pb-10 pt-9 lg:absolute lg:w-full">
          <button className="flex items-center gap-5 font-raleway text-[20px] font-bold text-[#8c8c8c]">
            <BackArrow />
            Back
          </button>

          <button className="rounded-primary bg-[#1282A2] px-[63px] py-[17px] font-raleway font-bold text-white">
            Submit
          </button>
        </div>
      </section>
    </section>
  )
}
