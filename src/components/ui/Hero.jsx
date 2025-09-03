import React from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
    return (
        <div className='flex mt-30 mb-20 gap-10 justify-center items-center flex-col'>
            <div className="text-center font-semibold text-5xl">
                <h1>Hire Skills.</h1>
                <h1>Build Dreams.</h1>
            </div>
            <input className='p-3 w-80 border-2 indent-5' type="text" name="" id="" placeholder='What link are you looking for?' />
            <div className="flex justify-center items-center gap-6 ">
                <Link className='bg-blue-500 text-white  hover:bg-blue-600 py-2 px-8 rounded-lg' >Hire Talent</Link>
                <Link className='border-amber-600 border-2 rounded-lg text-dark py-2 px-4 focus:outline-2 focus:outline-offset-2 focus:outline-blue-500 active:bg-blue-700' >Offer a Service</Link>

            </div>

        </div>
    )
}

export default Hero