import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/90 backdrop-blur-md shadow-[0_0_25px_2px_rgba(59,130,246,0.45)]"
          : "bg-transparent"
      }`}
    >
      <div className="px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">
          Skill<span className="text-blue-500">IQ</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6 text-white">
          <Link to="/" className="hover:text-blue-400 transition">Home</Link>
          <Link to="/games" className="hover:text-blue-400 transition">Practice</Link>
          <Link to="/jobs" className="hover:text-blue-400 transition">Job Portals</Link>
          <Link to="/login" className="hover:text-blue-400 transition">Login</Link>
          <Link to="/register" className="hover:text-blue-400 transition">Register</Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-black/95 backdrop-blur-lg flex flex-col items-center space-y-4 py-6 md:hidden border-t border-gray-700 text-white">
          <Link to="/" className="hover:text-blue-400 transition" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/games" className="hover:text-blue-400 transition" onClick={() => setMenuOpen(false)}>Practice</Link>
          <Link to="/jobs" className="hover:text-blue-400 transition" onClick={() => setMenuOpen(false)}>Job Portals</Link>
          <Link to="/login" className="hover:text-blue-400 transition" onClick={() => setMenuOpen(false)}>Login</Link>
          <Link to="/register" className="hover:text-blue-400 transition" onClick={() => setMenuOpen(false)}>Register</Link>
        </div>
      )}
    </nav>
  );
}


