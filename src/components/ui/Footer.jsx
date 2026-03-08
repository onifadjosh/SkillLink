import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
    Mail, 
    ArrowRight, 
    Facebook, 
    Twitter, 
    Instagram, 
    Linkedin, 
    Github,
    Heart,
    Sparkles,
    MapPin,
    Phone,
    MessageCircle,
    HelpCircle,
    FileText,
    Shield,
    Users,
    Briefcase,
    TrendingUp
} from 'lucide-react'
import { Input } from './input'
import { Button } from './button'

const Footer = () => {
    const [email, setEmail] = useState('')
    const [subscribed, setSubscribed] = useState(false)

    const handleSubscribe = (e) => {
        e.preventDefault()
        if (email.trim()) {
            // Handle subscription logic here
            setSubscribed(true)
            setTimeout(() => {
                setSubscribed(false)
                setEmail('')
            }, 3000)
        }
    }

    const quickLinks = [
        { name: 'Home', path: '/' },
        { name: 'Explore', path: '/explore' },
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'My Services', path: '/my-services' }
    ]

    const resources = [
        { name: 'Help Center', icon: HelpCircle, path: '#' },
        { name: 'Terms of Service', icon: FileText, path: '#' },
        { name: 'Privacy Policy', icon: Shield, path: '#' },
        { name: 'Community Guidelines', icon: Users, path: '#' }
    ]

    const forStudents = [
        { name: 'How to Get Started', path: '#' },
        { name: 'Creating Services', path: '#' },
        { name: 'Pricing Guide', path: '#' },
        { name: 'Success Stories', path: '#' }
    ]

    const socialLinks = [
        { name: 'Facebook', icon: Facebook, href: '#', color: 'hover:text-blue-400' },
        { name: 'Twitter', icon: Twitter, href: '#', color: 'hover:text-sky-400' },
        { name: 'Instagram', icon: Instagram, href: '#', color: 'hover:text-pink-400' },
        { name: 'LinkedIn', icon: Linkedin, href: '#', color: 'hover:text-blue-500' },
        { name: 'GitHub', icon: Github, href: '#', color: 'hover:text-gray-300' }
    ]

    return (
        <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-300 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
                    backgroundSize: '40px 40px'
                }}></div>
            </div>

            {/* Gradient Orbs */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>

            <div className="relative z-10">
                {/* Main Footer Content */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
                        {/* Brand Section */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg">
                                    <Sparkles className="w-6 h-6 text-white" />
                                </div>
                                <h2 className="text-2xl font-extrabold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                                    SkillLink
                                </h2>
                            </div>
                            <p className="text-slate-400 leading-relaxed max-w-md">
                                Connect with talented students offering premium services. From design to development, 
                                find exactly what you need or showcase your skills to the world.
                            </p>

                            {/* Contact Info */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors">
                                    <MapPin className="w-5 h-5 text-indigo-400" />
                                    <span className="text-sm">123 University Ave, College Town, ST 12345</span>
                                </div>
                                <div className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors">
                                    <Phone className="w-5 h-5 text-indigo-400" />
                                    <span className="text-sm">+1 (555) 123-4567</span>
                                </div>
                                <div className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors">
                                    <MessageCircle className="w-5 h-5 text-indigo-400" />
                                    <span className="text-sm">support@skilllink.com</span>
                                </div>
                            </div>

                            {/* Social Links */}
                            <div>
                                <h4 className="text-sm font-semibold text-white mb-4">Follow Us</h4>
                                <div className="flex items-center gap-4">
                                    {socialLinks.map((social) => {
                                        const Icon = social.icon
                                        return (
                                            <a
                                                key={social.name}
                                                href={social.href}
                                                aria-label={social.name}
                                                className={`w-10 h-10 rounded-xl bg-slate-800/50 backdrop-blur-sm border border-slate-700 flex items-center justify-center text-slate-400 transition-all hover:scale-110 hover:border-indigo-500/50 ${social.color}`}
                                            >
                                                <Icon className="w-5 h-5" />
                                            </a>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                                <Briefcase className="w-5 h-5 text-indigo-400" />
                                Quick Links
                            </h3>
                            <ul className="space-y-3">
                                {quickLinks.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            to={link.path}
                                            className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 group"
                                        >
                                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Resources */}
                        <div>
                            <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                                <Shield className="w-5 h-5 text-indigo-400" />
                                Resources
                            </h3>
                            <ul className="space-y-3">
                                {resources.map((resource) => {
                                    const Icon = resource.icon
                                    return (
                                        <li key={resource.name}>
                                            <Link
                                                to={resource.path}
                                                className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 group"
                                            >
                                                <Icon className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                {resource.name}
                                            </Link>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>

                        {/* Newsletter */}
                        <div>
                            <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-indigo-400" />
                                Newsletter
                            </h3>
                            <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                                Get the latest updates on new services, opportunities, and exclusive offers.
                            </p>
                            <form onSubmit={handleSubscribe} className="space-y-3">
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                    <Input
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="pl-10 h-11 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus-visible:border-indigo-500 focus-visible:ring-indigo-500/20"
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    className="w-full h-11 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold shadow-lg shadow-indigo-500/25 transition-all hover:scale-105 active:scale-95"
                                >
                                    {subscribed ? (
                                        <span className="flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                                            Subscribed!
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-2">
                                            Subscribe
                                            <ArrowRight className="w-4 h-4" />
                                        </span>
                                    )}
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-slate-800/50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-2 text-slate-400 text-sm">
                                <span>© {new Date().getFullYear()} SkillLink. All rights reserved.</span>
                                <span className="hidden sm:inline">•</span>
                                <span className="hidden sm:inline">Made with</span>
                                <Heart className="w-4 h-4 text-red-500 fill-red-500 hidden sm:inline" />
                                <span className="hidden sm:inline">for students</span>
                            </div>
                            <div className="flex items-center gap-6 text-sm">
                                <Link to="#" className="text-slate-400 hover:text-white transition-colors">
                                    Cookie Policy
                                </Link>
                                <Link to="#" className="text-slate-400 hover:text-white transition-colors">
                                    Accessibility
                                </Link>
                                <Link to="#" className="text-slate-400 hover:text-white transition-colors">
                                    Sitemap
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer