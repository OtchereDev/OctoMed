import * as DialogPrimitive from '@radix-ui/react-dialog'
import { MessageCircleMore, UsersRound } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog'

export default function JoinGroup({ children }: { children: React.ReactNode }) {
  return (
    <Dialog>
      <DialogPrimitive.DialogTrigger>{children}</DialogPrimitive.DialogTrigger>
      <DialogContent className="w-[calc(100%-20px)] !rounded-[20px] text-left lg:!w-[723px]">
        <DialogHeader>
          <DialogTitle className="text-left font-montserrat font-bold text-[#4D5061]">
            View Group Details
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="mt-[18px] font-montserrat">
          <div className="flex items-center gap-4">
            <Avatar className="h-[78px] w-[78px]">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-xl font-medium text-black">Yoga Masterfitness</p>
              <div className="mt-3 flex items-center gap-7 text-[#4D5061]">
                <div className="flex items-center gap-2">
                  <UsersRound size={15} />
                  <p className="text-sm">8 members</p>
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircleMore size={15} />
                  <p className="text-sm">240 chats</p>
                </div>
              </div>
            </div>
          </div>

          <p className="w-[90%] pt-8 text-sm">
            This group is dedicated to individuals passionate about health, fitness, and well-being.
            Whether you're just starting your journey or are a seasoned wellness enthusiast, this..
          </p>

          <div className="mt-6 flex gap-4">
            <button
              disabled
              className="flex items-center gap-2 rounded-primary bg-[#1282A2] px-9 py-4 font-raleway font-bold text-white"
            >
              Join Group
            </button>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}
