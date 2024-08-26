import { Send } from 'lucide-react'
import { useState } from 'react'
import useAgoraChat from '~/hooks/useAgoraChat'

export default function VideoChat({
  app_id,
  user_id,
  token,
  channel,
}: {
  app_id: string
  user_id: string
  token: string
  channel: string
}) {
  const [textArea, setTextArea] = useState('')
  const { messages, sendMessage } = useAgoraChat({
    app_id,
    user_id,
    token,
    channel,
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (textArea.trim().length === 0) return
    sendMessage(textArea)
    setTextArea('')
  }

  return (
    <div className="border-t p-6 lg:flex-1 lg:border-l lg:border-t-0">
      <div className="flex h-[503px] flex-col font-montserrat">
        <div className="flex max-h-[90%] flex-1 flex-col gap-3 overflow-scroll">
          {messages.map((message) =>
            message.sender ? (
              <div className="ml-auto max-w-[284px] rounded-[12px] rounded-br-none bg-[#F5CB5C] px-4 py-[14px] text-sm">
                <p>{message.content}</p>
              </div>
            ) : (
              <div className="max-w-[284px] rounded-[12px] rounded-bl-none bg-[#D0D5DD4D] px-4 py-[14px] text-sm">
                <p>{message.content}</p>
              </div>
            )
          )}
        </div>
        <form onSubmit={handleSubmit} className="flex gap-4 border-t pt-4">
          <input
            placeholder="Enter your message here"
            className="flex-1 rounded-[8px] border px-[14px] py-[10px] outline-none"
            value={textArea}
            onChange={(e) => setTextArea(e.target.value)}
          />
          <button className="rounded-[8px] bg-primary p-3 text-white">
            <Send />
          </button>
        </form>
      </div>
    </div>
  )
}
