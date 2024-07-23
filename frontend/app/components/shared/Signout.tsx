import { useFetcher } from '@remix-run/react'
import { Signout } from './icons'

export default function SignoutButton() {
  const fetcher = useFetcher({ key: 'signout' })
  return (
    <fetcher.Form method="post" action="/signout">
      <button type="submit" className="flex items-center gap-3">
        <Signout />
        <p>Sign Out</p>
      </button>
    </fetcher.Form>
  )
}
