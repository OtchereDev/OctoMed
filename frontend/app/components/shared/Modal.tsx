export default function Modal({
  isOpen,
  children,
}: {
  isOpen: boolean
  children: React.ReactNode
}) {
  return isOpen ? (
    <div
      className="fixed inset-0 z-10 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex min-h-screen items-center justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-[#00587199] bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>

        <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">
          &#8203;
        </span>

        <div className="relative inline-block min-w-[352px] transform overflow-hidden rounded-[20px] bg-white px-4 pb-4 pt-5 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-[800px] sm:p-6 sm:align-middle">
          {children}
        </div>
      </div>
    </div>
  ) : null
}
