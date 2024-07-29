import http from '~/lib/http'
import { IAllergy, IHealthCondition } from '~/types/health-condition'

export async function getHealthConditions() {
  try {
    const request = await http.get('/health-conditions')
    const response = request.data

    return {
      message: response.message,
      status: true,
      allergies: response?.data?.allergies as IAllergy[],
      health_conditions: response?.data?.health_conditions as IHealthCondition[],
    }
  } catch (error: any) {
    return {
      status: false,
      message: error.response.data?.message,
      allergies: [] as IAllergy[],
      health_conditions: [] as IHealthCondition[],
    }
  }
}
