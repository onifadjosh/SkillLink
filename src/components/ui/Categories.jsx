import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Sparkles, Code, PenTool, Video, Music, Briefcase, GraduationCap, Palette, Camera, Globe, BarChart3, Heart } from 'lucide-react'

const categories = [
    { name: 'Design', icon: Palette, color: 'pink', count: '2.5K', link: '/explore?category=Design' },
    { name: 'Development', icon: Code, color: 'blue', count: '3.2K', link: '/explore?category=Development' },
    { name: 'Writing', icon: PenTool, color: 'amber', count: '1.8K', link: '/explore?category=Writing' },
    { name: 'Video', icon: Video, color: 'purple', count: '1.2K', link: '/explore?category=Video' },
    { name: 'Music', icon: Music, color: 'orange', count: '890', link: '/explore?category=Music' },
    { name: 'Business', icon: Briefcase, color: 'emerald', count: '1.5K', link: '/explore?category=Business' },
    { name: 'Tutoring', icon: GraduationCap, color: 'green', count: '2.1K', link: '/explore?category=Tutoring' },
    { name: 'Photography', icon: Camera, color: 'rose', count: '650', link: '/explore' },
    { name: 'Marketing', icon: BarChart3, color: 'indigo', count: '980', link: '/explore' },
    { name: 'Health', icon: Heart, color: 'red', count: '420', link: '/explore' },
]

const Categories = () => {
    const [active, setActive] = useState(null)

    return (
        <div className='py-20 px-4 bg-gradient-to-b from-white to-slate-50/50'>
            <div className="container mx-auto max-w-7xl">
                <div className="text-center mb-12 space-y-4 animate-fade-in">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 rounded-full mb-4">
                        <Sparkles className="w-4 h-4 text-indigo-600" />
                        <span className="text-sm font-semibold text-indigo-700">Browse by Category</span>
                    </div>
                    <h2 className='text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent'>
                        Explore Categories
                    </h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Discover talented students offering services across diverse fields and industries
                    </p>
                </div>

                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 animate-slide-up'>
                    {categories.map((category, index) => {
                        const Icon = category.icon
                        const isActive = active === category.name
                        const colorClasses = {
                            pink: { active: 'from-pink-600 to-pink-700', icon: 'text-pink-600', badge: 'bg-pink-100 text-pink-700' },
                            blue: { active: 'from-blue-600 to-blue-700', icon: 'text-blue-600', badge: 'bg-blue-100 text-blue-700' },
                            amber: { active: 'from-amber-600 to-amber-700', icon: 'text-amber-600', badge: 'bg-amber-100 text-amber-700' },
                            purple: { active: 'from-purple-600 to-purple-700', icon: 'text-purple-600', badge: 'bg-purple-100 text-purple-700' },
                            orange: { active: 'from-orange-600 to-orange-700', icon: 'text-orange-600', badge: 'bg-orange-100 text-orange-700' },
                            emerald: { active: 'from-emerald-600 to-emerald-700', icon: 'text-emerald-600', badge: 'bg-emerald-100 text-emerald-700' },
                            green: { active: 'from-green-600 to-green-700', icon: 'text-green-600', badge: 'bg-green-100 text-green-700' },
                            rose: { active: 'from-rose-600 to-rose-700', icon: 'text-rose-600', badge: 'bg-rose-100 text-rose-700' },
                            indigo: { active: 'from-indigo-600 to-indigo-700', icon: 'text-indigo-600', badge: 'bg-indigo-100 text-indigo-700' },
                            red: { active: 'from-red-600 to-red-700', icon: 'text-red-600', badge: 'bg-red-100 text-red-700' },
                        }
                        const colors = colorClasses[category.color]

                        return (
                            <Link
                                key={category.name}
                                to={category.link}
                                onClick={() => setActive(category.name)}
                                onMouseEnter={() => setActive(category.name)}
                                onMouseLeave={() => setActive(null)}
                                className={`group relative flex flex-col items-center gap-3 p-6 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 ${
                                    isActive
                                        ? `bg-gradient-to-br ${colors.active} text-white shadow-xl scale-105`
                                        : 'bg-white/80 backdrop-blur-sm text-slate-700 hover:bg-white border-2 border-slate-200 hover:border-indigo-300 shadow-md hover:shadow-xl'
                                }`}
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all ${
                                    isActive
                                        ? 'bg-white/20 backdrop-blur-md shadow-lg'
                                        : 'bg-slate-50 group-hover:bg-slate-100'
                                }`}>
                                    <Icon className={`w-7 h-7 ${isActive ? 'text-white' : colors.icon}`} />
                                </div>
                                <span className="text-center">{category.name}</span>
                                <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${
                                    isActive
                                        ? 'bg-white/20 text-white'
                                        : colors.badge
                                }`}>
                                    {category.count}
                                </span>
                                {isActive && (
                                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/20 to-transparent animate-pulse"></div>
                                )}
                            </Link>
                        )
                    })}
                </div>

                <div className="text-center mt-12 animate-fade-in-up">
                    <Link
                        to="/explore"
                        className="inline-flex items-center gap-2 px-6 py-3 text-indigo-600 font-semibold hover:text-indigo-700 hover:underline transition-all"
                    >
                        View All Categories
                        <Sparkles className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Categories