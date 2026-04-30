import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Footer, Icons, CTASection } from './SharedComponents';
import './DigitalMarketing.css';

const DigitalMarketing = () => {
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

  const dmPositions = [
    { title: 'Digital Marketing Executive', text: 'Promote a business on digital marketing platforms like the client’s official website and social media pages to generate leads.' },
    { title: 'Lead Generation Executive', text: 'Generate leads for our agency by reaching out to our target clients over a phone call, email, or through social media platforms.' },
    { title: 'Marketplace Catalog Executive', text: 'Promote our segmented client’s business on online shopping platforms like Amazon, Flipkart, Myntra, Ajio, and Meesho to produce leads.' },
    { title: 'PPC Strategist', text: 'Build promising PPC strategies that will guarantee viewers convert as customers to increase reach and revenue for our client’s business.' },
    { title: 'Senior SEO Specialist', text: 'Supervise all factors related to SEO, especially identifying and enhancing elements that undermine our client’s SEO ranking.' },
    { title: 'SEO Content Writer', text: 'Write unique and informative content that will attract leads to our client’s businesses by ranking them higher on search engines.' },
    { title: 'SEO Executive', text: 'Rank a client’s official website and social media pages on top of search engines like Google, Yahoo, and Bing to produce leads for their business.' },
    { title: 'Social Media Analyst', text: 'Regularly analyze the social media pages of our clients by tracking their performance and identifying factors to improve it.' },
    { title: 'Social Media Coordinator', text: 'Manage and coordinate all aspects of our client’s social media accounts in such a way that their reputation is not affected.' },
    { title: 'Social Media Executive', text: 'Promote a business on social media platforms like Instagram, Facebook, LinkedIn, and Twitter to generate leads for our clients.' },
    { title: 'Social Media Strategist', text: 'Lay out strong and relevant social media strategies that guarantee sustained digital success for our client’s businesses.' },
    { title: 'SEO Strategist', text: 'Build successful SEO strategies for clients that promise top ranking on SERPs increasing their visibility and reach.' }
  ];

  const relatedJobs = [
    {
      title: 'Brand Creatives',
      text: 'Repute’s Creative team showcases success stories of creating unique content and designs that meet our clients’ goals. Become a part of our team where your creativity & talent gets acknowledged.'
    },
    {
      title: 'Marketing',
      text: 'Repute’s Marketing services are popularly known as we have proven to be the best at delivering our client’s requirements. Apply now to join our prospective Marketing team to enhance your skills.'
    },
    {
      title: 'Web Design & Development',
      text: 'Repute is prominent in designing websites and development services for businesses across industries. Get yourself employed in our company where you gain the liberty to express your unique ideas.'
    }
  ];

  return (
    <div className="digital-marketing-page">
      <Navbar activePage="digital-marketing" />

      {/* ── HERO SECTION ── */}
      <section className="dm-hero">
        {/* Animated Particles */}
        {[...Array(15)].map((_, i) => (
          <div 
            key={i} 
            className="dm-particle" 
            style={{
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 12 + 4}px`,
              height: `${Math.random() * 12 + 4}px`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${Math.random() * 20 + 10}s`
            }}
          />
        ))}

        <div className="dm-hero-content reveal">
          <span className="dm-sub">Coimbatore, Tamilnadu</span>
          <h1>Digital & Social Media Marketing</h1>
          <p className="dm-desc">
            Build online presence, drive traffic, generate leads and grow brands with Team Repute.
          </p>
          <div className="dm-btn-group">
            <a href="#positions" className="btn-dm-luxury">View Openings</a>
            <Link to="/#contact" className="btn-dm-glass">Join Team Repute</Link>
          </div>
        </div>
      </section>

      {/* ── OPEN POSITIONS SECTION ── */}
      <section id="positions" className="dm-positions">
        <div className="dm-section-head reveal">
          <h2>Digital Growth Opportunities</h2>
          <p>Join a high-performance digital team delivering measurable results.</p>
        </div>

        <div className="dm-grid">
          {dmPositions.map((pos, i) => (
            <div key={i} className="dm-glass-card reveal">
              <div className="dm-card-tag">Digital & Social Media Marketing</div>
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
      <section className="dm-positions" style={{ background: '#fff' }}>
        <div className="dm-section-head reveal">
          <h2>Related Jobs</h2>
        </div>

        <div className="dm-grid">
          {relatedJobs.map((job, i) => (
            <div key={i} className="dm-glass-card reveal">
              <div className="dm-card-tag">Career</div>
              <h3>{job.title}</h3>
              <p>{job.text}</p>
              <div className="repute-btn-group">
                 {job.title === 'Brand Creatives' ? (
                   <Link to="/brand-creatives" className="repute-btn repute-btn-secondary">Learn More</Link>
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
      <section className="dm-culture">
        <div className="dm-culture-flex reveal">
          <div className="dm-culture-text">
            <span className="dm-culture-badge">Team REPUTE</span>
            <h2>A futuristic and inclusive environment</h2>
            <p>Become a part of an extraordinary team of creative and versatile thinkers!</p>
            <div className="dm-btn-group" style={{ justifyContent: 'flex-start' }}>
              <Link to="/#contact" className="btn-dm-luxury">Join Our Team</Link>
              <Link to="/career" className="btn-dm-glass" style={{ border: '1px solid #151B2D', color: '#151B2D' }}>Explore Careers</Link>
            </div>
          </div>
          <div className="dm-culture-visual">
            <div className="dm-blob"></div>
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

export default DigitalMarketing;
