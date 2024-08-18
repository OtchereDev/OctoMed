import { LoaderFunctionArgs } from '@remix-run/node'
import { json, Link, useLoaderData } from '@remix-run/react'
import { ArrowLeft } from 'lucide-react'
import http from '~/lib/http'
import { IResource } from '~/types/library'

export const loader = async ({ params }: LoaderFunctionArgs) => {
  let resource: IResource | null = null

  let route = `/library/${params.itemId}`

  try {
    const req = await http.get(route)

    const data = req.data

    resource = data.data.resource

    return json({
      resource,
      message: data.data.message,
    })
  } catch (error: any) {
    let message: string = error.response.data?.message ?? error.message

    return json({
      resource,
      message,
    })
  }
}

export default function Library() {
  const { resource } = useLoaderData<typeof loader>()
  return (
    <section className="px-5 pb-28 pt-5">
      <Link className="mb-4 flex items-center gap-2 font-semibold" to="/library">
        <ArrowLeft size={18} strokeWidth={2.5} />
        Back
      </Link>

      {resource ? (
        <>
          <div className="relative h-[150px] overflow-hidden rounded-[16px] p-4 lg:p-6">
            <img
              className="absolute left-0 top-0 h-full w-full object-cover"
              src={resource?.poster}
            />
            <div className="absolute left-0 top-0 h-full w-full bg-black bg-opacity-70" />
            <div className="relative flex h-full w-full flex-col justify-between">
              <Link className="hidden lg:block" to="/library">
                <button className="flex items-center gap-2 font-semibold text-white">
                  <ArrowLeft size={18} strokeWidth={2.5} />
                  Back
                </button>
              </Link>
              <div className="overflow-hidden font-montserrat text-white">
                <h1 className="line-clamp-1 text-2xl font-semibold">{resource.title}</h1>
                <p className="mt-2 line-clamp-3 font-medium lg:line-clamp-1">
                  {resource.description}
                </p>
              </div>
            </div>
          </div>

          <h1 className="mt-10 font-montserrat text-2xl font-bold text-[#191919]">
            {resource.title}
          </h1>

          {resource.type == 'blog' ? (
            <>
              <div
                className="mt-4 flex flex-col gap-4 text-justify font-montserrat text-[#4D5061]"
                dangerouslySetInnerHTML={{ __html: resource.content }}
              />

              <div className="mx-auto mt-10 h-[383px] overflow-scroll rounded-xl lg:w-[574.5px]">
                <img className="h-full w-full object-cover" src={resource.poster} />
              </div>
              <p className="text-center font-montserrat text-[#4D5061]">{resource.title}</p>
            </>
          ) : (
            <>
              <video className="w-full" src={resource.content} controls />
            </>
          )}
        </>
      ) : (
        <p className="text-center font-semibold">Resource not found</p>
      )}
    </section>
  )
}
