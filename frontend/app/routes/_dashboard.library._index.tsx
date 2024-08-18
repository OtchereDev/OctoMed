import { LoaderFunctionArgs, json } from '@remix-run/node'
import { Form, Link, useLoaderData } from '@remix-run/react'
import { Search } from 'lucide-react'
import http from '~/lib/http'
import { QueryBuilder } from '~/lib/queryBuilder'
import { IResource } from '~/types/library'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url)
  const search = url.searchParams.get('search')
  const category = url.searchParams.get('category')

  let resources: IResource[] = []

  let route = `/library${QueryBuilder({ search, category })}`

  try {
    const req = await http.get(route)

    const data = req.data

    resources = data.data.resources

    return json({
      resources,
      message: data.data.message,
      category,
    })
  } catch (error: any) {
    let message: string = error.response.data?.message ?? error.message

    return json({
      resources,
      message,
      category,
    })
  }
}

export default function Library() {
  const { resources, category } = useLoaderData<typeof loader>()

  return (
    <section className="px-5 pb-28 pt-5 font-montserrat lg:px-0 lg:pt-8">
      <h3 className="mb-4 text-xl font-semibold lg:hidden">Library</h3>
      <div className="font-montserrat lg:flex lg:w-full lg:items-center lg:justify-between">
        <h3 className="mb-4 font-semibold text-[#333] lg:mb-0">Explore Our Library</h3>
        <Form method="GET" className="flex gap-2">
          <div className="flex flex-1 items-center gap-3 rounded-primary border px-[14px] py-[10px] lg:w-[418px]">
            <Search strokeWidth={2.5} size={18} />
            <input
              type="text"
              name="search"
              placeholder="Search for any learning resource"
              className="flex-1 font-montserrat outline-none placeholder:font-montserrat"
            />
          </div>
          <button className="flex items-center gap-2 rounded-primary border px-5 py-3 font-montserrat text-xs font-semibold text-[#353746] lg:w-auto lg:text-sm">
            <Search size={18} color="#353746" strokeWidth={3} />
            Search
          </button>
        </Form>
      </div>
      <div className="mt-[20px] flex items-center gap-2 overflow-scroll">
        <Link
          to="?category="
          className={`w-auto flex-shrink-0 rounded-primary border p-[15px] font-montserrat text-xs font-semibold lg:text-sm ${
            category === ''
              ? 'border-[#1282A2] bg-[#1282A2] bg-opacity-10 text-primary'
              : 'text-[#353746]'
          }`}
        >
          All
        </Link>
        <Link
          to="?category=Mental Health"
          className={`w-auto flex-shrink-0 rounded-primary border p-[15px] font-montserrat text-xs font-semibold lg:text-sm ${
            category === 'Mental Health'
              ? 'border-[#1282A2] bg-[#1282A2] bg-opacity-10 text-primary'
              : 'text-[#353746]'
          }`}
        >
          Mental Health
        </Link>
        <Link
          to="?category=Cancer"
          className={`w-auto flex-shrink-0 rounded-primary border p-[15px] font-montserrat text-xs font-semibold lg:text-sm ${
            category === 'Cancer'
              ? 'border-[#1282A2] bg-[#1282A2] bg-opacity-10 text-primary'
              : 'text-[#353746]'
          }`}
        >
          Cancer
        </Link>
      </div>
      <div className="mt-[20px] grid gap-4 lg:grid-cols-4">
        {resources.map((resource) => (
          <div className="w-full rounded-[20px] border p-3" key={resource.id}>
            <div className="h-[150px] w-full overflow-hidden rounded-[10px] bg-gray-100">
              <img src={resource.poster} className="h-full w-full object-cover" />
            </div>
            <div className="mt-3 flex flex-col gap-3 font-montserrat">
              <Link to={`/library/${resource.id}`}>
                <h3 className="font-bold text-[#191919]">{resource.title}</h3>
              </Link>
              <p className="line-clamp-2 text-sm text-[#4D5061]">{resource.description}</p>
              <Link className="block w-full" to={`/library/${resource.id}`}>
                <button className="w-full rounded-[8px] bg-[#E8F3F6] py-[10px] font-raleway font-semibold text-primary">
                  Read Article
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {!resources.length && <p className="text-center font-semibold">No resource found</p>}
    </section>
  )
}
