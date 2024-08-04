import * as DialogPrimitive from '@radix-ui/react-dialog'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog'

export default function DeleteGroup({ children }: { children: React.ReactNode }) {
  return (
    <Dialog>
      <DialogPrimitive.DialogTrigger className="w-full">{children}</DialogPrimitive.DialogTrigger>
      <DialogContent className="w-[calc(100%-20px)] !rounded-[20px] text-left lg:!w-[412px]">
        <DialogHeader>
          <DialogTitle className="text-left font-montserrat font-bold">Delete Group?</DialogTitle>
        </DialogHeader>
        <DialogDescription className="pt-4">
          <p className="mb-2 font-montserrat font-medium text-[#4D5061]">
            Are you sure you want to delete this group? All chats will be deleted and members
            removed This action cannot be undone Continue?
          </p>

          <div className="mt-8 flex gap-4">
            <button className="flex-1 rounded-primary bg-[#1282A2] py-3 font-raleway font-bold text-white">
              Delete
            </button>
            <DialogPrimitive.Close className="flex-1 rounded-primary border py-3 font-raleway font-bold">
              Cancel
            </DialogPrimitive.Close>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}
