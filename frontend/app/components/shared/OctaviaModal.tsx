import { Expand, Send } from 'lucide-react'
import Octavia from '~/assets/images/octavia.png'
import Bg from '~/assets/octavia-bg.png'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'

export default function OctaviaModal({ children }: { children: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="!bottom-0 !mb-auto mt-10 flex !h-[90%] !w-full flex-col gap-0 overflow-hidden !rounded-t-[20px] border-0 p-0 lg:ml-[35%] lg:mt-3 lg:!h-[589px] lg:!w-[415px] lg:rounded-[20px]">
        <DialogHeader className="relative h-[144px] p-4 text-left">
          <img src={Bg} className="absolute left-0 top-0 h-full w-full object-cover" />
          <div className="relative flex items-center justify-between pt-3">
            <DialogTitle className="font-montserrat text-2xl font-semibold text-white">
              Hi Daniel 👋
            </DialogTitle>
            <button className="mt-4 text-white">
              <Expand />
            </button>
          </div>
          <p className="relative pt-2 font-montserrat font-medium text-white">I’m here to help</p>
        </DialogHeader>
        <DialogDescription className="flex flex-1 flex-col bg-[#f7f8f9]">
          <div className="flex-1 overflow-scroll p-4">
            <div className="relative -mt-10 lg:mt-0">
              <div className="h-[45px] w-[45px] rounded-full border-4 border-primary bg-[#fdfefe]">
                <img src={Octavia} />
              </div>
              <p className="mt-2 font-montserrat text-[#4B5768]">
                I’m Octavia, your <span className="font-bold">Octomed Chat Companion</span> What can
                I help you with today?
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 border-t bg-white px-4 py-4">
            <input
              placeholder="Ask a question"
              className="flex-1 border-r py-2 pr-4 font-montserrat text-lg text-black outline-none"
            />
            <button className="px-2 text-primary">
              <Send />
            </button>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}
