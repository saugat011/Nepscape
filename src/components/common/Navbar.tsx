"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { navItems } from "@/lib/data";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isClicked, setIsClicked] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (label: string) => {
    if (isClicked) return; // prevent dropdown re-opening right after click
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenDropdown(label);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150); // slight delay to allow link clicks
  };

  const handleDropdownLinkClick = () => {
    setOpenDropdown(null);      // close dropdown
    setIsClicked(true);         // block hover reopen
    setTimeout(() => setIsClicked(false), 300); // allow hover after delay
  };

  const toggleDropdown = (label: string) => {
    setOpenDropdown((prev) => (prev === label ? null : label));
  };

  return (
    <nav className="bg-bg shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-primary">
            Nepscape
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 relative">
            {navItems.map((item) =>
              item.dropdown ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(item.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button className="text-text font-medium hover:text-primary focus:outline-none">
                    {item.label}
                  </button>
                  {openDropdown === item.label && (
                    <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                      {item.items?.map((subItem) => (
                        <Link
                          key={subItem.label}
                          href={subItem.href}
                          onClick={handleDropdownLinkClick}
                          className="block px-4 py-2 text-muted hover:bg-primary hover:text-white transition"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href || "#"}
                  className="text-text font-medium hover:text-primary"
                >
                  {item.label}
                </Link>
              )
            )}
          </div>

          {/* Hamburger Icon */}
          <button
            className="md:hidden text-text"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-bg shadow-inner">
          {navItems.map((item) =>
            item.dropdown ? (
              <div key={item.label}>
                <button
                  onClick={() => toggleDropdown(item.label)}
                  className="block w-full text-left text-text font-medium hover:text-primary"
                >
                  {item.label}
                </button>
                {openDropdown === item.label && (
                  <div className="ml-4 mt-1 space-y-1">
                    {item.items?.map((subItem) => (
                      <Link
                        key={subItem.label}
                        href={subItem.href}
                        className="block text-muted hover:text-primary"
                        onClick={() => {
                          setOpenDropdown(null);
                          setMenuOpen(false);
                        }}
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.href || "#"}
                className="block text-text font-medium hover:text-primary"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            )
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
