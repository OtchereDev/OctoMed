export interface IMeal {
  id: number
  name: string
  type: string
  is_completed: boolean
  calories: number
  protein: number
  carbs: number
  fats: number
  photo: string
  created_at: string
  updated_at: string
}

export interface IWateConsumption {
  id: number
  number_of_glass: number
}
