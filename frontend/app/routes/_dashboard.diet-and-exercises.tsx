import Autoplay from 'embla-carousel-autoplay'
import { Dumbbell, Info } from 'lucide-react'
import Drink1 from '~/assets/images/drink1.jpeg'
import Drink2 from '~/assets/images/drink2.jpeg'
import Drink3 from '~/assets/images/drink3.jpeg'
import Drink4 from '~/assets/images/drink4.jpeg'
import DietCard from '~/components/diet/DietCard'
import ExerciseCard from '~/components/diet/ExerciseCard'
import MealCard from '~/components/diet/MealCard'
import CardCarousel from '~/components/shared/CardCarousel'
import DateFilter from '~/components/shared/DateFilter'
import { Drop, Meal } from '~/components/shared/icons'
import { Carousel, CarouselContent, CarouselItem } from '~/components/ui/carousel'
import { Checkbox } from '~/components/ui/checkbox'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs'

const ExerciseRoutine = [
  {
    title: '1. Centering',
    time: '5mins',
  },
  {
    title: '2. Warm-Up',
    time: '10mins',
  },
  {
    title: '3. Standing Poses',
    time: '15mins',
  },
  {
    title: '4. Balance Poses',
    time: '10mins',
  },
  {
    title: '5. Seated and Floor Poses',
    time: '15mins',
  },
  {
    title: '6. Closing ',
    time: '5mins',
  },
]

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

        <TabsContent value="diet" className="mt-9 w-full">
          <div className="lg:flex lg:gap-4">
            <div className="lg:max-w-[650px]">
              <CardCarousel type="Meal">
                {[1, 2, 3].map((i) => (
                  <CarouselItem>
                    <DietCard />
                  </CarouselItem>
                ))}
              </CardCarousel>
            </div>

            <div className="mt-[38px] flex lg:mt-0">
              <div className="h-full w-[50%] flex-1 lg:h-[214px] lg:max-w-[187px]">
                <Carousel plugins={[Autoplay({ delay: 10000 })]}>
                  <CarouselContent className="w-full border-none lg:h-full">
                    {[Drink1, Drink2, Drink3, Drink4].map((icon, idx) => (
                      <CarouselItem key={idx} className="w-full">
                        <div className="relative h-[196px] w-full overflow-hidden rounded-[8px] lg:h-[214px]">
                          <img
                            src={icon}
                            className="absolute left-0 top-0 h-full w-full object-cover"
                          />
                          <div className="absolute left-0 top-0 h-full w-full bg-black bg-opacity-40" />
                          <div className="relative flex h-full flex-col justify-between p-4 text-white">
                            <Drop />

                            <p className="font-medium lg:text-lg">
                              Drink <span className="text-xl">10</span> glasses of water today
                            </p>
                          </div>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
              </div>
              <div className="flex-1 rounded-[18px] border px-4 py-3 text-[#4D5061] lg:h-[214px] lg:w-[210px]">
                <div className="flex items-start justify-between">
                  <span className="inline-block rounded-full bg-[#fdf1d3] px-[10px] py-[5px] text-xs font-semibold text-[#4D5061]">
                    Daily intake
                  </span>
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e6f7fe]">
                    <Meal />
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <h3 className="font-montserrat text-[30px] font-bold">2,500</h3>
                  <p className="text-xs font-medium text-black">Kcal</p>
                </div>
                <div className="mt-4 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <div className="h-[5px] w-[5px] rounded-full bg-primary"></div>
                      <p className="text-xs font-semibold">Protein</p>
                    </div>
                    <p className="text-sm font-medium">157g</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <div className="h-[5px] w-[5px] rounded-full bg-[#7C8293]" />
                      <p className="text-xs font-semibold">Carbs</p>
                    </div>
                    <p className="text-sm font-medium">282g</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <div className="h-[5px] w-[5px] rounded-full bg-[#F5CB5C]" />
                      <p className="text-xs font-semibold">Fats </p>
                    </div>
                    <p className="text-sm font-medium">84g</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 lg:mt-14">
            <h3 className="text-lg font-semibold text-[#333]">Upcoming Meals Today</h3>
            <div className="flex overflow-hidden lg:w-[1080px]">
              <div className="mt-4 flex flex-1 gap-10 overflow-scroll py-1 lg:mt-8">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <MealCard key={i} />
                ))}
              </div>
            </div>
          </div>
          <div className="mt-6 lg:mt-14">
            <h3 className="text-lg font-semibold text-[#333]">Tomorrow’s Meal Plan</h3>
            <div className="flex overflow-hidden lg:w-[1080px]">
              <div className="mt-4 flex flex-1 gap-10 overflow-scroll py-1 lg:mt-8">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <MealCard key={i} />
                ))}
              </div>
            </div>
          </div>
          <div className="mt-6 lg:mt-14">
            <h3 className="text-lg font-semibold text-[#333]">30th August Meal Plan</h3>
            <div className="flex overflow-hidden lg:w-[1080px]">
              <div className="mt-4 flex flex-1 gap-10 overflow-scroll py-1 lg:mt-8">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <MealCard key={i} />
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="fitness" className="mt-9 w-full flex-1">
          <div className="lg:flex lg:gap-4">
            <div className="lg:max-w-[600px]">
              <CardCarousel type="Exercise">
                {[1, 2, 3].map((i) => (
                  <CarouselItem>
                    <ExerciseCard />
                  </CarouselItem>
                ))}
              </CardCarousel>
            </div>

            <div className="mt-[38px] flex lg:mt-0 lg:flex-1">
              <div className="h-full w-[50%] flex-1 lg:h-[214px] lg:w-full">
                <Carousel plugins={[Autoplay({ delay: 10000 })]}>
                  <CarouselContent className="w-full border-none lg:h-full">
                    {[Drink1, Drink2, Drink3, Drink4].map((icon, idx) => (
                      <CarouselItem key={idx} className="w-full">
                        <div className="relative h-[214px] w-full overflow-hidden rounded-[8px]">
                          <img
                            src={icon}
                            className="absolute left-0 top-0 h-full w-full object-cover"
                          />
                          <div className="absolute left-0 top-0 h-full w-full bg-black bg-opacity-40" />
                          <div className="relative flex h-full flex-col justify-between p-4 text-white">
                            <Drop />

                            <p className="text-lg font-medium">
                              Drink at least <span className="text-2xl">1 full</span> bottle of
                              water during your session
                            </p>
                          </div>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
              </div>
            </div>
          </div>
          <div className="mt-16 flex gap-[40px] overflow-scroll lg:w-[1080px]">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex-shrink-0 lg:w-[401px]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <p className="text-lg font-semibold text-[#333]">Next Routine</p>
                    <Checkbox className="h-5 w-5 rounded-full" />
                  </div>

                  <button className="flex items-center gap-1 rounded-[8px] bg-[#e6f6fd] px-4 py-[10px] font-semibold text-primary">
                    <Info size={18} />
                    Tips
                  </button>
                </div>
                <div className="mt-7 overflow-hidden rounded-[20px] border">
                  <div className="flex items-center justify-between bg-[#e5e8ec] px-6 py-3">
                    <div className="flex items-center gap-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
                        <Dumbbell size={18} />
                      </div>
                      <p className="line-clamp-1 text-lg font-semibold text-[#333]">
                        Restorative Yoga
                      </p>
                    </div>
                    <p className="text-2xl font-semibold text-primary">
                      -85 <span className="text-sm text-black">Kcal</span>
                    </p>
                  </div>
                  <div className="flex flex-col divide-y">
                    {ExerciseRoutine.map((ex) => (
                      <div key={ex.title} className="px-7 py-8">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold">{ex.title}</h4>
                          <p className="font-medium text-[#667085]">{ex.time}</p>
                        </div>
                        <div className="mt-5 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Checkbox className="h-5 w-5 rounded-full" />
                            <p className="text-sm font-medium">Done</p>
                          </div>
                          <button className="font-semibold text-primary underline">
                            View Instruction
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </section>
  )
}
