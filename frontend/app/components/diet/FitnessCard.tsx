import { Form } from '@remix-run/react'
import { Dumbbell, Info } from 'lucide-react'
import { useState } from 'react'
import { IExercise } from '~/types/exercises'
import { Checkbox } from '../ui/checkbox'
import InstructionModal from './InstructionModal'

export default function FitnessCard({ exercise }: { exercise: IExercise }) {
  const totalTime = exercise.instructions.reduce(
    (prev, instruction) => prev + instruction.minutes,
    0
  )
  const [isOpen, setIsOpen] = useState(false)
  const [currentInstruction, setCurrentInstruction] = useState(0)
  const is_done = exercise.instructions.map((i) => i.is_completed).every((i) => i == true)

  function moveInstruction(direction: 'prev' | 'next') {
    if (direction == 'prev' && currentInstruction > 0) {
      setCurrentInstruction((curr) => curr - 1)
    } else if (direction == 'next' && currentInstruction < exercise.instructions.length) {
      setCurrentInstruction((curr) => curr + 1)
    }
  }

  return (
    <div key={exercise.id} className="flex-shrink-0 lg:w-[401px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <p className="text-lg font-semibold text-[#333]">Next Routine</p>
          <Form method="POST" className="flex items-center gap-1 lg:gap-2">
            <input name="form" value="mark-complete" className="hidden" />
            <input name="id" value={exercise.id} className="hidden" />
            <button>
              <Checkbox checked={is_done} className="h-5 w-5 rounded-full" />
            </button>
          </Form>
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
            <p className="line-clamp-1 text-lg font-semibold text-[#333]">{exercise.name}</p>
          </div>
          <p className="text-nowrap text-2xl font-semibold text-primary">
            -{exercise.calories_lost} <span className="text-sm text-black">Kcal</span>
          </p>
        </div>
        <div className="flex flex-col divide-y">
          {exercise.instructions.map((ex, idx) => (
            <div key={ex.id} className="px-7 py-8">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">
                  {idx + 1}. {ex.title}
                </h4>
                <p className="font-medium text-[#667085]">{ex.minutes} mins</p>
              </div>
              <div className="mt-5 flex items-center justify-between">
                <Form method="POST" className="flex items-center gap-2">
                  <input name="form" value="mark-instruction" className="hidden" />
                  <input name="id" value={ex.id} className="hidden" />
                  <button>
                    <Checkbox checked={ex.is_completed} className="h-5 w-5 rounded-full" />
                  </button>
                  <p className="text-sm font-medium">{ex.is_completed ? 'Done' : 'Not done'}</p>
                </Form>
                <button
                  onClick={() => {
                    setCurrentInstruction(idx)
                    setIsOpen(true)
                  }}
                  className="font-semibold text-primary underline"
                >
                  View Instruction
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <InstructionModal
        count={exercise.instructions.length - 1}
        title={exercise.instructions[currentInstruction].title}
        minutes={exercise.instructions[currentInstruction].minutes}
        photo={exercise.photo}
        instruction={exercise.instructions[currentInstruction].content}
        current={currentInstruction}
        open={isOpen}
        setOpen={setIsOpen}
        moveInstruction={moveInstruction}
      />
    </div>
  )
}
