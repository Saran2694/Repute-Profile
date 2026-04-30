import React, { useEffect } from 'react';
import { Navbar, Footer, Icons, CTASection } from './SharedComponents';
import { Link } from 'react-router-dom';
import './BrandingSolutionsService.css';

const BrandingSolutionsService = () => {
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

  const brandingConcepts = [
    "Internal and External",
    "Brand Promotion Concepts",
    "Website Development",
    "E-Com Development",
    "CRM Implementation",
    "Brochure Design",
    "Catalogue Design",
    "Stall Design",
    "Brand Identity",
    "Package Design",
    "Digital Marketing",
    "SEO",
    "SMM",
    "SEM",
    "PPC"
  ];

  return (
    <div className="service-page branding-service">
      <Navbar activePage="services" />

      {/* ── RED BANNER HERO ── */}
      <section className="brand-banner-hero">
        <div className="section-container">
          <div className="banner-content reveal">
            <span className="service-badge">Services</span>
            <h1>Integrated Branding Solutions</h1>
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
          <div className="branding-intro reveal">
            <h2>Branding is a wholesome and layered process. It is a process of delivering unified visual elements, action and commitment in unison across different marketing channels.</h2>
            <p>Our digital marketing agency is equipped with the right team to promote your brand by delivering high-impact, synchronized, and consistent narratives about your brand across different marketing channels in a cost-effective manner. The consistency in this approach enables customers to associate with brands better, thereby enhancing customer experience. In this data-driven approach, we analyze and understand consumer preferences, promote your brand consistently using stunning and authentic content, keep the audience engaged by offering a personalized experience and transform them into potential customers.</p>
          </div>

          <div className="branding-links-grid reveal">
            {brandingConcepts.map((item, i) => (
              <div key={i} className="branding-link-item">
                <span className="red-arrow">→</span>
                <span className="link-text">{item}</span>
              </div>
            ))}
          </div>

          <div className="branding-footer-text reveal">
            <p>We handle the entire spectrum of branding, employing both traditional and digital mediums. Our expertise and dexterity in integrating traditional methods with emerging digital platforms give us the edge to deliver end-to-end branding solutions and connect with consumers on a deeper level. We forge brand partnerships where we focus on branding and marketing, allowing businesses to focus on the core functionalities. Industries we successfully served with tangible and intangible metrics include education, healthcare, real estate, e-retail, e-learning, and software.</p>
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  );
};

export default BrandingSolutionsService;
