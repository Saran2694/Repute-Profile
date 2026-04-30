import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const ServicesCMS_Content = () => {
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
      if (isEditing) await supabase.from('services').update(payload).eq('id', editingId);
      else await supabase.from('services').insert([payload]);
      loadServices();
      setShowModal(false);
    } catch (err) { alert(err.message); }
  };

  return (
    <div className="services-cms-embedded">
      <div className="cms-inner-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', margin: 0 }}>Services Manager</h2>
        <button className="add-btn" onClick={() => { setIsEditing(false); setFormData({ title: '', slug: '', description: '', icon: '', image_url: '', status: 'active' }); setShowModal(true); }}>+ Add Service</button>
      </div>
      <div className="cms-table-wrapper" style={{ background: 'rgba(30, 41, 59, 0.5)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden' }}>
        <table className="cms-table" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr>
              <th style={{ background: 'rgba(0,0,0,0.2)', padding: '15px 20px', color: '#94a3b8', fontSize: '0.8rem', textTransform: 'uppercase' }}>Service</th>
              <th style={{ background: 'rgba(0,0,0,0.2)', padding: '15px 20px', color: '#94a3b8', fontSize: '0.8rem', textTransform: 'uppercase' }}>Status</th>
              <th style={{ background: 'rgba(0,0,0,0.2)', padding: '15px 20px', color: '#94a3b8', fontSize: '0.8rem', textTransform: 'uppercase' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map(s => (
              <tr key={s.id}>
                <td style={{ padding: '15px 20px', borderBottom: '1px solid rgba(255,255,255,0.05)', color: '#cbd5e1', fontWeight: 600 }}>{s.title}</td>
                <td style={{ padding: '15px 20px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <span style={{ padding: '4px 8px', borderRadius: '4px', background: s.status === 'active' ? 'rgba(34,197,94,0.1)' : 'rgba(255,255,255,0.1)', color: s.status === 'active' ? '#4ade80' : '#fff', fontSize: '0.7rem', fontWeight: 800 }}>{s.status.toUpperCase()}</span>
                </td>
                <td style={{ padding: '15px 20px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <button className="cms-action-btn" style={{ color: '#3b82f6', marginRight: '10px', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }} onClick={() => { setIsEditing(true); setEditingId(s.id); setFormData(s); setShowModal(true); }}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="cms-modal-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justify_content: 'center', zIndex: 2000 }}>
          <div className="cms-modal-box" style={{ background: '#1e293b', padding: '30px', borderRadius: '20px', width: '100%', maxWidth: '450px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <h3 style={{ marginTop: 0, marginBottom: '20px', color: '#fff' }}>{isEditing ? 'Edit Service' : 'Add Service'}</h3>
            <form onSubmit={handleSave}>
              <div className="form-group"><label className="form-label">Title</label><input className="form-input" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} /></div>
              <div className="form-group"><label className="form-label">Description</label><textarea className="form-textarea" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} style={{ minHeight: '100px' }} /></div>
              <div className="form-actions" style={{ display: 'flex', gap: '10px' }}>
                <button type="button" className="cancel-btn" onClick={() => setShowModal(false)} style={{ flex: 1 }}>Cancel</button>
                <button type="submit" className="save-btn" style={{ flex: 1 }}>Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesCMS_Content;
