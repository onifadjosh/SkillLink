import React, { useState, useEffect, useMemo } from 'react';
import { Search, Filter, SlidersHorizontal, Loader2, Sparkles, TrendingUp, Users, Zap, X, Grid3x3, List, ChevronDown, Star } from 'lucide-react';
import ProductCard from '../components/ui/ProductCard';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import Footer from '../components/ui/Footer';
import axios from 'axios';

const CATEGORIES = [
  { name: "All", icon: Grid3x3, activeClass: "from-indigo-600 to-indigo-700", iconClass: "text-white", badgeClass: "bg-white/20 text-white", hoverClass: "text-indigo-600", badgeHover: "bg-indigo-100 text-indigo-700" },
  { name: "Design", icon: Sparkles, activeClass: "from-pink-600 to-pink-700", iconClass: "text-white", badgeClass: "bg-white/20 text-white", hoverClass: "text-pink-600", badgeHover: "bg-pink-100 text-pink-700" },
  { name: "Development", icon: Zap, activeClass: "from-blue-600 to-blue-700", iconClass: "text-white", badgeClass: "bg-white/20 text-white", hoverClass: "text-blue-600", badgeHover: "bg-blue-100 text-blue-700" },
  { name: "Tutoring", icon: Users, activeClass: "from-green-600 to-green-700", iconClass: "text-white", badgeClass: "bg-white/20 text-white", hoverClass: "text-green-600", badgeHover: "bg-green-100 text-green-700" },
  { name: "Video", icon: TrendingUp, activeClass: "from-purple-600 to-purple-700", iconClass: "text-white", badgeClass: "bg-white/20 text-white", hoverClass: "text-purple-600", badgeHover: "bg-purple-100 text-purple-700" },
  { name: "Writing", icon: Star, activeClass: "from-amber-600 to-amber-700", iconClass: "text-white", badgeClass: "bg-white/20 text-white", hoverClass: "text-amber-600", badgeHover: "bg-amber-100 text-amber-700" },
  { name: "Music", icon: Sparkles, activeClass: "from-orange-600 to-orange-700", iconClass: "text-white", badgeClass: "bg-white/20 text-white", hoverClass: "text-orange-600", badgeHover: "bg-orange-100 text-orange-700" },
  { name: "Business", icon: TrendingUp, activeClass: "from-emerald-600 to-emerald-700", iconClass: "text-white", badgeClass: "bg-white/20 text-white", hoverClass: "text-emerald-600", badgeHover: "bg-emerald-100 text-emerald-700" }
];

const SORT_OPTIONS = [
  { label: "Newest First", value: "newest" },
  { label: "Highest Rated", value: "rating" },
  { label: "Price: Low to High", value: "price-low" },
  { label: "Price: High to Low", value: "price-high" }
];

