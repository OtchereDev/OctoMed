import { json, LoaderFunctionArgs } from '@remix-run/node'
import http from '~/lib/http'
import { QueryBuilder } from '~/lib/queryBuilder'
import { getSession } from '~/sessions'
import { IAppointment } from '~/types/appointment'
import { IDoctor } from '~/types/health-provider'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url)
  const tab = url.searchParams.get('tab') || 'providers'
  const page = url.searchParams.get('page') ? parseInt(url.searchParams.get('page') as string) : 1
  const category = url.searchParams.get('category') as string
  const search = url.searchParams.get('search') as string

  console.log(search, category)

  const session = await getSession(request.headers.get('Cookie'))
  const accessToken = session.get('accessToken')

  let data

  if (tab === 'providers') {
    data = await fetchProvidersData(page, category, search)
  } else if (tab === 'appointments') {
    data = await fetchAppointmentsData(accessToken!)
  }

  return json({ tab, data })
}

export async function fetchProvidersData(page: number, category: string, search: string) {
  const req = await http.get(`/doctors${QueryBuilder({ page, search, category })}`)
  const data = req.data

  return {
    doctors: data.data.doctors as IDoctor[],
  }
}

export async function fetchAppointmentsData(access: string) {
  const req = await http.get(`/appointments`, {
    headers: {
      Authorization: `Bearer ${access}`,
    },
  })
  const data = req.data

  return {
    appointments: data.data.appointments as IAppointment[],
  }
}

export type HealthProvidersLoader = typeof loader
