import * as DialogPrimitive from '@radix-ui/react-dialog'
import { Form, useActionData, useNavigation } from '@remix-run/react'
import { useEffect, useState } from 'react'
import { action } from '~/routes/_dashboard.health-data'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { toast } from '../ui/use-toast'

export default function DeleteHealthData({
  children,
  metric,
  form,
  id,
  date,
}: {
  children: React.ReactNode
  metric: string
  id: number
  form: string
  date: string
}) {
  const [open, setOpen] = useState(false)

  const response = useActionData<typeof action>()
  const loading = useNavigation().state == 'submitting'

  useEffect(() => {
    if (response && response?.errors?.length == 0) {
      toast({ title: 'Successfull', description: response?.response })
      setOpen(false)
    }
  }, [response])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="!w-[387px] !rounded-[20px]">
        <DialogHeader>
          <DialogTitle className="font-montserrat font-bold">Delete {metric} Data</DialogTitle>
        </DialogHeader>
        <DialogDescription className="pt-4">
          <p className="mb-2 font-montserrat font-semibold text-[#4D5061]">
            Are you sure you want to delete the <span className="font-bold">{metric}</span> data
            entered on <span className="font-bold">{date}</span>?
          </p>

          <Form method="POST" className="mt-6 flex gap-4">
            <input value={id} name="id" className="hidden" />
            <input value={form} name="form" className="hidden" />
            <DialogPrimitive.Close
              type="button"
              className="flex-1 rounded-primary border py-3 font-raleway font-bold"
            >
              No, don’t delete
            </DialogPrimitive.Close>
            <button
              disabled={loading}
              className="flex-1 rounded-primary bg-[#1282A2] py-3 font-raleway font-bold text-white"
            >
              {loading ? 'Loading ...' : 'Yes, delete'}
            </button>
          </Form>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}
