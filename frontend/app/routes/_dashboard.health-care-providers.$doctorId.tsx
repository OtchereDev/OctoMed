import { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node'
import { Link, json, useLoaderData } from '@remix-run/react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { ArrowLeft, BriefcaseBusiness, GraduationCap, MapPin, Star } from 'lucide-react'
import LeaveReview from '~/components/health-providers/LeaveReview'
import { Star as StarIcon } from '~/components/shared/icons'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs'
import { RateDTO } from '~/dto/providers.dto'
import { IError, formatZodErrors } from '~/lib/formatZodError'
import http from '~/lib/http'
import { getSession } from '~/sessions'
import { IDoctor } from '~/types/health-provider'

dayjs.extend(relativeTime)

export const loader = async ({ params }: LoaderFunctionArgs) => {
  let doctor: IDoctor | null = null

  let route = `/doctors/${params.doctorId}`

  try {
    const req = await http.get(route)

    const data = req.data

    doctor = data.data.doctor

    return json({
      doctor,
      message: data.data.message,
    })
  } catch (error: any) {
    let message: string = error.response.data?.message ?? error.message

    return json({
      doctor,
      message,
    })
  }
}

export async function action({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData()
  const comment = formData.get('comment') ?? ''
  const rate = formData.get('rate') ? parseInt(formData.get('rate') as string) : 0
  const doctor_id = parseInt(params['doctorId'] as string)

  const session = await getSession(request.headers.get('Cookie'))

  try {
    const result = RateDTO.parse({
      comment,
      rate,
    })

    const response = await http.post(
      '/rating/create',
      { ...result, doctor_id },
      {
        headers: {
          Authorization: `Bearer ${session.get('accessToken')}`,
        },
      }
    )

    return json({
      errors: [] as IError[],
      response: response?.data.message,
    })
  } catch (error: any) {
    if (error.errors?.length) {
      return json({
        errors: formatZodErrors(error.errors),
        response: 'Validation Errors',
      })
    }

    return json({
      errors: [
        { path: 'universal', message: error?.response?.data?.message ?? 'An error occurred' },
      ] as IError[],
      response: error?.response?.data?.message ?? 'An error occurred',
    })
  }
}

export default function DoctorProfile() {
  const { doctor } = useLoaderData<typeof loader>()

  return (
    <div className="px-5 pt-5 lg:pb-20">
      <div className="relative h-[150px] overflow-hidden rounded-[16px] p-4 lg:p-6">
        <img className="absolute left-0 top-0 h-full w-full object-cover" src={doctor?.profile} />
        <div className="absolute left-0 top-0 h-full w-full bg-black bg-opacity-70" />
        <div className="relative flex h-full w-full flex-col justify-between">
          <Link to="/health-care-providers">
            <button className="flex items-center gap-2 font-semibold text-white">
              <ArrowLeft size={18} strokeWidth={2.5} />
              Back
            </button>
          </Link>
          <div className="flex gap-2 lg:items-center lg:justify-end lg:gap-4">
            <button className="flex-[1.5] rounded-primary bg-primary py-4 font-bold text-white lg:flex lg:w-auto lg:flex-none lg:px-8">
              Book Appointment
            </button>
            <LeaveReview>
              <button className="flex w-full flex-1 justify-center gap-2 rounded-primary bg-[#DCECF4] py-4 font-bold text-primary lg:w-auto lg:flex-none lg:px-8">
                <Star />
                <span className="hidden lg:inline">Leave a</span> Review
              </button>
            </LeaveReview>
          </div>
        </div>
      </div>

      <div className="mt-6 lg:relative lg:-mt-7">
        <div className="flex gap-2 rounded-[20px] font-montserrat lg:ml-6 lg:items-end lg:gap-6">
          <div className="h-[102px] w-[102px] overflow-hidden rounded-primary lg:h-[114px] lg:w-[114px] lg:rounded-[16px] lg:border-[3px] lg:border-white">
            <img src={doctor?.profile} className="h-full w-full object-cover" />
          </div>
          <div className="flex flex-1 justify-between">
            <div>
              <h3 className="line-clamp-1 font-montserrat font-bold text-[#191919]">
                {doctor?.name} - {doctor?.title}
              </h3>

              <div className="mt-2 items-center gap-3 font-montserrat text-sm font-semibold text-[#4D5061]">
                <div className="lg:flex lg:justify-between">
                  <div className="flex items-center gap-2 lg:order-2">
                    <StarIcon />
                    <p className="">4.9(102)</p>
                  </div>
                  <p className="mt-2 lg:order-1 lg:mt-0">{doctor?.specialty}</p>
                </div>
                <div className="mt-[6px] flex gap-[10px]">
                  <MapPin size={16} />
                  <p>{doctor?.hospital}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Tabs defaultValue="about" className="mt-6 lg:mt-11">
          <TabsList className="w-full justify-between rounded-none border-b border-[#D0D5DD] !bg-none px-0 font-montserrat font-bold lg:justify-start lg:gap-14">
            <TabsTrigger className="tab-indicator px-0 font-bold text-[#333]" value="about">
              About Me
            </TabsTrigger>
            <TabsTrigger className="tab-indicator font-bold text-[#333]" value="education">
              Education
            </TabsTrigger>
            <TabsTrigger className="tab-indicator font-bold text-[#333]" value="experience">
              Experience
            </TabsTrigger>
            <TabsTrigger className="tab-indicator px-0 font-bold text-[#333]" value="review">
              Reviews
            </TabsTrigger>
          </TabsList>
          <TabsContent value="about" className="pt-6 text-justify font-montserrat text-[#4D5061]">
            <div
              className="flex flex-col gap-3"
              dangerouslySetInnerHTML={{ __html: doctor?.about ?? '' }}
            />
          </TabsContent>
          <TabsContent value="education">
            <div className="ml-6 mt-[30px] border-l border-[#E8F3F6] text-left font-montserrat lg:mt-10">
              {doctor?.educations.map((edu) => (
                <div key={edu.id} className="relative pb-6 pl-10 lg:mb-3">
                  <div className="absolute left-0 top-0 flex h-[52px] w-[52px] -translate-x-1/2 items-center justify-center rounded-full border-4 border-white bg-[#E8F3F6] text-[#1282A2] lg:top-0">
                    <GraduationCap size={20} />
                  </div>

                  <div className="mt-7 rounded-[20px] border lg:flex lg:items-start lg:justify-between lg:p-6">
                    <div className="p-3 lg:flex lg:w-full lg:gap-6 lg:p-0">
                      <div className="h-[150px] w-full overflow-hidden rounded-primary lg:h-[60px] lg:w-[94px]">
                        <img src={edu.logo} className="h-full w-full object-cover" />
                      </div>
                      <div className="pt-6 lg:flex lg:flex-1 lg:justify-between lg:pt-0">
                        <div>
                          <h4 className="line-clamp-1 font-bold text-[#191919]">
                            {edu.school}, {edu.country}
                          </h4>
                          <p className="mt-1 text-sm font-semibold text-[#4D5061]">{edu.course}</p>
                        </div>
                        <p className="mt-4 flex gap-4 text-sm font-bold text-[#4D5061] lg:mt-0">
                          {dayjs(edu.start_year).year()} -{' '}
                          {edu.current_education ? 'Present' : dayjs(edu.end_year).year()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="experience">
            <div className="ml-6 mt-[30px] border-l border-[#E8F3F6] text-left font-montserrat lg:mt-10">
              {doctor?.experiences.map((exp) => (
                <div key={exp.id} className="relative pb-6 pl-10 lg:mb-3">
                  <div className="absolute left-0 top-0 flex h-[52px] w-[52px] -translate-x-1/2 items-center justify-center rounded-full border-4 border-white bg-[#E8F3F6] text-[#1282A2] lg:top-0">
                    <BriefcaseBusiness size={20} />
                  </div>

                  <div className="mt-7 rounded-[20px] border lg:flex lg:items-start lg:justify-between lg:p-6">
                    <div className="p-3 lg:flex lg:w-full lg:gap-6 lg:p-0">
                      <div className="h-[150px] w-full overflow-hidden rounded-primary lg:h-[60px] lg:w-[94px]">
                        <img src={exp.logo} className="h-full w-full object-cover" />
                      </div>
                      <div className="pt-6 lg:flex lg:flex-1 lg:justify-between lg:pt-0">
                        <div>
                          <h4 className="line-clamp-1 font-bold text-[#191919]">
                            {exp.company}, {exp.country}
                          </h4>
                          <p className="mt-1 text-sm font-semibold text-[#4D5061]">
                            {exp.position}
                          </p>
                        </div>
                        <p className="mt-2 flex gap-4 text-sm font-bold text-[#4D5061] lg:mt-0">
                          {dayjs(exp.start_year).year()} -{' '}
                          {exp.current_position ? 'Present' : dayjs(exp.end_year).year()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="review">
            <div className="mt-6 flex flex-col gap-4 lg:grid lg:grid-cols-2">
              {doctor?.ratings.map((rating) => (
                <div key={rating.id} className="rounded-[12px] border p-4">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={rating.user.avatar} />
                      <AvatarFallback>{rating.user.full_name}</AvatarFallback>
                    </Avatar>
                    <p className="font-montserrat text-sm font-medium">
                      {rating.user.full_name} @Dannyboah96
                    </p>
                  </div>
                  <div className="flex items-center py-3">
                    {Array.from({ length: 5 }).map((i) => (
                      <StarIcon />
                    ))}
                  </div>
                  <p className="font-montserrat text-sm text-[#4D5061]">{rating.comment}</p>
                  <p className="mt-2 font-montserrat text-sm text-[#4D5061]">
                    {dayjs(rating.created_at).fromNow()}
                  </p>
                </div>
              ))}
            </div>
            {doctor?.ratings.length == 0 && (
              <p className="text-center font-semibold">No ratings yet</p>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
