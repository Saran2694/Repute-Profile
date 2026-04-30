import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { supabase } from '../supabaseClient';

const Careers = () => {
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
          .update({
            title: formData.title,
            location: formData.location,
            type: formData.type,
            description: formData.description
          })
          .eq('id', editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('job_openings')
          .insert([{
            title: formData.title,
            location: formData.location,
            type: formData.type,
            description: formData.description
          }]);
        if (error) throw error;
      }

      setShowModal(false);
      setIsEditing(false);
      setEditingId(null);
      setFormData({ title: '', location: '', type: 'Full-time', description: '' });
      fetchCareers();
    } catch (err) {
      console.error('Error saving career:', err);
      alert(`Failed to save: ${err.message}`);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this career post?')) {
      try {
        const { error } = await supabase
          .from('job_openings')
          .delete()
          .eq('id', id);

        if (error) throw error;
        fetchCareers();
      } catch (err) {
        console.error('Error deleting career:', err);
        alert('Failed to delete job post.');
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
          animation: pageEntrance 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards;
        }

        @keyframes pageEntrance {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
        .page-title { font-size: 1.8rem; font-weight: 800; color: #ffffff; margin: 0; }
        .add-btn { background: #e10600; color: white; border: none; padding: 12px 24px; border-radius: 12px; font-weight: 700; cursor: pointer; transition: all 0.3s ease; }
        .add-btn:hover { background: #c00500; }
        
        .table-container { background: #1e293b; border-radius: 20px; border: 1px solid #334155; overflow: hidden; }
        .admin-table { width: 100%; border-collapse: collapse; text-align: left; }
        .admin-table th { padding: 15px 20px; font-weight: 700; color: #94a3b8; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid #334155; }
        .admin-table td { padding: 15px 20px; border-bottom: 1px solid #334155; color: #f8fafc; font-size: 0.95rem; }
        
        .type-badge { padding: 4px 12px; border-radius: 50px; font-size: 0.75rem; font-weight: 700; }
        .type-full-time { background: #064e3b; color: #34d399; }
        .type-part-time { background: #78350f; color: #fbbf24; }
        .type-internship { background: #312e81; color: #818cf8; }

        .delete-btn { color: #f87171; background: none; border: none; cursor: pointer; font-weight: 600; padding: 5px 10px; border-radius: 6px; transition: background 0.2s; }
        .delete-btn:hover { background: rgba(248, 113, 113, 0.1); }

        .modal-overlay { position: fixed; inset: 0; background: rgba(0, 0, 0, 0.8); backdrop-filter: blur(8px); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 20px; }
        .modal-content { background: #1e293b; padding: 25px; border-radius: 20px; width: 100%; max-width: 480px; box-shadow: 0 25px 50px rgba(0,0,0,0.5); border: 1px solid #334155; }
        .modal-title { margin-top: 0; margin-bottom: 20px; font-weight: 800; font-size: 1.25rem; color: #ffffff; }
        .form-group { margin-bottom: 15px; }
        .form-label { display: block; margin-bottom: 6px; font-weight: 600; color: #94a3b8; font-size: 0.85rem; }
        .form-input { width: 100%; padding: 12px; border-radius: 10px; border: 1px solid #334155; font-family: inherit; font-size: 0.9rem; background: #0f172a; color: white; box-sizing: border-box; }
        .form-input:focus { outline: none; border-color: #e10600; }
        .form-actions { display: flex; gap: 12px; margin-top: 25px; }
        .cancel-btn { flex: 1; padding: 10px; background: #334155; border: none; border-radius: 10px; font-weight: 700; cursor: pointer; color: #cbd5e1; }
        .save-btn { flex: 2; padding: 10px; background: #e10600; color: white; border: none; border-radius: 10px; font-weight: 700; cursor: pointer; }
      `}</style>

      <Sidebar />
      <div className="admin-main-content">
        <div className="page-header">
          <h1 className="page-title">Career Opportunities</h1>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button className="add-btn" style={{ background: '#334155' }} onClick={async () => {
              if (window.confirm('Seed default careers?')) {
                const defaults = [
                  { title: 'Graphic Designer', location: 'Coimbatore', type: 'Full-time' },
                  { title: 'Social Media Manager', location: 'Coimbatore', type: 'Full-time' },
                  { title: 'Web Developer', location: 'Remote', type: 'Full-time' }
                ];
                await supabase.from('job_openings').insert(defaults);
                fetchCareers();
              }
            }}>Seed Data</button>
            <button className="add-btn" onClick={() => { setIsEditing(false); setFormData({ title: '', location: '', type: 'Full-time', description: '' }); setShowModal(true); }}>+ Add Job</button>
          </div>
        </div>

        <div className="table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Job Title</th>
                <th>Location</th>
                <th>Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {careers.map((c) => (
                <tr key={c.id}>
                  <td style={{ fontSize: '0.8rem', color: '#64748b' }}>#{c.id.slice(0, 8)}</td>
                  <td style={{ fontWeight: 600 }}>{c.title}</td>
                  <td>{c.location}</td>
                  <td>
                    <span className={`type-badge type-${c.type.toLowerCase().replace(' ', '-')}`}>
                      {c.type}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button className="delete-btn" style={{ color: '#60a5fa' }} onClick={() => { setFormData(c); setEditingId(c.id); setIsEditing(true); setShowModal(true); }}>Edit</button>
                      <button className="delete-btn" onClick={() => handleDelete(c.id)}>Delete</button>
                    </div>
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
            <h2 className="modal-title">{isEditing ? 'Edit Job Post' : 'Post New Job'}</h2>
            <form onSubmit={handleSave}>
              <div className="form-group">
                <label className="form-label">Job Title</label>
                <input type="text" className="form-input" placeholder="e.g. Senior Graphic Designer" required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Location</label>
                <input type="text" className="form-input" placeholder="e.g. Coimbatore, TN" required value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} />
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
                <label className="form-label">Job Description</label>
                <textarea className="form-input" rows="3" placeholder="Briefly describe the role..." value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} style={{ resize: 'none' }}></textarea>
              </div>
              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="save-btn">Post Job</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Careers;
