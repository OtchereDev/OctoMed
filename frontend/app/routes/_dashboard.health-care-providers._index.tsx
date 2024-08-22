import { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node'
import { Form, Link, json, useFetcher, useLoaderData, useSearchParams } from '@remix-run/react'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import { Calendar, MapPin, Search, Trash2 } from 'lucide-react'
import BookAppointment from '~/components/health-providers/BookAppointment'
import CancelAppointment from '~/components/health-providers/CancelAppointment'
import DeleteAppointment from '~/components/health-providers/DeleteAppointment'
import { Star } from '~/components/shared/icons'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs'
import { IError } from '~/lib/formatZodError'
import { isCurrentTimeBetween } from '~/lib/getDateDuration'
import {
  bookAppointment,
  cancelAppointment,
  deleteAppointment,
  rescheduleAppointment,
} from '~/server/health-provider.server'
import { getSession } from '~/sessions'
import { IAppointment } from '~/types/appointment'
import { IDoctor } from '~/types/health-provider'
import { fetchAppointmentsData, fetchProvidersData } from './api.health-provider'

dayjs.extend(advancedFormat)

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url)
  const tab = url.searchParams.get('tab') || 'providers'
  const page = url.searchParams.get('page') ? parseInt(url.searchParams.get('page') as string) : 1
  const category = url.searchParams.get('category') as string
  const search = url.searchParams.get('search') as string

  const session = await getSession(request.headers.get('Cookie'))
  const accessToken = session.get('accessToken')

  let data

  if (tab === 'providers') {
    data = await fetchProvidersData(page, category, search)
  } else if (tab === 'appointments') {
    data = await fetchAppointmentsData(accessToken!)
  }

  return json({ tab, data })
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const session = await getSession(request.headers.get('Cookie'))
  const accessToken = session.get('accessToken')!

  const url = new URL(request.url)
  const formData = await request.formData()
  const formName = formData.get('form')

  const tab = url.searchParams.get('tab') || 'providers'
  const generalError = {
    path: 'global',
    message: 'Unhandles action is being perform',
  } as IError

  if (tab == 'providers') {
    switch (formName) {
      case 'book-appointment':
        return await bookAppointment(formData, accessToken)

      default:
        return json({
          errors: [generalError],
          response: generalError.message,
        })
    }
  } else if (tab == 'appointments') {
    switch (formName) {
      case 'cancel-appointment':
        return await cancelAppointment(formData, accessToken)
      case 'reschedule-appointment':
        return await rescheduleAppointment(formData, accessToken)
      case 'delete-appointment':
        return await deleteAppointment(formData, accessToken)
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

export default function HealthProviders() {
  const [searchParams, setSearchParams] = useSearchParams()
  const currentTab = searchParams.get('tab') || 'providers'
  const category = searchParams.get('category')
  const fetcher = useFetcher()

  const { data, tab } = useLoaderData<typeof loader>()

  const handleCategoryClick = (category: string) => {
    if (category) {
      searchParams.set('category', category)
    } else {
      searchParams.delete('category')
    }
    setSearchParams(searchParams)
  }

  return (
    <section className="px-4 pb-28 pt-4">
      <Tabs
        onValueChange={(value) => {
          setSearchParams({ tab: value })
        }}
        defaultValue={currentTab}
        className="box-border w-full"
      >
        <TabsList className="flex w-full justify-start !gap-12 rounded-none border-b border-[#D0D5DD] !bg-none px-0 pb-[25px] pt-4 font-montserrat font-bold">
          <TabsTrigger
            className="tab-indicator px-0 pb-[15px] font-bold text-[#333] lg:pb-[20px]"
            value="providers"
          >
            Providers
          </TabsTrigger>
          <TabsTrigger
            className="tab-indicator pb-[15px] font-bold text-[#333] lg:pb-[20px]"
            value="appointments"
          >
            Appointments
          </TabsTrigger>
        </TabsList>
        <TabsContent value="providers">
          <section>
            <Form name="search" method="GET" className="mt-[30px] flex w-full gap-2">
              <div className="flex flex-1 items-center gap-3 rounded-primary border px-[14px] py-[10px] lg:max-w-[418px]">
                <Search strokeWidth={2.5} size={18} />
                <input
                  type="text"
                  name="search"
                  placeholder="Search doctor by name, specialty"
                  className="flex-1 font-montserrat outline-none placeholder:font-montserrat"
                />
              </div>
              <button className="flex w-auto items-center gap-2 rounded-primary border px-5 py-3 font-montserrat text-sm font-semibold text-[#353746]">
                <Search size={18} color="#353746" strokeWidth={3} />
                Search
              </button>
            </Form>

            <div className="mt-[30px] flex items-center gap-2 overflow-scroll">
              {['', 'Primary Care Doctor', 'Allergists/Immunologist', 'Cardiologist'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryClick(cat)}
                  className={`w-auto flex-shrink-0 rounded-primary border p-[15px] font-montserrat text-xs font-semibold text-[#353746] lg:text-sm ${category === cat ? 'border-[#1282A2] bg-[#1282A2] bg-opacity-10' : ''}`}
                >
                  {cat == '' ? 'All' : cat}
                </button>
              ))}
            </div>

            <div className="mt-[30px] flex flex-col flex-wrap gap-4 lg:grid lg:grid-cols-4 lg:flex-row 2xl:grid-cols-6">
              {((data as any)?.doctors as IDoctor[])?.map((doctor) => (
                <div key={doctor.id} className="w-full rounded-[20px] border p-3">
                  <div className="h-[150px] w-full overflow-hidden rounded-primary border">
                    <img src={doctor.profile} className="h-full w-full object-cover" />
                  </div>
                  <div className="mt-2 font-montserrat text-sm">
                    <Link to={`/health-care-providers/${doctor.id}`}>
                      <h4 className="line-clamp-1 font-bold">
                        {doctor.name} - {doctor.title}
                      </h4>
                    </Link>
                    <div className="mt-3 font-medium">
                      <p>{doctor.specialty}</p>
                      <div className="mt-3 flex items-center gap-2">
                        <Star />
                        <p>
                          4.9<span className="font-normal">(102)</span>
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-2 font-medium">
                      <MapPin size={15} />
                      <p className="line-clamp-1">{doctor.hospital}</p>
                    </div>
                    <BookAppointment doctor={doctor}>
                      <button className="mt-3 w-full rounded-[8px] border border-[#E8F3F6] bg-[#E8F3F6] py-[10px] font-raleway text-sm font-semibold text-[#1282A2]">
                        Book Appointment
                      </button>
                    </BookAppointment>
                  </div>
                </div>
              ))}
            </div>

            {(data as any)?.doctors?.length == 0 && (
              <p className="text-center font-semibold">No Doctor found</p>
            )}
          </section>
        </TabsContent>
        <TabsContent value="appointments">
          <div className="ml-6 mt-[30px] border-l border-[#E8F3F6] text-left font-montserrat lg:mt-10">
            {((data as any)?.appointments as IAppointment[])?.map((appointment) => (
              <div key={appointment.date} className="relative pb-6 pl-10 lg:mb-6">
                <div className="absolute left-0 top-3 flex h-[52px] w-[52px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-white bg-[#E8F3F6] text-[#1282A2] lg:top-2">
                  <Calendar size={18} />
                </div>
                <h3 className="font-bold text-[#191919]">
                  {dayjs(appointment.date).format('dddd - Do MMMM YYYY')}
                </h3>
                {appointment.appointments.map((appt) => (
                  <div
                    key={appt.id}
                    className="mt-7 rounded-[20px] border lg:flex lg:items-start lg:justify-between lg:p-3"
                  >
                    <div className="p-3 lg:flex lg:gap-6 lg:p-0">
                      <div className="h-[150px] w-full overflow-hidden rounded-primary border lg:w-[234px]">
                        <img src={appt.doctor.profile} className="h-full w-full object-cover" />
                      </div>
                      <div className="pt-6 lg:pt-0">
                        <h4 className="line-clamp-1 font-bold text-[#191919]">
                          {appt.doctor.name} - {appt.doctor.title}
                        </h4>
                        <div className="mt-4 flex gap-6 text-sm font-medium">
                          <p>{appt.doctor.specialty}</p>
                          <div className="flex items-center gap-2">
                            <Star />
                            <p>
                              4.9<span className="font-normal">(102)</span>
                            </p>
                          </div>
                        </div>
                        <div className="mt-4 flex gap-4 text-sm">
                          <p>Monday - Friday</p>
                          <p>9:00AM - 5:00 PM</p>
                        </div>
                        <div className="mt-4 hidden gap-3 lg:flex lg:items-center">
                          {appt.status == 'cancelled' ? (
                            <DeleteAppointment apptId={appt.id}>
                              <button className="flex items-center gap-2 rounded-[8px] bg-[#FEF3F2] px-4 py-[10px] font-semibold text-[#F04438]">
                                <Trash2 size={18} /> Delete
                              </button>
                            </DeleteAppointment>
                          ) : (
                            <CancelAppointment apptId={appt.id}>
                              <button className="rounded-[8px] bg-[#FEF3F2] px-4 py-[10px] font-semibold text-[#F04438]">
                                Cancel
                              </button>
                            </CancelAppointment>
                          )}

                          {appt.status != 'cancelled' && (
                            <BookAppointment doctor={appt.doctor} appt={appt}>
                              <button className="rounded-[8px] bg-[#E8F3F6] px-4 py-[10px] font-semibold text-[#1282A2]">
                                Re-Schedule
                              </button>
                            </BookAppointment>
                          )}

                          {appt.status != 'cancelled' &&
                            isCurrentTimeBetween(appt.start_time, appt.end_time) && (
                              <fetcher.Form method="POST" action="/api/join-appointment">
                                <input className="hidden" name="id" value={appt.id} />
                                <button className="text-nowrap rounded-[8px] bg-[#1282A2] px-4 py-[10px] font-semibold text-white">
                                  Join Appointment
                                </button>
                              </fetcher.Form>
                            )}
                        </div>
                      </div>
                    </div>
                    <div className="border-t p-3 lg:border-none lg:p-0">
                      <h4 className="font-bold text-[#191919]">
                        {dayjs(appt.start_time).format('h:mm A')} -{' '}
                        {dayjs(appt.end_time).format('h:mm A')}
                      </h4>
                      <div className="flex gap-4 lg:mt-4 lg:flex-col lg:items-end">
                        <span className="mt-3 rounded-full bg-[#FFFAEB] px-2 py-1 text-sm font-medium uppercase text-[#B54708] lg:order-2 lg:mt-0 lg:inline">
                          {appt.status}
                        </span>
                        <p className="mt-4 font-medium lg:order-1 lg:mt-0">{appt.duration}</p>
                      </div>

                      <div className="mt-6 flex gap-3 lg:hidden">
                        <CancelAppointment apptId={appt.id}>
                          <button className="w-full rounded-[8px] bg-[#FEF3F2] py-[10px] font-semibold text-[#F04438]">
                            Cancel
                          </button>
                        </CancelAppointment>
                        <button className="flex-1 rounded-[8px] bg-[#E8F3F6] py-[10px] font-semibold text-[#1282A2]">
                          Re-Schedule
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {(data as any)?.appointments?.length == 0 && (
            <p className="text-center font-semibold">No Doctor found</p>
          )}
        </TabsContent>
      </Tabs>
    </section>
  )
}
