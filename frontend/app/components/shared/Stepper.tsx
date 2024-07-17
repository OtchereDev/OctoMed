export default function Stepper({ stage, title }: { stage: number; title: string }) {
  return (
    <div className="md:max-w-[359px]">
      <div className="mb-5 flex gap-2">
        <div
          className={`h-[5px] flex-1 rounded-[5px] bg-primary ${stage >= 1 ? '' : 'opacity-50'}`}
        ></div>
        <div
          className={`h-[5px] flex-1 rounded-[5px] bg-primary ${stage >= 2 ? '' : 'opacity-50'}`}
        ></div>
        <div
          className={`h-[5px] flex-1 rounded-[5px] bg-primary ${stage >= 3 ? '' : 'opacity-50'}`}
        ></div>
      </div>
      <p className="font-montserrat text-sm font-semibold">{title}</p>
    </div>
  )
}
