import React, { useState } from 'react';
import { Users, Layout, AlertTriangle, CheckCircle, Ban, Search, Filter, MoreVertical, ExternalLink } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import Footer from '../components/ui/Footer';
import axios from 'axios';
import { Loader2, Trash2 } from 'lucide-react';
import { ToastService } from '@/components/Toast';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState([]);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchData = async () => {
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      };
      
      const [usersRes, productsRes] = await Promise.all([
        axios.get('http://localhost:5007/admin/users', config),
        axios.get('http://localhost:5007/admin/products', config)
      ]);
      
      const userData = usersRes.data.users || usersRes.data.data || usersRes.data;
      const productData = productsRes.data.products || productsRes.data.data || productsRes.data;
      
      setUsers(Array.isArray(userData) ? userData : []);
      setListings(Array.isArray(productData) ? productData : []);
    } catch (error) {
      console.error("Error fetching admin data:", error);
      ToastService.error("Failed to load admin data.");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`http://localhost:5007/admin/user/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setUsers(prev => prev.filter(u => (u._id || u.id) !== id));
        ToastService.success("User deleted successfully.");
      } catch (error) {
        ToastService.error("Failed to delete user.");
      }
    }
  };

  const handleDeleteListing = async (id) => {
    if (window.confirm("Are you sure you want to delete this listing?")) {
      try {
        await axios.delete(`http://localhost:5007/admin/product/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setListings(prev => prev.filter(l => (l._id || l.id) !== id));
        ToastService.success("Listing deleted successfully.");
      } catch (error) {
        ToastService.error("Failed to delete listing.");
      }
    }
  };

  const stats = [
    { label: 'Total Users', value: users.length, icon: Users, color: 'blue' },
    { label: 'Active Listings', value: listings.length, icon: Layout, color: 'indigo' },
    { label: 'Pending Reports', value: '0', icon: AlertTriangle, color: 'rose' }
  ];

  const filteredUsers = Array.isArray(users) ? users.filter(u => 
    u.fullname?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    u.email?.toLowerCase().includes(searchQuery.toLowerCase())
  ) : [];

  const filteredListings = Array.isArray(listings) ? listings.filter(l => 
    l.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    l.category?.toLowerCase().includes(searchQuery.toLowerCase())
  ) : [];

  return (
    <div className="min-h-screen bg-slate-50 pt-24">
      <div className="container mx-auto px-4 pb-12">
        <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900 mb-2">Admin <span className="text-indigo-600">Panel</span></h1>
            <p className="text-slate-500 text-lg font-medium">Oversee platform activity and manage users.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="h-12 rounded-xl border-slate-200">Export Report</Button>
            <Button className="h-12 rounded-xl shadow-lg">Settings</Button>
          </div>
        </header>

        {/* Admin Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-6">
              <div className={`w-16 h-16 rounded-2xl bg-${stat.color}-50 flex items-center justify-center`}>
                <stat.icon className={`w-8 h-8 text-${stat.color}-600`} />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">{stat.label}</div>
                <div className="text-3xl font-extrabold text-slate-900">{stat.value}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-slate-100 px-8">
            {['Users', 'Listings', 'Reports'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab.toLowerCase())}
                className={`py-6 px-8 font-bold text-lg transition-all relative ${
                  activeTab === tab.toLowerCase() ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {tab}
                {activeTab === tab.toLowerCase() && (
                  <div className="absolute bottom-0 left-8 right-8 h-1 bg-indigo-600 rounded-full"></div>
                )}
              </button>
            ))}
          </div>

          <div className="p-8">
            {/* Toolbar */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-grow">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <Input 
                  placeholder={`Search ${activeTab}...`} 
                  className="pl-12 h-12 rounded-xl bg-slate-50 border-none" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" className="h-12 rounded-xl">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>

            <div className="overflow-x-auto">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
                  <p className="text-slate-500">Loading data...</p>
                </div>
              ) : activeTab === 'users' ? (
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b border-slate-50">
                      <th className="pb-6 font-bold text-slate-400 text-xs uppercase tracking-widest">User</th>
                      <th className="pb-6 font-bold text-slate-400 text-xs uppercase tracking-widest">Role</th>
                      <th className="pb-6 font-bold text-slate-400 text-xs uppercase tracking-widest">Joined</th>
                      <th className="pb-6 font-bold text-slate-400 text-xs uppercase tracking-widest">Status</th>
                      <th className="pb-6 font-bold text-slate-400 text-xs uppercase tracking-widest text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {filteredUsers.map((user) => (
                      <tr key={user._id || user.id} className="group">
                        <td className="py-6">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-indigo-600 overflow-hidden">
                              {user.profilePicture ? (
                                <img src={user.profilePicture} alt="" className="w-full h-full object-cover" />
                              ) : (
                                (user.fullname || user.name || '?').charAt(0).toUpperCase()
                              )}
                            </div>
                            <div>
                              <div className="font-bold text-slate-900">{user.fullname || user.name}</div>
                              <div className="text-xs text-slate-500">{user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-6 font-medium text-slate-600">Student</td>
                        <td className="py-6 text-slate-500">{new Date(user.createdAt).toLocaleDateString()}</td>
                        <td className="py-6">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            'bg-green-100 text-green-700'
                          }`}>
                            Active
                          </span>
                        </td>
                        <td className="py-6 text-right">
                          <div className="flex justify-end gap-2">
                             <Button 
                              onClick={() => handleDeleteUser(user._id || user.id)}
                              variant="outline" size="sm" className="h-9 rounded-lg border-slate-100 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-100"
                             >
                               <Trash2 className="w-3.5 h-3.5 mr-2" />
                               Delete
                             </Button>
                             <Button variant="outline" size="sm" className="h-9 w-9 p-0 rounded-lg border-slate-100">
                               <MoreVertical className="w-4 h-4" />
                             </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : activeTab === 'listings' ? (
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b border-slate-50">
                      <th className="pb-6 font-bold text-slate-400 text-xs uppercase tracking-widest">Service</th>
                      <th className="pb-6 font-bold text-slate-400 text-xs uppercase tracking-widest">Category</th>
                      <th className="pb-6 font-bold text-slate-400 text-xs uppercase tracking-widest">Price</th>
                      <th className="pb-6 font-bold text-slate-400 text-xs uppercase tracking-widest">Date</th>
                      <th className="pb-6 font-bold text-slate-400 text-xs uppercase tracking-widest text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {filteredListings.map((listing) => (
                      <tr key={listing._id || listing.id} className="group">
                        <td className="py-6">
                          <div className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors cursor-pointer truncate max-w-[250px]">
                            {listing.title}
                          </div>
                          <div className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">Active</div>
                        </td>
                        <td className="py-6 font-medium text-slate-600">{listing.category}</td>
                        <td className="py-6 font-bold text-slate-900">${listing.price}</td>
                        <td className="py-6 text-slate-500">{new Date(listing.createdAt).toLocaleDateString()}</td>
                        <td className="py-6 text-right">
                          <div className="flex justify-end gap-2">
                             <Button 
                              onClick={() => handleDeleteListing(listing._id || listing.id)}
                              variant="outline" size="sm" className="h-9 rounded-lg border-slate-100 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-100"
                             >
                               <Trash2 className="w-3.5 h-3.5 mr-2" />
                               Remove
                             </Button>
                             <Link to={`/product/${listing._id || listing.id}`}>
                              <Button variant="outline" size="sm" className="h-9 w-9 p-0 rounded-lg border-slate-100">
                                <ExternalLink className="w-4 h-4" />
                              </Button>
                             </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="text-center py-20">
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Queue Clear!</h3>
                  <p className="text-slate-500">There are no pending reports to review at the moment.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
