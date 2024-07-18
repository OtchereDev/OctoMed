import { LoaderFunctionArgs } from '@remix-run/node'
import { json, Link, MetaFunction, redirect } from '@remix-run/react'
import { BackArrow } from '~/components/shared/icons'
import Stepper from '~/components/shared/Stepper'
import { Checkbox } from '~/components/ui/checkbox'
import { preventUnAuthorizedUser } from '~/lib/preventUnAuthorizedUser'

const Allergies = [
  'Anemia',
  'Endocrine Disorder',
  'Angina',
  'Epilepsy',
  'Thyroid Disorder',
  'Asthma',
  'Fibroid',
  'Tuberculosis',
  'Back/Neck/Joint Problem',
  'Gall Bladder Disease',
  'Alcohol Abuse',
]
const HealthConditions = [
  'Bladder Infection',
  'Stroke',
  'Leukemia',
  'Chronic Bronchitis',
  'Thrombosis',
  'Liver Conditions',
  'Congenital Heart Conditions',
  'Drug Abuse',
  'Lung Disease',
  'Cystic Fibrosis',
  'HIV Positive',
  'Malignant Cancer',
]

export const meta: MetaFunction = () => [
  {
    title: 'Onboarding - OctoMed | Your AI Health Assistant',
  },
  {
    name: 'description',
    content: 'Your AI Health Assistant',
  },
]

export async function loader({ request }: LoaderFunctionArgs) {
  if (await preventUnAuthorizedUser(request)) {
    return redirect('/')
  }

  return json({})
}

export default function HealthDetails() {
  return (
    <section className="mt-14 lg:mt-0">
      <Link
        to={'/signup'}
        className="mt-[10px] hidden text-right font-montserrat font-semibold text-[#191919] lg:block"
      >
        <p className="">Save and continue later</p>
      </Link>
      <section className="lg:relative lg:mx-auto lg:mt-[80px] lg:max-w-[700px] lg:pb-[190px]">
        <Stepper stage={2} title="02 - Health Info" />
        <h1 className="mt-[30px] font-raleway font-bold text-primary lg:text-2xl">
          Provide your health details
        </h1>
        <h3 className="mt-[20px] font-montserrat text-sm text-[#191919] lg:mt-[30px] lg:text-base">
          Share any allergies and existing health conditions you have
        </h3>

        <div className="mt-5 h-[471px] w-full overflow-scroll rounded-primary bg-[#fffaef] p-[20px]">
          <h4 className="font-montserrat font-semibold text-[#4D5061]">Allergies</h4>
          <div className="mt-4 flex flex-col gap-y-4 lg:grid lg:grid-cols-3">
            {Allergies.map((allergy) => (
              <div className="flex items-center gap-3" key={allergy}>
                <Checkbox
                  id="allergy"
                  className="border-[#D0D5DD] data-[state=checked]:bg-[#F5CB5C]"
                />
                <p className="font-montserrat text-sm text-[#353746]">{allergy}</p>
              </div>
            ))}
          </div>
          <h4 className="mt-7 font-montserrat font-semibold text-[#4D5061]">Health Conditions</h4>
          <div className="mt-4 flex flex-col gap-y-4 lg:grid lg:grid-cols-3">
            {HealthConditions.map((allergy) => (
              <div className="flex items-center gap-3" key={allergy}>
                <Checkbox
                  id="allergy"
                  className="border-[#D0D5DD] data-[state=checked]:bg-[#F5CB5C]"
                />
                <p className="font-montserrat text-sm text-[#353746]">{allergy}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bottom-0 left-0 mt-20 flex justify-between border-t pb-10 pt-9 lg:absolute lg:w-full">
          <button className="flex items-center gap-5 font-raleway text-[20px] font-bold text-[#8c8c8c]">
            <BackArrow />
            Back
          </button>

          <button className="rounded-primary bg-[#1282A2] px-[63px] py-[17px] font-raleway font-bold text-white">
            Next
          </button>
        </div>
      </section>
    </section>
  )
}
