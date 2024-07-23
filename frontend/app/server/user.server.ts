import { z } from 'zod'
import { ForgotPasswordDTO, LoginDTO, ResetPasswordDTO, SignupDTO } from '~/dto/user.dto'
import http from '~/lib/http'

export async function login(data: z.infer<typeof LoginDTO>) {
  try {
    const request = await http.post('/users/login', data)

    return {
      access_token: request.data?.data?.access_token,
      user: '',
      message: '',
      status: true,
    }
  } catch (error) {
    return {
      access_token: '',
      user: '',
      status: false,
      message: 'Invalid Credentials',
    }
  }
}

export async function signup(data: z.infer<typeof SignupDTO>) {
  try {
    const request = await http.post('/users/create', data)
    const response = request.data

    return {
      message: response.message,
      status: true,
    }
  } catch (error: any) {
    return {
      status: false,
      message: error.response.data?.message,
    }
  }
}

export async function requestForgotPassword(data: z.infer<typeof ForgotPasswordDTO>) {
  try {
    const request = await http.post('/users/request-forgot-password', data)
    const response = request.data

    return {
      message: response.message,
      status: true,
    }
  } catch (error: any) {
    return {
      status: true,
      message: error.response.data?.message,
    }
  }
}

export async function requestPassword(data: z.infer<typeof ResetPasswordDTO>) {
  try {
    const request = await http.post('/users/reset-password', data)
    const response = request.data

    return {
      message: response.message,
      status: true,
    }
  } catch (error: any) {
    return {
      status: false,
      message: error.response.data?.message,
    }
  }
}
