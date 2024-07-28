import React, { useCallback } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { appChecker } from './js/utils/checker'

import './css/App.css'

const HomePage = React.lazy(() => import('./pages/HomePage/HomePage'))
const SignupPage = React.lazy(() =>
  import('./pages/SignupPage&LoginPage/SignupPage/SignupPage')
)
const LoginPage = React.lazy(() =>
  import('./pages/SignupPage&LoginPage/LoginPage/LoginPage')
)

export default function App() {
  const checkApp = useCallback(() => {
    appChecker()
  })
  checkApp()

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/accounts/signup" element={<SignupPage />} />
          <Route path="/accounts/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
