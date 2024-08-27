import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'
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

const hrData = [{ time: '06:00 AM', rate: 120 }]

export default function HeartRate() {
  return (
    <div className="flex-1 items-center justify-center rounded-[20px] border px-4 py-3 lg:px-[25px] lg:py-[20px]">
      <div className="mb-4">
        <div>
          <h3 className="font-montserrat text-[11px] font-semibold text-[#191919] lg:text-base">
            Heart Rate(bph)
          </h3>
          <div className="flex items-center gap-1">
            <div className="h-[4px] w-[4px] rounded-full bg-[#289BFF] lg:h-[7px] lg:w-[7px]"></div>
            <p className="font-montserrat text-[8px] font-semibold text-[#7C8293] lg:text-xs">
              Heart Rate
            </p>
          </div>
        </div>
      </div>
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <BarChart layout="vertical" accessibilityLayer data={hrData}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="time" />
          <YAxis dataKey="rate" />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="rate" fill="var(--color-mobile)" radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  )
}
