import React, { useState, useEffect } from 'react';
import { Navbar, Footer, CTASection } from './SharedComponents';
import { supabase } from './supabaseClient';
import './Portfolio.css';

// Import images for the Branding section
import spankiImg from './assets/Branding/SPANKI-scaled.jpg';
import raftImg from './assets/Branding/RAFT-Garments-scaled.jpg';
import twinbirdsImg from './assets/Branding/Twinbirds.jpg';
import agaramImg from './assets/Branding/Agaram-Foundation.jpg';
import varagiImg from './assets/Branding/Varagi-Logo.jpg';

// Import images for the Creative section
import kceImg from './assets/Creative/Karpagam-College-of-Engineering_02 (1).jpg';
import kitImg from './assets/Creative/Karpagam-Institute-of-Technology.jpg';
import karpagamInstImg from './assets/Creative/KIT-Institutions-Wrapper.jpg';
import anusamImg from './assets/Creative/Anusam-Wrapper-3-scaled.jpg';

const fallbackBrandingItems = [
  { id: 1, name: 'SPANKI', category: 'Branding', img: spankiImg },
  { id: 2, name: 'RAFT', category: 'Branding', img: raftImg },
  { id: 3, name: 'Twinbirds', category: 'Branding', img: twinbirdsImg },
  { id: 4, name: 'AGARAM', category: 'Branding', img: agaramImg },
  { id: 5, name: 'VARAGI', category: 'Branding', img: varagiImg },
];

const fallbackCreativeItems = [
  { id: 1, name: 'KCE', category: 'Creative', img: kceImg },
  { id: 2, name: 'Karpagam Institutions', category: 'Creative', img: karpagamInstImg },
  { id: 3, name: 'KIT', category: 'Creative', img: kitImg },
  { id: 4, name: 'ANUSAM', category: 'Creative', img: anusamImg },
];

