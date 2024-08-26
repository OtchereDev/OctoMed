import { Form } from '@remix-run/react'
import { IMeal } from '~/types/diet'
import { Meal } from '../shared/icons'
import { Checkbox } from '../ui/checkbox'

export default function MealCard({ meal }: { meal: IMeal }) {
  return (
    <div className="flex w-[250px] flex-shrink-0 flex-col justify-between rounded-[20px] border shadow-md">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#ECEEF1]">
            <Meal />
          </div>
          <span className="inline-block rounded-full bg-[#e6f7fe] px-4 py-[5px] text-xs font-semibold capitalize text-primary">
            {meal.type}
          </span>
        </div>
        <div className="mt-7">
          <p className="text-sm font-semibold text-[#333]">{meal.name}</p>

          <div className="mb-2 mt-8 flex items-center gap-2">
            <div className="h-[5px] w-[5px] rounded-full bg-primary" />
            <p className="text-lg font-semibold text-primary">
              {meal.calories} <span className="text-sm font-medium text-black">Kcal</span>
            </p>
          </div>
        </div>
      </div>
      <div className="border-t p-4">
        <Form method="POST" className="flex items-center gap-2">
          <input name="form" value="mark-complete" className="hidden" />
          <input name="id" value={meal.id} className="hidden" />
          <button>
            <Checkbox checked={meal.is_completed} className="h-5 w-5 rounded-full" />
          </button>
          <p className="text-sm font-medium">
            {meal.is_completed ? 'Completed' : 'Mark as completed'}
          </p>
        </Form>
      </div>
    </div>
  )
}
