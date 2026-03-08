import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import axios from 'axios';
import { ToastService } from '@/components/Toast';
import { Loader2, Camera, ArrowLeft } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Footer from '../components/ui/Footer';

const EditProfile = () => {
    const { updateUser } = useAuth();
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        about: "",
        location: "",
        skills: "",
        profilePicture: ""
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true);
                const res = await axios.get('http://localhost:5007/user/profile', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const user = res.data.user || res.data.data || res.data;
                setFormData({
                    fullname: user.fullname || "",
                    email: user.email || "",
                    about: user.about || "",
                    location: user.location || "",
                    skills: Array.isArray(user.skills) ? user.skills.join(', ') : (user.skills || ""),
                    profilePicture: user.profilePicture || ""
                });
                setImagePreview(user.profilePicture);
            } catch (error) {
                console.error("Error fetching profile:", error);
                ToastService.error("Failed to load profile data.");
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files && files[0]) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
                setFormData(prev => ({ ...prev, profilePicture: reader.result }));
            };
            reader.readAsDataURL(files[0]);
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setSubmitting(true);
            const dataToSubmit = {
                ...formData,
                skills: formData.skills.split(',').map(s => s.trim()).filter(s => s !== "")
            };
            await axios.post('http://localhost:5007/user/update', dataToSubmit, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            updateUser(dataToSubmit);
            ToastService.success("Profile updated successfully!");
            navigate('/profile');
        } catch (error) {
            console.error("Update Error:", error);
            ToastService.error("Failed to update profile.");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 pt-24">
            <div className="max-w-3xl mx-auto px-4 pb-12">
                <Link to="/profile" className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold mb-6 transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Profile
                </Link>

                <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
                    <div className="p-8 md:p-12">
                        <h2 className="text-3xl font-extrabold text-slate-900 mb-8">Edit <span className="text-indigo-600">Profile</span></h2>
                        
                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Profile Picture Upload */}
                            <div className="flex flex-col items-center sm:items-start">
                                <Label className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-4">Profile Photo</Label>
                                <div className="relative group">
                                    <div className="w-32 h-32 rounded-[2rem] bg-slate-100 flex items-center justify-center overflow-hidden border-4 border-white shadow-xl">
                                        {imagePreview ? (
                                            <img src={imagePreview} alt="Profile" className="w-full h-full object-cover" />
                                        ) : (
                                            <Camera className="w-10 h-10 text-slate-300" />
                                        )}
                                    </div>
                                    <label className="absolute bottom-2 right-2 bg-indigo-600 text-white p-2.5 rounded-xl border-4 border-white shadow-lg cursor-pointer transform hover:scale-110 transition-transform active:scale-95">
                                        <Camera className="w-5 h-5" />
                                        <input type="file" className="hidden" name="profilePicture" accept="image/*" onChange={handleChange} />
                                    </label>
                                </div>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label className="text-slate-700 font-bold">Full Name</Label>
                                    <Input
                                        className="h-12 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-indigo-500 font-medium"
                                        name="fullname"
                                        value={formData.fullname}
                                        onChange={handleChange}
                                        placeholder="John Doe"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-slate-700 font-bold">Email Address</Label>
                                    <Input
                                        className="h-12 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-indigo-500 font-medium opacity-70"
                                        name="email"
                                        value={formData.email}
                                        disabled
                                        placeholder="email@university.edu"
                                    />
                                    <p className="text-[10px] text-slate-400 font-bold uppercase">Email cannot be changed</p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-slate-700 font-bold">About / Bio</Label>
                                <Textarea
                                    className="min-h-[120px] rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-indigo-500 font-medium p-4 resize-none"
                                    name="about"
                                    value={formData.about}
                                    onChange={handleChange}
                                    placeholder="Tell the community about yourself, your skills, and what you offer..."
                                />
                            </div>

                            <div className="grid sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label className="text-slate-700 font-bold">Location</Label>
                                    <Input
                                        className="h-12 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-indigo-500 font-medium"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        placeholder="e.g. Hall 4, Main Campus"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-slate-700 font-bold">Skills (Comma separated)</Label>
                                    <Input
                                        className="h-12 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-indigo-500 font-medium"
                                        name="skills"
                                        value={formData.skills}
                                        onChange={handleChange}
                                        placeholder="UI/UX, React, Writing, Cooking..."
                                    />
                                </div>
                            </div>

                            <div className="pt-6">
                                <Button 
                                    type="submit" 
                                    disabled={submitting}
                                    className="w-full h-14 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-lg shadow-xl shadow-indigo-100 flex items-center justify-center gap-3 transition-all active:scale-[0.98]"
                                >
                                    {submitting ? (
                                        <>
                                            <Loader2 className="w-6 h-6 animate-spin" />
                                            Saving Changes...
                                        </>
                                    ) : (
                                        'Update Profile'
                                    )}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default EditProfile;