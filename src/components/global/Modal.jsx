import { AiOutlineCloseCircle } from 'react-icons/ai'
function Modal({ isOpen, children, onClose }) {
  if (!isOpen) return null

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70`}>
      <div className="absolute inset-0"></div>
      <div className="z-10 p-6 rounded-lg bg-slate-800">
        <button className="absolute text-gray-500 top-2 right-2 hover:text-gray-800" onClick={onClose}>
          <AiOutlineCloseCircle className="text-4xl text-red-700" />
        </button>
        {children}
      </div>
    </div>
  )
}

export default Modal
