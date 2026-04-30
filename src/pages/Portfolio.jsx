import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { supabase } from '../supabaseClient';

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ category: 'Branding', title: '', website_link: '', image_url: '' });
  const [imageFile, setImageFile] = useState(null);
  const [imageSource, setImageSource] = useState('upload'); // 'upload' or 'url'
  const [status, setStatus] = useState({ type: '', message: '' }); // '', 'loading', 'success', 'error'
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [activeTab, setActiveTab] = useState('active'); // 'active' or 'trash'

  useEffect(() => {
    fetchProjects();
  }, [activeTab]);

  const fetchProjects = async () => {
    try {
      const isDeletedFilter = activeTab === 'trash';
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('is_deleted', isDeletedFilter)
        .order('category', { ascending: true })
        .order('title', { ascending: true });
      
      if (error) throw error;
      setProjects(data || []);
    } catch (err) {
      console.error('Error fetching projects:', err);
    }
  };

  const seedDefaultData = async () => {
    if (!window.confirm('This will add the default projects to the database. Continue?')) return;
    
    setIsSubmitting(true);
    setStatus({ type: 'loading', message: 'Seeding default projects...' });

    const defaultProjects = [
      // Branding
      { title: 'SPANKI', category: 'Branding', image_url: 'https://irepute.in/file/wp-content/uploads/2023/12/SPANKI-scaled.jpg', website_link: '#' },
      { title: 'RAFT', category: 'Branding', image_url: 'https://irepute.in/file/wp-content/uploads/2023/12/RAFT-Garments-scaled.jpg', website_link: '#' },
      { title: 'Twinbirds', category: 'Branding', image_url: 'https://irepute.in/file/wp-content/uploads/2023/12/Twinbirds.jpg', website_link: '#' },
      { title: 'AGARAM', category: 'Branding', image_url: 'https://irepute.in/file/wp-content/uploads/2023/12/Agaram-Foundation.jpg', website_link: '#' },
      { title: 'VARAGI', category: 'Branding', image_url: 'https://irepute.in/file/wp-content/uploads/2023/12/Varagi-Logo.jpg', website_link: '#' },
      // Creative
      { title: 'KCE', category: 'Creative', image_url: 'https://irepute.in/file/wp-content/uploads/2023/12/KCE.jpg', website_link: '#' },
      { title: 'Karpagam Institutions', category: 'Creative', image_url: 'https://irepute.in/file/wp-content/uploads/2023/12/Karpagam-Faculty.jpg', website_link: '#' },
      { title: 'KIT', category: 'Creative', image_url: 'https://irepute.in/file/wp-content/uploads/2023/12/KIT.jpg', website_link: '#' },
      { title: 'ANUSAM', category: 'Creative', image_url: 'https://irepute.in/file/wp-content/uploads/2023/12/Anusam-App.jpg', website_link: '#' },
      // Web
      { title: 'KAHE', category: 'Web Design & Development', image_url: 'https://irepute.in/file/wp-content/uploads/2023/12/Kahe.jpg', website_link: 'https://kahedu.edu.in/' },
      { title: 'SKIMT', category: 'Web Design & Development', image_url: 'https://irepute.in/file/wp-content/uploads/2023/12/SKIMT-scaled.jpg', website_link: 'https://skimtonline.org/' },
      // Ecommerce
      { title: 'Sree Thangam Jewellery', category: 'Ecommerce Development', image_url: 'https://irepute.in/file/wp-content/uploads/2023/12/THANGAM-scaled.jpg', website_link: 'https://sreethangamjewellery.com/' },
      { title: 'PRADE', category: 'Ecommerce Development', image_url: 'https://irepute.in/file/wp-content/uploads/2023/12/rhythmfashion-1920x1080.jpg', website_link: 'https://prade.in/' }
    ];

    try {
      console.log('Inserting default projects into Supabase...', defaultProjects);
      const { error } = await supabase
        .from('projects')
        .insert(defaultProjects);

      if (error) {
        console.error('Supabase Insert Error:', error);
        throw error;
      }
      
      console.log('Seeding successful!');
      setStatus({ type: 'success', message: '✓ Default Projects Seeded Successfully!' });
      fetchProjects();
      setTimeout(() => {
        setStatus({ type: '', message: '' });
        setIsSubmitting(false);
      }, 3000);
    } catch (err) {
      console.error('Error seeding data:', err);
      setStatus({ type: 'error', message: 'Failed to seed data: ' + (err.message || 'Check console') });
      setIsSubmitting(false);
    }
  };

  const handleSaveProject = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: 'loading', message: isEditing ? 'Updating project...' : 'Saving project...' });

    try {
      let finalImageUrl = formData.image_url;

      // 1. Handle Image Upload to Supabase Storage if a new file is selected
      if (imageSource === 'upload' && imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `portfolio/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('images')
          .upload(filePath, imageFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('images')
          .getPublicUrl(filePath);
        
        finalImageUrl = publicUrl;
      }

      // 2. Insert or Update record in Database
      if (isEditing) {
        const { error: updateError } = await supabase
          .from('projects')
          .update({
            category: formData.category,
            title: formData.title,
            website_link: formData.website_link,
            image_url: finalImageUrl
          })
          .eq('id', editingId);

        if (updateError) throw updateError;
        setStatus({ type: 'success', message: '✓ Project Updated Successfully!' });
      } else {
        const { error: insertError } = await supabase
          .from('projects')
          .insert([{
            category: formData.category,
            title: formData.title,
            website_link: formData.website_link,
            image_url: finalImageUrl
          }]);

        if (insertError) throw insertError;
        setStatus({ type: 'success', message: '✓ Project Added Successfully!' });
      }

      fetchProjects();
      
      setTimeout(() => {
        closeModal();
        setIsSubmitting(false);
      }, 2000);

    } catch (err) {
      console.error('Error saving project:', err);
      setStatus({ type: 'error', message: err.message || 'Failed to save project. Try again.' });
      setIsSubmitting(false);
    }
  };

  const openEditModal = (project) => {
    setIsEditing(true);
    setEditingId(project.id);
    setFormData({
      category: project.category,
      title: project.title,
      website_link: project.website_link || project.link || '',
      image_url: project.image_url || project.image
    });
    setImageSource('url'); // Default to URL for existing items
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setIsEditing(false);
    setEditingId(null);
    setFormData({ category: 'Branding', title: '', website_link: '', image_url: '' });
    setImageFile(null);
    setImageSource('upload');
    setStatus({ type: '', message: '' });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Move this project to Trash?')) {
      try {
        const { error } = await supabase
          .from('projects')
          .update({ is_deleted: true })
          .eq('id', id);

        if (error) throw error;
        fetchProjects();
      } catch (err) {
        console.error('Error moving to trash:', err);
        alert('Failed to move to trash. Make sure you added the "is_deleted" column to your database.');
      }
    }
  };

  const handleRestore = async (id) => {
    try {
      const { error } = await supabase
        .from('projects')
        .update({ is_deleted: false })
        .eq('id', id);

      if (error) throw error;
      fetchProjects();
    } catch (err) {
      console.error('Error restoring project:', err);
      alert('Failed to restore project.');
    }
  };

  const handlePermanentDelete = async (id) => {
    if (window.confirm('PERMANENTLY DELETE this project? This cannot be undone.')) {
      try {
        const { error } = await supabase
          .from('projects')
          .delete()
          .eq('id', id);

        if (error) throw error;
        fetchProjects();
      } catch (err) {
        console.error('Error deleting project:', err);
        alert('Failed to permanently delete.');
      }
    }
  };

  return (
    <>
      <style>{`
        .admin-main-content { 
          margin-left: 260px; 
          min-height: 100vh; 
          background-color: #0f172a; 
          padding: 40px; 
          font-family: 'Inter', sans-serif; 
          color: #f8fafc; 
          animation: pageEntrance 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards;
        }

        @keyframes pageEntrance {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
        .page-title { font-size: 1.8rem; font-weight: 800; color: #f8fafc; margin: 0; }
        .add-btn { background: linear-gradient(135deg, #e10600 0%, #a30400 100%); color: white; border: none; padding: 12px 24px; border-radius: 12px; font-weight: 700; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(225, 6, 0, 0.2); }
        .add-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(225, 6, 0, 0.3); }
        
        .table-container { background: rgba(30, 41, 59, 0.7); backdrop-filter: blur(10px); border-radius: 20px; border: 1px solid rgba(255,255,255,0.1); overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.2); }
        .admin-table { width: 100%; border-collapse: collapse; text-align: left; }
        .admin-table th { background: rgba(255,255,255,0.03); padding: 15px 20px; font-weight: 700; color: #94a3b8; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid rgba(255,255,255,0.1); }
        .admin-table td { padding: 15px 20px; border-bottom: 1px solid rgba(255,255,255,0.05); color: #f8fafc; font-size: 0.95rem; }
        .project-img { width: 60px; height: 40px; object-fit: cover; border-radius: 6px; border: 1px solid rgba(255,255,255,0.1); }
        
        .delete-btn { color: #ef4444; background: none; border: none; cursor: pointer; font-weight: 600; padding: 5px 10px; border-radius: 6px; transition: background 0.2s; }
        .delete-btn:hover { background: rgba(239, 68, 68, 0.1); }
        .edit-btn { color: #3b82f6; background: none; border: none; cursor: pointer; font-weight: 600; padding: 5px 10px; border-radius: 6px; transition: background 0.2s; margin-right: 10px; }
        .edit-btn:hover { background: rgba(59, 130, 246, 0.1); }

        /* Modal Styles */
        .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.7); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; z-index: 100; }
        .modal-content { 
          background: #1e293b; 
          padding: 30px; 
          border-radius: 24px; 
          width: 100%; 
          max-width: 450px; 
          max-height: 85vh;
          overflow-y: auto;
          box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5); 
          position: relative;
          color: #f8fafc;
          border: 1px solid rgba(255,255,255,0.1);
        }
        .modal-content::-webkit-scrollbar { width: 6px; }
        .modal-content::-webkit-scrollbar-thumb { background: #475569; border-radius: 10px; }
        .modal-title { margin-top: 0; margin-bottom: 25px; font-weight: 800; font-size: 1.5rem; color: #f8fafc; }
        .form-group { margin-bottom: 20px; }
        .form-label { display: block; margin-bottom: 8px; font-weight: 600; color: #94a3b8; }
        .form-input { 
          width: 100%; 
          padding: 12px 16px; 
          border-radius: 10px; 
          border: 1px solid #334155; 
          background: #0f172a;
          color: white;
          font-family: inherit; 
          font-size: 1rem; 
          box-sizing: border-box; 
        }
        .form-input:focus { outline: none; border-color: #3b82f6; }
        .form-actions { display: flex; gap: 15px; margin-top: 30px; }
        .cancel-btn { flex: 1; padding: 12px; background: #334155; color: #cbd5e1; border: none; border-radius: 12px; font-weight: 700; cursor: pointer; }
        .save-btn { flex: 2; padding: 12px; background: #3b82f6; color: white; border: none; border-radius: 12px; font-weight: 700; cursor: pointer; transition: all 0.2s; }
        .save-btn-error { background: #ef4444 !important; box-shadow: 0 4px 15px rgba(239, 68, 68, 0.2); }
        .status-msg { padding: 12px; border-radius: 10px; margin-bottom: 20px; font-weight: 600; text-align: center; font-size: 0.9rem; animation: fadeIn 0.3s ease; }
        .status-success { background: rgba(22, 163, 74, 0.2); color: #4ade80; border: 1px solid rgba(34, 197, 94, 0.2); }
        .status-error { background: rgba(239, 68, 68, 0.2); color: #f87171; border: 1px solid rgba(239, 68, 68, 0.2); }
        .status-loading { background: rgba(30, 41, 59, 0.5); color: #94a3b8; border: 1px solid rgba(255,255,255,0.1); }

        @keyframes fadeIn { from { opacity: 0; transform: translateY(-5px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      <Sidebar />
      <div className="admin-main-content">
        <div className="page-header">
          <h1 className="page-title">Portfolio Management</h1>
          <div style={{ display: 'flex', gap: '15px' }}>
            <button className="add-btn" style={{ background: '#0f172a' }} onClick={seedDefaultData}>Seed Default Data</button>
            <button className="add-btn" onClick={() => { setIsEditing(false); setShowModal(true); }}>+ Add Project</button>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '20px', marginBottom: '25px', borderBottom: '1px solid #e2e8f0' }}>
          <button 
            onClick={() => setActiveTab('active')}
            style={{ padding: '10px 20px', border: 'none', background: 'none', cursor: 'pointer', fontWeight: 700, color: activeTab === 'active' ? '#e10600' : '#64748b', borderBottom: activeTab === 'active' ? '3px solid #e10600' : '3px solid transparent' }}
          >
            Active Projects ({activeTab === 'active' ? projects.length : '...'})
          </button>
          <button 
            onClick={() => setActiveTab('trash')}
            style={{ padding: '10px 20px', border: 'none', background: 'none', cursor: 'pointer', fontWeight: 700, color: activeTab === 'trash' ? '#e10600' : '#64748b', borderBottom: activeTab === 'trash' ? '3px solid #e10600' : '3px solid transparent' }}
          >
            Recently Deleted ({activeTab === 'trash' ? projects.length : '...'})
          </button>
        </div>

        {status.type && !showModal && (
          <div className={`status-msg status-${status.type}`} style={{ marginBottom: '20px' }}>
            {status.message}
          </div>
        )}

        <div className="table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Image</th>
                <th>Category</th>
                <th>Title</th>
                <th>Link</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>
                    <img 
                      src={p.image_url || p.image} 
                      alt={p.title} 
                      className="project-img" 
                      onError={(e) => e.target.src='https://via.placeholder.com/60x40?text=No+Img'} 
                    />
                  </td>
                  <td>{p.category}</td>
                  <td style={{ fontWeight: 600 }}>{p.title}</td>
                  <td>
                    {(p.website_link || p.link) && (p.website_link !== '#' && p.link !== '#') ? (
                      <a href={p.website_link || p.link} target="_blank" rel="noreferrer" style={{ color: '#3b82f6' }}>Visit ↗</a>
                    ) : (
                      <span style={{ color: '#94a3b8' }}>No Link</span>
                    )}
                  </td>
                  <td>
                    {activeTab === 'active' ? (
                      <>
                        <button className="edit-btn" onClick={() => openEditModal(p)}>Edit</button>
                        <button className="delete-btn" onClick={() => handleDelete(p.id)}>Delete</button>
                      </>
                    ) : (
                      <>
                        <button className="edit-btn" style={{ color: '#10b981' }} onClick={() => handleRestore(p.id)}>Retrieve</button>
                        <button className="delete-btn" style={{ fontWeight: 800 }} onClick={() => handlePermanentDelete(p.id)}>Permanently Delete</button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="modal-title">{isEditing ? 'Edit Project' : 'Add New Project'}</h2>
            
            {status.type && (
              <div className={`status-msg status-${status.type}`}>
                {status.message}
              </div>
            )}

            <form onSubmit={handleSaveProject}>
              <div className="form-group">
                <label className="form-label">Category</label>
                <select className="form-input" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
                  <option value="Branding">Branding</option>
                  <option value="Creative">Creative</option>
                  <option value="Web Design & Development">Web Design & Development</option>
                  <option value="Ecommerce Development">Ecommerce Development</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Project Title</label>
                <input type="text" className="form-input" placeholder="Enter title" required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Website Link</label>
                <input type="url" className="form-input" placeholder="https://example.com" required value={formData.website_link} onChange={(e) => setFormData({...formData, website_link: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Image Source</label>
                <div style={{ display: 'flex', gap: '20px', marginBottom: '10px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.9rem', color: '#475569' }}>
                    <input type="radio" name="imageSource" checked={imageSource === 'upload'} onChange={() => setImageSource('upload')} /> Upload File
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.9rem', color: '#475569' }}>
                    <input type="radio" name="imageSource" checked={imageSource === 'url'} onChange={() => setImageSource('url')} /> Image URL
                  </label>
                </div>
                {imageSource === 'upload' ? (
                  <>
                    <input type="file" accept="image/*" className="form-input" required onChange={(e) => {
                      setImageFile(e.target.files[0]);
                      const reader = new FileReader();
                      reader.onload = (ev) => setFormData({...formData, image_url: ev.target.result});
                      if(e.target.files[0]) reader.readAsDataURL(e.target.files[0]);
                    }} />
                    {formData.image_url && imageSource === 'upload' && (
                      <div style={{ marginTop: '10px' }}>
                        <img src={formData.image_url} alt="Preview" style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '12px' }} />
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <input type="url" className="form-input" placeholder="https://example.com/image.jpg" required value={formData.image_url} onChange={(e) => setFormData({...formData, image_url: e.target.value})} />
                    {formData.image_url && imageSource === 'url' && (
                      <div style={{ marginTop: '10px' }}>
                        <img src={formData.image_url} alt="Preview" style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '12px' }} onError={(e) => e.target.style.display='none'} />
                      </div>
                    )}
                  </>
                )}
              </div>
              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={closeModal} disabled={isSubmitting}>Cancel</button>
                <button type="submit" className={`save-btn ${status.type === 'error' ? 'save-btn-error' : ''}`} disabled={isSubmitting}>
                  {isSubmitting ? 'Saving...' : status.type === 'error' ? 'Retry Save' : 'Save Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Portfolio;
