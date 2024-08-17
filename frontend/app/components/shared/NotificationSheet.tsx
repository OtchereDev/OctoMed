import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet'

export default function NotificationSheet({ children }: { children: React.ReactNode }) {
  return (
    <Sheet>
      <SheetTrigger>{children}</SheetTrigger>
      <SheetContent className="w-full lg:w-[432px]">
        <SheetHeader>
          <SheetTitle className="mb-4 border-b pb-5 text-left font-montserrat text-xl font-bold">
            Your Notifications
          </SheetTitle>
          <SheetDescription className="text-left">
            <div className="w-full rounded-2xl border border-[#D0D5DD99]">
              <div className="flex items-center gap-4 border-b p-4">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-montserrat font-semibold text-[#191919]">
                    Your appointment has started
                  </h3>
                  <div>
                    <p className="font-montserrat text-xs text-[#667085]">Health Care Providers</p>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <p className="font-montserrat text-sm font-medium">
                  Appointment #5 - Dr Daniel Everton
                </p>
                <p className="mt-1 font-montserrat text-sm font-medium">Primary Care Doctor</p>
                <p className="mt-1 font-montserrat text-sm font-medium">
                  9:00 AM - 9:30 AM | 30 Minutes
                </p>

                <div className="mt-4 flex justify-between">
                  <button className="text-sm font-semibold text-[#F04438]">Cancel</button>
                  <button className="font-raleway text-sm font-semibold text-[#1282A2]">
                    Re-Schedule
                  </button>
                  <button className="rounded-primary bg-[#1282A2] px-5 py-3 font-raleway text-sm font-semibold text-white">
                    Join Appointment
                  </button>
                </div>
              </div>
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
