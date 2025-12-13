'use client'
import React, { useState, useRef } from "react";

export default function page() {

  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  const handleMouseEnter = () => setOpen(true);
  const handleMouseLeave = () => setOpen(false);


return (
    <div
      ref={containerRef}
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded-t-md focus:outline-none"
      >
        Menu
      </button>
      {open && (
        <div
          className="absolute left-0 top-full min-w-[180px] bg-white shadow-lg rounded-b-md z-10 animate-fade-in"
        >
          <ul className="py-2">
            <li className="px-4 py-2 hover:bg-blue-100 cursor-pointer">
              Profile
            </li>
            <li className="px-4 py-2 hover:bg-blue-100 cursor-pointer">
              Settings
            </li>
            <li className="px-4 py-2 hover:bg-blue-100 cursor-pointer">
              Logout
            </li>
          </ul>
        </div>
      )}
      {/* Add fade-in animation with Tailwind */}
      <style>{`
        .animate-fade-in {
          animation: fadeIn 0.2s;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-8px);}
          to { opacity: 1; transform: translateY(0);}
        }
      `}</style>
    </div>
  );
}
