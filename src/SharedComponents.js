import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from './supabaseClient';

/* =============================================
   SVG ICON COMPONENTS (Reusable)
   ============================================= */
export const Icons = {
  monitor: <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M21 2H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h7l-2 3v1h8v-1l-2-3h7c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H3V4h18v12z" /></svg>,
  check: <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg>,
  code: <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" /></svg>,
  mobile: <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M15.5 1h-8C6.12 1 5 2.12 5 3.5v17C5 21.88 6.12 23 7.5 23h8c1.38 0 2.5-1.12 2.5-2.5v-17C18 2.12 16.88 1 15.5 1zm-4 21c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4.5-4H7V4h9v14z" /></svg>,
  search: <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" /></svg>,
  social: <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" /></svg>,
  target: <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" /></svg>,
  cart: <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" /></svg>,
  clock: <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" /></svg>,
  plus: <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" /></svg>,
  calendar: <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z" /></svg>,
  facebook: <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>,
  x: <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.6l-5.17-6.76-5.91 6.76h-3.308l7.73-8.835L2.56 2.25h6.6l4.6 6.07 5.484-6.07zM17.313 20.15h1.834L6.84 4.088H4.896z" /></svg>,
  youtube: <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>,
  instagram: <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>,
  linkedin: <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.418-.103.249-.129.597-.129.946v5.441h-3.554s.05-8.814 0-9.752h3.554v1.375c.427-.659 1.191-1.592 2.897-1.592 2.117 0 3.704 1.385 3.704 4.362v5.607zM5.337 8.855c-1.144 0-1.915-.762-1.915-1.715 0-.955.77-1.715 1.959-1.715 1.188 0 1.915.76 1.932 1.715 0 .953-.744 1.715-1.976 1.715zm1.946 11.597H3.392V9.142h3.891v11.31zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>,
  Phone: () => <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" /></svg>,
  Mail: () => <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><path d="M22 6l-10 7L2 6" /></svg>,
  Location: () => <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1118 0z" /><circle cx="12" cy="10" r="3" /></svg>,
};

/* =============================================
   SHARED FOOTER COMPONENT
   ============================================= */
export function Footer() {
  const [contactData, setContactData] = useState({
    phone: '+91 422 4980307',
    email: 'support@irepute.in',
    address: 'Repute Digital Business Agency, #15/9A, Sabapathi Street, Church Road, KK Pudur, Coimbatore – 641038',
    facebook: 'https://www.facebook.com/irepute.agency',
    x: 'https://x.com/ireputeagency',
    youtube: 'https://www.youtube.com/@ireputeagency',
    instagram: 'https://www.instagram.com/ireputeagency/',
    linkedin: 'https://www.linkedin.com/company/irepute-agency/posts/?feedView=all'
  });

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const { data } = await supabase.from('contact_settings').select('*').eq('id', 1).single();
        if (data) {
          setContactData({
            phone: data.phone || contactData.phone,
            email: data.email || contactData.email,
            address: data.address || contactData.address,
            facebook: data.facebook_url || contactData.facebook,
            x: data.twitter_url || contactData.x,
            youtube: data.youtube_url || contactData.youtube,
            instagram: data.instagram_url || contactData.instagram,
            linkedin: data.linkedin_url || contactData.linkedin
          });
        }
      } catch (e) {
        console.error("Footer fetch error:", e);
      }
    };
    fetchFooterData();
  }, []);

  return (
    <footer className="footer">
      <div className="section-container">
        <div className="footer-grid">
          {/* Logo & About */}
          <div>
            <Link to="/" className="footer-logo"><img src="/logo.png" alt="Repute" /></Link>
            <p className="footer-text">We aim high at being focused on building relationships with our clients and community. Using our creative gifts drives this foundation.</p>
            <div className="footer-socials">
              <a href={contactData.facebook} target="_blank" rel="noopener noreferrer" className="footer-social-icon" title="Facebook">{Icons.facebook}</a>
              <a href={contactData.x} target="_blank" rel="noopener noreferrer" className="footer-social-icon" title="X">{Icons.x}</a>
              <a href={contactData.youtube} target="_blank" rel="noopener noreferrer" className="footer-social-icon" title="YouTube">{Icons.youtube}</a>
              <a href={contactData.instagram} target="_blank" rel="noopener noreferrer" className="footer-social-icon" title="Instagram">{Icons.instagram}</a>
              <a href={contactData.linkedin} target="_blank" rel="noopener noreferrer" className="footer-social-icon" title="LinkedIn">{Icons.linkedin}</a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4>Services</h4>
            <ul>
              <li><Link to="/brand-creatives">Brand Creatives</Link></li>
              <li><Link to="/web-development">Web Development & Design</Link></li>
              <li><Link to="/#ecommerce">E-Commerce Development</Link></li>
              <li><Link to="/digital-marketing">Digital Marketing</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/brand-creatives">Services</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-contact">
            <h4>Call us today</h4>
            <p><a href={`tel:${contactData.phone.replace(/\s+/g, '')}`} className="footer-link">{contactData.phone}</a></p>
            <h4>Send an Email</h4>
            <p><a href={`mailto:${contactData.email}`} className="footer-link">{contactData.email}</a></p>
            <h4>Visit us</h4>
            <p>
              <a 
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contactData.address)}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="footer-link"
                style={{ lineHeight: '1.6', display: 'block', whiteSpace: 'pre-line' }}
              >
                {contactData.address}
              </a>
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 Repute Digital Business Agency. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

