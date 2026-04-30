import React, { useEffect, useState } from 'react';
import { Navbar, Footer, Icons, CTASection } from './SharedComponents';
import { Link } from 'react-router-dom';
import { supabase } from './supabaseClient';
import './WebDevelopmentService.css';

const WebDevelopmentService = () => {
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
          service: 'Web Development',
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

  const primaryServices = [
    { title: 'Website Design', icon: 'https://cdn-icons-png.flaticon.com/512/2972/2972173.png' },
    { title: 'Content Management Services', icon: 'https://cdn-icons-png.flaticon.com/512/3067/3067160.png' },
    { title: 'Related Services', subtitle: 'SEO | SMM | Ecommerce Development', icon: 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png' },
  ];

  const detailedServices = [
    { title: 'Web-based application development', icon: 'https://cdn-icons-png.flaticon.com/512/2950/2950151.png' },
    { title: 'E-learning portals', icon: 'https://cdn-icons-png.flaticon.com/512/3067/3067160.png' },
    { title: 'Dynamic website', icon: 'https://cdn-icons-png.flaticon.com/512/2972/2972173.png' },
    { title: 'CMS Website Development', icon: 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png' },
    { title: 'CRM integration', icon: 'https://cdn-icons-png.flaticon.com/512/3081/3081986.png' },
    { title: 'Matrimony portals', icon: 'https://cdn-icons-png.flaticon.com/512/2897/2897587.png' },
    { title: 'E-Commerce Development', icon: 'https://cdn-icons-png.flaticon.com/512/1055/1055644.png' },
    { title: 'WordPress Website Design', icon: 'https://cdn-icons-png.flaticon.com/512/2950/2950151.png' },
    { title: 'Food delivery portals', icon: 'https://cdn-icons-png.flaticon.com/512/3067/3067160.png' },
    { title: 'Static website', icon: 'https://cdn-icons-png.flaticon.com/512/2972/2972173.png' },
    { title: 'Responsive website', icon: 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png' },
    { title: 'Custom Web Development Services', icon: 'https://cdn-icons-png.flaticon.com/512/3081/3081986.png' },
  ];

  return (
    <div className="service-page web-service">
      <Navbar activePage="services" />

      {/* ── RED BANNER HERO ── */}
      <section className="brand-banner-hero">
        <div className="section-container">
          <div className="banner-content reveal">
            <span className="service-badge">Services</span>
            <h1>Website Design & Development</h1>
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

      {/* ── SECTION 1: INTRO ── */}
      <section className="service-info-section">
        <div className="section-container">
          <div className="split-info reveal">
            <div className="info-text">
              <p>The website is the pivotal point of your digital presence which talks about your brand and helps your customers get to know you better. We understand client requirements and strategically design unique and innovative websites integrating the latest technology with personalized UI and UX designs that convey the essence of the brand.</p>
            </div>
          </div>

          <div className="primary-services-grid reveal">
            {primaryServices.map((item, i) => (
              <div key={i} className="clean-service-item">
                <div className="service-icon-box">
                  <img src={item.icon} alt={item.title} />
                </div>
                <h3>{item.title}</h3>
                {item.subtitle && <p className="item-subtitle">{item.subtitle}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 2: WEB DEV COMPANY ── */}
      <section className="service-info-section light-bg">
        <div className="section-container">
          <div className="split-grid-v2 reveal">
            <div className="visual-side">
              <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800" alt="Web Development" className="rounded-img" />
            </div>
            <div className="text-side">
              <h2>Website Development Company in Coimbatore</h2>
              <p>Web-based applications are the backbone of almost every business in recent times. We build diverse web-based applications like customer engagement/service applications and service portals to marketplace aggregator portals to internal resource management or self-service applications to suit complex business needs.</p>
              <p>We deliver aesthetically designed, fully functional, and easily accessible websites with engaging content that improves brand visibility, drives traffic, and generates leads and conversions.</p>
              <p className="highlight">Empowering businesses with custom web applications and responsive designs that boost engagement, drive traffic, and deliver seamless user experiences on every device.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: DETAILED SERVICES ── */}
      <section className="detailed-services-section">
        <div className="section-container">
          <div className="section-header reveal">
            <span className="mini-tag">Website design and development</span>
            <h2>Repute is a strategic website design and development company leveraging the benefits of open-source technology to deliver cost-effective sites at low lead times.</h2>
          </div>
          
          <div className="clean-services-grid reveal">
            {detailedServices.map((item, i) => (
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

      {/* ── SECTION 4: CMS ── */}
      <section className="service-info-section">
        <div className="section-container">
          <div className="split-grid-v2 reverse reveal">
            <div className="visual-side">
              <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800" alt="CMS Services" className="rounded-img" />
            </div>
            <div className="text-side">
              <h2>Content Management Services</h2>
              <p>Content is the foundation of web communication which conveys information about your brand grabbing readers’ attention, driving website traffic, generating hot leads, and even boosting conversions.</p>
              <p>Our content strategy includes intense research and writing SEO-friendly content to meet your business objectives. Repute is a top-notch digital marketing company offering specialized content writing services, with expert writers providing relevant, precise, original and attention-grabbing content for your website, marketing campaigns, infographics, blogs/articles and promotional emails.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 5: SEO ── */}
      <section className="service-info-section light-bg">
        <div className="section-container">
          <div className="split-grid-v2 reveal">
            <div className="visual-side">
              <img src="https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&q=80&w=800" alt="SEO Services" className="rounded-img" />
            </div>
            <div className="text-side">
              <h2>Search Engine Optimization and Marketing</h2>
              <p>We are a Digital Marketing Company in Coimbatore providing customized solutions for Search Engine Optimisation and Marketing backed by solid processes.</p>
              <p>Armed with the experience of working with clients across industry sectors, we have the expertise to understand changing search engine algorithms, and customer requirements and build real-time strategies to tackle wide-ranging SEO scenarios. We ensure transparency in processes and services and keep our customers informed via user-friendly reporting with KPIs to facilitate quick decision-making.</p>
            </div>
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
                  <h2>Thank You!</h2>
                  <p>Your web development inquiry has been received. Our experts will analyze your requirements and get back to you shortly.</p>
                  <button className="reset-form-btn" onClick={() => setStatus({ type: '', msg: '' })}>
                    Design another site
                  </button>
                </div>
              ) : (
                <>
                  <div className="form-header">
                    <h2>Make your page visitors go WOW with web designs.</h2>
                    <p className="subheading">Ready to captivate your audience's attention through exceptional design and enhanced user experiences? Contact us now to create a webpage that makes them say WOW.</p>
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
                      {status.type === 'loading' ? 'Sending...' : 'Design My Site'}
                    </button>
                    <p className="form-footer-text">We design your business website from scratch towards success.</p>
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
                  They are providing best Web Designing works, Excellent support and dedicated works. Thanks for the best web designing works to Repute Digital Business Agency.
                </p>

                <div className="rating-stars">
                  {"★★★★★".split("").map((s, i) => <span key={i}>{s}</span>)}
                </div>

                <div className="author-details">
                  <h4>V.P. Thangavel</h4>
                  <span>Advocate</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  );
};

export default WebDevelopmentService;
