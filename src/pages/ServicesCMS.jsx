import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { supabase } from '../supabaseClient';

const CMS_STYLE = `
  .cms-wrapper { display: flex; min-height: 100vh; background: #0b1120; font-family: 'Inter', sans-serif; }
  .cms-content { margin-left: 260px; padding: 40px; width: calc(100% - 260px); color: #e2e8f0; }
  .cms-title { font-size: 1.8rem; font-weight: 800; margin-bottom: 24px; color: #fff; }
  .cms-panel { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 16px; padding: 28px; }
  .cms-input { width: 100%; padding: 12px; border-radius: 8px; background: #1e293b; border: 1px solid rgba(255,255,255,0.1); color: #fff; margin-bottom: 15px; }
  .cms-textarea { width: 100%; padding: 12px; border-radius: 8px; background: #1e293b; border: 1px solid rgba(255,255,255,0.1); color: #fff; min-height: 120px; margin-bottom: 15px; resize: vertical; }
  .cms-btn-primary { background: #e10600; color: #fff; padding: 10px 20px; border-radius: 8px; border: none; font-weight: 600; cursor: pointer; transition: 0.3s; }
  .cms-btn-primary:hover { background: #c50500; }
  .cms-btn-danger { background: #ef4444; color: #fff; padding: 6px 12px; border-radius: 6px; border: none; font-weight: 600; cursor: pointer; font-size: 0.8rem; }
  .cms-table { width: 100%; border-collapse: collapse; text-align: left; margin-top: 20px; }
  .cms-table th { background: rgba(255,255,255,0.05); padding: 15px 20px; font-weight: 700; color: #94a3b8; border-bottom: 1px solid rgba(255,255,255,0.1); }
  .cms-table td { padding: 15px 20px; border-bottom: 1px solid rgba(255,255,255,0.05); color: #e2e8f0; }
  .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.8); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; z-index: 100; }
  .modal-content { background: #1e293b; padding: 30px; border-radius: 20px; width: 100%; max-width: 600px; max-height: 90vh; overflow-y: auto; border: 1px solid rgba(255,255,255,0.1); }
  .status-msg { padding: 12px; border-radius: 8px; margin-bottom: 20px; text-align: center; font-weight: 600; }
`;

const ServicesCMS = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({ title: '', slug: '', description: '', icon: '', image_url: '', status: 'active' });

  useEffect(() => { loadServices(); }, []);

  const loadServices = async () => {
    setLoading(true);
    const { data } = await supabase.from('services').select('*').order('id', { ascending: true });
    if (data) setServices(data);
    setLoading(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const slug = formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      const payload = { ...formData, slug };
      
      let error;
      if (isEditing) {
        const res = await supabase.from('services').update(payload).eq('id', editingId);
        error = res.error;
      } else {
        const res = await supabase.from('services').insert([payload]);
        error = res.error;
      }
      
      if (error) throw error;
      
      loadServices();
      closeModal();
    } catch (err) {
      alert(err.message);
    }
  };

  const openAddModal = () => {
    setIsEditing(false);
    setFormData({ title: '', slug: '', description: '', icon: '', image_url: '', status: 'active' });
    setShowModal(true);
  };

  const openEditModal = (service) => {
    setIsEditing(true);
    setEditingId(service.id);
    setFormData({ title: service.title, slug: service.slug, description: service.description || '', icon: service.icon || '', image_url: service.image_url || '', status: service.status });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setIsEditing(false);
    setEditingId(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this service permanently?')) return;
    await supabase.from('services').delete().eq('id', id);
    loadServices();
  };

  return (
    <div className="cms-wrapper">
      <style dangerouslySetInnerHTML={{ __html: CMS_STYLE }} />
      <Sidebar />
      <div className="cms-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 className="cms-title">Services Manager</h1>
          <button className="cms-btn-primary" onClick={openAddModal}>+ Add Service</button>
        </div>
        
        <div className="cms-panel">
          {loading ? <p style={{ color: '#94a3b8' }}>Loading...</p> : (
            <table className="cms-table">
              <thead><tr><th>Service Title</th><th>Status</th><th>Actions</th></tr></thead>
              <tbody>
                {services.map(s => (
                  <tr key={s.id}>
                    <td style={{ fontWeight: 600 }}>{s.title}</td>
                    <td><span style={{ padding: '4px 8px', borderRadius: '4px', background: s.status === 'active' ? 'rgba(34,197,94,0.1)' : 'rgba(255,255,255,0.1)', color: s.status === 'active' ? '#4ade80' : '#fff', fontSize: '0.8rem', textTransform: 'uppercase' }}>{s.status}</span></td>
                    <td style={{ display: 'flex', gap: '10px' }}>
                      <button className="cms-btn-primary" style={{ padding: '6px 12px', fontSize: '0.8rem', background: '#3b82f6' }} onClick={() => openEditModal(s)}>Edit</button>
                      <button className="cms-btn-danger" onClick={() => handleDelete(s.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
                {services.length === 0 && <tr><td colSpan="3" style={{ textAlign: 'center', color: '#94a3b8' }}>No services yet.</td></tr>}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 style={{ marginTop: 0, color: '#fff' }}>{isEditing ? 'Edit Service' : 'Add Service'}</h2>
            <form onSubmit={handleSave}>
              <label style={{ color: '#94a3b8', display: 'block', marginBottom: '8px' }}>Service Title</label>
              <input type="text" className="cms-input" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
              
              <label style={{ color: '#94a3b8', display: 'block', marginBottom: '8px' }}>Description</label>
              <textarea className="cms-textarea" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}></textarea>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div>
                  <label style={{ color: '#94a3b8', display: 'block', marginBottom: '8px' }}>Icon (SVG or Name)</label>
                  <input type="text" className="cms-input" value={formData.icon} onChange={e => setFormData({...formData, icon: e.target.value})} />
                </div>
                <div>
                  <label style={{ color: '#94a3b8', display: 'block', marginBottom: '8px' }}>Status</label>
                  <select className="cms-input" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                <button type="button" className="cms-btn-primary" style={{ background: 'transparent', border: '1px solid #e10600', flex: 1 }} onClick={closeModal}>Cancel</button>
                <button type="submit" className="cms-btn-primary" style={{ flex: 1 }}>Save Service</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default ServicesCMS;
