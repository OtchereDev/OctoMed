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

const sleepData = [
  {
    day: 'Mon',
    sleep: [-1, 10],
  },
  {
    day: 'Tue',
    sleep: [2, 15],
  },
  {
    day: 'Wed',
    sleep: [3, 12],
  },
  {
    day: 'Thu',
    sleep: [4, 12],
  },
  {
    day: 'Fri',
    sleep: [12, 16],
  },
  {
    day: 'Sat',
    sleep: [5, 16],
  },
]

export default function SleepPattern() {
  return (
    <div className="flex-1 items-center justify-center rounded-[20px] border px-4 py-3 lg:px-[25px] lg:py-[20px]">
      <div className="mb-4">
        <div>
          <h3 className="font-montserrat text-[11px] font-semibold text-[#191919] lg:text-base">
            Sleep Pattern(Hrs)
          </h3>
          <div className="flex items-center gap-1">
            <div className="h-[4px] w-[4px] rounded-full bg-[#FFA000] lg:h-[7px] lg:w-[7px]"></div>
            <p className="font-montserrat text-[8px] font-semibold text-[#7C8293] lg:text-xs">
              Avg Hours In Bed
            </p>
          </div>
        </div>
      </div>
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <BarChart accessibilityLayer data={sleepData}>
          <CartesianGrid vertical={true} />
          <XAxis
            dataKey="day"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <YAxis dataKey="sleep" axisLine={false} tickLine={false} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="sleep" barSize={'15'} fill="#FFA000" radius={200} />
        </BarChart>
      </ChartContainer>
    </div>
  )
}
