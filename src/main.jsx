import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Calculator from './main/Calculator'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <h1>Calculadora </h1>
    <Calculator />
  </StrictMode>,
)
