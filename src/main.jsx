import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import DeepDive from './DeepDive.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* This is the Home Page */}
        <Route path="/" element={<App />} />
        
        {/* This is the Second Page */}
        <Route path="/deep-dive" element={<DeepDive />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)