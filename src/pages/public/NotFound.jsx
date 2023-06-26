import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center p-8 bg-gray-800 rounded-md">
      <h1 className="mb-4 text-4xl font-bold text-slate-300">404</h1>
      <p className="mb-8 text-lg text-slate-200">Oops! La página que buscas no se encontró.</p>
      <Link to="/" className="px-4 py-2 transition duration-200 rounded bg-slate-600 text-slate-100 hover:bg-slate-700">
        Volver a la página de inicio
      </Link>
    </section>
  )
}

export default NotFound
