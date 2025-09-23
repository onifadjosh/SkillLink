import React, { useState } from 'react'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";


const EditProfile = () => {
    const [formData, setFormData] = useState({
        profilePicture:  'https://th.bing.com/th/id/OIP.7O4_GREtLbxqPdJCTmfatQHaHa?w=184&h=183&c=7&r=0&o=7&pid=1.7&rm=3',
        name: "",
        email: "hello@example.com",
        bio: "Frontend Developer | React | Tailwind",
        location: "Lagos, Nigeria",
        password: "",
        linkedin: "",
        github: "",
    });
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            setFormData({ ...formData, [name]: URL.createObjectURL(files[0]) });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Updated Profile:", formData);
        // 🔥 You can connect this to your backend API here
    };

    return (
        <div className="max-w-2xl mx-auto p-6 mt-15">
            <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>
            {/* <img src={formData.profilePicture} className="w-50 h-50 rounded-full mb-3 object-cover" alt="Profile picture" /> */}
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Profile Picture */}
                <div>
                    <Label className="mb-2 block">Profile Picture</Label>
                    {formData.profilePicture && (
                        <img
                            src={formData.profilePicture}
                            alt="Profile"
                            className="w-20 h-20 rounded-full mb-2 object-cover"
                        />
                    )}
                    <Input type="file" name="profilePicture" onChange={handleChange} />
                </div>

                {/* Name */}
                <div>
                    <Label>Name</Label>
                    <Input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>

                {/* Email */}
                <div>
                    <Label>Email</Label>
                    <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>

                {/* Bio */}
                <div>
                    <Label>Bio</Label>
                    <Textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                    />
                </div>

                {/* Location */}
                <div>
                    <Label>Location</Label>
                    <Input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                    />
                </div>

                {/* Password */}
                <div>
                    <Label>New Password</Label>
                    <Input
                        type="password"
                        name="password"
                        placeholder="••••••••"
                        onChange={handleChange}
                    />
                </div>

                {/* Social Links */}
                <div>
                    <Label>LinkedIn</Label>
                    <Input
                        type="url"
                        name="linkedin"
                        value={formData.linkedin}
                        onChange={handleChange}
                        placeholder="https://linkedin.com/in/username"
                    />
                </div>

                <div>
                    <Label>GitHub</Label>
                    <Input
                        type="url"
                        name="github"
                        value={formData.github}
                        onChange={handleChange}
                        placeholder="https://github.com/username"
                    />
                </div>

                {/* Submit */}
                <Button type="submit" className="w-full">
                    Save Changes
                </Button>
            </form>
        </div>
    );
}
export default EditProfile