import React, { useState, useEffect } from 'react';
import { Button } from './button';
import { MdMenu, MdClose } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, User as UserIcon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate('/login');
  };

  return (
    <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 px-4">
        <div className="flex gap-3.5 justify-between items-center h-16">
          <Link to={'/'} className="text-2xl font-bold text-blue-600">
            <img src="./skillLinkLogo.png" alt="SkillLink" width={100} />
          </Link>

          <div className="hidden md:flex flex-grow justify-center">
            <div className="flex items-center gap-8">
              <Link to="/" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Home</Link>
              <Link to="/explore" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Explore</Link>
              
              {user && (
                <>
                  <Link to="/dashboard" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Dashboard</Link>
                  <Link to="/my-services" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Manage</Link>
                  <Link to="/inbox" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Inbox</Link>
                </>
              )}
              
              {user?.role === 'admin' && (
                <Link to="/admin" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Admin</Link>
              )}
            </div>
          </div>

          <div className="hidden md:flex">
            <div className="flex justify-center items-center gap-4">
              {user ? (
                <div className="flex items-center gap-4">
                  <Link to="/profile" className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 overflow-hidden">
                      {user.profilePicture ? (
                        <img src={user.profilePicture} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <UserIcon className="w-6 h-6" />
                      )}
                    </div>
                    <span className="font-bold text-slate-700">{user.fullname || 'Profile'}</span>
                  </Link>
                  <Button 
                    onClick={handleLogout}
                    variant="ghost" 
                    className="text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl"
                  >
                    <LogOut className="w-5 h-5" />
                  </Button>
                </div>
              ) : (
                <>
                  <Link to={'/login'} className='bg-blue-600 text-white hover:bg-blue-700 py-2.5 px-6 rounded-xl font-semibold shadow-lg shadow-blue-100 transition-all active:scale-95' >Log In</Link>
                  <Link to={'/register'} className='border-blue-200 border-2 rounded-xl hover:bg-blue-50 text-slate-700 py-2.5 px-6 font-semibold transition-all active:scale-95' >Get Started</Link>
                </>
              )}
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 focus:outline-none"
            >
              {isOpen ? <MdClose size={28} /> : <MdMenu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white px-4 py-6 space-y-4 shadow-xl border-t border-slate-50">
          <div className="flex flex-col gap-2">
            <Link to="/" onClick={() => setIsOpen(false)} className="px-4 py-3 rounded-xl text-slate-600 font-medium hover:bg-slate-50">Home</Link>
            <Link to="/explore" onClick={() => setIsOpen(false)} className="px-4 py-3 rounded-xl text-slate-600 font-medium hover:bg-slate-50">Explore</Link>
            
            {user && (
              <>
                <Link to="/dashboard" onClick={() => setIsOpen(false)} className="px-4 py-3 rounded-xl text-slate-600 font-medium hover:bg-slate-50">Dashboard</Link>
                <Link to="/my-services" onClick={() => setIsOpen(false)} className="px-4 py-3 rounded-xl text-slate-600 font-medium hover:bg-slate-50">My Services</Link>
                <Link to="/inbox" onClick={() => setIsOpen(false)} className="px-4 py-3 rounded-xl text-slate-600 font-medium hover:bg-slate-50">Inbox</Link>
                <Link to="/profile" onClick={() => setIsOpen(false)} className="px-4 py-3 rounded-xl text-slate-600 font-medium hover:bg-slate-50">Profile</Link>
              </>
            )}
            
            {user?.role === 'admin' && (
              <Link to="/admin" onClick={() => setIsOpen(false)} className="px-4 py-3 rounded-xl text-slate-600 font-medium hover:bg-slate-50">Admin Panel</Link>
            )}
          </div>
          <div className="flex flex-col gap-3 w-full pt-4 border-t border-slate-50">
            {user ? (
              <Button 
                onClick={() => { handleLogout(); setIsOpen(false); }}
                className='bg-red-500 text-white text-center hover:bg-red-600 py-3 px-5 rounded-xl font-bold'
              >
                Log Out
              </Button>
            ) : (
              <>
                <Link to={'/login'} onClick={() => setIsOpen(false)} className='bg-blue-600 text-white text-center hover:bg-blue-700 py-3 px-5 rounded-xl font-bold shadow-lg shadow-blue-100' >Log In</Link>
                <Link to={'/register'} onClick={() => setIsOpen(false)} className='border-slate-200 border-2 text-center rounded-xl py-3 px-4 font-bold text-slate-700' >Get Started</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;