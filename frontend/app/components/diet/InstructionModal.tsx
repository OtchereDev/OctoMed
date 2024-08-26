import { ChevronLeft, ChevronRight } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog'
import { Bulb } from '../shared/icons'

export default function InstructionModal({
  open,
  setOpen,
  title,
  instruction,
  minutes,
  photo,
  count,
  current,
  moveInstruction,
}: {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  title: string
  instruction: string
  minutes: number
  photo: string
  count: number
  current: number
  moveInstruction: (direction: 'prev' | 'next') => void
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="rounded-[20px] font-montserrat lg:w-[700px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-primary">
            <Bulb />
            Instructions
          </DialogTitle>
          <DialogDescription className="">
            <h3 className="my-2 text-base font-semibold text-black">
              {current + 1}. {title} ({minutes} minutes)
            </h3>
            <p className="text-base">{instruction}</p>

            <img
              src={photo}
              alt="exercise"
              className="my-4 h-[300px] w-full rounded-primary object-cover"
            />
          </DialogDescription>
          <div className="flex justify-end gap-4">
            {current > 0 && (
              <button
                onClick={() => moveInstruction('prev')}
                className="flex w-auto items-center gap-2 text-lg font-semibold text-primary"
              >
                <ChevronLeft /> Prev
              </button>
            )}
            {current < count && (
              <button
                onClick={() => moveInstruction('next')}
                className="flex w-auto items-center gap-2 text-lg font-semibold text-primary"
              >
                Next <ChevronRight />
              </button>
            )}
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
