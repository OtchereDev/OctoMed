import { Link } from '@remix-run/react'
import { ArrowLeft, BriefcaseBusiness, GraduationCap, MapPin, Star } from 'lucide-react'
import Cambridge from '~/assets/images/cambridge.png'
import United from '~/assets/images/united-hosiptal.png'
import LeaveReview from '~/components/health-providers/LeaveReview'
import { Star as StarIcon } from '~/components/shared/icons'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs'

export default function DoctorProfile() {
  return (
    <div className="px-5 pt-5">
      <div className="relative h-[150px] overflow-hidden rounded-[16px] p-4 lg:p-6">
        <img
          className="absolute left-0 top-0 h-full w-full object-cover"
          src="https://images.pexels.com/photos/3714743/pexels-photo-3714743.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />
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
            <img
              src="https://images.pexels.com/photos/3714743/pexels-photo-3714743.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-1 justify-between">
            <div>
              <h3 className="line-clamp-1 font-montserrat font-bold text-[#191919]">
                Dr Daniel Everton - MD, FACOG
              </h3>

              <div className="mt-2 items-center gap-3 font-montserrat text-sm font-semibold text-[#4D5061]">
                <div className="lg:flex lg:justify-between">
                  <div className="flex items-center gap-2 lg:order-2">
                    <StarIcon />
                    <p className="">4.9(102)</p>
                  </div>
                  <p className="mt-2 lg:order-1 lg:mt-0">Primary Care Doctor</p>
                </div>
                <div className="mt-[6px] flex gap-[10px]">
                  <MapPin size={16} />
                  <p>St Louis, MO</p>
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
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent rhoncus elit ac enim
              faucibus convallis. Mauris et ex vel odio vehicula pretium. Sed non felis et neque
              lobortis mattis non in tellus. Donec libero nunc, posuere id leo sit amet, consectetur
              consequat metus. Pellentesque fringilla nec arcu a dapibus. Etiam eu luctus arcu.
              Aliquam congue purus quis lobortis consequat. Pellentesque sed fringilla odio.
              Pellentesque diam lacus, lobortis vel fringilla in, imperdiet eu enim. Phasellus
              aliquam urna non nisi dictum, vel bibendum tellus pulvinar. Morbi aliquet tellus
              sapien, ut placerat ligula vestibulum ut. Morbi faucibus vehicula ligula eu facilisis.
              Cras sagittis eu arcu quis facilisis. Aliquam dictum id odio a placerat. Donec sed
              massa efficitur, volutpat mauris in, orttitor turpis. Donec ut laoreet tortor. Nam at
              fringilla erat, eget feugiat mauris. Praesent condimentum, ante sed tempus sagittis,
              purus ex lacinia ligula, at suscipit urna arcu vitae urna. Nam porttitor sem enim, in
              commodo ex placerat id. Morbi non massa luctus, blandit tellus in, maximus nisl.
              Aliquam non ornare dolor. Ut quis venenatis tortor. Donec consequat gravida venenatis.
              Curabitur condimentum arcu vitae velit egestas lobortis. Aliquam maximus ultricies
              tristique. Pellentesque habitant morbi tristique senectus et netus et malesuada fames
              ac turpis egestas. Suspendisse et lorem et nibh maximus condimentum at et mi. Fusce
              malesuada lacus ante, non dictum massa vehicula eget. Aenean lorem purus, vulputate id
              purus maximus, tempus pellentesque quam. Nam varius urna ac vehicula venenatis.
            </p>

            <p className="mt-6">
              Praesent condimentum, ante sed tempus sagittis, purus ex lacinia ligula, at suscipit
              urna arcu vitae urna. Nam porttitor sem enim, in commodo ex placerat id. Morbi non
              massa luctus, blandit tellus in, maximus nisl. Aliquam non ornare dolor. Ut quis
              venenatis tortor. Donec consequat gravida venenatis. Curabitur condimentum arcu vitae
              velit egestas lobortis. Aliquam maximus ultricies tristique. Pellentesque habitant
              morbi tristique senectus et netus et malesuada fames ac turpis egestas. Suspendisse et
              lorem et nibh maximus condimentum at et mi. Fusce malesuada lacus ante, non dictum
              massa vehicula eget. Aenean lorem purus, vulputate id purus maximus, tempus
              pellentesque quam. Nam varius urna ac vehicula venenatis.
            </p>
            <p className="mt-6">
              Praesent condimentum, ante sed tempus sagittis, purus ex lacinia ligula, at suscipit
              urna arcu vitae urna. Nam porttitor sem enim, in commodo ex placerat id. Morbi non
              massa luctus, blandit tellus in, maximus nisl. Aliquam non ornare dolor. Ut quis
              venenatis tortor. Donec consequat gravida venenatis. Curabitur condimentum arcu vitae
              velit egestas lobortis. Aliquam maximus ultricies tristique. Pellentesque habitant
              morbi tristique senectus et netus et malesuada fames ac turpis egestas. Suspendisse et
              lorem et nibh maximus condimentum at et mi. Fusce malesuada lacus ante, non dictum
              massa vehicula eget. Aenean lorem purus, vulputate id purus maximus, tempus
              pellentesque quam. Nam varius urna ac vehicula venenatis.
            </p>
          </TabsContent>
          <TabsContent value="education">
            <div className="ml-6 mt-[30px] border-l border-[#E8F3F6] text-left font-montserrat lg:mt-10">
              {[1, 2].map((i) => (
                <div key={i} className="relative pb-6 pl-10 lg:mb-3">
                  <div className="absolute left-0 top-0 flex h-[52px] w-[52px] -translate-x-1/2 items-center justify-center rounded-full border-4 border-white bg-[#E8F3F6] text-[#1282A2] lg:top-0">
                    <GraduationCap size={20} />
                  </div>

                  <div className="mt-7 rounded-[20px] border lg:flex lg:items-start lg:justify-between lg:p-6">
                    <div className="p-3 lg:flex lg:w-full lg:gap-6 lg:p-0">
                      <div className="h-[150px] w-full overflow-hidden rounded-primary lg:h-[60px] lg:w-[94px]">
                        <img src={Cambridge} className="h-full w-full object-cover" />
                      </div>
                      <div className="pt-6 lg:flex lg:flex-1 lg:justify-between lg:pt-0">
                        <div>
                          <h4 className="line-clamp-1 font-bold text-[#191919]">
                            Cambridge University, Lapaz
                          </h4>
                          <p className="mt-1 text-sm font-semibold text-[#4D5061]">
                            Masters of Medicine
                          </p>
                        </div>
                        <p className="mt-4 flex gap-4 text-sm font-bold text-[#4D5061] lg:mt-0">
                          1994 - 2001
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
              {[1, 2].map((i) => (
                <div key={i} className="relative pb-6 pl-10 lg:mb-3">
                  <div className="absolute left-0 top-0 flex h-[52px] w-[52px] -translate-x-1/2 items-center justify-center rounded-full border-4 border-white bg-[#E8F3F6] text-[#1282A2] lg:top-0">
                    <BriefcaseBusiness size={20} />
                  </div>

                  <div className="mt-7 rounded-[20px] border lg:flex lg:items-start lg:justify-between lg:p-6">
                    <div className="p-3 lg:flex lg:w-full lg:gap-6 lg:p-0">
                      <div className="h-[150px] w-full overflow-hidden rounded-primary lg:h-[60px] lg:w-[94px]">
                        <img src={United} className="h-full w-full object-cover" />
                      </div>
                      <div className="pt-6 lg:flex lg:flex-1 lg:justify-between lg:pt-0">
                        <div>
                          <h4 className="line-clamp-1 font-bold text-[#191919]">United Hospital</h4>
                          <p className="mt-1 text-sm font-semibold text-[#4D5061]">Senior Doctor</p>
                        </div>
                        <p className="mt-2 flex gap-4 text-sm font-bold text-[#4D5061] lg:mt-0">
                          2002 - Present
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
              {Array.from({ length: 4 }).map((_, idx) => (
                <div key={idx} className="rounded-[12px] border p-4">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <p className="font-montserrat text-sm font-medium">Daniel @Dannyboah96</p>
                  </div>
                  <div className="flex items-center py-3">
                    {Array.from({ length: 5 }).map((i) => (
                      <StarIcon />
                    ))}
                  </div>
                  <p className="font-montserrat text-sm text-[#4D5061]">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent rhoncus elit
                    ac enim faucibus convallis. Mauris et ex vel odio vehicula pretium. Sed non
                    felis et neque lobortis mattis non in tellus. Donec libero nunc, posuere id leo
                    sit amet, consectetur consequat metus. Pellentesque fringilla nec arcu a
                    dapibus. Etiam eu luctus arcu. Aliquam congue purus quis lobortis consequat.
                  </p>
                  <p className="mt-2 font-montserrat text-sm text-[#4D5061]">1 hour ago</p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
