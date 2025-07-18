import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ManageCustomersApp from './ManageCustomersApp'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ManageCustomersApp />
  </StrictMode>,
)
