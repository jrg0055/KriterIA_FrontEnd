import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import KriterIA_App from './KriterIA_App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <KriterIA_App />
  </StrictMode>,
)
