import { useLoaderData } from '@remix-run/react'
import dayjs from 'dayjs'
import { loader } from '~/routes/_dashboard.health-data'
import { IHealthData } from '~/types/health-data'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../ui/pagination'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'
import DeleteHealthData from './DeleteHealthData'
import EditHealthData from './EditHealthData'

export default function HeightTable() {
  const data = useLoaderData<typeof loader>()
  const metrics = (data as any)?.response?.find((res: any) => res.metric == 'height')
    ?.data as IHealthData[]
  return (
    <div className="flex-1">
      <div className="mb-5 flex items-center gap-2">
        <div className="h-[7px] w-[7px] rounded-full bg-[#1382a2]"></div>
        <p className="font-montserrat font-semibold text-[#191919]">Height</p>
      </div>
      <div className="overflow-hidden !rounded-2xl border shadow">
        <Table className="">
          <TableCaption className="mt-0 border-t px-4 py-5 text-left">
            <div className="flex items-center justify-between font-montserrat">
              <p>Showing 1 of {Math.ceil((metrics?.length ?? 0) / 30)} entries</p>
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
              <TableHead>Height(M)</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {metrics?.map((metric) => (
              <TableRow key={metric.id} className="font-montserrat">
                <TableCell className="text-nowrap">
                  {dayjs(metric.created_at).format('MMM D, YYYY')}
                </TableCell>
                <TableCell>{metric.reading}</TableCell>
                <TableCell className="flex gap-3">
                  <EditHealthData metric={metric} type="height">
                    <button className="rounded-[8px] border border-[#7C8293] px-[14px] py-2 font-montserrat text-sm font-semibold">
                      Edit
                    </button>
                  </EditHealthData>
                  <DeleteHealthData
                    id={metric.id}
                    date={dayjs(metric.created_at).format('MMM D, YYYY')}
                    metric="Height"
                    form="delete-height"
                  >
                    <button className="rounded-[8px] border border-[#7C8293] px-[14px] py-2 font-montserrat text-sm font-semibold">
                      Delete
                    </button>
                  </DeleteHealthData>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
