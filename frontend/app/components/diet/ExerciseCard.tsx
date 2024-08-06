import { Clock } from 'lucide-react'
import { Checkbox } from '../ui/checkbox'

export default function ExerciseCard() {
  return (
    <div className="flex h-[150px] overflow-hidden rounded-[20px] bg-[#667085] lg:h-[214px]">
      <div className="relative w-[55%] px-[11px] py-[12px] lg:px-[18px] lg:py-[25px]">
        <img
          className="absolute left-0 top-0 h-full w-full object-cover"
          src="https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />
        <div className="absolute inset-0 rounded-md bg-black opacity-30"></div>
        <div className="relative">
          <div className="inline-flex items-center gap-2 rounded-full bg-white bg-opacity-30 px-2 py-1">
            <div className="h-[5px] w-[5px] rounded-full bg-[#f5cb5c] lg:h-[8px] lg:w-[8px]"></div>
            <div className="flex items-center gap-2 font-montserrat text-[8px] font-semibold text-white lg:text-sm">
              <p>Next Routine</p>
            </div>
          </div>

          <h3 className="mt-4 line-clamp-2 font-montserrat text-xs font-bold text-white lg:mt-[26px] lg:text-lg">
            Boiled Yam with Palava Sauce & Boiled Eggs
          </h3>
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-between pb-[17px] pl-[11px] pt-[18px] text-white lg:p-[25px]">
        <div>
          <div className="flex gap-1 lg:gap-2">
            <Clock className="h-[13px] w-[13px] lg:h-6 lg:w-6" />
            <p className="font-montserrat text-[10px] font-medium lg:text-base">In 3hrs 28mins</p>
          </div>
          <h3 className="mt-2 flex items-center font-montserrat font-bold lg:text-2xl">
            +809 Kcal <span className="ml-1 text-sm font-normal">Total</span>
          </h3>
        </div>
        <div className="flex items-center gap-1 lg:gap-2">
          <Checkbox className="h-[13px] w-[13px] rounded-full bg-white lg:h-4 lg:w-4" />{' '}
          <p className="text-[10px] font-medium lg:text-base">Mark as completed</p>
        </div>
      </div>
    </div>
  )
}
