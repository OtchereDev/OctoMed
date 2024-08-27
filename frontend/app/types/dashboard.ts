import { IAppointment } from './appointment'
import { IMeal } from './diet'
import { IExercise } from './exercises'
import { IHealthData } from './health-data'
import { IResource } from './library'

export interface IDashboard {
  appointment: IAppointment['appointments'][0]
  exercises: [
    {
      date: string
      exercise: IExercise[]
    },
  ]
  meals: [
    {
      date: string
      meals: IMeal[]
    },
  ]
  metrics: {
    blood_glucose: IHealthData
    blood_pressure: IHealthData
    height: IHealthData
    pulse: IHealthData
    sleep: IHealthData
    weight: IHealthData
  }
  resource: IResource
}
