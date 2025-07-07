import Navbar from './components/navbar'

function Layout(props) {
  const { children } = props
  
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}

export default Layout
