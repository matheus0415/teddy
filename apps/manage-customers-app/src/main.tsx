import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ManageCustomersApp from './ManageCustomersApp'
import { BrowserRouter } from 'react-router-dom'


const isStandalone = window.location === window.parent.location

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isStandalone ? (
      <BrowserRouter>
        <ManageCustomersApp />
      </BrowserRouter>
    ) : (
      <ManageCustomersApp />
    )}
  </StrictMode>
)
