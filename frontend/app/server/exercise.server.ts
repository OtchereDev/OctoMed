import { json } from '@remix-run/node'
import { IError } from '~/lib/formatZodError'
import http from '~/lib/http'
import { IWateConsumption } from '~/types/diet'
import { IExercise } from '~/types/exercises'

export async function getExerciseDashboard(date: string, access: string) {
  try {
    const request = await http.get(`/fitness/my-exercise?date=${date}`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    })

    const waterReq = await http.get('/fitness/water-consumption', {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    })

    const response = request.data
    const waterRes = waterReq.data

    return {
      data: {
        exercises: response?.data?.exercises[0].exercise as IExercise[],
        water: waterRes?.data?.water_comsumption as IWateConsumption,
      },
      status: true,
    }
  } catch (error: any) {
    console.log('req err:', error)
    return {
      status: false,
      message: error.response.data?.message,
    }
  }
}

export async function toggleExerciseCompletion(access: string, id: string) {
  try {
    const request = await http.post(
      `/fitness/my-exercise/${id}/toggle`,
      {},
      {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      }
    )

    const response = request.data

    return {
      message: response.data.message,
      status: true,
    }
  } catch (error: any) {
    return {
      status: false,
      message: error.response.data?.message,
    }
  }
}

export async function toggleExerciseInstructionCompletion(access: string, id: string) {
  try {
    const request = await http.post(
      `/fitness/my-exercise/${id}/toggle-instruction`,
      {},
      {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      }
    )

    const response = request.data

    return {
      message: response.data.message,
      status: true,
    }
  } catch (error: any) {
    return {
      status: false,
      message: error.response.data?.message,
    }
  }
}

export async function ToggleExerciseCompletion(form: FormData, userToken: string) {
  const id = (form.get('id') as string) ?? ''

  const response = await toggleExerciseCompletion(userToken, id)
  console.log(response)

  return json({
    errors: (response.status ? [] : [{ path: 'global', message: response.message }]) as IError[],
    response: response.message,
  })
}

export async function ToggleExerciseInstructionCompletion(form: FormData, userToken: string) {
  const id = (form.get('id') as string) ?? ''

  const response = await toggleExerciseInstructionCompletion(userToken, id)

  return json({
    errors: (response.status ? [] : [{ path: 'global', message: response.message }]) as IError[],
    response: response.message,
  })
}
