import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { supabase } from '../supabaseClient';

const CMS_STYLE = `
  .cms-wrapper { display: flex; min-height: 100vh; background: #0b1120; font-family: 'Inter', sans-serif; }
  .cms-content { margin-left: 260px; padding: 40px; width: calc(100% - 260px); color: #e2e8f0; }
  .cms-title { font-size: 1.8rem; font-weight: 800; margin-bottom: 24px; color: #fff; }
  .cms-tabs { display: flex; gap: 8px; margin-bottom: 32px; }
  .cms-tab { padding: 10px 20px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.03); color: #94a3b8; cursor: pointer; font-weight: 600; }
  .cms-tab.active { background: #e10600; color: #fff; border-color: transparent; }
  .cms-panel { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 16px; padding: 28px; }
  .cms-select { width: 100%; max-width: 400px; padding: 12px; border-radius: 10px; background: #1e293b; border: 1px solid rgba(255,255,255,0.1); color: #fff; }
  .cms-input { width: 100%; padding: 10px; border-radius: 8px; background: #1e293b; border: 1px solid rgba(255,255,255,0.1); color: #fff; margin-bottom: 10px; font-family: inherit; }
  .cms-textarea { width: 100%; padding: 10px; border-radius: 8px; background: #1e293b; border: 1px solid rgba(255,255,255,0.1); color: #fff; resize: vertical; min-height: 80px; font-family: inherit; }
  .cms-btn { padding: 10px 20px; border-radius: 8px; border: none; cursor: pointer; font-weight: 600; transition: 0.3s; }
  .cms-btn-primary { background: #e10600; color: #fff; }
  .cms-btn-primary:hover { background: #c50500; }
  .cms-btn-secondary { background: rgba(255,255,255,0.1); color: #fff; }
  .cms-btn-secondary:hover { background: rgba(255,255,255,0.15); }
  
  .cms-table { width: 100%; border-collapse: collapse; text-align: left; margin-top: 20px; }
  .cms-table th { background: rgba(255,255,255,0.05); padding: 15px 20px; font-weight: 700; color: #94a3b8; font-size: 0.85rem; text-transform: uppercase; border-bottom: 1px solid rgba(255,255,255,0.1); }
  .cms-table td { padding: 15px 20px; border-bottom: 1px solid rgba(255,255,255,0.05); color: #e2e8f0; font-size: 0.95rem; }
  .type-badge { display: inline-block; padding: 4px 10px; border-radius: 6px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; background: rgba(255,255,255,0.1); color: #cbd5e1; }
  .action-btn { background: none; border: none; cursor: pointer; font-weight: 600; padding: 5px 10px; border-radius: 6px; transition: 0.2s; margin-right: 5px; }
  .edit-btn { color: #3b82f6; } .edit-btn:hover { background: rgba(59, 130, 246, 0.1); }
  .delete-btn { color: #ef4444; } .delete-btn:hover { background: rgba(239, 68, 68, 0.1); }
  .move-btn { color: #94a3b8; background: rgba(255,255,255,0.05); } .move-btn:hover { background: rgba(255,255,255,0.1); color: #fff; }

  .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.7); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; z-index: 100; }
  .modal-content { background: #1e293b; padding: 30px; border-radius: 20px; width: 100%; max-width: 600px; max-height: 85vh; overflow-y: auto; border: 1px solid rgba(255,255,255,0.1); }
  .status-msg { padding: 12px; border-radius: 10px; margin-bottom: 20px; font-weight: 600; text-align: center; font-size: 0.9rem; }
  .status-success { background: rgba(34,197,94,0.1); color: #4ade80; border: 1px solid rgba(34,197,94,0.2); }
  .status-error { background: rgba(239,68,68,0.1); color: #f87171; border: 1px solid rgba(239,68,68,0.2); }
  .status-loading { background: rgba(255,255,255,0.05); color: #94a3b8; }

  /* Visual Editor Hovers */
  .preview-section-wrapper:hover .preview-edit-overlay {
    border-color: #e10600 !important;
    background: rgba(225,6,0,0.02);
  }
  .preview-section-wrapper:hover .edit-btn-pill {
    opacity: 1 !important;
    transform: translateY(5px);
  }
`;

const SECTION_TYPES = ['hero', 'services', 'stats', 'about', 'cta', 'portfolio', 'career', 'contact', 'footer', 'custom'];

