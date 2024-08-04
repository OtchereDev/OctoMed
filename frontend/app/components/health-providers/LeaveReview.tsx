import { useState } from 'react'
import ReactStars from 'react-stars'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { Textarea } from '../ui/textarea'

export default function LeaveReview({ children }: { children: React.ReactNode }) {
  const [star, setStar] = useState<number>()
  return (
    <Dialog>
      <DialogTrigger className="flex-1 lg:flex-none">{children}</DialogTrigger>
      <DialogContent className="w-[calc(100%-20px)] !rounded-[20px] text-left lg:!w-[412px]">
        <DialogHeader>
          <DialogTitle className="text-left font-montserrat font-bold">Leave A Review</DialogTitle>
        </DialogHeader>
        <DialogDescription className="">
          <ReactStars
            count={5}
            onChange={(star) => setStar(star)}
            size={24}
            color2={'#ffd700'}
            className="mb-4"
            half={false}
          />
          <input name="rate" value={star} className="hidden" />
          <Textarea
            name="comment"
            placeholder="Write your review here..."
            className="outline-none"
          />

          <div className="mt-6 gap-4">
            <button className="rounded-primary bg-[#1282A2] px-8 py-4 font-raleway font-bold text-white">
              Submit
            </button>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}
