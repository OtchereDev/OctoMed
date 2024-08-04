import { Search } from 'lucide-react'
import Group from '~/components/community/Group'
import GroupSm from '~/components/community/GroupSm'

export default function Groups() {
  return (
    <section className="flex gap-[103px] pb-10 pt-6 font-montserrat">
      <div className="flex-[1.7]">
        <div className="flex flex-1 items-center gap-3 rounded-primary border px-[14px] py-[10px] lg:max-w-[503px]">
          <Search strokeWidth={2.5} size={18} />
          <input
            type="text"
            placeholder="Search doctor by name, specialty"
            className="flex-1 font-montserrat outline-none placeholder:font-montserrat"
          />
        </div>
        <div className="mt-5 flex items-center gap-[15px]">
          <p className="text-sm font-medium">Search based on:</p>
          <div className="flex items-center gap-3">
            {['General Health', 'Diet', 'Fitness', 'Other'].map((i, idx) => (
              <span
                className={`rounded-full ${idx == 0 ? 'bg-[#09AEF21A]' : 'bg-[#F2F4F7]'} px-[10px] py-[2px] text-sm font-medium text-primary`}
                key={i}
              >
                {i}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-9 flex flex-col gap-8">
          {Array.from({ length: 5 }).map((_, idx) => (
            <Group key={idx} />
          ))}
        </div>
      </div>
      <div className="flex-1">
        <h3 className="mb-6 text-lg font-semibold">Most Popular</h3>
        <div className="flex flex-col gap-8">
          {Array.from({ length: 5 }).map((_, idx) => (
            <GroupSm key={idx} />
          ))}
        </div>
      </div>
    </section>
  )
}
