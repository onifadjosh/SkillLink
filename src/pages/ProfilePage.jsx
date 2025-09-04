import { Activity, Bookmark } from 'lucide-react'
import React, { useState } from 'react'
import { MdEdit, MdDelete } from "react-icons/md"
import { Link } from 'react-router-dom'

const ProfilePage = () => {
    const [activeTab, setActiveTab] = useState("overview")
    const [overview, setOverview] = useState([])
    const [saved, setSaved] = useState([])
    const [activity, setActivity] = useState([])

    const posts = [
        //should be replace with real title/content from user
        { id: 1, title: "How to learn React fast", content: "Some content..." },
        { id: 2, title: "Tips for freelancing", content: "Some content..." },
    ]
    return (
        <div className="max-w-5xl mx-auto p-6">
            <div className="flex items-center space-x-6 mt-20">
                <img
                    src="./public/skillLinkLogo.jpg"
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover"
                />
                <div>
                    <h2 className="text-2xl font-bold">John Doe</h2>
                    <p className="text-gray-500 mb-3">Frontend Developer | React Enthusiast</p>
                    <Link to={'/editprofile'} className=" px-2.5 text-white py-2 hover:bg-blue-400 rounded-md bg-blue-500">Edit Profile</Link>
                </div>
            </div>

            <div className="mt-6 border-b border-gray-200 flex space-x-6">
                <button
                    onClick={() => setActiveTab("overview")}
                    className={`pb-2 ${activeTab === "overview" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600"
                        }`}
                >
                    Overview
                </button>
                <button
                    onClick={() => setActiveTab("posts")}
                    className={`pb-2 ${activeTab === "posts" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600"
                        }`}
                >
                    Posts
                </button>
                <button
                    onClick={() => setActiveTab("saved")}
                    title='Bookmark'
                    className={`pb-2 ${activeTab === "saved" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600"
                        }`}
                >
                    <Bookmark />
                </button>
                <button
                    //interaction history (comments, likes, etc.)
                    onClick={() => setActiveTab("activity")}
                    title='Activity'
                    className={`pb-2 ${activeTab === "activity" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600"
                        }`}
                >
                    <Activity />
                </button>
                <button
                    onClick={() => setActiveTab("settings")}
                    className={`pb-2 ${activeTab === "settings" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600"
                        }`}
                >
                    Settings
                </button>
            </div>

            <div className="mt-6">
                {activeTab === "overview" && (overview ?
                    <div>
                        <h3 className="text-lg font-semibold">Profile Overview</h3>
                        <p className="text-gray-600 mt-2">
                            This section can display profile stats (posts, followers, reviews, etc.).
                        </p>
                    </div> : 'Nothing to see yet...'
                )}

                {activeTab === "posts" && (
                    <div>
                        <h3 className="text-lg font-semibold">Your Posts</h3>
                        <div className="mt-4 space-y-4">
                            {posts.map((post) => (
                                // id with index maybe
                                <div key={post.id} className="p-4 border rounded-lg flex justify-between items-start">                                     <div>
                                    <h4 className="font-semibold">{post.title}</h4>
                                    <p className="text-gray-600 text-sm">{post.content}</p>
                                </div>
                                    <div className="flex space-x-3">
                                        <button title='Edit' className="text-blue-600 hover:text-blue-800">
                                            <MdEdit size={20} />
                                        </button>
                                        <button title='Delete' className="text-red-600 hover:text-red-800">
                                            <MdDelete size={20} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="mt-4 px-3.5 text-white py-1.5 hover:bg-blue-400 rounded-md bg-blue-500">+ New Post</button>
                    </div>
                )}

                {activeTab === "saved" && (saved ?
                    <div>
                        <h3 className="text-lg font-semibold">Profile Overview</h3>
                        <p className="text-gray-600 mt-2">
                            This displays saved posts/items
                        </p>
                    </div> : 'Nothing to see yet...'
                )}

                {activeTab === "activity" && (activity ?
                    <div>
                        <h3 className="text-lg font-semibold">Profile Overview</h3>
                        <p className="text-gray-600 mt-2">
                            This shows recent interactions
                        </p>
                    </div> : 'Nothing to see yet...'
                )}

                {activeTab === "settings" && (
                    <div>
                        <h3 className="text-lg font-semibold">Account Settings</h3>
                        <form className="mt-4 space-y-4 max-w-md">
                            <div>
                                <label className="block text-sm font-medium">Email</label>
                                <input
                                    type="email"
                                    defaultValue="johndoe@example.com" //user.email
                                    className="w-full mt-1 px-3 py-2 border rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Password</label>
                                <input
                                    type="password"
                                    placeholder="********"
                                    className="w-full mt-1 px-3 py-2 border rounded-md"
                                />
                            </div>
                            <div className="flex flex-wrap gap-3">
                                <button className="px-3.5 text-white py-1.5 hover:bg-blue-400 rounded-md bg-blue-500">Save Changes</button>
                                <button className="px-3.5 text-white py-1.5 hover:bg-red-400 rounded-md bg-red-500">Delete Account</button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProfilePage