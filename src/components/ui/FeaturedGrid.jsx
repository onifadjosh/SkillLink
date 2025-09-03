import { ArrowRight } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const FeaturedGrid = () => {
    return (
        <div className='flex justify-center items-center flex-col gap-8 mt-20'>
            <h1 className='text-4xl font-semibold text-center'>Featured Services</h1>
            <div className='grid grid-cols-3 gap-4 featuredGrid'>
                <div className="max-w-sm bg-white border border-gray-200 rounded-2xl shadow-md overflow-hidden">
                    <img
                        className="w-full h-48 object-cover"
                        src="https://via.placeholder.com/400x250"
                        alt="Sample"
                    />

                    <div className="p-5">
                        <h3 className="text-xl font-semibold text-gray-900">Card Title</h3>
                        <p className="mt-2 mb-5 text-gray-600 text-sm">
                            This is a simple card built with Tailwind CSS. You can add text,
                            images, and buttons here.
                        </p>

                        <Link className="gap-1 flex items-center text-black underline">
                            Learn More <ArrowRight />
                        </Link>
                    </div>
                </div>


                <div className="max-w-sm bg-white border border-gray-200 rounded-2xl shadow-md overflow-hidden">
                    <img
                        className="w-full h-48 object-cover"
                        src="https://via.placeholder.com/400x250"
                        alt="Sample"
                    />

                    <div className="p-5">
                        <h3 className="text-xl font-semibold text-gray-900">Card Title</h3>
                        <p className="mt-2 mb-5 text-gray-600 text-sm">
                            This is a simple card built with Tailwind CSS. You can add text,
                            images, and buttons here.
                        </p>

                        <Link className="gap-1 flex items-center text-black underline">
                            Learn More <ArrowRight />
                        </Link>
                    </div>
                </div>

                <div className="max-w-sm bg-white border border-gray-200 rounded-2xl shadow-md overflow-hidden">
                    <img
                        className="w-full h-48 object-cover"
                        src="https://via.placeholder.com/400x250"
                        alt="Sample"
                    />

                    <div className="p-5">
                        <h3 className="text-xl font-semibold text-gray-900">Card Title</h3>
                        <p className="mt-2 mb-5 text-gray-600 text-sm">
                            This is a simple card built with Tailwind CSS. You can add text,
                            images, and buttons here.
                        </p>

                        <Link className="gap-1 flex items-center text-black underline">
                            Learn More <ArrowRight />
                        </Link>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default FeaturedGrid