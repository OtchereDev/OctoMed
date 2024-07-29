import { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node'
import { Form, MetaFunction, json, redirect, useActionData, useLoaderData } from '@remix-run/react'
import { useEffect } from 'react'
import Avatar from '~/components/auth/Avatar'
import OnboardingFormButton from '~/components/auth/OnboardingFormButton'
import SaveAndContinue from '~/components/auth/SaveAndContinue'
import Input from '~/components/shared/Input'
import Stepper from '~/components/shared/Stepper'
import { toast } from '~/components/ui/use-toast'
import { BioDataDTO } from '~/dto/user.dto'
import calcAge from '~/lib/calculateAge'
import { IError, formatZodErrors } from '~/lib/formatZodError'
import { getFormError } from '~/lib/getFormError'
import { preventUnAuthorizedUser } from '~/lib/preventUnAuthorizedUser'
import { bioData, getCurrentUserDetail } from '~/server/user.server'
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

  const session = await getSession(request.headers.get('Cookie'))
  const accessToken = session.get('accessToken')

  const response = await getCurrentUserDetail(accessToken as string)

  return json({
    user: response.user!,
  })
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const avatar = formData.get('avatar') ?? ''
  const height = formData.get('height') ?? ''
  const height_metric = formData.get('height_metric') ?? ''
  const weight = formData.get('weight') ?? ''
  const weight_metric = formData.get('weight_metric') ?? ''

  const session = await getSession(request.headers.get('Cookie'))

  try {
    const result = BioDataDTO.parse({
      avatar,
      height: parseFloat(height as string),
      height_metric,
      weight: parseFloat(weight as string),
      weight_metric,
    })

    const response = await bioData(result, session.get('accessToken') as string)
    if (response.status) {
      session.flash('toast', 'Successfully added biodata')

      return redirect('/onboarding/health-details')
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

export default function Biodata() {
  const { user } = useLoaderData<typeof loader>()
  const response = useActionData<typeof action>()

  useEffect(() => {
    if (response?.response) {
      toast({
        title: 'Onboarding',
        description: response?.response,
      })
    }
  }, [response])
  return (
    <section className="mt-14 lg:mt-0">
      <SaveAndContinue />
      <Form
        method="POST"
        className="lg:relative lg:mx-auto lg:mt-[80px] lg:max-w-[700px] lg:pb-[190px]"
      >
        <Stepper stage={1} title="01 - Personal Info" />
        <h1 className="mt-[30px] font-raleway font-bold text-primary lg:text-2xl">
          Provide your personal details
        </h1>
        <h3 className="mt-[20px] font-montserrat text-sm text-[#191919] lg:mt-[30px] lg:text-base">
          Help us know more about you
        </h3>

        <div className="mt-[30px] flex items-center gap-10 lg:mt-[40px]">
          <Avatar name="avatar" />
        </div>

        <div className="lg: mt-[30px] flex flex-col items-start gap-y-[30px] lg:mt-[40px] lg:grid lg:grid-cols-2 lg:gap-x-[30px]">
          <div className="w-full">
            <Input
              defaultValue={calcAge(new Date(user?.dob))}
              disabled
              label="Age"
              type="text"
              name="age"
            />
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
              error={getFormError('weight', response?.errors)}
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
              error={getFormError('height', response?.errors)}
            />
          </div>
        </div>

        <OnboardingFormButton backLink="" />
      </Form>
    </section>
  )
}
