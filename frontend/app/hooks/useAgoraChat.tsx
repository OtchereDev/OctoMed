import AgoraRTM from 'agora-rtm-sdk'
import { useEffect, useState } from 'react'

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
  const [messages, setMessages] = useState([])

  let rtmClient = new AgoraRTM.RTM(app_id, user_id, {
    token: token,
  })

  async function joinChannel() {
    console.log({
      app_id,
      user_id,
      token,
      channel,
    })
    try {
      await rtmClient.login()
      rtmClient.addEventListener('message', (eventArg) => {
        console.log({ eventArg })
      })
    } catch (error) {
      console.log('Channel Join Error:', error)
    }
  }

  async function sendMessage(message: string) {
    try {
      await rtmClient.login()

      await rtmClient.publish(channel, 'hello world')
    } catch (err) {
      console.log({ err }, 'error occurs at publish message')
    }
  }

  useEffect(() => {
    joinChannel()
  }, [])

  return { messages, sendMessage }
}
