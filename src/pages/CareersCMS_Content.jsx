import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const CareersCMS_Content = () => {
  const [careers, setCareers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ title: '', location: '', type: 'Full-time', description: '' });

  useEffect(() => {
    fetchCareers();
  }, []);

  const fetchCareers = async () => {
    try {
      const { data, error } = await supabase
        .from('job_openings')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setCareers(data || []);
    } catch (err) {
      console.error('Error fetching careers:', err);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        const { error } = await supabase
          .from('job_openings')
          .update(formData)
          .eq('id', editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('job_openings')
          .insert([formData]);
        if (error) throw error;
      }
      setShowModal(false);
      setIsEditing(false);
      setEditingId(null);
      setFormData({ title: '', location: '', type: 'Full-time', description: '' });
      fetchCareers();
    } catch (err) {
      console.error('Error saving career:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this career post?')) {
      try {
        const { error } = await supabase.from('job_openings').delete().eq('id', id);
        if (error) throw error;
        fetchCareers();
      } catch (err) {
        console.error('Error deleting career:', err);
      }
    }
  };

  return (
    <div className="careers-cms-embedded">
      <style>{`
        .cms-inner-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; }
        .cms-inner-title { font-size: 1.5rem; font-weight: 800; color: #fff; margin: 0; }
        .cms-table-wrapper { background: rgba(30, 41, 59, 0.5); border-radius: 16px; border: 1px solid rgba(255,255,255,0.1); overflow: hidden; }
        .cms-table { width: 100%; border-collapse: collapse; text-align: left; }
        .cms-table th { background: rgba(0,0,0,0.2); padding: 15px 20px; font-weight: 700; color: #94a3b8; font-size: 0.8rem; text-transform: uppercase; border-bottom: 1px solid rgba(255,255,255,0.05); }
        .cms-table td { padding: 15px 20px; border-bottom: 1px solid rgba(255,255,255,0.05); color: #cbd5e1; font-size: 0.9rem; }
        
        .type-badge { padding: 4px 10px; border-radius: 50px; font-size: 0.7rem; font-weight: 800; text-transform: uppercase; }
        .type-full-time { background: rgba(52, 211, 153, 0.1); color: #34d399; }
        .type-part-time { background: rgba(251, 191, 36, 0.1); color: #fbbf24; }
        .type-internship { background: rgba(129, 140, 248, 0.1); color: #818cf8; }

        .cms-action-btn { background: none; border: none; cursor: pointer; font-weight: 600; padding: 5px 8px; border-radius: 4px; transition: 0.2s; }
        .cms-edit-link { color: #3b82f6; margin-right: 10px; }
        .cms-delete-link { color: #ef4444; }

        .cms-modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.8); backdrop-filter: blur(8px); display: flex; align-items: center; justify-content: center; z-index: 2000; }
        .cms-modal-box { background: #1e293b; padding: 30px; border-radius: 20px; width: 100%; max-width: 450px; border: 1px solid rgba(255,255,255,0.1); box-shadow: 0 25px 50px rgba(0,0,0,0.5); }
      `}</style>

      <div className="cms-inner-header">
        <h2 className="cms-inner-title">Careers Manager</h2>
        <button className="add-btn" onClick={() => { setIsEditing(false); setShowModal(true); }}>+ Post Job</button>
      </div>

      <div className="cms-table-wrapper" style={{ marginTop: '20px' }}>
        <table className="cms-table">
          <thead>
            <tr>
              <th>Job Title</th>
              <th>Location</th>
              <th>Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {careers.length > 0 ? careers.map(c => (
              <tr key={c.id}>
                <td style={{ fontWeight: 600 }}>{c.title}</td>
                <td>{c.location}</td>
                <td>
                  <span className={`type-badge type-${c.type.toLowerCase().replace(' ', '-')}`}>
                    {c.type}
                  </span>
                </td>
                <td>
                  <button className="cms-action-btn cms-edit-link" onClick={() => { setFormData(c); setEditingId(c.id); setIsEditing(true); setShowModal(true); }}>Edit</button>
                  <button className="cms-action-btn cms-delete-link" onClick={() => handleDelete(c.id)}>Delete</button>
                </td>
              </tr>
            )) : (
              <tr><td colSpan="4" style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>No job openings found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="cms-modal-overlay">
          <div className="cms-modal-box">
            <h3 className="modal-title">{isEditing ? 'Edit Job Post' : 'Post New Job'}</h3>
            <form onSubmit={handleSave}>
              <div className="form-group">
                <label className="form-label">Job Title</label>
                <input type="text" className="form-input" required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Location</label>
                <input type="text" className="form-input" required value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Job Type</label>
                <select className="form-input" value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})}>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea className="form-input" rows="3" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} style={{ resize: 'none' }}></textarea>
              </div>
              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="save-btn">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CareersCMS_Content;
