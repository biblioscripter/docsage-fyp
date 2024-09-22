'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const AboutPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDarkMode);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-800/80 shadow-md backdrop-blur-sm transition-all duration-300 ease-in-out">
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
              <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 hover:bg-gray-100 dark:hover:bg-gray-700">Home</Link>
              <Link href="/about" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 hover:bg-gray-100 dark:hover:bg-gray-700" aria-current="page">About</Link>
              <span className="text-gray-400 dark:text-gray-500 px-3 py-2 rounded-md text-sm font-medium cursor-not-allowed">Services</span>
            </nav>

            {/* Dark Mode Toggle and Contact Us Button */}
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition-colors duration-300"
              >
                {darkMode ? '🌞' : '🌙'}
              </button>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
                Contact Us
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-4">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition-colors duration-300"
              >
                {darkMode ? '🌞' : '🌙'}
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
            <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 hover:bg-gray-100 dark:hover:bg-gray-700">Home</Link>
            <Link href="/about" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 hover:bg-gray-100 dark:hover:bg-gray-700">About</Link>
            <span className="text-gray-400 dark:text-gray-500 block px-3 py-2 rounded-md text-base font-medium cursor-not-allowed">Services</span>
            <button className="w-full text-left bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md text-base font-medium mt-4 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
              Contact Us
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 dark:text-white">About Techno Geek</h1>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-gray-600 dark:text-gray-300">
                At Techno Geek, we're passionate about empowering businesses with cutting-edge technology solutions. Our team of expert developers, designers, and strategists work tirelessly to bring your digital visions to life.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Founded in 2010, we've been at the forefront of technological innovation, helping companies of all sizes navigate the ever-changing digital landscape.
              </p>
              <div className="mt-6">
                <h3 className="text-blue-500 font-semibold mb-4">Our Expertise:</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: "🌐", title: "Web Development", description: "Crafting responsive, user-friendly websites" },
                    { icon: "📱", title: "Mobile App Creation", description: "Building intuitive apps for iOS and Android" },
                    { icon: "☁️", title: "Cloud Solutions", description: "Scalable and secure cloud infrastructure" },
                    { icon: "🤖", title: "AI & Machine Learning", description: "Intelligent systems for smart decision-making" }
                  ].map((item, index) => (
                    <div key={index} className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                      <div className="text-2xl mb-2">{item.icon}</div>
                      <h4 className="font-semibold text-gray-800 dark:text-white mb-1">{item.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src="/Techno-Geek.png" 
                alt="Techno Geek Team" 
                className="rounded-lg shadow-xl transition-transform duration-300 hover:scale-105"
              />
              <div className="absolute -bottom-4 -right-4 bg-blue-500 text-white p-4 rounded-lg shadow-lg transform rotate-3 transition-transform duration-300 hover:rotate-0">
                <p className="font-bold">10+ Years</p>
                <p className="text-sm">of Excellence</p>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <h2 className="text-3xl font-semibold text-center mb-8 text-gray-800 dark:text-white">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: "Innovation", icon: "💡" },
                { title: "Collaboration", icon: "🤝" },
                { title: "Excellence", icon: "🏆" }
              ].map((value, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{value.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 text-center">
            <h2 className="text-3xl font-semibold mb-4 text-gray-800 dark:text-white">Ready to get started?</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">Let's turn your ideas into reality!</p>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-medium transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
              Contact Us Today
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AboutPage;