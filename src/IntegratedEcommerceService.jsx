import React, { useEffect } from 'react';
import { Navbar, Footer, Icons, CTASection } from './SharedComponents';
import { Link } from 'react-router-dom';
import './IntegratedEcommerceService.css';

const IntegratedEcommerceService = () => {
  /* Scroll reveal logic */
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { 
        if (e.isIntersecting) {
          e.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="service-page integrated-ecommerce-service">
      <Navbar activePage="services" />

      {/* ── RED BANNER HERO ── */}
      <section className="brand-banner-hero">
        <div className="section-container">
          <div className="banner-content reveal">
            <span className="service-badge">Services</span>
            <h1>Integrated E-commerce Solutions</h1>
            <Link to="/contact" className="contact-pill-btn">
              Contact us <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M9 18l6-6-6-6"/></svg>
            </Link>
          </div>
        </div>
        <div className="hero-wave">
          <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path fill="#ffffff" fillOpacity="1" d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,149.3C672,149,768,203,864,218.7C960,235,1056,213,1152,186.7C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* ── CONTENT SECTION ── */}
      <section className="service-info-section">
        <div className="section-container">
          <div className="ecommerce-intro reveal">
            <h2>It can be challenging for brands to manage the daily operations of their eCommerce business on multiple platforms and applications.</h2>
            <p>An integrated system enables you to connect the ERP system to your eCommerce store without third-party tools using a centralized database allowing for seamless data access and empowering your e-Store. Repute is your one-stop solution for your e-commerce requirements. Our team has the expertise to set up your e-commerce platform in no time, which allows you to manage your finances and inventory with timely updates and offer an improved digital shopping experience for your customers.</p>
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  );
};

export default IntegratedEcommerceService;
