import Navbar from './components/navbar'

function Layout(props) {
  const { children } = props
  
  return (
    <>
      <Navbar />
      <main className="flex flex-col gap-0">
        {children}
      </main>
    </>
  )
}

export default Layout
