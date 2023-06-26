import Footer from './Footer'
import Header from './Header'

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main className="flex items-center justify-center flex-1 bg-test2">{children}</main>
      <Footer />
    </>
  )
}
