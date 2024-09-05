import AgoraRTM from 'agora-rtm-sdk'
import { useEffect, useState } from 'react'

interface IMessage {
  content: string
  sender: boolean
}

export default function useAgoraChat({
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
  const [messages, setMessages] = useState<IMessage[]>([])
  const [rtm, setRTM] = useState<any>()

  useEffect(() => {
    setRTM(
      new AgoraRTM.RTM(app_id, user_id, {
        token: token,
      })
    )
  }, [])

  useEffect(() => {
    async function joinChannel() {
      try {
        await rtm.login()
        await rtm.subscribe(channel, {
          withMessage: true,
          withPresence: true,
          withMetadata: true,
          withLock: true,
        })
        rtm.addEventListener('message', (eventArgs: any) => {
          setMessages((curr) => [...curr, { content: eventArgs.message, sender: false }])
        })
        console.log('Successfully sent')
      } catch (error) {
        console.log('Channel Join Error:', error)
      }
    }

    joinChannel()

    return () => {
      async function leaveChannel() {
        await rtm.unsubscribe(channel)
      }

      leaveChannel()
    }
  }, [rtm])

  async function sendMessage(message: string) {
    try {
      await rtm.login()
      await rtm.publish(channel, message)
      setMessages((curr) => [...curr, { sender: true, content: message }])
    } catch (err) {
      console.log({ err }, 'error occurs at publish message')
    }
  }

  return { messages, sendMessage }
}