const fallbackWebItems = [
  { id: 1, name: 'KAHE', img: 'https://irepute.in/file/wp-content/uploads/2023/12/Kahe.jpg', link: 'https://kahedu.edu.in/' },
  { id: 2, name: 'KCE', img: 'https://irepute.in/file/wp-content/uploads/2023/12/KCE.jpg', link: 'https://kce.ac.in/' },
  { id: 3, name: 'KIT', img: 'https://irepute.in/file/wp-content/uploads/2023/12/KIT.jpg', link: 'https://karpagamtech.ac.in/' },
  { id: 4, name: 'SKIMT', img: 'https://irepute.in/file/wp-content/uploads/2023/12/SKIMT-scaled.jpg', link: 'https://skimtonline.org/' },
  { id: 5, name: 'Vishwankar Public School', img: 'https://irepute.in/file/wp-content/uploads/2023/12/VISHWANKAR-scaled.jpg', link: 'https://vishwankarschool.com/' },
  { id: 6, name: 'Karpagam Faculty of Medical Science & Research', img: 'https://irepute.in/file/wp-content/uploads/2023/12/Karpagam-Faculty.jpg', link: '#' },
  { id: 7, name: 'Karpagam Hospital', img: 'https://irepute.in/file/wp-content/uploads/2023/12/karpagamhospital.jpg', link: 'https://karpagamhospital.in/' },
  { id: 8, name: 'Karpagam Pharmacy', img: 'https://irepute.in/file/wp-content/uploads/2023/12/Karpagam-Pharmacy.jpg', link: 'https://kcp.edu.in/' },
  { id: 9, name: 'MMHRC', img: 'https://irepute.in/file/wp-content/uploads/2023/12/MMHRC.jpg', link: 'https://mmhrc.in/' },
  { id: 10, name: 'MMHRC - Radiology', img: 'https://irepute.in/file/wp-content/uploads/2023/12/MMHRC-2.jpg', link: '#' },
  { id: 11, name: 'Thangam Cancer Center', img: 'https://irepute.in/file/wp-content/uploads/2023/12/THANGAM-CANCER-CENTRE-scaled.jpg', link: 'https://thangamcancercenter.com/' },
  { id: 12, name: 'Narayani Hospital', img: 'https://irepute.in/file/wp-content/uploads/2023/12/Narayana-Hospital.jpg', link: 'https://narayanihospital.com/' },
  { id: 13, name: 'Dr. Reffai', img: 'https://irepute.in/file/wp-content/uploads/2023/12/Drrefi.jpg', link: '#' },
  { id: 14, name: 'Tirumalai Textiles', img: 'https://irepute.in/file/wp-content/uploads/2023/12/THIRUMALAI-TEXTTILES-scaled.jpg', link: 'https://tirumalaitextiles.com/' },
  { id: 15, name: 'SKD Fine Decor', img: 'https://irepute.in/file/wp-content/uploads/2023/12/SKD-scaled.jpg', link: 'http://skdfinedecor.com/' },
  { id: 16, name: 'Anusham Apparels', img: 'https://irepute.in/file/wp-content/uploads/2023/12/Anusam-App.jpg', link: 'https://www.anusamapparels.com/' },
  { id: 17, name: 'VP Tex', img: 'https://irepute.in/file/wp-content/uploads/2023/12/VP-TEX-scaled.jpg', link: 'https://www.vptex.in/' },
  { id: 18, name: 'Victus Dyeings', img: 'https://irepute.in/file/wp-content/uploads/2023/12/VICTUS-scaled.jpg', link: 'https://victus.in/' },
  { id: 19, name: 'KPR Mills', img: 'https://irepute.in/file/wp-content/uploads/2023/12/KPR.jpg', link: 'https://kprmilllimited.com/' },
  { id: 20, name: 'HP Cotton', img: 'https://irepute.in/file/wp-content/uploads/2023/12/HPC.jpg', link: 'https://hpcotton.in/' },
  { id: 21, name: 'Prosper Exports', img: 'https://irepute.in/file/wp-content/uploads/2023/12/prospperexports-scaled.jpg', link: 'https://www.prospperexports.com/' },
  { id: 22, name: 'ATL', img: 'https://irepute.in/file/wp-content/uploads/2023/12/ATL.jpg', link: 'http://www.analyticaltechnology.co.in/' },
  { id: 23, name: 'Ashok Textile Mills', img: 'https://irepute.in/file/wp-content/uploads/2023/12/Ashok-Textile.jpg', link: 'https://ashoktextilemills.com/' },
  { id: 24, name: 'Anusri Homes', img: 'https://irepute.in/file/wp-content/uploads/2023/12/Anusri-Homes.jpg', link: 'http://anusrihomes.com/' },
  { id: 25, name: 'Apex Precision Technologies', img: 'https://irepute.in/file/wp-content/uploads/2023/12/Apex.jpg', link: '#' },
  { id: 26, name: 'Ashok Construction', img: 'https://irepute.in/file/wp-content/uploads/2023/12/Ashok-Construction.jpg', link: 'https://ashokconstruction.com/' },
  { id: 27, name: 'Prem International', img: 'https://irepute.in/file/wp-content/uploads/2023/12/Premeroupa.jpg', link: 'https://premeuropa.com/' },
  { id: 28, name: 'Six Phrase', img: 'https://irepute.in/file/wp-content/uploads/2023/12/sixphrase-scaled.jpg', link: 'https://sixphrase.com/' },
  { id: 29, name: 'OMI Pumps', img: 'https://irepute.in/file/wp-content/uploads/2023/12/OMI.jpg', link: 'https://omipumps.com/' },
  { id: 30, name: 'Torran Pumps', img: 'https://irepute.in/file/wp-content/uploads/2023/12/TORRAN-PUMPS-scaled.jpg', link: '#' },
  { id: 31, name: 'Dream warriors Pictures', img: 'https://irepute.in/file/wp-content/uploads/2023/12/Dream-Warrior-Pictures.jpg', link: 'https://www.dwp.in/' },
  { id: 32, name: 'Rock fort Entertainment', img: 'https://irepute.in/file/wp-content/uploads/2023/12/RKINFOTAINMENT-scaled.jpg', link: 'https://rockfortentertainment.in/' },
  { id: 33, name: 'Vivekananda Pictures', img: 'https://irepute.in/file/wp-content/uploads/2023/12/VIVEKANANDHA-scaled.jpg', link: 'http://vivekanandapictures.com/' },
  { id: 34, name: 'Uzhavan Foundation', img: 'https://irepute.in/file/wp-content/uploads/2023/12/UZHAVAN-FOUNDATION-scaled.jpg', link: 'https://uzhavanfoundation.in/' },
  { id: 35, name: 'Crown of East', img: 'https://irepute.in/file/wp-content/uploads/2023/12/Crown-Of-East.jpg', link: 'https://crownofeast.com/' },
  { id: 36, name: 'Midland Residency', img: 'https://irepute.in/file/wp-content/uploads/2023/12/Midland-Residency.jpg', link: 'https://midlandresidency.in/' },
  { id: 37, name: 'VPK', img: 'https://irepute.in/file/wp-content/uploads/2023/12/VPK.jpg', link: '#' }
];

const fallbackEcommerceItems = [
  { id: 1, name: 'Sree Thangam Jewellery', category: 'E-Commerce', img: 'https://irepute.in/file/wp-content/uploads/2023/12/THANGAM-scaled.jpg', link: 'https://sreethangamjewellery.com/' },
  { id: 2, name: 'PRADE', category: 'E-Commerce', img: 'https://irepute.in/file/wp-content/uploads/2023/12/rhythmfashion-1920x1080.jpg', link: 'https://prade.in/' },
  { id: 3, name: 'Goes Good Fashion', category: 'E-Commerce', img: 'https://irepute.in/file/wp-content/uploads/2023/12/GGF.jpg', link: 'https://goesgood.in/' },
  { id: 4, name: 'Filmode Fashion', category: 'E-Commerce', img: 'https://irepute.in/file/wp-content/uploads/2023/12/rhythmfashion-scaled.jpg', link: 'https://filmodefashion.com/' },
];

