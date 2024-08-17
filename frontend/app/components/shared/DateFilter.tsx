import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Calendar as CalendarIcon } from '~/components/shared/icons'
import { Calendar } from '../ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'

export default function DateFilter() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="flex items-center gap-4">
          <div className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#e6f7fe]">
            <CalendarIcon />
          </div>
          <p className="font-montserrat text-sm font-semibold text-[#7C8293] lg:text-lg">August</p>
          <button className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#e6f7fe] text-[#1282A2]">
            <ChevronLeft strokeWidth={3} />
          </button>
          <p className="text-2xl font-medium text-[#667085] lg:text-3xl">
            28<span className="text-base">th</span>
          </p>
          <button className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#e6f7fe] text-[#1282A2]">
            <ChevronRight strokeWidth={3} />
          </button>
        </button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          // selected={field.value}
          // onSelect={field.onChange}
          disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
