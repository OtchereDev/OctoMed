import { Form } from '@remix-run/react'
import { IAllergy, IHealthCondition } from '~/types/health-condition'
import { Checkbox } from '../ui/checkbox'

export default function HealthConditionForm({
  allergies,
  health_conditions,
}: {
  allergies: IAllergy[]
  health_conditions: IHealthCondition[]
}) {
  return (
    <Form>
      <div className="relative my-8 h-[471px] w-full overflow-scroll rounded-primary bg-[#fffaef] p-[20px]">
        <h4 className="font-montserrat font-semibold text-[#4D5061]">Allergies</h4>
        <div className="mt-4 flex flex-col gap-y-4 lg:grid lg:grid-cols-3">
          {allergies?.map((allergy) => (
            <div className="flex items-center gap-3" key={allergy.id}>
              <Checkbox
                className="border-[#D0D5DD] data-[state=checked]:bg-[#F5CB5C]"
                value={allergy.id}
                name="allergies"
              />
              <p className="font-montserrat text-sm text-[#353746]">{allergy.allergy}</p>
            </div>
          ))}
        </div>
        <h4 className="mt-7 font-montserrat font-semibold text-[#4D5061]">Health Conditions</h4>
        <div className="mt-4 flex flex-col gap-y-4 lg:grid lg:grid-cols-3">
          {health_conditions?.map((allergy) => (
            <div className="flex items-center gap-3" key={allergy.id}>
              <Checkbox
                name="health_conditions"
                value={allergy.id}
                className="border-[#D0D5DD] data-[state=checked]:bg-[#F5CB5C]"
              />
              <p className="font-montserrat text-sm text-[#353746]">{allergy.health_condition}</p>
            </div>
          ))}
        </div>
      </div>

      <button className="rounded-primary bg-[#1282A2] px-8 py-[10px] font-raleway font-bold text-white">
        Save
      </button>
    </Form>
  )
}
