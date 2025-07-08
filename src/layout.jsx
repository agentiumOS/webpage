import Navbar from './components/navbar'
import Footer from './components/footer'

function Layout(props) {
  const { children } = props
  
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}

export default Layout
