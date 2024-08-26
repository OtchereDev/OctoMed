import { ActionFunctionArgs, json, LoaderFunctionArgs } from '@remix-run/node'
import { useSearchParams } from '@remix-run/react'
import DietContent from '~/components/diet/DietContent'
import ExerciseContent from '~/components/diet/ExerciseContent'
import DateFilter from '~/components/shared/DateFilter'
import { Tabs, TabsList, TabsTrigger } from '~/components/ui/tabs'
import { IError } from '~/lib/formatZodError'
import { getDietDashboard, ToggleMealCompletion } from '~/server/diet.server'
import {
  getExerciseDashboard,
  ToggleExerciseCompletion,
  ToggleExerciseInstructionCompletion,
} from '~/server/exercise.server'
import { getSession } from '~/sessions'

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)

  const session = await getSession(request.headers.get('Cookie'))
  const accessToken = session.get('accessToken')!

  let currentTab = searchParams.get('tab') || 'diet'
  const datestr = searchParams.get('date')
  const date = datestr?.length ? new Date(datestr).toISOString() : new Date().toISOString()

  if (!['diet', 'fitness'].includes(currentTab)) {
    currentTab = 'diet'
  }

  if (currentTab == 'diet') {
    const resp = await getDietDashboard(date, accessToken)
    return json(resp)
  } else {
    const resp = await getExerciseDashboard(date, accessToken)
    return json(resp)
  }
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const session = await getSession(request.headers.get('Cookie'))
  const accessToken = session.get('accessToken')!

  const url = new URL(request.url)
  const formData = await request.formData()
  const formName = formData.get('form')

  const tab = url.searchParams.get('tab') || 'diet'
  const generalError = {
    path: 'global',
    message: 'Unhandles action is being perform',
  } as IError

  if (tab == 'diet') {
    switch (formName) {
      case 'mark-complete':
        return await ToggleMealCompletion(formData, accessToken)

      default:
        return json({
          errors: [generalError],
          response: generalError.message,
        })
    }
  } else if (tab == 'fitness') {
    switch (formName) {
      case 'mark-complete':
        return await ToggleExerciseCompletion(formData, accessToken)
      case 'mark-instruction':
        return await ToggleExerciseInstructionCompletion(formData, accessToken)
      default:
        return json({
          errors: [generalError],
          response: generalError.message,
        })
    }
  } else {
    return json({
      errors: [generalError],
      response: generalError.message,
    })
  }
}

export default function DietAndExcerise() {
  const [searchParams, setSearchParams] = useSearchParams()
  const currentTab = searchParams.get('tab') || 'diet'

  return (
    <section className="px-5 py-5 pb-24 font-montserrat lg:px-0 lg:py-8">
      <h3 className="mb-5 text-lg font-semibold text-[#333] lg:hidden">Diet and Fitness</h3>

      <Tabs
        onValueChange={(value) => {
          setSearchParams({ tab: value })
        }}
        defaultValue={currentTab}
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="lg:order-2">
            <DateFilter />
          </div>
          <TabsList className="w-full justify-between rounded-[8px] border border-[#D0D5DD] !bg-none p-[6px] font-montserrat font-bold lg:order-1 lg:w-[640px]">
            <TabsTrigger
              className="flex-1 px-0 font-bold text-[#333] data-[state=active]:!bg-[#e6f7fe]"
              value="diet"
            >
              Diet Plans
            </TabsTrigger>
            <TabsTrigger
              className="flex-1 font-bold text-[#333] data-[state=active]:!bg-[#e6f7fe]"
              value="fitness"
            >
              Fitness
            </TabsTrigger>
          </TabsList>
        </div>

        <DietContent />
        <ExerciseContent />
      </Tabs>
    </section>
  )
}
