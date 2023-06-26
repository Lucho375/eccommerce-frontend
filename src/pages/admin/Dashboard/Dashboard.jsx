import { NavLink, Outlet } from 'react-router-dom'
import useTitle from '../../../hooks/useTitle'

export default function Dashboard() {
  useTitle('Dashboard')
  return (
    <section className="self-start w-full mt-5 text-white">
      <h1 className="text-3xl text-center">Dashboard</h1>

      <nav className="mt-5 mb-5">
        <ul className="flex items-center justify-between max-w-[400px] mx-auto">
          <li>
            <NavLink to={'add-products'} className={({ isActive }) => (isActive ? 'bg-green-700 p-2 rounded' : '')}>
              Agregar productos
            </NavLink>
          </li>
          <li>
            <NavLink to={'modify-products'} className={({ isActive }) => (isActive ? 'bg-green-700 p-2 rounded' : '')}>
              Modificar productos
            </NavLink>
          </li>
        </ul>
      </nav>

      <Outlet />
    </section>
  )
}
