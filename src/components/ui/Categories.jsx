import React from 'react'
import { Link } from 'react-router-dom'

const Categories = () => {
    return (
        <div className='flex flex-col gap-8 justify-center items-center text-xl font-semibold'>
            <h1 className='text-4xl'>Explore Categories</h1>
            <div className='flex gap-5 flex-wrap justify-center items-center-safe'>
                <Link className='border-2 rounded-md py-2.5 px-8'>Design</Link>
                <Link className='border-2 rounded-md py-2.5 px-8'>Tech</Link>
                <Link className='border-2 rounded-md py-2.5 px-8'>Writing</Link>
              
            </div>
        </div>
    )
}

export default Categories