import { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node'
import { Form, MetaFunction, json, redirect, useActionData } from '@remix-run/react'
import { useEffect, useState } from 'react'
import { GetCountries, GetState } from 'react-country-state-city'
import Onboard from '~/assets/images/onboarding.png'
import OnboardingFormButton from '~/components/auth/OnboardingFormButton'
import SaveAndContinue from '~/components/auth/SaveAndContinue'
import Input from '~/components/shared/Input'
import Modal from '~/components/shared/Modal'
import PhoneInput from '~/components/shared/PhoneInput'
import Stepper from '~/components/shared/Stepper'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'
import { toast } from '~/components/ui/use-toast'
import { LocationDTO } from '~/dto/user.dto'
import { IError, formatZodErrors } from '~/lib/formatZodError'
import { getFormError } from '~/lib/getFormError'
import { preventUnAuthorizedUser } from '~/lib/preventUnAuthorizedUser'
import { locationDetails } from '~/server/user.server'
import { getSession } from '~/sessions'

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

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const country = formData.get('country') ?? ''
  const region = formData.get('region') ?? ''
  const city = formData.get('city') ?? ''
  const street = formData.get('street') ?? ''
  const name = formData.get('name') ?? ''
  const phone_number = formData.get('phone_number') ?? ''

  const session = await getSession(request.headers.get('Cookie'))

  try {
    const result = LocationDTO.parse({
      country,
      region,
      city,
      street,
      name,
      phone_number: (phone_number as string).replace(/ /g, ''),
    })

    const response = await locationDetails(result, session.get('accessToken') as string)
    if (response.status) {
      session.flash('toast', 'Successfully added location detail')

      return redirect('/')
    } else {
      return json({
        errors: [] as IError[],
        response: response.message,
      })
    }
  } catch (error: any) {
    if (error.errors?.length) {
      return json({
        errors: formatZodErrors(error.errors),
        response: 'Validation Errors',
      })
    }
  }
}

export default function Location() {
  const [countries, setCountries] = useState<any[]>([])
  const [regions, setRegions] = useState<any[]>([])
  const response = useActionData<typeof action>()

  useEffect(() => {
    if (response?.response) {
      toast({
        title: 'Onboarding',
        description: response?.response,
      })
    }
  }, [response])

  useEffect(() => {
    GetCountries().then((result: any) => {
      setCountries(result)
    })
  }, [])

  return (
    <section className="mt-14 lg:mt-0">
      <SaveAndContinue />
      <Form
        method="POST"
        className="lg:relative lg:mx-auto lg:mt-[80px] lg:max-w-[700px] lg:pb-[190px]"
      >
        <Stepper stage={3} title="03 - Location Info" />
        <h1 className="mt-[30px] font-raleway font-bold text-primary lg:text-2xl">
          Provide your location details
        </h1>
        <h3 className="mb-[30px] mt-[20px] font-montserrat text-sm text-[#191919] lg:mb-[40px] lg:mt-[30px] lg:text-base">
          Where are you located?
        </h3>

        <div className="flex flex-col gap-y-4 lg:grid lg:grid-cols-2 lg:gap-[30px]">
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
              {getFormError('country', response?.errors)}
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
              {getFormError('region', response?.errors)}
            </p>
          </div>
          <Input
            type="text"
            label="City"
            name="city"
            error={getFormError('city', response?.errors)}
          />
          <Input
            type="text"
            label="Street"
            name="street"
            error={getFormError('street', response?.errors)}
          />
        </div>

        <div className="mt-6">
          <p className="mb-3 font-montserrat text-[#191919]">Emergency Contact</p>
          <div className="flex flex-col gap-4 lg:grid lg:grid-cols-2 lg:gap-[30px]">
            <Input
              type="text"
              label="Name"
              name="name"
              error={getFormError('name', response?.errors)}
            />
            <div>
              <PhoneInput
                country={'gb'}
                inputProps={{
                  name: 'phone_number',
                }}
              />
              <p className="mt-1 font-montserrat text-xs text-red-500">
                {getFormError('phone_number', response?.errors)}
              </p>
            </div>
          </div>
        </div>

        <OnboardingFormButton backLink="/onboarding/health-details" label="Submit" />
      </Form>
      <Modal isOpen={false}>
        <img src={Onboard} className="mx-auto mt-[50px] h-[219px] w-[214px]" />
        <h3 className="mt-[40px] text-center font-raleway text-base font-semibold text-primary lg:text-2xl">
          Putting together your dashboard......
        </h3>
        <p className="mt-[30px] pb-[30px] text-center font-montserrat font-medium text-[#191919] lg:pb-[79px]">
          Just a few minutes
        </p>
      </Modal>
    </section>
  )
}
