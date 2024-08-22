import { Form, useActionData, useNavigation } from '@remix-run/react'
import { CalendarIcon, MapPin } from 'lucide-react'
import { useEffect, useState } from 'react'
import { getDetailsFromDates } from '~/lib/getDateDuration'
import { getFormError } from '~/lib/getFormError'
import { action } from '~/routes/_dashboard.health-care-providers._index'
import { IAppointment } from '~/types/appointment'
import { IDoctor } from '~/types/health-provider'
import { Star } from '../shared/icons'
import { Calendar } from '../ui/calendar'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { toast } from '../ui/use-toast'

export default function BookAppointment({
  children,
  doctor,
  notFull,
  appt,
}: {
  children: React.ReactNode
  doctor: IDoctor
  notFull?: boolean
  appt?: IAppointment['appointments'][0]
}) {
  const [apptDate, setApptDate] = useState<Date>()
  const [startTime, setStartTime] = useState<string>('')
  const [duration, setDuration] = useState<string>('')
  const [isOpen, setIsOpen] = useState(false)
  const loading = useNavigation().state == 'submitting'

  const response = useActionData<typeof action>()

  useEffect(() => {
    if (response?.errors?.length) {
      toast({ description: response?.response, title: 'Error' })
    } else if (response?.response) {
      toast({ description: response?.response })
      setApptDate(undefined)
      setDuration('')
      setDuration('')
      setIsOpen(false)
    }
  }, [response])

  useEffect(() => {
    if (appt) {
      const { startTime, duration, date } = getDetailsFromDates(appt.start_time, appt.end_time)
      setApptDate(date)
      setDuration(duration)
      setStartTime(startTime)
    }
  }, [appt])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className={notFull ? '' : 'w-full'}>{children}</DialogTrigger>
      <DialogContent className="flex h-full w-full flex-col lg:h-[675px] lg:w-[723px]">
        <DialogHeader>
          <DialogTitle className="pt-[16px] text-left font-montserrat text-xl font-bold text-[#4D5061]">
            {appt ? 'Re-Schedule Appointment' : 'Book Appointment'}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="flex-1 overflow-scroll pb-24 pt-[18px] text-left font-montserrat lg:pb-0 lg:pt-0">
          <p className="text-left text-xs font-medium lg:text-base">
            {appt
              ? 'Set a new available time for an appointment with this provider'
              : 'Schedule an available time for an appointment with this provider'}
          </p>

          <div className="mt-[24px] flex gap-4 rounded-[20px] border border-[#D0D5DD99] p-3">
            <div className="h-[80px] w-[80px] overflow-hidden rounded-primary lg:h-[150px] lg:w-[234px]">
              <img src={doctor.profile} className="h-full w-full object-cover" />
            </div>
            <div className="text-left">
              <h4 className="line-clamp-1 text-sm font-bold text-[#191919] lg:text-base">
                {doctor.name} - {doctor.title}
              </h4>
              <div className="mt-1 flex text-xs font-medium lg:mt-3 lg:gap-6 lg:text-sm">
                <p>{doctor.specialty}</p>
                <div className="flex items-center gap-2">
                  <Star />
                  <p>
                    4.9<span className="font-normal">(102)</span>
                  </p>
                </div>
              </div>
              <div className="mt-1 flex items-center gap-2 font-medium lg:mt-3 lg:text-sm">
                <MapPin size={15} />
                <p>{doctor.hospital}</p>
              </div>
              <div className="mt-1 flex gap-4 text-xs lg:mt-3 lg:text-sm">
                <p>Monday - Friday</p>
                <p>9:00AM - 5:00 PM</p>
              </div>
            </div>
          </div>
          <Form method="POST">
            <input
              className="hidden"
              name="form"
              value={appt ? 'reschedule-appointment' : 'book-appointment'}
            />
            <input className="hidden" name="appointment-date" value={apptDate?.toISOString()} />
            <input className="hidden" name="duration" value={duration} />
            <input className="hidden" name="start-time" value={startTime} />
            <input className="hidden" name="doctor-id" value={doctor.id} />
            <input className="hidden" name="id" value={appt ? appt.id : ''} />

            <div className="lg:flex lg:gap-6">
              <div className="lg:flex-1">
                <div className="mt-[24px] rounded-[20px] border border-[#D0D5DD99] lg:flex-1">
                  <div className="border-b p-4 font-semibold text-[#333]">
                    <p>Pick appointment date</p>
                  </div>
                  <div>
                    <Calendar
                      selected={apptDate}
                      onSelect={setApptDate}
                      mode="single"
                      initialFocus
                      className=""
                      disabled={(date) => date < new Date()}
                    />
                  </div>
                </div>
                <p className="text-xs text-red-500">
                  {getFormError('appointment-date', response?.errors)}
                </p>
              </div>

              <div className="flex flex-col lg:flex-1">
                <div className="mt-[24px] rounded-[20px] border border-[#D0D5DD99] lg:flex-1">
                  <div className="border-b p-4 font-semibold text-[#333]">
                    <p>Pick appointment time</p>
                  </div>
                  <div className="grid grid-cols-4 gap-2 p-4">
                    {[
                      '9:00 AM',
                      '10:00 AM',
                      '11:00 AM',
                      '12:00 PM',
                      '1:00 PM',
                      '2:00 PM',
                      '3:00 PM',
                      '4:00 PM',
                      '5:00 PM',
                    ].map((time) => (
                      <button
                        type="button"
                        onClick={() => setStartTime(time)}
                        className={`rounded-sm py-1 ${startTime == time ? 'bg-[#09AEF21A]' : ''}`}
                      >
                        <p
                          className={`text-center text-xs ${startTime == time ? 'text-[#1282A2]' : 'text-[#37474F]'}`}
                        >
                          {time}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
                <p className="text-xs text-red-500">
                  {getFormError('start_time', response?.errors)}
                </p>
              </div>
            </div>

            <div>
              <div className="mt-[24px] rounded-[20px] border border-[#D0D5DD99]">
                <div className="border-b p-4 font-semibold text-[#333]">
                  <p>Pick appointment duration</p>
                </div>
                <div className="grid grid-cols-4 gap-2 p-4 lg:grid-cols-9">
                  {['30 Min', '1 Hour', '2 Hours'].map((time) => (
                    <button
                      type="button"
                      onClick={() => setDuration(time)}
                      className={`rounded-sm py-1 ${duration == time ? 'bg-[#09AEF21A]' : ''}`}
                    >
                      <p
                        className={`text-center text-xs ${duration == time ? 'text-[#1282A2]' : 'text-[#37474F]'}`}
                      >
                        {time}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
              <p className="text-xs text-red-500">{getFormError('duration', response?.errors)}</p>
            </div>

            <div className="fixed bottom-0 left-0 w-full border-t bg-white px-4 py-6 lg:relative lg:mt-6 lg:w-auto lg:border-0 lg:px-0 lg:py-0">
              <button
                disabled={loading}
                className="flex w-full items-center justify-center gap-[10px] rounded-primary bg-primary py-4 font-raleway font-bold text-white lg:w-auto lg:px-8"
              >
                <CalendarIcon size={18} /> {loading ? 'Booking...' : 'Book'}
              </button>
            </div>
          </Form>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}
