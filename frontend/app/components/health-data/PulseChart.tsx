import { useLoaderData } from '@remix-run/react'
import dayjs from 'dayjs'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import { loader } from '~/routes/_dashboard.health-data'
import { IHealthData } from '~/types/health-data'
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '../ui/chart'

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: '#2563eb',
  },
  mobile: {
    label: 'Mobile',
    color: '#60a5fa',
  },
} satisfies ChartConfig

export default function PulseChart() {
  const data = useLoaderData<typeof loader>()
  const metrics = (data as any)?.response?.find((res: any) => res.metric == 'pulse')
    ?.data as IHealthData[]

  const chartData = metrics.map((metric) => ({
    month: dayjs(metric.created_at).format('DD MMM, 2024'),
    pulse: metric.reading,
  }))

  return (
    <div className="flex-[1.16] items-center justify-center rounded-[20px] border px-4 py-3 lg:px-[25px] lg:py-[20px]">
      <div className="mb-4">
        <div>
          <h3 className="font-montserrat text-[11px] font-semibold text-[#191919] lg:text-base">
            Pulse(bpm)
          </h3>
          <div className="flex items-center gap-1">
            <div className="h-[4px] w-[4px] rounded-full bg-[#FF4B55] lg:h-[7px] lg:w-[7px]"></div>
            <p className="font-montserrat text-[8px] font-semibold text-[#7C8293] lg:text-xs">
              Avg Pulse
            </p>
          </div>
        </div>
      </div>
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <BarChart height={100} accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
          <YAxis dataKey="pulse" />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar barSize={'15'} dataKey="pulse" fill="var(--color-desktop)" radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  )
}
