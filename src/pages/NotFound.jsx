import Footer from '@/components/ui/Footer'
import { FileSearch } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <div>
            <div className='text-center flex-col mt-20 h-100 flex items-center justify-center'>
                <FileSearch className='mb-2 text-blue-500' />
                <h1 className='font-semibold text-4xl'>404</h1>
                <p className='font-bold text-5xl my-5'>Page Not Found</p>
                <p className="text-gray-500 text-xl mb-10">The requested page was not found</p>
                <Link to={'/'} className="px-5 py-2.5 rounded-md bg-blue-600 text-white hover:bg-blue-400">Back Home</Link>
                {/* <img className='w-100' src="https://www.configio.com/wp-content/uploads/2023/05/CFG-BLG2305-What-is-learning-management-1080x675.png" alt="" /> */}
            </div>
            <Footer />
        </div>
    )
}

export default NotFound