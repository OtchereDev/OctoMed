import { Form } from '@remix-run/react'
import { useEffect, useState } from 'react'
import { GetCountries, GetState } from 'react-country-state-city'
import Input from '../shared/Input'
import PhoneInput from '../shared/PhoneInput'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

export default function LocationForm() {
  const [countries, setCountries] = useState<any[]>([])
  const [regions, setRegions] = useState<any[]>([])

  useEffect(() => {
    GetCountries().then((result: any) => {
      setCountries(result)
    })
  }, [])

  return (
    <Form name="location">
      <div className="mt-8 flex flex-col gap-y-4 lg:grid lg:grid-cols-3 lg:gap-[30px]">
        <div>
          <Select
            onValueChange={async (e) => {
              const country = countries.find((country) => country.name == e)
              GetState(country.id).then((result: any) => {
                setRegions(result)
              })
            }}
            name="country"
          >
            <SelectTrigger className="w-full rounded-primary border-[#667085] !py-[24px] focus:outline-none">
              <SelectValue placeholder="Country" className="text-[#667085]" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem value={country?.name}>
                  {country?.emoji} {country?.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="mt-1 font-montserrat text-xs text-red-500">
            {/* {getFormError('country', response?.errors)} */}
          </p>
        </div>

        <div>
          <Select name="region">
            <SelectTrigger className="w-full rounded-primary border-[#667085] !py-[24px] focus:outline-none">
              <SelectValue placeholder="State/Region" className="text-[#667085]" />
            </SelectTrigger>
            <SelectContent>
              {regions.map((country) => (
                <SelectItem value={country?.name}>{country?.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="mt-1 font-montserrat text-xs text-red-500">
            {/* {getFormError('region', response?.errors)} */}
          </p>
        </div>
        <Input
          type="text"
          label="City"
          name="city"
          // error={getFormError('city', response?.errors)}
        />
        <Input
          type="text"
          label="Street"
          name="street"
          // error={getFormError('street', response?.errors)}
        />
      </div>

      <div className="mt-6">
        <p className="mb-3 font-montserrat text-[#191919]">Emergency Contact</p>
        <div className="flex flex-col gap-4 lg:grid lg:grid-cols-3 lg:gap-[30px]">
          <Input
            type="text"
            label="Name"
            name="name"
            // error={getFormError('name', response?.errors)}
          />
          <div>
            <PhoneInput
              country={'gb'}
              inputProps={{
                name: 'phone_number',
              }}
            />
            <p className="mt-1 font-montserrat text-xs text-red-500">
              {/* {getFormError('phone_number', response?.errors)} */}
            </p>
          </div>
        </div>
      </div>

      <button className="mt-8 rounded-primary bg-[#1282A2] px-8 py-[10px] font-raleway font-bold text-white">
        Save
      </button>
    </Form>
  )
}
