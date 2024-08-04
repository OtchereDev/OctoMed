import { CalendarIcon, MapPin } from 'lucide-react'
import { Star } from '../shared/icons'
import { Calendar } from '../ui/calendar'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'

export default function BookAppointment({ children }: { children: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger className="w-full">{children}</DialogTrigger>
      <DialogContent className="flex h-full w-full flex-col lg:h-[675px] lg:w-[723px]">
        <DialogHeader>
          <DialogTitle className="pt-[16px] text-left font-montserrat text-xl font-bold text-[#4D5061]">
            Book Appointment
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="flex-1 overflow-scroll pb-24 pt-[18px] text-left font-montserrat lg:pb-0 lg:pt-0">
          <p className="text-left text-xs font-medium lg:text-base">
            Schedule an available time for an appointment with this provider
          </p>

          <div className="mt-[24px] flex gap-4 rounded-[20px] border border-[#D0D5DD99] p-3">
            <div className="h-[80px] w-[80px] overflow-hidden rounded-primary lg:h-[150px] lg:w-[234px]">
              <img
                src="https://images.pexels.com/photos/3714743/pexels-photo-3714743.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="text-left">
              <h4 className="line-clamp-1 text-sm font-bold text-[#191919] lg:text-base">
                Dr Daniel Everton - MD, FACOG
              </h4>
              <div className="mt-1 flex text-xs font-medium lg:mt-3 lg:gap-6 lg:text-sm">
                <p>Primary Care Doctor</p>
                <div className="flex items-center gap-2">
                  <Star />
                  <p>
                    4.9<span className="font-normal">(102)</span>
                  </p>
                </div>
              </div>
              <div className="mt-1 flex items-center gap-2 font-medium lg:mt-3 lg:text-sm">
                <MapPin size={15} />
                <p>St Louis, MO</p>
              </div>
              <div className="mt-1 flex gap-4 text-xs lg:mt-3 lg:text-sm">
                <p>Monday - Friday</p>
                <p>9:00AM - 5:00 PM</p>
              </div>
            </div>
          </div>

          <div className="lg:flex lg:gap-6">
            <div className="mt-[24px] rounded-[20px] border border-[#D0D5DD99] lg:flex-1">
              <div className="border-b p-4 font-semibold text-[#333]">
                <p>Pick appointment date</p>
              </div>
              <div>
                <Calendar mode="single" initialFocus className="" />
              </div>
            </div>
            <div className="mt-[24px] rounded-[20px] border border-[#D0D5DD99] lg:flex-1">
              <div className="border-b p-4 font-semibold text-[#333]">
                <p>Pick appointment time</p>
              </div>
              <div className="grid grid-cols-4 gap-2 p-4">
                {[
                  '9:00 AM',
                  '10:00 AM',
                  '11:00 AM',
                  '12:00 PM',
                  '1:00 PM',
                  '2:00 PM',
                  '3:00 PM',
                  '4:00 PM',
                  '5:00 PM',
                ].map((time, idx) => (
                  <div className={`rounded-sm py-1 ${idx == 0 ? 'bg-[#09AEF21A]' : ''}`}>
                    <p
                      className={`text-center text-xs ${idx == 0 ? 'text-[#1282A2]' : 'text-[#37474F]'}`}
                    >
                      {time}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-[24px] rounded-[20px] border border-[#D0D5DD99]">
            <div className="border-b p-4 font-semibold text-[#333]">
              <p>Pick appointment duration</p>
            </div>
            <div className="grid grid-cols-4 gap-2 p-4 lg:grid-cols-9">
              {['30 Min', '1 Hour', '2 Hours'].map((time, idx) => (
                <div className={`rounded-sm py-1 ${idx == 0 ? 'bg-[#09AEF21A]' : ''}`}>
                  <p
                    className={`text-center text-xs ${idx == 0 ? 'text-[#1282A2]' : 'text-[#37474F]'}`}
                  >
                    {time}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="fixed bottom-0 left-0 w-full border-t bg-white px-4 py-6 lg:relative lg:mt-6 lg:w-auto lg:border-0 lg:px-0 lg:py-0">
            <button className="flex w-full items-center justify-center gap-[10px] rounded-primary bg-primary py-4 font-raleway font-bold text-white lg:w-auto lg:px-8">
              <CalendarIcon size={18} /> Book
            </button>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}
