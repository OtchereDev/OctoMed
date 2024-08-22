import * as DialogPrimitive from '@radix-ui/react-dialog'
import { Form, useActionData, useNavigation } from '@remix-run/react'
import { useEffect, useState } from 'react'
import { action } from '~/routes/_dashboard.health-care-providers._index'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { toast } from '../ui/use-toast'

export default function DeleteAppointment({
  children,
  apptId,
}: {
  children: React.ReactNode
  apptId: number
}) {
  const loading = useNavigation().state == 'submitting'
  const [open, setOpen] = useState(false)

  const response = useActionData<typeof action>()

  useEffect(() => {
    if (response?.errors?.length) {
      toast({ description: response?.response, title: 'Error' })
    } else if (response?.response) {
      toast({ description: response?.response })
      setOpen(false)
    }
  }, [response])

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="w-[calc(100%-20px)] !rounded-[20px] text-left lg:!w-[412px]">
        <DialogHeader>
          <DialogTitle className="text-left font-montserrat font-bold">
            Delete this Appointment
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="pt-4">
          <Form method="POST">
            <input name="form" value="delete-appointment" className="hidden" />
            <input name="id" value={apptId} className="hidden" />
            <p className="mb-2 font-montserrat font-medium text-[#4D5061]">
              Are you sure you want to delete the appointment?
            </p>

            <div className="mt-6 flex gap-4">
              <button
                disabled={loading}
                className="flex-1 rounded-primary bg-[#1282A2] py-3 font-raleway font-bold text-white"
              >
                {loading ? 'Please wait...' : 'Yes'}
              </button>
              <DialogPrimitive.Close
                type="button"
                className="flex-1 rounded-primary border py-3 font-raleway font-bold"
              >
                No
              </DialogPrimitive.Close>
            </div>
          </Form>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}
