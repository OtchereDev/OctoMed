import Autoplay from 'embla-carousel-autoplay'
import { Dumbbell, Info } from 'lucide-react'
import Drink1 from '~/assets/images/drink1.jpeg'
import Drink2 from '~/assets/images/drink2.jpeg'
import Drink3 from '~/assets/images/drink3.jpeg'
import Drink4 from '~/assets/images/drink4.jpeg'
import CardCarousel from '../shared/CardCarousel'
import { Drop } from '../shared/icons'
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel'
import { Checkbox } from '../ui/checkbox'
import { TabsContent } from '../ui/tabs'
import ExerciseCard from './ExerciseCard'

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

export default function ExerciseContent() {
  return (
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
                          Drink at least <span className="text-2xl">1 full</span> bottle of water
                          during your session
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
                  <p className="line-clamp-1 text-lg font-semibold text-[#333]">Restorative Yoga</p>
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
  )
}