const Portfolio = () => {
  const [brandingItems, setBrandingItems] = useState(fallbackBrandingItems);
  const [creativeItems, setCreativeItems] = useState(fallbackCreativeItems);
  const [webItems, setWebItems] = useState(fallbackWebItems);
  const [ecommerceItems, setEcommerceItems] = useState(fallbackEcommerceItems);

  const scrollRefs = {
    branding: React.useRef(null),
    creative: React.useRef(null),
    web: React.useRef(null),
    ecommerce: React.useRef(null)
  };
  const [webExpanded, setWebExpanded] = useState(false);

  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    els.forEach(el => obs.observe(el));
    window.scrollTo(0, 0);

    fetchProjects();

    return () => obs.disconnect();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('is_deleted', false)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      if (data && data.length > 0) {
        // Map database fields to the UI expected format
        const mapItem = (p) => ({
          id: p.id,
          name: p.title,
          category: p.category,
          img: p.image_url,
          link: p.website_link
        });

        const liveBranding = data.filter(p => p.category === 'Branding').map(mapItem);
        const liveCreative = data.filter(p => p.category === 'Creative').map(mapItem);
        const liveWeb = data.filter(p => p.category === 'Web Design & Development' || p.category === 'Web Development').map(mapItem);
        const liveEcommerce = data.filter(p => p.category === 'Ecommerce Development' || p.category === 'E-Commerce').map(mapItem);

        setBrandingItems(liveBranding.length > 0 ? liveBranding : fallbackBrandingItems);
        setCreativeItems(liveCreative.length > 0 ? liveCreative : fallbackCreativeItems);
        setWebItems(liveWeb.length > 0 ? liveWeb : fallbackWebItems);
        setEcommerceItems(liveEcommerce.length > 0 ? liveEcommerce : fallbackEcommerceItems);
      }
    } catch (err) {
      console.error("Failed to fetch projects from Supabase", err);
    }
  };

  const scroll = (key, direction) => {
    const container = scrollRefs[key].current;
    if (container) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const renderSection = (title, items, sectionKey, id) => (
    <section className="portfolio-section" id={id}>
      <div className="section-container">
        <div className="section-title-area reveal">
          <h2>{title}</h2>
          <div className="scroll-controls">
            <button className="scroll-btn left" onClick={() => scroll(sectionKey, 'left')}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <button className="scroll-btn right" onClick={() => scroll(sectionKey, 'right')}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </div>
        </div>
        
        <div className="portfolio-scroll-wrapper reveal">
          <div className="portfolio-scroll-container" ref={scrollRefs[sectionKey]}>
            {items.map((item) => (
              <div key={item.id} className="portfolio-card">
                {item.link ? (
                  <a href={item.link} target="_blank" rel="noopener noreferrer" style={{ display: 'block', height: '100%' }}>
                    <div className="card-img-wrapper">
                      <img src={item.img} alt={item.name} loading="lazy" />
                      <div className="card-overlay">
                        {item.category && <span>{item.category}</span>}
                        <h3>{item.name}</h3>
                      </div>
                    </div>
                  </a>
                ) : (
                  <div className="card-img-wrapper">
                    <img src={item.img} alt={item.name} loading="lazy" />
                    <div className="card-overlay">
                      {item.category && <span>{item.category}</span>}
                      <h3>{item.name}</h3>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );



  return (
    <div className="portfolio-page">
      <Navbar activePage="portfolio" />

      <main>
        <section className="portfolio-hero">
          <div className="portfolio-hero-content reveal">
            <span className="portfolio-badge">Creative Excellence</span>
            <h1>Delighting customers with creative excellence</h1>
            <p className="portfolio-hero-text">
              Repute strives to deliver results delighting clients by integrating creativity, branding and technology. 
              We transform and help your brand grow in a hyper-competitive market.
            </p>
          </div>
        </section>

        {brandingItems.length > 0 && renderSection("Branding", brandingItems, "branding", "branding")}
        {creativeItems.length > 0 && renderSection("Creative", creativeItems, "creative", "creative")}
        {webItems.length > 0 && renderSection("Web Design & Development", webItems, "web", "web")}
        {ecommerceItems.length > 0 && renderSection("Ecommerce Development", ecommerceItems, "ecommerce", "ecommerce")}

        <CTASection 
          title={<>Let's Design Your <span style={{ color: 'var(--blue)' }}>Future</span></>}
          subtitle="Act like a pro UI designer and let us build something amazing together."
          buttonLink="/contact"
        />
      </main>

      <Footer />
    </div>
  );
};

export default Portfolio;
