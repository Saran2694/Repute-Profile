import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import img2 from './img 2.jpg';
import img3 from './img 3.jpg';
import AboutUs from './AboutUs';
import Career from './Career';
import BrandCreatives from './BrandCreatives';
import WebDevelopment from './WebDevelopment';
import Marketing from './Marketing';
import DigitalMarketing from './DigitalMarketing';
import DigitalMarketingService from './DigitalMarketingService';
import Contact from './Contact';
import JobDetailsGraphicDesigner from './JobDetailsGraphicDesigner';
import JobDetailsVideoIntern from './JobDetailsVideoIntern';
import ApplyPage from './ApplyPage';
import Portfolio from './Portfolio';
import BrandCreativesService from './BrandCreativesService';
import WebDevelopmentService from './WebDevelopmentService';
import EcommerceService from './EcommerceService';
import BrandingSolutionsService from './BrandingSolutionsService';
import MobileDevelopmentService from './MobileDevelopmentService';
import IntegratedEcommerceService from './IntegratedEcommerceService';
import { Navbar, Footer, Icons, CTASection } from './SharedComponents';
import AdminLogin from './pages/AdminLogin';
import Dashboard from './pages/Dashboard';
import PortfolioAdmin from './pages/Portfolio';
import CareersAdmin from './pages/Careers';
import InquiriesAdmin from './pages/Inquiries';
import ApplicationsAdmin from './pages/Applications';
import ServiceInquiries from './pages/ServiceInquiries';
import WebsiteCMS from './pages/WebsiteCMS';
import ProtectedRoute from './components/ProtectedRoute';
import { supabase } from './supabaseClient';
import TestimonialsCMS from './pages/TestimonialsCMS';
import BlogCMS from './pages/BlogCMS';
import SeoCMS from './pages/SeoCMS';
import ContactCMS from './pages/ContactCMS';
import MasterCMS from './pages/MasterCMS';

/* =============================================
   HOME PAGE
   ============================================= */
