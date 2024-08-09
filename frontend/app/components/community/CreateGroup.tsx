import * as DialogPrimitive from '@radix-ui/react-dialog'
import { Plus, Search } from 'lucide-react'
import Stepper from '../shared/Stepper'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Checkbox } from '../ui/checkbox'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog'

export default function CreateGroup({ children }: { children: React.ReactNode }) {
  return (
    <Dialog>
      <DialogPrimitive.DialogTrigger className="w-full lg:w-auto">
        {children}
      </DialogPrimitive.DialogTrigger>
      <DialogContent className="w-[calc(100%-20px)] !rounded-[20px] text-left lg:!w-[723px]">
        <DialogHeader>
          <DialogTitle className="text-left font-montserrat font-bold">Create A Group</DialogTitle>
        </DialogHeader>
        <DialogDescription className="mt-[18px] font-montserrat">
          <Stepper total={2} stage={1} title="Add members to your group" />

          <div className="hidden">
            <input
              type="text"
              placeholder="Group Name"
              className="mt-[18px] w-[400px] rounded-[10px] border border-[#667085] px-[15px] py-[18px] outline-none"
            />
            <div className="mt-6 flex h-[175px] w-[400px] resize-none flex-col overflow-hidden rounded-[20px] border border-[#667085] p-[15px]">
              <p className="mb-2 text-sm">Group description</p>
              <textarea
                className="w-full flex-1 resize-none outline-none"
                placeholder="A short description of what the group stands for"
              />
            </div>
          </div>
          <div className="mt-6">
            <div className="flex flex-1 items-center gap-3 rounded-primary border px-[14px] py-[10px] lg:max-w-[320px]">
              <Search strokeWidth={2.5} size={18} />
              <input
                type="text"
                placeholder="Search Members"
                className="flex-1 font-montserrat outline-none placeholder:font-montserrat"
              />
            </div>
            <div className="mt-8 max-h-[454px] overflow-scroll rounded-primary bg-[#F5CB5C] bg-opacity-10 px-4 py-6 text-[#4D5061]">
              <p className="text-sm font-medium">All members</p>
              <div className="mt-[22px] grid w-[545px] grid-cols-2 gap-x-[68px] gap-y-6">
                {Array.from({ length: 10 }).map((_, idx) => (
                  <div key={idx} className="flex items-center gap-[11px]">
                    <Checkbox className="h-5 w-5 rounded-full" />
                    <Avatar className="h-[32px] w-[32px]">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <p className="text-sm font-medium">
                      Daniel <span className="font-normal">@Dannyboah96</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-6 flex gap-4">
            <button
              disabled
              className="flex items-center gap-2 rounded-primary bg-[#1282A2] px-8 py-4 font-raleway font-bold text-white disabled:bg-[#D0D5DD]"
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-dashed">
                <Plus />
              </div>
              Create Group
            </button>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}
