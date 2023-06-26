import Layout from './components/global/Layout'
import useTitle from './hooks/useTitle'
import AppRouter from './routes/AppRouter'

function App() {
  useTitle('Eccommerce')
  return (
    <Layout>
      <AppRouter />
    </Layout>
  )
}

export default App
