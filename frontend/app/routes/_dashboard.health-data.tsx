import { MetaFunction } from '@remix-run/node'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import AddHealthData from '~/components/health-data/AddHealthData'
import DeleteHealthData from '~/components/health-data/DeleteHealthData'
import DateFilter from '~/components/shared/DateFilter'
import { CirclePlus } from '~/components/shared/icons'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '~/components/ui/chart'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '~/components/ui/pagination'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs'

const chartData = [
  { month: 'January', desktop: 186, mobile: 80 },
  { month: 'February', desktop: 305, mobile: 200 },
  { month: 'March', desktop: 237, mobile: 120 },
  { month: 'April', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'June', desktop: 214, mobile: 140 },
]

const hrData = [{ time: '06:00 AM', rate: 120 }]

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

export const meta: MetaFunction = () => [
  {
    title: 'OctoMed | Your AI Health Assistant',
  },
  {
    name: 'description',
    content: 'Your AI Health Assistant',
  },
]

export default function HealthData() {
  return (
    <div className="mt-5 px-5 pb-28 font-montserrat lg:mt-[40px] lg:px-0">
      <h3 className="mb-5 text-lg font-semibold text-[#333] lg:hidden">Health Data</h3>
      <Tabs defaultValue="summary">
        <TabsList className="w-full justify-between rounded-[8px] border border-[#D0D5DD] !bg-none p-[6px] font-montserrat font-bold lg:w-[640px]">
          <TabsTrigger
            className="flex-1 px-0 font-bold text-[#333] data-[state=active]:!bg-[#e6f7fe]"
            value="summary"
          >
            Summary
          </TabsTrigger>
          <TabsTrigger
            className="flex-1 font-bold text-[#333] data-[state=active]:!bg-[#e6f7fe]"
            value="detailed"
          >
            Detailed
          </TabsTrigger>
        </TabsList>

        <div className="mt-9 flex flex-col justify-between gap-6 lg:mt-[25px] lg:flex-row lg:items-center lg:gap-0">
          <DateFilter />

          <AddHealthData>
            <button className="flex gap-3 rounded-primary bg-[#1282A2] px-[32px] py-3 font-raleway font-bold text-white">
              <div className="flex h-[24px] w-[24px] items-center justify-center rounded-full border-2 border-dashed">
                <CirclePlus />
              </div>
              Add Health Data
            </button>
          </AddHealthData>
        </div>
        <TabsContent value="summary" className="mt-10">
          <div className="flex flex-col gap-7 lg:flex-row">
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
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <YAxis dataKey="desktop" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                  <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
                </BarChart>
              </ChartContainer>
            </div>
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
          </div>

          <div className="mt-7 flex flex-col gap-8 lg:flex-row">
            <div className="flex-1 items-center justify-center rounded-[20px] border px-4 py-3 lg:px-[25px] lg:py-[20px]">
              <div className="mb-4">
                <div>
                  <h3 className="font-montserrat text-[11px] font-semibold text-[#191919] lg:text-base">
                    Blood Pressure(mmHg)
                  </h3>
                  <div className="flex gap-2">
                    <div className="flex items-center gap-1">
                      <div className="h-[4px] w-[4px] rounded-full bg-[#00C9BA] lg:h-[7px] lg:w-[7px]"></div>
                      <p className="font-montserrat text-[8px] font-semibold text-[#7C8293] lg:text-xs">
                        Avg Systolic
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="h-[4px] w-[4px] rounded-full bg-[#FFA000] lg:h-[7px] lg:w-[7px]"></div>
                      <p className="font-montserrat text-[8px] font-semibold text-[#7C8293] lg:text-xs">
                        Avg Diastolic
                      </p>
                    </div>
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
                  <Bar barSize={'15'} dataKey="desktop" fill="#00C9BA" radius={4} />
                  <Bar
                    barSize={'15'}
                    dataKey="mobile"
                    fill="#FFA000"
                    className="rounded-full rounded-bl-none rounded-tl-none"
                    radius={4}
                  />
                </BarChart>
              </ChartContainer>
            </div>
            <div className="flex-1 items-center justify-center rounded-[20px] border px-4 py-3 lg:px-[25px] lg:py-[20px]">
              <div className="mb-4">
                <div>
                  <h3 className="font-montserrat text-[11px] font-semibold text-[#191919] lg:text-base">
                    Heart Rate(bph)
                  </h3>
                  <div className="flex items-center gap-1">
                    <div className="h-[4px] w-[4px] rounded-full bg-[#FF4B55] lg:h-[7px] lg:w-[7px]"></div>
                    <p className="font-montserrat text-[8px] font-semibold text-[#7C8293] lg:text-xs">
                      Heart Rate
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
                  <Bar
                    barSize={'15'}
                    dataKey="desktop"
                    width={1}
                    fill="#FF4B55"
                    radius={[20, 20, 0, 0]}
                  />
                </BarChart>
              </ChartContainer>
            </div>
          </div>

          <div className="mt-7 flex flex-col gap-8 lg:flex-row">
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
                  <Bar
                    barSize={'15'}
                    dataKey="desktop"
                    width={1}
                    fill="#72CDCD"
                    radius={[20, 20, 0, 0]}
                  />
                </BarChart>
              </ChartContainer>
            </div>
          </div>

          <div className="mt-7 flex flex-col gap-8 lg:flex-row">
            <div className="flex-1 items-center justify-center rounded-[20px] border px-4 py-3 lg:px-[25px] lg:py-[20px]">
              <div className="mb-4">
                <div>
                  <h3 className="font-montserrat text-[11px] font-semibold text-[#191919] lg:text-base">
                    Height(CM)
                  </h3>
                  <div className="flex items-center gap-1">
                    <div className="h-[4px] w-[4px] rounded-full bg-[#1282A2] lg:h-[7px] lg:w-[7px]"></div>
                    <p className="font-montserrat text-[8px] font-semibold text-[#7C8293] lg:text-xs">
                      Avg Height
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
                  <Bar barSize={'7'} dataKey="desktop" fill="#1282A2" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </div>
            <div className="flex-1 items-center justify-center rounded-[20px] border px-4 py-3 lg:px-[25px] lg:py-[20px]">
              <div className="mb-4">
                <div>
                  <h3 className="font-montserrat text-[11px] font-semibold text-[#191919] lg:text-base">
                    BMI(KG/M2)
                  </h3>
                  <div className="flex items-center gap-1">
                    <div className="h-[4px] w-[4px] rounded-full bg-[#FFA000] lg:h-[7px] lg:w-[7px]"></div>
                    <p className="font-montserrat text-[8px] font-semibold text-[#7C8293] lg:text-xs">
                      BMI
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
                  <Bar
                    barSize={'15'}
                    dataKey="desktop"
                    width={1}
                    fill="#FFA000"
                    radius={[20, 20, 0, 0]}
                  />
                </BarChart>
              </ChartContainer>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="detailed">
          <div className="">
            <div className="mt-[50px] flex flex-col gap-8 lg:flex-row">
              <div className="flex-1">
                <div className="mb-5 flex items-center gap-2">
                  <div className="h-[7px] w-[7px] rounded-full bg-[#FF4B55]"></div>
                  <p className="font-montserrat font-semibold text-[#191919]">Pulse</p>
                </div>
                <div className="overflow-hidden !rounded-2xl border shadow">
                  <Table className="">
                    <TableCaption className="mt-0 border-t px-4 py-5 text-left">
                      <div className="flex items-center justify-between font-montserrat">
                        <p>Showing 1 of 5 entries</p>
                        <Pagination className="mx-0 w-auto rounded-md border">
                          <PaginationContent>
                            <PaginationItem className="border-r">
                              <PaginationPrevious href="#" />
                            </PaginationItem>
                            <PaginationItem>
                              <PaginationLink href="#">1</PaginationLink>
                            </PaginationItem>
                            <PaginationItem className="border-l">
                              <PaginationNext href="#" />
                            </PaginationItem>
                          </PaginationContent>
                        </Pagination>
                      </div>
                    </TableCaption>
                    <TableHeader className="bg-gray-100">
                      <TableRow className="font-montserrat font-semibold">
                        <TableHead className="w-[118px]">Date</TableHead>
                        <TableHead>Pulse(bpm)</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow className="font-montserrat">
                        <TableCell>Aug 1, 2024</TableCell>
                        <TableCell>72</TableCell>
                        <TableCell className="flex gap-3">
                          <button className="rounded-[8px] border border-[#7C8293] px-[14px] py-2 font-montserrat text-sm font-semibold">
                            Edit
                          </button>
                          <button className="rounded-[8px] border border-[#7C8293] px-[14px] py-2 font-montserrat text-sm font-semibold">
                            Delete
                          </button>
                        </TableCell>
                      </TableRow>
                      <TableRow className="font-montserrat">
                        <TableCell>Aug 1, 2024</TableCell>
                        <TableCell>72</TableCell>
                        <TableCell className="flex gap-3">
                          <button className="rounded-[8px] border border-[#7C8293] px-[14px] py-2 font-montserrat text-sm font-semibold">
                            Edit
                          </button>
                          <DeleteHealthData metric="Heart Rate">
                            <button className="rounded-[8px] border border-[#7C8293] px-[14px] py-2 font-montserrat text-sm font-semibold">
                              Delete
                            </button>
                          </DeleteHealthData>
                        </TableCell>
                      </TableRow>
                      <TableRow className="font-montserrat">
                        <TableCell>Aug 1, 2024</TableCell>
                        <TableCell>72</TableCell>
                        <TableCell className="flex gap-3">
                          <button className="rounded-[8px] border border-[#7C8293] px-[14px] py-2 font-montserrat text-sm font-semibold">
                            Edit
                          </button>
                          <button className="rounded-[8px] border border-[#7C8293] px-[14px] py-2 font-montserrat text-sm font-semibold">
                            Delete
                          </button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
              <div className="flex-1">
                <div className="mb-5 flex items-center gap-2">
                  <div className="h-[7px] w-[7px] rounded-full bg-[#289BFF]"></div>
                  <p className="font-montserrat font-semibold text-[#191919]">Heart Rate</p>
                </div>
                <div className="overflow-hidden !rounded-2xl border shadow">
                  <Table className="">
                    <TableCaption className="mt-0 border-t px-4 py-5 text-left">
                      <div className="flex items-center justify-between font-montserrat">
                        <p>Showing 1 of 5 entries</p>
                        <Pagination className="mx-0 w-auto rounded-md border">
                          <PaginationContent>
                            <PaginationItem className="border-r">
                              <PaginationPrevious href="#" />
                            </PaginationItem>
                            <PaginationItem>
                              <PaginationLink href="#">1</PaginationLink>
                            </PaginationItem>
                            <PaginationItem className="border-l">
                              <PaginationNext href="#" />
                            </PaginationItem>
                          </PaginationContent>
                        </Pagination>
                      </div>
                    </TableCaption>
                    <TableHeader className="bg-gray-100">
                      <TableRow className="font-montserrat font-semibold">
                        <TableHead className="w-[118px]">Date</TableHead>
                        <TableHead>Heart Rate(bph)</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow className="font-montserrat">
                        <TableCell>Aug 1, 2024</TableCell>
                        <TableCell>120</TableCell>
                        <TableCell className="flex gap-3">
                          <button className="rounded-[8px] border border-[#7C8293] px-[14px] py-2 font-montserrat text-sm font-semibold">
                            Edit
                          </button>
                          <button className="rounded-[8px] border border-[#7C8293] px-[14px] py-2 font-montserrat text-sm font-semibold">
                            Delete
                          </button>
                        </TableCell>
                      </TableRow>
                      <TableRow className="font-montserrat">
                        <TableCell>Aug 1, 2024</TableCell>
                        <TableCell>72</TableCell>
                        <TableCell className="flex gap-3">
                          <button className="rounded-[8px] border border-[#7C8293] px-[14px] py-2 font-montserrat text-sm font-semibold">
                            Edit
                          </button>
                          <button className="rounded-[8px] border border-[#7C8293] px-[14px] py-2 font-montserrat text-sm font-semibold">
                            Delete
                          </button>
                        </TableCell>
                      </TableRow>
                      <TableRow className="font-montserrat">
                        <TableCell>Aug 1, 2024</TableCell>
                        <TableCell>72</TableCell>
                        <TableCell className="flex gap-3">
                          <button className="rounded-[8px] border border-[#7C8293] px-[14px] py-2 font-montserrat text-sm font-semibold">
                            Edit
                          </button>
                          <button className="rounded-[8px] border border-[#7C8293] px-[14px] py-2 font-montserrat text-sm font-semibold">
                            Delete
                          </button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>

            <div className="mt-[50px] flex flex-col gap-8 lg:flex-row">
              <div className="flex-1">
                <div className="mb-5 flex gap-6">
                  <div className="flex items-center gap-2">
                    <div className="h-[7px] w-[7px] rounded-full bg-[#00C9BA]"></div>
                    <p className="font-montserrat font-semibold text-[#191919]">
                      Systolic Blood Pressure
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="h-[7px] w-[7px] rounded-full bg-[#FFA000]"></div>
                    <p className="font-montserrat font-semibold text-[#191919]">
                      Diastolic Blood Pressure
                    </p>
                  </div>
                </div>
                <div className="overflow-hidden !rounded-2xl border shadow">
                  <Table className="">
                    <TableCaption className="mt-0 border-t px-4 py-5 text-left">
                      <div className="flex items-center justify-between font-montserrat">
                        <p>Showing 1 of 5 entries</p>
                        <Pagination className="mx-0 w-auto rounded-md border">
                          <PaginationContent>
                            <PaginationItem className="border-r">
                              <PaginationPrevious href="#" />
                            </PaginationItem>
                            <PaginationItem>
                              <PaginationLink href="#">1</PaginationLink>
                            </PaginationItem>
                            <PaginationItem className="border-l">
                              <PaginationNext href="#" />
                            </PaginationItem>
                          </PaginationContent>
                        </Pagination>
                      </div>
                    </TableCaption>
                    <TableHeader className="bg-gray-100">
                      <TableRow className="font-montserrat font-semibold">
                        <TableHead className="w-[118px]">Date</TableHead>
                        <TableHead>Blood Pressure - Systolic(mmHg)</TableHead>
                        <TableHead>Blood Pressure - Diastolic(mmHg)</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow className="font-montserrat">
                        <TableCell>Aug 1, 2024</TableCell>
                        <TableCell>72</TableCell>
                        <TableCell>72</TableCell>
                        <TableCell className="flex gap-3">
                          <button className="rounded-[8px] border border-[#7C8293] px-[14px] py-2 font-montserrat text-sm font-semibold">
                            Edit
                          </button>
                          <button className="rounded-[8px] border border-[#7C8293] px-[14px] py-2 font-montserrat text-sm font-semibold">
                            Delete
                          </button>
                        </TableCell>
                      </TableRow>
                      <TableRow className="font-montserrat">
                        <TableCell>Aug 1, 2024</TableCell>
                        <TableCell>72</TableCell>
                        <TableCell>72</TableCell>
                        <TableCell className="flex gap-3">
                          <button className="rounded-[8px] border border-[#7C8293] px-[14px] py-2 font-montserrat text-sm font-semibold">
                            Edit
                          </button>
                          <button className="rounded-[8px] border border-[#7C8293] px-[14px] py-2 font-montserrat text-sm font-semibold">
                            Delete
                          </button>
                        </TableCell>
                      </TableRow>
                      <TableRow className="font-montserrat">
                        <TableCell>Aug 1, 2024</TableCell>
                        <TableCell>72</TableCell>
                        <TableCell>72</TableCell>
                        <TableCell className="flex gap-3">
                          <button className="rounded-[8px] border border-[#7C8293] px-[14px] py-2 font-montserrat text-sm font-semibold">
                            Edit
                          </button>
                          <button className="rounded-[8px] border border-[#7C8293] px-[14px] py-2 font-montserrat text-sm font-semibold">
                            Delete
                          </button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>

            <div className="mt-[50px] flex flex-col gap-8 lg:flex-row">
              <div className="flex-1">
                <div className="mb-5 flex items-center gap-2">
                  <div className="h-[7px] w-[7px] rounded-full bg-[#FF4B55]"></div>
                  <p className="font-montserrat font-semibold text-[#191919]">
                    Blood Glucose Level
                  </p>
                </div>
                <div className="overflow-hidden !rounded-2xl border shadow">
                  <Table className="">
                    <TableCaption className="mt-0 border-t px-4 py-5 text-left">
                      <div className="flex items-center justify-between font-montserrat">
                        <p>Showing 1 of 5 entries</p>
                        <Pagination className="mx-0 w-auto rounded-md border">
                          <PaginationContent>
                            <PaginationItem className="border-r">
                              <PaginationPrevious href="#" />
                            </PaginationItem>
                            <PaginationItem>
                              <PaginationLink href="#">1</PaginationLink>
                            </PaginationItem>
                            <PaginationItem className="border-l">
                              <PaginationNext href="#" />
                            </PaginationItem>
                          </PaginationContent>
                        </Pagination>
                      </div>
                    </TableCaption>
                    <TableHeader className="bg-gray-100">
                      <TableRow className="font-montserrat font-semibold">
                        <TableHead className="w-[118px]">Date</TableHead>
                        <TableHead>Glucose Level(mg/dL)</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow className="font-montserrat">
                        <TableCell>Aug 1, 2024</TableCell>
                        <TableCell>72</TableCell>
                        <TableCell className="flex gap-3">
                          <button className="rounded-[8px] border border-[#7C8293] px-[14px] py-2 font-montserrat text-sm font-semibold">
                            Edit
                          </button>
                          <button className="rounded-[8px] border border-[#7C8293] px-[14px] py-2 font-montserrat text-sm font-semibold">
                            Delete
                          </button>
                        </TableCell>
                      </TableRow>
                      <TableRow className="font-montserrat">
                        <TableCell>Aug 1, 2024</TableCell>
                        <TableCell>72</TableCell>
                        <TableCell className="flex gap-3">
                          <button className="rounded-[8px] border border-[#7C8293] px-[14px] py-2 font-montserrat text-sm font-semibold">
                            Edit
                          </button>
                          <button className="rounded-[8px] border border-[#7C8293] px-[14px] py-2 font-montserrat text-sm font-semibold">
                            Delete
                          </button>
                        </TableCell>
                      </TableRow>
                      <TableRow className="font-montserrat">
                        <TableCell>Aug 1, 2024</TableCell>
                        <TableCell>72</TableCell>
                        <TableCell className="flex gap-3">
                          <button className="rounded-[8px] border border-[#7C8293] px-[14px] py-2 font-montserrat text-sm font-semibold">
                            Edit
                          </button>
                          <button className="rounded-[8px] border border-[#7C8293] px-[14px] py-2 font-montserrat text-sm font-semibold">
                            Delete
                          </button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
              <div className="flex-1">
                <div className="mb-5 flex items-center gap-2">
                  <div className="h-[7px] w-[7px] rounded-full bg-[#FFA000]"></div>
                  <p className="font-montserrat font-semibold text-[#191919]">Sleep Pattern</p>
                </div>
                <div className="overflow-hidden !rounded-2xl border shadow">
                  <Table className="">
                    <TableCaption className="mt-0 border-t px-4 py-5 text-left">
                      <div className="flex items-center justify-between font-montserrat">
                        <p>Showing 1 of 5 entries</p>
                        <Pagination className="mx-0 w-auto rounded-md border">
                          <PaginationContent>
                            <PaginationItem className="border-r">
                              <PaginationPrevious href="#" />
                            </PaginationItem>
                            <PaginationItem>
                              <PaginationLink href="#">1</PaginationLink>
                            </PaginationItem>
                            <PaginationItem className="border-l">
                              <PaginationNext href="#" />
                            </PaginationItem>
                          </PaginationContent>
                        </Pagination>
                      </div>
                    </TableCaption>
                    <TableHeader className="bg-gray-100">
                      <TableRow className="font-montserrat font-semibold">
                        <TableHead className="w-[118px]">Date</TableHead>
                        <TableHead>Hours In Bed(Hrs)</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow className="font-montserrat">
                        <TableCell>Aug 1, 2024</TableCell>
                        <TableCell>120</TableCell>
                        <TableCell className="flex gap-3">
                          <button className="rounded-[8px] border border-[#7C8293] px-[14px] py-2 font-montserrat text-sm font-semibold">
                            Edit
                          </button>
                          <button className="rounded-[8px] border border-[#7C8293] px-[14px] py-2 font-montserrat text-sm font-semibold">
                            Delete
                          </button>
                        </TableCell>
                      </TableRow>
                      <TableRow className="font-montserrat">
                        <TableCell>Aug 1, 2024</TableCell>
                        <TableCell>72</TableCell>
                        <TableCell className="flex gap-3">
                          <button className="rounded-[8px] border border-[#7C8293] px-[14px] py-2 font-montserrat text-sm font-semibold">
                            Edit
                          </button>
                          <button className="rounded-[8px] border border-[#7C8293] px-[14px] py-2 font-montserrat text-sm font-semibold">
                            Delete
                          </button>
                        </TableCell>
                      </TableRow>
                      <TableRow className="font-montserrat">
                        <TableCell>Aug 1, 2024</TableCell>
                        <TableCell>72</TableCell>
                        <TableCell className="flex gap-3">
                          <button className="rounded-[8px] border border-[#7C8293] px-[14px] py-2 font-montserrat text-sm font-semibold">
                            Edit
                          </button>
                          <button className="rounded-[8px] border border-[#7C8293] px-[14px] py-2 font-montserrat text-sm font-semibold">
                            Delete
                          </button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>

            <div className="mt-[50px] flex flex-col gap-8 lg:flex-row">
              <div className="flex-1">
                <div className="mb-5 flex gap-6">
                  <div className="flex items-center gap-2">
                    <div className="h-[7px] w-[7px] rounded-full bg-[#00C9BA]"></div>
                    <p className="font-montserrat font-semibold text-[#191919]">Weight</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="h-[7px] w-[7px] rounded-full bg-[#1282A2]"></div>
                    <p className="font-montserrat font-semibold text-[#191919]">Height</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="h-[7px] w-[7px] rounded-full bg-[#FFA000]"></div>
                    <p className="font-montserrat font-semibold text-[#191919]">BMI</p>
                  </div>
                </div>
                <div className="overflow-hidden !rounded-2xl border shadow">
                  <Table className="">
                    <TableCaption className="mt-0 border-t px-4 py-5 text-left">
                      <div className="flex items-center justify-between font-montserrat">
                        <p>Showing 1 of 5 entries</p>
                        <Pagination className="mx-0 w-auto rounded-md border">
                          <PaginationContent>
                            <PaginationItem className="border-r">
                              <PaginationPrevious href="#" />
                            </PaginationItem>
                            <PaginationItem>
                              <PaginationLink href="#">1</PaginationLink>
                            </PaginationItem>
                            <PaginationItem className="border-l">
                              <PaginationNext href="#" />
                            </PaginationItem>
                          </PaginationContent>
                        </Pagination>
                      </div>
                    </TableCaption>
                    <TableHeader className="bg-gray-100">
                      <TableRow className="font-montserrat font-semibold">
                        <TableHead className="w-[118px]">Date</TableHead>
                        <TableHead>Weight(KG)</TableHead>
                        <TableHead>Height(M)</TableHead>
                        <TableHead>BMI(KG/M2)</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow className="font-montserrat">
                        <TableCell>Aug 1, 2024</TableCell>
                        <TableCell>72</TableCell>
                        <TableCell>72</TableCell>
                        <TableCell>72</TableCell>
                        <TableCell className="flex gap-3">
                          <button className="rounded-[8px] border border-[#7C8293] px-[14px] py-2 font-montserrat text-sm font-semibold">
                            Edit
                          </button>
                          <button className="rounded-[8px] border border-[#7C8293] px-[14px] py-2 font-montserrat text-sm font-semibold">
                            Delete
                          </button>
                        </TableCell>
                      </TableRow>
                      <TableRow className="font-montserrat">
                        <TableCell>Aug 1, 2024</TableCell>
                        <TableCell>72</TableCell>
                        <TableCell>72</TableCell>
                        <TableCell>72</TableCell>
                        <TableCell className="flex gap-3">
                          <button className="rounded-[8px] border border-[#7C8293] px-[14px] py-2 font-montserrat text-sm font-semibold">
                            Edit
                          </button>
                          <button className="rounded-[8px] border border-[#7C8293] px-[14px] py-2 font-montserrat text-sm font-semibold">
                            Delete
                          </button>
                        </TableCell>
                      </TableRow>
                      <TableRow className="font-montserrat">
                        <TableCell>Aug 1, 2024</TableCell>
                        <TableCell>72</TableCell>
                        <TableCell>72</TableCell>
                        <TableCell>72</TableCell>
                        <TableCell className="flex gap-3">
                          <button className="rounded-[8px] border border-[#7C8293] px-[14px] py-2 font-montserrat text-sm font-semibold">
                            Edit
                          </button>
                          <button className="rounded-[8px] border border-[#7C8293] px-[14px] py-2 font-montserrat text-sm font-semibold">
                            Delete
                          </button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