const PAGE_TEMPLATES = {
  home: [
    { section_name: 'Hero Slider', section_type: 'hero', sort_order: 1, content: { heading: 'Is Your Brand Attracting Prospects?', subtext: 'Let us discuss', button_text: 'Repute Branding Services', image_url: '/img/img1.jpg' } },
    { section_name: 'Web Services', section_type: 'services', sort_order: 2, content: { tag: 'What We Do', heading: 'Website Design & Development Services', items: 'Website Design: Modern, aesthetic designs that captivate your audience, Content Managed Websites: Easy-to-manage websites with flexible content control, Web Application Development: Scalable, robust web applications for your business needs, Search Engine Optimisation: Improve visibility and rank higher in search results' } },
    { section_name: 'Digital Marketing', section_type: 'services', sort_order: 3, content: { tag: 'Growth Strategy', heading: 'Digital Marketing', items: 'Search Engine Optimisation: Organic growth through strategic SEO tactics, Social Media Marketing: Engaging campaigns that build brand loyalty, Search Engine Marketing: Targeted ads to reach your ideal customers, PPC Marketing & Management: Maximize ROI with strategic paid advertising' } },
    { section_name: 'Main Stats', section_type: 'stats', sort_order: 4, content: { stats: '18+:Years in Market, 50+:Experienced Professionals, 600+:Happy Clients' } },
    { section_name: 'About Agency', section_type: 'about', sort_order: 5, content: { tag: 'Who We Are', heading: 'Full Service Digital Agency', text: 'Repute is a Full Service Digital Agency that helps Build - Promote - Market Brands.', button_text: 'Learn More' } },
    { section_name: 'E-Commerce', section_type: 'services', sort_order: 6, content: { tag: 'Online Business', heading: 'E-Commerce Development', items: 'Custom E-Commerce Portal: Tailored solutions built to your specifications, WooCommerce Development: Powerful WordPress-based solutions, Magento Development: Enterprise-grade platforms, Shopify Development: Quick-to-market solutions' } },
    { section_name: 'Discuss Project CTA', section_type: 'cta', sort_order: 7, content: { heading: "Let's Discuss Your Project", subtext: 'Fill out the form below and our team will get back to you shortly', button_text: 'Contact Us' } },
    { section_name: 'Contact & Info', section_type: 'contact', sort_order: 8, content: { tag: 'Get in Touch', heading: "Let's Connect", subtext: 'We are here to help you grow your business digital footprint.' } },
    { section_name: 'Footer Section', section_type: 'footer', sort_order: 9, content: { about_text: 'Focused on building relationships with our clients and community.', phone: '+91-422 4980307', email: 'support@irepute.in', address: 'Repute Digital Agency, Coimbatore, Tamil Nadu' } },
  ],
  services: [
    { section_name: 'Service Page Hero', section_type: 'hero', sort_order: 1, content: { heading: 'Comprehensive Digital Services', subtext: 'Strategic solutions for modern business challenges', button_text: 'Our Expertise', image_url: '/img/service-hero.jpg' } },
    { section_name: 'Service Offerings', section_type: 'services', sort_order: 2, content: { tag: 'EXPERTISE', heading: 'What We Provide', items: 'Web Design: Creative UX/UI, App Development: Custom apps, SEO: Rank higher' } },
    { section_name: 'Service Stats', section_type: 'stats', sort_order: 3, content: { stats: '200+:Websites Built, 150+:Global Clients, 15+:Countries' } },
    { section_name: 'Contact Us CTA', section_type: 'cta', sort_order: 4, content: { heading: 'Start Your Journey With Us', subtext: 'Let\'s create something amazing together', button_text: 'Contact Us' } }
  ],
  about: [
    { section_name: 'About Us Hero', section_type: 'hero', sort_order: 1, content: { heading: 'About Repute Digital', subtext: 'A Full Service Digital Agency since 2012', button_text: 'Our Vision', image_url: '/img/about-hero.jpg' } },
    { section_name: 'Our Story', section_type: 'about', sort_order: 2, content: { tag: 'OUR STORY', heading: 'Excellence in Every Pixel', text: 'Repute helps brands grow through innovative technology and strategic marketing.', button_text: 'Meet The Team' } },
    { section_name: 'About Stats', section_type: 'stats', sort_order: 3, content: { stats: '10+:Years of Experience, 50+:Creative Minds, 500+:Awards Won' } }
  ],
  contact: [
    { section_name: 'Contact Hero', section_type: 'hero', sort_order: 1, content: { heading: 'Get In Touch', subtext: 'We are here to help you grow', button_text: 'Our Offices' } },
    { section_name: 'Main Contact Info', section_type: 'contact', sort_order: 2, content: { tag: 'CONNECT', heading: 'Visit Our Office', subtext: 'Drop by for a coffee and a chat about your next big project.' } }
  ]
};

