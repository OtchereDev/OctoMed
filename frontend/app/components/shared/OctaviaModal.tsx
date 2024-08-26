import { Link, useFetcher, useLoaderData } from '@remix-run/react'
import { Expand, Send } from 'lucide-react'
import { useEffect, useState } from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Octavia from '~/assets/images/octavia.png'
import Bg from '~/assets/octavia-bg.png'
import { loader } from '~/routes/_dashboard'
import { action } from '~/routes/octavia'
import { IChatMessage } from '~/types/bot'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { toast } from '../ui/use-toast'
import EllipseLoader from './EllipseLoader'

export default function OctaviaModal({ children }: { children: React.ReactNode }) {
  const fetcher = useFetcher<typeof action>({ key: 'octavia' })
  const [message, setMessage] = useState('')

  const data = useLoaderData<typeof loader>()

  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<IChatMessage[]>([])
  const [chatId, setChatId] = useState('')

  useEffect(() => {
    if (fetcher.state == 'idle' && fetcher.data) {
      const response = fetcher.data
      console.log({ response, message })
      if (fetcher.data.success && response.message) {
        setMessages((curr) => [
          ...curr,
          {
            role: 'user',
            bot_chat_id: 0,
            content: message,
            created_at: '',
            updated_at: '',
            id: messages.length + 1,
          },
          response.message!,
        ])

        setChatId(response.chatId)

        setMessage('')
      } else {
        toast({ title: 'Chat Error', description: response.error })
      }
    }
  }, [fetcher])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="!bottom-0 !mb-auto mt-10 flex !h-[90%] !w-full flex-col gap-0 overflow-hidden !rounded-t-[20px] border-0 p-0 lg:ml-[35%] lg:mt-3 lg:!h-[589px] lg:!w-[415px] lg:rounded-[20px]">
        <DialogHeader className="relative h-[144px] p-4 text-left">
          <img src={Bg} className="absolute left-0 top-0 h-full w-full object-cover" />
          <div className="relative flex items-center justify-between pt-3">
            <DialogTitle className="font-montserrat text-2xl font-semibold capitalize text-white">
              Hi {data.firstName} 👋
            </DialogTitle>
            <Link to="/chat">
              <button onClick={() => setOpen(false)} className="mt-4 text-white">
                <Expand />
              </button>
            </Link>
          </div>
          <p className="relative pt-2 font-montserrat font-medium text-white">I’m here to help</p>
        </DialogHeader>
        <DialogDescription className="flex h-full flex-1 flex-col overflow-hidden bg-[#f7f8f9]">
          <div className="relative h-[82%] max-h-[82%] flex-1 overflow-scroll p-4">
            <div className="relative -mt-10 mb-4 lg:mt-0">
              <div className="h-[45px] w-[45px] rounded-full border-4 border-primary bg-[#fdfefe]">
                <img src={Octavia} />
              </div>
              <p className="mt-2 font-montserrat text-[#4B5768]">
                I’m Octavia, your <span className="font-bold">Octomed Chat Companion</span> What can
                I help you with today?
              </p>
            </div>
            <div className="flex flex-col gap-2 font-montserrat">
              {messages.map((message) =>
                message.role == 'user' ? (
                  <div
                    key={message.id}
                    className="ml-auto max-w-[284px] rounded-[12px] rounded-br-none bg-[#F5CB5C] px-4 py-[14px] text-sm"
                  >
                    <p>{message.content}</p>
                  </div>
                ) : (
                  <div
                    key={message.id}
                    className="max-w-[284px] rounded-[12px] rounded-bl-none bg-[#D0D5DD4D] px-4 py-[14px] text-sm"
                  >
                    <Markdown remarkPlugins={[remarkGfm]}>{message.content}</Markdown>
                  </div>
                )
              )}
            </div>
            {fetcher.state == 'submitting' && (
              <div className="absolute bottom-0 left-3">
                <EllipseLoader />
              </div>
            )}
          </div>
          <fetcher.Form
            method="POST"
            action="/octavia"
            className="flex items-center gap-2 border-t bg-white px-4 py-4"
          >
            <input name="chatId" value={chatId} className="hidden" />
            <input
              placeholder="Ask a question"
              name="question"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 border-r py-2 pr-4 font-montserrat text-lg text-black outline-none"
            />
            <button disabled={fetcher.state == 'submitting'} className="px-2 text-primary">
              <Send />
            </button>
          </fetcher.Form>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}
