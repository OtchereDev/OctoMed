import { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node'
import { Form, MetaFunction, json, redirect, useActionData, useLoaderData } from '@remix-run/react'
import { useEffect } from 'react'
import OnboardingFormButton from '~/components/auth/OnboardingFormButton'
import SaveAndContinue from '~/components/auth/SaveAndContinue'
import Stepper from '~/components/shared/Stepper'
import { Checkbox } from '~/components/ui/checkbox'
import { toast } from '~/components/ui/use-toast'
import { HealthDetailDTO } from '~/dto/user.dto'
import { IError, formatZodErrors } from '~/lib/formatZodError'
import { preventUnAuthorizedUser } from '~/lib/preventUnAuthorizedUser'
import { getHealthConditions } from '~/server/health-condition.server'
import { healthDetail } from '~/server/user.server'
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

  const response = await getHealthConditions()

  return json({
    ...response,
  })
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const allergies = formData.getAll('allergies') ?? []
  const health_conditions = formData.getAll('health_conditions') ?? []

  const session = await getSession(request.headers.get('Cookie'))

  try {
    const result = HealthDetailDTO.parse({
      allergies: allergies.map((x) => parseInt(x as string)),
      health_conditions: health_conditions.map((x) => parseInt(x as string)),
      remove_allergies: [],
      remove_health_conditions: [],
    })

    const response = await healthDetail(result, session.get('accessToken') as string)
    if (response.status) {
      session.flash('toast', 'Successfully added health details')

      return redirect('/onboarding/location')
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

export default function HealthDetails() {
  const loaderData = useLoaderData<typeof loader>()
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
        <Stepper stage={2} title="02 - Health Info" />
        <h1 className="mt-[30px] font-raleway font-bold text-primary lg:text-2xl">
          Provide your health details
        </h1>
        <h3 className="mt-[20px] font-montserrat text-sm text-[#191919] lg:mt-[30px] lg:text-base">
          Share any allergies and existing health conditions you have
        </h3>

        <div className="relative mt-5 h-[471px] w-full overflow-scroll rounded-primary bg-[#fffaef] p-[20px]">
          <h4 className="font-montserrat font-semibold text-[#4D5061]">Allergies</h4>
          <div className="mt-4 flex flex-col gap-y-4 lg:grid lg:grid-cols-3">
            {loaderData?.allergies.map((allergy) => (
              <div className="flex items-center gap-3" key={allergy.id}>
                <Checkbox
                  className="border-[#D0D5DD] data-[state=checked]:bg-[#F5CB5C]"
                  value={allergy.id}
                  name="allergies"
                />
                <p className="font-montserrat text-sm text-[#353746]">{allergy.allergy}</p>
              </div>
            ))}
          </div>
          <h4 className="mt-7 font-montserrat font-semibold text-[#4D5061]">Health Conditions</h4>
          <div className="mt-4 flex flex-col gap-y-4 lg:grid lg:grid-cols-3">
            {loaderData?.health_conditions?.map((allergy) => (
              <div className="flex items-center gap-3" key={allergy.id}>
                <Checkbox
                  name="health_conditions"
                  value={allergy.id}
                  className="border-[#D0D5DD] data-[state=checked]:bg-[#F5CB5C]"
                />
                <p className="font-montserrat text-sm text-[#353746]">{allergy.health_condition}</p>
              </div>
            ))}
          </div>
        </div>

        <OnboardingFormButton backLink="/onboarding/biodata" />
      </Form>
    </section>
  )
}
