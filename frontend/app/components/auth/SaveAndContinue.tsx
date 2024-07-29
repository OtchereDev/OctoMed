import { useFetcher } from '@remix-run/react'

export default function SaveAndContinue() {
  const fetcher = useFetcher({ key: 'save-and-continue' })

  return (
    <fetcher.Form method="POST" action="/skip-onboarding" className="flex justify-end">
      <button
        type="submit"
        className="mt-[10px] hidden text-right font-montserrat font-semibold text-[#191919] lg:block"
      >
        <p className="">Save and continue later</p>
      </button>
    </fetcher.Form>
  )
}
