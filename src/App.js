import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './css/App.css'

const HomePage = React.lazy(() => import('./pages/HomePage/HomePage'))

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
