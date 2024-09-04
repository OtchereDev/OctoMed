export interface IUser {
  id: number
  full_name: string
  email: string
  phone_number: string
  dob: string
  avatar: string
  biodata_setup: boolean
  healthdata_setup: boolean
  location_setup: boolean
  skip_onboarding: boolean
  emergency_contact: null
  emergency_contact_id: null
  biodata: null
  biodata_id: number
  address: null
  address_id: null
  last_login: string
  is_deleted: boolean
  created_at: string
  updated_at: string
  streak: {
    end_date: string | null
    start_date: string
  }
}
