import { json, LoaderFunctionArgs } from '@remix-run/node'
import DietContent from '~/components/diet/DietContent'
import ExerciseContent from '~/components/diet/ExerciseContent'
import DateFilter from '~/components/shared/DateFilter'
import { Tabs, TabsList, TabsTrigger } from '~/components/ui/tabs'
import { getDietDashboard } from '~/server/diet.server'
import { getSession } from '~/sessions'

export async function loader({ params, request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get('Cookie'))
  const accessToken = session.get('accessToken')!

  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)
  const datestr = searchParams.get('date')
  const date = datestr?.length ? new Date(datestr).toISOString() : new Date().toISOString()

  try {
    const resp = await getDietDashboard(date, accessToken)
    console.log(resp)
  } catch (error) {
    console.log(error)
  }

  return json({})
}

export default function DietAndExcerise() {
  return (
    <section className="px-5 py-5 pb-24 font-montserrat lg:px-0 lg:py-8">
      <h3 className="mb-5 text-lg font-semibold text-[#333] lg:hidden">Diet and Fitness</h3>

      <Tabs defaultValue="diet">
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
