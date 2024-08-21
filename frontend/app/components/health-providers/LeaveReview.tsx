import { Form, useActionData, useNavigation } from '@remix-run/react'
import { useEffect, useState } from 'react'
import ReactStars from 'react-stars'
import { getFormError } from '~/lib/getFormError'
import { action } from '~/routes/_dashboard.health-care-providers.$doctorId'
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
  const [star, setStar] = useState<number>(0)
  const response = useActionData<typeof action>()
  const [isOpen, setIsOpen] = useState(false)
  const loading = useNavigation().state == 'submitting'

  useEffect(() => {
    if (!response?.errors?.length) {
      setIsOpen(false)
    }
  }, [response])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="flex-1 lg:flex-none">{children}</DialogTrigger>
      <DialogContent className="w-[calc(100%-20px)] !rounded-[20px] text-left lg:!w-[412px]">
        <DialogHeader>
          <DialogTitle className="text-left font-montserrat font-bold">Leave A Review</DialogTitle>
        </DialogHeader>
        <DialogDescription className="">
          <Form method="POST">
            <ReactStars
              count={5}
              onChange={(star) => setStar(star)}
              size={24}
              color2={'#ffd700'}
              className="mb-4"
              half={false}
              value={star}
            />
            <p className="mb-4 text-xs text-red-500">{getFormError('rate', response?.errors)}</p>

            <input name="rate" value={star} className="hidden" />
            <input name="form" value="review" className="hidden" />
            <Textarea
              name="comment"
              placeholder="Write your review here..."
              className="outline-none"
            />

            <p className="text-xs text-red-500">{getFormError('comment', response?.errors)}</p>

            <div className="mt-6 gap-4">
              <button className="rounded-primary bg-[#1282A2] px-8 py-4 font-raleway font-bold text-white">
                {loading ? 'Submit...' : 'Submit'}
              </button>
            </div>
          </Form>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}
