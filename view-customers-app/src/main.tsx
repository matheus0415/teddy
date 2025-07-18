import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ViewCustomersApp from './ViewCustomersApp'
import { BrowserRouter } from 'react-router-dom'

const root = createRoot(document.getElementById('root')!)

const isStandalone = window.location === window.parent.location

root.render(
  <StrictMode>
    {isStandalone ? (
      <BrowserRouter>
        <ViewCustomersApp />
      </BrowserRouter>
    ) : (
      <ViewCustomersApp />
    )}
  </StrictMode>
)
