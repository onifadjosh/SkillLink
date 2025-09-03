import React from 'react'
import Navbar from './components/ui/Navbar'
import { Route, Routes } from 'react-router-dom'
import SignIn from './pages/SignIn'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Register from './pages/Register'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<SignIn />} />
        <Route path='/register' element={<Register/>} />






        <Route path='/*' element={<NotFound/>}/>
      </Routes>
    </div>
  )
}

export default App