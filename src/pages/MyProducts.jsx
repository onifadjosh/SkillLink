import React, { useState, useEffect } from 'react';
import { Edit2, Trash2, Plus, Eye, Star, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';
import Footer from '../components/ui/Footer';
import axios from 'axios';
import { ToastService } from '@/components/Toast';

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const fetchMyProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5007/product");
      const allProducts = response.data.products || response.data.data || response.data;
      
      // Filter for products where sellerId matches current user ID
      // Note: Backend might use _id or id
      const myProducts = Array.isArray(allProducts) 
        ? allProducts.filter(p => (p.sellerId?._id || p.sellerId?.id || p.sellerId) === (user._id || user.id))
        : [];
      
      setProducts(myProducts);
    } catch (error) {
      console.error("Error fetching my products:", error);
      ToastService.error("Failed to load your services.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user._id || user.id) fetchMyProducts();
    else setLoading(false);
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      try {
        await axios.post(`http://localhost:5007/product/delete/${id}`, {}, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        ToastService.success("Service deleted successfully.");
        setProducts(prev => prev.filter(p => (p._id || p.id) !== id));
      } catch (error) {
        console.error("Error deleting product:", error);
        ToastService.error("Failed to delete service.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24">
      <div className="container mx-auto px-4 pb-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-2">My <span className="text-indigo-600">Services</span></h1>
            <p className="text-slate-500 font-medium">Manage and monitor your active skill listings.</p>
          </div>
          <Link to="/create-service">
            <Button className="h-14 rounded-2xl px-8 font-bold shadow-lg shadow-indigo-100 flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Create New Service
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
            <p className="text-slate-500 font-medium text-lg">Loading your services...</p>
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {products.map((product) => (
              <div key={product._id || product.id} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <div className="flex flex-col lg:flex-row gap-8 items-center">
                  {/* Image and Basic Info */}
                  <div className="flex items-center gap-6 flex-grow w-full lg:w-auto">
                    <img 
                      src={product.images?.[0] || 'https://images.unsplash.com/photo-1454165833767-027eeef140a0?q=80&w=2070&auto=format&fit=crop'} 
                      alt={product.title} 
                      className="w-24 h-24 rounded-2xl object-cover shadow-sm"
                    />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-[10px] font-bold uppercase tracking-wider rounded-md">
                          {product.category}
                        </span>
                        <span className="flex items-center gap-1 text-amber-500 font-bold text-sm">
                          <Star className="w-3 h-3 fill-current" />
                          {product.ratings || 0}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-1 lg:max-w-md">{product.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-slate-500">
                        <span className="font-bold text-slate-900">${product.price}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                          Active
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-8 lg:px-8 lg:border-l lg:border-r border-slate-100 w-full lg:w-auto">
                    <div className="text-center">
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Impressions</div>
                      <div className="text-xl font-extrabold text-slate-900">{product.impressions || 0}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Clicks</div>
                      <div className="text-xl font-extrabold text-slate-900">{product.clicks || 0}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Orders</div>
                      <div className="text-xl font-extrabold text-slate-900">{product.orders || 0}</div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 w-full lg:w-auto">
                    <Button variant="outline" className="flex-grow lg:flex-initial h-12 rounded-xl border-slate-200 hover:bg-slate-50">
                      <Edit2 className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Link to={`/product/${product._id || product.id}`} className="flex-grow lg:flex-initial">
                      <Button variant="outline" className="w-full h-12 rounded-xl border-slate-200 hover:bg-slate-50">
                        <Eye className="w-4 h-4 mr-2" />
                        Preview
                      </Button>
                    </Link>
                    <Button 
                      onClick={() => handleDelete(product._id || product.id)}
                      variant="outline" 
                      className="h-12 w-12 rounded-xl border-slate-200 hover:bg-red-50 hover:text-red-600 hover:border-red-100"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-[3rem] border border-dashed border-slate-200 shadow-sm">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Plus className="w-10 h-10 text-slate-200" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">No services yet</h3>
            <p className="text-slate-500 mb-8 max-w-sm mx-auto font-medium">
              Start earning by offering your unique skills to the campus community.
            </p>
            <Link to="/create-service">
              <Button className="h-14 rounded-2xl px-10 font-extrabold shadow-lg">
                Create Your First Service
              </Button>
            </Link>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MyProducts;
