import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Search, Send, Phone, Video, Info, MoreVertical, CheckCircle2, Paperclip, Smile, MessageSquare } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import Footer from '../components/ui/Footer';
import axios from 'axios';
import { Loader2 } from 'lucide-react';

const MOCK_CHATS = [
  { id: 1, name: 'Alex Johnson', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2080&auto=format&fit=crop', lastMessage: 'Can you deliver by Friday?', time: '2m ago', unread: 2, status: 'Online' },
  { id: 2, name: 'Sarah Smith', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop', lastMessage: 'The design looks great!', time: '1h ago', unread: 0, status: 'Offline' },
  { id: 3, name: 'Michael Chen', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1974&auto=format&fit=crop', lastMessage: 'I have a few questions about the code.', time: '3h ago', unread: 0, status: 'Online' },
  { id: 4, name: 'Jessica Williams', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop', lastMessage: 'Sent you the requirements document.', time: 'Yesterday', unread: 0, status: 'Offline' },
];

const MOCK_MESSAGES = [
  { id: 1, sender: 'Alex Johnson', content: 'Hi! I saw your service for UI/UX design.', time: '10:05 AM', type: 'received' },
  { id: 2, sender: 'You', content: 'Hello Alex! Yes, how can I help you today?', time: '10:07 AM', type: 'sent' },
  { id: 3, sender: 'Alex Johnson', content: 'I need a mobile app designed for a delivery service. Something clean and modern.', time: '10:10 AM', type: 'received' },
  { id: 4, sender: 'Alex Johnson', content: 'Can you deliver by Friday?', time: '10:11 AM', type: 'received' },
];

const Inbox = () => {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [loadingChats, setLoadingChats] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const myId = user._id || user.id;

  console.log("Current User ID (myId):", myId);
  console.log("Current User Object:", user);

  const fetchChats = async () => {
    try {
      setLoadingChats(true);
      const response = await axios.get("http://localhost:5007/message/list", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log("Fetch Chats Response Data:", response.data);
      const chatData = response.data.chat || response.data.chats || response.data.data || response.data;
      console.log("Extracted Chat Data:", chatData);
      setChats(Array.isArray(chatData) ? chatData : []);
    } catch (error) {
      console.error("Error fetching chats:", error);
    } finally {
      setLoadingChats(false);
    }
  };

  const fetchMessages = async (otherUserId) => {
    try {
      setLoadingMessages(true);
      const response = await axios.get(`http://localhost:5007/message/${otherUserId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log("Fetch Messages Response Data:", response.data);
      const messageData = response.data.chat || response.data.messages || response.data.data || response.data;
      console.log("Extracted Message Data:", messageData);
      setMessages(Array.isArray(messageData) ? messageData : []);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoadingMessages(false);
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  useEffect(() => {
    const incomingSeller = location.state?.seller;
    console.log("Incoming Seller from Location State:", incomingSeller);
    
    if (incomingSeller) {
      const targetId = incomingSeller._id || incomingSeller.id;
      const existingChat = Array.isArray(chats) ? chats.find(chat => {
        // Check participants array
        if (chat.participants?.some(p => (p._id || p.id) === targetId)) return true;
        // Check senderId/receiverId (for message-based results)
        const sId = chat.senderId?._id || chat.senderId?.id || chat.senderId;
        const rId = chat.receiverId?._id || chat.receiverId?.id || chat.receiverId;
        return sId === targetId || rId === targetId;
      }) : null;
      
      console.log("Existing Chat Found:", existingChat);

      if (existingChat) {
        setSelectedChat(existingChat);
      } else if (!loadingChats) {
        console.log("Creating Virtual Chat for:", incomingSeller.fullname);
        const virtualChat = {
          _id: 'virtual-' + (incomingSeller._id || incomingSeller.id),
          participants: [user, incomingSeller],
          isVirtual: true,
          fullname: incomingSeller.fullname,
          profilePicture: incomingSeller.profilePicture
        };
        setSelectedChat(virtualChat);
      }
    }
  }, [location.state, chats, loadingChats]);

  useEffect(() => {
    if (selectedChat) {
      const otherUserId = getOtherUserId(selectedChat);
      console.log("Determined otherUserId for fetchMessages:", otherUserId);
      if (otherUserId && otherUserId !== 'undefined') fetchMessages(otherUserId);
    }
  }, [selectedChat]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim() || !selectedChat) return;

    const otherUserId = getOtherUserId(selectedChat);

    if (!otherUserId || otherUserId === 'undefined') {
      console.error("Cannot send message: otherUserId is invalid", otherUserId);
      return;
    }

    console.log("Sending message to:", otherUserId, "Content:", message);

    try {
      const response = await axios.post('http://localhost:5007/message/send', {
        receiverId: otherUserId,
        content: message
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      console.log("Send Message Response Data:", response.data);
      const newMessage = response.data.message || response.data.chat?.[0] || response.data.data || response.data;
      console.log("New Message to Append:", newMessage);
      
      if (newMessage && (newMessage.content || newMessage.chat)) {
        setMessages(prev => [...prev, newMessage]);
        setMessage('');
      
        if (selectedChat.isVirtual) {
          fetchChats();
        } else {
          // Update last message in chat list locally
          setChats(prev => prev.map(c => {
            if (c._id === selectedChat._id || c.id === selectedChat.id) {
              return { ...c, lastMessage: message, time: 'Just now' };
            }
            return c;
          }));
        }
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const getOtherUser = (chat) => {
    if (!chat) return null;
    if (chat.participants) return chat.participants.find(p => (p._id || p.id) !== myId);
    if (chat.senderId && chat.receiverId) {
      const sId = (chat.senderId?._id || chat.senderId?.id || chat.senderId);
      return (sId && sId !== myId) ? chat.senderId : chat.receiverId;
    }
    return chat;
  };

  const getOtherUserId = (chat) => {
    const otherUser = getOtherUser(chat);
    if (!otherUser) return null;
    
    // Return ID if it's a string, otherwise extract from object
    if (typeof otherUser === 'string') return otherUser;
    const id = otherUser._id || otherUser.id;
    if (id) return id;
    
    // Fallback to chat properties if otherUser detection was fuzzy
    return chat._id || chat.id || null;
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-20">
      <div className="container mx-auto px-4 h-[calc(100vh-100px)]">
        <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 h-full overflow-hidden flex">
          
          {/* Sidebar - Chat List */}
          <div className="w-full md:w-80 lg:w-96 border-r border-slate-100 flex flex-col h-full bg-slate-50/30">
            <div className="p-6">
              <h2 className="text-2xl font-extrabold text-slate-900 mb-6">Messages</h2>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <Input 
                  placeholder="Search messages..." 
                  className="pl-12 h-12 bg-white border-slate-100 rounded-xl"
                />
              </div>
            </div>

            <div className="flex-grow overflow-y-auto px-4 pb-6">
              {loadingChats ? (
                <div className="flex justify-center py-10">
                  <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
                </div>
              ) : chats.length > 0 ? (
                chats.map((chat) => {
                  const otherUser = getOtherUser(chat);
                  const isSelected = selectedChat && (selectedChat._id === chat._id || selectedChat.id === chat.id || 
                    (selectedChat.isVirtual && selectedChat._id === 'virtual-' + (otherUser?._id || otherUser?.id)));
                  
                  return (
                    <button
                      key={chat._id || chat.id}
                      onClick={() => setSelectedChat(chat)}
                      className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all mb-2 ${
                        isSelected 
                          ? 'bg-white shadow-md border border-slate-100' 
                          : 'hover:bg-slate-100/50'
                      }`}
                    >
                      <div className="relative">
                        <img 
                          src={otherUser.profilePicture || otherUser.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2080&auto=format&fit=crop"} 
                          alt="" 
                          className="w-14 h-14 rounded-2xl object-cover" 
                        />
                        {chat.status === 'Online' && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                        )}
                      </div>
                      <div className="flex-grow text-left">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-bold text-slate-900 truncate w-32">{otherUser.fullname || otherUser.name}</span>
                          <span className="text-[10px] font-bold text-slate-400 uppercase">{chat.time || chat.updatedAt?.slice(0, 10)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className={`text-sm truncate w-40 ${chat.unread > 0 ? 'text-indigo-600 font-bold' : 'text-slate-500'}`}>
                            {chat.lastMessage || 'No messages yet'}
                          </p>
                          {chat.unread > 0 && (
                            <span className="bg-indigo-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg shadow-indigo-100">
                              {chat.unread}
                            </span>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })
              ) : (
                <div className="text-center py-10">
                  <p className="text-slate-400 text-sm">No conversations yet.</p>
                </div>
              )}
            </div>
          </div>

          {/* Main Chat Area */}
          <div className="hidden md:flex flex-grow flex-col h-full bg-white">
            {selectedChat ? (
              <>
                {/* Chat Header */}
                <header className="p-4 border-b border-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img 
                      src={getOtherUser(selectedChat)?.profilePicture || getOtherUser(selectedChat)?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2080&auto=format&fit=crop"} 
                      alt="" 
                      className="w-12 h-12 rounded-xl object-cover" 
                    />
                    <div>
                      <div className="font-bold text-slate-900">
                        {getOtherUser(selectedChat)?.fullname || getOtherUser(selectedChat)?.name}
                      </div>
                      <div className={`text-xs font-bold ${selectedChat.status === 'Online' ? 'text-green-500' : 'text-slate-400'}`}>
                        {selectedChat.status || 'Active'}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="h-10 w-10 p-0 rounded-xl border-slate-100 hover:bg-slate-50">
                      <Phone className="w-4 h-4 text-slate-600" />
                    </Button>
                    <Button variant="outline" size="sm" className="h-10 w-10 p-0 rounded-xl border-slate-100 hover:bg-slate-50">
                      <Video className="w-4 h-4 text-slate-600" />
                    </Button>
                    <Button variant="outline" size="sm" className="h-10 w-10 p-0 rounded-xl border-slate-100 hover:bg-slate-50">
                      <Info className="w-4 h-4 text-slate-600" />
                    </Button>
                    <Button variant="outline" size="sm" className="h-10 w-10 p-0 rounded-xl border-slate-100 hover:bg-slate-50">
                      <MoreVertical className="w-4 h-4 text-slate-600" />
                    </Button>
                  </div>
                </header>

                {/* Messages */}
                <div className="flex-grow overflow-y-auto p-8 space-y-6">
                  {loadingMessages ? (
                    <div className="flex justify-center py-10">
                      <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
                    </div>
                  ) : messages.length > 0 ? (
                    messages.map((msg) => {
                      const isSentByMe = (msg.senderId?._id || msg.senderId?.id || msg.senderId) === myId;
                      return (
                        <div key={msg._id || msg.id} className={`flex ${isSentByMe ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[70%] group ${isSentByMe ? 'items-end' : 'items-start'} flex flex-col`}>
                            <div className={`p-4 rounded-[1.5rem] font-medium shadow-sm leading-relaxed ${
                              isSentByMe 
                                ? 'bg-indigo-600 text-white rounded-tr-none' 
                                : 'bg-slate-100 text-slate-800 rounded-tl-none'
                            }`}>
                              {msg.content}
                            </div>
                            <div className="flex items-center gap-2 mt-1 px-2">
                              <span className="text-[10px] font-bold text-slate-400 uppercase">{new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                              {isSentByMe && <CheckCircle2 className="w-3 h-3 text-indigo-400" />}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center py-10">
                      <p className="text-slate-400">No messages yet. Say hello!</p>
                    </div>
                  )}
                </div>

                {/* Input Area */}
                <footer className="p-6 border-t border-slate-50 bg-slate-50/30">
                  <form 
                    onSubmit={handleSendMessage}
                    className="flex items-center gap-4 bg-white p-2 border border-slate-100 rounded-2xl shadow-lg focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all"
                  >
                    <div className="flex items-center gap-1 pl-2">
                      <button type="button" className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
                        <Paperclip className="w-5 h-5" />
                      </button>
                      <button type="button" className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
                        <Smile className="w-5 h-5" />
                      </button>
                    </div>
                    <Input 
                      placeholder="Write your message..." 
                      className="border-none bg-transparent h-12 text-slate-700 placeholder:text-slate-400 focus-visible:ring-0 text-lg flex-grow"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                    <Button type="submit" className="h-12 w-12 p-0 rounded-xl shadow-lg shadow-indigo-100">
                      <Send className="w-5 h-5" />
                    </Button>
                  </form>
                </footer>
              </>
            ) : (
              <div className="flex-grow flex flex-col items-center justify-center p-12 text-center">
                 <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                   <MessageSquare className="w-12 h-12 text-slate-200" />
                 </div>
                 <h3 className="text-2xl font-bold text-slate-900 mb-2">Select a conversation</h3>
                 <p className="text-slate-500 max-w-sm font-medium">Choose a contact from the list on the left to start messaging.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inbox;
