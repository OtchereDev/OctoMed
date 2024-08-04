import * as DialogPrimitive from '@radix-ui/react-dialog'
import { Image, Send } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog'

export default function CreatePost({ children }: { children: React.ReactNode }) {
  return (
    <Dialog>
      <DialogPrimitive.DialogTrigger>{children}</DialogPrimitive.DialogTrigger>
      <DialogContent className="w-[calc(100%-20px)] !rounded-[20px] text-left lg:!w-[723px]">
        <DialogHeader>
          <DialogTitle className="text-left font-montserrat font-bold">Create Post</DialogTitle>
        </DialogHeader>
        <DialogDescription className="font-montserrat">
          <div className="mt-[34px] flex items-center gap-[15px]">
            <p className="text-sm font-medium text-[#4D5061]">Select a category (Optional)</p>
            <div className="flex items-center gap-3">
              {['General Health', 'Diet', 'Fitness', 'Other'].map((i, idx) => (
                <span
                  className={`rounded-full ${idx == 0 ? 'bg-[#09AEF21A]' : 'bg-[#F2F4F7]'} px-[10px] py-[2px] text-sm font-medium text-primary`}
                  key={i}
                >
                  {i}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6 flex h-[175px] w-[400px] resize-none flex-col overflow-hidden rounded-[20px] border border-[#667085] p-[15px]">
            <textarea
              className="w-full flex-1 resize-none outline-none"
              placeholder="What’s on your mind?"
            />
            <button className="relative">
              <Image />
              <input type="file" className="absolute left-0 top-0 h-full w-full opacity-0" />
            </button>
          </div>

          <input
            type="text"
            placeholder="Add a title (Optional)"
            className="mt-6 w-[400px] rounded-[10px] border border-[#667085] px-[15px] py-[18px] outline-none"
          />

          <div className="mt-6 flex gap-4">
            <button className="flex items-center gap-2 rounded-primary bg-[#1282A2] px-8 py-4 font-raleway font-bold text-white">
              <Send size={18} /> Send Post
            </button>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}
