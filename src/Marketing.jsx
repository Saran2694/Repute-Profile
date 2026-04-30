import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Footer, Icons, CTASection } from './SharedComponents';
import './Marketing.css';

const Marketing = () => {
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

  const marketingPositions = [
    { title: 'Analytics Executive', text: 'Analyze and interpret data from various sources such as Google Analytics, social media, and advertising platforms to assess our overall performance.' },
    { title: 'Business Development Executive', text: 'Identify and contact new business opportunities and develop strategies, build, and maintain strong relationships with clients to grow our clientele base.' },
    { title: 'Client Service Executive', text: 'Manage client accounts, understand their needs, and build strong relationships with them to develop customized solutions to meet their requirements.' },
    { title: 'Inside Sales Executive', text: 'Building and maintaining relationships with existing clients and managing their sales accounts to ensure repeat business and customer satisfaction.' },
    { title: 'Marketing Executive', text: 'Conduct market research to identify the target audience, and industry trends and develop and execute marketing strategies to meet business objectives.' },
    { title: 'Sales Executive', text: 'Developing and implementing sales strategies to achieve targets and building and maintaining a sales pipeline to ensure consistent achievement of sales.' },
    { title: 'Tele marketing Executive', text: 'Conducting outbound calls or emails to prospective clients and developing and implementing scripts and strategies to maximize lead generation.' }
  ];

  const relatedJobs = [
    {
      title: 'Brand Creatives',
      text: 'Repute’s Creative team showcases success stories of creating unique content and designs that meet our clients’ goals. Become a part of our team where your creativity & talent gets acknowledged.'
    },
    {
      title: 'Web Design & Development',
      text: 'Repute is prominent in designing websites and development services for businesses across industries. Get yourself employed in our company where you gain the liberty to express your unique ideas.'
    },
    {
      title: 'Digital & Social Media Marketing',
      text: 'Repute’s Digital Marketing services are highly trusted by our happy clients as we have exceeded their expectations. Join our promising Digital Marketing team to experience a level-up in your career.'
    }
  ];

  return (
    <div className="marketing-page">
      <Navbar activePage="marketing" />

      {/* ── HERO SECTION ── */}
      <section className="mkt-hero">
        {/* Animated Particles */}
        {[...Array(15)].map((_, i) => (
          <div 
            key={i} 
            className="mkt-hero-particle" 
            style={{
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 10 + 4}px`,
              height: `${Math.random() * 10 + 4}px`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${Math.random() * 20 + 10}s`
            }}
          />
        ))}

        <div className="mkt-hero-content reveal">
          <span className="sub">Coimbatore, Tamilnadu</span>
          <h1>Marketing</h1>
          <p className="desc">
            Grow brands, generate leads, scale business performance and build success with Team Repute.
          </p>
          <div className="mkt-btn-group">
            <a href="#positions" className="btn-mkt-luxury">View Openings</a>
            <Link to="/#contact" className="btn-mkt-glass">Join Team Repute</Link>
          </div>
        </div>
      </section>

      {/* ── OPEN POSITIONS SECTION ── */}
      <section id="positions" className="mkt-positions">
        <div className="mkt-section-head reveal">
          <h2>Marketing Opportunities</h2>
          <p>Join a performance-driven team creating measurable growth.</p>
        </div>

        <div className="mkt-grid">
          {marketingPositions.map((pos, i) => (
            <div key={i} className="mkt-glass-card reveal">
              <div className="mkt-tag">Marketing</div>
              <h3>{pos.title}</h3>
              <p>{pos.text}</p>
              <div className="repute-btn-group">
                <button className="repute-btn repute-btn-secondary">Learn More</button>
                <Link to="/career/apply" state={{ jobTitle: pos.title }} className="repute-btn repute-btn-primary">Apply Now</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── RELATED JOBS SECTION ── */}
      <section className="mkt-positions" style={{ background: '#fff' }}>
        <div className="mkt-section-head reveal">
          <h2>Related Jobs</h2>
        </div>

        <div className="mkt-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))' }}>
          {relatedJobs.map((job, i) => (
            <div key={i} className="mkt-glass-card reveal">
              <div className="mkt-tag">Career</div>
              <h3>{job.title}</h3>
              <p>{job.text}</p>
              <div className="repute-btn-group">
                 {job.title === 'Brand Creatives' ? (
                   <Link to="/brand-creatives" className="repute-btn repute-btn-secondary">Learn More</Link>
                 ) : job.title === 'Web Design & Development' ? (
                   <Link to="/web-development" className="repute-btn repute-btn-secondary">Learn More</Link>
                 ) : (
                   <Link to="/career" className="repute-btn repute-btn-secondary">Learn More</Link>
                 )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── TEAM CULTURE SECTION ── */}
      <section className="mkt-culture">
        <div className="mkt-culture-flex reveal">
          <div className="mkt-culture-text">
            <span className="mkt-culture-badge">Team REPUTE</span>
            <h2>A futuristic and inclusive environment</h2>
            <p>Become a part of an extraordinary team of creative and versatile thinkers!</p>
            <div className="mkt-btn-group" style={{ justifyContent: 'flex-start' }}>
              <Link to="/#contact" className="btn-mkt-luxury">Join Our Team</Link>
              <Link to="/career" className="btn-mkt-glass" style={{ border: '1px solid #151B2D', color: '#151B2D' }}>Explore Careers</Link>
            </div>
          </div>
          <div className="mkt-culture-visual">
            <div className="mkt-blob"></div>
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

export default Marketing;
