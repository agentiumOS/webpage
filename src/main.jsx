import { createRoot } from 'react-dom/client'
import './global.scss'
import Layout from './layout.jsx'

const root = createRoot(document.getElementById('root'))

root.render(
  <Layout />
)
