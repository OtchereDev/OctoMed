import http from '~/lib/http'
import { IChat, IChatMessage } from '~/types/bot'

export async function getAllMyChats(access: string) {
  try {
    const request = await http.get(`/bot/chats`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    })

    const response = request.data

    return {
      chats: response.data.chats as IChat[],
      status: true,
    }
  } catch (error: any) {
    return {
      status: false,
      message: error.response.data?.message,
    }
  }
}

export async function getChatDetail(access: string, id: string) {
  try {
    const request = await http.get(`/bot/chats/${id}`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    })

    const response = request.data

    return {
      chat: response.data.chat as IChat,
      status: true,
    }
  } catch (error: any) {
    return {
      status: false,
      message: error.response.data?.message,
    }
  }
}

export async function createNewChat(access: string) {
  try {
    const request = await http.post(
      `/bot/chats`,
      {},
      {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      }
    )

    const response = request.data

    return {
      chat: response.data.chat as IChat,
      status: true,
    }
  } catch (error: any) {
    return {
      status: false,
      message: error.response.data?.message,
    }
  }
}

export async function sendMessageToChat(access: string, id: string, content: string) {
  try {
    const request = await http.post(
      `/bot/chats/${id}`,
      { content },
      {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      }
    )

    const response = request.data

    return {
      message: response.data.message,
      response: response.data.response as IChatMessage, // response from the chat agent
      status: true,
    }
  } catch (error: any) {
    return {
      status: false,
      message: error.response.data?.message,
    }
  }
}
