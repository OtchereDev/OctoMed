import { ActionFunctionArgs, json } from '@remix-run/node'
import { createNewChat, sendMessageToChat } from '~/server/chat.server'
import { getSession } from '~/sessions'

export async function action({ request }: ActionFunctionArgs) {
  const session = await getSession(request.headers.get('Cookie'))
  const accessToken = session.get('accessToken')!
  const form = await request.formData()
  const message = (form.get('question') as string) || ''
  let chatId = (form.get('chatId') as string) || ''

  if (message == '') {
    return json({
      success: false,
      error: 'Message cannot be empty',
      message: null,
      chatId,
    })
  }

  if (chatId == '') {
    const res = await createNewChat(accessToken)
    if (!res.status || !res.chat) {
      return json({
        success: false,
        error: res.message,
        message: null,
        chatId,
      })
    }

    chatId = res.chat.id.toString()
  }

  const chat = await sendMessageToChat(accessToken, chatId, message)

  if (chat.status) {
    return json({
      success: true,
      error: '',
      message: chat.response,
      chatId,
    })
  }

  return json({
    success: false,
    error: chat.message,
    message: null,
    chatId,
  })
}
