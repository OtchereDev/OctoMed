import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { Carousel, CarouselApi, CarouselContent } from '../ui/carousel'

export default function CardCarousel({
  children,
  type,
}: {
  children: React.ReactNode
  type: string
}) {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  const scrollPrev = useCallback(() => {
    api?.scrollPrev()
  }, [api])

  const scrollNext = useCallback(() => {
    api?.scrollNext()
  }, [api])

  useEffect(() => {
    if (!api) {
      return
    }

    setCurrent(api.selectedScrollSnap() + 1)

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])
  return (
    <Carousel setApi={setApi}>
      <CarouselContent>{children}</CarouselContent>

      <div className="mt-4 flex items-center gap-3">
        <button
          onClick={scrollPrev}
          className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#e6f7fe] text-[#1282A2]"
        >
          <ChevronLeft strokeWidth={3} />
        </button>
        <p className="font-montserrat text-sm font-semibold">
          {type} Option {current}
        </p>
        <button
          onClick={scrollNext}
          className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#e6f7fe] text-[#1282A2]"
        >
          <ChevronRight strokeWidth={3} />
        </button>
      </div>
    </Carousel>
  )
}
