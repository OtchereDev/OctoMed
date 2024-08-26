export interface IChatMessage {
  id: number
  role: 'system' | 'assistant' | 'user'
  content: string
  bot_chat_id: number
  created_at: string
  updated_at: string
}

export interface IChat {
  id: number
  message: IChatMessage[]
  title: string
  created_at: string
}
