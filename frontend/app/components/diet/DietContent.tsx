import { useLoaderData } from '@remix-run/react'
import Autoplay from 'embla-carousel-autoplay'
import Drink1 from '~/assets/images/drink1.jpeg'
import Drink2 from '~/assets/images/drink2.jpeg'
import Drink3 from '~/assets/images/drink3.jpeg'
import Drink4 from '~/assets/images/drink4.jpeg'
import { loader } from '~/routes/_dashboard.diet-and-exercises'
import { IMeal, IWateConsumption } from '~/types/diet'
import CardCarousel from '../shared/CardCarousel'
import { Drop, Meal } from '../shared/icons'
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel'
import { TabsContent } from '../ui/tabs'
import DietCard from './DietCard'
import MealCard from './MealCard'

export default function DietContent() {
  const response = useLoaderData<typeof loader>()

  const protein = (response as any)?.data?.meals?.reduce(
    (prev: number, meal: IMeal) => prev + meal.protein,
    0
  )
  const calories = (response as any)?.data?.meals?.reduce(
    (prev: number, meal: IMeal) => prev + meal.calories,
    0
  )
  const fats = (response as any)?.data?.meals?.reduce(
    (prev: number, meal: IMeal) => prev + meal.fats,
    0
  )
  const carbs = (response as any)?.data?.meals?.reduce(
    (prev: number, meal: IMeal) => prev + meal.carbs,
    0
  )
  return (
    <TabsContent value="diet" className="mt-9 w-full">
      {response && (
        <>
          <div className="lg:flex lg:gap-4">
            <div className="lg:max-w-[650px]">
              <CardCarousel type="Meal">
                {(response as any)?.data?.meals?.map((meal: IMeal) => (
                  <CarouselItem key={meal.id}>
                    <DietCard meal={meal} />
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
                              Drink{' '}
                              <span className="text-xl">
                                {10 -
                                  ((response as any)?.data?.water as IWateConsumption)
                                    .number_of_glass}
                              </span>{' '}
                              glasses of water today
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
                  <h3 className="font-montserrat text-[30px] font-bold">{calories}</h3>
                  <p className="text-xs font-medium text-black">Kcal</p>
                </div>
                <div className="mt-4 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <div className="h-[5px] w-[5px] rounded-full bg-primary"></div>
                      <p className="text-xs font-semibold">Protein</p>
                    </div>
                    <p className="text-sm font-medium">{protein}g</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <div className="h-[5px] w-[5px] rounded-full bg-[#7C8293]" />
                      <p className="text-xs font-semibold">Carbs</p>
                    </div>
                    <p className="text-sm font-medium">{carbs}g</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <div className="h-[5px] w-[5px] rounded-full bg-[#F5CB5C]" />
                      <p className="text-xs font-semibold">Fats </p>
                    </div>
                    <p className="text-sm font-medium">{fats}g</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 lg:mt-14">
            <h3 className="text-lg font-semibold text-[#333]">Today Upcoming Meals </h3>
            <div className="flex overflow-hidden lg:w-[1080px]">
              <div className="mt-4 flex flex-1 gap-10 overflow-scroll py-1 lg:mt-8">
                {(response as any)?.data?.meals?.map((meal: IMeal) => (
                  <MealCard meal={meal} key={meal.id} />
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </TabsContent>
  )
}
