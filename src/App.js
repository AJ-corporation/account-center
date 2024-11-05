import React, { Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoadingCircle from './components/Loading/LoadingCircle'
import './style/App.css'

const Dashboard = React.lazy(() => import('./pages/Dashboard/Dashboard'))
const Signup = React.lazy(() => import('./pages/SignupLogin/Signup/Signup'))
const Login = React.lazy(() => import('./pages/SignupLogin/Login/Login'))

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<LoadingCircle />}>
          <Routes>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="account/signup" element={<Signup />} />
            <Route path="account/login" element={<Login />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  )
}
