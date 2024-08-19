import { IUser } from '.'
import { IDoctor } from './health-provider'

export interface IAppointment {
  date: string
  appointments: [
    {
      id: number
      doctor_id: number
      doctor: IDoctor
      user_id: number
      user: IUser
      start_time: string
      end_time: string
      duration: string
      status: string
      meeting_link: string
      is_deleted: boolean
      created_at: string
      updated_at: string
    },
  ]
}
