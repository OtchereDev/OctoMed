import { ActionFunctionArgs, json, redirect } from '@remix-run/node'
import { skipOnboarding } from '~/server/user.server'
import { getSession } from '~/sessions'

export async function action({ request }: ActionFunctionArgs) {
  const session = await getSession(request.headers.get('Cookie'))
  const accessToken = session.get('accessToken')

  const response = await skipOnboarding(accessToken as string)

  if (response.status) {
    return redirect('/')
  } else {
    return json({})
  }
}
