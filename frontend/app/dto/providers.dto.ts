import { z } from 'zod'

const RateDTO = z.object({
  comment: z.string().min(10),
  rate: z.number().min(1, 'The minimum rating is a star'),
})

const BookAppointmentDTO = z.object({
  appointment_date: z.string().datetime({ message: 'Provide a valid appointment date' }),
  start_time: z.string().min(1, { message: 'start time is required' }),
  duration: z.string().min(1, { message: 'duration is required' }),
})

export { BookAppointmentDTO, RateDTO }
