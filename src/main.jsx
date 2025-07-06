import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './global.scss'
import Layout from './layout.jsx'
import { routes } from './routes.jsx'

const root = createRoot(document.getElementById('root'))

root.render(
  <BrowserRouter>
    <Layout>
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </Layout>
  </BrowserRouter>
)
