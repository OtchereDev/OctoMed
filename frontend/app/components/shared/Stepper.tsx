export default function Stepper({
  stage,
  title,
  total = 3,
}: {
  stage: number
  title: string
  total?: number
}) {
  return (
    <div className="">
      <div className="mb-5 flex gap-2">
        {Array.from({ length: total }).map((_, idx) => (
          <div
            className={`h-[5px] w-[65px] rounded-[5px] bg-primary lg:w-[122px] ${stage >= idx + 1 ? '' : 'opacity-50'}`}
          ></div>
        ))}
      </div>
      <p className="font-montserrat text-sm font-semibold">{title}</p>
    </div>
  )
}
