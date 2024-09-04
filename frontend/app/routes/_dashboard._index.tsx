import { ActionFunctionArgs, json, LoaderFunctionArgs, type MetaFunction } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import dayjs from 'dayjs'
import { ArrowRight } from 'lucide-react'
import DietCard from '~/components/diet/DietCard'
import ExerciseCard from '~/components/diet/ExerciseCard'
import BookAppointment from '~/components/health-providers/BookAppointment'
import CancelAppointment from '~/components/health-providers/CancelAppointment'
import CardCarousel from '~/components/shared/CardCarousel'
import DashboardCard from '~/components/shared/DashboardCard'
import {
  AvgBMI,
  AvgHeight,
  AvgSleep,
  AvgWeight,
  BloodGlucose,
  BP,
  HeartRate,
  Pulse,
  Star,
} from '~/components/shared/icons'
import { CarouselItem } from '~/components/ui/carousel'
import { IError } from '~/lib/formatZodError'
import http from '~/lib/http'
import { cancelAppointment, rescheduleAppointment } from '~/server/health-provider.server'
import { getSession } from '~/sessions'
import { IDashboard } from '~/types/dashboard'

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

  let route = `/dashboard`
  let response: IDashboard | null = null

  try {
    const req = await http.get(route, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    const data = req.data

    response = data.data

    return json({
      response,
      message: data.data.message,
    })
  } catch (error: any) {
    let message: string = error.response.data?.message ?? error.message

    return json({
      response,
      message,
    })
  }
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const session = await getSession(request.headers.get('Cookie'))
  const accessToken = session.get('accessToken')!

  const formData = await request.formData()
  const formName = formData.get('form')

  const generalError = {
    path: 'global',
    message: 'Unhandles action is being perform',
  } as IError

  switch (formName) {
    case 'cancel-appointment':
      return await cancelAppointment(formData, accessToken)
    case 'reschedule-appointment':
      return await rescheduleAppointment(formData, accessToken)
    default:
      return json({
        errors: [generalError],
        response: generalError.message,
      })
  }
}

