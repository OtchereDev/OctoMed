import { Form, useActionData, useNavigation } from '@remix-run/react'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group'
import { getFormError } from '~/lib/getFormError'
import { action } from '~/routes/_dashboard.health-data'
import { IHealthData } from '~/types/health-data'
import Input from '../shared/Input'
import { CirclePlus } from '../shared/icons'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { toast } from '../ui/use-toast'

const metrics = ['Pulse', 'Blood Pressure', 'Blood Glucose', 'Sleep Pattern', 'Height', 'Weight']

export default function EditHealthData({
  children,
  metric,
  type,
}: {
  children: React.ReactNode
  metric: IHealthData
  type: string
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
      <DialogContent className="!w-[723px] !rounded-[20px]">
        <DialogHeader>
          <DialogTitle className="font-montserrat font-bold">Edit Health Data</DialogTitle>
        </DialogHeader>
        <DialogDescription className="pt-8">
          <Form method="POST">
            <input className="hidden" name="id" value={metric.id} />
            <div className="w-[300px]">
              <p className="mb-2 font-montserrat font-semibold text-[#4D5061]">Today's Date</p>
              <Input
                label="(dd/mm/yyyy)"
                defaultValue={dayjs().format('YYYY-MM-D')}
                disabled
                type="date"
                name="date"
              />
            </div>
            <div className="mt-10">
              <p className="mb-2 font-montserrat font-semibold text-[#4D5061]">Health Data Type</p>
              <RadioGroup defaultValue={`update-${type}`} disabled name="form">
                <div className="grid grid-cols-4 gap-y-5">
                  {metrics.map((metric) => (
                    <div className="flex items-center gap-2" key={metric}>
                      <RadioGroupItem
                        value={`update-${metric.replace(' ', '-').toLowerCase()}`}
                        id={metric}
                        className="h-5 w-5 rounded-full"
                      />
                      <label
                        htmlFor={metric}
                        className="font-montserrat text-sm font-medium text-[#344054]"
                      >
                        {metric}
                      </label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>

            <input value={`update-${type}`} name="form" />
            <div className="mt-10">
              <p className="mb-2 font-montserrat font-semibold text-[#4D5061]">
                Health Data Reading
              </p>
              <div className="mt-3 grid grid-cols-2 gap-4">
                {`update-${type}` == 'update-weight' && (
                  <div className="flex w-full items-start gap-[15px]">
                    <Input
                      type="number"
                      label="Weight"
                      name="reading"
                      error={getFormError('global', response?.errors)}
                      defaultValue={metric.reading}
                    />
                    <select
                      className="w-[98px] appearance-none rounded-primary border border-[#667085] px-[15px] py-[18px] font-poppins text-sm text-[#191919] lg:py-[15px]"
                      name="weight_metric"
                      disabled
                    >
                      <option value="KG">KG</option>
                    </select>
                  </div>
                )}
                {`update-${type}` == 'update-height' && (
                  <div className="flex w-full items-start gap-[15px]">
                    <Input
                      type="number"
                      label="Height"
                      name="reading"
                      error={getFormError('global', response?.errors)}
                      defaultValue={metric.reading}
                    />
                    <select
                      className="w-[98px] appearance-none rounded-primary border border-[#667085] px-[15px] py-[18px] font-poppins text-sm text-[#191919] lg:py-[15px]"
                      name="weight_metric"
                      disabled
                    >
                      <option value="KG">M</option>
                    </select>
                  </div>
                )}
                {`update-${type}` == 'update-pulse' && (
                  <div className="flex w-full items-start gap-[15px]">
                    <Input
                      type="number"
                      label="Pulse"
                      name="reading"
                      error={getFormError('global', response?.errors)}
                      defaultValue={metric.reading}
                    />
                    <select
                      className="w-[98px] appearance-none rounded-primary border border-[#667085] px-[15px] py-[18px] font-poppins text-sm font-semibold text-[#191919] lg:py-[15px]"
                      disabled
                    >
                      <option className="font-semibold" value="">
                        BPM
                      </option>
                    </select>
                  </div>
                )}

                {`update-${type}` == 'update-blood-pressure' && (
                  <>
                    <div className="flex w-full items-start gap-[15px]">
                      <select
                        className="w-[98px] appearance-none rounded-primary border border-[#667085] px-[15px] py-[18px] font-poppins text-sm font-semibold text-[#191919] lg:py-[15px]"
                        disabled
                      >
                        <option className="font-semibold" value="">
                          Diastolic
                        </option>
                      </select>
                      <Input
                        type="number"
                        label="Diastolic Pressure (mmHg)"
                        name="diastolic"
                        error={getFormError('global', response?.errors)}
                        defaultValue={metric.diastolic}
                      />
                    </div>

                    <div className="flex w-full items-start gap-[15px]">
                      <select
                        className="w-[98px] appearance-none rounded-primary border border-[#667085] px-[15px] py-[18px] font-poppins text-sm font-semibold text-[#191919] lg:py-[15px]"
                        disabled
                      >
                        <option className="font-semibold" value="">
                          Systolic
                        </option>
                      </select>
                      <Input
                        type="number"
                        label="Systolic Pressure (mmHg)"
                        name="systolic"
                        defaultValue={metric.systolic}
                      />
                    </div>
                  </>
                )}

                {`update-${type}` == 'update-blood-glucose' && (
                  <div className="flex w-full items-start gap-[15px]">
                    <Input
                      type="number"
                      label="Blood Glucose"
                      name="reading"
                      error={getFormError('global', response?.errors)}
                      defaultValue={metric.reading}
                    />
                    <select
                      className="w-[98px] appearance-none rounded-primary border border-[#667085] px-[15px] py-[18px] font-poppins text-sm font-semibold text-[#191919] lg:py-[15px]"
                      disabled
                    >
                      <option className="font-semibold" value="">
                        mmol/L
                      </option>
                    </select>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-12">
              <button
                disabled={loading}
                className="flex gap-3 rounded-primary bg-[#1282A2] px-[32px] py-3 font-raleway font-bold text-white"
              >
                <div className="flex h-[24px] w-[24px] items-center justify-center rounded-full border-2 border-dashed">
                  <CirclePlus />
                </div>
                {loading ? 'Please wait...' : 'Edit Health Data'}
              </button>
            </div>
          </Form>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}
