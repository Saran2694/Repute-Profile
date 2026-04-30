import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Footer, Icons } from './SharedComponents';
import { supabase } from './supabaseClient';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Select a service',
    subject: '',
    details: ''
  });
  const [status, setStatus] = useState({ type: null, message: null });
  const [isSending, setIsSending] = useState(false);
  const [contactData, setContactData] = useState({
    phone: '+91 422 4980307',
    email: 'support@irepute.in',
    address: 'Repute Digital Business Agency, #15/9A, Sabapathi Street, Church Road, KK Pudur, Coimbatore – 641038',
    google_maps_iframe: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15664.498777856408!2d76.948906!3d11.029199!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba8590680fd0f1f%3A0x6734fb4653a06764!2sRepute%20Digital%20Business%20Agency!5e0!3m2!1sen!2sin!4v1713374400000!5m2!1sen!2sin'
  });

  useEffect(() => {
    const fetchContactSettings = async () => {
      try {
        const { data: settings, error } = await supabase
          .from('contact_settings')
          .select('*')
          .eq('id', 1)
          .single();
        
        if (settings && !error) {
          setContactData({
            phone: settings.phone || contactData.phone,
            email: settings.email || contactData.email,
            address: settings.address || contactData.address,
            google_maps_iframe: settings.google_maps_iframe || contactData.google_maps_iframe
          });
        }
      } catch (err) {
        console.error('Error loading contact settings:', err);
      }
    };
    fetchContactSettings();
  }, []);

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
    window.scrollTo(0, 0);
    return () => obs.disconnect();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // For phone number, only allow numeric characters
    if (name === 'phone') {
      const numericValue = value.replace(/\D/g, '');
      if (numericValue.length <= 10) {
        setFormData({ ...formData, phone: numericValue });
      }
      return;
    }
    setFormData({ ...formData, [name]: value });
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    setIsSending(true);
    setStatus({ type: null, message: null });

    const SERVICE_ID = "service_vvfexwm";
    const TEMPLATE_ID = "template_deqaudj";
    const PUBLIC_KEY = "7CbV31AgGQ_Fk88Ug";

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone,
      service: formData.service,
      subject: formData.subject,
      message: formData.details,
      time: new Date().toLocaleString()
    };

    try {
      // 1. Save to Supabase
      const { error: dbError } = await supabase
        .from('contacts')
        .insert([{
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: formData.service,
          subject: formData.subject,
          message: formData.details
        }]);

      if (dbError) throw dbError;

      // 2. Send via EmailJS (Keep existing notification)
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: SERVICE_ID,
          template_id: TEMPLATE_ID,
          user_id: PUBLIC_KEY,
          template_params: templateParams,
        }),
      });

      if (response.ok) {
        setStatus({ type: 'success', message: 'Mail was sent successfully' });
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: 'Select a service',
          subject: '',
          details: ''
        });
        setTimeout(() => setStatus({ type: null, message: null }), 8000);
      } else {
        setStatus({ type: 'error', message: 'Mail failed to send. Please try again.' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Mail failed to send. Please try again.' });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="page-wrapper">
      <Navbar activePage="contact" />

      {/* ── HERO SECTION ── */}
      <section className="contact-hero" style={{ 
        height: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'linear-gradient(rgba(10, 18, 40, 0.9), rgba(10, 18, 40, 0.7)), url("https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1920&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        width: '100%'
      }}>
        <div className="reveal" style={{ zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '100%', padding: '0 5%' }}>

          <div style={{ maxWidth: '900px' }}>
            <h1 style={{ 
              color: '#fff', 
              fontSize: 'clamp(3rem, 8vw, 5.5rem)', 
              fontWeight: 900, 
              lineHeight: '1.0', 
              marginBottom: '32px',
              letterSpacing: '-3px'
            }}>
              Build beautiful <br />
              websites today!
            </h1>
            <p style={{ 
              color: '#ff3c3c', 
              fontSize: '1.5rem', 
              fontWeight: 700, 
              marginBottom: '48px',
              textShadow: '0 2px 10px rgba(0,0,0,0.3)'
            }}>
              Let us architect your future digital presence
            </p>
            <div className="hero-btn-container" style={{ display: 'flex', justifyContent: 'center' }}>
              <a href="#contact" className="hero-btn" style={{ 
                padding: '16px 44px', 
                fontSize: '1.1rem',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(12px)',
                borderRadius: '50px',
                color: '#fff',
                fontWeight: 800,
                textDecoration: 'none',
                display: 'inline-block',
                transition: 'all 0.4s ease',
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
              }}>
                Connect With Our Experts
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT INFO SECTION ── */}
      <section className="info-section">
        <div className="section-container reveal" style={{ marginBottom: '60px' }}>
          <span className="section-tag">Direct Contact</span>
          <h2 className="section-heading">Connect With Our <span className="red">Experts</span></h2>
          <div className="section-divider"></div>
        </div>
        <div className="info-container">
          <div className="info-left reveal">
            <div className="info-card">
              <div className="info-icon-box"><Icons.Phone /></div>
              <div className="info-text-box">
                <h3>Call us today</h3>
                <p>{contactData.phone}</p>
              </div>
            </div>
            <div className="info-card">
              <div className="info-icon-box"><Icons.Mail /></div>
              <div className="info-text-box">
                <h3>Send an Email</h3>
                <p>{contactData.email}</p>
              </div>
            </div>
            <div className="info-card">
              <div className="info-icon-box"><Icons.Location /></div>
              <div className="info-text-box">
                <h3>Visit our Office</h3>
                <p style={{ whiteSpace: 'pre-line' }}>{contactData.address}</p>
              </div>
            </div>
          </div>
          <div className="info-right reveal">
            <img
              src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80"
              alt="Office Workspace"
              className="info-image"
            />
          </div>
        </div>
      </section>

      {/* ── CONTACT FORM SECTION (Replaced with Home Page Version) ── */}
      <section id="contact" className="contact-section">
        <div className="section-container reveal">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span className="section-tag">Get in Touch</span>
            <h2 className="section-heading" style={{ color: '#fff' }}>Let's <span className="red">Connect</span></h2>
            <div className="section-divider center"></div>
          </div>

          <form className="contact-form" style={{ maxWidth: '800px', margin: '0 auto' }} onSubmit={sendEmail}>
            <div className="form-grid">
              <div>
                <label>Your Name *</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your full name" required />
              </div>
              <div>
                <label>Email Address *</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="your.email@example.com" required />
              </div>
            </div>

            <div className="form-grid">
              <div>
                <label>Phone Number</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter 10-digit number" pattern="[0-9]{10}" minLength="10" maxLength="10" />
              </div>
              <div>
                <label>Service Interested *</label>
                <select name="service" value={formData.service} onChange={handleChange} required>
                  <option disabled>Select a service</option>
                  <option>Website Design & Development</option>
                  <option>Digital Marketing</option>
                  <option>E-Commerce Development</option>
                  <option>All Services</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Subject *</label>
              <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="What is your project about?" required />
            </div>

            <div className="form-group">
              <label>Project Details *</label>
              <textarea name="details" value={formData.details} onChange={handleChange} rows="5" placeholder="Tell us about your project..." required style={{ resize: 'none' }}></textarea>
            </div>

            {status.message && (
              <div className={`status-overlay ${status.type === 'success' ? 'show' : ''}`}>
                <div className="status-popup">
                  <div className="status-icon">✓</div>
                  <h3>Message Sent!</h3>
                  <p>Thank you. We have received your inquiry and will get back to you shortly.</p>
                  <button type="button" onClick={() => setStatus({ type: null, message: null })}>Great!</button>
                </div>
              </div>
            )}

            {status.message && status.type === 'error' && (
              <div className="error-msg" style={{ marginBottom: '20px', textAlign: 'center' }}>
                <p style={{ color: '#f87171', fontWeight: 600 }}>{status.message}</p>
              </div>
            )}

            <div style={{ textAlign: 'center' }}>
              <button type="submit" className="submit-btn" disabled={isSending}>
                {isSending ? '✉️ Sending...' : '✉️ Enquire Now'}
              </button>
            </div>
            <p style={{ textAlign: 'center', fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', marginTop: '16px' }}>* Required fields</p>
          </form>
        </div>
      </section>

      {/* ── MAP SECTION ── */}
      <section className="map-section">
        <div className="map-card reveal">
          <iframe
            title="Office Location"
            src={contactData.google_maps_iframe}
            allowFullScreen=""
            loading="lazy">
          </iframe>
        </div>
      </section>

      <Footer />
      <style>{`
        .status-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.7); backdrop-filter: blur(8px);
          display: flex; align-items: center; justify-content: center; z-index: 1000;
          opacity: 0; pointer-events: none; transition: all 0.4s ease;
        }
        .status-overlay.show { opacity: 1; pointer-events: auto; }
        .status-popup {
          background: #1e293b; padding: 40px; border-radius: 24px; text-align: center;
          max-width: 400px; width: 90%; transform: scale(0.8); transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .status-overlay.show .status-popup { transform: scale(1); }
        .status-icon {
          width: 60px; height: 60px; background: #e10600; color: white;
          font-size: 30px; border-radius: 50%; display: flex; align-items: center;
          justify-content: center; margin: 0 auto 20px;
        }
        .status-popup h3 { color: white; font-size: 1.5rem; margin-bottom: 12px; }
        .status-popup p { color: #94a3b8; line-height: 1.6; margin-bottom: 24px; }
        .status-popup button {
          background: #e10600; color: white; border: none; padding: 12px 30px;
          border-radius: 12px; font-weight: 700; cursor: pointer; transition: all 0.2s;
        }
        .status-popup button:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(225,6,0,0.3); }
      `}</style>
    </div>
  );
};

export default Contact;
