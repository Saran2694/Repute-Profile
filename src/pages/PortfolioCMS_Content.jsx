import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const PortfolioCMS_Content = () => {
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ category: 'Branding', title: '', website_link: '', image_url: '' });
  const [imageFile, setImageFile] = useState(null);
  const [imageSource, setImageSource] = useState('upload'); 
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [activeTab, setActiveTab] = useState('active');

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

  const handleSaveProject = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: 'loading', message: isEditing ? 'Updating project...' : 'Saving project...' });

    try {
      let finalImageUrl = formData.image_url;

      if (imageSource === 'upload' && imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `portfolio/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('media')
          .upload(filePath, imageFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('media')
          .getPublicUrl(filePath);
        
        finalImageUrl = publicUrl;
      }

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
      setStatus({ type: 'error', message: err.message || 'Failed to save project.' });
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
    setImageSource('url');
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
      }
    }
  };

  return (
    <div className="portfolio-cms-embedded">
      <style>{`
        .cms-inner-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; }
        .cms-inner-title { font-size: 1.5rem; font-weight: 800; color: #fff; margin: 0; }
        .cms-tab-group { display: flex; gap: 20px; margin-bottom: 25px; border-bottom: 1px solid rgba(255,255,255,0.1); }
        .cms-tab-btn { padding: 12px 20px; background: none; border: none; color: #94a3b8; font-weight: 700; cursor: pointer; transition: all 0.3s; border-bottom: 3px solid transparent; }
        .cms-tab-btn.active { color: #e10600; border-bottom-color: #e10600; }
        
        .cms-table-wrapper { background: rgba(30, 41, 59, 0.5); border-radius: 16px; border: 1px solid rgba(255,255,255,0.1); overflow: hidden; }
        .cms-table { width: 100%; border-collapse: collapse; text-align: left; }
        .cms-table th { background: rgba(0,0,0,0.2); padding: 15px 20px; font-weight: 700; color: #94a3b8; font-size: 0.8rem; text-transform: uppercase; border-bottom: 1px solid rgba(255,255,255,0.05); }
        .cms-table td { padding: 15px 20px; border-bottom: 1px solid rgba(255,255,255,0.05); color: #cbd5e1; font-size: 0.9rem; }
        .cms-img { width: 50px; height: 35px; object-fit: cover; border-radius: 4px; }
        
        .cms-action-btn { background: none; border: none; cursor: pointer; font-weight: 600; padding: 5px 8px; border-radius: 4px; transition: 0.2s; }
        .cms-edit-link { color: #3b82f6; margin-right: 10px; }
        .cms-delete-link { color: #ef4444; }
        .cms-restore-link { color: #10b981; margin-right: 10px; }

        .cms-modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.8); backdrop-filter: blur(8px); display: flex; align-items: center; justify-content: center; z-index: 2000; }
        .cms-modal-box { background: #1e293b; padding: 30px; border-radius: 20px; width: 100%; max-width: 450px; border: 1px solid rgba(255,255,255,0.1); box-shadow: 0 25px 50px rgba(0,0,0,0.5); }
      `}</style>

      <div className="cms-inner-header">
        <h2 className="cms-inner-title">Portfolio Manager</h2>
        <button className="add-btn" onClick={() => { setIsEditing(false); setShowModal(true); }}>+ Add Project</button>
      </div>

      <div className="cms-tab-group">
        <button className={`cms-tab-btn ${activeTab === 'active' ? 'active' : ''}`} onClick={() => setActiveTab('active')}>Active Projects</button>
        <button className={`cms-tab-btn ${activeTab === 'trash' ? 'active' : ''}`} onClick={() => setActiveTab('trash')}>Trash</button>
      </div>

      <div className="cms-table-wrapper">
        <table className="cms-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Category</th>
              <th>Project Title</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.length > 0 ? projects.map(p => (
              <tr key={p.id}>
                <td><img src={p.image_url || p.image} alt="" className="cms-img" /></td>
                <td><span style={{ fontSize: '0.8rem', background: 'rgba(255,255,255,0.05)', padding: '4px 8px', borderRadius: '4px' }}>{p.category}</span></td>
                <td style={{ fontWeight: 600 }}>{p.title}</td>
                <td>
                  {activeTab === 'active' ? (
                    <>
                      <button className="cms-action-btn cms-edit-link" onClick={() => openEditModal(p)}>Edit</button>
                      <button className="cms-action-btn cms-delete-link" onClick={() => handleDelete(p.id)}>Delete</button>
                    </>
                  ) : (
                    <>
                      <button className="cms-action-btn cms-restore-link" onClick={() => handleRestore(p.id)}>Restore</button>
                      <button className="cms-action-btn cms-delete-link" onClick={() => handlePermanentDelete(p.id)}>Delete Forever</button>
                    </>
                  )}
                </td>
              </tr>
            )) : (
              <tr><td colSpan="4" style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>No projects found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="cms-modal-overlay">
          <div className="cms-modal-box">
            <h3 className="modal-title">{isEditing ? 'Edit Project' : 'Add New Project'}</h3>
            {status.message && <div className={`status-msg status-${status.type}`}>{status.message}</div>}
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
                <input type="text" className="form-input" required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Link</label>
                <input type="text" className="form-input" value={formData.website_link} onChange={(e) => setFormData({...formData, website_link: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Image</label>
                <input type="text" className="form-input" placeholder="Image URL" value={formData.image_url} onChange={(e) => setFormData({...formData, image_url: e.target.value})} />
              </div>
              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={closeModal}>Cancel</button>
                <button type="submit" className="save-btn" disabled={isSubmitting}>{isSubmitting ? 'Saving...' : 'Save'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioCMS_Content;
