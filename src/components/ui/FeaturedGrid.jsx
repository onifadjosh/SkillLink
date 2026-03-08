import { ArrowRight, Star, Sparkles, TrendingUp } from 'lucide-react'
import { Link } from 'react-router-dom'

const featuredServices = [
    {
        id: 1,
        title: "UI/UX Design Services",
        description: "Professional interface design for web and mobile apps. Modern, clean, and user-focused designs that convert.",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2070&auto=format&fit=crop",
        category: "Design",
        price: "$50",
        rating: 4.9,
        reviews: 127,
        seller: "Sarah Chen",
        featured: true
    },
    {
        id: 2,
        title: "Full Stack Web Development",
        description: "Custom web applications built with React, Node.js, and modern frameworks. Fast, scalable, and secure solutions.",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop",
        category: "Development",
        price: "$75",
        rating: 5.0,
        reviews: 89,
        seller: "Alex Rodriguez",
        featured: true
    },
    {
        id: 3,
        title: "Content Writing & Blog Posts",
        description: "SEO-optimized blog posts, articles, and marketing copy. Engaging content that drives traffic and conversions.",
        image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1973&auto=format&fit=crop",
        category: "Writing",
        price: "$30",
        rating: 4.8,
        reviews: 156,
        seller: "Emma Thompson",
        featured: true
    },
    {
        id: 4,
        title: "Video Editing & Production",
        description: "Professional video editing for YouTube, social media, and marketing campaigns. Color grading and motion graphics included.",
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&auto=format&fit=crop",
        category: "Video",
        price: "$60",
        rating: 4.9,
        reviews: 94,
        seller: "Mike Johnson",
        featured: true
    },
    {
        id: 5,
        title: "Math & Science Tutoring",
        description: "Expert tutoring in Calculus, Physics, and Chemistry. Personalized sessions to help you ace your exams.",
        image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop",
        category: "Tutoring",
        price: "$40",
        rating: 5.0,
        reviews: 203,
        seller: "Dr. James Wilson",
        featured: true
    },
    {
        id: 6,
        title: "Music Production & Mixing",
        description: "Professional music production, mixing, and mastering services. From beats to full tracks, we've got you covered.",
        image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=2070&auto=format&fit=crop",
        category: "Music",
        price: "$55",
        rating: 4.7,
        reviews: 72,
        seller: "DJ Marcus",
        featured: true
    }
]

const FeaturedGrid = () => {
    return (
        <div className='py-20 px-4 bg-gradient-to-b from-slate-50/50 to-white'>
            <div className="container mx-auto max-w-7xl">
                <div className="text-center mb-12 space-y-4 animate-fade-in">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 rounded-full mb-4">
                        <TrendingUp className="w-4 h-4 text-amber-600" />
                        <span className="text-sm font-semibold text-amber-700">Trending Now</span>
                    </div>
                    <h2 className='text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent'>
                        Featured Services
                    </h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Handpicked top-rated services from our most talented students
                    </p>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 featuredGrid animate-slide-up'>
                    {featuredServices.map((service, index) => (
                        <Link
                            key={service.id}
                            to={`/explore?service=${service.id}`}
                            className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl border border-slate-100 transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            {/* Image Container */}
                            <div className="relative h-56 overflow-hidden">
                                <img
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    src={service.image}
                                    alt={service.title}
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                                
                                {/* Category Badge */}
                                <div className="absolute top-4 left-4">
                                    <span className="px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-xs font-bold text-slate-700 shadow-lg">
                                        {service.category}
                                    </span>
                                </div>

                                {/* Featured Badge */}
                                {service.featured && (
                                    <div className="absolute top-4 right-4">
                                        <div className="px-3 py-1.5 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full text-xs font-bold text-white shadow-lg flex items-center gap-1">
                                            <Sparkles className="w-3 h-3" />
                                            Featured
                                        </div>
                                    </div>
                                )}

                                {/* Price */}
                                <div className="absolute bottom-4 left-4">
                                    <div className="text-white">
                                        <span className="text-xs font-medium opacity-90">Starting from</span>
                                        <div className="text-2xl font-extrabold">{service.price}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors line-clamp-1">
                                    {service.title}
                                </h3>
                                <p className="text-slate-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                                    {service.description}
                                </p>

                                {/* Seller & Rating */}
                                <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-100">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 flex items-center justify-center text-white text-xs font-bold">
                                            {service.seller.charAt(0)}
                                        </div>
                                        <span className="text-sm font-medium text-slate-700">{service.seller}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                                        <span className="text-sm font-bold text-slate-900">{service.rating}</span>
                                        <span className="text-xs text-slate-500">({service.reviews})</span>
                                    </div>
                                </div>

                                {/* CTA */}
                                <div className="flex items-center gap-2 text-indigo-600 font-semibold group-hover:gap-3 transition-all">
                                    <span className="text-sm">View Details</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>

                            {/* Hover Effect Overlay */}
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-600/0 to-purple-600/0 group-hover:from-indigo-600/5 group-hover:to-purple-600/5 transition-all duration-300 pointer-events-none"></div>
                        </Link>
                    ))}
                </div>

                {/* View All Button */}
                <div className="text-center mt-12 animate-fade-in-up">
                    <Link
                        to="/explore"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-2xl shadow-xl shadow-indigo-200/50 hover:shadow-2xl transition-all hover:scale-105 active:scale-95"
                    >
                        Explore All Services
                        <ArrowRight className="w-5 h-5" />
                        </Link>
                </div>
            </div>
        </div>
    )
}

export default FeaturedGrid