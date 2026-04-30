import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Footer, Icons, CTASection } from './SharedComponents';
import './BrandCreatives.css';

const BrandCreatives = () => {
  const navigate = useNavigate();
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

  const openPositions = [
    {
      title: 'Graphic Designer',
      tag: 'Brand Creatives',
      text: 'Design attractive and unique branding for businesses that depict their agenda and help them gain customers.'
    },
    {
      title: 'Video Editing Intern',
      tag: 'Brand Creatives',
      text: 'Learn to create appealing high-quality videos and the right type of editing from our highly experienced video experts.'
    },
    {
      title: 'Video Editor',
      tag: 'Brand Creatives',
      text: 'Create visually engaging and informative high-quality videos with the right editing to provide the best output for our clients.'
    }
  ];

  const relatedJobs = [
    {
      title: 'Marketing',
      tag: 'Career',
      text: 'Repute’s Marketing services are popularly known as we have proven to be the best at delivering our client’s requirements. Apply now to join our prospective Marketing team to enhance your skills.'
    },
    {
      title: 'Web Design & Development',
      tag: 'Career',
      text: 'Repute is prominent in designing websites and development services for businesses across industries. Get yourself employed in our company where you gain the liberty to express your unique ideas.'
    },
    {
      title: 'Digital & Social Media Marketing',
      tag: 'Career',
      text: 'Repute’s Digital Marketing services are highly trusted by our happy clients as we have exceeded their expectations. Join our promising Digital Marketing team to experience a level-up in your career.'
    }
  ];

  return (
    <div className="brand-creatives-page">
      <Navbar activePage="brand-creatives" />

      {/* ── HERO SECTION ── */}
      <section className="creatives-hero">
        {/* Animated Particles */}
        {[...Array(12)].map((_, i) => (
          <div 
            key={i} 
            className="hero-particle" 
            style={{
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 8 + 4}px`,
              height: `${Math.random() * 8 + 4}px`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${Math.random() * 15 + 10}s`
            }}
          />
        ))}

        <div className="creatives-hero-content reveal">
          <span className="subtitle">Coimbatore, Tamilnadu</span>
          <h1>Brand Creatives</h1>
          <p className="description">
            Creative opportunities for designers, editors, storytellers and visual thinkers.
          </p>
          <div className="hero-btn-group">
            <a href="#positions" className="btn-luxury-red">View Openings</a>
            <Link to="/#contact" className="btn-luxury-glass">Join Team Repute</Link>
          </div>
        </div>
      </section>

      {/* ── OPEN POSITIONS SECTION ── */}
      <section id="positions" className="positions-section">
        <div className="section-head reveal">
          <h2>Brand Creatives Opportunities</h2>
          <p>Build your creative future with a fast-growing digital brand.</p>
        </div>

        <div className="creatives-grid">
          {openPositions.map((pos, i) => (
            <div key={i} className="creative-card reveal">
              <div className="card-tag">{pos.tag}</div>
              <h3 className="card-title">{pos.title}</h3>
              <p className="card-text">{pos.text}</p>
              <div className="repute-btn-group">
                {pos.title === 'Graphic Designer' ? (
                  <Link to="/career/graphic-designer" className="repute-btn repute-btn-secondary">Learn More</Link>
                ) : pos.title === 'Video Editing Intern' ? (
                  <Link to="/career/video-editing-intern" className="repute-btn repute-btn-secondary">Learn More</Link>
                ) : (
                  <button className="repute-btn repute-btn-secondary">Learn More</button>
                )}
                <button 
                  className="repute-btn repute-btn-primary" 
                  onClick={() => navigate('/career/apply', { state: { jobTitle: pos.title } })}
                >
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── RELATED JOBS SECTION ── */}
      <section className="positions-section" style={{ background: '#fff' }}>
        <div className="section-head reveal">
          <h2>Related Jobs</h2>
        </div>

        <div className="creatives-grid">
          {relatedJobs.map((job, i) => (
            <div key={i} className="creative-card reveal">
              <div className="card-tag">{job.tag}</div>
              <h3 className="card-title">{job.title}</h3>
              <p className="card-text">{job.text}</p>
              <div className="repute-btn-group">
                 {job.title === 'Digital Marketing' ? (
                   <Link to="/digital-marketing" className="repute-btn repute-btn-secondary">Learn More</Link>
                 ) : job.title === 'Web Design & Development' ? (
                   <Link to="/web-development" className="repute-btn repute-btn-secondary">Learn More</Link>
                 ) : job.title === 'Marketing' ? (
                   <Link to="/marketing" className="repute-btn repute-btn-secondary">Learn More</Link>
                 ) : (
                   <Link to="/career" className="repute-btn repute-btn-secondary">Learn More</Link>
                 )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── TEAM CULTURE SECTION ── */}
      <section className="creatives-culture">
        <div className="culture-flex reveal">
          <div className="culture-content">
            <span className="culture-badge">Team REPUTE</span>
            <h2>A futuristic and inclusive environment</h2>
            <p>Become a part of an extraordinary team of creative and versatile thinkers!</p>
            <div className="hero-btn-group" style={{ justifyContent: 'flex-start' }}>
              <Link to="/#contact" className="btn-luxury-red">Join Our Team</Link>
              <Link to="/career" className="btn-luxury-glass" style={{ border: '1px solid #151B2D', color: '#151B2D' }}>Explore Careers</Link>
            </div>
          </div>
          <div className="culture-visual">
            <div className="culture-blob"></div>
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80"
              alt="Creative Digital Team Meeting"
              className="team-image"
            />
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ── */}
      <CTASection />

      <Footer />
    </div>
  );
};

export default BrandCreatives;
