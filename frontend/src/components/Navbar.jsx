import React, { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-[#ffffff]/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4">

        {/* Logo */}
        <a
          href="/"
          className="flex-shrink-0 text-xl font-bold text-[#1A9E83]"
        >
          FundFlow
        </a>

        {/* Search Bar */}
        <div className="relative mx-auto w-full max-w-md hidden sm:block">
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
            placeholder="Search campaigns..."
            className="w-full h-10 pl-10 pr-3 rounded-md border border-gray-300 bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A9E83]"
          />
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-[#f5f3db]/70 cursor-pointer"
          >
            {/* Avatar */}
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1A9E83] text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>

            {/* Username */}
            <span className="hidden sm:inline">John Doe</span>

            {/* Dropdown Icon */}
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
            <div className="absolute right-0 top-full mt-2 w-48 rounded-lg bg-white shadow-lg p-1 z-50">
              <button className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-red-500 hover:bg-[#f5f3db]/70 transition-colors cursor-pointer">
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
      </div>
    </nav>
  );
};

export default Navbar;