import * as DialogPrimitive from '@radix-ui/react-dialog'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog'

export default function RemoveUser({
  isOpen,
  closeModal,
}: {
  isOpen: boolean
  closeModal: () => void
}) {
  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="w-[calc(100%-20px)] !rounded-[20px] text-left lg:!w-[412px]">
        <DialogHeader>
          <DialogTitle className="text-left font-montserrat font-bold">Remove Post?</DialogTitle>
        </DialogHeader>
        <DialogDescription className="pt-4">
          <p className="mb-2 font-montserrat font-medium text-[#4D5061]">
            Do you want to remove Daniel from this group? They will no longer be able to contribute
            to this group
          </p>

          <div className="mt-6 flex gap-4">
            <button className="flex-1 rounded-primary bg-[#1282A2] py-3 font-raleway font-bold text-white">
              Remove
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