const Explore = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [viewMode, setViewMode] = useState("grid");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5007/product");
        console.log(response.data);
        const data = response.data.products || response.data.data || response.data;
        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
      const matchesSearch = product.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            product.description?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    // Sort products
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        case "rating":
          return (b.ratings || 0) - (a.ratings || 0);
        case "price-low":
          return (a.price || 0) - (b.price || 0);
        case "price-high":
          return (b.price || 0) - (a.price || 0);
        default:
          return 0;
      }
    });

    return sorted;
  }, [products, selectedCategory, searchQuery, sortBy]);

  const categoryStats = useMemo(() => {
    const stats = {};
    products.forEach(product => {
      const cat = product.category || "Uncategorized";
      stats[cat] = (stats[cat] || 0) + 1;
    });
    return stats;
  }, [products]);

  const totalProducts = filteredAndSortedProducts.length;
  const activeFilters = (selectedCategory !== "All" ? 1 : 0) + (searchQuery ? 1 : 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 pt-24">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-purple-600/10 blur-3xl"></div>
        <div className="container mx-auto px-4 pt-12 pb-16 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md rounded-full shadow-lg border border-white/20 mb-4">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span className="text-sm font-semibold text-slate-700">
                {products.length} Skills Available
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 bg-clip-text text-transparent leading-tight">
              Discover Student <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Skills</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Connect with talented students offering premium services. From design to development, find exactly what you need.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-16">
        {/* Enhanced Search Bar */}
        <div className="max-w-4xl mx-auto mb-12 animate-slide-up">
          <div className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border border-white/20 hover:shadow-3xl transition-all duration-300">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-grow group">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-indigo-600 transition-colors" />
                <Input 
                  placeholder="Search for skills, services, or talents..." 
                  className="pl-14 pr-4 h-16 bg-gradient-to-br from-slate-50 to-white border-2 border-slate-200 rounded-2xl text-lg focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:border-indigo-500 transition-all shadow-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-slate-100 transition-colors"
                  >
                    <X className="w-4 h-4 text-slate-400" />
                  </button>
                )}
              </div>
              <div className="flex gap-3">
                <div className="relative">
                  <Button 
                    variant="outline" 
                    className="h-16 rounded-2xl border-2 border-slate-200 px-6 font-semibold text-slate-700 hover:bg-slate-50 hover:border-indigo-300 transition-all shadow-sm"
                    onClick={() => setShowSortMenu(!showSortMenu)}
                  >
                    <Filter className="w-5 h-5 mr-2" />
                    {SORT_OPTIONS.find(opt => opt.value === sortBy)?.label || "Sort"}
                    <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${showSortMenu ? 'rotate-180' : ''}`} />
                  </Button>
                  {showSortMenu && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-fade-in">
                      {SORT_OPTIONS.map(option => (
                        <button
                          key={option.value}
                          onClick={() => {
                            setSortBy(option.value);
                            setShowSortMenu(false);
                          }}
                          className={`w-full text-left px-4 py-3 hover:bg-indigo-50 transition-colors ${
                            sortBy === option.value ? 'bg-indigo-50 text-indigo-600 font-semibold' : 'text-slate-700'
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Active Filters */}
            {(activeFilters > 0 || searchQuery) && (
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-200">
                <span className="text-sm text-slate-500 font-medium">Active filters:</span>
                {selectedCategory !== "All" && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                    {selectedCategory}
                    <button onClick={() => setSelectedCategory("All")} className="hover:bg-indigo-200 rounded-full p-0.5">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Category Pills */}
        <div className="max-w-7xl mx-auto mb-12 animate-slide-up-delay">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <SlidersHorizontal className="w-6 h-6 text-indigo-600" />
              Browse by Category
            </h2>
            <button 
              onClick={() => {setSelectedCategory("All"); setSearchQuery("");}}
              className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 hover:underline transition-all"
            >
              Clear all
            </button>
          </div>
          <div className="flex flex-wrap gap-3">
            {CATEGORIES.map((category, index) => {
              const Icon = category.icon;
              const count = category.name === "All" ? products.length : categoryStats[category.name] || 0;
              const isActive = selectedCategory === category.name;
              
              return (
                <button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`group relative flex items-center gap-3 px-6 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 ${
                    isActive
                      ? `bg-gradient-to-r ${category.activeClass} text-white shadow-xl scale-105`
                      : 'bg-white/80 backdrop-blur-sm text-slate-700 hover:bg-white border-2 border-slate-200 hover:border-indigo-300 shadow-md hover:shadow-xl'
                  }`}
                  style={{
                    animationDelay: `${index * 50}ms`,
                  }}
                >
                  <Icon className={`w-5 h-5 ${isActive ? category.iconClass : category.hoverClass}`} />
                  <span>{category.name}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    isActive 
                      ? category.badgeClass
                      : category.badgeHover
                  }`}>
                    {count}
                  </span>
                  {isActive && (
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/20 to-transparent animate-pulse"></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Section */}
        <div className="max-w-7xl mx-auto">
          {/* Results Header */}
          <div className="flex items-center justify-between mb-8 animate-fade-in">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold text-slate-900">
                {loading ? "Loading..." : `${totalProducts} ${totalProducts === 1 ? 'Service' : 'Services'} Found`}
              </h2>
              {!loading && totalProducts > 0 && (
                <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                  {selectedCategory !== "All" && `${categoryStats[selectedCategory] || 0} in ${selectedCategory}`}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-xl p-1 border border-slate-200 shadow-sm">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === "grid" 
                    ? "bg-indigo-600 text-white shadow-md" 
                    : "text-slate-500 hover:bg-slate-100"
                }`}
              >
                <Grid3x3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === "list" 
                    ? "bg-indigo-600 text-white shadow-md" 
                    : "text-slate-500 hover:bg-slate-100"
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Product Grid/List */}
          <main>
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100 animate-pulse">
                    <div className="h-48 bg-gradient-to-br from-slate-200 to-slate-300"></div>
                    <div className="p-5 space-y-4">
                      <div className="h-6 bg-slate-200 rounded w-3/4"></div>
                      <div className="h-4 bg-slate-200 rounded w-full"></div>
                      <div className="h-4 bg-slate-200 rounded w-2/3"></div>
                      <div className="h-10 bg-slate-200 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredAndSortedProducts.length > 0 ? (
              <div className={`grid gap-8 ${
                viewMode === "grid" 
                  ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" 
                  : "grid-cols-1"
              }`}>
                {filteredAndSortedProducts.map((product, index) => (
                  <div
                    key={product._id || product.id}
                    className="animate-fade-in-up"
                    style={{
                      animationDelay: `${index * 50}ms`,
                    }}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white/80 backdrop-blur-xl rounded-3xl border-2 border-dashed border-slate-300 shadow-xl animate-fade-in">
                <div className="bg-gradient-to-br from-slate-100 to-slate-200 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Search className="w-12 h-12 text-slate-400" />
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-3">No results found</h3>
                <p className="text-slate-500 text-lg mb-8 max-w-md mx-auto">
                  We couldn't find any skills matching your criteria. Try adjusting your filters or search terms.
                </p>
                <Button 
                  variant="outline" 
                  className="rounded-xl hover:bg-slate-50 border-2 border-slate-300 px-8 py-6 text-lg font-semibold transition-all hover:scale-105"
                  onClick={() => {
                    setSelectedCategory("All");
                    setSearchQuery("");
                  }}
                >
                  Clear all filters
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Explore;
