import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Search, Send, Phone, Video, Info, MoreVertical, CheckCircle2, Paperclip, Smile, MessageSquare } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import Footer from '../components/ui/Footer';
import axios from 'axios';
import { Loader2 } from 'lucide-react';


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
  const messagesEndRef = useRef(null);

  console.log("Current User ID (myId):", myId);
  console.log("Current User Object:", user);

  const fetchChats = async (silent = false) => {
    try {
      if (!silent) setLoadingChats(true);
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
      if (!silent) setLoadingChats(false);
    }
  };

  const fetchMessages = async (otherUserId, silent = false) => {
    try {
      if (!silent) setLoadingMessages(true);
      const response = await axios.get(`http://localhost:5007/message/${otherUserId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log("Fetch Messages Response Data:", response.data);
      const messageData = response.data.chat || response.data.messages || response.data.data || response.data;
      console.log("Extracted Message Data:", messageData);
      const sortedMessages = Array.isArray(messageData) 
        ? [...messageData].sort((a, b) => new Date(a.createdAt || a.time).getTime() - new Date(b.createdAt || b.time).getTime()) 
        : [];
      setMessages(sortedMessages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      if (!silent) setLoadingMessages(false);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchChats();

    // Set up 30-second polling for background updates
    const pollInterval = setInterval(() => {
      console.log("Running background poll...");
      fetchChats(true); // Silent update
      
      if (selectedChat) {
        const otherUserId = getOtherUserId(selectedChat);
        if (otherUserId && otherUserId !== 'undefined') {
          fetchMessages(otherUserId, true); // Silent update
        }
      }
    }, 30000);

    return () => clearInterval(pollInterval);
  }, [selectedChat]); // Re-run when selectedChat changes to ensure we poll the right messages

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
      if (otherUserId && otherUserId !== 'undefined') {
        fetchMessages(otherUserId);
        
        // Optimistically clear unread count for the selected chat
        setChats(prev => prev.map(c => {
          const chatOtherId = getOtherUserId(c);
          if (chatOtherId && String(chatOtherId) === String(otherUserId)) {
            return { 
              ...c, 
              unreadCount: 0, 
              unread: 0, 
              unread_count: 0, 
              unreadMessages: 0, 
              newMessages: 0, 
              totalUnread: 0, 
              count: 0 
            };
          }
          return c;
        }));
      }
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

    const messageToSend = message;
    setMessage(''); // Clear input immediately for better UX

    console.log("Sending message to:", otherUserId, "Content:", messageToSend);

    try {
      const response = await axios.post('http://localhost:5007/message/send', {
        receiverId: otherUserId,
        content: messageToSend
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      console.log("Send Message Response Data:", response.data);
      
      // Update local state and refetch in background
      const optimisticMsg = {
        _id: 'temp-' + Date.now(),
        senderId: myId,
        content: messageToSend,
        createdAt: new Date().toISOString()
      };
      
      setMessages(prev => {
        const newMessages = [...prev, optimisticMsg];
        return newMessages.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      });
      
      fetchMessages(otherUserId, true);
      
      if (selectedChat.isVirtual) {
        fetchChats();
        // If it was a virtual chat, it might now have a real ID after the first message
        // The fetchChats call will update the list, and the next selection will handle it
      } else {
        // Update last message in chat list locally
        setChats(prev => prev.map(c => {
          const chatOtherId = getOtherUserId(c);
          const selectedOtherId = getOtherUserId(selectedChat);
          
          if (chatOtherId && selectedOtherId && chatOtherId === selectedOtherId) {
            return { ...c, lastMessage: `You: ${messageToSend}`, time: 'Just now' };
          }
          return c;
        }));
      }
    } catch (error) {
      console.error("Error sending message:", error);
      // Restore message if send failed
      setMessage(messageToSend);
    }
  };

  const getOtherUser = (chat) => {
    if (!chat) return null;
    if (chat.otherUser) return chat.otherUser; // New backend format
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
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-extrabold text-slate-900">Messages</h2>
                {(() => {
                  const total = chats.reduce((acc, c) => acc + (c.unread || c.unreadCount || c.unread_count || c.unreadMessages || c.newMessages || c.totalUnread || c.count || 0), 0);
                  return total > 0 && (
                    <span className="bg-indigo-600 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-lg shadow-indigo-100">
                      {total}
                    </span>
                  );
                })()}
              </div>
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
                  const unreadCount = chat.unread || chat.unreadCount || chat.unread_count || chat.unreadMessages || chat.newMessages || chat.totalUnread || chat.count || 0;
                  
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
                          <p className={`text-sm truncate w-40 ${unreadCount > 0 ? 'text-indigo-600 font-bold' : 'text-slate-500'}`}>
                            {(() => {
                              // Use backend provided lastMessage if available
                              const content = chat.lastMessage || chat.latestMessage || chat.message || chat.content;
                              
                              if (!content) return 'No messages yet';
                              
                              const isMe = chat.lastSenderId === myId || chat.senderId === myId;
                              const firstName = otherUser.fullname?.split(' ')[0] || otherUser.name?.split(' ')[0] || 'User';
                              const senderPrefix = isMe ? 'You' : firstName;

                              if (content.startsWith('You:') || content.startsWith(`${firstName}:`)) {
                                return content;
                              }
                              
                              return `${senderPrefix}: ${content}`;
                            })()}
                          </p>
                          {unreadCount > 0 && (
                            <span className="bg-indigo-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg shadow-indigo-100">
                              {unreadCount}
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
                              <span className="text-[10px] font-bold text-slate-400 uppercase">
                                {(() => {
                                  try {
                                    const date = new Date(msg.createdAt || msg.time);
                                    if (isNaN(date.getTime())) return msg.time || '';
                                    return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
                                  } catch (e) {
                                    return msg.time || '';
                                  }
                                })()}
                              </span>
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
                  <div ref={messagesEndRef} />
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
