import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Footer, Icons, CTASection } from './SharedComponents';
import './WebDevelopment.css';

const WebDevelopment = () => {
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

  const webPositions = [
    { title: 'Back-End Developer', text: 'Developing and maintaining the company’s web applications and websites with clean, efficient, and maintainable code.' },
    { title: 'Full Stack Developer', text: 'Developing web applications using front-end and back-end technologies with efficient and well-documented code that adheres to best practices.' },
    { title: 'Junior Quality Analyst', text: 'Perform functional, regression, and performance testing on digital marketing campaigns and ensure defects are fixed and retested.' },
    { title: 'Junior Web Designer', text: 'Design and develop visually appealing, user-friendly, and responsive websites that work seamlessly across different devices.' },
    { title: 'Junior Web Developer', text: 'Developing and maintaining websites using HTML, CSS, and JavaScript and testing and debugging code to ensure high-quality performance.' },
    { title: 'PHP Developer', text: 'Develop, test, and deploy web applications using PHP and troubleshoot and debug issues in existing code.' },
    { title: 'Project Analyst', text: 'Developing project plans, timelines, and budgets and conducting research and analysis to support project planning and execution.' },
    { title: 'Project Coordinator', text: 'Creating and coordinating project plans and activities and ensuring project tasks are completed on time and within budget.' },
    { title: 'UI-UX Designer', text: 'Designing and implementing user interfaces for web and mobile applications and researching and analyzing user feedback to improve the user experience.' },
    { title: 'WordPress Developer', text: 'Develop WordPress themes and plugins to meet client requirements and optimize WordPress websites for performance, security, and search engine rankings.' },
    { title: 'BigCommerce Developer', text: 'Lead and contribute to the development of custom BigCommerce solutions. Build, extend, and optimize front-end and back-end features using React.js and Node.js.' },
    { title: 'Golang Developer', text: 'We are looking for a competent Golang Developer to join our engineering team. You will be responsible for designing, building, and maintaining high-performance and reliable backend systems using Go.' }
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
      title: 'Digital & Social Media Marketing',
      text: 'Repute’s Digital Marketing services are highly trusted by our happy clients as we have exceeded their expectations. Join our promising Digital Marketing team to experience a level-up in your career.'
    }
  ];

  return (
    <div className="web-dev-page">
      <Navbar activePage="web-development" />

      {/* ── HERO SECTION ── */}
      <section className="web-hero">
        {/* Animated Particles */}
        {[...Array(15)].map((_, i) => (
          <div 
            key={i} 
            className="hero-dot" 
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${Math.random() * 12 + 8}s`
            }}
          />
        ))}

        <div className="web-hero-content reveal">
          <span className="subtitle">Coimbatore, Tamilnadu</span>
          <h1>Web Development & Design</h1>
          <p className="description">
            Build scalable digital products, modern websites and future-ready applications with Team Repute.
          </p>
          <div className="btn-group">
            <a href="#positions" className="btn-web-luxury">View Openings</a>
            <Link to="/#contact" className="btn-web-glass">Join Team Repute</Link>
          </div>
        </div>
      </section>

      {/* ── OPEN POSITIONS SECTION ── */}
      <section id="positions" className="web-positions">
        <div className="web-section-head reveal">
          <h2>Web Development Opportunities</h2>
          <p>Grow your technical career with innovative real-world projects.</p>
        </div>

        <div className="web-grid">
          {webPositions.map((pos, i) => (
            <div key={i} className="job-glass-card reveal">
              <div className="tag">Web Development & Design</div>
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
      <section className="web-positions" style={{ background: '#fff' }}>
        <div className="web-section-head reveal">
          <h2>Related Jobs</h2>
        </div>

        <div className="web-grid">
          {relatedJobs.map((job, i) => (
            <div key={i} className="job-glass-card reveal">
              <div className="tag">Career</div>
              <h3>{job.title}</h3>
              <p>{job.text}</p>
              <div className="repute-btn-group">
                 {job.title === 'Brand Creatives' ? (
                   <Link to="/brand-creatives" className="repute-btn repute-btn-secondary">Learn More</Link>
                 ) : job.title === 'Digital Marketing' ? (
                   <Link to="/digital-marketing" className="repute-btn repute-btn-secondary">Learn More</Link>
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
      <section className="web-culture">
        <div className="web-culture-inner reveal">
          <div className="web-culture-text">
            <span className="web-culture-badge">Team REPUTE</span>
            <h2>A futuristic and inclusive environment</h2>
            <p>Become a part of an extraordinary team of creative and versatile thinkers!</p>
            <div className="btn-group" style={{ justifyContent: 'flex-start' }}>
              <Link to="/#contact" className="btn-web-luxury">Join Our Team</Link>
              <Link to="/career" className="btn-web-glass" style={{ border: '1px solid #151B2D', color: '#151B2D' }}>Explore Careers</Link>
            </div>
          </div>
          <div className="web-culture-visual">
            <div className="abs-curve"></div>
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

export default WebDevelopment;
