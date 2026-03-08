import React, { useState } from 'react';
import { Upload, X, Plus, Info, CheckCircle2 } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import Footer from '../components/ui/Footer';
import axios from 'axios';
import { ToastService } from '@/components/Toast';

const CATEGORIES = ["Design", "Development", "Tutoring", "Video", "Writing", "Music", "Business", "Other"];

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: 'Design',
  });
  const [images, setImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages(prev => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (images.length === 0) {
      ToastService.error("Please upload at least one image.");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const productData = {
        ...formData,
        images: images,
      };
      
      const response = await axios.post('http://localhost:5007/product/create', productData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.data.status === true || response.status === 201) {
        setIsSuccess(true);
        ToastService.success("Service published successfully!");
      } else {
        ToastService.error(response.data.message || "Failed to publish service.");
      }
    } catch (error) {
      console.error("Error creating product:", error);
      ToastService.error(error.response?.data?.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-slate-50 pt-24 flex items-center justify-center">
        <div className="bg-white p-12 rounded-3xl shadow-xl max-w-md w-full text-center border border-slate-100">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Service Published!</h2>
          <p className="text-slate-500 mb-8 text-lg">
            Your skill is now live and visible to all students on the platform.
          </p>
          <div className="flex flex-col gap-3">
            <Button className="h-14 rounded-2xl font-bold text-lg" onClick={() => setIsSuccess(false)}>
              Post Another
            </Button>
            <Button variant="outline" className="h-14 rounded-2xl font-bold text-lg" onClick={() => window.location.href = '/explore'}>
              View in Explore
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-24">
      <div className="container mx-auto px-4 pb-12">
        <div className="max-w-4xl mx-auto">
          <header className="mb-10">
            <h1 className="text-4xl font-extrabold text-slate-900 mb-2">Create a <span className="text-indigo-600">New Service</span></h1>
            <p className="text-slate-500 text-lg">Share your skills and start earning from your fellow students.</p>
          </header>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* General Info */}
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-6">
                <div className="flex items-center gap-2 text-indigo-600 mb-2">
                  <Info className="w-5 h-5" />
                  <span className="font-bold uppercase tracking-wider text-xs">General Information</span>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-slate-700 font-bold ml-1">Service Title</Label>
                  <Input 
                    id="title"
                    name="title"
                    placeholder="e.g. I will design a modern logo for your startup" 
                    className="h-14 bg-slate-50 border-slate-100 rounded-2xl px-5 text-lg"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                  <p className="text-xs text-slate-400 ml-1">Attract buyers with a clear, descriptive title.</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-slate-700 font-bold ml-1">Description</Label>
                  <Textarea 
                    id="description"
                    name="description"
                    placeholder="Describe what you offer in detail..." 
                    className="min-h-[200px] bg-slate-50 border-slate-100 rounded-2xl p-5 text-lg"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-slate-700 font-bold ml-1">Category</Label>
                    <select 
                      id="category"
                      name="category"
                      className="w-full h-14 bg-slate-50 border border-slate-100 rounded-2xl px-5 text-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      value={formData.category}
                      onChange={handleChange}
                    >
                      {CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price" className="text-slate-700 font-bold ml-1">Starting Price ($)</Label>
                    <Input 
                      id="price"
                      name="price"
                      type="number"
                      placeholder="0.00" 
                      className="h-14 bg-slate-50 border-slate-100 rounded-2xl px-5 text-lg"
                      value={formData.price}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Media Section */}
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-6">
                <div className="flex items-center gap-2 text-indigo-600 mb-2">
                  <Upload className="w-5 h-5" />
                  <span className="font-bold uppercase tracking-wider text-xs">Service Media</span>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {images.map((img, index) => (
                    <div key={index} className="relative aspect-square rounded-2xl overflow-hidden group">
                      <img src={img} alt="Preview" className="w-full h-full object-cover" />
                      <button 
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 bg-slate-900/50 hover:bg-red-500 text-white p-1.5 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <label className="aspect-square rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center cursor-pointer hover:border-indigo-400 hover:bg-indigo-50 transition-all text-slate-400 hover:text-indigo-600">
                    <Plus className="w-8 h-8 mb-2" />
                    <span className="text-xs font-bold font-semibold">Add Image</span>
                    <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                  </label>
                </div>
                <p className="text-xs text-slate-400">Add up to 5 images. The first image will be your cover.</p>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-28 space-y-6">
                <div className="bg-indigo-600 text-white p-8 rounded-3xl shadow-xl shadow-indigo-100">
                  <h3 className="text-xl font-bold mb-4">Ready to go?</h3>
                  <p className="text-indigo-100 mb-8 font-medium italic">
                    "High-quality services with clear descriptions and good images attract 3x more buyers."
                  </p>
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full h-14 bg-white text-indigo-600 hover:bg-slate-50 rounded-2xl text-lg font-extrabold shadow-lg shadow-black/10 flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <div className="w-6 h-6 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
                    ) : (
                      "Publish Service"
                    )}
                  </Button>
                </div>

                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                  <h4 className="font-bold text-slate-900 mb-4">Tips for Sellers</h4>
                  <ul className="space-y-4">
                    {[
                      "Be honest about your delivery time",
                      "Showcase your best previous work",
                      "Respond to messages promptly",
                      "Optimize for relevant keywords"
                    ].map((tip, i) => (
                      <li key={i} className="flex gap-3 text-sm text-slate-600">
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CreateProduct;
