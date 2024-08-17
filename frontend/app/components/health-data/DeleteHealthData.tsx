import * as DialogPrimitive from '@radix-ui/react-dialog'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'

export default function DeleteHealthData({
  children,
  metric,
}: {
  children: React.ReactNode
  metric: string
}) {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="!w-[387px] !rounded-[20px]">
        <DialogHeader>
          <DialogTitle className="font-montserrat font-bold">Delete {metric} Data</DialogTitle>
        </DialogHeader>
        <DialogDescription className="pt-4">
          <p className="mb-2 font-montserrat font-semibold text-[#4D5061]">
            Are you sure you want to delete the <span className="font-bold">{metric}</span> data
            entered on <span className="font-bold">Aug 01, 2024</span>?
          </p>

          <div className="mt-6 flex gap-4">
            <DialogPrimitive.Close className="flex-1 rounded-primary border py-3 font-raleway font-bold">
              No, don’t delete
            </DialogPrimitive.Close>
            <button className="flex-1 rounded-primary bg-[#1282A2] py-3 font-raleway font-bold text-white">
              Yes, delete
            </button>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}
