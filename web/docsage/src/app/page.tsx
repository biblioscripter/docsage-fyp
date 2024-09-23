"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import useTheme from '@/hooks/useTheme';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useTheme();
  const [currentSlide, setCurrentSlide] = useState(0);

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

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
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
    <div className={`sticky top-0 z-50 ${theme === 'light' ? 'bg-white/80' : 'bg-gray-800/80'} shadow-md backdrop-blur-sm transition-all duration-300 ease-in-out`}>
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

      <main className="flex-grow">
        <section className={`py-16 px-4 ${theme === 'light' ? 'bg-white' : 'bg-gray-800'}`}>
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <h1 className="text-4xl font-bold mb-4">Welcome to Our Website</h1>
                <p className="text-lg mb-6">
                  We provide innovative solutions to help your business grow. Discover how we can transform your ideas into reality.
                </p>
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md text-lg font-medium transition-all duration-300 hover:shadow-lg">
                  Get Started
                </button>
              </div>
              <div className="md:w-1/2">
                <Image 
                  src="/Techno-Geek.png" 
                  alt="Hero Image" 
                  width={500}
                  height={300}
                  className="rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>

        <section className={`py-16 px-4 ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-900'}`}>
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: "⚡", title: "Fast Performance", description: "Our solutions are optimized for speed, ensuring your business operates efficiently." },
                { icon: "🔒", title: "Secure & Reliable", description: "We prioritize the security and reliability of our systems to protect your data." },
                { icon: "🛠", title: "24/7 Support", description: "Our dedicated team is always available to assist you with any questions or issues." }
              ].map((feature, index) => (
                <div key={index} className={`p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl ${theme === 'light' ? 'bg-white' : 'bg-gray-800'}`}>
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={`py-16 px-4 ${theme === 'light' ? 'bg-white' : 'bg-gray-800'}`}>
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">What Our Clients Say</h2>
            <div className="relative">
              <div className="overflow-hidden">
                <div 
                  className="flex transition-transform duration-300 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {reviews.map((review, index) => (
                    <div key={index} className="w-full sm:w-1/2 flex-shrink-0 px-3">
                      <div className={`p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 h-full flex flex-col justify-between ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-700'}`}>
                        <p className="mb-4 italic">"{review.text}"</p>
                        <div className="flex items-center mt-4">
                          <div className={`w-10 h-10 ${review.bgColor} rounded-full flex items-center justify-center text-white font-bold mr-3`}>
                            {review.initials}
                          </div>
                          <div>
                            <p className="font-semibold">{review.name}</p>
                            <p className="text-sm">{review.position}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <button 
                className={`absolute top-1/2 left-0 transform -translate-y-1/2 p-2 rounded-full shadow-md focus:outline-none ${theme === 'light' ? 'bg-white text-gray-600' : 'bg-gray-800 text-gray-300'}`}
                onClick={() => handleSliderMove(-1)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button 
                className={`absolute top-1/2 right-0 transform -translate-y-1/2 p-2 rounded-full shadow-md focus:outline-none ${theme === 'light' ? 'bg-white text-gray-600' : 'bg-gray-800 text-gray-300'}`}
                onClick={() => handleSliderMove(1)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>
        </section>

        <section className={`py-16 px-4 ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-900'}`}>
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Latest Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                <div key={index} className={`rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 ${theme === 'light' ? 'bg-white' : 'bg-gray-800'}`}>
                  <Image
                    src={article.image}
                    alt={article.title}
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
                    <p className="mb-4">{article.excerpt}</p>
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
      </main>

      <footer className={`py-12 ${theme === 'light' ? 'bg-gray-200 text-gray-800' : 'bg-gray-800 text-gray-200'}`}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center md:items-start">
              <Image
                src="/Techno-Geek.png"
                alt="Techno Geek Logo"
                width={80}
                height={80}
                className="mb-4"
              />
              <p className="text-sm text-center md:text-left">
                Empowering businesses with cutting-edge technology solutions.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-blue-400 transition-colors duration-300">Home</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors duration-300">About</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors duration-300">Services</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors duration-300">Blog</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-blue-400 transition-colors duration-300">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="hover:text-blue-400 transition-colors duration-300">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="hover:text-blue-400 transition-colors duration-300">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>

            <div className={`p-6 rounded-lg shadow-md ${theme === 'light' ? 'bg-white' : 'bg-gray-700'}`}>
              <h3 className="text-xl font-semibold mb-6">Get in Touch</h3>
              <form className="space-y-4">
                <input
                  type="email"
                  placeholder="Your Email"
                  className={`w-full px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${theme === 'light' ? 'bg-gray-100 text-gray-900' : 'bg-gray-600 text-white'}`}
                  required
                />
                <textarea
                  placeholder="Your Message"
                  rows={4}
                  className={`w-full px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${theme === 'light' ? 'bg-gray-100 text-gray-900' : 'bg-gray-600 text-white'}`}
                  required
                ></textarea>
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors duration-300"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-300 dark:border-gray-700 text-center text-sm">
            © 2023 Techno Geek. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