const WebsiteCMS = ({ embeddedSlug = null }) => {
  console.log("WebsiteCMS LOADED - slug:", embeddedSlug);
  const [viewMode, setViewMode] = useState('visual'); // Default to visual for better UX
  const [activeTab, setActiveTab] = useState(embeddedSlug ? 'sections' : 'pages');
  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState(null);
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    section_name: '',
    section_type: 'custom',
    sort_order: 1,
    content: {}
  });

  const [newFieldKey, setNewFieldKey] = useState('');
  const [newFieldValue, setNewFieldValue] = useState('');

  useEffect(() => {
    const standardPages = [
      { id: 1, slug: 'home', title: 'Home Page', url: '/' },
      { id: 2, slug: 'about', title: 'About Us', url: '/about' },
      { id: 3, slug: 'services', title: 'Services', url: '/brand-creatives' },
      { id: 4, slug: 'portfolio', title: 'Portfolio', url: '/portfolio' },
      { id: 5, slug: 'career', title: 'Career', url: '/career' },
      { id: 6, slug: 'contact', title: 'Contact', url: '/contact' }
    ];
    setPages(standardPages);
  }, []);

  useEffect(() => {
    if (embeddedSlug && pages.length > 0) {
      const pg = pages.find(p => p.slug === embeddedSlug) || { slug: embeddedSlug, title: embeddedSlug.charAt(0).toUpperCase() + embeddedSlug.slice(1), url: `/${embeddedSlug}` };
      setSelectedPage(pg);
      setActiveTab('sections');
    }
  }, [embeddedSlug, pages]);

  useEffect(() => {
    if (selectedPage) {
      console.log("FETCH RUNNING for:", selectedPage.slug);
      loadSections(selectedPage.slug);
    }
  }, [selectedPage]);

  const loadSections = async (slug) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('site_sections')
        .select('*')
        .eq('page_slug', slug)
        .order('sort_order', { ascending: true });
      
      if (error) throw error;
      setSections(data.map(s => {
        let parsedContent = {};
        try {
          if (typeof s.content === 'string') {
            if (s.content.trim().startsWith('{') || s.content.trim().startsWith('[')) {
              parsedContent = JSON.parse(s.content);
            } else {
              // It's a plain string, put it in a 'text' field for now
              parsedContent = { text: s.content };
            }
          } else if (s.content && typeof s.content === 'object') {
            parsedContent = s.content;
          }
        } catch (e) {
          console.error("Parse error for section", s.id, e);
          parsedContent = { text: s.content }; // Fallback
        }
        return { ...s, content: parsedContent };
      }));
    } catch (err) {
      console.error('Error loading sections:', err);
    }
    setLoading(false);
  };

  const seedDefaultData = async () => {
    if (!selectedPage) return;
    if (!window.confirm(`Seed default sections to ${selectedPage.title}?`)) return;
    setIsSubmitting(true);
    setStatus({ type: 'loading', message: 'Seeding...' });
    try {
      const template = PAGE_TEMPLATES[selectedPage.slug] || [{ page_slug: selectedPage.slug, section_name: 'Hero Section', section_type: 'hero', sort_order: 1, content: { heading: 'Welcome' } }];
      const toInsert = template.map(s => ({ ...s, page_slug: selectedPage.slug }));
      await supabase.from('site_sections').insert(toInsert);
      loadSections(selectedPage.slug);
      setStatus({ type: 'success', message: '✓ Seeded!' });
    } catch (err) {
      setStatus({ type: 'error', message: 'Failed' });
    }
    setIsSubmitting(false);
  };

  const handleSaveSection = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (isEditing) {
        await supabase.from('site_sections').update(formData).eq('id', editingId);
      } else {
        await supabase.from('site_sections').insert([{ ...formData, page_slug: selectedPage.slug }]);
      }
      loadSections(selectedPage.slug);
      closeModal();
    } catch (err) {
      setStatus({ type: 'error', message: 'Error' });
    }
    setIsSubmitting(false);
  };

  const closeModal = () => {
    setShowModal(false);
    setIsEditing(false);
    setEditingId(null);
    setStatus({ type: '', message: '' });
  };

  const moveSection = async (index, direction) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= sections.length) return;
    const newSections = [...sections];
    [newSections[index], newSections[newIndex]] = [newSections[newIndex], newSections[index]];
    newSections.forEach((s, i) => { s.sort_order = i + 1; });
    setSections(newSections);
    try {
      for (const s of newSections) {
        await supabase.from('site_sections').update({ sort_order: s.sort_order }).eq('id', s.id);
      }
    } catch (err) {}
  };

  const renderModal = () => {
    // Dynamic fields based on section type
    const renderContentFields = () => {
      const type = formData.section_type;
      const content = formData.content || {};

      const updateContent = (key, val) => {
        setFormData({ ...formData, content: { ...content, [key]: val } });
      };

      if (type === 'hero') {
        return (
          <>
            <label style={{ fontSize: '12px', color: '#94a3b8' }}>Heading</label>
            <textarea className="cms-textarea" value={content.heading || ''} onChange={e => updateContent('heading', e.target.value)} />
            <label style={{ fontSize: '12px', color: '#94a3b8' }}>Subtext</label>
            <textarea className="cms-textarea" value={content.subtext || ''} onChange={e => updateContent('subtext', e.target.value)} />
            <label style={{ fontSize: '12px', color: '#94a3b8' }}>Button Text</label>
            <input className="cms-input" value={content.button_text || ''} onChange={e => updateContent('button_text', e.target.value)} />
            <label style={{ fontSize: '12px', color: '#94a3b8' }}>Background Image URL</label>
            <input className="cms-input" value={content.image_url || ''} onChange={e => updateContent('image_url', e.target.value)} />
          </>
        );
      }

      if (type === 'services') {
        return (
          <>
            <label style={{ fontSize: '12px', color: '#94a3b8' }}>Tag (e.g. WHAT WE DO)</label>
            <input className="cms-input" value={content.tag || ''} onChange={e => updateContent('tag', e.target.value)} />
            <label style={{ fontSize: '12px', color: '#94a3b8' }}>Main Heading</label>
            <input className="cms-input" value={content.heading || ''} onChange={e => updateContent('heading', e.target.value)} />
            <label style={{ fontSize: '12px', color: '#94a3b8' }}>Items (comma separated)</label>
            <textarea className="cms-textarea" value={content.items || ''} onChange={e => updateContent('items', e.target.value)} />
          </>
        );
      }

      if (type === 'stats') {
        return (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <input className="cms-input" placeholder="Stat 1 Num" value={content.stat1_number || ''} onChange={e => updateContent('stat1_number', e.target.value)} />
            <input className="cms-input" placeholder="Stat 1 Label" value={content.stat1_label || ''} onChange={e => updateContent('stat1_label', e.target.value)} />
            <input className="cms-input" placeholder="Stat 2 Num" value={content.stat2_number || ''} onChange={e => updateContent('stat2_number', e.target.value)} />
            <input className="cms-input" placeholder="Stat 2 Label" value={content.stat2_label || ''} onChange={e => updateContent('stat2_label', e.target.value)} />
            <input className="cms-input" placeholder="Stat 3 Num" value={content.stat3_number || ''} onChange={e => updateContent('stat3_number', e.target.value)} />
            <input className="cms-input" placeholder="Stat 3 Label" value={content.stat3_label || ''} onChange={e => updateContent('stat3_label', e.target.value)} />
          </div>
        );
      }

      if (type === 'about') {
        return (
          <>
            <label style={{ fontSize: '12px', color: '#94a3b8' }}>Tag</label>
            <input className="cms-input" value={content.tag || ''} onChange={e => updateContent('tag', e.target.value)} />
            <label style={{ fontSize: '12px', color: '#94a3b8' }}>Heading</label>
            <input className="cms-input" value={content.heading || ''} onChange={e => updateContent('heading', e.target.value)} />
            <label style={{ fontSize: '12px', color: '#94a3b8' }}>Description (Text)</label>
            <textarea className="cms-textarea" value={content.text || ''} onChange={e => updateContent('text', e.target.value)} />
            <label style={{ fontSize: '12px', color: '#94a3b8' }}>Button Text</label>
            <input className="cms-input" value={content.button_text || ''} onChange={e => updateContent('button_text', e.target.value)} />
          </>
        );
      }

      if (type === 'portfolio') {
        return (
          <>
            <label style={{ fontSize: '12px', color: '#94a3b8' }}>Tag</label>
            <input className="cms-input" value={content.tag || ''} onChange={e => updateContent('tag', e.target.value)} />
            <label style={{ fontSize: '12px', color: '#94a3b8' }}>Heading</label>
            <input className="cms-input" value={content.heading || ''} onChange={e => updateContent('heading', e.target.value)} />
            <label style={{ fontSize: '12px', color: '#94a3b8' }}>Projects (e.g. Project 1, Project 2)</label>
            <textarea className="cms-textarea" value={content.projects || ''} onChange={e => updateContent('projects', e.target.value)} />
          </>
        );
      }

      if (type === 'career') {
        return (
          <>
            <label style={{ fontSize: '12px', color: '#94a3b8' }}>Heading</label>
            <input className="cms-input" value={content.heading || ''} onChange={e => updateContent('heading', e.target.value)} />
            <label style={{ fontSize: '12px', color: '#94a3b8' }}>Jobs (comma separated)</label>
            <textarea className="cms-textarea" value={content.jobs || ''} onChange={e => updateContent('jobs', e.target.value)} />
          </>
        );
      }

      if (type === 'contact') {
        return (
          <>
            <label style={{ fontSize: '12px', color: '#94a3b8' }}>Tag</label>
            <input className="cms-input" value={content.tag || ''} onChange={e => updateContent('tag', e.target.value)} />
            <label style={{ fontSize: '12px', color: '#94a3b8' }}>Heading</label>
            <input className="cms-input" value={content.heading || ''} onChange={e => updateContent('heading', e.target.value)} />
            <label style={{ fontSize: '12px', color: '#94a3b8' }}>Description (Text)</label>
            <textarea className="cms-textarea" value={content.text || ''} onChange={e => updateContent('text', e.target.value)} />
          </>
        );
      }

      if (type === 'footer') {
        return (
          <>
            <label style={{ fontSize: '12px', color: '#94a3b8' }}>About Text</label>
            <textarea className="cms-textarea" value={content.about_text || ''} onChange={e => updateContent('about_text', e.target.value)} />
            <label style={{ fontSize: '12px', color: '#94a3b8' }}>Phone</label>
            <input className="cms-input" value={content.phone || ''} onChange={e => updateContent('phone', e.target.value)} />
            <label style={{ fontSize: '12px', color: '#94a3b8' }}>Email</label>
            <input className="cms-input" value={content.email || ''} onChange={e => updateContent('email', e.target.value)} />
            <label style={{ fontSize: '12px', color: '#94a3b8' }}>Address</label>
            <textarea className="cms-textarea" value={content.address || ''} onChange={e => updateContent('address', e.target.value)} />
          </>
        );
      }

      return (
        <>
          <p style={{ color: '#94a3b8', fontSize: '12px' }}>Custom Fields:</p>
          {Object.entries(content).map(([k, v]) => (
            <div key={k} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
              <input className="cms-input" style={{ flex: 1 }} value={k} disabled />
              <input className="cms-input" style={{ flex: 2 }} value={v} onChange={e => updateContent(k, e.target.value)} />
              <button type="button" className="action-btn delete-btn" onClick={() => { const nc = {...content}; delete nc[k]; setFormData({...formData, content: nc}); }}>×</button>
            </div>
          ))}
          <div style={{ display: 'flex', gap: '10px', background: 'rgba(255,255,255,0.03)', padding: '10px', borderRadius: '8px' }}>
            <input className="cms-input" style={{ marginBottom: 0 }} placeholder="New Key" value={newFieldKey} onChange={e => setNewFieldKey(e.target.value)} />
            <input className="cms-input" style={{ marginBottom: 0 }} placeholder="New Value" value={newFieldValue} onChange={e => setNewFieldValue(e.target.value)} />
            <button type="button" className="cms-btn cms-btn-primary" onClick={() => { if(newFieldKey) { updateContent(newFieldKey, newFieldValue); setNewFieldKey(''); setNewFieldValue(''); } }}>+</button>
          </div>
        </>
      );
    };

    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <h2 style={{ color: '#fff', margin: 0 }}>{isEditing ? 'Edit Section' : 'Add Section'}</h2>
            <button className="action-btn" style={{ color: '#fff', fontSize: '24px' }} onClick={closeModal}>×</button>
          </div>
          <form onSubmit={handleSaveSection}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
              <div>
                <label style={{ fontSize: '12px', color: '#94a3b8' }}>Section Name</label>
                <input className="cms-input" placeholder="e.g. Hero Slider" value={formData.section_name} onChange={e => setFormData({...formData, section_name: e.target.value})} required />
              </div>
              <div>
                <label style={{ fontSize: '12px', color: '#94a3b8' }}>Section Type</label>
                <select className="cms-select" value={formData.section_type} onChange={e => setFormData({...formData, section_type: e.target.value})}>
                  {SECTION_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
              <h4 style={{ color: '#fff', marginBottom: '15px' }}>Content Fields</h4>
              {renderContentFields()}
            </div>

            <div className="form-actions" style={{ display: 'flex', gap: '10px', marginTop: '30px' }}>
              <button type="button" className="cms-btn cms-btn-secondary" style={{ flex: 1 }} onClick={closeModal}>Cancel</button>
              <button type="submit" className="cms-btn cms-btn-primary" style={{ flex: 2 }} disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : 'Save Section'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const renderVisualPreview = () => {
    if (sections.length === 0) return (
      <div style={{ textAlign: 'center', padding: '80px', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '2px dashed rgba(255,255,255,0.1)' }}>
        <p style={{ color: '#94a3b8', fontSize: '1.2rem', marginBottom: '20px' }}>This page is currently empty.</p>
        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
          <button className="cms-btn cms-btn-primary" onClick={seedDefaultData}>Seed {selectedPage?.title} Template</button>
          <button className="cms-btn cms-btn-secondary" onClick={() => { setFormData({ section_name: '', section_type: 'custom', sort_order: 1, content: {} }); setShowModal(true); }}>+ Add Blank Section</button>
        </div>
      </div>
    );

    return (
      <div className="visual-editor-wrapper">
        {/* Live Iframe Preview */}
        <div style={{ marginBottom: '40px', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', background: '#1e293b' }}>
          <div style={{ padding: '10px 20px', background: 'rgba(255,255,255,0.05)', color: '#94a3b8', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Live Site Preview (Iframe): {selectedPage?.url}</span>
            <a href={`http://localhost:3000${selectedPage?.url}`} target="_blank" rel="noreferrer" style={{ color: '#e10600', textDecoration: 'none', fontSize: '0.7rem' }}>Open in New Tab ↗</a>
          </div>
          <iframe 
            src={`http://localhost:3000${selectedPage?.url}`} 
            width="100%" 
            height="400" 
            title="Live Page Preview" 
            style={{ border: 'none', background: '#fff' }}
          ></iframe>
        </div>

        <div style={{ padding: '10px 20px', background: '#e10600', color: '#fff', fontSize: '0.9rem', fontWeight: 800, textAlign: 'center', borderRadius: '12px 12px 0 0', letterSpacing: '1px' }}>
          VISUAL EDITOR: CLICK ON ANY SECTION TO EDIT
        </div>

        <div className="visual-preview-container" style={{ 
          background: '#fff', 
          borderRadius: '0 0 16px 16px', 
          overflow: 'hidden', 
          color: '#000',
          boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
          position: 'relative'
        }}>
        {/* Flow Marker */}
        <div style={{ position: 'absolute', top: '10px', left: '10px', background: '#22c55e', color: '#fff', fontSize: '10px', fontWeight: 700, padding: '3px 8px', borderRadius: '4px', zIndex: 100 }}>HEADER</div>

        {/* Mock Navbar */}
        <div style={{ height: '70px', borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px', background: '#fff' }}>
          <img src="/logo.png" alt="Logo" style={{ height: '40px' }} />
          <div style={{ display: 'flex', gap: '25px', fontWeight: '600', fontSize: '14px', color: '#333' }}>
            <span style={{ color: selectedPage?.slug === 'home' ? '#e10600' : 'inherit' }}>Home</span>
            <span style={{ color: selectedPage?.slug === 'about' ? '#e10600' : 'inherit' }}>About Us</span>
            <span style={{ color: selectedPage?.slug === 'services' ? '#e10600' : 'inherit' }}>Services</span>
            <span style={{ color: selectedPage?.slug === 'portfolio' ? '#e10600' : 'inherit' }}>Portfolio</span>
            <span style={{ color: selectedPage?.slug === 'career' ? '#e10600' : 'inherit' }}>Career</span>
            <span style={{ color: selectedPage?.slug === 'contact' ? '#e10600' : 'inherit' }}>Contact</span>
          </div>
        </div>

        <div className="preview-scroll-area" style={{ maxHeight: '75vh', overflowY: 'auto' }}>
          <div style={{ padding: '5px', background: '#f1f5f9', fontSize: '10px', fontWeight: 800, color: '#64748b', textAlign: 'center', letterSpacing: '2px' }}>BODY CONTENT</div>
          {sections.map((s, idx) => {
            const content = s.content || {};
            
            return (
              <div key={s.id} className="preview-section-wrapper" 
                onClick={() => { setEditingId(s.id); setFormData(s); setIsEditing(true); setShowModal(true); }} 
                style={{ position: 'relative', cursor: 'pointer' }}
              >
                <div className="preview-edit-overlay" style={{ 
                  position: 'absolute', inset: 0, border: '2px dashed transparent', 
                  zIndex: 50, transition: '0.2s', display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-end', padding: '15px' 
                }}>
                  <div className="edit-btn-pill" style={{ 
                    background: '#e10600', color: '#fff', padding: '6px 14px', borderRadius: '50px', 
                    fontSize: '11px', fontWeight: 800, opacity: 0, transition: '0.2s', boxShadow: '0 5px 15px rgba(225,6,0,0.3)' 
                  }}>EDIT: {s.section_name}</div>
                </div>

                {/* PRODUCTION SECTION RENDERING */}
                
                {s.section_type === 'hero' && (
                  <section className="hero-slider" style={{ height: '500px' }}>
                    <div className="hero-slide active">
                      <div className="hero-slide-bg" style={{ backgroundImage: `url('${content.image_url || '/img/img1.jpg'}')`, opacity: 0.8 }} />
                      <div className="hero-content">
                        <h1 className="hero-heading" style={{ fontSize: '3rem' }}>{content.heading}</h1>
                        <p className="hero-yellow">{content.subtext}</p>
                        <div className="hero-btn-container">
                          <button className="repute-btn repute-btn-primary" style={{ width: 'auto', padding: '0 40px' }}>{content.button_text}</button>
                        </div>
                      </div>
                    </div>
                  </section>
                )}

                {s.section_type === 'services' && (
                  <section className="services-section" style={{ background: idx % 2 === 0 ? 'var(--white)' : 'var(--gray-light)', padding: '70px 0' }}>
                    <div className="section-container" style={{ textAlign: 'center' }}>
                      <span className="section-tag">{content.tag}</span>
                      <h2 className="section-heading">
                        {content.heading.split(' ').map((w, i) => i === content.heading.split(' ').length - 2 ? <span key={i} className="red">{w} </span> : w + ' ')}
                      </h2>
                      <div className="section-divider center"></div>
                      <div className="services-grid" style={{ marginTop: '40px' }}>
                        {(content.items || "").split(',').map((item, i) => {
                          const [title, desc] = item.split(':');
                          return (
                            <div key={i} className="service-card">
                              <div className="service-icon" style={{ fontSize: '2rem' }}>⚙️</div>
                              <h3 style={{ fontSize: '1.1rem' }}>{title?.trim()}</h3>
                              <p style={{ fontSize: '0.85rem' }}>{desc?.trim()}</p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </section>
                )}

                {s.section_type === 'stats' && (
                  <section className="stats-section" style={{ padding: '60px 0', background: 'var(--blue)' }}>
                    <div className="section-container">
                      <div className="stats-grid" style={{ display: 'flex', justifyContent: 'space-around' }}>
                        {(content.stats || "").split(',').map((st, i) => {
                          const [num, label] = st.split(':');
                          return (
                            <div key={i} className="stat-card" style={{ textAlign: 'center' }}>
                              <div className="stat-number" style={{ fontSize: '3rem', fontWeight: 900, color: '#fff' }}>{num?.trim()}</div>
                              <div className="stat-label" style={{ color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '1px' }}>{label?.trim()}</div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </section>
                )}

                {s.section_type === 'about' && (
                  <section className="about-section-home" style={{ padding: '80px 0' }}>
                    <div className="section-container">
                      <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '60px', alignItems: 'center' }}>
                        <div>
                          <span className="section-tag">{content.tag}</span>
                          <h2 className="section-heading" style={{ fontSize: '2.8rem' }}>{content.heading}</h2>
                          <div className="section-divider"></div>
                          <p className="section-text" style={{ fontSize: '1rem' }}>{content.text}</p>
                          <button className="repute-btn repute-btn-secondary" style={{ width: 'auto', padding: '0 30px', marginTop: '20px' }}>{content.button_text}</button>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
                          <div style={{ background: 'var(--blue)', borderRadius: '24px', padding: '40px', textAlign: 'center' }}>
                            <div className="stat-number" style={{ color: '#fff' }}>18+</div>
                            <div className="stat-label" style={{ color: 'rgba(255,255,255,0.5)' }}>Years in Market</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                )}

                {s.section_type === 'cta' && (
                  <section className="cta-section" style={{ background: 'var(--gray-light)', padding: '100px 0', textAlign: 'center' }}>
                    <div className="section-container">
                      <h2 className="section-heading" style={{ fontSize: '3rem' }}>{content.heading}</h2>
                      <p className="section-text center" style={{ fontSize: '1.2rem', marginBottom: '40px' }}>{content.subtext}</p>
                      <button className="repute-btn repute-btn-primary" style={{ width: 'auto', padding: '0 50px', height: '60px', borderRadius: '50px' }}>{content.button_text}</button>
                    </div>
                  </section>
                )}

                {s.section_type === 'contact' && (
                  <section className="contact-section" style={{ padding: '80px 0', background: 'var(--blue)' }}>
                    <div className="section-container">
                      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                        <span className="section-tag">{content.tag}</span>
                        <h2 className="section-heading" style={{ color: '#fff' }}>{content.heading}</h2>
                        <div className="section-divider center"></div>
                      </div>
                      <div style={{ maxWidth: '800px', margin: '0 auto', background: 'rgba(255,255,255,0.03)', padding: '50px', borderRadius: '32px', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <div style={{ textAlign: 'center' }}>
                          <button className="repute-btn repute-btn-primary" style={{ width: 'auto', padding: '0 40px' }}>✉️ ENQUIRE NOW</button>
                        </div>
                      </div>
                    </div>
                  </section>
                )}

                {s.section_type === 'footer' && (
                  <footer className="footer" style={{ background: '#080c16', color: '#fff', padding: '80px 0' }}>
                    <div className="section-container">
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '40px' }}>
                        <div style={{ gridColumn: 'span 2' }}>
                          <h4 style={{ fontWeight: 800, marginBottom: '25px', fontSize: '1.5rem' }}>Repute</h4>
                          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem', lineHeight: 1.8 }}>{content.about_text}</p>
                        </div>
                        <div>
                          <h4 style={{ fontWeight: 800, marginBottom: '20px' }}>Connect</h4>
                          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>{content.phone}<br/>{content.email}</p>
                        </div>
                        <div>
                          <h4 style={{ fontWeight: 800, marginBottom: '20px' }}>Visit</h4>
                          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>{content.address}</p>
                        </div>
                      </div>
                    </div>
                  </footer>
                )}
              </div>
            );
          })}
          
          {/* Mock Footer */}
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', top: '10px', left: '10px', background: '#64748b', color: '#fff', fontSize: '10px', fontWeight: 700, padding: '3px 8px', borderRadius: '4px', zIndex: 100 }}>FOOTER</div>
            <div style={{ background: '#0b1120', color: '#fff', padding: '60px 10%', textAlign: 'center' }}>
              <img src="/logo.png" alt="Logo" style={{ height: '40px', margin: '0 auto 20px', filter: 'brightness(0) invert(1)' }} />
              <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', fontSize: '13px', color: '#94a3b8', marginBottom: '20px' }}>
                <span>Privacy Policy</span><span>Terms & Conditions</span><span>Support</span>
              </div>
              <p style={{ color: '#94a3b8', fontSize: '12px' }}>© 2026 Repute Digital. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  };

  const renderContent = () => (
    <div className="cms-panel" style={{ background: embeddedSlug ? 'transparent' : '', border: embeddedSlug ? 'none' : '', padding: embeddedSlug ? '0' : '' }}>
      {activeTab === 'sections' && selectedPage && (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <h2 style={{ margin: 0, color: '#fff' }}>{selectedPage.title} Sections</h2>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: '5px' }}>
                {viewMode === 'visual' ? 'Click on any part of the page below to edit it.' : 'Manage sections using the list view.'}
              </p>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <div style={{ display: 'flex', background: 'rgba(255,255,255,0.05)', padding: '4px', borderRadius: '8px', marginRight: '10px' }}>
                <button 
                  className={`cms-btn ${viewMode === 'visual' ? 'cms-btn-primary' : ''}`} 
                  style={{ padding: '6px 12px', fontSize: '13px' }}
                  onClick={() => setViewMode('visual')}
                >Visual View</button>
                <button 
                  className={`cms-btn ${viewMode === 'table' ? 'cms-btn-primary' : ''}`} 
                  style={{ padding: '6px 12px', fontSize: '13px' }}
                  onClick={() => setViewMode('table')}
                >List View</button>
              </div>
              <button className="cms-btn cms-btn-secondary" style={{ marginRight: '5px' }} onClick={seedDefaultData}>Seed Default Data</button>
              <button className="cms-btn cms-btn-primary" onClick={() => { setFormData({ section_name: '', section_type: 'custom', sort_order: sections.length + 1, content: {} }); setShowModal(true); }}>+ Add Section</button>
            </div>
          </div>

          {viewMode === 'table' ? (
            <table className="cms-table" style={{ marginTop: '20px' }}>
              <thead>
                <tr>
                  <th style={{ width: '100px' }}>Order</th>
                  <th style={{ width: '80px' }}>Visual</th>
                  <th>Section Name</th>
                  <th>Type</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {sections.map((s, index) => {
                  const icons = { hero: '🖼️', services: '⚙️', stats: '📊', about: 'ℹ️', cta: '📣', portfolio: '📁', career: '💼', contact: '📞', footer: '👣', custom: '🧩' };
                  return (
                    <tr key={s.id}>
                      <td>
                        <div style={{ display: 'flex', gap: '5px' }}>
                          <button className="action-btn move-btn" onClick={() => moveSection(index, -1)} disabled={index === 0}>↑</button>
                          <button className="action-btn move-btn" onClick={() => moveSection(index, 1)} disabled={index === sections.length - 1}>↓</button>
                        </div>
                      </td>
                      <td style={{ fontSize: '1.5rem', textAlign: 'center' }}>
                        <div style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {icons[s.section_type] || '📄'}
                        </div>
                      </td>
                      <td style={{ fontWeight: 700, fontSize: '1rem' }}>{s.section_name}</td>
                      <td><span className="type-badge" style={{ padding: '6px 12px', background: '#e10600', color: '#fff', fontSize: '0.7rem' }}>{s.section_type}</span></td>
                      <td style={{ textAlign: 'right' }}>
                        <button className="action-btn edit-btn" style={{ color: '#3b82f6', fontWeight: 800 }} onClick={() => { setEditingId(s.id); setFormData(s); setIsEditing(true); setShowModal(true); }}>Edit</button>
                        <button className="action-btn delete-btn" style={{ color: '#ef4444', fontWeight: 800 }} onClick={async () => { if(window.confirm('Delete?')) { await supabase.from('site_sections').delete().eq('id', s.id); loadSections(selectedPage.slug); } }}>Delete</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            renderVisualPreview()
          )}
        </>
      )}
    </div>
  );

  return (
    <div className={embeddedSlug ? "embedded-cms" : "cms-wrapper"}>
      <style dangerouslySetInnerHTML={{ __html: CMS_STYLE }} />
      {!embeddedSlug && <Sidebar />}
      <div className={embeddedSlug ? "" : "cms-content"}>
        {!embeddedSlug && <h1 className="cms-title">Website CMS</h1>}
        {renderContent()}
      </div>
      {showModal && renderModal()}
    </div>
  );
};

export default WebsiteCMS;
