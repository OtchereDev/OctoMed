import { ActionFunctionArgs, json, LoaderFunctionArgs } from '@remix-run/node'
import {
  Form,
  useActionData,
  useLoaderData,
  useNavigation,
  useSearchParams,
} from '@remix-run/react'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import { Send } from 'lucide-react'
import { useEffect, useRef } from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Octavia from '~/assets/images/octavia.png'
import EllipseLoader from '~/components/shared/EllipseLoader'
import {
  createNewChat,
  getAllMyChats,
  getChatDetail,
  sendMessageToChat,
} from '~/server/chat.server'
import { getSession } from '~/sessions'
import { IChat } from '~/types/bot'

dayjs.extend(advancedFormat)

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get('Cookie'))
  const accessToken = session.get('accessToken')!
  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)
  const chatId = searchParams.get('chatId') ?? ''

  let chats: IChat[] = []
  let chat: IChat | null = null

  const chatsRes = await getAllMyChats(accessToken)

  if (chatsRes.status) {
    chats = chatsRes.chats!
  }

  if (chatId.length) {
    const chatRes = await getChatDetail(accessToken, chatId)

    if (chatRes.status) {
      chat = chatRes.chat!
    }
  }

  return json({
    chats,
    chat,
  })
}

export async function action({ request }: ActionFunctionArgs) {
  const session = await getSession(request.headers.get('Cookie'))
  const accessToken = session.get('accessToken')!
  // const url = new URL(request.url)
  // const searchParams = new URLSearchParams(url.search)

  const form = await request.formData()
  const message = (form.get('question') as string) || ''
  let chatId = (form.get('chatId') as string) || ''

  if (message == '') {
    return json({
      success: false,
      error: 'Message cannot be empty',
      chatId,
    })
  }

  if (chatId == '') {
    const res = await createNewChat(accessToken)
    if (!res.status || !res.chat) {
      return json({
        success: false,
        error: res.message,
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
      chatId,
    })
  }

  return json({
    success: false,
    error: chat.message,
    chatId,
  })
}

export default function Chat() {
  const [searchParams, setSearchParam] = useSearchParams()
  const chatId = searchParams.get('chatId')
  const loading = useNavigation().state == 'submitting'

  const form = useRef<HTMLFormElement>(null)
  const chatBoxDix = useRef<HTMLDivElement>(null)

  const data = useLoaderData<typeof loader>()
  const actionData = useActionData<typeof action>()

  const scrollToBottom = () => {
    if (chatBoxDix.current) {
      chatBoxDix.current.scrollTop = chatBoxDix.current.scrollHeight
    }
  }

  useEffect(() => {
    scrollToBottom()
    if (actionData?.success) {
      setSearchParam({ chatId: actionData.chatId })
      form?.current?.reset()
    }
  }, [actionData])

  useEffect(() => {
    scrollToBottom()
  }, [data])

  return (
    <div className="flex h-full flex-col py-5 font-montserrat">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-[45px] w-[45px] rounded-full border-4 border-primary bg-[#fdfefe]">
            <img src={Octavia} />
          </div>
          <p className="text-lg font-medium">Octavia</p>
        </div>

        <p className="text-lg font-medium">{dayjs().format('Do MMMM | HH:MM a')}</p>
      </div>
      <div className="mt-4 flex flex-1 gap-5 overflow-hidden">
        <div className="flex w-[70%] flex-col gap-2">
          <div ref={chatBoxDix} className="relative flex-1 overflow-scroll pb-4">
            <div className="flex flex-col gap-2 font-montserrat">
              {data?.chat?.message.slice(1).map((message) =>
                message.role == 'user' ? (
                  <div
                    key={message.id}
                    className="ml-auto max-w-[450px] rounded-[12px] rounded-br-none bg-[#F5CB5C] px-4 py-[14px] text-sm"
                  >
                    <p>{message.content}</p>
                  </div>
                ) : (
                  <div
                    key={message.id}
                    className="max-w-[450px] rounded-[12px] rounded-bl-none bg-[#D0D5DD4D] px-4 py-[14px] text-sm"
                  >
                    <Markdown remarkPlugins={[remarkGfm]}>{message.content}</Markdown>
                  </div>
                )
              )}
            </div>

            {loading && (
              <div className="absolute bottom-0 left-3">
                <EllipseLoader />
              </div>
            )}
          </div>

          <Form ref={form} method="POST" className="flex gap-2">
            <input name="chatId" value={chatId!} className="hidden" />
            <input name="question" className="flex-1 rounded-lg border px-3 outline-none" />
            <button className="flex items-center rounded-lg bg-primary px-3 py-3 text-white">
              <Send size={20} />
            </button>
          </Form>
        </div>
        <div className="flex w-[30%] flex-col rounded-2xl bg-[#F1F2F580] p-4">
          <div className="border-b py-3">
            <p className="font-semibold">Previous Chats</p>
          </div>
          <div className="mt-4 flex flex-col gap-2 overflow-scroll">
            {data?.chats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => setSearchParam({ chatId: chat.id?.toString() })}
                className={`cursor-pointer rounded-xl p-3 ${chat.id?.toString() == chatId ? 'bg-[#D0D5DD4D]' : ''}`}
              >
                <p className="text-sm font-semibold">{chat.title}</p>
                <p className="mt-4 text-xs text-[#667085]">
                  {dayjs(chat.created_at).format('MMMM D, HH:MM a')}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
