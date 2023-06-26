import useAuth from '../../hooks/useAuth'
import useTitle from '../../hooks/useTitle'

export default function Profile() {
  const { auth } = useAuth()
  useTitle(`${auth?.user.firstname} ${auth?.user?.lastname}`)

  return (
    <section className="container self-start justify-between p-6 mx-auto mt-5 text-white border border-gray-500 rounded-md">
      <h1 className="mb-4 text-2xl font-bold">Datos personales</h1>
      <header className="flex items-center">
        <img src={auth?.user?.image} alt="User Avatar" className="w-16 h-16 rounded-full" />
        <span className="ml-5">
          {auth?.user?.firstname} {auth?.user?.lastname}
        </span>
      </header>
      <p className="ml-2">{auth?.user?.email}</p>
      <p className="ml-2">{auth?.user?.age}</p>
    </section>
  )
}
