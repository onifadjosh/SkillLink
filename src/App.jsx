import React from 'react'
import Navbar from './components/ui/Navbar'
import { Route, Routes } from 'react-router-dom'
import SignIn from './pages/SignIn'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Register from './pages/Register'
import ProfilePage from './pages/ProfilePage'
import EditProfile from './pages/EditProfile'




const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<SignIn />} />
        <Route path='/register' element={<Register/>} />
        <Route path='/profile' element={<ProfilePage/>} />
        <Route path='editprofile' element={<EditProfile/>}/>






        <Route path='/*' element={<NotFound/>}/>
      </Routes>
    </div>
  )
}

export default App