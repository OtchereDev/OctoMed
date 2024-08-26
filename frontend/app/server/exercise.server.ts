import http from '~/lib/http'

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
        meals: response?.data?.exercise,
        water: waterRes?.data?.water_comsumption,
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