function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
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

    const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

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

      // 2. Send via EmailJS
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
        console.log("SUCCESS");
        setStatus({ type: 'success', message: 'Mail was sent successfully' });

        // Clear all fields
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: 'Select a service',
          subject: '',
          details: ''
        });

        // Hide success message after 8 seconds
        setTimeout(() => setStatus({ type: null, message: null }), 8000);
      } else {
        const errorData = await response.text();
        console.error("FAILED:", errorData);
        setStatus({ type: 'error', message: 'Mail failed to send. Please try again.' });
      }
    } catch (error) {
      console.error("FAILED EXCEPTION:", error);
      setStatus({ type: 'error', message: 'Mail failed to send. Please try again.' });
    } finally {
      setIsSending(false);
    }
  };

  const [heroData, setHeroData] = useState({
    heading: 'E-Commerce, The Easiest & Toughest Business',
    subtext: 'Let us discuss how to make it profitable',
    button: 'Repute E-Commerce Services',
    image: img3
  });

  const [aboutData, setAboutData] = useState({
    heading: 'Full Service Digital Agency',
    description: 'Repute is a Full Service Digital Agency that helps Build - Promote - Market Brands.',
    image: img2
  });

  const [stats, setStats] = useState({
    years: '18+',
    professionals: '50+',
    clients: '600+'
  });

  const [ecomBanner, setEcomBanner] = useState({
    title: 'Ride high on your E-Commerce Sales',
    subtitle: 'We are keen, clinical, creative and outcome-driven.'
  });

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const { data } = await supabase.from('site_content').select('*').eq('page', 'home');
        if (data && data.length > 0) {
          const content = {};
          data.forEach(item => content[item.field_key] = item.field_value);
          
          if (content.hero_title) {
            setHeroData({
              heading: content.hero_title || 'E-Commerce, The Easiest & Toughest Business',
              subtext: content.hero_subtitle || 'Let us discuss how to make it profitable',
              button: content.hero_button_text || 'Repute E-Commerce Services',
              image: content.hero_image || img3
            });
          }
          
          if (content.about_heading) {
            setAboutData({
              heading: content.about_heading || 'Full Service Digital Agency',
              description: content.about_description || 'Repute is a Full Service Digital Agency that helps Build - Promote - Market Brands.',
              image: content.about_image || img2
            });
          }

          setStats({
            years: content.stats_years || '18+',
            professionals: content.stats_professionals || '50+',
            clients: content.stats_clients || '600+'
          });

          setEcomBanner({
            title: content.ecom_banner_title || 'Ride high on your E-Commerce Sales',
            subtitle: content.ecom_banner_subtitle || 'We are keen, clinical, creative and outcome-driven.'
          });
        }
      } catch (err) {
        console.error('Error fetching home content:', err);
      }
    };
    fetchContent();
  }, []);


  const [dynamicSlides, setDynamicSlides] = useState([]);
  const [dynamicWorkServices, setDynamicWorkServices] = useState([]);

  useEffect(() => {
    const fetchHomeContent = async () => {
      try {
        // Fetch Slides
        const { data: slidesData } = await supabase
          .from('page_sections')
          .select('*')
          .eq('page_slug', 'home')
          .order('created_at', { ascending: true });
        
        if (slidesData) {
          setDynamicSlides(slidesData.map(sec => ({
            image: sec.image_url || img2,
            heading: sec.title,
            subtext: sec.content,
            button: sec.button_text || 'Learn More'
          })));
        }

        // Fetch Work & Services
        const { data: workData } = await supabase
          .from('page_sections')
          .select('*')
          .eq('page_slug', 'home_work_services')
          .order('created_at', { ascending: true });
        
        if (workData) {
          setDynamicWorkServices(workData);
        }
      } catch (err) {
        console.error('Error fetching home content:', err);
      }
    };
    fetchHomeContent();
  }, []);

  const defaultSlides = [
    {
      image: heroData.image,
      heading: heroData.heading,
      subtext: heroData.subtext,
      button: heroData.button,
    },
    {
      image: '/img/img1.jpg',
      heading: 'Is Your Brand Attracting Prospects?',
      subtext: 'Let us discuss',
      button: 'Repute Branding Services',
    },
    {
      image: img2,
      heading: 'Grow Faster With Smart Digital Marketing',
      subtext: 'Reach more customers online',
      button: 'Repute Marketing Services',
    },
  ];

  const slides = dynamicSlides.length > 0 ? dynamicSlides : defaultSlides;

  /* Auto-slide every 4 seconds */
  useEffect(() => {
    if (slides.length <= 1) return; // Don't auto-slide if there's only 1 slide
    const timer = setInterval(() => setCurrentSlide(p => (p + 1) % slides.length), 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  /* Scroll reveal */
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.12 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [dynamicWorkServices, slides]);


  return (
    <div className="page-wrapper">
      <Navbar activePage="home" />

      <main>
        {/* ── HERO SLIDER ── */}
        <section className="hero-slider">
          <div className="hero-slides-wrapper">
            {slides.map((s, i) => (
              <div key={i} className={`hero-slide ${i === currentSlide ? 'active' : ''}`}>
                <div className="hero-slide-bg" style={{ backgroundImage: `url('${s.image}')` }} />
                <div className="hero-content">
                  <h1 className="hero-heading">{s.heading}</h1>
                  <p className="hero-yellow">{s.subtext}</p>
                  <div className="hero-btn-container">
                    <button className="hero-btn">{s.button}</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Manual Side Controls */}
          <button
            className="hero-nav-btn prev"
            onClick={() => setCurrentSlide((currentSlide - 1 + slides.length) % slides.length)}
            aria-label="Previous slide"
          >
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6" /></svg>
          </button>
          <button
            className="hero-nav-btn next"
            onClick={() => setCurrentSlide((currentSlide + 1) % slides.length)}
            aria-label="Next slide"
          >
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6" /></svg>
          </button>

          {/* 3 Circles Navigation (From User Image) */}
          <div className="hero-circles-nav">
            {slides.map((s, i) => (
              <div
                key={i}
                className={`hero-circle-item ${i === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(i)}
              >
                <div className="hero-circle-img" style={{ backgroundImage: `url('${s.image}')` }}></div>
                <div className="hero-circle-border"></div>
              </div>
            ))}
          </div>

          <div className="hero-dots-container">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`hero-dot ${i === currentSlide ? 'active' : ''}`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </section>


        {/* ── DYNAMIC WORK & SERVICES (Part 1: Web & Marketing) ── */}
        {dynamicWorkServices.slice(0, 2).map((work, idx) => {
          let elements = [];
          try {
            if (typeof work.content === 'string' && (work.content.trim().startsWith('[') || work.content.trim().startsWith('{'))) {
              elements = JSON.parse(work.content) || [];
            } else if (typeof work.content === 'string' && work.content.trim() !== '') {
              // Fallback to comma-separated format: Title: Description, Title: Description
              elements = work.content.split(',').map(item => {
                const parts = item.split(':');
                return { 
                  title: parts[0]?.trim() || 'Service', 
                  description: parts.slice(1).join(':')?.trim() || '', 
                  icon: 'fas fa-cog' 
                };
              });
            } else if (Array.isArray(work.content)) {
              elements = work.content;
            }
          } catch(e) {
            console.error("Error parsing content for section", work.id, e);
          }
          
          return (
            <section key={work.id} className="services-section" style={{ background: idx % 2 === 0 ? 'var(--white)' : 'var(--gray-light)' }}>
              <div className="section-container reveal" style={{ textAlign: 'center' }}>
                <span className="section-tag">{work.button_text}</span>
                <h2 className="section-heading" dangerouslySetInnerHTML={{ 
                  __html: (work.title || '').replace(/(\w+)$/, '<span class="red">$1</span>') 
                }}></h2>
                <div className="section-divider center"></div>
                <div className="services-grid">
                  {elements.map((el, i) => (
                    <div key={i} className="service-card">
                      <div className="service-icon" style={{ fontSize: '28px' }}>
                        {el.icon && el.icon.startsWith('<svg') ? (
                          <div dangerouslySetInnerHTML={{ __html: el.icon }}></div>
                        ) : (
                          <i className={el.icon || 'fas fa-cog'}></i>
                        )}
                      </div>
                      <h3>{el.title}</h3>
                      <p>{el.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          );
        })}

        {/* ── STATS ── */}
        <section className="stats-section">
          <div className="section-container reveal">
            <div className="stats-grid">
              {[
                { number: stats.years, label: 'Years in Market' },
                { number: stats.professionals, label: 'Experienced Professionals' },
                { number: stats.clients, label: 'Happy Clients' },
              ].map((s, i) => (
                <div key={i} className="stat-card">
                  <div className="stat-number">{s.number}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ABOUT (Home) ── */}
        <section id="about" className="about-section-home" style={{ background: 'var(--white)' }}>
          <div className="section-container reveal">
            <div className="about-grid">
              <div>
                <span className="section-tag">Who We Are</span>
                <h2 className="section-heading" dangerouslySetInnerHTML={{ __html: aboutData.heading.replace('Digital', '<span class="red">Digital</span>') }}></h2>
                <div className="section-divider"></div>
                <p className="section-text" style={{ whiteSpace: 'pre-line' }}>{aboutData.description}</p>
                <Link to="/about" className="btn-primary" style={{ marginTop: '16px' }}>Learn More</Link>
              </div>
              <div className="stats-grid" style={{ background: 'transparent' }}>
                {[
                  { number: stats.years, label: 'Years in Market' },
                  { number: stats.professionals, label: 'Experienced Professionals' },
                  { number: stats.clients, label: 'Happy Clients' },
                ].map((s, i) => (
                  <div key={i} style={{ background: 'var(--blue)', borderRadius: '16px', padding: '28px 16px', textAlign: 'center', transition: 'var(--transition)' }}>
                    <div className="stat-number">{s.number}</div>
                    <div className="stat-label">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── E-COMMERCE BANNER ── */}
        <section className="services-section" style={{ background: 'var(--white)', paddingTop: 0 }}>
          <div className="section-container reveal" style={{ textAlign: 'center' }}>
            <div className="ecom-banner" style={{ marginTop: 0 }}>
              <h3>{ecomBanner.title}</h3>
              <p>{ecomBanner.subtitle}</p>
            </div>
          </div>
        </section>

        {/* ── DYNAMIC WORK & SERVICES (Part 2: E-Commerce) ── */}
        {dynamicWorkServices.slice(2).map((work, idx) => {
          let elements = [];
          try {
            if (typeof work.content === 'string' && (work.content.trim().startsWith('[') || work.content.trim().startsWith('{'))) {
              elements = JSON.parse(work.content) || [];
            } else if (typeof work.content === 'string' && work.content.trim() !== '') {
              elements = work.content.split(',').map(item => {
                const parts = item.split(':');
                return { 
                  title: parts[0]?.trim() || 'Service', 
                  description: parts.slice(1).join(':')?.trim() || '', 
                  icon: 'fas fa-cog' 
                };
              });
            } else if (Array.isArray(work.content)) {
              elements = work.content;
            }
          } catch(e) {
            console.error("Error parsing content for section", work.id, e);
          }
          
          return (
            <section key={work.id} className="services-section" style={{ background: 'var(--gray-light)' }}>
              <div className="section-container reveal" style={{ textAlign: 'center' }}>
                <span className="section-tag">{work.button_text}</span>
                <h2 className="section-heading" dangerouslySetInnerHTML={{ 
                  __html: (work.title || '').replace(/(\w+)$/, '<span class="red">$1</span>') 
                }}></h2>
                <div className="section-divider center"></div>
                <div className="services-grid">
                  {elements.map((el, i) => (
                    <div key={i} className="service-card">
                      <div className="service-icon" style={{ fontSize: '28px' }}>
                        {el.icon && el.icon.startsWith('<svg') ? (
                          <div dangerouslySetInnerHTML={{ __html: el.icon }}></div>
                        ) : (
                          <i className={el.icon || 'fas fa-cog'}></i>
                        )}
                      </div>
                      <h3>{el.title}</h3>
                      <p>{el.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          );
        })}



        {/* ── CTA ── */}
        <CTASection
          title={<>Let's Discuss Your <span style={{ color: 'var(--blue)' }}>Project</span></>}
          subtitle="Fill out the form below and our team will get back to you shortly"
        />

        {/* ── CONTACT FORM ── */}
        <section id="contact" className="contact-section">
          <div className="section-container reveal">
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <span className="section-tag">Get in Touch</span>
              <h2 className="section-heading" style={{ color: '#fff' }}>Let's <span style={{ color: 'var(--red)' }}>Connect</span></h2>
              <div className="section-divider center"></div>
            </div>
            <form className="contact-form" style={{ maxWidth: '800px', margin: '0 auto' }} onSubmit={sendEmail}>
              <div className="form-grid">
                <div><label>Your Name *</label><input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your full name" required /></div>
                <div><label>Email Address *</label><input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="your.email@example.com" required /></div>
              </div>
              <div className="form-grid">
                <div><label>Phone Number</label><input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter 10-digit number" pattern="[0-9]{10}" minLength="10" maxLength="10" /></div>
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
              <div className="form-group"><label>Subject *</label><input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="What is your project about?" required /></div>
              <div className="form-group"><label>Project Details *</label><textarea name="details" value={formData.details} onChange={handleChange} rows="5" placeholder="Tell us about your project..." required style={{ resize: 'none' }}></textarea></div>

              {status.message && (
                <div className={status.type === 'success' ? 'success-msg' : 'error-msg'} style={{ marginBottom: '20px' }}>
                  <p>{status.message}</p>
                  {status.type === 'success' && (
                    <p style={{ fontSize: '0.75rem', marginTop: '4px', opacity: 0.9 }}>
                      If not found, check Spam / Promotions folder.
                    </p>
                  )}
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
      </main>

      <Footer />
    </div>
  );
}

/* =============================================
   MAIN APP WITH ROUTING
   ============================================= */
export default function App() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/career" element={<Career />} />
      <Route path="/portfolio" element={<Portfolio />} />
      <Route path="/career/brand-creatives" element={<BrandCreatives />} />
      <Route path="/career/web-development" element={<WebDevelopment />} />
      <Route path="/brand-creatives" element={<BrandCreativesService />} />
      <Route path="/web-development" element={<WebDevelopmentService />} />
      <Route path="/ecommerce" element={<EcommerceService />} />
      <Route path="/branding-solutions" element={<BrandingSolutionsService />} />
      <Route path="/mobile-development" element={<MobileDevelopmentService />} />
      <Route path="/integrated-ecommerce" element={<IntegratedEcommerceService />} />
      <Route path="/marketing" element={<Marketing />} />
      <Route path="/digital-marketing" element={<DigitalMarketingService />} />
      <Route path="/career/digital-marketing" element={<DigitalMarketing />} />
      <Route path="/career/graphic-designer" element={<JobDetailsGraphicDesigner />} />
      <Route path="/career/video-editing-intern" element={<JobDetailsVideoIntern />} />
      <Route path="/career/apply" element={<ApplyPage />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/adminpage" element={<AdminLogin />} />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path="/dashboard/portfolio" element={
        <ProtectedRoute>
          <PortfolioAdmin />
        </ProtectedRoute>
      } />
      <Route path="/dashboard/careers" element={
        <ProtectedRoute>
          <CareersAdmin />
        </ProtectedRoute>
      } />
      <Route path="/dashboard/inquiries" element={
        <ProtectedRoute>
          <InquiriesAdmin />
        </ProtectedRoute>
      } />
      <Route path="/dashboard/applications" element={
        <ProtectedRoute>
          <ApplicationsAdmin />
        </ProtectedRoute>
      } />
      <Route path="/dashboard/service-inquiries" element={
        <ProtectedRoute>
          <ServiceInquiries />
        </ProtectedRoute>
      } />
      <Route path="/dashboard/master-cms" element={
        <ProtectedRoute>
          <MasterCMS />
        </ProtectedRoute>
      } />
    </Routes>
  );
}
