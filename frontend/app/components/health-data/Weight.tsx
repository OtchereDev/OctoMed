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

const chartData = [
  { month: 'January', desktop: 186, mobile: 80 },
  { month: 'February', desktop: 305, mobile: 200 },
  { month: 'March', desktop: 237, mobile: 120 },
  { month: 'April', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'June', desktop: 214, mobile: 140 },
]

export default function Weight() {
  return (
    <div className="flex-1 items-center justify-center rounded-[20px] border px-4 py-3 lg:px-[25px] lg:py-[20px]">
      <div className="mb-4">
        <div>
          <h3 className="font-montserrat text-[11px] font-semibold text-[#191919] lg:text-base">
            Weight(KG)
          </h3>
          <div className="flex items-center gap-1">
            <div className="h-[4px] w-[4px] rounded-full bg-[#72CDCD] lg:h-[7px] lg:w-[7px]"></div>
            <p className="font-montserrat text-[8px] font-semibold text-[#7C8293] lg:text-xs">
              Avg weight
            </p>
          </div>
        </div>
      </div>
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={true} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <YAxis dataKey="desktop" axisLine={false} tickLine={false} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar barSize={'15'} dataKey="desktop" width={1} fill="#72CDCD" radius={[20, 20, 0, 0]} />
        </BarChart>
      </ChartContainer>
    </div>
  )
}
