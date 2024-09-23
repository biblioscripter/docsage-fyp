'use client';
import React from 'react';
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import DoctorSearch from '@/app/components/DoctorSearch';
import useTheme from '@/hooks/useTheme';

const DoctorSearchPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`flex flex-col min-h-screen ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-900'} transition-colors duration-300`}>
      <header className={`sticky top-0 z-50 ${theme === 'light' ? 'bg-white/80' : 'bg-gray-800/80'} shadow-md backdrop-blur-sm transition-all duration-300 ease-in-out`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0 transition-transform duration-300 hover:scale-110">
              <Image
                src="/Techno-Geek.png"
                alt="Logo"
                width={40}
                height={40}
                className="w-auto h-8"
              />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-4">
              <Link href="/" className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${theme === 'light' ? 'text-gray-700 hover:bg-gray-200' : 'text-gray-300 hover:bg-gray-700'}`}>Home</Link>
              <Link href="/about" className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${theme === 'light' ? 'text-gray-700 hover:bg-gray-200' : 'text-gray-300 hover:bg-gray-700'}`}>About</Link>
              <Link href="/DoctorSearch" className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${theme === 'light' ? 'text-gray-700 hover:bg-gray-200' : 'text-gray-300 hover:bg-gray-700'}`}>Search Doctor</Link>
            </nav>

            {/* Dark Mode Toggle and Contact Us Button */}
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full ${theme === 'light' ? 'bg-gray-200 text-gray-800' : 'bg-gray-700 text-gray-200'} transition-colors duration-300`}
              >
                {theme === 'light' ? '🌙' : '🌞'}
              </button>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:shadow-lg">
                Contact Us
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full ${theme === 'light' ? 'bg-gray-200 text-gray-800' : 'bg-gray-700 text-gray-200'} transition-colors duration-300`}
              >
                {theme === 'light' ? '🌙' : '🌞'}
              </button>
              <button
                type="button"
                className="text-gray-500 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors duration-300"
                aria-controls="mobile-menu"
                aria-expanded={mobileMenuOpen}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <span className="sr-only">Toggle main menu</span>
                {/* Fancy hamburger icon */}
                <div className="w-6 h-6 flex flex-col justify-around">
                  <span className={`bg-current h-0.5 w-6 transform transition duration-300 ease-in-out ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
                  <span className={`bg-current h-0.5 w-6 transition duration-300 ease-in-out ${mobileMenuOpen ? 'opacity-0' : ''}`} />
                  <span className={`bg-current h-0.5 w-6 transform transition duration-300 ease-in-out ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu, show/hide based on menu state */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`} 
          id="mobile-menu"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" className={`block px-3 py-2 rounded-md text-base font-medium ${theme === 'light' ? 'text-gray-700 hover:bg-gray-200' : 'text-gray-300 hover:bg-gray-700'}`}>Home</Link>
            <Link href="/about" className={`block px-3 py-2 rounded-md text-base font-medium ${theme === 'light' ? 'text-gray-700 hover:bg-gray-200' : 'text-gray-300 hover:bg-gray-700'}`}>About</Link>
            <Link href="/DoctorSearch" className={`block px-3 py-2 rounded-md text-base font-medium ${theme === 'light' ? 'text-gray-700 hover:bg-gray-200' : 'text-gray-300 hover:bg-gray-700'}`}>Search Doctor</Link>
            <button className="w-full text-left bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md text-base font-medium mt-4 transition-all duration-300 hover:shadow-lg">
              Contact Us
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow w-full px-4 py-8">
        <div className="container mx-auto">
          <div className="flex justify-center items-center">
            <div className={`w-full max-w-4xl ${theme === 'light' ? 'bg-white' : 'bg-gray-800'} shadow-xl rounded-lg p-6`}>
              <DoctorSearch />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DoctorSearchPage;
