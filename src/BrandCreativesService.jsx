import React, { useEffect, useState } from 'react';
import { Navbar, Footer, Icons, CTASection } from './SharedComponents';
import { Link } from 'react-router-dom';
import { supabase } from './supabaseClient';
import './BrandCreativesService.css';
import ayyappanPhoto from './assets/ayyapan-karunanithy.jpg';

const BrandCreativesService = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    website: '',
    message: '',
    captcha: ''
  });
  const [status, setStatus] = useState({ type: '', msg: '' });

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: 'loading', msg: 'Sending...' });

    try {
      const { error } = await supabase
        .from('contacts')
        .insert([{
          name: formData.name,
          email: formData.email,
          phone: formData.website, // Mapping website to phone field for now
          subject: 'Service Inquiry',
          service: 'Brand Creatives',
          message: formData.message
        }]);

      if (error) throw error;
      setStatus({ type: 'success', msg: 'Thank you! Your message has been sent.' });
      setFormData({ name: '', email: '', website: '', message: '', captcha: '' });
    } catch (err) {
      console.error('Submission error:', err);
      setStatus({ type: 'error', msg: 'Failed to send. Please try again.' });
    }
  };

  const serviceItems = [
    { title: 'Logo design', icon: 'https://cdn-icons-png.flaticon.com/512/2972/2972173.png' },
    { title: 'OOH media design', icon: 'https://cdn-icons-png.flaticon.com/512/3067/3067160.png' },
    { title: 'Brochure / catalogue design', icon: 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png' },
    { title: 'Poster design', icon: 'https://cdn-icons-png.flaticon.com/512/1055/1055644.png' },
    { title: 'Stall design', icon: 'https://cdn-icons-png.flaticon.com/512/2897/2897587.png' },
    { title: 'Merchandise design', icon: 'https://cdn-icons-png.flaticon.com/512/3081/3081986.png' },
    { title: 'Package design', icon: 'https://cdn-icons-png.flaticon.com/512/2950/2950151.png' },
  ];

  return (
    <div className="service-page brand-service">
      <Navbar activePage="services" />

      {/* ── RED BANNER HERO ── */}
      <section className="brand-banner-hero">
        <div className="section-container">
          <div className="banner-content reveal">
            <span className="service-badge">Services</span>
            <h1>Brand Creatives</h1>
            <Link to="/contact" className="contact-pill-btn">
              Contact us <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M9 18l6-6-6-6"/></svg>
            </Link>
          </div>
        </div>
        {/* Wave Separator */}
        <div className="hero-wave">
          <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path fill="#ffffff" fillOpacity="1" d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,149.3C672,149,768,203,864,218.7C960,235,1056,213,1152,186.7C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* ── INFO SECTION (Previous Hero) ── */}
      <section className="creatives-info-section">
        <div className="section-container">
          <div className="hero-flex reveal">
            <div className="hero-visual">
              <img 
                src="https://images.unsplash.com/photo-1493612276216-ee3925520721?auto=format&fit=crop&q=80&w=800" 
                alt="Creative Idea" 
                className="hero-main-img"
              />
            </div>
            <div className="hero-text-side">
              <p>
                We help businesses have more visibility amongst the audience and help them develop an emotional connection with the brands. 
                We build strategies to help communicate a consistent and distinct brand image and better positioning with increased brand awareness.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES GRID ── */}
      <section className="services-grid-section">
        <div className="section-container">
          <div className="section-header reveal">
            <span className="mini-tag">Brand Creative Services</span>
            <h2>A precise understanding of the market segment and products/services and the expertise to build a powerful brand identity and strategies with shared visual branding elements to create a long-lasting influence on our client's audience is what makes Repute the preferred branding partner.</h2>
          </div>
          
          <div className="clean-services-grid reveal">
            {serviceItems.map((item, i) => (
              <div key={i} className="clean-service-item">
                <div className="service-icon-box">
                  <img src={item.icon} alt={item.title} />
                </div>
                <h3>{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FORM & TESTIMONIAL SPLIT ── */}
      <section className="split-action-section">
        <div className="section-container">
          <div className="split-grid">
            {/* Left: Form */}
            <div className="form-side reveal">
              {status.type === 'success' ? (
                <div className="success-confirmation reveal visible">
                  <div className="success-icon-large">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>
                  </div>
                  <h2>Thank You!</h2>
                  <p>Your inquiry has been received. Our team will reach out to you shortly to discuss your brand vision.</p>
                  <button className="reset-form-btn" onClick={() => setStatus({ type: '', msg: '' })}>
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  <div className="form-header">
                    <h2>Empower your customers to be the heroes of every story you share.</h2>
                    <p className="subheading">Create buzz around your brand. We assist you in outshining your competitors.</p>
                    <p className="form-instruction">Complete the form below to initiate a brief discussion:</p>
                  </div>
                  <form className="minimal-contact-form" onSubmit={handleSubmit}>
                    <div className="form-row">
                      <input 
                        type="text" 
                        placeholder="Name*" 
                        required 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                      <input 
                        type="email" 
                        placeholder="Email*" 
                        required 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                    <input 
                      type="url" 
                      placeholder="Website" 
                      className="full-width" 
                      value={formData.website}
                      onChange={(e) => setFormData({...formData, website: e.target.value})}
                    />
                    <textarea 
                      placeholder="Message" 
                      rows="5" 
                      className="full-width"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                    ></textarea>
                    <div className="captcha-row">
                      <label>30-ten?</label>
                      <input 
                        type="text" 
                        required
                        value={formData.captcha}
                        onChange={(e) => setFormData({...formData, captcha: e.target.value})}
                      />
                    </div>
                    {status.type === 'error' && (
                      <div className="status-message error">
                        {status.msg}
                      </div>
                    )}
                    <button type="submit" className="form-submit-btn" disabled={status.type === 'loading'}>
                      {status.type === 'loading' ? 'Sending...' : 'Send Message'}
                    </button>
                    <p className="form-footer-text">Ready With Your Brand Mantra, We Help Customers to Recognize You.</p>
                  </form>
                </>
              )}
            </div>

            {/* Right: Red Testimonial Card */}
            <div className="testimonial-red-card reveal">
              <div className="testimonial-content">
                <span className="card-top-text">WHAT OUR CLIENTS HAVE TO SAY</span>
                
                <div className="author-circle-photo">
                  <img src={ayyappanPhoto} alt="Ayyappan Karunanithy" />
                </div>

                <p className="testimonial-para">
                  One Stop Solution for your business promotion activities like Website Designing and Hosting, Brochure and Business Cards, Promo Videos. Very Good Team, For all….. Keep it up
                </p>

                <div className="rating-stars">
                  {"★★★★★".split("").map((s, i) => <span key={i}>{s}</span>)}
                </div>

                <div className="author-details">
                  <h4>Ayyappan Karunanithy</h4>
                  <span>IT Manager - Unisource Trend, Tiruppur</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection 
        title="Call us to talk about!" 
        subtitle="Business, E-Commerce, Digital Marketing, Ideas or Just a Coffee"
      />

      <Footer />
    </div>
  );
};

export default BrandCreativesService;
