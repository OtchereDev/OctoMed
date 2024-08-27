import { ActionFunctionArgs, json, LoaderFunctionArgs, MetaFunction } from '@remix-run/node'
import { useSearchParams } from '@remix-run/react'
import AddHealthData from '~/components/health-data/AddHealthData'
import BloodGlucose from '~/components/health-data/BloodGlucose'
import BloodPressure from '~/components/health-data/BloodPressure'
import BloodPressureTable from '~/components/health-data/BloodPressureTable'
import GlucoseTable from '~/components/health-data/GlucoseTable'
import Height from '~/components/health-data/Height'
import HeightTable from '~/components/health-data/HeightTable'
import PulseChart from '~/components/health-data/PulseChart'
import PulseTable from '~/components/health-data/PulseTable'
import SleepPattern from '~/components/health-data/SleepPattern'
import SleepTable from '~/components/health-data/SleepTable'
import Weight from '~/components/health-data/Weight'
import WeightTable from '~/components/health-data/WeightTable'
import DateFilter from '~/components/shared/DateFilter'
import { CirclePlus } from '~/components/shared/icons'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs'
import { IError } from '~/lib/formatZodError'
import {
  createBloodGlucose,
  createBloodPressure,
  createHeight,
  createPulse,
  createSleepPattern,
  createWeight,
  deleteBloodGlucose,
  deleteBloodPressure,
  deleteHeight,
  deletePulse,
  deleteSleep,
  deleteWeight,
  fetchMetrics,
  updateBloodGlucose,
  updateBloodPressure,
  updateHeight,
  updatePluse,
  updateSleep,
  updateWeight,
} from '~/server/health-data.server'
import { getSession } from '~/sessions'

export const meta: MetaFunction = () => [
  {
    title: 'OctoMed | Your AI Health Assistant',
  },
  {
    name: 'description',
    content: 'Your AI Health Assistant',
  },
]

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get('Cookie'))
  const accessToken = session.get('accessToken')!
  const url = new URL(request.url)
  const tab = url.searchParams.get('tab') || 'summary'

  const response = await fetchMetrics(accessToken)

  return json(response)
}

export async function action({ request }: ActionFunctionArgs) {
  const session = await getSession(request.headers.get('Cookie'))
  const accessToken = session.get('accessToken')!

  const formData = await request.formData()
  const formName = formData.get('form')

  const generalError = {
    path: 'global',
    message: 'Unhandles action is being perform',
  } as IError

  switch (formName) {
    case 'create-pulse':
      return await createPulse(formData, accessToken)
    case 'create-blood-pressure':
      return await createBloodPressure(formData, accessToken)
    case 'create-blood-glucose':
      return await createBloodGlucose(formData, accessToken)
    case 'create-height':
      return await createHeight(formData, accessToken)
    case 'create-weight':
      return await createWeight(formData, accessToken)
    case 'create-sleep-pattern':
      return await createSleepPattern(formData, accessToken)
    case 'delete-pulse':
      return await deletePulse(formData, accessToken)
    case 'delete-bloodpressure':
      return await deleteBloodPressure(formData, accessToken)
    case 'delete-bloodglucose':
      return await deleteBloodGlucose(formData, accessToken)
    case 'delete-weight':
      return await deleteWeight(formData, accessToken)
    case 'delete-height':
      return await deleteHeight(formData, accessToken)
    case 'delete-sleeppattern':
      return await deleteSleep(formData, accessToken)
    case 'update-pulse':
      return await updatePluse(formData, accessToken)
    case 'update-blood-pressure':
      return await updateBloodPressure(formData, accessToken)
    case 'update-blood-glucose':
      return await updateBloodGlucose(formData, accessToken)
    case 'update-height':
      return await updateHeight(formData, accessToken)
    case 'update-weight':
      return await updateWeight(formData, accessToken)
    case 'update-sleep-pattern':
      return await updateSleep(formData, accessToken)

    default:
      return json({
        errors: [generalError],
        response: generalError.message,
      })
  }
}

export default function HealthData() {
  const [searchParams, setSearchParams] = useSearchParams()
  return (
    <div className="mt-5 px-5 pb-28 font-montserrat lg:mt-[40px] lg:px-0">
      <h3 className="mb-5 text-lg font-semibold text-[#333] lg:hidden">Health Data</h3>
      <Tabs onValueChange={(v) => setSearchParams({ tab: v })} defaultValue="summary">
        <TabsList className="w-full justify-between rounded-[8px] border border-[#D0D5DD] !bg-none p-[6px] font-montserrat font-bold lg:w-[640px]">
          <TabsTrigger
            className="flex-1 px-0 font-bold text-[#333] data-[state=active]:!bg-[#e6f7fe]"
            value="summary"
          >
            Summary
          </TabsTrigger>
          <TabsTrigger
            className="flex-1 font-bold text-[#333] data-[state=active]:!bg-[#e6f7fe]"
            value="detailed"
          >
            Detailed
          </TabsTrigger>
        </TabsList>

        <div className="mt-9 flex flex-col justify-between gap-6 lg:mt-[25px] lg:flex-row lg:items-center lg:gap-0">
          <DateFilter />

          <AddHealthData>
            <button className="flex gap-3 rounded-primary bg-[#1282A2] px-[32px] py-3 font-raleway font-bold text-white">
              <div className="flex h-[24px] w-[24px] items-center justify-center rounded-full border-2 border-dashed">
                <CirclePlus />
              </div>
              Add Health Data
            </button>
          </AddHealthData>
        </div>
        <TabsContent value="summary" className="mt-10">
          <div className="flex flex-col gap-7 lg:flex-row">
            <PulseChart />
            <SleepPattern />
          </div>

          <div className="mt-7 flex flex-col gap-8 lg:flex-row">
            <BloodPressure />
            <BloodGlucose />
          </div>

          <div className="mt-7 flex flex-col gap-8 lg:flex-row">
            <Weight />
            <Height />
          </div>
        </TabsContent>
        <TabsContent value="detailed">
          <div className="">
            <div className="mt-[50px] flex flex-col gap-8 lg:flex-row">
              <PulseTable />
              <GlucoseTable />
            </div>

            <div className="mt-[50px] flex flex-col gap-8 lg:flex-row">
              <BloodPressureTable />
            </div>

            <div className="mt-[50px] flex flex-col gap-8 lg:flex-row">
              <SleepTable />
            </div>

            <div className="mt-[50px] flex flex-col gap-8 lg:flex-row">
              <WeightTable />
              <HeightTable />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
