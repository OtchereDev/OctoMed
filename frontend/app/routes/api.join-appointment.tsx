import { ActionFunctionArgs, json, redirect } from '@remix-run/node'
import http from '~/lib/http'
import { getSession } from '~/sessions'

export const action = async ({ request }: ActionFunctionArgs) => {
  const session = await getSession(request.headers.get('Cookie'))
  const accessToken = session.get('accessToken')!

  const formData = await request.formData()
  const id = formData.get('id') as string
  const { success, meeting } = await getMeetingLink(id, accessToken)

  if (success) {
    return redirect(`/health-care-providers/video/${meeting}`)
  }

  return json({})
}

async function getMeetingLink(apptId: string, token: string) {
  try {
    const req = await http.get(`/appointments/meeting-link/${apptId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const data = req.data

    return {
      success: true,
      meeting: data.data.meeting_link,
    }
  } catch (error: any) {
    return { success: false }
  }
}
