import { LoaderFunctionArgs, redirect } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import { ArrowLeft, Send } from 'lucide-react'
import CountdownTimer from '~/components/health-providers/CountDownTimer'
import EndAppointment from '~/components/health-providers/EndAppointment'
import { Camera, Chat, Mute, Star } from '~/components/shared/icons'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import http from '~/lib/http'
import { getSession } from '~/sessions'
import { IAppointment } from '~/types/appointment'

export async function loader({ request, params }: LoaderFunctionArgs) {
  const id = params['videoId'] as string
  const session = await getSession(request.headers.get('Cookie'))
  const accessToken = session.get('accessToken')!
  const userId = session.get('id')

  try {
    const req = await http.get(`/appointments/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })

    const response = req.data

    if (userId != response.data.appointment?.user_id) {
      return redirect('/health-care-providers')
    }

    return {
      appointment: response.data.appointment as IAppointment['appointments'][0],
    }
  } catch (errors) {
    return redirect('/health-care-providers')
  }
}

export default function WatchVideo() {
  const { appointment } = useLoaderData<typeof loader>()
  return (
    <section className="px-4 py-5">
      <div className="relative w-full rounded-[16px] border">
        <div className="relative h-full w-full overflow-hidden rounded-[16px] p-4">
          <img
            className="absolute left-0 top-0 h-full w-full object-cover"
            src={appointment.doctor.profile}
          />
          <div className="absolute left-0 top-0 h-full w-full bg-black bg-opacity-70" />
          <div className="relative flex h-full w-full flex-col justify-between">
            <div>
              <Link to="/health-care-providers">
                <button className="flex items-center gap-2 font-semibold text-white">
                  <ArrowLeft size={18} strokeWidth={2.5} />
                  Back
                </button>
              </Link>
              <div className="mt-4 font-montserrat font-semibold text-white">
                <div className="lg:flex lg:justify-between">
                  <h3 className="line-clamp-1 lg:text-2xl">
                    Appointment #{appointment.id} - {appointment.doctor.name}
                  </h3>
                  <CountdownTimer
                    endDateTime={appointment.end_time}
                    startDateTime={appointment.start_time}
                  />
                </div>
                <div className="lg:mt-[10px] lg:flex lg:items-center lg:gap-2 lg:text-base">
                  <p className="mt-2 text-sm lg:mt-0">{appointment.doctor.specialty}</p>
                  <div className="mt-1 flex items-center gap-2 lg:order-2 lg:mt-0">
                    <Star />
                    <p className="font-normal">4.9 (102)</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <EndAppointment>
                <button className="rounded-primary bg-[#FEF3F2] px-7 py-3 font-bold text-[#F04438] lg:w-auto lg:flex-none lg:px-8">
                  End Appointment
                </button>
              </EndAppointment>
            </div>
          </div>
        </div>
        <Avatar className="absolute bottom-0 left-8 h-[82px] w-[82px] translate-y-1/2 border-4 border-white">
          <AvatarImage src={appointment.doctor.profile} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>

      <div className="mt-16 rounded-[20px] border">
        <div className="border-b p-6 font-montserrat lg:flex lg:items-center lg:justify-between">
          <div className="flex items-center gap-2 font-semibold text-[#333]">
            <Chat />
            <h2 className="text-lg">Chat with {appointment.doctor.name}</h2>
          </div>
          <div className="mt-4 flex items-center gap-3 font-raleway lg:mt-0">
            <button className="flex gap-2 rounded-[8px] border-[#09AEF21A] bg-[#DCECF4] px-[18px] py-[10px] font-semibold text-primary">
              <Mute />
              Mute
            </button>
            <button className="flex items-center gap-2 rounded-[8px] border-[#09AEF21A] bg-[#DCECF4] px-[18px] py-[10px] text-sm font-semibold text-primary">
              <Camera />
              Camera On
            </button>
            {/* <button className="flex gap-2 rounded-[8px] border-[#09AEF21A] bg-[#DCECF4] p-[12px] font-semibold text-primary">
              <FullscreenIcon />
            </button> */}
          </div>
        </div>
        <div className="lg:flex">
          <div className="p-6 lg:flex-[2]">
            <div className="relative flex h-[503px] items-center justify-center rounded-[16px] bg-[#4D5061]">
              <Avatar className="h-[150px] w-[150px] border-4 border-white">
                <AvatarImage src={appointment.doctor.profile} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

              <div className="absolute bottom-4 right-4 flex h-[96px] w-[150px] items-center justify-center rounded-[10px] border-2">
                <Avatar className="h-[52px] w-[52px] border-4 border-white">
                  <AvatarImage src={'https://github.com/shadcn.png'} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
          <div className="border-t p-6 lg:flex-1 lg:border-l lg:border-t-0">
            <div className="flex h-[503px] flex-col font-montserrat">
              <div className="flex flex-1 flex-col gap-3 overflow-scroll">
                <div className="max-w-[284px] rounded-[12px] rounded-bl-none bg-[#D0D5DD4D] px-4 py-[14px] text-sm">
                  <p>Hello. I’m Daniel. How may I help you today?</p>
                </div>
                <div className="ml-auto max-w-[284px] rounded-[12px] rounded-br-none bg-[#F5CB5C] px-4 py-[14px] text-sm">
                  <p>
                    I've been struggling with anxiety, especially during my workouts. What
                    strategies or techniques do you use to manage anxiety w...
                  </p>
                </div>
              </div>
              <div className="flex gap-4 border-t pt-4">
                <input
                  placeholder="Enter your message here"
                  className="flex-1 rounded-[8px] border px-[14px] py-[10px] outline-none"
                />
                <button className="rounded-[8px] bg-primary p-3 text-white">
                  <Send />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
