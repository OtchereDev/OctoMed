import { Search } from 'lucide-react'

export default function Library() {
  return (
    <section className="pt-8">
      <div className="font-montserrat lg:flex lg:w-full lg:items-center lg:justify-between">
        <h3 className="font-semibold text-[#333]">Explore Our Library</h3>
        <div className="flex gap-2">
          <div className="flex flex-1 items-center gap-3 rounded-primary border px-[14px] py-[10px] lg:w-[418px]">
            <Search strokeWidth={2.5} size={18} />
            <input
              type="text"
              placeholder="Search for any learning resource"
              className="flex-1 font-montserrat outline-none placeholder:font-montserrat"
            />
          </div>
          <button className="flex w-auto items-center gap-2 rounded-primary border px-5 py-3 font-montserrat text-sm font-semibold text-[#353746]">
            <Search size={18} color="#353746" strokeWidth={3} />
            Search
          </button>
        </div>
      </div>
      <div className="mt-[20px] flex items-center gap-2 overflow-scroll">
        <button className="w-auto flex-shrink-0 rounded-primary border border-[#1282A2] bg-[#1282A2] bg-opacity-10 p-[15px] font-montserrat text-xs font-semibold text-[#353746] text-primary lg:text-sm">
          All
        </button>
        <button className="w-auto flex-shrink-0 rounded-primary border p-[15px] font-montserrat text-xs font-semibold text-[#353746] lg:text-sm">
          Topic 1
        </button>
        <button className="w-auto flex-shrink-0 rounded-primary border p-[15px] font-montserrat text-xs font-semibold text-[#353746] lg:text-sm">
          Topic 2
        </button>
      </div>
      <div className="mt-[20px] grid grid-cols-4 gap-4">
        {Array.from({ length: 5 }).map((_, idx) => (
          <div className="rounded-[20px] border p-3" key={idx}>
            <div className="h-[150px] w-full rounded-[10px] bg-gray-100"></div>
            <div className="mt-3 flex flex-col gap-3 font-montserrat">
              <h3 className="font-bold text-[#191919]">Article Title Goes Here</h3>
              <p className="line-clamp-2 text-sm text-[#4D5061]">
                Donec dictum convallis odio. Donec eu nunc eu est faucibus elementum. Mauris in
                risus aliquet, luctus arcu a, maximus nulla.
              </p>
              <button className="rounded-[8px] bg-[#E8F3F6] py-[10px] font-raleway font-semibold text-primary">
                Read Article
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
