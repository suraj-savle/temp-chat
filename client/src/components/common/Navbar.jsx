"use client";

import React, { useState } from "react";
import { IconMenu2, IconX } from "@tabler/icons-react";
import Link from "next/link";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "How to Use", href: "#how-it-works" },
    { name: "About Us", href: "#features" },
    { name: "Contact Us", href: "#open-source" },
    { name: "Report Issue", href: "#feedback" },
  ];

  return (
    <nav className="w-full bg-white relative top-0 z-50">
      <div className="max-w-6xl mx-auto border-b px-4 border-gray-100 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-lg font-semibold tracking-tight text-gray-900 transition-colors duration-300 group-hover:text-gray-600">
              JustUs
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm text-gray-500 hover:text-gray-900 transition-colors duration-300"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-900 p-1 -mr-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <IconX size={22} /> : <IconMenu2 size={22} />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden
          ${isMenuOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"}`}
        >
          <div className="flex flex-col gap-3 pb-4 pt-2 border-t border-gray-100">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-600 hover:text-gray-900 transition-colors py-2 text-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
