import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Categories = () => {
    const [active, setActive] = useState("design")
   

    return (
        <div className='flex flex-col gap-8 justify-center items-center text-lg font-semibold'>
            <h1 className='text-4xl'>Explore Categories</h1>
            <div className='flex gap-5 flex-wrap justify-center items-center-safe'>
                <Link onClick={()=>setActive('design')} className={`${active === 'design'?'border-2 bg-blue-500 text-white rounded-full py-2 px-6':'border-2 rounded-full py-2 px-6'}`}>Design</Link>
                <Link onClick={()=>setActive('tech')} className={`${active === 'tech'?'border-2 bg-blue-500 text-white rounded-full py-2 px-6':'border-2 rounded-full py-2 px-6'}`}>Tech</Link>
                <Link onClick={()=>setActive('writing')} className={`${active === 'writing'?'border-2 bg-blue-500 text-white rounded-full py-2 px-6':'border-2 rounded-full py-2 px-6'}`}>Writing</Link>
              
              
            </div>
        </div>
    )
}

export default Categories