import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const { organiserToken, organiserName, logoutOrganiser, token, setToken, setShowLogin, user, setUser } = useContext(AppContext);
  const navigate = useNavigate();
const location = useLocation();
  const handleSearch = (e) => {
    if(e.key === 'Enter' && searchInput.trim() !== '') {
      navigate('/all-campaigns?search=' + encodeURIComponent(searchInput.trim()));
    }
  };

  const handleLogin = () => {
    setShowLogin(true);
    navigate("/login")
  }

  const handleLogout = () => {
    if (organiserToken) {
      logoutOrganiser();
      navigate("/",{replace:true});
    } else if (token) {
      localStorage.removeItem("userToken");
      localStorage.removeItem("userName");
      setToken(null);
      setUser('');
      navigate("/",{replace:true});
    }
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-[#ffffff]/80 backdrop-blur-md">
      <div className="w-full flex h-16 items-center justify-between gap-4 px-4">

        {/* Logo */}
        <Link
          to="/"
          className="flex-shrink-0 text-xl font-bold text-[#1A9E83]"
        >
          FundFlow
        </Link>

        {/* Search Bar */}
        {(!location.pathname.startsWith("/campaign") && !location.pathname.startsWith("/history")) && (
  <div className="relative w-full max-w-md">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>

    <input
      type="text"
      value={searchInput}
      onChange={(e) => setSearchInput(e.target.value)}
      onKeyDown={handleSearch}
      placeholder="Search campaigns..."
      className="w-full h-10 pl-10 pr-3 rounded-md border border-gray-300 bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A9E83]"
    />
  </div>
)}

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          
        {organiserToken && (
  <Link
    to="/dashboard"
    className="flex items-center justify-center rounded-md bg-[#1A9E83] 
    px-2 py-1 text-xs sm:px-4 sm:py-2 sm:text-sm 
    font-medium text-white shadow-sm hover:bg-[#157a65] transition"
  >
    Add Campaign
  </Link>
)}


          {/* Profile / Auth Buttons */}
          {(organiserToken || token) ? (
            <div className="relative">
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-100 cursor-pointer"
              >
                {/* Avatar */}
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1A9E83] text-white">
                  <span className="font-semibold uppercase">
                    {organiserToken ? organiserName?.charAt(0).toUpperCase() : user.charAt(0).toUpperCase() || "U"}
                  </span>
                </div>

                {/* Username */}
                <span className="hidden sm:inline">
                  {organiserToken ? organiserName.substr(0,1).toUpperCase()+organiserName.substr(1).toLowerCase() :  (user?user.substr(0,1).toUpperCase()+user.substr(1).toLowerCase():"User")}
                </span>
                
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>

              {/* Overlay (click outside to close) */}
              {open && (
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setOpen(false)}
                ></div>
              )}

              {/* Dropdown */}
              {open && (
                <div className="absolute right-0 top-full mt-2 w-48 rounded-lg bg-white shadow-lg border border-gray-100 p-1 z-50">
                  {organiserToken && (
                     <Link onClick={() => setOpen(false)} to="/dashboard" className="sm:hidden flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                       Dashboard
                     </Link>
                  )}
                  <button 
                    onClick={()=>navigate("/history")}
                    className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4" 
       viewBox="0 0 24 24" 
       fill="none" 
       stroke="currentColor" 
       strokeWidth="2" 
       strokeLinecap="round" 
       strokeLinejoin="round">
    <path d="M3 3v5h5" />
    <path d="M3.05 13A9 9 0 1 0 6 6" />
    <path d="M12 7v5l3 3" />
  </svg>
                    History
                  </button>
                  <button 
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                      <polyline points="16 17 21 12 16 7" />
                      <line x1="21" x2="9" y1="12" y2="12" />
                    </svg>
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link 
                to="/organiser/login" 
                className="text-sm font-medium text-gray-600 hover:text-[#1A9E83] transition px-3 py-2"
              >
                Organiser Portal
              </Link>
              <button 
                onClick={handleLogin}
                className="sm:inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
              >
                Login
              </button>
            </div>
          )}
        </div>
        
      </div>
    </nav>
  );
};

export default Navbar;