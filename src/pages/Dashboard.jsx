import React, { useState } from 'react';
import { ShoppingBag, DollarSign, Clock, CheckCircle2, XCircle, MessageSquare, ChevronRight, Package, TrendingUp } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';
import Footer from '../components/ui/Footer';
import axios from 'axios';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';

const getStatusColor = (status = 'pending') => {
  switch (status.toLowerCase()) {
    case 'pending': return 'bg-amber-100 text-amber-700 border-amber-200';
    case 'ongoing': return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'completed': return 'bg-green-100 text-green-700 border-green-200';
    case 'cancelled': return 'bg-rose-100 text-rose-700 border-rose-200';
    default: return 'bg-slate-100 text-slate-700 border-slate-200';
  }
};

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' or 'sales'
  const [orders, setOrders] = useState([]);
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5007/order", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        const allOrders = response.data.orders || response.data.data || response.data;
        
        if (Array.isArray(allOrders)) {
          const myId = user._id || user.id;
          const myOrders = allOrders.filter(o => (o.buyerId?._id || o.buyerId?.id || o.buyerId) === myId);
          const mySales = allOrders.filter(o => (o.sellerId?._id || o.sellerId?.id || o.sellerId) === myId);
          
          setOrders(myOrders);
          setSales(mySales);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user._id || user.id) fetchDashboardData();
    else setLoading(false);
  }, []);

  const stats = [
    { label: 'Total Spent', value: `$${orders.reduce((acc, o) => acc + (o.price || 0), 0)}`, icon: ShoppingBag, color: 'indigo' },
    { label: 'Total Earned', value: `$${sales.reduce((acc, s) => acc + (s.price || 0), 0)}`, icon: DollarSign, color: 'emerald' },
    { label: 'Active Orders', value: orders.filter(o => o.status !== 'Completed').length + sales.filter(s => s.status !== 'Completed').length, icon: Clock, color: 'amber' },
    { label: 'Completed', value: orders.filter(o => o.status === 'Completed').length + sales.filter(s => s.status === 'Completed').length, icon: CheckCircle2, color: 'sky' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-24">
      <div className="container mx-auto px-4 pb-12">
        <header className="mb-10">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-2">My <span className="text-indigo-600">Dashboard</span></h1>
          <p className="text-slate-500 text-lg font-medium">Track your orders, earnings, and assignments.</p>
        </header>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-5">
              <div className={`w-14 h-14 rounded-2xl bg-${stat.color}-50 flex items-center justify-center`}>
                <stat.icon className={`w-7 h-7 text-${stat.color}-600`} />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-400 uppercase tracking-wider">{stat.label}</div>
                <div className="text-2xl font-extrabold text-slate-900">{stat.value}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-slate-100 bg-slate-50/50">
            <button 
              onClick={() => setActiveTab('orders')}
              className={`flex-1 py-6 font-bold text-lg transition-all flex items-center justify-center gap-3 ${
                activeTab === 'orders' ? 'bg-white text-indigo-600' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <Package className="w-5 h-5" />
              My Orders (Buying)
            </button>
            <button 
               onClick={() => setActiveTab('sales')}
               className={`flex-1 py-6 font-bold text-lg transition-all flex items-center justify-center gap-3 ${
                activeTab === 'sales' ? 'bg-white text-indigo-600' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <TrendingUp className="w-5 h-5" />
              My Sales (Selling)
            </button>
          </div>

          <div className="p-8">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
                <p className="text-slate-500 font-medium text-lg">Loading activities...</p>
              </div>
            ) : (activeTab === 'orders' ? orders : sales).length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b border-slate-50">
                      <th className="pb-6 font-bold text-slate-400 text-sm uppercase tracking-widest">Service</th>
                      <th className="pb-6 font-bold text-slate-400 text-sm uppercase tracking-widest">{activeTab === 'orders' ? 'Seller' : 'Buyer'}</th>
                      <th className="pb-6 font-bold text-slate-400 text-sm uppercase tracking-widest">Date</th>
                      <th className="pb-6 font-bold text-slate-400 text-sm uppercase tracking-widest">Total</th>
                      <th className="pb-6 font-bold text-slate-400 text-sm uppercase tracking-widest">Status</th>
                      <th className="pb-6 font-bold text-slate-400 text-sm uppercase tracking-widest">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {(activeTab === 'orders' ? orders : sales).map((order) => (
                      <tr key={order._id || order.id} className="group transition-colors">
                        <td className="py-6">
                          <div className="flex items-center gap-4">
                            <img src={order.productId?.images?.[0] || 'https://images.unsplash.com/photo-1454165833767-027eeef140a0?q=80&w=2070&auto=format&fit=crop'} alt="" className="w-12 h-12 rounded-xl object-cover" />
                            <div>
                              <div className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors uppercase tracking-tight truncate max-w-[200px]">{order.productId?.title || 'Unknown Service'}</div>
                              <div className="text-xs text-slate-400 font-medium">#{order._id?.slice(-8) || order.id?.slice(-8)}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-6 font-bold text-slate-700">
                          {activeTab === 'orders' ? order.sellerId?.fullname : order.buyerId?.fullname || 'Student'}
                        </td>
                        <td className="py-6 text-slate-500 font-medium">{new Date(order.createdAt).toLocaleDateString()}</td>
                        <td className="py-6 font-bold text-slate-900">${order.price}</td>
                        <td className="py-6">
                          <span className={`px-4 py-1.5 rounded-full text-xs font-bold border ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="py-6">
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" className="rounded-xl h-10 border-slate-200">
                               View Details
                            </Button>
                            <Link to="/inbox">
                              <Button variant="outline" size="sm" className="rounded-xl h-10 w-10 p-0 border-slate-200">
                                 <MessageSquare className="w-4 h-4" />
                              </Button>
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                   <Package className="w-8 h-8 text-slate-200" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">No orders found</h3>
                <p className="text-slate-500">You haven't made any transactions yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
