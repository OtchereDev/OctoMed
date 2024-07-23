import { ActionFunctionArgs, redirect } from '@remix-run/node'
import { commitSession, getSession } from '~/sessions'

export async function action({ request }: ActionFunctionArgs) {
  const session = await getSession(request.headers.get('Cookie'))

  session.unset('accessToken')
  session.unset('email')

  return redirect('/', {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  })
}
