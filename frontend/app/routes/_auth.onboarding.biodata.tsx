import { LoaderFunctionArgs } from '@remix-run/node'
import { Link, MetaFunction, json, redirect } from '@remix-run/react'
import Input from '~/components/shared/Input'
import Stepper from '~/components/shared/Stepper'
import { BackArrow, Person } from '~/components/shared/icons'
import { preventUnAuthorizedUser } from '~/lib/preventUnAuthorizedUser'

export const meta: MetaFunction = () => [
  {
    title: 'Onboarding - OctoMed | Your AI Health Assistant',
  },
  {
    name: 'description',
    content: 'Your AI Health Assistant',
  },
]

export async function loader({ request }: LoaderFunctionArgs) {
  if (await preventUnAuthorizedUser(request)) {
    return redirect('/')
  }

  return json({})
}

export default function Biodata() {
  return (
    <section className="mt-14 lg:mt-0">
      <Link
        to={'/signup'}
        className="mt-[10px] hidden text-right font-montserrat font-semibold text-[#191919] lg:block"
      >
        <p className="">Save and continue later</p>
      </Link>
      <section className="lg:relative lg:mx-auto lg:mt-[80px] lg:max-w-[700px] lg:pb-[190px]">
        <Stepper stage={1} title="01 - Personal Info" />
        <h1 className="mt-[30px] font-raleway font-bold text-primary lg:text-2xl">
          Provide your personal details
        </h1>
        <h3 className="mt-[20px] font-montserrat text-sm text-[#191919] lg:mt-[30px] lg:text-base">
          Help us know more about you
        </h3>

        <div className="mt-[30px] flex items-center gap-10 lg:mt-[40px]">
          <div className="flex h-[100px] w-[100px] items-center justify-center overflow-hidden rounded-full bg-[#1382a2] bg-opacity-10">
            <Person className="size-16 text-primary opacity-50" />
          </div>
          <button className="relative rounded-primary border-[1.5px] border-primary px-[35px] py-[10px] font-raleway text-sm font-bold text-primary">
            Upload
            <input type="file" className="absolute left-0 top-0 h-full w-full opacity-0" />
          </button>
        </div>

        <div className="lg: mt-[30px] flex flex-col items-start gap-y-[30px] lg:mt-[40px] lg:grid lg:grid-cols-2 lg:gap-x-[30px]">
          <div>
            <Input label="Age" type="text" name="age" />
            <div className="mt-2 flex items-center gap-1 text-xs text-[#667085]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-4"
              >
                <path
                  fillRule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                  clipRule="evenodd"
                />
              </svg>
              <p>Calculated from date of birth</p>
            </div>
          </div>

          <div className="flex items-start gap-[15px]">
            <select
              className="w-[98px] rounded-primary border border-[#667085] px-[15px] py-[18px] font-poppins text-sm text-[#191919] lg:py-[15px]"
              name=""
              id=""
            >
              <option value="">KG</option>
            </select>
            <Input type="number" label="Weight" name="weight" />
          </div>
          <div className="flex items-start gap-[15px]">
            <select
              className="w-[98px] rounded-primary border border-[#667085] px-[15px] py-[18px] font-poppins text-sm text-[#191919] lg:py-[15px]"
              name=""
              id=""
            >
              <option value="">CM</option>
            </select>
            <Input type="number" label="Height" name="height" />
          </div>
        </div>

        <div className="bottom-0 left-0 mt-20 flex justify-between border-t pb-10 pt-9 lg:absolute lg:w-full">
          <button className="flex items-center gap-5 font-raleway text-[20px] font-bold text-[#8c8c8c]">
            <BackArrow />
            Back
          </button>

          <button className="rounded-primary bg-[#1282A2] px-[63px] py-[17px] font-raleway font-bold text-white">
            Next
          </button>
        </div>
      </section>
    </section>
  )
}
