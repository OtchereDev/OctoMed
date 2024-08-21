import { json } from '@remix-run/node'
import { BookAppointmentDTO, RateDTO } from '~/dto/providers.dto'
import { IError, formatZodErrors } from '~/lib/formatZodError'
import { generateStartAndEndDate } from '~/lib/generateStartAndEndDate'
import http from '~/lib/http'

export async function bookAppointment(form: FormData, userToken: string) {
  const appointmentDate = form.get('appointment-date')
  const appointmentDuration = form.get('duration')
  const appointmentStartTime = form.get('start-time')
  const doctorId = form.get('doctor-id')

  try {
    const result = BookAppointmentDTO.parse({
      appointment_date: appointmentDate,
      start_time: appointmentStartTime,
      duration: appointmentDuration,
    })

    const { end, start } = generateStartAndEndDate(
      result.appointment_date,
      result.duration,
      result.start_time
    )

    const response = await handleBookAppointment(
      {
        doctor_id: parseInt(doctorId as string),
        start_time: start?.toISOString(),
        end_time: end?.toISOString(),
        duration: result.duration,
      },
      userToken
    )

    return json({
      errors: (response.status ? [] : [{ path: 'global', message: response.message }]) as IError[],
      response: response.message,
    })
  } catch (error: any) {
    if (error.errors?.length) {
      return json({
        errors: formatZodErrors(error.errors),
        response: 'Validation Errors',
      })
    }
  }
}

export async function rateDoctor(formData: FormData, token: string, doctorId: string) {
  const comment = formData.get('comment') ?? ''
  const rate = formData.get('rate') ? parseInt(formData.get('rate') as string) : 0
  const doctor_id = parseInt(doctorId)

  try {
    const result = RateDTO.parse({
      comment,
      rate,
    })

    const response = await http.post(
      '/rating/create',
      { ...result, doctor_id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    return json({
      errors: [] as IError[],
      response: response?.data.message,
    })
  } catch (error: any) {
    if (error.errors?.length) {
      return json({
        errors: formatZodErrors(error.errors),
        response: 'Validation Errors',
      })
    }

    return json({
      errors: [
        { path: 'global', message: error?.response?.data?.message ?? 'An error occurred' },
      ] as IError[],
      response: error?.response?.data?.message ?? 'An error occurred',
    })
  }
}

export async function rescheduleAppointment(form: FormData, userToken: string) {}

export async function cancelAppointment(form: FormData, userToken: string) {}

export async function deleteAppointment(form: FormData, userToken: string) {}

const handleBookAppointment = async (data: any, token: string) => {
  try {
    const request = await http.post('/appointments/book', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const response = request.data

    return {
      message: response.data.message,
      status: true,
    }
  } catch (error: any) {
    return {
      status: false,
      message: error.response.data?.data?.message,
    }
  }
}
