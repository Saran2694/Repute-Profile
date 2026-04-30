import React, { useEffect, useState } from 'react';
import { Navbar, Footer, Icons, CTASection } from './SharedComponents';
import { Link } from 'react-router-dom';
import { supabase } from './supabaseClient';
import './MobileDevelopmentService.css';

const MobileDevelopmentService = () => {
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
          phone: formData.website,
          subject: 'Service Inquiry',
          service: 'Mobile Development',
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

  const platforms = [
    { title: 'iOS application', icon: 'https://cdn-icons-png.flaticon.com/512/0/747.png' },
    { title: 'Android application', icon: 'https://cdn-icons-png.flaticon.com/512/174/174836.png' },
    { title: 'Flutter application', icon: 'https://cdn-icons-png.flaticon.com/512/5968/5968534.png' },
    { title: 'React Native applications', icon: 'https://cdn-icons-png.flaticon.com/512/919/919851.png' },
  ];

  return (
    <div className="service-page mobile-service">
      <Navbar activePage="services" />

      {/* ── RED BANNER HERO ── */}
      <section className="brand-banner-hero">
        <div className="section-container">
          <div className="banner-content reveal">
            <span className="service-badge">Services</span>
            <h1>Mobile Development</h1>
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

      {/* ── INTRO SECTION ── */}
      <section className="service-info-section">
        <div className="section-container">
          <div className="intro-header reveal">
            <h2>With increasing mobile connectivity, mobile applications add a new dimension to businesses from services to commerce and education to entertainment.</h2>
            <p>Repute excels in building fully functional applications with an enhanced user experience which includes application design, integration and management services. We handle the entire mobile app development process from ideation, concept creation, delivery, and ongoing support.</p>
          </div>

          <div className="platforms-grid reveal">
            {platforms.map((p, i) => (
              <div key={i} className="platform-item">
                <div className="platform-icon">
                  <img src={p.icon} alt={p.title} />
                </div>
                <h3>{p.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ACTION SECTION ── */}
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
                  <h2>Message Sent!</h2>
                  <p>Our app development experts will contact you shortly to discuss your project.</p>
                  <button className="reset-form-btn" onClick={() => setStatus({ type: '', msg: '' })}>
                    Send another inquiry
                  </button>
                </div>
              ) : (
                <>
                  <div className="form-header">
                    <h2>Launch your business to mobile devices feasible for customers. , making it easily accessible to customers</h2>
                    <p className="subheading">Reach out to us today for the expertise of top developers who can create fast, user-friendly, and secure apps</p>
                  </div>
                  <form className="minimal-contact-form" onSubmit={handleSubmit}>
                    <div className="form-row">
                      <div className="input-group">
                        <label>Name*</label>
                        <input 
                          type="text" 
                          required 
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                      </div>
                      <div className="input-group">
                        <label>Email*</label>
                        <input 
                          type="email" 
                          required 
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="input-group full-width">
                      <label>Website</label>
                      <input 
                        type="text" 
                        value={formData.website}
                        onChange={(e) => setFormData({...formData, website: e.target.value})}
                      />
                    </div>
                    <div className="input-group full-width">
                      <label>Message</label>
                      <textarea 
                        rows="5" 
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                      ></textarea>
                    </div>
                    <div className="captcha-row">
                      <label>five+5?</label>
                      <input 
                        type="text" 
                        required
                        value={formData.captcha}
                        onChange={(e) => setFormData({...formData, captcha: e.target.value})}
                      />
                    </div>
                    <button type="submit" className="form-submit-btn" disabled={status.type === 'loading'}>
                      {status.type === 'loading' ? 'Sending...' : 'Partner with us'}
                    </button>
                    <p className="form-footer-text">Let's begin crafting a custom mobile app tailored to your brand.</p>
                  </form>
                </>
              )}
            </div>

            {/* Right: Red Testimonial Card */}
            <div className="testimonial-red-card reveal">
              <div className="testimonial-content">
                <span className="card-top-text">WHAT OUR CLIENTS HAVE TO SAY</span>
                
                <div className="author-circle-photo">
                  <div className="placeholder-avatar">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                  </div>
                </div>

                <p className="testimonial-para">
                  Good supporting team… Excellent coordination.. on time work completion and timely support during critical situations.. keep it up team repute..
                </p>

                <div className="rating-stars">
                  {"★★★★★".split("").map((s, i) => <span key={i}>{s}</span>)}
                </div>

                <div className="author-details">
                  <h4>Vinoth Kumar</h4>
                  <span>MD - Tech & Castle</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection title="Call us to talk about!" subtitle="Business, E-Commerce, Digital Marketing, Ideas or Just a Coffee" buttonText="Contact Us" />
      <Footer />
    </div>
  );
};
export default MobileDevelopmentService;