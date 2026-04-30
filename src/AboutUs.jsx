import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Footer, Icons, CTASection } from './SharedComponents';
import { supabase } from './supabaseClient';
import coreTeam from './assets/core-team.jpg';
import ethos1 from './assets/ethos1.jpg';
import ethos2 from './assets/ethos2.jpg';
import ethos3 from './assets/ethos3.jpg';
import accountability1 from './assets/accountability1.jpg';
import accountability2 from './assets/accountability2.jpg';
import transparency1 from './assets/transparency1.jpg';
import transparency2 from './assets/transparency2.jpg';
import growth1 from './assets/growth1.jpg';
import growth2 from './assets/growth2.jpg';
import growth3 from './assets/growth3.jpg';
import teamImg from './assets/team.jpg';

/* =============================================
   ABOUT US PAGE – Repute Digital Business Agency
   ============================================= */

export default function AboutUs() {
  const [dynamicSections, setDynamicSections] = useState([]);
  const [content, setContent] = useState({
    title: 'Discover our History',
    description: "Repute Digital Business Agency is a full-service creative agency helping brands with end-to-end innovative branding and digital solutions. For over a decade, we have helped clients achieve tangible benefits by delivering and executing precise brand strategies effectively with a multidisciplinary approach, thereby enhancing their brand's awareness and reach.\n\nWe are a one-stop solution for your brand's digital journey and are passionate about creating a brand experience with our unique strategy and expertise, emphasizing every dimension of branding and promotion.",
    teamImage: coreTeam,
    mission: '',
    vision: ''
  });

  useEffect(() => { 
    window.scrollTo(0, 0); 
    fetchContent();
  }, []);

  const fetchContent = async () => {
    // Existing content
    const { data } = await supabase.from('site_content').select('*').eq('page', 'about');
    if (data && data.length > 0) {
      const obj = {};
      data.forEach(item => obj[item.field_key] = item.field_value);
      setContent(prev => ({
        ...prev,
        title: obj.about_title || prev.title,
        description: obj.about_description || prev.description,
        teamImage: obj.team_image || prev.teamImage,
        mission: obj.mission_text || prev.mission,
        vision: obj.vision_text || prev.vision
      }));
    }

    // Dynamic Sections
    try {
      const { data: sectionData, error } = await supabase
        .from('page_sections')
        .select('*')
        .eq('page_slug', 'about')
        .order('created_at', { ascending: true });
      
      if (sectionData) {
        setDynamicSections(sectionData);
      }
    } catch (err) {
      console.warn('Could not fetch dynamic sections:', err);
    }
  };

  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.12 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [dynamicSections]); // re-run observer when dynamic sections load

  const SocialLink = ({ icon, title }) => (
    <a href="#" className="team-social-link" title={title}>{icon}</a>
  );

  const team = [
    { name: 'Subburaj', role: 'Founder and Managing Director' },
    { name: 'P S Tirulogachandar', role: 'Head Delivery' },
    { name: 'Manikandan', role: 'Head – Marketing' },
    { name: 'Gladys Pinheiro', role: 'Client Delivery Head & Fractional HR' },
  ];

  return (
    <div className="page-wrapper">
      <Navbar activePage="about" />

      <main>

        {/* ── 1. HERO ── */}
        <section className="about-hero-section">
          <div className="section-container reveal">
            <span className="section-tag">Established in 2012</span>
            <h1 className="section-heading" dangerouslySetInnerHTML={{ __html: content.title.replace('History', '<span class="red">History</span>') }}></h1>
            <div className="section-divider center"></div>
            <p className="section-text center" style={{ whiteSpace: 'pre-line' }}>{content.description}</p>
          </div>
        </section>

        {/* ── 2. CORE COMPETENCE ── */}
        <section className="about-content-section bg-white">
          <div className="section-container">
            <div className="about-row reveal">
              <div className="about-text-col">
                <span className="section-tag">Unlimited Possibilities</span>
                <h2 className="section-heading">Our Core <span className="red">Competence</span></h2>
                <div className="section-divider"></div>
                <p className="section-text">With technology at the forefront and a creative and passionate team of individuals with diverse skill sets, we strive to deliver high-impact, long-term solutions for brands.</p>
                <p className="section-text">We understand clients' holistic needs and leverage branding fundamentals and contemporary social and content marketing paradigms to deliver customized solutions.</p>
                <p className="section-text" style={{ fontWeight: 600, color: 'var(--black)' }}>Repute manifests expertise, commitment, and creativity.</p>
                <a href="#contact" className="btn-red" style={{ marginTop: '8px' }}>Contact us</a>
              </div>
              <div className="about-image-col">
                <div className="stack-img-wrap large-stack-image">
                  <img src={content.teamImage} alt="Core Competence Team" className="image-placeholder" style={{ background: 'none' }} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── DYNAMIC CMS SECTIONS ── */}
        {dynamicSections.map((sec, index) => {
          // Pattern: 2 with Image Right, 2 with Image Left
          const isImageRight = (index % 4 === 0) || (index % 4 === 1);
          
          // If Image Right -> we need `about-row reverse` (with image first in DOM)
          // If Image Left  -> we need `about-row` (with image first in DOM)
          const rowClass = isImageRight ? "about-row reverse reveal" : "about-row reveal";
          const bgClass = index % 2 === 0 ? "bg-gray" : "bg-white";
          const allImages = [sec.image_url, sec.image_url_2, sec.image_url_3, sec.image_url_4].filter(Boolean);

          const formatTitle = (title) => {
            if (!title) return '';
            const words = title.trim().split(' ');
            if (words.length === 1) return `<span class="red">${words[0]}</span>`;
            const lastWord = words.pop();
            return `${words.join(' ')} <span class="red">${lastWord}</span>`;
          };

          return (
            <section key={sec.id} className={`about-content-section ${bgClass}`}>
              <div className="section-container">
                <div className={rowClass}>
                  
                  {/* IMAGE COLUMN ALWAYS FIRST IN DOM FOR MOBILE STACKING */}
                  <div className="about-image-col">
                    <div className="image-group layout-a">
                      {allImages.map((img, i) => (
                        <div key={i} className={`img-wrap ${i === 0 ? 'main-img' : i === 1 ? 'mid-img' : 'small-img'}`}>
                          <img src={img} alt="" className="image-placeholder" style={{ background: 'none' }} />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* TEXT COLUMN */}
                  <div className="about-text-col">
                    <h2 className="section-heading" dangerouslySetInnerHTML={{ __html: formatTitle(sec.title) }}></h2>
                    <div className="section-divider"></div>
                    <div className="section-text" dangerouslySetInnerHTML={{ __html: sec.content }}></div>
                  </div>

                </div>
              </div>
            </section>
          );
        })}



        {/* ── 7. TEAM ── */}
        <section className="about-content-section bg-gray">
          <div className="section-container reveal" style={{ textAlign: 'center' }}>
            <span className="section-tag">Repute</span>
            <h2 className="section-heading">Meet Our <span className="red">Team</span></h2>
            <div className="section-divider center"></div>
            <p className="section-text center">We are an energetic and experienced multidisciplinary team of brand creators, business analysts, marketers, creative minds, and technology specialists united by a common passion that drives us to deliver optimum results.</p>

            <div className="team-grid" style={{ marginTop: '48px' }}>
              {team.map((m, i) => (
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

        {/* ── 8. CTA ── */}
        <CTASection />

      </main>
      <Footer />
    </div>
  );
}
