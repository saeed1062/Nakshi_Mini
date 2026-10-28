import React from 'react';
import { NavLink } from 'react-router-dom';
import { Package, PlusCircle } from 'lucide-react';

export const Navbar: React.FC = () => {
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${isActive
      ? 'bg-primary text-on-primary shadow-sm'
      : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
    }`;

  return (
    <nav className="border-b border-outline-variant/30 bg-surface-container-lowest/90 backdrop-blur sticky top-0 z-20">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between relative">
        {/* Brand Logo (Left) */}
        <NavLink to="/" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-on-primary font-serif font-bold text-lg shadow-sm">
            ন
          </div>
          <span className="font-serif font-bold text-xl tracking-tight text-on-surface">
            Nakshi <span className="text-primary text-sm font-sans font-normal ml-0.5">Mini</span>
          </span>
        </NavLink>

        {/* Centered Navigation Links */}
        <div className="md:absolute md:left-1/2 md:-translate-x-1/2 flex items-center gap-2">
          <NavLink to="/items" id="nav-items-link" className={navLinkClass}>
            <span>Items</span>
          </NavLink>

          {/* 
            WHEN ADDING A NEW PAGE DURING THE TEST:
            Add your new NavLink here, e.g.:
            
            <NavLink to="/new-page" className={navLinkClass}>
              <PlusCircle className="w-3.5 h-3.5" />
              <span>New Page</span>
            </NavLink>
          */}
        </div>

        {/* Right side spacer to keep center alignment balanced */}
        <div className="w-32 hidden md:block"></div>
      </div>
    </nav>
  );
};
