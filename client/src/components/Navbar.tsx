import React from 'react';
import { NavLink } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-1.5 rounded text-sm font-medium transition-colors ${
      isActive
        ? 'bg-[#86452a] text-white'
        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
    }`;

  return (
    <nav className="border-b bg-white">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Brand */}
        <NavLink to="/" className="font-bold text-lg text-gray-900 flex items-center gap-2">
          <span className="w-7 h-7 rounded bg-[#86452a] text-white flex items-center justify-center text-sm font-bold">
            ন
          </span>
          <span>
            Nakshi <span className="text-[#86452a] font-normal text-sm">Mini</span>
          </span>
        </NavLink>

        {/* Links */}
        <div className="flex items-center gap-2">
          <NavLink to="/items" id="nav-items-link" className={navLinkClass}>
            Items
          </NavLink>

          {/* 
            DURING EXAM: Add your new page link here:
            <NavLink to="/users" className={navLinkClass}>Users</NavLink>
          */}
        </div>
      </div>
    </nav>
  );
};
