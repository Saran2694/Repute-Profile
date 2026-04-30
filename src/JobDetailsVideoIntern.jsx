import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Footer } from './SharedComponents';
import './JobDetails.css';

const JobDetailsVideoIntern = () => {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
    /* Basic Reveal Logic */
    const els = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add('visible');
      });
    }, { threshold: 0.1 });
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="job-details-page">
      {/* ── HEADER TOP BAR ── */}
      <div className="top-bar">
        <div className="top-bar-left">
          Repute Digital Business Agency
        </div>
        <div className="top-bar-right">
          <span>Follow us on</span>
          <div className="social-mini-links">
            <a href="#">Facebook</a>
            <a href="#">X</a>
            <a href="#">YouTube</a>
            <a href="#">LinkedIn</a>
            <a href="#">Instagram</a>
          </div>
        </div>
      </div>

      <Navbar activePage="career" />

      {/* ── HERO SECTION ── */}
      <section className="job-hero">
        <div className="reveal">
          <p>COIMBATORE, TAMILNADU</p>
          <h1>Video Editing Intern</h1>
          <img 
            src="https://irepute.in/wp-content/uploads/2021/04/REPUTE-LOGO-Retina.png" 
            alt="Repute Logo" 
            className="hero-small-logo"
            style={{ filter: 'brightness(0) invert(1)', height: '30px' }}
          />
        </div>
        <div className="hero-divider">
          <svg viewBox="0 0 1440 120" fill="#fff" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
          </svg>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <section className="job-main-section">
        <div className="job-container">
          {/* Sticky Sidebar */}
          <aside className="job-sidebar reveal">
            <div className="sidebar-card">
              <div className="location-tag">Coimbatore, Tamilnadu</div>
              <h3>Video Editing Intern</h3>
              <p>
                Repute is a leading digital marketing agency that offers innovative 
                solutions to help businesses succeed in the online world.
              </p>
              <button className="repute-btn-primary">
                Role Overview
              </button>
            </div>

            <div className="sidebar-card">
              <h3>Job Details</h3>
              <div className="job-meta-card">
                <div className="meta-item">
                  <span className="meta-label">HIRING ORGANIZATION</span>
                  <span className="meta-value">Repute Digital Business Agency</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">JOB LOCATION</span>
                  <span className="meta-value">Coimbatore</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">EMPLOYMENT TYPE</span>
                  <span className="meta-value">Full-Time</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Right Content Area */}
          <div className="job-content-area">
            
            <div className="content-section reveal">
              <h2 className="section-title">Role Overview</h2>
              <p className="content-text">
                We are committed to delivering exceptional results to our clients 
                by providing them with high-quality services that meet their unique 
                needs. As a top branding agency in Coimbatore, India, we have built 
                a strong reputation for excellence, professionalism, and creativity.
              </p>
            </div>

            <div className="content-section reveal">
              <h2 className="section-title">Our Team Of Experts</h2>
              <p className="content-text">
                We have a team of experts who are passionate about what they do 
                and are committed to helping our clients achieve their goals. 
                Our team comprises experienced professionals with diverse backgrounds, 
                skill sets, and perspectives. We believe that diversity is key to 
                creativity, and that is why we encourage our team members to bring 
                their unique perspectives and ideas to the table.
              </p>
            </div>

            <div className="content-section reveal">
              <h2 className="section-title">Why You Should Join Repute</h2>
              <div className="feature-grid">
                {[
                  { title: 'Dynamic work environment', text: 'We offer a dynamic work environment that encourages creativity, innovation, and collaboration.' },
                  { title: 'Experienced professionals', text: 'Our team comprises experienced professionals who are committed to delivering exceptional results.' },
                  { title: 'Growth opportunities', text: 'We provide our team members with opportunities for growth and development.' },
                  { title: 'Competitive benefits', text: 'We offer competitive salaries and benefits packages while maintaining work-life balance.' }
                ].map((item, i) => (
                  <div key={i} className="feature-card">
                    <h4>{item.title}</h4>
                    <p className="content-text" style={{ fontSize: '0.95rem' }}>{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="content-section reveal">
              <h2 className="section-title">Roles and Responsibilities</h2>
              <ul className="roles-list">
                <li>Editing and producing high-quality videos for our clients.</li>
                <li>Collaborating with team members to create engaging and creative video content.</li>
                <li>Staying up-to-date with the latest video editing software and tools.</li>
                <li>Assisting in the pre-production and post-production process of video projects.</li>
                <li>Providing input on video concepts and ideas.</li>
              </ul>
            </div>

            <div className="content-section reveal">
              <h2 className="section-title">Desired Skills</h2>
              <ul className="roles-list">
                <li>Proficiency in Adobe Premiere Pro, Final Cut Pro, or DaVinci Resolve.</li>
                <li>Knowledge of video production techniques, camera work, lighting, and sound.</li>
                <li>Strong creative and storytelling skills.</li>
                <li>Ability to work in a fast-paced environment and meet deadlines.</li>
                <li>Attention to detail and strong visual aesthetics.</li>
              </ul>
            </div>

            <div className="content-section reveal">
              <h2 className="section-title">Join Our Team</h2>
              <p className="content-text">
                At Repute, we believe in creating an inclusive work environment that 
                fosters creativity and innovation. If you are looking for an opportunity 
                to work with a team of experts and grow your skills in video editing, 
                then we would love to hear from you. Join our team today and help us 
                shape the future of video editing.
              </p>
            </div>

            <div className="content-section reveal">
              <div className="apply-cta-box">
                <h2 className="section-title" style={{ padding: 0 }}>Apply for Above Job</h2>
                <p>To apply for the Video Editing Intern position at Repute, please send your resume and cover letter to:</p>
                <a href="mailto:hr@irepute.in" className="hr-email">hr@irepute.in</a>
                <button 
                  className="repute-btn-primary"
                  onClick={() => navigate('/career/apply', { state: { jobTitle: 'Video Editing Intern' } })}
                >
                  Apply for this Job
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── RELATED JOBS ── */}
      <section className="related-jobs-section">
        <div className="job-container">
          <div className="reveal">
            <h2 className="section-title">Related Jobs</h2>
            <div className="related-grid" style={{ marginTop: '50px' }}>
              {[
                { title: 'Digital Marketing', desc: 'Repute’s Digital Marketing services are highly trusted by our happy clients as we have exceeded their expectations.' },
                { title: 'Marketing', desc: 'Repute’s Marketing services are popularly known as we have proven to be the best at delivering our client’s requirements.' },
                { title: 'Web Design & Development', desc: 'Repute is prominent in designing websites and development services for businesses across industries.' }
              ].map((job, i) => (
                <div key={i} className="related-card">
                  <h3>{job.title}</h3>
                  <p className="content-text" style={{ fontSize: '0.95rem', marginBottom: '20px' }}>{job.desc}</p>
                  <Link to="/career" className="related-link">Learn More →</Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TEAM REPUTE SECTION ── */}
      <section className="team-cta-banner">
          <div className="team-cta-container reveal">
            <div className="team-cta-content">
              <h4>TEAM REPUTE</h4>
              <h2>A futuristic and inclusive environment</h2>
              <p>Become a part of an extraordinary team of creative and versatile thinkers!</p>
              <div className="repute-btn-group">
                <Link to="/#contact" className="repute-btn-primary">Join our Team</Link>
                <Link to="/career" className="repute-btn-glass" style={{
                   background: 'rgba(255,255,255,0.05)',
                   border: '1px solid rgba(255,255,255,0.2)',
                   padding: '18px 45px',
                   borderRadius: '25px',
                   color: '#fff',
                   fontWeight: '700'
                }}>Explore Careers</Link>
              </div>
            </div>
            <div className="team-cta-visual">
              <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" alt="Team Work" />
            </div>
          </div>
      </section>

      <Footer />
    </div>
  );
};

export default JobDetailsVideoIntern;
