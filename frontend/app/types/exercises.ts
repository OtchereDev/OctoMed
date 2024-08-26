export interface IInstruction {
  id: number
  title: string
  is_completed: boolean
  content: string
  minutes: number
}

export interface IExercise {
  id: number
  name: string
  user_id: number
  total_duration: number
  instructions: IInstruction[]
  photo: string
  is_completed: boolean
  calories_lost: number
}
