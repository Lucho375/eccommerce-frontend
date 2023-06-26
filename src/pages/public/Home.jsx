import useTitle from '../../hooks/useTitle'

export default function Home() {
  useTitle('Inicio')
  return <h1 className="text-center text-white">Inicio</h1>
}