/* =============================================
   SHARED NAVBAR COMPONENT
   ============================================= */
export function Navbar({ activePage }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo"><img src="/logo.png" alt="Repute Logo" /></Link>
        <ul className="navbar-links">
          <li><Link to="/" className={activePage === 'home' ? 'active' : ''}>Home</Link></li>
          <li><Link to="/about" className={activePage === 'about' ? 'active' : ''}>About Us</Link></li>
          <li className="has-megamenu">
            <Link to="/brand-creatives" className={activePage === 'services' ? 'active' : ''}>Services</Link>
            <div className="mega-menu">
              <div className="mega-menu-inner">
                <div className="mega-menu-sidebar">
                  <div className="sidebar-image">
                    <img src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=800" alt="Services Banner" />
                    <div className="sidebar-overlay">
                      <h3>Repute Services</h3>
                      <p>Get Quote Today!</p>
                      <Link to="/contact" className="sidebar-btn">Click Here <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M9 18l6-6-6-6"/></svg></Link>
                    </div>
                  </div>
                </div>
                <div className="mega-menu-content">
                  <div className="mega-column">
                    <Link to="/brand-creatives">Brand Creatives</Link>
                    <Link to="/web-development">Web Development & Design</Link>
                    <Link to="/ecommerce">E-commerce Development</Link>
                  </div>
                  <div className="mega-column">
                    <Link to="/digital-marketing">Digital Marketing</Link>
                    <Link to="/branding-solutions">Integrated Branding Solutions</Link>
                  </div>
                  <div className="mega-column">
                    <Link to="/mobile-development">Mobile Application Development</Link>
                    <Link to="/integrated-ecommerce">Integrated E-commerce Solutions</Link>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li><Link to="/portfolio" className={activePage === 'portfolio' ? 'active' : ''}>Portfolio</Link></li>
          <li><Link to="/career" className={activePage === 'career' ? 'active' : ''}>Career</Link></li>
          <li><Link to="/contact" className={activePage === 'contact' ? 'active' : ''}>Contact</Link></li>
        </ul>
        <button className="mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)}>{mobileOpen ? '✕' : '☰'}</button>
      </div>
      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
        <Link to="/" className={activePage === 'home' ? 'active' : ''} onClick={() => setMobileOpen(false)}>Home</Link>
        <Link to="/about" className={activePage === 'about' ? 'active' : ''} onClick={() => setMobileOpen(false)}>About Us</Link>
        <Link to="/brand-creatives" onClick={() => setMobileOpen(false)}>Services</Link>
        <Link to="/portfolio" className={activePage === 'portfolio' ? 'active' : ''} onClick={() => setMobileOpen(false)}>Portfolio</Link>
        <Link to="/career" className={activePage === 'career' ? 'active' : ''} onClick={() => setMobileOpen(false)}>Career</Link>
        <Link to="/contact" className={activePage === 'contact' ? 'active' : ''} onClick={() => setMobileOpen(false)}>Contact</Link>
      </div>
    </nav>
  );
}

/* =============================================
   SHARED CTA COMPONENT
   ============================================= */
export function CTASection({ 
  title = "Call us to talk about!", 
  subtitle = "Business, E-Commerce, Digital Marketing, Ideas or Just a Coffee", 
  buttonText = "Contact Us", 
  buttonLink = "/#contact" 
}) {
  return (
    <section className="repute-standard-cta">
      <div className="cta-bg-dots"></div>
      <div className="cta-inner reveal">
        <span className="cta-pre-title">Let's Work Together</span>
        <h2>{title}</h2>
        <div className="cta-underline"></div>
        <p>{subtitle}</p>
        <Link to={buttonLink} className="cta-button">
          {buttonText}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" style={{ marginLeft: '10px' }}>
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
