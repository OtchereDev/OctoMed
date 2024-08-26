import http from '~/lib/http'

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
        meals: response?.data?.mealPlan,
        water: waterRes?.data?.water_comsumption,
      },
      status: true,
    }
  } catch (error: any) {
    return {
      status: false,
      message: error.response.data?.message,
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