export default function Index() {
  const response = useLoaderData<typeof loader>()

  const Analysis = [
    {
      children: (
        <div className="flex gap-[81px] lg:gap-8">
          <div>
            <p className="text-[10px] font-medium lg:text-sm">Systolic</p>
            <h3 className="text-xl font-bold text-[#4D5061] lg:text-2xl">
              {response?.response?.metrics?.blood_pressure?.systolic}
            </h3>
          </div>
          <div>
            <p className="text-[10px] font-medium lg:text-sm">Diastolic</p>
            <h3 className="text-xl font-bold text-[#4D5061] lg:text-2xl">
              {response?.response?.metrics?.blood_pressure?.diastolic}{' '}
              <span className="text-xs font-semibold lg:text-base">mmHg</span>
            </h3>
          </div>
        </div>
      ),
      label: 'Blood Pressure',
      bg: 'bg-[#EF555533]',
      icon: <BP className="h-[21px] w-[21px] lg:h-[28px] lg:w-[28px]" />,
      lg: true,
    },
    {
      children: (
        <div>
          <h3 className="text-xl font-bold text-[#4D5061] lg:text-2xl">
            {response?.response?.metrics?.pulse?.reading}{' '}
            <span className="text-xs font-semibold lg:text-base">bhp</span>
          </h3>
        </div>
      ),
      label: 'Heart Rate',
      bg: 'bg-[#7A71D133]',
      icon: <HeartRate className="h-[21px] w-[21px] lg:h-[28px] lg:w-[28px]" />,
    },
    {
      children: (
        <div>
          <h3 className="text-xl font-bold text-[#4D5061] lg:text-2xl">
            {response?.response?.metrics?.pulse?.reading}{' '}
            <span className="text-xs font-semibold lg:text-base">bpm</span>
          </h3>
        </div>
      ),
      label: 'Pulse',
      bg: 'bg-[#05888833]',
      icon: <Pulse className="h-[21px] w-[21px] lg:h-[28px] lg:w-[28px]" />,
      sm: true,
    },
    {
      children: (
        <div>
          <h3 className="text-xl font-bold text-[#4D5061] lg:text-2xl">
            {response?.response?.metrics?.blood_glucose?.reading}{' '}
            <span className="text-xs font-semibold lg:text-base">mg/dL</span>
          </h3>
        </div>
      ),
      label: 'Blood Glucose',
      bg: 'bg-[#F0443833]',
      icon: <BloodGlucose className="h-[21px] w-[21px] lg:h-[28px] lg:w-[28px]" />,
    },
    {
      children: (
        <div>
          <h3 className="text-xl font-bold text-[#4D5061] lg:text-2xl">
            {response?.response?.metrics?.height?.reading}{' '}
            <span className="text-xs font-semibold lg:text-base">M</span>
          </h3>
        </div>
      ),
      label: 'Avg Height',
      bg: 'bg-[#1282A233]',
      icon: <AvgHeight className="h-[21px] w-[21px] lg:h-[28px] lg:w-[28px]" />,
    },
    {
      children: (
        <div>
          <h3 className="text-xl font-bold text-[#4D5061] lg:text-2xl">
            {response?.response?.metrics?.weight?.reading}{' '}
            <span className="text-xs font-semibold lg:text-base">KG</span>
          </h3>
        </div>
      ),
      label: 'Avg Weight',
      bg: 'bg-[#289BFF33]',
      icon: <AvgWeight className="h-[21px] w-[21px] lg:h-[28px] lg:w-[28px]" />,
    },
    {
      children: (
        <div>
          <h3 className="text-xl font-bold text-[#4D5061] lg:text-2xl">
            {response?.response?.metrics?.weight?.reading! /
              response?.response?.metrics?.height?.reading! ** 2}{' '}
            <span className="text-xs font-semibold lg:text-base">KG/M2</span>
          </h3>
        </div>
      ),
      label: 'Avg BMI',
      bg: 'bg-[#FFA00033]',
      icon: <AvgBMI className="h-[21px] w-[21px] lg:h-[28px] lg:w-[28px]" />,
    },
    {
      children: (
        <div>
          <h3 className="text-xl font-bold text-[#4D5061] lg:text-2xl">
            {response?.response?.metrics?.sleep?.end_hour! -
              response?.response?.metrics?.sleep?.start_hour!}{' '}
            <span className="text-xs font-semibold lg:text-base">HRS</span>
          </h3>
        </div>
      ),
      label: 'Avg Sleep Time',
      bg: 'bg-[#00C9BA33]',
      icon: <AvgSleep className="h-[21px] w-[21px] lg:h-[28px] lg:w-[28px]" />,
    },
  ]

  return (
    <div className="px-6 pb-28 font-raleway lg:mt-6 lg:px-0">
      <div className="border-b pb-4 pt-6 font-montserrat text-xl font-semibold text-[#333] lg:hidden">
        <p>Welcome, Oliver 😊</p>
      </div>
      <div className="mt-[42px] flex items-center justify-between lg:mt-0">
        <h1 className="font-montserrat font-semibold text-[#4D5061]">Health Data</h1>
        <Link to={'/health-data'}>
          <button className="flex items-center gap-2 text-sm font-semibold text-[#1282A2]">
            See All <ArrowRight size={'20'} />
          </button>
        </Link>
      </div>
      <div className="mt-6 lg:mt-0">{/* <DateFilter /> */}</div>

      <div className="mt-8 flex flex-wrap gap-4">
        {Analysis.map((a) => (
          <DashboardCard lg={a.lg} sm={a.sm} label={a.label} icon={a.icon} bg={a.bg}>
            {a.children}
          </DashboardCard>
        ))}
      </div>

      <div className="mt-[50px]">
        <div className="flex items-center justify-between">
          <h1 className="font-montserrat font-semibold text-[#4D5061]">Diet And Exercise</h1>
          <Link to={'/diet-and-exercises'}>
            <button className="flex items-center gap-2 text-sm font-semibold text-[#1282A2]">
              See All <ArrowRight size={'20'} />
            </button>
          </Link>
        </div>

        <div className="mt-[25px]">
          <div className="flex flex-col gap-10 lg:flex-row">
            <div className="lg:w-[520px]">
              <CardCarousel type="Meal">
                {response.response?.meals?.[0]?.meals?.map((meal) => (
                  <CarouselItem key={meal.id}>
                    <DietCard meal={meal} />
                  </CarouselItem>
                ))}
              </CardCarousel>
            </div>
            <div className="lg:w-[520px]">
              <CardCarousel type="Exercise">
                {response.response?.exercises?.[0]?.exercise?.map((exercise) => (
                  <CarouselItem key={exercise.id}>
                    <ExerciseCard exercise={exercise} />
                  </CarouselItem>
                ))}
              </CardCarousel>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-[50px] flex flex-col gap-10 lg:flex-row">
        <div className="lg:w-[646px]">
          <h1 className="font-montserrat font-semibold text-[#4D5061]">Upcoming Appointment</h1>
          <div className="mt-6 flex gap-[18px] rounded-[20px] border p-[15px] font-montserrat lg:mt-4 lg:gap-6 lg:p-3">
            <div className="h-[118px] w-[102px] flex-shrink-0 overflow-hidden rounded-primary border lg:h-[150px] lg:w-[130px]">
              <img
                src={response.response?.appointment?.doctor?.profile}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col justify-between lg:flex-row">
              <div>
                <h3 className="line-clamp-1 font-montserrat text-xs font-bold text-[#191919] lg:text-base">
                  {response.response?.appointment?.doctor?.name} -{' '}
                  {response.response?.appointment?.doctor.title}
                </h3>

                <div className="mt-4 flex items-center gap-3 text-[11px] lg:text-base">
                  <p>{response.response?.appointment?.doctor?.specialty}</p>
                  <div className="flex items-center gap-2">
                    <Star />
                    <p>4.9(102)</p>
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-1 text-[11px] lg:gap-3 lg:text-sm">
                  <p>Monday - Friday</p>
                  <p>9:00AM - 5:00 PM</p>
                </div>

                <div className="mt-4 flex items-center gap-3">
                  <CancelAppointment apptId={response.response?.appointment?.id!}>
                    <button className="rounded-[8px] bg-[#FEF3F2] px-4 py-[10px] font-raleway text-[11px] font-semibold text-[#F04438] lg:text-base">
                      Cancel
                    </button>
                  </CancelAppointment>
                  <BookAppointment
                    doctor={response.response?.appointment?.doctor!}
                    appt={response.response?.appointment}
                  >
                    <button className="rounded-[8px] bg-[#E8F3F6] px-4 py-[10px] font-raleway text-[11px] font-semibold text-[#1282A2] lg:text-base">
                      Re-Schedule
                    </button>
                  </BookAppointment>
                </div>
              </div>
              <div className="mt-5 flex flex-col items-start pr-2 lg:mt-0 lg:items-end">
                <p className="text-sm font-bold text-[#191919] lg:text-base">
                  {' '}
                  {dayjs(response.response?.appointment?.start_time).format('h:mm A')} -{' '}
                  {dayjs(response.response?.appointment?.end_time).format('h:mm A')}
                </p>
                <div className="flex w-full items-center justify-between lg:block">
                  <p className="mt-4 text-[11px] font-medium lg:text-base">
                    {response.response?.appointment?.duration}
                  </p>
                  <span className="mt-4 inline-block rounded-full bg-[#FFFAEB] px-2 py-1 text-[11px] font-medium text-[#B54708] lg:text-sm">
                    {response.response?.appointment?.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:w-[394px]">
          <h1 className="font-montserrat font-semibold text-[#4D5061]">Continue Learning</h1>
          <div className="mt-6 flex w-full gap-5 rounded-[20px] border p-3 lg:mt-4 lg:gap-6">
            <div className="w-[116px] overflow-hidden rounded-primary border lg:h-[150px] lg:w-[128px]">
              <img
                className="h-full w-full object-cover"
                src={response?.response?.resource?.poster}
              />
            </div>
            <div className="flex-1 font-montserrat">
              <h3 className="line-clamp-1 text-sm font-bold text-[#191919] lg:text-base">
                {response?.response?.resource?.title}
              </h3>
              <p className="line-clamp-2 text-[11px] text-[#4D5061] lg:text-sm">
                {response?.response?.resource?.description}
              </p>
              <Link to={`/library/${response?.response?.resource?.id}`}>
                <button className="mt-4 rounded-[8px] bg-[#E8F3F6] px-4 py-[10px] font-raleway text-xs font-semibold text-[#1282A2] lg:text-base">
                  Continue Reading
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
