import { Link, useNavigation } from '@remix-run/react'
import { BackArrow } from '../shared/icons'

export default function OnboardingFormButton({
  backLink,
  label,
}: {
  backLink: string
  label?: string
}) {
  const isSubmitting = useNavigation().state == 'submitting'
  return (
    <div className="bottom-0 left-0 mt-20 flex items-center justify-between border-t pb-10 pt-9 lg:absolute lg:w-full">
      <Link to={backLink}>
        <button
          type="button"
          disabled={backLink.length == 0 || isSubmitting}
          className="flex items-center gap-5 font-raleway text-[20px] font-bold text-black disabled:text-[#8c8c8c]"
        >
          <BackArrow />
          Back
        </button>
      </Link>

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-primary bg-[#1282A2] px-[63px] py-[17px] font-raleway font-bold text-white disabled:opacity-90"
      >
        {isSubmitting ? 'Wait...' : (label ?? 'Next')}
      </button>
    </div>
  )
}
