import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, MessageSquare, Shield, Clock, RotateCcw, ChevronLeft, Send, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import Footer from '../components/ui/Footer';
import axios from 'axios';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('description');
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('user'));

  const handleContactSeller = () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    
    // Check if the user is trying to contact themselves
    const sellerId = product.sellerId?._id || product.sellerId?.id || product.sellerId;
    const myId = currentUser._id || currentUser.id;
    
    if (sellerId === myId) {
      alert("You cannot contact yourself.");
      return;
    }

    navigate('/inbox', { state: { seller: product.sellerId } });
  };

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        const [productRes, reviewsRes] = await Promise.all([
          axios.get(`http://localhost:5007/product/${id}`),
          axios.get(`http://localhost:5007/review/service/${id}`)
        ]);
        
        setProduct(productRes.data.product || productRes.data.data || productRes.data);
        const reviewsData = reviewsRes.data.reviews || reviewsRes.data.data || reviewsRes.data;
        setReviews(Array.isArray(reviewsData) ? reviewsData : []);
      } catch (error) {
        console.error("Error fetching product data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProductData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-24 flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
        <p className="text-slate-500 font-medium text-lg">Loading service details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white pt-24 flex flex-col items-center justify-center container mx-auto px-4">
        <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Service Not Found</h2>
        <p className="text-slate-500 mb-8">The service you're looking for doesn't exist or has been removed.</p>
        <Link to="/explore">
          <Button className="rounded-2xl h-14 px-8 font-bold">Back to Explore</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-24">
      <div className="container mx-auto px-4 pb-12">
        <Link to="/explore" className="inline-flex items-center text-slate-500 hover:text-indigo-600 mb-8 font-medium transition-colors">
          <ChevronLeft className="w-5 h-5 mr-1" />
          Back to Explore
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-8">
            <h1 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
              {product.title}
            </h1>

            <div className="flex items-center gap-6 mb-8 pb-8 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <img 
                  src={product.sellerId?.profilePicture || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2080&auto=format&fit=crop"} 
                  alt={product.sellerId?.fullname || "Seller"} 
                  className="w-12 h-12 rounded-full object-cover" 
                />
                <div>
                  <div className="font-bold text-slate-900">{product.sellerId?.fullname || "SkillLink Seller"}</div>
                  <div className="text-sm text-slate-500">{product.category} Expert</div>
                </div>
              </div>
              <div className="h-10 w-px bg-slate-200 hidden sm:block"></div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                <span className="font-bold text-slate-900">{product.ratings || 0}</span>
                <span className="text-slate-500">({product.reviewsCount || 0} reviews)</span>
              </div>
            </div>

            {/* Image Gallery */}
            <div className="rounded-3xl overflow-hidden mb-10 shadow-lg border border-slate-100 bg-slate-100">
              <img 
                src={product.images?.[0] || 'https://images.unsplash.com/photo-1454165833767-027eeef140a0?q=80&w=2070&auto=format&fit=crop'} 
                alt={product.title} 
                className="w-full h-[400px] md:h-[500px] object-cover" 
              />
            </div>

            {/* Tabs */}
            <div className="mb-10">
              <div className="flex gap-8 border-b border-slate-200 mb-6">
                {['Description', 'Reviews', 'About Seller'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab.toLowerCase())}
                    className={`pb-4 text-lg font-semibold transition-all relative ${
                      activeTab === tab.toLowerCase() 
                        ? 'text-indigo-600' 
                        : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    {tab}
                    {activeTab === tab.toLowerCase() && (
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-600 rounded-full"></div>
                    )}
                  </button>
                ))}
              </div>

              {activeTab === 'description' && (
                <div className="prose prose-slate max-w-none">
                  <p className="text-slate-600 text-lg leading-relaxed whitespace-pre-line">
                    {product.description}
                  </p>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  {reviews.length > 0 ? (
                    reviews.map(review => (
                      <div key={review._id} className="p-6 rounded-2xl border border-slate-100 bg-slate-50">
                        <div className="flex justify-between mb-4">
                          <div className="font-bold text-slate-900">{review.reviewerId?.fullname || "Student Buyer"}</div>
                          <div className="text-sm text-slate-400">{new Date(review.createdAt).toLocaleDateString()}</div>
                        </div>
                        <div className="flex gap-1 mb-3">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} />
                          ))}
                        </div>
                        <p className="text-slate-600">{review.comment}</p>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                      <p className="text-slate-500 font-medium">No reviews yet for this service.</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'about seller' && (
                <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100">
                  <div className="flex items-center gap-6 mb-6">
                    <img 
                      src={product.sellerId?.profilePicture || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2080&auto=format&fit=crop"} 
                      alt={product.sellerId?.fullname || "Seller"} 
                      className="w-20 h-20 rounded-2xl object-cover" 
                    />
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900">{product.sellerId?.fullname || "SkillLink Seller"}</h3>
                      <p className="text-slate-600 font-medium">{product.sellerId?.bio || "Expert student service provider"}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                    <div>
                      <div className="text-sm text-slate-400 mb-1">From</div>
                      <div className="font-bold text-slate-900">{product.sellerId?.location || "Campus"}</div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-400 mb-1">Role</div>
                      <div className="font-bold text-slate-900 capitalize">{product.sellerId?.role || "Seller"}</div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-400 mb-1">Ratings</div>
                      <div className="font-bold text-slate-900">{product.ratings || 0} stars</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar - Pricing and CTA */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 space-y-6">
              <div className="bg-white rounded-3xl border border-slate-100 shadow-xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-lg font-medium text-slate-500">Service Fee</span>
                  <span className="text-3xl font-extrabold text-slate-900">${product.price}</span>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 text-slate-600">
                    <Clock className="w-5 h-5 text-indigo-500" />
                    <span className="font-medium">Direct Delivery</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600">
                    <Shield className="w-5 h-5 text-indigo-500" />
                    <span className="font-medium">Secure Payment</span>
                  </div>
                </div>

                <Button className="w-full h-14 rounded-2xl text-lg font-bold shadow-lg shadow-indigo-100 mb-4">
                  Order Now
                </Button>
                
                <Button 
                  onClick={handleContactSeller}
                  variant="outline" 
                  className="w-full h-14 rounded-2xl text-lg font-bold border-slate-200"
                >
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Contact Seller
                </Button>

                <p className="text-center text-sm text-slate-400 mt-6">
                  Simple and secure transactions
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetails;
