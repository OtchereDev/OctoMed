export default function DashboardCard({
  icon,
  label,
  children,
  bg,
  lg,
  sm,
}: {
  icon: React.ReactNode
  label: string
  children: React.ReactNode
  bg: string
  lg?: boolean
  sm?: boolean
}) {
  return (
    <div
      className={`flex ${lg ? 'w-full lg:w-[295px]' : sm ? 'w-[calc(50%-0.5rem)] lg:w-[205px]' : 'w-[calc(50%-0.5rem)] lg:w-[250px]'} h-[91px] gap-3 rounded-[20px] border border-[#D0D5DD99] px-[15px] py-[13px] lg:h-[118px] lg:gap-5 lg:px-5 lg:py-4`}
    >
      <div
        className={`flex h-[30px] w-[30px] items-center justify-center rounded-full lg:h-[40px] lg:w-[40px] ${bg}`}
      >
        {icon}
      </div>
      <div className="flex flex-1 flex-col justify-between font-montserrat text-[#7C8293]">
        <h3 className="mb-3 text-xs font-medium lg:mb-4 lg:text-base">{label}</h3>
        {children}
      </div>
    </div>
  )
}
