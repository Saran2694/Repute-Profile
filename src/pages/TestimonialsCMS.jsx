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
  .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.7); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; z-index: 100; }
  .modal-content { background: #1e293b; padding: 30px; border-radius: 20px; width: 100%; max-width: 500px; border: 1px solid rgba(255,255,255,0.1); }
  .status-msg { padding: 12px; border-radius: 8px; margin-bottom: 20px; text-align: center; font-weight: 600; }
  .success { background: rgba(34,197,94,0.1); color: #4ade80; border: 1px solid rgba(34,197,94,0.2); }
  .error { background: rgba(239,68,68,0.1); color: #f87171; border: 1px solid rgba(239,68,68,0.2); }
`;

const TestimonialsCMS = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ client_name: '', company: '', review: '', rating: 5 });
  const [status, setStatus] = useState({ type: '', message: '' });

  useEffect(() => { loadTestimonials(); }, []);

  const loadTestimonials = async () => {
    setLoading(true);
    const { data } = await supabase.from('testimonials').select('*').order('created_at', { ascending: false });
    if (data) setTestimonials(data);
    setLoading(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });
    try {
      const { error } = await supabase.from('testimonials').insert([formData]);
      if (error) throw error;
      setStatus({ type: 'success', message: 'Testimonial added!' });
      loadTestimonials();
      setTimeout(() => { setShowModal(false); setFormData({ client_name: '', company: '', review: '', rating: 5 }); setStatus({type:'', message:''}); }, 1500);
    } catch (err) {
      setStatus({ type: 'error', message: err.message });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this testimonial?')) return;
    await supabase.from('testimonials').delete().eq('id', id);
    loadTestimonials();
  };

  return (
    <div className="cms-wrapper">
      <style dangerouslySetInnerHTML={{ __html: CMS_STYLE }} />
      <Sidebar />
      <div className="cms-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 className="cms-title">Testimonials Manager</h1>
          <button className="cms-btn-primary" onClick={() => setShowModal(true)}>+ Add Testimonial</button>
        </div>
        
        <div className="cms-panel">
          {loading ? <p style={{ color: '#94a3b8' }}>Loading...</p> : (
            <table className="cms-table">
              <thead><tr><th>Client Name</th><th>Company</th><th>Review</th><th>Rating</th><th>Actions</th></tr></thead>
              <tbody>
                {testimonials.map(t => (
                  <tr key={t.id}>
                    <td>{t.client_name}</td>
                    <td>{t.company}</td>
                    <td>{t.review.substring(0, 50)}...</td>
                    <td>{'⭐'.repeat(t.rating)}</td>
                    <td><button className="cms-btn-danger" onClick={() => handleDelete(t.id)}>Delete</button></td>
                  </tr>
                ))}
                {testimonials.length === 0 && <tr><td colSpan="5" style={{ textAlign: 'center', color: '#94a3b8' }}>No testimonials yet.</td></tr>}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 style={{ marginTop: 0, color: '#fff' }}>Add Testimonial</h2>
            {status.message && <div className={`status-msg ${status.type}`}>{status.message}</div>}
            <form onSubmit={handleSave}>
              <input type="text" className="cms-input" placeholder="Client Name" required value={formData.client_name} onChange={e => setFormData({...formData, client_name: e.target.value})} />
              <input type="text" className="cms-input" placeholder="Company Name" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} />
              <select className="cms-input" value={formData.rating} onChange={e => setFormData({...formData, rating: Number(e.target.value)})}>
                <option value={5}>5 Stars</option><option value={4}>4 Stars</option><option value={3}>3 Stars</option><option value={2}>2 Stars</option><option value={1}>1 Star</option>
              </select>
              <textarea className="cms-textarea" placeholder="Client Review..." required value={formData.review} onChange={e => setFormData({...formData, review: e.target.value})}></textarea>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button type="button" className="cms-btn-primary" style={{ background: 'transparent', border: '1px solid #e10600', flex: 1 }} onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="cms-btn-primary" style={{ flex: 1 }}>Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default TestimonialsCMS;
