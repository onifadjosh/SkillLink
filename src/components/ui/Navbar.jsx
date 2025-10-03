// import { Search } from 'lucide-react'
import React from 'react'
import { Button } from './button'
import { useState } from "react"
import { MdMenu, MdClose } from "react-icons/md"
import { Link } from 'react-router-dom'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 px-4">
        <div className="flex gap-3.5 justify-between items-center h-16">
          <Link to={'/'}  className="text-2xl font-bold text-blue-600">
            SkillLink
          </Link>

          {/* <img className='w-30' src="/public/skillLinkLogo.jpg" alt="SkillLink Logo" /> */}
          {/* <input className='p-3 w-70 border-2' type="text" name="" id="" placeholder='What link are you looking for?' /> */}
          <div className="hidden md:flex">
            <div className="flex justify-center items-center gap-6 ">
              <Link to={'/login'} className='bg-blue-500 text-white  hover:rounded-full  hover:bg-blue-600 py-2 px-5 rounded-lg duration-300 ease-in' >Log In</Link>
              <Link to={'/register'} className='border-blue-500 border-2 rounded-lg hover:rounded-full  hover:bg-blue-500 hover:text-white text-dark py-2 px-4 focus:outline-2 focus:outline-offset-2 focus:outline-blue-500 active:bg-blue-700 duration-200 ease-in' >Get Started</Link>

            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 focus:outline-none"
            >
              {isOpen ? <MdClose size={28} /> : <MdMenu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white px-4 py-3 space-y-2 shadow-lg">
          <div className="flex flex-col gap-4 w-full">
            <Link to={'/login'} className='bg-blue-500 text-white text-center  hover:bg-blue-600 py-2 px-5 rounded-lg' >Log In</Link>
            <Link to={'/register'} className='border-blue-500 border-2 text-center rounded-lg hover:rounded-full  hover:bg-blue-500 hover:text-white text-dark py-2 px-4 focus:outline-2 focus:outline-offset-2 focus:outline-blue-500 active:bg-blue-700' >Get Started</Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar