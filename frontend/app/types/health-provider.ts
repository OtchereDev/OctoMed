import { IUser } from '.'

export interface IDoctor {
  id: number
  name: string
  title: string
  specialty: string
  hospital: string
  about: string
  email: string
  profile: string
  experiences: IExperience[]
  educations: IEducation[]
  ratings: IRating[]
  created_at: string
  updated_at: string
}

export interface IExperience {
  id: number
  company: string
  logo: string
  position: string
  start_year: string
  end_year: string
  current_position: false
  doctor_id: number
  created_at: string
  updated_at: string
  country: string
}

export interface IEducation {
  id: number
  school: string
  course: string
  logo: string
  start_year: string
  end_year: string
  current_education: true
  doctor_id: number
  created_at: string
  updated_at: string
  country: string
}

export interface IRating {
  id: number
  comment: string
  rate: number
  user_id: number
  user: IUser
  doctor_id: number
  created_at: string
  updated_at: string
}
