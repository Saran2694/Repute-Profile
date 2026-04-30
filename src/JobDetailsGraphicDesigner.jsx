import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Footer } from './SharedComponents';
import './JobDetails.css';

const JobDetailsGraphicDesigner = () => {
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
          <p>Coimbatore, Tamilnadu</p>
          <h1>Graphic Designer</h1>
          <img 
            src="https://irepute.in/wp-content/uploads/2021/04/REPUTE-LOGO-Retina.png" 
            alt="Repute Logo" 
            className="hero-small-logo"
            style={{ filter: 'brightness(0) invert(1)', height: '30px' }}
          />
        </div>
        {/* Simple curved divider */}
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
              <h3>Graphic Designer</h3>
              <p>
                Repute is a leading digital marketing agency that offers innovative 
                solutions to help businesses succeed in the online world.
              </p>
              <button className="repute-btn repute-btn-primary" style={{ width: '100%' }}>
                Role Overview
              </button>
            </div>

            <div className="sidebar-card">
              <h3>Job Details</h3>
              <div className="job-meta-card">
                <div className="meta-item">
                  <span className="meta-label">Hiring Organization</span>
                  <span className="meta-value">Repute Digital Business Agency</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Job Location</span>
                  <span className="meta-value">Coimbatore</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Employment Type</span>
                  <span className="meta-value">Full-Time</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Main area */}
          <div className="job-content-area">
            
            <div className="content-section reveal">
              <h2 className="section-title">Role Overview</h2>
              <p className="content-text">
                We believe that branding is not just about creating a logo or a tagline, 
                and creatives but it’s about creating a unique identity that sets 
                your business apart from the competition.
              </p>
            </div>

            <div className="content-section reveal">
              <h2 className="section-title">Our Team Of Experts</h2>
              <p className="content-text">
                At Repute, we have a team of experts who are passionate about branding 
                and have years of experience in the industry. Our team comprises talented 
                graphic designers, copywriters, branding strategists, and digital 
                marketers who work together to deliver outstanding branding solutions to our clients.
              </p>
            </div>

            <div className="content-section reveal">
              <h2 className="section-title">Why You Should Join Repute</h2>
              <div className="feature-grid">
                {[
                  { title: 'Work on challenging and exciting projects', text: 'At Repute, you will get the opportunity to work on challenging and exciting branding projects for diverse clients across various industries.' },
                  { title: 'Continuous learning and growth', text: 'We encourage our team members to learn and grow by providing opportunities for training and development.' },
                  { title: 'Collaborative work environment', text: 'We foster a collaborative work environment that encourages teamwork and creativity.' },
                  { title: 'Competitive salary and benefits', text: 'We offer a competitive salary and benefits package to our employees.' },
                  { title: 'Work-life balance', text: 'We value work-life balance and ensure that our employees have a healthy work-life balance.' }
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
              <p className="content-text" style={{ marginBottom: '20px' }}>
                As a Graphic Designer at Repute, your roles and responsibilities will include:
              </p>
              <ul className="roles-list">
                <li>Designing and creating visually appealing creatives for various branding projects.</li>
                <li>Collaborating with the branding team to create branding strategies and campaigns.</li>
                <li>Ensuring that all branding materials are consistent with the brand’s visual identity and guidelines.</li>
                <li>Keeping up-to-date with the latest design trends and technologies.</li>
                <li>Working on multiple projects simultaneously and meeting deadlines.</li>
                <li>Presenting design concepts and ideas to clients.</li>
                <li>Preparing final design files for print and digital formats.</li>
                <li>Reviewing designs for errors and ensuring the highest quality of work.</li>
                <li>Communicating with team members and clients effectively.</li>
                <li>Participating in brainstorming sessions to generate creative ideas.</li>
              </ul>
            </div>

            <div className="content-section reveal">
              <h2 className="section-title">Desired Skills</h2>
              <p className="content-text" style={{ marginBottom: '20px' }}>
                To be successful as a Graphic Designer at Repute, you should possess the following skills:
              </p>
              <ul className="roles-list">
                <li>Proficiency in design software such as Adobe Photoshop, Illustrator, and InDesign.</li>
                <li>Strong knowledge of design principles and techniques.</li>
                <li>Excellent creative and artistic skills.</li>
                <li>Strong communication and interpersonal skills.</li>
                <li>Attention to detail and ability to work in a fast-paced environment.</li>
              </ul>
            </div>

            <div className="content-section reveal">
              <h2 className="section-title">Join Our Team</h2>
              <p className="content-text">
                If you’re a creative, passionate, and talented graphic designer looking 
                to join a dynamic branding agency, Repute is the perfect place for you. 
                Join our team and take your career to the next level.
              </p>
            </div>

            <div className="content-section reveal">
              <div className="apply-cta-box">
                <h2 className="section-title">Apply for Above Job</h2>
                <p>To apply for the Graphic Designer position at Repute, please send your resume and portfolio to:</p>
                <a href="mailto:hr@irepute.in" className="hr-email">hr@irepute.in</a>
                <button 
                  className="repute-btn repute-btn-primary" 
                  onClick={() => navigate('/career/apply', { state: { jobTitle: 'Graphic Designer' } })}
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
            <div className="related-grid">
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

      {/* ── TEAM REPUTE CTA ── */}
      <section className="team-cta-banner">
        <div className="job-container">
          <div className="team-cta-container reveal">
            <div className="team-cta-content">
              <h4>Team REPUTE</h4>
              <h2>A futuristic and inclusive environment</h2>
              <p>Become a part of an extraordinary team of creative and versatile thinkers!</p>
              <div className="repute-btn-group" style={{ maxWidth: '400px' }}>
                <Link to="/#contact" className="repute-btn repute-btn-primary">Join our Team</Link>
                <Link to="/career" className="repute-btn repute-btn-glass-white">Explore Careers</Link>
              </div>
            </div>
            <div className="team-cta-visual">
              <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" alt="Team Work" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default JobDetailsGraphicDesigner;
