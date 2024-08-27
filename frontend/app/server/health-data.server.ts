import { json } from '@remix-run/node'
import axios from 'axios'
import { IError } from '~/lib/formatZodError'
import http from '~/lib/http'
import { IHealthData } from '~/types/health-data'

const handleCreatePulse = async (reading: number, token: string) => {
  try {
    const request = await http.post(
      `/metrics/pulse`,
      { reading },
      {
        headers: {
          Authorization: `Bearer ${token}`,
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

const handleCreateBloodPressure = async (systolic: number, diastolic: number, token: string) => {
  try {
    const request = await http.post(
      `/metrics/bloodpressure`,
      { systolic, diastolic },
      {
        headers: {
          Authorization: `Bearer ${token}`,
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

const handleCreateBloodGlucose = async (reading: number, token: string) => {
  try {
    const request = await http.post(
      `/metrics/bloodglucose`,
      { reading },
      {
        headers: {
          Authorization: `Bearer ${token}`,
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

const handleCreateWeight = async (reading: number, token: string) => {
  try {
    const request = await http.post(
      `/metrics/weight`,
      { reading },
      {
        headers: {
          Authorization: `Bearer ${token}`,
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

const handleCreateHeight = async (reading: number, token: string) => {
  try {
    const request = await http.post(
      `/metrics/height`,
      { reading },
      {
        headers: {
          Authorization: `Bearer ${token}`,
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

const handleCreateSleep = async (reading: number, token: string) => {
  try {
    const request = await http.post(
      `/metrics/sleeppattern`,
      { reading },
      {
        headers: {
          Authorization: `Bearer ${token}`,
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

const handleEditPulse = async (reading: number, id: string, token: string) => {
  try {
    const request = await http.put(
      `/metrics/pulse/${id}`,
      { reading },
      {
        headers: {
          Authorization: `Bearer ${token}`,
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

const handleEditBloodPressure = async (
  systolic: number,
  diastolic: number,
  id: string,
  token: string
) => {
  try {
    const request = await http.put(
      `/metrics/bloodpressure/${id}`,
      { systolic, diastolic },
      {
        headers: {
          Authorization: `Bearer ${token}`,
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

const handleEditBloodGlucose = async (reading: number, id: string, token: string) => {
  try {
    const request = await http.put(
      `/metrics/bloodglucose/${id}`,
      { reading },
      {
        headers: {
          Authorization: `Bearer ${token}`,
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

const handleEditWeight = async (reading: number, id: string, token: string) => {
  try {
    const request = await http.put(
      `/metrics/weight/${id}`,
      { reading },
      {
        headers: {
          Authorization: `Bearer ${token}`,
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

const handleEditHeight = async (reading: number, id: string, token: string) => {
  try {
    const request = await http.put(
      `/metrics/height/${id}`,
      { reading },
      {
        headers: {
          Authorization: `Bearer ${token}`,
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

const handleEditSleep = async (reading: number, id: string, token: string) => {
  try {
    const request = await http.put(
      `/metrics/sleeppattern/${id}`,
      { reading },
      {
        headers: {
          Authorization: `Bearer ${token}`,
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

const handleDeletePulse = async (id: string, token: string) => {
  try {
    const request = await http.delete(`/metrics/pulse/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
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

const handleDeleteBloodPressure = async (id: string, token: string) => {
  try {
    const request = await http.delete(`/metrics/bloodpressure/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
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

const handleDeleteBloodGlucose = async (id: string, token: string) => {
  try {
    const request = await http.delete(
      `/metrics/bloodglucose/${id}`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
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

const handleDeleteWeight = async (id: string, token: string) => {
  try {
    const request = await http.delete(`/metrics/weight/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
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

const handleDeleteHeight = async (id: string, token: string) => {
  try {
    const request = await http.delete(
      `/metrics/height/${id}`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
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

const handleDeleteSleep = async (id: string, token: string) => {
  try {
    const request = await http.delete(`/metrics/sleeppattern/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
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

export const fetchMetrics = async (token: string) => {
  try {
    const allReq: any = []

    const allMetrics = [
      'bloodpressure',
      'pulse',
      'bloodglucose',
      'sleeppattern',
      'weight',
      'height',
    ] as const

    allMetrics.forEach((metric) => {
      allReq.push(
        http.get(`/metrics/${metric}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      )
    })

    const response: any[] = await axios.all(allReq)
    const formattedResp: {
      metric: 'bloodpressure' | 'pulse' | 'bloodglucose' | 'sleeppattern' | 'weight' | 'height'
      data: IHealthData[]
    }[] = []

    for (let i = 0; i < allMetrics.length; i++) {
      const result = response[i].data?.data

      const metrics = {
        metric: allMetrics[i],
        data: result as IHealthData[],
      }
      formattedResp.push(metrics)
    }

    return {
      response: formattedResp,
      status: true,
    }
  } catch (error: any) {
    return {
      status: false,
      message: error.response.data?.message,
    }
  }
}

export async function createPulse(form: FormData, userToken: string) {
  const reading = (form.get('reading') as string) ?? ''

  if (isNaN(parseInt(reading))) {
    return json({
      errors: [{ path: 'global', message: 'Reading is required' }] as IError[],
      response: 'Reading is required',
    })
  }

  const response = await handleCreatePulse(parseInt(reading), userToken)

  return json({
    errors: (response.status ? [] : [{ path: 'global', message: response.message }]) as IError[],
    response: response.message,
  })
}

export async function createWeight(form: FormData, userToken: string) {
  const reading = (form.get('reading') as string) ?? ''

  if (isNaN(parseInt(reading))) {
    return json({
      errors: [{ path: 'global', message: 'Reading is required' }] as IError[],
      response: 'Reading is required',
    })
  }

  const response = await handleCreateWeight(parseInt(reading), userToken)

  return json({
    errors: (response.status ? [] : [{ path: 'global', message: response.message }]) as IError[],
    response: response.message,
  })
}

export async function createHeight(form: FormData, userToken: string) {
  const reading = (form.get('reading') as string) ?? ''

  if (isNaN(parseInt(reading))) {
    return json({
      errors: [{ path: 'global', message: 'Reading is required' }] as IError[],
      response: 'Reading is required',
    })
  }

  const response = await handleCreateHeight(parseInt(reading), userToken)

  return json({
    errors: (response.status ? [] : [{ path: 'global', message: response.message }]) as IError[],
    response: response.message,
  })
}

export async function createBloodGlucose(form: FormData, userToken: string) {
  const reading = (form.get('reading') as string) ?? ''

  if (isNaN(parseInt(reading))) {
    return json({
      errors: [{ path: 'global', message: 'Reading is required' }] as IError[],
      response: 'Reading is required',
    })
  }

  const response = await handleCreateBloodGlucose(parseInt(reading), userToken)

  return json({
    errors: (response.status ? [] : [{ path: 'global', message: response.message }]) as IError[],
    response: response.message,
  })
}

export async function createSleepPattern(form: FormData, userToken: string) {
  const reading = (form.get('reading') as string) ?? ''

  if (isNaN(parseInt(reading))) {
    return json({
      errors: [{ path: 'global', message: 'Reading is required' }] as IError[],
      response: 'Reading is required',
    })
  }

  const response = await handleCreateSleep(parseInt(reading), userToken)

  return json({
    errors: (response.status ? [] : [{ path: 'global', message: response.message }]) as IError[],
    response: response.message,
  })
}

export async function createBloodPressure(form: FormData, userToken: string) {
  const systolic = (form.get('systolic') as string) ?? ''
  const diastolic = (form.get('diastolic') as string) ?? ''

  if (isNaN(parseInt(systolic)) || isNaN(parseInt(diastolic))) {
    return json({
      errors: [{ path: 'global', message: 'Both systolic and diastolic are required' }] as IError[],
      response: 'Reading is required',
    })
  }

  const response = await handleCreateBloodPressure(
    parseInt(systolic),
    parseInt(diastolic),
    userToken
  )

  return json({
    errors: (response.status ? [] : [{ path: 'global', message: response.message }]) as IError[],
    response: response.message,
  })
}

export async function deletePulse(form: FormData, userToken: string) {
  const reading = (form.get('id') as string) ?? ''

  if (isNaN(parseInt(reading))) {
    return json({
      errors: [{ path: 'global', message: 'Param id is required' }] as IError[],
      response: 'Param id is required',
    })
  }

  const response = await handleDeletePulse(reading, userToken)

  return json({
    errors: (response.status ? [] : [{ path: 'global', message: response.message }]) as IError[],
    response: response.message,
  })
}

export async function deleteWeight(form: FormData, userToken: string) {
  const reading = (form.get('id') as string) ?? ''

  if (isNaN(parseInt(reading))) {
    return json({
      errors: [{ path: 'global', message: 'Param id is required' }] as IError[],
      response: 'Param id is required',
    })
  }

  const response = await handleDeleteWeight(reading, userToken)

  return json({
    errors: (response.status ? [] : [{ path: 'global', message: response.message }]) as IError[],
    response: response.message,
  })
}

export async function deleteHeight(form: FormData, userToken: string) {
  const reading = (form.get('id') as string) ?? ''

  if (isNaN(parseInt(reading))) {
    return json({
      errors: [{ path: 'global', message: 'Param id is required' }] as IError[],
      response: 'Param id is required',
    })
  }

  const response = await handleDeleteHeight(reading, userToken)

  return json({
    errors: (response.status ? [] : [{ path: 'global', message: response.message }]) as IError[],
    response: response.message,
  })
}

export async function deleteBloodPressure(form: FormData, userToken: string) {
  const reading = (form.get('id') as string) ?? ''

  if (isNaN(parseInt(reading))) {
    return json({
      errors: [{ path: 'global', message: 'Param id is required' }] as IError[],
      response: 'Param id is required',
    })
  }

  const response = await handleDeleteBloodPressure(reading, userToken)

  return json({
    errors: (response.status ? [] : [{ path: 'global', message: response.message }]) as IError[],
    response: response.message,
  })
}

export async function deleteBloodGlucose(form: FormData, userToken: string) {
  const reading = (form.get('id') as string) ?? ''

  if (isNaN(parseInt(reading))) {
    return json({
      errors: [{ path: 'global', message: 'Param id is required' }] as IError[],
      response: 'Param id is required',
    })
  }

  const response = await handleDeleteBloodGlucose(reading, userToken)

  return json({
    errors: (response.status ? [] : [{ path: 'global', message: response.message }]) as IError[],
    response: response.message,
  })
}

export async function deleteSleep(form: FormData, userToken: string) {
  const reading = (form.get('id') as string) ?? ''

  if (isNaN(parseInt(reading))) {
    return json({
      errors: [{ path: 'global', message: 'Param id is required' }] as IError[],
      response: 'Param id is required',
    })
  }

  const response = await handleDeleteSleep(reading, userToken)

  return json({
    errors: (response.status ? [] : [{ path: 'global', message: response.message }]) as IError[],
    response: response.message,
  })
}

export async function updateWeight(form: FormData, userToken: string) {
  const reading = (form.get('reading') as string) ?? ''
  const id = (form.get('id') as string) ?? ''

  if (isNaN(parseInt(id))) {
    return json({
      errors: [{ path: 'global', message: 'Param Id is required' }] as IError[],
      response: 'Param Id is required',
    })
  }

  if (isNaN(parseInt(reading))) {
    return json({
      errors: [{ path: 'global', message: 'Reading is required' }] as IError[],
      response: 'Reading is required',
    })
  }

  const response = await handleEditWeight(parseInt(reading), id, userToken)

  return json({
    errors: (response.status ? [] : [{ path: 'global', message: response.message }]) as IError[],
    response: response.message,
  })
}

export async function updateHeight(form: FormData, userToken: string) {
  const reading = (form.get('reading') as string) ?? ''
  const id = (form.get('id') as string) ?? ''

  if (isNaN(parseInt(id))) {
    return json({
      errors: [{ path: 'global', message: 'Param Id is required' }] as IError[],
      response: 'Param Id is required',
    })
  }

  if (isNaN(parseInt(reading))) {
    return json({
      errors: [{ path: 'global', message: 'Reading is required' }] as IError[],
      response: 'Reading is required',
    })
  }

  const response = await handleEditHeight(parseInt(reading), id, userToken)

  return json({
    errors: (response.status ? [] : [{ path: 'global', message: response.message }]) as IError[],
    response: response.message,
  })
}

export async function updatePluse(form: FormData, userToken: string) {
  const reading = (form.get('reading') as string) ?? ''
  const id = (form.get('id') as string) ?? ''

  if (isNaN(parseInt(id))) {
    return json({
      errors: [{ path: 'global', message: 'Param Id is required' }] as IError[],
      response: 'Param Id is required',
    })
  }

  if (isNaN(parseInt(reading))) {
    return json({
      errors: [{ path: 'global', message: 'Reading is required' }] as IError[],
      response: 'Reading is required',
    })
  }

  const response = await handleEditPulse(parseInt(reading), id, userToken)

  return json({
    errors: (response.status ? [] : [{ path: 'global', message: response.message }]) as IError[],
    response: response.message,
  })
}

export async function updateBloodGlucose(form: FormData, userToken: string) {
  const reading = (form.get('reading') as string) ?? ''
  const id = (form.get('id') as string) ?? ''

  if (isNaN(parseInt(id))) {
    return json({
      errors: [{ path: 'global', message: 'Param Id is required' }] as IError[],
      response: 'Param Id is required',
    })
  }

  if (isNaN(parseInt(reading))) {
    return json({
      errors: [{ path: 'global', message: 'Reading is required' }] as IError[],
      response: 'Reading is required',
    })
  }

  const response = await handleEditBloodGlucose(parseInt(reading), id, userToken)

  return json({
    errors: (response.status ? [] : [{ path: 'global', message: response.message }]) as IError[],
    response: response.message,
  })
}

export async function updateSleep(form: FormData, userToken: string) {
  const reading = (form.get('reading') as string) ?? ''
  const id = (form.get('id') as string) ?? ''

  if (isNaN(parseInt(id))) {
    return json({
      errors: [{ path: 'global', message: 'Param Id is required' }] as IError[],
      response: 'Param Id is required',
    })
  }

  if (isNaN(parseInt(reading))) {
    return json({
      errors: [{ path: 'global', message: 'Reading is required' }] as IError[],
      response: 'Reading is required',
    })
  }

  const response = await handleEditSleep(parseInt(reading), id, userToken)

  return json({
    errors: (response.status ? [] : [{ path: 'global', message: response.message }]) as IError[],
    response: response.message,
  })
}

export async function updateBloodPressure(form: FormData, userToken: string) {
  const id = (form.get('id') as string) ?? ''

  const systolic = (form.get('systolic') as string) ?? ''
  const diastolic = (form.get('diastolic') as string) ?? ''

  if (isNaN(parseInt(systolic)) || isNaN(parseInt(diastolic))) {
    return json({
      errors: [{ path: 'global', message: 'Both systolic and diastolic are required' }] as IError[],
      response: 'Reading is required',
    })
  }

  if (isNaN(parseInt(id))) {
    return json({
      errors: [{ path: 'global', message: 'Param Id is required' }] as IError[],
      response: 'Param Id is required',
    })
  }

  const response = await handleEditBloodPressure(
    parseInt(systolic),
    parseInt(diastolic),
    id,
    userToken
  )

  return json({
    errors: (response.status ? [] : [{ path: 'global', message: response.message }]) as IError[],
    response: response.message,
  })
}
