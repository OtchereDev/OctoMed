import { useState } from 'react'

export default function Input({
  label,
  type,
  name,
}: {
  label: string
  type: string
  name: string
}) {
  const [value, setValue] = useState('')
  return (
    <div
      className={`input-group flex-1 rounded-primary border border-[#667085] font-poppins ${
        value?.length > 0 ? 'isFilled' : ''
      }`}
    >
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type={type}
        required
        className="w-full"
        name={name}
      />
      <label className="">{label}</label>
    </div>
  )
}
