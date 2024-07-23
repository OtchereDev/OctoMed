import { useState } from 'react'
import { EyeClose, EyeOpen } from './icons'

export default function Input({
  label,
  type,
  name,
  error,
  callback,
}: {
  label: string
  type: string
  name: string
  error?: string
  callback?: (val: string) => void
}) {
  const [value, setValue] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const togglePassword = () => {
    setIsOpen((iso) => !iso)
  }
  return (
    <div>
      <div
        className={`input-group flex flex-1 rounded-primary border border-[#667085] font-poppins ${
          value?.length > 0 ? 'isFilled' : ''
        }`}
      >
        <input
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
            callback?.(e.target.value)
          }}
          type={isOpen ? 'text' : type}
          className="w-full"
          name={name}
        />
        <label className="">{label}</label>

        {type == 'password' &&
          (isOpen ? (
            <EyeClose cursor="pointer" onClick={togglePassword} />
          ) : (
            <EyeOpen cursor="pointer" onClick={togglePassword} />
          ))}
      </div>
      {(error?.length as number) > 0 && (
        <p className="mt-1 font-montserrat text-xs text-red-500">{error}</p>
      )}
    </div>
  )
}
