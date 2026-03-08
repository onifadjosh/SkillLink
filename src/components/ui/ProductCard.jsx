import React from 'react';
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './button';

const ProductCard = ({ product }) => {
  const { title, description, price, ratings, reviewsCount, images, category } = product;
  const mainImage = images && images.length > 0 ? images[0] : 'https://images.unsplash.com/photo-1454165833767-027eeef140a0?q=80&w=2070&auto=format&fit=crop';
  console.log(product._id);
  

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col h-full">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={mainImage} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg text-xs font-semibold text-indigo-600 shadow-sm">
          {category}
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <Link to={`/product/${product._id}`} className="block">
            <h3 className="font-bold text-lg text-slate-900 line-clamp-1 group-hover:text-indigo-600 transition-colors">
              {title}
            </h3>
          </Link>
        </div>
        
        <p className="text-slate-500 text-sm line-clamp-2 mb-4 flex-grow">
          {description}
        </p>
        
        <div className="flex items-center gap-1 mb-4">
          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          <span className="text-sm font-bold text-slate-700">{ratings || 0}</span>
          <span className="text-xs text-slate-400">({reviewsCount || 0} reviews)</span>
        </div>
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
          <div className="flex flex-col">
            <span className="text-xs text-slate-400 font-medium">Starting from</span>
            <span className="text-xl font-extrabold text-slate-900">${price}</span>
          </div>
          <Link to={`/product/${product._id}`}>
            <Button size="sm" className="rounded-xl px-4 font-semibold shadow-indigo-200/50 shadow-lg">
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
