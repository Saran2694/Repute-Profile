import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Footer, Icons, CTASection } from './SharedComponents';
import { supabase } from './supabaseClient';
import './Career.css';

const Career = () => {
  const navigate = useNavigate();
  const [liveJobs, setLiveJobs] = useState([]);
  const [staticJobs] = useState([
    {
      title: 'Graphic Designer',
      tag: 'Career',
      desc: 'Repute’s Creative team showcases success stories of creating unique content and designs that meet our clients’ goals. Become a part of our team where your creativity & talent gets acknowledged.',
    },
    {
      title: 'Web Development & Design',
      tag: 'Career',
      desc: 'Repute is prominent in designing websites and development services for businesses across industries. Get yourself employed in our company where you gain the liberty to express your unique ideas.',
    },
    {
      title: 'Marketing',
      tag: 'Career',
      desc: 'Repute’s Marketing services are popularly known as we have proven to be the best at delivering our client’s requirements. Apply now to join our prospective Marketing team to enhance your skills.',
    },
    {
      title: 'Digital and Social Media Marketing',
      tag: 'Career',
      desc: 'Repute’s Digital Marketing services are highly trusted by our happy clients as we have exceeded their expectations. Join our promising Digital Marketing team to experience a level-up in your career.',
    }
  ]);

  const observeRevealElements = () => {
    const els = document.querySelectorAll('.reveal:not(.visible)');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { 
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -30px 0px' });
    els.forEach(el => obs.observe(el));
    return obs;
  };

  /* Scroll reveal logic — initial mount */
  useEffect(() => {
    const obs = observeRevealElements();
    fetchLiveJobs();
    return () => obs.disconnect();
  }, []);

  /* Re-observe when liveJobs loads */
  useEffect(() => {
    if (liveJobs.length > 0) {
      setTimeout(() => observeRevealElements(), 50);
    }
  }, [liveJobs]);

  const fetchLiveJobs = async () => {
    try {
      const { data, error } = await supabase
        .from('job_openings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (data) {
        setLiveJobs(data);
      }
    } catch (err) {
      console.error('Error fetching jobs:', err);
    }
  };

  const benefits = [
    { title: 'Creative Freedom', icon: Icons.monitor },
    { title: 'Growth Opportunities', icon: Icons.target },
    { title: 'Inclusive Culture', icon: Icons.social },
    { title: 'Performance Rewards', icon: Icons.check },
  ];

  return (
    <div className="career-page">
      <Navbar activePage="career" />

      {/* ── HERO SECTION ── */}
      <section className="career-hero">
        {/* Particle Background Elements */}
        {[...Array(10)].map((_, i) => (
          <div 
            key={i} 
            className="particle" 
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 10}s`
            }}
          />
        ))}

        <div className="hero-content-wrapper">
          <div className="hero-text-side">
            <span className="hero-subtitle">Coimbatore, Tamilnadu</span>
            <h1 className="hero-title">Career</h1>
            <p className="hero-desc">
              Build your future with a creative, innovative and fast-growing digital agency.
            </p>
            <div className="hero-buttons">
              <a href="#jobs" className="btn-primary-career">View Openings</a>
              <Link to="/#contact" className="btn-secondary-career">Join Our Team</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── JOB OPENINGS SECTION ── */}
      <section id="jobs" className="jobs-section">
        <div className="section-header reveal">
          <h2>Jobs Opening</h2>
          <p>Explore opportunities to grow your skills and career with Team Repute.</p>
        </div>

        {/* Immediate Hiring Section (Dynamic from Supabase) */}
        {liveJobs.length > 0 && (
          <div className="jobs-subsection">
            <h3 className="subsection-title reveal"><span className="red-dot"></span> Immediate Hiring</h3>
            <div className="jobs-grid">
              {liveJobs.map((job) => (
                <div key={job.id} className="job-card live-job-card reveal">
                  <div className="job-tag live-tag">New Opening</div>
                  <h3 className="job-title">{job.title}</h3>
                  <div className="job-meta">
                    <span className="meta-item">📍 {job.location}</span>
                    <span className="meta-item">🕒 {job.type}</span>
                  </div>
                  <p className="job-desc">{job.description || "Join our team for this active requirement. We are looking for talented individuals to fill this position immediately."}</p>
                  <div className="repute-btn-group">
                    <button className="repute-btn repute-btn-secondary">Job Details</button>
                    <button 
                      className="repute-btn repute-btn-primary" 
                      onClick={() => navigate('/career/apply', { state: { jobTitle: job.title } })}
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* General Openings Section */}
        <div className="jobs-subsection" style={{ marginTop: liveJobs.length > 0 ? '60px' : '0' }}>
          {liveJobs.length > 0 && <h3 className="subsection-title reveal">General Opportunities</h3>}
          <div className="jobs-grid">
            {staticJobs.map((job, i) => (
              <div key={i} className="job-card reveal">
                <div className="job-tag">{job.tag}</div>
                <h3 className="job-title">{job.title}</h3>
                <p className="job-desc">{job.desc}</p>
                <div className="repute-btn-group">
                  {job.title === 'Graphic Designer' ? (
                    <Link to="/career/graphic-designer" className="repute-btn repute-btn-secondary">Learn More</Link>
                  ) : job.title === 'Web Development & Design' ? (
                    <Link to="/web-development" className="repute-btn repute-btn-secondary">Learn More</Link>
                  ) : job.title === 'Marketing' ? (
                    <Link to="/marketing" className="repute-btn repute-btn-secondary">Learn More</Link>
                  ) : job.title === 'Digital and Social Media Marketing' ? (
                    <Link to="/digital-marketing" className="repute-btn repute-btn-secondary">Learn More</Link>
                  ) : (
                    <button className="repute-btn repute-btn-secondary">Learn More</button>
                  )}
                  <button 
                    className="repute-btn repute-btn-primary" 
                    onClick={() => navigate('/career/apply', { state: { jobTitle: job.title } })}
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM CULTURE SECTION ── */}
      <section className="culture-section">
        <div className="culture-container reveal">
          <div className="culture-text">
            <span className="culture-badge">Team REPUTE</span>
            <h2>A futuristic and inclusive environment</h2>
            <p>Become a part of an extraordinary team of creative and versatile thinkers!</p>
            <div className="hero-buttons">
              <Link to="/#contact" className="btn-primary-career">Join Our Team</Link>
              <button className="btn-secondary-career">Explore Culture</button>
            </div>
          </div>
          <div className="culture-image">
            <div className="culture-img-bg"></div>
            <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80" alt="Modern Office" className="culture-img-placeholder" />
          </div>
        </div>
      </section>

      {/* ── BENEFITS SECTION ── */}
      <section className="benefits-section">
        <div className="section-header reveal">
          <h2>Why Join Repute?</h2>
          <p>We provide an environment where you can thrive and grow professionally.</p>
        </div>
        <div className="benefits-grid">
          {benefits.map((benefit, i) => (
            <div key={i} className="benefit-card reveal">
              <div className="benefit-icon">{benefit.icon}</div>
              <h3>{benefit.title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA SECTION ── */}
      <CTASection />

      <Footer />
    </div>
  );
};

export default Career;
