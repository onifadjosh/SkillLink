import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, ArrowRight, Sparkles, TrendingUp, Users, Zap, Rocket } from 'lucide-react'
import { Input } from './input'
import { Button } from './button'

const Hero = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const navigate = useNavigate()

    const handleSearch = (e) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            navigate(`/explore?search=${encodeURIComponent(searchQuery)}`)
        } else {
            navigate('/explore')
        }
    }

    const stats = [
        { label: 'Active Students', value: '5K+', icon: Users },
        { label: 'Services Offered', value: '10K+', icon: Zap },
        { label: 'Projects Completed', value: '25K+', icon: TrendingUp }
    ]

    return (
        <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-24 pb-20">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50/50 to-purple-50"></div>
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-5xl mx-auto text-center space-y-8 animate-fade-in">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/80 backdrop-blur-md rounded-full shadow-lg border border-white/20 mb-4 animate-slide-up">
                        <Sparkles className="w-4 h-4 text-indigo-600" />
                        <span className="text-sm font-semibold text-slate-700">
                            Connect with talented students worldwide
                        </span>
                    </div>

                    {/* Main Heading */}
                    <div className="space-y-4 animate-slide-up-delay">
                        <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold leading-tight">
                            <span className="bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 bg-clip-text text-transparent">
                                Hire Skills.
                            </span>
                            <br />
                            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                                Build Dreams.
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
                            Connect with talented students offering premium services. From design to development, find exactly what you need.
                        </p>
                    </div>

                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="max-w-2xl mx-auto animate-slide-up-delay-2">
                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                            <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-white/20 p-2">
                                <div className="flex flex-col sm:flex-row gap-2">
                                    <div className="relative flex-grow">
                                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-indigo-600 transition-colors" />
                                        <Input
                                            type="text"
                                            placeholder="Search for skills, services, or talents..."
                                            className="pl-14 pr-4 h-16 text-lg bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-slate-400"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            autoFocus
                                        />
                                    </div>
                                    <Button
                                        type="submit"
                                        className="h-16 px-8 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-lg shadow-xl shadow-indigo-200/50 transition-all hover:scale-105 active:scale-95"
                                    >
                                        Search
                                        <ArrowRight className="w-5 h-5" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </form>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 animate-fade-in-up">
                        <Link
                            to="/explore"
                            className="group relative px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-2xl shadow-xl shadow-indigo-200/50 hover:shadow-2xl transition-all hover:scale-105 active:scale-95 overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                Hire Talent
                                <Rocket className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </Link>
                        <Link
                            to="/create-service"
                            className="group px-8 py-4 bg-white/80 backdrop-blur-sm border-2 border-slate-300 text-slate-700 font-bold rounded-2xl shadow-lg hover:shadow-xl hover:border-indigo-400 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
                        >
                            Offer a Service
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto pt-12 animate-fade-in-up-delay">
                        {stats.map((stat, index) => {
                            const Icon = stat.icon
                            return (
                                <div
                                    key={stat.label}
                                    className="bg-white/60 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all hover:scale-105"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <div className="flex flex-col items-center gap-3">
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg">
                                            <Icon className="w-6 h-6 text-white" />
                                        </div>
                                        <div className="text-3xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                            {stat.value}
                                        </div>
                                        <div className="text-sm font-semibold text-slate-600">
                                            {stat.label}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero