import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group'
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

const metrics = [
  'Pulse',
  'Heart Rate',
  'Blood Pressure',
  'Blood Glucose',
  'Sleep Pattern',
  'Height',
  'Weight',
  'BMI',
]

export default function AddHealthData({ children }: { children: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="!w-[723px] !rounded-[20px]">
        <DialogHeader>
          <DialogTitle className="font-montserrat font-bold">Add Health Data</DialogTitle>
        </DialogHeader>
        <DialogDescription className="pt-8">
          <div className="w-[300px]">
            <p className="mb-2 font-montserrat font-semibold text-[#4D5061]">Today's Date</p>
            <Input label="(dd/mm/yyyy)" disabled type="date" name="date" />
          </div>
          <div className="mt-10">
            <p className="mb-2 font-montserrat font-semibold text-[#4D5061]">Health Data Type</p>
            <RadioGroup defaultValue="comfortable">
              <div className="grid grid-cols-4 gap-y-5">
                {metrics.map((metric) => (
                  <div className="flex items-center gap-2" key={metric}>
                    <RadioGroupItem value={metric} id={metric} className="h-5 w-5 rounded-full" />
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

          <div className="mt-10">
            <p className="mb-2 font-montserrat font-semibold text-[#4D5061]">Health Data Type</p>
            <div className="mt-3 grid grid-cols-2 gap-4">
              <div className="flex w-full items-start gap-[15px]">
                <select
                  className="w-[98px] rounded-primary border border-[#667085] px-[15px] py-[18px] font-poppins text-sm text-[#191919] lg:py-[15px]"
                  name="weight_metric"
                >
                  <option value="KG">KG</option>
                  <option value="G">G</option>
                </select>
                <Input
                  type="number"
                  label="Weight"
                  name="weight"
                  //   error={getFormError('weight', response?.errors)}
                />
              </div>
              <div className="flex w-full items-start gap-[15px]">
                <select
                  className="w-[98px] rounded-primary border border-[#667085] px-[15px] py-[18px] font-poppins text-sm text-[#191919] lg:py-[15px]"
                  name="weight_metric"
                >
                  <option value="KG">KG</option>
                  <option value="G">G</option>
                </select>
                <Input
                  type="number"
                  label="Weight"
                  name="weight"
                  //   error={getFormError('weight', response?.errors)}
                />
              </div>
            </div>
          </div>

          <div className="mt-12">
            <button className="flex gap-3 rounded-primary bg-[#1282A2] px-[32px] py-3 font-raleway font-bold text-white">
              <div className="flex h-[24px] w-[24px] items-center justify-center rounded-full border-2 border-dashed">
                <CirclePlus />
              </div>
              Add Health Data
            </button>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}
