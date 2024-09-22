"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const reviews = [
    {
      text: "This product has revolutionized our business processes. The performance boost is remarkable!",
      initials: "JD",
      name: "John Doe",
      position: "CEO of TechCorp",
      bgColor: "bg-blue-500"
    },
    {
      text: "The security features are top-notch. We feel confident knowing our data is well-protected.",
      initials: "JS",
      name: "Jane Smith",
      position: "CTO of SecureNet",
      bgColor: "bg-green-500"
    },
    {
      text: "The 24/7 support is a game-changer. Issues are resolved quickly, minimizing downtime.",
      initials: "MJ",
      name: "Mike Johnson",
      position: "IT Manager at GlobalTech",
      bgColor: "bg-purple-500"
    },
    {
      text: "The user interface is intuitive and easy to navigate. Our team loves the new features.",
      initials: "LB",
      name: "Lisa Brown",
      position: "Product Manager at InnovateTech",
      bgColor: "bg-yellow-500"
    },
    {
      text: "The integration with our existing systems was seamless. We're seeing a significant increase in productivity.",
      initials: "DW",
      name: "David Wilson",
      position: "COO of SynergyCorp",
      bgColor: "bg-pink-500"
    },
    {
      text: "The customer support team is exceptional. They've been incredibly responsive and helpful throughout the implementation process.",
      initials: "SW",
      name: "Sarah White",
      position: "CFO of FutureTech",
      bgColor: "bg-indigo-500"
    }
  ];

  useEffect(() => {
    // Check for user's preference in localStorage or system preference
    const isDarkMode = localStorage.getItem('darkMode') === 'true' || 
      (!('darkMode' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setDarkMode(isDarkMode);
  }, []);

  useEffect(() => {
    // Apply dark mode class to the document body
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Save preference to localStorage
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleSliderMove = (direction: number) => {
    const totalSlides = reviews.length;
    const visibleSlides = window.innerWidth >= 640 ? 2 : 1;
    const maxSlide = totalSlides - visibleSlides;
    
    let newSlide = currentSlide + direction * visibleSlides;
    if (newSlide < 0) newSlide = Math.max(0, maxSlide - (visibleSlides - 1));
    if (newSlide > maxSlide) newSlide = 0;

    setCurrentSlide(newSlide);
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
              <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 hover:bg-gray-100 dark:hover:bg-gray-700" aria-current="page">Home</Link>
              <Link href="/about" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 hover:bg-gray-100 dark:hover:bg-gray-700">About</Link>
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
        {/* Hero Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800 transition-colors duration-300">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between">
              {/* Left Column: Intro and Button */}
              <div className="md:w-1/2 mb-8 md:mb-0">
                <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Welcome to Our Website</h1>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                  We provide innovative solutions to help your business grow. Discover how we can transform your ideas into reality.
                </p>
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md text-lg font-medium transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
                  Get Started
                </button>
              </div>
              {/* Right Column: Image */}
              <div className="md:w-1/2">
                <img 
                  src="/Techno-Geek.png" 
                  alt="Hero Image" 
                  className="rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>
        {/* Feature Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-100 dark:bg-gray-700 transition-colors duration-300">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">Our Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl">
                <div className="text-blue-500 mb-4">
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Fast Performance</h3>
                <p className="text-gray-700 dark:text-gray-300">Our solutions are optimized for speed, ensuring your business operates efficiently.</p>
              </div>
              {/* Feature 2 */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl">
                <div className="text-blue-500 mb-4">
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Secure & Reliable</h3>
                <p className="text-gray-700 dark:text-gray-300">We prioritize the security and reliability of our systems to protect your data.</p>
              </div>
              {/* Feature 3 */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl">
                <div className="text-blue-500 mb-4">
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">24/7 Support</h3>
                <p className="text-gray-700 dark:text-gray-300">Our dedicated team is always available to assist you with any questions or issues.</p>
              </div>
            </div>
          </div>
        </section>
        {/* Client Reviews Carousel Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800 transition-colors duration-300">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">What Our Clients Say</h2>
            <div className="relative">
              <div className="overflow-hidden">
                <div 
                  className="flex transition-transform duration-300 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {reviews.map((review, index) => (
                    <div key={index} className="w-full sm:w-1/2 flex-shrink-0 px-3">
                      <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 h-full flex flex-col justify-between">
                        <div>
                          <p className="text-gray-700 dark:text-gray-300 mb-4 italic">"{review.text}"</p>
                        </div>
                        <div className="flex items-center mt-4">
                          <div className={`w-10 h-10 ${review.bgColor} rounded-full flex items-center justify-center text-white font-bold mr-3 flex-shrink-0`}>
                            {review.initials}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white">{review.name}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{review.position}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <button 
                className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white dark:bg-gray-800 p-2 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none" 
                onClick={() => handleSliderMove(-1)}
              >
                <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button 
                className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white dark:bg-gray-800 p-2 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none" 
                onClick={() => handleSliderMove(1)}
              >
                <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>
        </section>
        {/* Article Cards Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">Latest Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "The Future of AI in Business",
                  excerpt: "Explore how artificial intelligence is reshaping the business landscape and what it means for your company.",
                  image: "/Techno-Geek.png",
                  slug: "future-of-ai-in-business"
                },
                {
                  title: "Cybersecurity Best Practices",
                  excerpt: "Learn about the latest cybersecurity threats and how to protect your organization from potential attacks.",
                  image: "/Techno-Geek.png",
                  slug: "cybersecurity-best-practices"
                },
                {
                  title: "Cloud Computing Trends",
                  excerpt: "Discover the emerging trends in cloud computing and how they can benefit your business operations.",
                  image: "/Techno-Geek.png",
                  slug: "cloud-computing-trends"
                }
              ].map((article, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
                  <Image
                    src={article.image}
                    alt={article.title}
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{article.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{article.excerpt}</p>
                    <a
                      href={`/articles/${article.slug}`}
                      className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
                    >
                      Read More
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* Footer Section */}
        <footer className="bg-gray-800 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Company Logo and Info */}
              <div className="flex flex-col items-center md:items-start">
                <Image
                  src="/Techno-Geek.png"
                  alt="Techno Geek Logo"
                  width={80}
                  height={80}
                  className="mb-4"
                />
                <p className="text-sm text-gray-400 text-center md:text-left">
                  Empowering businesses with cutting-edge technology solutions.
                </p>
              </div>

              {/* Navigation Links */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-blue-400 transition-colors duration-300">Home</a></li>
                  <li><a href="#" className="hover:text-blue-400 transition-colors duration-300">About</a></li>
                  <li><a href="#" className="hover:text-blue-400 transition-colors duration-300">Services</a></li>
                  <li><a href="#" className="hover:text-blue-400 transition-colors duration-300">Blog</a></li>
                </ul>
              </div>

              {/* Social Media Links */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-gray-300 dark:bg-gray-700 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-6 text-black dark:text-white">Get in Touch</h3>
                <form className="space-y-4">
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="Your Email"
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-600 text-black dark:text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      required
                    />
                    <svg className="absolute right-3 top-3 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <div className="relative">
                    <textarea
                      placeholder="Your Message"
                      rows={4}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-600 text-black dark:text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      required
                    ></textarea>
                    <svg className="absolute right-3 top-3 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors duration-300"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-400">
              © 2023 Techno Geek. All rights reserved.
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
