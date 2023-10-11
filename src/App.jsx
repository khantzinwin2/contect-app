import React from 'react'
import Login from './pages/Login'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Register from './pages/Register'
import "./App.css"
import Detail from './components/Detail'
import Dashboard_id from './pages/Dashboard_id'
import RouteGuard from './components/RouteGuard'

const App = () => {
  return (
    <div className=' container mx-auto'>
      <Routes>
        <Route path='/' element={<RouteGuard><Dashboard/></RouteGuard>}/>
        <Route path='/:id' element={<RouteGuard><Dashboard_id/></RouteGuard>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/detail' element={<Detail/>}/>
      </Routes>
    </div>
  )
}

export default App