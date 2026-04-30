import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { supabase } from '../supabaseClient';
import { Icons, Navbar, Footer, CTASection } from '../SharedComponents';
import img2 from '../img 2.jpg';
import img3 from '../img 3.jpg';

const HomePageCMS = ({ isEmbedded = false }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [showModal, setShowModal] = useState(false);
  const [editingField, setEditingField] = useState(null);
  const [tempValue, setTempValue] = useState('');

  // Home Page Content State (Mirrored from site_content table)
  const [content, setContent] = useState({
    hero_title: 'E-Commerce, The Easiest & Toughest Business',
    hero_subtitle: 'Let us discuss how to make it profitable',
    hero_button_text: 'Repute E-Commerce Services',
    hero_image: img3,
    about_heading: 'Full Service Digital Agency',
    about_description: 'Repute is a Full Service Digital Agency that helps Build - Promote - Market Brands.',
    about_image: img2
  });

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from('site_content').select('*').eq('page', 'home');
      if (error) throw error;
      if (data && data.length > 0) {
        const fetchedContent = {};
        data.forEach(item => {
          fetchedContent[item.field_key] = item.field_value;
        });
        setContent(prev => ({ ...prev, ...fetchedContent }));
      }
    } catch (err) {
      console.error('Error fetching content:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (fieldKey, currentValue) => {
    setEditingField(fieldKey);
    setTempValue(currentValue);
    setShowModal(true);
  };

  const handleSave = async () => {
    setStatus({ type: 'loading', message: 'Saving...' });
    try {
      const { data: existing } = await supabase
        .from('site_content')
        .select('id')
        .eq('page', 'home')
        .eq('field_key', editingField)
        .single();

      const updateData = {
        page: 'home',
        section: editingField.startsWith('hero') ? 'hero' : 'about',
        field_key: editingField,
        field_value: tempValue,
        type: editingField.includes('image') ? 'image_url' : 'text'
      };

      if (existing) {
        await supabase.from('site_content').update({ field_value: tempValue }).eq('id', existing.id);
      } else {
        await supabase.from('site_content').insert([updateData]);
      }

      setContent(prev => ({ ...prev, [editingField]: tempValue }));
      setStatus({ type: 'success', message: 'Content updated successfully!' });
      setTimeout(() => setStatus({ type: '', message: '' }), 3000);
      setShowModal(false);
    } catch (err) {
      setStatus({ type: 'error', message: err.message });
    }
  };

  const slides = [
    {
      image: content.hero_image,
      heading: content.hero_title,
      subtext: content.hero_subtitle,
      button: content.hero_button_text,
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

  return (
    <div className="cms-wrapper" style={{ display: 'flex', minHeight: '100vh', background: isEmbedded ? 'transparent' : '#0b1120' }}>
      {!isEmbedded && <Sidebar />}

      <div className="cms-main" style={{ flex: 1, marginLeft: isEmbedded ? '0' : '260px', position: 'relative' }}>
        {/* Admin Header */}
        <div style={{ background: '#1e293b', padding: '20px 40px', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 1000 }}>
          <div>
            <h1 style={{ color: '#fff', fontSize: '1.5rem', margin: 0 }}>Home Page Visual Editor</h1>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Edit your home page content in real-time. Changes reflect instantly on the live site.</p>
          </div>
          <div style={{ display: 'flex', gap: '15px' }}>
            <a href="http://localhost:3000/" target="_blank" rel="noreferrer" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}>View Live Site</a>
          </div>
        </div>

        {/* Live Preview / Editor Container */}
        <div className="editor-viewport" style={{ padding: '40px', background: '#0b1120' }}>

          {/* Requested Iframe Snippet (Optional/As requested) */}
          <div style={{ marginBottom: '40px', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', background: '#1e293b' }}>
            <div style={{ padding: '10px 20px', background: 'rgba(255,255,255,0.05)', color: '#94a3b8', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>Live Site Preview (Iframe)</div>
            <iframe src="http://localhost:3000/" width="100%" height="400" title="Live Site Preview" style={{ border: 'none' }}></iframe>
          </div>

          <div style={{ padding: '10px 20px', background: 'var(--red)', color: '#fff', fontSize: '0.9rem', fontWeight: 800, textAlign: 'center', borderRadius: '12px 12px 0 0', letterSpacing: '1px' }}>
            VISUAL EDITOR: CLICK ON ANY SECTION TO EDIT
          </div>

          {/* MIRRORED HOME PAGE START */}
          <div className="page-wrapper" style={{ background: '#fff', color: '#000', borderRadius: '0 0 12px 12px', overflow: 'hidden', position: 'relative', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>

            {/* HERO SECTION */}
            <section className="hero-slider" style={{ height: '700px', cursor: 'pointer' }} onClick={() => handleEdit('hero_title', content.hero_title)}>
              <div className="hero-slides-wrapper">
                {slides.map((s, i) => (
                  <div key={i} className={`hero-slide ${i === currentSlide ? 'active' : ''}`}>
                    <div className="hero-slide-bg" style={{ backgroundImage: `url('${s.image}')` }} />
                    <div className="hero-content">
                      <div className="edit-indicator" style={{ position: 'absolute', top: '-40px', left: '0', background: 'rgba(225,6,0,0.9)', color: '#fff', padding: '4px 12px', fontSize: '10px', borderRadius: '4px', fontWeight: 800 }}>CLICK TO EDIT HERO</div>
                      <h1 className="hero-heading">{s.heading}</h1>
                      <p className="hero-yellow">{s.subtext}</p>
                      <div className="hero-btn-container">
                        <button className="hero-btn">{s.button}</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Hero Controls (Visual only) */}
              <div className="hero-dots-container">
                {slides.map((_, i) => (
                  <button key={i} onClick={(e) => { e.stopPropagation(); setCurrentSlide(i); }} className={`hero-dot ${i === currentSlide ? 'active' : ''}`} />
                ))}
              </div>
            </section>

            {/* SERVICES SECTION */}
            <section className="services-section" style={{ background: '#fff' }}>
              <div className="section-container" style={{ textAlign: 'center' }}>
                <span className="section-tag">What We Do</span>
                <h2 className="section-heading">Website Design & <span className="red">Development</span> Services</h2>
                <div className="section-divider center"></div>
                <div className="services-grid">
                  {[
                    { icon: Icons.monitor, title: 'Website Design', desc: 'Modern, aesthetic designs that captivate your audience' },
                    { icon: Icons.check, title: 'Content Managed Websites', desc: 'Easy-to-manage websites with flexible content control' },
                    { icon: Icons.code, title: 'Web Application Development', desc: 'Scalable, robust web applications for your business needs' },
                    { icon: Icons.mobile, title: 'Search Engine Optimisation', desc: 'Improve visibility and rank higher in search results' },
                  ].map((s, i) => (
                    <div key={i} className="service-card">
                      <div className="service-icon">{s.icon}</div>
                      <h3>{s.title}</h3>
                      <p>{s.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ABOUT SECTION */}
            <section className="about-section-home" style={{ background: '#f8f9fa', cursor: 'pointer' }} onClick={() => handleEdit('about_heading', content.about_heading)}>
              <div className="section-container">
                <div className="about-grid">
                  <div style={{ position: 'relative' }}>
                    <div className="edit-indicator" style={{ position: 'absolute', top: '-30px', left: '0', background: 'rgba(225,6,0,0.9)', color: '#fff', padding: '4px 12px', fontSize: '10px', borderRadius: '4px', fontWeight: 800 }}>CLICK TO EDIT ABOUT</div>
                    <span className="section-tag">Who We Are</span>
                    <h2 className="section-heading" dangerouslySetInnerHTML={{ __html: content.about_heading.replace('Digital', '<span class="red">Digital</span>') }}></h2>
                    <div className="section-divider"></div>
                    <p className="section-text" style={{ whiteSpace: 'pre-line' }} onClick={(e) => { e.stopPropagation(); handleEdit('about_description', content.about_description); }}>{content.about_description}</p>
                    <button className="btn-primary" style={{ marginTop: '16px' }}>Learn More</button>
                  </div>
                  <div className="stats-grid">
                    {[
                      { number: '18+', label: 'Years in Market' },
                      { number: '50+', label: 'Experienced Professionals' },
                      { number: '600+', label: 'Happy Clients' },
                    ].map((s, i) => (
                      <div key={i} style={{ background: '#151B2D', borderRadius: '16px', padding: '28px 16px', textAlign: 'center' }}>
                        <div className="stat-number" style={{ color: '#E10600', fontWeight: 800, fontSize: '2rem' }}>{s.number}</div>
                        <div className="stat-label" style={{ color: '#fff' }}>{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* CTA SECTION */}
            <CTASection
              title={<>Let's Discuss Your <span style={{ color: '#151B2D' }}>Project</span></>}
              subtitle="Fill out the form below and our team will get back to you shortly"
            />

            {/* MOCK FOOTER */}
            <div style={{ background: '#151B2D', color: '#fff', padding: '60px 40px', textAlign: 'center' }}>
              <img src="/logo.png" alt="Logo" style={{ height: '50px', margin: '0 auto 20px', filter: 'brightness(0) invert(1)' }} />
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>© 2026 Repute Digital Business Agency. All rights reserved.</p>
            </div>

          </div>
          {/* MIRRORED HOME PAGE END */}

        </div>
      </div>

      {/* EDIT MODAL */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: '20px' }}>
          <div style={{ background: '#1e293b', width: '100%', maxWidth: '600px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden', boxShadow: '0 25px 50px rgba(0,0,0,0.5)' }}>
            <div style={{ padding: '24px 32px', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ color: '#fff', fontSize: '1.25rem', margin: 0 }}>Edit {editingField?.replace(/_/g, ' ').toUpperCase()}</h2>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
            </div>
            <div style={{ padding: '32px' }}>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.85rem', fontWeight: 600, marginBottom: '10px' }}>Content Value</label>
              {editingField?.includes('description') || editingField?.includes('heading') ? (
                <textarea
                  style={{ width: '100%', background: '#0b1120', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', padding: '16px', fontSize: '1rem', minHeight: '150px', fontFamily: 'inherit' }}
                  value={tempValue}
                  onChange={(e) => setTempValue(e.target.value)}
                />
              ) : (
                <input
                  type="text"
                  style={{ width: '100%', background: '#0b1120', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', padding: '16px', fontSize: '1rem' }}
                  value={tempValue}
                  onChange={(e) => setTempValue(e.target.value)}
                />
              )}

              {status.message && (
                <div style={{ marginTop: '20px', padding: '12px', borderRadius: '8px', background: status.type === 'error' ? 'rgba(239,68,68,0.1)' : 'rgba(34,197,94,0.1)', color: status.type === 'error' ? '#f87171' : '#4ade80', border: status.type === 'error' ? '1px solid rgba(239,68,68,0.2)' : '1px solid rgba(34,197,94,0.2)', fontSize: '0.9rem', textAlign: 'center' }}>
                  {status.message}
                </div>
              )}

              <div style={{ display: 'flex', gap: '15px', marginTop: '30px' }}>
                <button onClick={() => setShowModal(false)} style={{ flex: 1, padding: '14px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', color: '#fff', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
                <button onClick={handleSave} style={{ flex: 2, padding: '14px', borderRadius: '12px', border: 'none', background: '#e10600', color: '#fff', fontWeight: 700, cursor: 'pointer', boxShadow: '0 10px 20px rgba(225,6,0,0.3)' }}>Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Styling for the CMS */}
      <style>{`
        .cms-wrapper .page-wrapper {
          transform-origin: top center;
        }
        .edit-indicator {
          opacity: 0;
          transition: 0.3s;
        }
        section:hover .edit-indicator,
        p:hover .edit-indicator {
          opacity: 1;
        }
        section:hover {
          outline: 2px solid var(--red);
          outline-offset: -2px;
        }
        .hero-slider .active .hero-heading,
        .hero-slider .active .hero-yellow,
        .hero-slider .active .hero-btn-container {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </div>
  );
};

export default HomePageCMS;