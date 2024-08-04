import * as DialogPrimitive from '@radix-ui/react-dialog'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'

export default function EndAppointment({ children }: { children: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger className="">{children}</DialogTrigger>
      <DialogContent className="w-[calc(100%-20px)] !rounded-[20px] text-left lg:!w-[412px]">
        <DialogHeader>
          <DialogTitle className="text-left font-montserrat font-bold">
            End the Appointment
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="pt-2">
          <p className="font-montserrat font-medium text-[#4D5061]">
            Are you sure you want to end the appointment?
          </p>

          <div className="mt-6 flex gap-4">
            <button className="flex-1 rounded-primary bg-[#1282A2] py-3 font-raleway font-bold text-white">
              Yes
            </button>
            <DialogPrimitive.Close className="flex-1 rounded-primary border py-3 font-raleway font-bold">
              No
            </DialogPrimitive.Close>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}
