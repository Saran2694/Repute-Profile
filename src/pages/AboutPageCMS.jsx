import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import Sidebar from '../components/Sidebar';
import { Icons, CTASection } from '../SharedComponents';
import coreTeam from '../assets/core-team.jpg';
import ethos1 from '../assets/ethos1.jpg';
import ethos2 from '../assets/ethos2.jpg';
import ethos3 from '../assets/ethos3.jpg';
import accountability1 from '../assets/accountability1.jpg';
import accountability2 from '../assets/accountability2.jpg';
import transparency1 from '../assets/transparency1.jpg';
import transparency2 from '../assets/transparency2.jpg';
import growth1 from '../assets/growth1.jpg';
import growth2 from '../assets/growth2.jpg';
import growth3 from '../assets/growth3.jpg';
import teamImg from '../assets/team.jpg';

const AboutPageCMS = ({ isEmbedded = false }) => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingSection, setEditingSection] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    loadAboutContent();
  }, []);

  const loadAboutContent = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('site_sections')
      .select('*')
      .eq('page_slug', 'about')
      .order('sort_order', { ascending: true });

    if (data) setSections(data);
    setLoading(false);
  };

  const handleSectionClick = (sectionName) => {
    const section = sections.find(s => s.section_name === sectionName);
    if (section) {
      setEditingSection(section);
      setFormData(section.content || {});
      setShowModal(true);
    }
  };

  const handleSave = async () => {
    try {
      const { error } = await supabase
        .from('site_sections')
        .update({ content: formData })
        .eq('id', editingSection.id);

      if (error) throw error;
      setShowModal(false);
      loadAboutContent();
    } catch (err) {
      alert('Error saving content: ' + err.message);
    }
  };

  const updateField = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const SocialLink = ({ icon, title }) => (
    <a href="#" className="team-social-link" title={title} onClick={(e)=>e.preventDefault()}>{icon}</a>
  );

  const getSection = (name) => sections.find(s => s.section_name === name)?.content || {};

  if (loading && !isEmbedded) return <div style={{ color: '#fff', padding: '50px', textAlign: 'center' }}>Loading About Editor...</div>;

  return (
    <div className="about-cms-wrapper" style={{ minHeight: '100vh', background: isEmbedded ? 'transparent' : '#0b1120' }}>
      {!isEmbedded && <Sidebar />}
      
      <div className="cms-main" style={{ flex: 1, marginLeft: isEmbedded ? '0' : '260px', position: 'relative' }}>
        {/* Admin Header */}
        <div style={{ background: '#1e293b', padding: '20px 40px', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 1000 }}>
          <div>
            <h1 style={{ color: '#fff', fontSize: '1.5rem', margin: 0 }}>About Us Visual Editor</h1>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Click any section below to edit content directly.</p>
          </div>
          <a href="http://localhost:3000/about" target="_blank" rel="noreferrer" style={{ background: '#e10600', color: '#fff', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}>View Live Site</a>
        </div>

        <div style={{ padding: '40px', background: '#0b1120' }}>
          <div style={{ padding: '10px 20px', background: '#e10600', color: '#fff', fontSize: '0.9rem', fontWeight: 800, textAlign: 'center', borderRadius: '12px 12px 0 0' }}>
            VISUAL EDITOR: EXACT 1:1 LIVE MIRROR
          </div>

          {/* EXACT MIRRORED ABOUT PAGE */}
          <div className="about-page-mirror" style={{ background: '#fff', color: '#000', borderRadius: '0 0 16px 16px', overflow: 'hidden' }}>
            
            {/* 1. HERO */}
            <section className="about-hero-section editable-wrap" onClick={() => handleSectionClick('About Hero')}>
              <div className="edit-overlay"></div>
              <div className="section-container visible">
                <span className="section-tag">{getSection('About Hero').tag || 'Established in 2012'}</span>
                <h1 className="section-heading" dangerouslySetInnerHTML={{ __html: (getSection('About Hero').heading || 'Discover our History').replace('History', '<span class="red">History</span>') }}></h1>
                <div className="section-divider center"></div>
                <p className="section-text center" style={{ whiteSpace: 'pre-line' }}>{getSection('Our Story').text || getSection('About Hero').subtext}</p>
              </div>
            </section>

            {/* 2. CORE COMPETENCE */}
            <section className="about-content-section bg-white editable-wrap" onClick={() => handleSectionClick('Core Competence')}>
              <div className="edit-overlay"></div>
              <div className="section-container">
                <div className="about-row visible">
                  <div className="about-text-col">
                    <span className="section-tag">{getSection('Core Competence').tag || 'Unlimited Possibilities'}</span>
                    <h2 className="section-heading">Our Core <span className="red">Competence</span></h2>
                    <div className="section-divider"></div>
                    <p className="section-text" style={{ whiteSpace: 'pre-line' }}>{getSection('Core Competence').text}</p>
                    <a href="#" onClick={(e)=>e.preventDefault()} className="btn-red" style={{ marginTop: '8px' }}>{getSection('Core Competence').button_text || 'Contact us'}</a>
                  </div>
                  <div className="about-image-col">
                    <div className="stack-img-wrap large-stack-image">
                      <img src={coreTeam} alt="Core Competence" className="image-placeholder" style={{ background: 'none' }} />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 3. OUR ETHOS */}
            <section className="about-content-section bg-gray editable-wrap" onClick={() => handleSectionClick('Our Ethos')}>
              <div className="edit-overlay"></div>
              <div className="section-container">
                <div className="about-row reverse visible">
                  <div className="about-image-col">
                    <div className="image-group layout-a">
                      <div className="img-wrap main-img"><img src={ethos1} alt="Ethos Large" /></div>
                      <div className="img-wrap mid-img"><img src={ethos2} alt="Ethos Medium" /></div>
                      <div className="img-wrap small-img"><img src={ethos3} alt="Ethos Small" /></div>
                    </div>
                  </div>
                  <div className="about-text-col">
                    <h2 className="section-heading">Our <span className="red">Ethos</span></h2>
                    <div className="section-divider"></div>
                    <p className="section-text" style={{ whiteSpace: 'pre-line' }}>{getSection('Our Ethos').text}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* 4. ACCOUNTABILITY */}
            <section className="about-content-section bg-white editable-wrap" onClick={() => handleSectionClick('Accountability')}>
              <div className="edit-overlay"></div>
              <div className="section-container">
                <div className="about-row visible">
                  <div className="about-text-col">
                    <h2 className="section-heading"><span className="red">Accountability</span></h2>
                    <div className="section-divider"></div>
                    <p className="section-text" style={{ whiteSpace: 'pre-line' }}>{getSection('Accountability').text}</p>
                  </div>
                  <div className="about-image-col">
                    <div className="image-group layout-c">
                      <div className="img-wrap main-img"><img src={accountability1} alt="Accountability Large" /></div>
                      <div className="img-wrap mid-img"><img src={accountability2} alt="Accountability Medium" /></div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 5. TRANSPARENCY */}
            <section className="about-content-section bg-gray editable-wrap" onClick={() => handleSectionClick('Transparency')}>
              <div className="edit-overlay"></div>
              <div className="section-container">
                <div className="about-row reverse visible">
                  <div className="about-image-col">
                    <div className="image-group layout-c">
                      <div className="img-wrap main-img"><img src={transparency1} alt="Transparency Large" /></div>
                      <div className="img-wrap small-img"><img src={transparency2} alt="Transparency Small" /></div>
                    </div>
                  </div>
                  <div className="about-text-col">
                    <h2 className="section-heading"><span className="red">Transparency</span></h2>
                    <div className="section-divider"></div>
                    <p className="section-text" style={{ whiteSpace: 'pre-line' }}>{getSection('Transparency').text}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* 6. GROWTH APPROACH */}
            <section className="about-content-section bg-white editable-wrap" onClick={() => handleSectionClick('Growth Approach')}>
              <div className="edit-overlay"></div>
              <div className="section-container">
                <div className="about-row visible">
                  <div className="about-text-col">
                    <h2 className="section-heading">Growth-driven <span className="red">Approach</span></h2>
                    <div className="section-divider"></div>
                    <p className="section-text" style={{ whiteSpace: 'pre-line' }}>{getSection('Growth Approach').subtext}</p>
                  </div>
                  <div className="about-image-col">
                    <div className="image-group layout-b">
                      <div className="img-wrap main-img"><img src={growth1} alt="Growth Large" /></div>
                      <div className="img-wrap mid-img"><img src={growth2} alt="Growth Medium" /></div>
                      <div className="img-wrap small-img"><img src={growth3} alt="Growth Small" /></div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 7. TEAM SECTION */}
            <section className="about-content-section bg-gray editable-wrap" onClick={() => handleSectionClick('Meet Our Team')}>
              <div className="edit-overlay"></div>
              <div className="section-container visible" style={{ textAlign: 'center' }}>
                <span className="section-tag">Repute</span>
                <h2 className="section-heading">Meet Our <span className="red">Team</span></h2>
                <div className="section-divider center"></div>
                <p className="section-text center" style={{ whiteSpace: 'pre-line' }}>{getSection('Meet Our Team').text || 'We are an energetic and experienced multidisciplinary team of brand creators, business analysts, marketers, creative minds, and technology specialists united by a common passion that drives us to deliver optimum results.'}</p>

                <div className="team-grid" style={{ marginTop: '48px' }}>
                  {(() => {
                    const jobsStr = getSection('Meet Our Team').jobs;
                    let members = [
                      { name: 'Subburaj', role: 'Founder and Managing Director' },
                      { name: 'P S Tirulogachandar', role: 'Head Delivery' },
                      { name: 'Manikandan', role: 'Head – Marketing' },
                      { name: 'Gladys Pinheiro', role: 'Client Delivery Head & Fractional HR' },
                    ];
                    
                    if (jobsStr && jobsStr.trim().length > 0 && jobsStr.includes(':')) {
                      members = jobsStr.split(',').map(job => {
                        const [name, role] = job.split(':');
                        return { name: name?.trim() || '', role: role?.trim() || '' };
                      }).filter(m => m.name !== '');
                    }
                    
                    return members;
                  })().map((m, i) => (
                    <div key={i} className="team-card">
                      <div className="team-photo">
                        <img src={teamImg} alt={m.name} className="image-placeholder" style={{ height: '100%', borderRadius: '50%', background: 'none' }} />
                      </div>
                      <h3 className="team-name">{m.name}</h3>
                      <p className="team-role">{m.role}</p>
                      <div className="team-socials">
                        <SocialLink icon={Icons.x} title="X" />
                        <SocialLink icon={Icons.facebook} title="Facebook" />
                        <SocialLink icon={Icons.instagram} title="Instagram" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 8. CTA SECTION */}
            <div className="editable-wrap" onClick={() => handleSectionClick('Final CTA')}>
              <div className="edit-overlay"></div>
              <div style={{ pointerEvents: 'none' }}>
                <CTASection />
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <h2 className="modal-title">Edit {editingSection?.section_name}</h2>
            <div className="modal-scroll">
              {Object.keys(formData).map(key => (
                <div key={key} className="input-group">
                  <label>{key.replace('_', ' ')}</label>
                  {key === 'text' || key === 'subtext' || key === 'items' || key === 'jobs' ? (
                    <textarea className="cms-textarea" value={formData[key]} onChange={e => updateField(key, e.target.value)} />
                  ) : (
                    <input className="cms-input" value={formData[key]} onChange={e => updateField(key, e.target.value)} />
                  )}
                </div>
              ))}
            </div>
            <div className="modal-actions">
              <button onClick={handleSave} className="save-btn">SAVE CHANGES</button>
              <button onClick={() => setShowModal(false)} className="cancel-btn">CANCEL</button>
            </div>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .editable-wrap { position: relative; cursor: pointer; }
        .edit-overlay { position: absolute; inset: 0; border: 2px dashed transparent; transition: 0.2s; z-index: 50; }
        .editable-wrap:hover .edit-overlay { border-color: #e10600; background: rgba(225,6,0,0.02); }
        .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.85); z-index: 2000; display: flex; alignItems: center; justifyContent: center; padding: 20px; }
        .modal-container { background: #1e293b; width: 100%; maxWidth: 700px; borderRadius: 24px; padding: 40px; color: #fff; }
        .modal-title { margin: 0 0 30px; fontSize: 1.8rem; }
        .modal-scroll { maxHeight: 60vh; overflowY: auto; paddingRight: 10px; display: flex; flexDirection: column; gap: 20px; }
        .input-group label { display: block; fontSize: 12px; color: #94a3b8; marginBottom: 8px; textTransform: capitalize; }
        .cms-input, .cms-textarea { width: 100%; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); borderRadius: 12px; padding: 15px; color: #fff; fontSize: 0.95rem; }
        .cms-textarea { minHeight: 120px; }
        .modal-actions { display: flex; gap: 15px; marginTop: 40px; }
        .save-btn { flex: 1; background: #e10600; color: #fff; border: none; padding: 15px; borderRadius: 12px; fontWeight: 800; cursor: pointer; }
        .cancel-btn { flex: 1; background: rgba(255,255,255,0.1); color: #fff; border: none; padding: 15px; borderRadius: 12px; fontWeight: 800; cursor: pointer; }
      `}} />
    </div>
  );
};

export default AboutPageCMS;

