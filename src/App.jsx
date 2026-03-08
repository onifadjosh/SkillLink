import React from 'react'
import Navbar from './components/ui/Navbar'
import { Route, Routes } from 'react-router-dom'
import SignIn from './pages/SignIn'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Register from './pages/Register'
import ProfilePage from './pages/ProfilePage'
import EditProfile from './pages/EditProfile'
import Explore from './pages/Explore'
import ProductDetails from './pages/ProductDetails'
import CreateProduct from './pages/CreateProduct'
import MyProducts from './pages/MyProducts'
import Dashboard from './pages/Dashboard'
import Inbox from './pages/Inbox'
import AdminDashboard from './pages/AdminDashboard'
import { ToastContainer } from './components/Toast'
import { AuthProvider } from './context/AuthContext'



const App = () => {
  return (
    <AuthProvider>
      <div>
      <Navbar />
        <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<SignIn />} />
        <Route path='/register' element={<Register/>} />
        <Route path='/profile' element={<ProfilePage/>} />
        <Route path='/editprofile' element={<EditProfile/>}/>
        <Route path='/explore' element={<Explore />} />
        <Route path='/product/:id' element={<ProductDetails />} />
        <Route path='/create-service' element={<CreateProduct />} />
        <Route path='/my-services' element={<MyProducts />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/inbox' element={<Inbox />} />
        <Route path='/admin' element={<AdminDashboard />} />





        <Route path='/*' element={<NotFound/>}/>
      </Routes>
    </div>
    </AuthProvider>
  )
}

export default App