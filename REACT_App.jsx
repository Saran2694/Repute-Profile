import React, { useState } from 'react';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <nav className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="logo flex items-center gap-2">
            <img src="/logo.png" alt="Repute Logo" className="h-12 w-auto" />
          </div>
          
          <ul className="hidden md:flex gap-8 text-black font-semibold">
            <li><a href="#home" className="hover:text-red-600">Home</a></li>
            <li><a href="#about" className="hover:text-red-600">About Us</a></li>
            <li><a href="#services" className="hover:text-red-600">Services</a></li>
            <li><a href="#portfolio" className="hover:text-red-600">Portfolio</a></li>
            <li><a href="#career" className="hover:text-red-600">Career</a></li>
            <li><a href="#contact" className="hover:text-red-600">Contact</a></li>
          </ul>

          <button 
            className="md:hidden text-2xl"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            ☰
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <ul className="flex flex-col gap-2 p-4">
              <li><a href="#home" className="block py-2 hover:text-red-600">Home</a></li>
              <li><a href="#about" className="block py-2 hover:text-red-600">About Us</a></li>
              <li><a href="#services" className="block py-2 hover:text-red-600">Services</a></li>
              <li><a href="#portfolio" className="block py-2 hover:text-red-600">Portfolio</a></li>
              <li><a href="#career" className="block py-2 hover:text-red-600">Career</a></li>
              <li><a href="#contact" className="block py-2 hover:text-red-600">Contact</a></li>
            </ul>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="home" className="bg-gradient-to-r from-red-600 to-red-700 text-white py-32 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Position Your Brand Rightly to attract more Business & Customers
          </h1>
          <p className="text-2xl mb-4">Build - Promote - Market - Sell</p>
          <p className="text-xl mb-8"><strong>Brand it Right with Repute</strong></p>
          <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded font-bold text-lg transition">
            Contact Us
          </button>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-black mb-4">Website Design & Development Services</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-red-600 to-red-700 mx-auto mb-12"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '🎨', title: 'Website Design', desc: 'Modern, aesthetic designs that captivate your audience' },
              { icon: '📄', title: 'Content Managed Websites', desc: 'Easy-to-manage websites with flexible content control' },
              { icon: '💻', title: 'Web Application Development', desc: 'Scalable, robust web applications for your business needs' },
              { icon: '🔍', title: 'Search Engine Optimisation', desc: 'Improve visibility and rank higher in search results' }
            ].map((service, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg border-l-4 border-red-600 shadow-md hover:shadow-lg hover:-translate-y-3 transition-all">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-black mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Digital Marketing Services */}
      <section className="py-20 px-4 bg-gradient-to-r from-red-700 to-red-600">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-4">Digital Marketing</h2>
          <div className="h-1 w-20 bg-white mx-auto mb-12"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '🔍', title: 'Search Engine Optimisation', desc: 'Organic growth through strategic SEO tactics' },
              { icon: '📱', title: 'Social Media Marketing', desc: 'Engaging campaigns that build brand loyalty' },
              { icon: '🎯', title: 'Search Engine Marketing', desc: 'Targeted ads to reach your ideal customers' },
              { icon: '💰', title: 'PPC Marketing & Management', desc: 'Maximize ROI with strategic paid advertising' }
            ].map((service, idx) => (
              <div key={idx} className="bg-white/10 p-6 rounded-lg border border-white/30 backdrop-blur hover:bg-white/20 transition-all">
                <div className="text-4xl mb-4 text-white">{service.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                <p className="text-white/95 text-sm">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h2 className="text-4xl font-bold text-black mb-6">Full Service Digital Agency</h2>
              <p className="text-lg text-gray-700 mb-4">
                <strong>Repute</strong> is a Full Service Digital Agency that helps <span className="text-red-600 font-bold">Build - Promote - Market</span> Brands.
              </p>
              <p className="text-lg text-gray-700">
                With <strong>more than 2 decades of Credibility and Expertise</strong>, Repute will be your right partner to progress.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[
                { number: '18+', label: 'Years in Market' },
                { number: '50+', label: 'Experienced Professionals' },
                { number: '600+', label: 'Happy Clients' }
              ].map((stat, idx) => (
                <div key={idx} className="bg-gradient-to-br from-red-600 to-red-700 text-white p-6 rounded-lg text-center hover:scale-105 transition-transform">
                  <p className="text-3xl font-bold mb-2">{stat.number}</p>
                  <p className="text-sm font-semibold">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* E-Commerce Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-black mb-4">E-Commerce Development</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-red-600 to-red-700 mx-auto mb-12"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { icon: '🛒', title: 'Custom E-Commerce Portal', desc: 'Tailored solutions built to your specifications' },
              { icon: '📦', title: 'WooCommerce Development', desc: 'Powerful WordPress-based solutions' },
              { icon: '🖥️', title: 'Magento Development', desc: 'Enterprise-grade platforms' },
              { icon: '🚀', title: 'Shopify Development', desc: 'Quick-to-market solutions' }
            ].map((service, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg border-l-4 border-red-600 shadow-md hover:shadow-lg hover:-translate-y-3 transition-all">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-black mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm">{service.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-red-600/15 border-l-4 border-red-600 p-6 rounded text-center">
            <p className="text-lg text-black font-bold mb-2">Ride high on your E-Commerce Sales</p>
            <p className="text-gray-700">We are keen, clinical, creative and outcome-driven.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="bg-gradient-to-r from-red-600 to-red-700 text-white py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Call us to talk about!</h2>
          <p className="text-xl mb-8">Business, E-Commerce, Digital Marketing, Ideas or Just a Coffee</p>
          <button className="bg-white text-red-600 hover:bg-gray-100 px-10 py-3 rounded font-bold text-lg transition">
            Contact Us
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-red-600 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Logo & About */}
            <div>
              <img src="/logo.png" alt="Repute Logo" className="h-12 mb-4 filter brightness-0 invert" />
              <p className="text-sm">We aim high at being focused on building relationships with our clients and community.</p>
              <div className="flex gap-4 mt-4">
                <a href="#" className="w-10 h-10 flex items-center justify-center bg-red-500 rounded-full hover:bg-red-700">f</a>
                <a href="#" className="w-10 h-10 flex items-center justify-center bg-red-500 rounded-full hover:bg-red-700">in</a>
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-bold mb-4">Services</h4>
              <ul className="text-sm space-y-2">
                <li><a href="#" className="hover:text-red-200">Brand Creatives</a></li>
                <li><a href="#" className="hover:text-red-200">Web Development & Design</a></li>
                <li><a href="#" className="hover:text-red-200">E-Commerce Development</a></li>
                <li><a href="#" className="hover:text-red-200">Digital Marketing</a></li>
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="text-sm space-y-2">
                <li><a href="#home" className="hover:text-red-200">Home</a></li>
                <li><a href="#about" className="hover:text-red-200">About Us</a></li>
                <li><a href="#services" className="hover:text-red-200">Services</a></li>
                <li><a href="#contact" className="hover:text-red-200">Contact</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold mb-2">Call us today</h4>
              <p className="text-sm mb-3"><a href="tel:+914224980307">+91-422 4980307</a></p>
              
              <h4 className="font-bold mb-2">Send an Email</h4>
              <p className="text-sm mb-3"><a href="mailto:support@irepute.in">support@irepute.in</a></p>
              
              <h4 className="font-bold mb-2">Visit us</h4>
              <p className="text-sm">Coimbatore - 641038, Tamil Nadu</p>
            </div>
          </div>

          <div className="border-t border-red-500 pt-8 text-center text-sm">
            <p>&copy; 2026 Repute Digital Business Agency. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
