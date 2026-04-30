import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

// -- PRO SVG ICONS --
const GridIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1.5"></rect>
    <rect x="14" y="3" width="7" height="7" rx="1.5"></rect>
    <rect x="14" y="14" width="7" height="7" rx="1.5"></rect>
    <rect x="3" y="14" width="7" height="7" rx="1.5"></rect>
  </svg>
);

const GalleryIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
    <circle cx="8.5" cy="8.5" r="1.5"></circle>
    <polyline points="21 15 16 10 5 21"></polyline>
  </svg>
);

const BriefcaseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
  </svg>
);

const UserIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const LogoutIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
    <polyline points="16 17 21 12 16 7"></polyline>
    <line x1="21" y1="12" x2="9" y2="12"></line>
  </svg>
);

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const BellIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
  </svg>
);

const EditIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
  </svg>
);

const TrashIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
  </svg>
);

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('portfolio'); // Set to portfolio default to show it off
  const navigate = useNavigate();

  // --- REAL CRUD STATE FOR PORTFOLIO ---
  const [projects, setProjects] = useState([]);
  const [careers, setCareers] = useState([]);

  useEffect(() => {
    fetchProjects();
    fetchCareers();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('id', { ascending: false });
      
      if (error) throw error;
      setProjects(data || []);
    } catch (err) { console.error("Failed to fetch projects", err); }
  };

  const fetchCareers = async () => {
    try {
      const { data, error } = await supabase
        .from('job_openings')
        .select('*')
        .order('id', { ascending: false });
      
      if (error) throw error;
      setCareers(data || []);
    } catch (err) { console.error("Failed to fetch careers", err); }
  };

  const [showModal, setShowModal] = useState(false);
  const [showCareerModal, setShowCareerModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentProject, setCurrentProject] = useState({ id: null, name: '', category: '', img: '', link: '' });
  const [currentCareer, setCurrentCareer] = useState({ id: null, title: '', department: '', description: '', location: '', apply_link: '', status: 'active' });
  const [imageSource, setImageSource] = useState('url');

  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCurrentProject({ ...currentProject, imgFile: file, img: URL.createObjectURL(file) });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuth');
    navigate('/adminpage');
  };

  const openAddModal = () => {
    setEditMode(false);
    setCurrentProject({ id: null, name: '', category: 'Branding', img: '', link: '' });
    setImageSource('url');
    setShowModal(true);
  };

  const openEditModal = (project) => {
    setEditMode(true);
    setCurrentProject(project);
    setImageSource(project.img && project.img.startsWith('data:image') ? 'upload' : 'url');
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if(window.confirm('Are you sure you want to delete this project?')) {
      try {
        const { error } = await supabase
          .from('projects')
          .delete()
          .eq('id', id);
        
        if (error) throw error;
        fetchProjects();
      } catch (err) { console.error(err); }
    }
  };

  const handleCareerDelete = async (id) => {
    if(window.confirm('Are you sure you want to delete this career?')) {
      try {
        const { error } = await supabase
          .from('job_openings')
          .delete()
          .eq('id', id);
        
        if (error) throw error;
        fetchCareers();
      } catch (err) { console.error(err); }
    }
  };

  const openAddCareerModal = () => {
    setEditMode(false);
    setCurrentCareer({ id: null, title: '', department: '', description: '', location: '', apply_link: '', status: 'active' });
    setShowCareerModal(true);
  };

  const openEditCareerModal = (career) => {
    setEditMode(true);
    setCurrentCareer(career);
    setShowCareerModal(true);
  };

  const saveProject = async (e) => {
    e.preventDefault();
    let imageUrl = currentProject.img || currentProject.image;

    try {
      // 1. Handle Image Upload if needed
      if (imageSource === 'upload' && currentProject.imgFile) {
        const file = currentProject.imgFile;
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `portfolio/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('media')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('media')
          .getPublicUrl(filePath);
        
        imageUrl = publicUrl;
      }

      // 2. Prepare Data
      const projectData = {
        title: currentProject.name || currentProject.title,
        category: currentProject.category,
        image_url: imageUrl,
        website_link: currentProject.link || currentProject.website_link || ''
      };

      // 3. Insert or Update
      if (editMode) {
        const { error } = await supabase
          .from('projects')
          .update(projectData)
          .eq('id', currentProject.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('projects')
          .insert([projectData]);
        if (error) throw error;
      }

      fetchProjects();
      setShowModal(false);
    } catch (err) { 
      console.error(err);
      alert("Error saving project: " + err.message);
    }
  };

  const saveCareer = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        const { error } = await supabase
          .from('job_openings')
          .update(currentCareer)
          .eq('id', currentCareer.id);
        if (error) throw error;
      } else {
        // Remove ID if present for new record
        const { id, ...newCareer } = currentCareer;
        const { error } = await supabase
          .from('job_openings')
          .insert([newCareer]);
        if (error) throw error;
      }
      fetchCareers();
      setShowCareerModal(false);
    } catch (err) { 
      console.error(err);
      alert("Error saving career: " + err.message);
    }
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <GridIcon /> },
    { id: 'portfolio', label: 'Portfolio CMS', icon: <GalleryIcon /> },
    { id: 'career', label: 'Career CMS', icon: <BriefcaseIcon /> },
    { id: 'profile', label: 'Admin Profile', icon: <UserIcon /> }
  ];

  return (
    <>
      <style>{`
        /* Pro Custom Scrollbar */
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-track { background: #f1f5f9; }
        ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
        
        .admin-layout {
          display: flex;
          min-height: 100vh;
          background-color: #f4f7fe;
          font-family: 'Inter', system-ui, sans-serif;
        }

        /* SIDEBAR */
        .admin-sidebar {
          width: 280px;
          background-color: #ffffff;
          border-right: 1px solid rgba(0, 0, 0, 0.04);
          display: flex;
          flex-direction: column;
          padding: 32px 0;
          box-shadow: 4px 0 24px rgba(0,0,0,0.02);
          z-index: 10;
        }

        .admin-logo-area {
          padding: 0 32px;
          margin-bottom: 48px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .admin-logo-img { height: 42px; }

        .admin-portal-badge {
          background: rgba(225, 6, 0, 0.08);
          color: #e10600;
          font-size: 0.7rem;
          font-weight: 800;
          letter-spacing: 1.5px;
          padding: 4px 10px;
          border-radius: 50px;
          margin-top: 12px;
        }

        .admin-nav {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 6px;
          padding: 0 20px;
        }

        .admin-nav-btn {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 14px 20px;
          width: 100%;
          border: none;
          border-radius: 12px;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
          text-align: left;
        }

        .admin-nav-btn.active {
          background: linear-gradient(135deg, #e10600 0%, #a30400 100%);
          color: #ffffff;
          font-weight: 700;
          box-shadow: 0 8px 20px rgba(225, 6, 0, 0.25);
        }

        .admin-nav-btn.inactive {
          background: transparent;
          color: #64748b;
          font-weight: 600;
        }

        .admin-nav-btn.inactive:hover {
          background: #f8fafc;
          color: #0f172a;
          transform: translateX(4px);
        }

        /* MAIN CONTENT */
        .admin-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        /* TOP HEADER */
        .admin-header {
          height: 80px;
          background: rgba(255, 255, 255, 0.6);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(0, 0, 0, 0.03);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 40px;
          z-index: 5;
        }

        .admin-search {
          display: flex;
          align-items: center;
          background: #ffffff;
          padding: 10px 16px;
          border-radius: 50px;
          width: 300px;
          border: 1px solid rgba(0,0,0,0.05);
          box-shadow: 0 2px 8px rgba(0,0,0,0.02);
        }

        .admin-search input {
          border: none; outline: none; background: transparent;
          margin-left: 10px; width: 100%; font-size: 0.9rem; color: #334155;
        }

        .admin-header-actions { display: flex; align-items: center; gap: 24px; }

        .admin-bell {
          color: #64748b; cursor: pointer; transition: color 0.2s; position: relative;
        }
        .admin-bell:hover { color: #0f172a; }
        .admin-bell::after {
          content: ''; position: absolute; top: -2px; right: -2px; width: 8px; height: 8px;
          background: #e10600; border-radius: 50%; border: 2px solid #fff;
        }

        .admin-profile-pic {
          width: 40px; height: 40px; border-radius: 50%;
          background: linear-gradient(135deg, #151b2d 0%, #2e3b5e 100%);
          color: #fff; display: flex; align-items: center; justify-content: center;
          font-weight: 700; font-size: 0.9rem; box-shadow: 0 4px 12px rgba(21, 27, 45, 0.2);
          cursor: pointer;
        }

        /* CONTENT AREA */
        .admin-content { padding: 40px; overflow-y: auto; flex: 1; }

        .admin-page-header {
          display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 40px;
        }

        .admin-page-title {
          font-size: 2.2rem; color: #0f172a; font-weight: 800; letter-spacing: -0.5px; margin: 0 0 8px 0;
        }

        .admin-page-subtitle { color: #64748b; font-size: 1rem; margin: 0; }

        .admin-primary-btn {
          background: linear-gradient(135deg, #e10600 0%, #a30400 100%);
          color: #fff; border: none; padding: 14px 28px; border-radius: 12px;
          font-size: 0.95rem; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 8px;
          box-shadow: 0 8px 20px rgba(225, 6, 0, 0.25); transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .admin-primary-btn:hover { transform: translateY(-3px); box-shadow: 0 12px 28px rgba(225, 6, 0, 0.35); }

        /* CARDS */
        .admin-card {
          background: #ffffff; border-radius: 20px; padding: 32px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.03); border: 1px solid rgba(0, 0, 0, 0.02);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .admin-card:hover { transform: translateY(-4px); box-shadow: 0 15px 50px rgba(0, 0, 0, 0.05); }

        .stat-card-title {
          color: #64748b; font-weight: 600; font-size: 0.9rem; text-transform: uppercase;
          letter-spacing: 1px; margin-bottom: 16px;
        }
        .stat-card-value { font-size: 3rem; font-weight: 800; color: #0f172a; line-height: 1; }
        .stat-card-red .stat-card-value { color: #e10600; }

        /* TABLE UI */
        .pro-table-container {
          background: #ffffff;
          border-radius: 20px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.03);
          border: 1px solid rgba(0, 0, 0, 0.02);
          overflow: hidden;
        }
        .pro-table {
          width: 100%;
          border-collapse: collapse;
        }
        .pro-table th {
          background: #f8fafc;
          padding: 20px 24px;
          text-align: left;
          font-weight: 700;
          color: #475569;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          border-bottom: 1px solid #e2e8f0;
        }
        .pro-table td {
          padding: 20px 24px;
          border-bottom: 1px solid #f1f5f9;
          vertical-align: middle;
          color: #334155;
          font-weight: 500;
        }
        .pro-table tr:last-child td { border-bottom: none; }
        .pro-table tr:hover { background: #f8fafc; }

        .row-img {
          width: 60px; height: 40px; border-radius: 6px; object-fit: cover;
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        
        .badge {
          background: #e2e8f0; color: #475569; padding: 6px 12px; border-radius: 50px;
          font-size: 0.8rem; font-weight: 700; display: inline-block;
        }
        .badge.creative { background: #e0e7ff; color: #4f46e5; }
        .badge.web { background: #dcfce7; color: #16a34a; }
        .badge.branding { background: #fef08a; color: #a16207; }
        .badge.ecommerce { background: #ffedd5; color: #c2410c; }

        .action-btn {
          background: transparent; border: none; cursor: pointer; color: #94a3b8;
          padding: 8px; border-radius: 8px; transition: all 0.2s; display: inline-flex;
        }
        .action-btn.edit:hover { background: #e0e7ff; color: #4f46e5; }
        .action-btn.delete:hover { background: #fee2e2; color: #ef4444; }

        /* MODAL */
        .modal-overlay {
          position: fixed; inset: 0; background: rgba(15, 23, 42, 0.4);
          backdrop-filter: blur(4px); z-index: 100;
          display: flex; align-items: center; justify-content: center;
          animation: fadeIn 0.2s ease;
        }
        .modal-box {
          background: #ffffff; width: 100%; max-width: 500px; border-radius: 24px;
          padding: 40px; box-shadow: 0 24px 48px rgba(0,0,0,0.1);
          animation: slideUp 0.3s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .modal-title { font-size: 1.5rem; font-weight: 800; color: #0f172a; margin-bottom: 24px; }
        .form-group { margin-bottom: 20px; }
        .form-label { display: block; font-weight: 600; color: #475569; margin-bottom: 8px; font-size: 0.9rem; }
        .form-input {
          width: 100%; padding: 12px 16px; border-radius: 12px; border: 1px solid #cbd5e1;
          font-size: 0.95rem; outline: none; transition: all 0.2s; font-family: 'Inter', sans-serif;
        }
        .form-input:focus { border-color: #e10600; box-shadow: 0 0 0 4px rgba(225, 6, 0, 0.1); }
        
        .modal-actions { display: flex; justify-content: flex-end; gap: 12px; margin-top: 32px; }
        .btn-cancel {
          background: #f1f5f9; color: #475569; border: none; padding: 12px 24px;
          border-radius: 12px; font-weight: 600; cursor: pointer; transition: all 0.2s;
        }
        .btn-cancel:hover { background: #e2e8f0; }

        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      <div className="admin-layout">
        <aside className="admin-sidebar">
          <div className="admin-logo-area">
            <img src="/logo.png" alt="Repute" className="admin-logo-img" />
            <div className="admin-portal-badge">ADMIN PORTAL</div>
          </div>
          <nav className="admin-nav">
            {navItems.map(item => (
              <button key={item.id} onClick={() => setActiveTab(item.id)} className={`admin-nav-btn ${activeTab === item.id ? 'active' : 'inactive'}`}>
                {item.icon} {item.label}
              </button>
            ))}
          </nav>
          <div style={{ padding: '0 20px', marginTop: 'auto' }}>
            <button onClick={handleLogout} className="admin-nav-btn inactive" style={{ color: '#ef4444' }}
              onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#fef2f2'; e.currentTarget.style.color = '#dc2626'; }}
              onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#ef4444'; }}>
              <LogoutIcon /> Secure Logout
            </button>
          </div>
        </aside>

        <main className="admin-main">
          <header className="admin-header">
            <div className="admin-search"><span style={{ color: '#94a3b8' }}><SearchIcon /></span><input type="text" placeholder="Quick search..." /></div>
            <div className="admin-header-actions"><div className="admin-bell"><BellIcon /></div><div className="admin-profile-pic">AD</div></div>
          </header>

          <div className="admin-content">
            <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
              
              {activeTab === 'dashboard' && (
                <div style={{ animation: 'fadeUp 0.6s cubic-bezier(0.23, 1, 0.32, 1)' }}>
                  <div className="admin-page-header">
                    <div><h1 className="admin-page-title">Overview</h1><p className="admin-page-subtitle">Welcome back! Here's what's happening today.</p></div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }}>
                    <div className="admin-card stat-card-red"><div className="stat-card-title">Live Portfolio Projects</div><div className="stat-card-value">{projects.length}</div></div>
                    <div className="admin-card"><div className="stat-card-title">Open Career Positions</div><div className="stat-card-value">12</div></div>
                    <div className="admin-card"><div className="stat-card-title">System Status</div><div className="stat-card-value" style={{ color: '#10b981', fontSize: '2rem', display: 'flex', alignItems: 'center', gap: '12px', height: '3rem' }}>
                        <span style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#10b981', display: 'inline-block', boxShadow: '0 0 12px rgba(16, 185, 129, 0.6)' }}></span>Online
                      </div></div>
                  </div>
                </div>
              )}

              {activeTab === 'portfolio' && (
                <div style={{ animation: 'fadeUp 0.6s cubic-bezier(0.23, 1, 0.32, 1)' }}>
                  <div className="admin-page-header">
                    <div><h1 className="admin-page-title">Portfolio CMS</h1><p className="admin-page-subtitle">Manage your live agency projects and categories.</p></div>
                    <button className="admin-primary-btn" onClick={openAddModal}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                      New Project
                    </button>
                  </div>
                  
                  <div className="pro-table-container">
                    <table className="pro-table">
                      <thead>
                        <tr>
                          <th>Image</th>
                          <th>Project Name</th>
                          <th>Category</th>
                          <th>Website Link</th>
                          <th style={{ textAlign: 'right' }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {projects.map(p => (
                          <tr key={p.id}>
                            <td>
                              <img src={p.image || p.img} alt={p.title || p.name} className="row-img" onError={(e) => { e.target.src = 'https://via.placeholder.com/60x40?text=IMG' }} />
                            </td>
                            <td style={{ fontWeight: '700' }}>{p.title || p.name}</td>
                            <td>
                              <span className={`badge ${p.category.includes('Web') ? 'web' : p.category.includes('Ecommerce') ? 'ecommerce' : p.category.includes('Creative') ? 'creative' : 'branding'}`}>
                                {p.category}
                              </span>
                            </td>
                            <td><a href={p.website_link || p.link} target="_blank" rel="noreferrer" style={{ color: '#3b82f6', textDecoration: 'none' }}>{(p.website_link || p.link) && (p.website_link !== '#' || p.link !== '#') ? 'Visit Link ↗' : 'N/A'}</a></td>
                            <td style={{ textAlign: 'right' }}>
                              <button className="action-btn edit" onClick={() => openEditModal(p)} title="Edit"><EditIcon /></button>
                              <button className="action-btn delete" onClick={() => handleDelete(p.id)} title="Delete"><TrashIcon /></button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'career' && (
                <div style={{ animation: 'fadeUp 0.6s cubic-bezier(0.23, 1, 0.32, 1)' }}>
                  <div className="admin-page-header">
                    <div><h1 className="admin-page-title">Career CMS</h1><p className="admin-page-subtitle">Post new job openings and manage candidate visibility.</p></div>
                    <button className="admin-primary-btn" onClick={openAddCareerModal}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                      Post Job
                    </button>
                  </div>
                  
                  <div className="pro-table-container">
                    <table className="pro-table">
                      <thead>
                        <tr>
                          <th>Job Title</th>
                          <th>Department</th>
                          <th>Location</th>
                          <th>Status</th>
                          <th style={{ textAlign: 'right' }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {careers.map(c => (
                          <tr key={c.id}>
                            <td style={{ fontWeight: '700' }}>{c.title}</td>
                            <td>{c.department}</td>
                            <td>{c.location}</td>
                            <td>
                              <span className={`badge ${c.status === 'active' ? 'web' : 'creative'}`}>
                                {c.status}
                              </span>
                            </td>
                            <td style={{ textAlign: 'right' }}>
                              <button className="action-btn edit" onClick={() => openEditCareerModal(c)} title="Edit"><EditIcon /></button>
                              <button className="action-btn delete" onClick={() => handleCareerDelete(c.id)} title="Delete"><TrashIcon /></button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {careers.length === 0 && (
                    <div className="admin-empty-state" style={{ textAlign: 'center', padding: '40px' }}><div className="admin-empty-icon"><BriefcaseIcon /></div><h3>No Jobs Found</h3><p>Click "Post Job" to add career opportunities.</p></div>
                  )}
                </div>
              )}               {activeTab === 'profile' && (
                <div style={{ animation: 'fadeUp 0.6s cubic-bezier(0.23, 1, 0.32, 1)' }}>
                  <div className="admin-page-header"><div><h1 className="admin-page-title">Admin Profile</h1><p className="admin-page-subtitle">Manage your account and project overview.</p></div></div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '32px' }}>
                    <div className="admin-card">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '32px' }}>
                        <div className="admin-profile-pic" style={{ width: '80px', height: '80px', fontSize: '1.8rem' }}>AD</div>
                        <div><h2 style={{ fontSize: '1.5rem', fontWeight: '800', margin: 0, color: '#0f172a' }}>Super Admin</h2><p style={{ color: '#64748b', margin: '4px 0 0 0' }}>Master Account</p></div>
                      </div>
                      <hr style={{ border: 'none', borderTop: '1px solid #f1f5f9', margin: '0 0 32px 0' }} />
                      <div className="form-group">
                        <label className="form-label">Email Address</label>
                        <input type="text" className="form-input" disabled value="admin@repute.com" />
                      </div>
                      <button className="admin-nav-btn inactive" style={{ border: '1px solid #e2e8f0', justifyContent: 'center', marginTop: '20px' }}>Change Password</button>
                    </div>

                    <div className="admin-card">
                      <h3 style={{ marginTop: 0, marginBottom: '20px' }}>Portfolio Activity</h3>
                      <div className="pro-table-container" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                        <table className="pro-table">
                          <thead>
                            <tr>
                              <th>Project</th>
                              <th>Category</th>
                              <th>Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {projects.map(p => (
                              <tr key={p.id}>
                                <td style={{ fontWeight: '700' }}>{p.title || p.name}</td>
                                <td>
                                  <span className={`badge ${p.category.includes('Web') ? 'web' : p.category.includes('Ecommerce') ? 'ecommerce' : p.category.includes('Creative') ? 'creative' : 'branding'}`}>
                                    {p.category}
                                  </span>
                                </td>
                                <td><span className="badge" style={{ background: '#dcfce7', color: '#16a34a' }}>Live</span></td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </main>
      </div>

      {/* MODAL FOR ADD/EDIT PORTFOLIO */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h2 className="modal-title">{editMode ? 'Edit Project' : 'Add New Project'}</h2>
            <form onSubmit={saveProject}>
              <div className="form-group">
                <label className="form-label">Project Name</label>
                <input type="text" className="form-input" required value={currentProject.name || currentProject.title || ''} onChange={(e) => setCurrentProject({...currentProject, name: e.target.value, title: e.target.value})} placeholder="e.g. Sree Thangam Jewellery" />
              </div>
              <div className="form-group">
                <label className="form-label">Category</label>
                <select className="form-input" required value={currentProject.category} onChange={(e) => setCurrentProject({...currentProject, category: e.target.value})}>
                  <option value="Branding">Branding</option>
                  <option value="Creative">Creative</option>
                  <option value="Web Design & Development">Web Design & Development</option>
                  <option value="Ecommerce Development">Ecommerce Development</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label" style={{ marginBottom: '12px' }}>Image Source</label>
                <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: '#475569', fontSize: '0.9rem', fontWeight: '500' }}>
                    <input type="radio" name="imageSource" checked={imageSource === 'url'} onChange={() => setImageSource('url')} /> URL
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: '#475569', fontSize: '0.9rem', fontWeight: '500' }}>
                    <input type="radio" name="imageSource" checked={imageSource === 'upload'} onChange={() => setImageSource('upload')} /> Upload from Local
                  </label>
                </div>

                {imageSource === 'url' ? (
                  <input type="text" className="form-input" required={!currentProject.img && !currentProject.image} value={currentProject.img || currentProject.image || ''} onChange={(e) => setCurrentProject({...currentProject, img: e.target.value, image: e.target.value})} placeholder="https://..." />
                ) : (
                  <>
                    <input type="file" className="form-input" accept="image/*" ref={fileInputRef} required={!currentProject.img && !currentProject.image} onChange={handleImageUpload} style={{ padding: '9px 16px' }} />
                    {(currentProject.img || currentProject.image) && (
                      <div style={{ marginTop: '12px' }}>
                        <img src={currentProject.img || currentProject.image} alt="Preview" style={{ height: '60px', borderRadius: '6px', objectFit: 'cover' }} />
                      </div>
                    )}
                  </>
                )}
              </div>
              <div className="form-group">
                <label className="form-label">Website Link</label>
                <input type="text" className="form-input" value={currentProject.link || currentProject.website_link || ''} onChange={(e) => setCurrentProject({...currentProject, link: e.target.value, website_link: e.target.value})} placeholder="https://..." />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="admin-primary-btn">{editMode ? 'Save Changes' : 'Create Project'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL FOR ADD/EDIT CAREER */}
      {showCareerModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h2 className="modal-title">{editMode ? 'Edit Career' : 'Post New Job'}</h2>
            <form onSubmit={saveCareer}>
              <div className="form-group">
                <label className="form-label">Job Title</label>
                <input type="text" className="form-input" required value={currentCareer.title} onChange={(e) => setCurrentCareer({...currentCareer, title: e.target.value})} placeholder="e.g. Senior Graphic Designer" />
              </div>
              <div className="form-group">
                <label className="form-label">Department</label>
                <input type="text" className="form-input" required value={currentCareer.department} onChange={(e) => setCurrentCareer({...currentCareer, department: e.target.value})} placeholder="e.g. Design" />
              </div>
              <div className="form-group">
                <label className="form-label">Location</label>
                <input type="text" className="form-input" required value={currentCareer.location} onChange={(e) => setCurrentCareer({...currentCareer, location: e.target.value})} placeholder="e.g. Coimbatore, Tamil Nadu" />
              </div>
              <div className="form-group">
                <label className="form-label">Description (Brief)</label>
                <textarea className="form-input" rows="3" required value={currentCareer.description} onChange={(e) => setCurrentCareer({...currentCareer, description: e.target.value})} placeholder="Short description of the role..."></textarea>
              </div>
              <div className="form-group">
                <label className="form-label">Apply Link</label>
                <input type="text" className="form-input" value={currentCareer.apply_link} onChange={(e) => setCurrentCareer({...currentCareer, apply_link: e.target.value})} placeholder="e.g. /career/apply" />
              </div>
              <div className="form-group">
                <label className="form-label">Status</label>
                <select className="form-input" required value={currentCareer.status} onChange={(e) => setCurrentCareer({...currentCareer, status: e.target.value})}>
                  <option value="active">Active (Visible)</option>
                  <option value="inactive">Inactive (Hidden)</option>
                </select>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={() => setShowCareerModal(false)}>Cancel</button>
                <button type="submit" className="admin-primary-btn">{editMode ? 'Save Changes' : 'Post Job'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminDashboard;
