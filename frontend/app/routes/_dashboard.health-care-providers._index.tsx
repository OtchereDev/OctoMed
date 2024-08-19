import { Link, useFetcher, useSearchParams } from '@remix-run/react'
import dayjs from 'dayjs'
import { Calendar, MapPin, Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import BookAppointment from '~/components/health-providers/BookAppointment'
import CancelAppointment from '~/components/health-providers/CancelAppointment'
import { Star } from '~/components/shared/icons'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs'
import { IAppointment } from '~/types/appointment'
import { IDoctor } from '~/types/health-provider'
import { HealthProvidersLoader } from './api.health-provider'

export default function HealthProviders() {
  const fetcher = useFetcher<HealthProvidersLoader>()
  const [searchParams, setSearchParams] = useSearchParams()
  const currentTab = searchParams.get('tab') || 'providers'
  const [searchTerm, setSearchTerm] = useState<string>(searchParams.get('search') || '')
  const [category, setCategory] = useState<string>(searchParams.get('category') || '')

  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    params.set('tab', currentTab)
    params.set('search', searchTerm)
    params.set('category', category)
    fetcher.load(`/api/health-provider?${params.toString()}`)
  }, [currentTab, searchTerm, category])

  const data = fetcher.data?.data

  console.log(data)

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams)
    if (searchTerm) {
      params.set('search', searchTerm)
    } else {
      params.delete('search')
    }
    setSearchParams(params)
  }

  const handleCategoryClick = (category: string) => {
    const params = new URLSearchParams(searchParams)
    if (category) {
      params.set('category', category)
    } else {
      params.delete('category')
    }
    setCategory(category)
    setSearchParams(params)
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
            <div className="mt-[30px] flex w-full gap-2">
              <div className="flex flex-1 items-center gap-3 rounded-primary border px-[14px] py-[10px] lg:max-w-[418px]">
                <Search strokeWidth={2.5} size={18} />
                <input
                  type="text"
                  name="search"
                  placeholder="Search doctor by name, specialty"
                  className="flex-1 font-montserrat outline-none placeholder:font-montserrat"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button
                onClick={handleSearch}
                className="flex w-auto items-center gap-2 rounded-primary border px-5 py-3 font-montserrat text-sm font-semibold text-[#353746]"
              >
                <Search size={18} color="#353746" strokeWidth={3} />
                Search
              </button>
            </div>

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
                <h3 className="font-bold text-[#191919]">Thursday - 12th September 2024</h3>
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
                        <div className="mt-4 hidden gap-3 lg:flex">
                          <CancelAppointment>
                            <button className="rounded-[8px] bg-[#FEF3F2] px-4 py-[10px] font-semibold text-[#F04438]">
                              Cancel
                            </button>
                          </CancelAppointment>
                          <button className="rounded-[8px] bg-[#E8F3F6] px-4 py-[10px] font-semibold text-[#1282A2]">
                            Re-Schedule
                          </button>
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
                        <CancelAppointment>
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
