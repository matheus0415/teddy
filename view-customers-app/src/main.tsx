import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ViewCustomersApp from './ViewCustomersApp'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ViewCustomersApp />
  </StrictMode>,
)
