import { useLoaderData } from '@remix-run/react'
import Autoplay from 'embla-carousel-autoplay'
import Drink1 from '~/assets/images/drink1.jpeg'
import Drink2 from '~/assets/images/drink2.jpeg'
import Drink3 from '~/assets/images/drink3.jpeg'
import Drink4 from '~/assets/images/drink4.jpeg'
import { loader } from '~/routes/_dashboard.diet-and-exercises'
import { IWateConsumption } from '~/types/diet'
import { IExercise } from '~/types/exercises'
import CardCarousel from '../shared/CardCarousel'
import { Drop } from '../shared/icons'
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel'
import { TabsContent } from '../ui/tabs'
import ExerciseCard from './ExerciseCard'
import FitnessCard from './FitnessCard'

export default function ExerciseContent() {
  const response = useLoaderData<typeof loader>()

  return (
    <TabsContent value="fitness" className="mt-9 w-full flex-1 overflow-scroll">
      {response && (
        <>
          <div className="lg:flex lg:gap-4">
            <div className="lg:max-w-[600px]">
              <CardCarousel type="Exercise">
                {(response as any)?.data?.exercises?.map((exercise: IExercise) => (
                  <CarouselItem key={exercise.id}>
                    <ExerciseCard exercise={exercise} />
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
                              Drink at least{' '}
                              <span className="text-2xl">
                                {10 -
                                  ((response as any)?.data?.water as IWateConsumption)
                                    .number_of_glass}{' '}
                                full
                              </span>{' '}
                              bottle of water during your session
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
            {(response as any)?.data?.exercises?.map((exercise: IExercise) => (
              <FitnessCard exercise={exercise} key={exercise.id} />
            ))}
          </div>
        </>
      )}
    </TabsContent>
  )
}
