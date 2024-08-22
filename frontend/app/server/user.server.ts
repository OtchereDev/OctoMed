import { z } from 'zod'
import {
  BioDataDTOType,
  ForgotPasswordDTO,
  HealthDetailDTOType,
  LocationDTOType,
  LoginDTO,
  ResetPasswordDTO,
  SignupDTO,
} from '~/dto/user.dto'
import http from '~/lib/http'
import { IUser } from '~/types'

export async function login(data: z.infer<typeof LoginDTO>) {
  try {
    const request = await http.post('/users/login', data)

    return {
      access_token: request.data?.data?.access_token,
      user: request.data?.data?.user_details as IUser,
      message: '',
      status: true,
    }
  } catch (error) {
    return {
      access_token: '',
      user: undefined,
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

export async function skipOnboarding(access: string) {
  try {
    const request = await http.post(
      '/users/skip-onboarding',
      {},
      {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      }
    )
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

export async function getCurrentUserDetail(access: string) {
  try {
    const request = await http.get('/users/details', {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    })
    const response = request.data

    return {
      message: response.message,
      status: true,
      user: response?.data as IUser,
    }
  } catch (error: any) {
    return {
      status: false,
      message: error.response.data?.message,
      user: undefined,
    }
  }
}

export async function bioData(data: BioDataDTOType, access: string) {
  try {
    const request = await http.post('/users/onboarding/biodata', data, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    })
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

export async function healthDetail(data: HealthDetailDTOType, access: string) {
  try {
    const request = await http.post('/users/onboarding/health-information', data, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    })
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

export async function locationDetails(data: LocationDTOType, access: string) {
  try {
    const request = await http.post('/users/onboarding/location', data, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    })
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
