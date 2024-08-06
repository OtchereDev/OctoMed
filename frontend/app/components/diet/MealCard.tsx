import { Meal } from '../shared/icons'
import { Checkbox } from '../ui/checkbox'

export default function MealCard() {
  return (
    <div className="w-[236px] flex-shrink-0 rounded-[20px] border shadow-md">
      <div className="border-b p-4">
        <div className="flex items-center justify-between">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#ECEEF1]">
            <Meal />
          </div>
          <span className="inline-block rounded-full bg-[#e6f7fe] px-4 py-[5px] text-xs font-semibold text-primary">
            Lunch
          </span>
        </div>
        <div className="mt-7">
          <p className="text-sm font-semibold text-[#333]">Red red with ripe plantain and gari</p>

          <div className="mb-2 mt-8 flex items-center gap-2">
            <div className="h-[5px] w-[5px] rounded-full bg-primary" />
            <p className="text-lg font-semibold text-primary">
              150 <span className="text-sm font-medium text-black">Kcal</span>
            </p>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2">
          <Checkbox className="h-5 w-5 rounded-full" />
          <p className="text-sm font-medium">Completed</p>
        </div>
      </div>
    </div>
  )
}
