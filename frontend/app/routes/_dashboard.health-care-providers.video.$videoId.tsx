import { json, LoaderFunctionArgs, redirect } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import pkg from 'agora-access-token'
import { ArrowLeft } from 'lucide-react'
import Page from '~/components/health-data/VideoBox'
import CountdownTimer from '~/components/health-providers/CountDownTimer'
import EndAppointment from '~/components/health-providers/EndAppointment'
import { Star } from '~/components/shared/icons'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import http from '~/lib/http'
import { getSession } from '~/sessions'
import { IAppointment } from '~/types/appointment'
const { RtcRole, RtmRole, RtmTokenBuilder, RtcTokenBuilder } = pkg

export type VideoBoxData = {
  rtcToken: string
  rtmToken: string
  appId: string
  channel: string
  username: string
  appointment: IAppointment['appointments'][0]
}

export async function loader({ request, params }: LoaderFunctionArgs) {
  const id = params['videoId'] as string
  const session = await getSession(request.headers.get('Cookie'))
  const accessToken = session.get('accessToken')!
  const userId = session.get('id')!

  try {
    const req = await http.get(`/appointments/meeting/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })

    const response = req.data

    if (userId != response.data.appointment?.user_id) {
      return redirect('/health-care-providers')
    }

    const { APP_ID, CERTIFICATE } = process.env as unknown as {
      APP_ID: string
      CERTIFICATE: string
    }

    const channel = params.videoId as string
    const username = Date.now()
    const time = Math.floor(Date.now() / 1000) + 600
    const rtcToken = RtcTokenBuilder.buildTokenWithUid(
      APP_ID,
      CERTIFICATE,
      channel,
      0,
      RtcRole.PUBLISHER,
      time
    )
    const rtmToken = RtmTokenBuilder.buildToken(
      APP_ID,
      CERTIFICATE,
      String(username),
      RtmRole.Rtm_User,
      time
    )

    const data = {
      rtcToken,
      appId: APP_ID,
      channel,
      rtmToken,
      username: String(username),
      appointment: response.data.appointment as IAppointment['appointments'][0],
    } as VideoBoxData

    return json(data)
  } catch (errors: any) {
    return redirect('/health-care-providers')
  }
}

export default function WatchVideo() {
  const data = useLoaderData<typeof loader>()
  const { appointment } = data
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
          <AvatarImage src={appointment.doctor.profile} className="object-cover" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>

      <Page data={data} />
    </section>
  )
}
