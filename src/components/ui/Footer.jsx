import React from 'react'

const Footer = () => {
    return (
        <footer className="bg-blue-600 mt-30 text-gray-300 py-10">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <h2 className="text-2xl font-bold text-white">SkillLink</h2>
                    <p className="mt-3 text-sm text-gray-400">
                        A marketplace to connect talents with opportunities.
                    </p>
                </div>

                <div>
                    <h3 className="text-white font-semibold mb-3">Quick Links</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-white">Home</a></li>
                        <li><a href="#" className="hover:text-white">Services</a></li>
                        <li><a href="#" className="hover:text-white">About</a></li>
                        <li><a href="#" className="hover:text-white">Contact</a></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-white font-semibold mb-3">Support</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-white">Help Center</a></li>
                        <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                        <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-white font-semibold mb-3">Subscribe</h3>
                    <p className="text-sm text-gray-400 mb-3">
                        Get updates about new skills and opportunities.
                    </p>
                    <form className="flex">
                        <input
                            type="email"
                            placeholder="Your email"
                            className="w-full px-3 border-white border-2 py-2 rounded-l-md focus:outline-none text-white"
                        />
                        <button
                            type="submit"
                            className="bg-white text-blue-700 px-4 rounded-r-md hover:bg-gray-200"
                        >
                            Go
                        </button>
                    </form>
                </div>
            </div>

            <div className="mt-10 border-t border-gray-100 pt-6 text-center text-sm text-white">
                © {new Date().getFullYear()} SkillLink. All rights reserved.
            </div>
        </footer>
    )
}

export default Footer