import { Form } from '@remix-run/react'
import calcAge from '~/lib/calculateAge'
import Input from '../shared/Input'

export default function BioDataForm() {
  return (
    <Form>
      <section className="my-[30px] flex w-full flex-col items-start gap-y-[30px] lg:mt-[40px] lg:grid lg:grid-cols-3 lg:gap-x-[30px]">
        <div className="w-full">
          <Input defaultValue={calcAge(new Date())} disabled label="Age" type="text" name="age" />
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

        <div className="flex w-full items-start gap-[15px]">
          <select
            className="w-[98px] rounded-primary border border-[#667085] px-[15px] py-[18px] font-poppins text-sm text-[#191919] lg:py-[15px]"
            name="weight_metric"
          >
            <option value="KG">KG</option>
            <option value="G">G</option>
          </select>
          <Input
            type="number"
            label="Weight"
            name="weight"
            // error={getFormError('weight', response?.errors)}
          />
        </div>
        <div className="flex w-full items-start gap-[15px]">
          <select
            className="w-[98px] rounded-primary border border-[#667085] px-[15px] py-[18px] font-poppins text-sm text-[#191919] lg:py-[15px]"
            name="height_metric"
          >
            <option value="CM">CM</option>
            <option value="M">M</option>
          </select>
          <Input
            type="number"
            label="Height"
            name="height"
            // error={getFormError('height', response?.errors)}
          />
        </div>
      </section>

      <button className="rounded-primary bg-[#1282A2] px-8 py-[10px] font-raleway font-bold text-white">
        Save
      </button>
    </Form>
  )
}
