import React, { useState, useEffect } from 'react';
import { Activity, Bookmark, MapPin, Calendar, Star, Loader2, Edit3, Trash2, Package } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '../components/ui/Footer';
import axios from 'axios';
import { Button } from '../components/ui/button';

const ProfilePage = () => {
    const [activeTab, setActiveTab] = useState("overview");
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                setLoading(true);
                const [profileRes, productsRes] = await Promise.all([
                    axios.get('http://localhost:5007/user/profile', {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    }),
                    axios.get('http://localhost:5007/product')
                ]);
                
                setUser(profileRes.data.user || profileRes.data.data || profileRes.data);
                
                const allProducts = productsRes.data.products || productsRes.data.data || productsRes.data;
                const myId = currentUser._id || currentUser.id;
                const myPosts = Array.isArray(allProducts) 
                    ? allProducts.filter(p => (p.sellerId?._id || p.sellerId?.id || p.sellerId) === myId)
                    : [];
                setPosts(myPosts);
            } catch (error) {
                console.error("Error fetching profile:", error);
            } finally {
                setLoading(false);
            }
        };

        if (currentUser._id || currentUser.id) fetchProfileData();
        else setLoading(false);
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 pt-20">
                <h2 className="text-2xl font-bold text-slate-900">Please log in to view your profile</h2>
                <Link to="/login" className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-xl">Go to Login</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 pt-24">
            <div className="max-w-5xl mx-auto px-4 pb-12">
                {/* Header Card */}
                <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 p-8 md:p-12 mb-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/50 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                    <div className="relative flex flex-col md:flex-row items-center gap-8">
                        <div className="relative group">
                            <div className="w-32 h-32 md:w-40 md:h-40 rounded-[2rem] bg-indigo-100 flex items-center justify-center text-indigo-600 text-5xl font-extrabold overflow-hidden border-4 border-white shadow-xl">
                                {user.profilePicture ? (
                                    <img src={user.profilePicture} alt={user.fullname} className="w-full h-full object-cover" />
                                ) : (
                                    user.fullname?.charAt(0)
                                )}
                            </div>
                        </div>
                        <div className="text-center md:text-left flex-grow">
                            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2">{user.fullname}</h2>
                            <p className="text-slate-500 font-medium text-lg mb-4">{user.department || 'Student'} | {user.university || 'Campus Community'}</p>
                            <div className="flex flex-wrap justify-center md:justify-start gap-4">
                                <div className="bg-slate-50 px-4 py-2 rounded-xl flex items-center gap-2 text-slate-600 text-sm font-bold">
                                    <MapPin className="w-4 h-4 text-indigo-500" />
                                    {user.location || 'Not specified'}
                                </div>
                                <div className="bg-slate-50 px-4 py-2 rounded-xl flex items-center gap-2 text-slate-600 text-sm font-bold">
                                    <Calendar className="w-4 h-4 text-emerald-500" />
                                    Joined {new Date(user.createdAt).toLocaleDateString()}
                                </div>
                            </div>
                        </div>
                        <Link to="/editprofile">
                            <Button className="h-14 rounded-2xl px-8 font-bold shadow-lg shadow-indigo-100 flex items-center gap-2">
                                <Edit3 className="w-5 h-5" />
                                Edit Profile
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Tabs */}
                <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
                    <div className="flex border-b border-slate-100 px-4 md:px-8 bg-slate-50/30">
                        {[
                            { id: 'overview', label: 'Overview', icon: Activity },
                            { id: 'posts', label: 'My Services', icon: Package },
                            { id: 'saved', label: 'Saved', icon: Bookmark }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`py-6 px-6 font-bold text-lg transition-all relative flex items-center gap-2 ${
                                    activeTab === tab.id ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'
                                }`}
                            >
                                <tab.icon className="w-5 h-5" />
                                <span className="hidden sm:inline">{tab.label}</span>
                                {activeTab === tab.id && (
                                    <div className="absolute bottom-0 left-4 right-4 h-1 bg-indigo-600 rounded-full"></div>
                                )}
                            </button>
                        ))}
                    </div>

                    <div className="p-8 md:p-12">
                        {activeTab === 'overview' && (
                            <div className="grid md:grid-cols-2 gap-12">
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-6">About Me</h3>
                                    <p className="text-slate-500 leading-relaxed font-medium">
                                        {user.about || "This user hasn't added a bio yet. They're probably too busy learning great things!"}
                                    </p>
                                    
                                    <div className="mt-10">
                                        <h3 className="text-xl font-bold text-slate-900 mb-6">Expertise</h3>
                                        <div className="flex flex-wrap gap-3">
                                            {user.skills?.length > 0 ? (
                                                user.skills.map((skill, i) => (
                                                    <span key={i} className="bg-indigo-50 text-indigo-600 px-4 py-2 rounded-xl text-sm font-bold">
                                                        {skill}
                                                    </span>
                                                ))
                                            ) : (
                                                <p className="text-slate-400 italic">No skills listed yet.</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100">
                                        <h4 className="font-bold text-slate-900 mb-6">Quick Stats</h4>
                                        <div className="grid grid-cols-2 gap-8">
                                            <div>
                                                <div className="text-3xl font-extrabold text-slate-900">{posts.length}</div>
                                                <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">Services</div>
                                            </div>
                                            <div>
                                                <div className="text-3xl font-extrabold text-slate-900">0</div>
                                                <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">Reviews</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-indigo-600 p-8 rounded-[2rem] text-white shadow-xl shadow-indigo-100">
                                        <h4 className="font-bold mb-4">Identity Verified</h4>
                                        <p className="text-indigo-100 text-sm mb-6 leading-relaxed">
                                            This user is a verified student of {user.university || 'their campus'}.
                                        </p>
                                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                                            <Bookmark className="w-6 h-6 text-white" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'posts' && (
                            <div className="space-y-6">
                                {posts.length > 0 ? (
                                    posts.map((post) => (
                                        <div key={post._id || post.id} className="p-6 border border-slate-100 rounded-[2rem] flex flex-col sm:flex-row justify-between items-center gap-6 hover:shadow-md transition-shadow bg-slate-50/30">
                                            <div className="flex items-center gap-6 w-full">
                                                <img 
                                                    src={post.images?.[0] || 'https://images.unsplash.com/photo-1454165833767-027eeef140a0?q=80&w=2070&auto=format&fit=crop'} 
                                                    className="w-20 h-20 rounded-2xl object-cover shadow-sm" 
                                                    alt="" 
                                                />
                                                <div className="flex-grow">
                                                    <h4 className="text-lg font-extrabold text-slate-900">{post.title}</h4>
                                                    <div className="flex items-center gap-4 text-sm font-bold text-slate-500 mt-1">
                                                        <span className="text-indigo-600">${post.price}</span>
                                                        <span>•</span>
                                                        <span className="flex items-center gap-1">
                                                            <Star className="w-3.5 h-3.5 text-amber-500 fill-current" />
                                                            {post.ratings || 0}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex gap-2 w-full sm:w-auto">
                                                <Link to={`/edit-service/${post._id || post.id}`} className="flex-grow sm:flex-initial">
                                                    <Button variant="outline" className="w-full h-11 rounded-xl border-slate-200">
                                                        <Edit3 className="w-4 h-4 mr-2" /> Edit
                                                    </Button>
                                                </Link>
                                                <Button variant="outline" className="h-11 w-11 p-0 rounded-xl border-slate-200 hover:bg-rose-50 hover:text-rose-600">
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-12">
                                        <p className="text-slate-400 font-medium">No services published yet.</p>
                                        <Link to="/create-service">
                                            <Button className="mt-4 rounded-xl">Publish First Service</Button>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'saved' && (
                            <div className="text-center py-20 bg-slate-50/30 rounded-[2rem] border border-dashed border-slate-200">
                                <Bookmark className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                                <h4 className="text-lg font-bold text-slate-900 mb-2">Nothing saved yet</h4>
                                <p className="text-slate-500 max-w-xs mx-auto">Items you bookmark while exploring will appear here.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ProfilePage;