import { json } from '@remix-run/node'
import { IError } from '~/lib/formatZodError'
import http from '~/lib/http'
import { IMeal, IWateConsumption } from '~/types/diet'

export async function getDietDashboard(date: string, access: string) {
  try {
    const request = await http.get(`/fitness/my-meal?date=${date}`, {
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
        meals: response?.data?.mealPlan[0].meals as IMeal[],
        water: waterRes?.data?.water_comsumption as IWateConsumption,
      },
      status: true,
    }
  } catch (error: any) {
    console.log(error?.response?.data?.data?.message)
    return {
      status: false,
      message: error?.response?.data?.data?.message,
    }
  }
}

export async function increamentWaterComsume(date: string, access: string) {
  try {
    const request = await http.post(
      `/fitness/water-consumption/increment?date=${date}`,
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

export async function toggleMealCompletion(access: string, id: string) {
  try {
    const request = await http.post(
      `/fitness/my-meal/${id}/toggle`,
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

export async function ToggleMealCompletion(form: FormData, userToken: string) {
  const id = (form.get('id') as string) ?? ''

  const response = await toggleMealCompletion(userToken, id)

  return json({
    errors: (response.status ? [] : [{ path: 'global', message: response.message }]) as IError[],
    response: response.message,
  })
}
