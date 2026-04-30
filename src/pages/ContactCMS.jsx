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
  .cms-btn-primary { background: #e10600; color: #fff; padding: 12px 24px; border-radius: 8px; border: none; font-weight: 600; cursor: pointer; transition: 0.3s; }
  .cms-btn-primary:hover { background: #c50500; }
  .form-group { margin-bottom: 20px; }
  .form-label { display: block; margin-bottom: 8px; font-weight: 600; color: #94a3b8; }
  .status-msg { padding: 12px; border-radius: 8px; margin-bottom: 20px; text-align: center; font-weight: 600; }
  .success { background: rgba(34,197,94,0.1); color: #4ade80; border: 1px solid rgba(34,197,94,0.2); }
  .error { background: rgba(239,68,68,0.1); color: #f87171; border: 1px solid rgba(239,68,68,0.2); }
`;

const ContactCMS = () => {
  const [data, setData] = useState({ phone: '', email: '', address: '', google_maps_iframe: '', facebook_url: '', instagram_url: '', linkedin_url: '', twitter_url: '' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => { loadContactSettings(); }, []);

  const loadContactSettings = async () => {
    try {
      const { data: settings, error } = await supabase.from('contact_settings').select('*').eq('id', 1).single();
      if (settings) setData(settings);
    } catch (err) { console.error('Error loading settings', err); }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });
    try {
      const { error } = await supabase.from('contact_settings').upsert({ id: 1, ...data });
      if (error) throw error;
      setStatus({ type: 'success', message: 'Settings saved successfully!' });
    } catch (err) {
      setStatus({ type: 'error', message: err.message });
    }
    setLoading(false);
  };

  return (
    <div className="cms-wrapper">
      <style dangerouslySetInnerHTML={{ __html: CMS_STYLE }} />
      <Sidebar />
      <div className="cms-content">
        <h1 className="cms-title">Contact & Social Settings</h1>
        <div className="cms-panel">
          {status.message && <div className={`status-msg ${status.type}`}>{status.message}</div>}
          <form onSubmit={handleSave}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input type="text" className="cms-input" value={data.phone} onChange={e => setData({...data, phone: e.target.value})} placeholder="+91 1234567890" />
              </div>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input type="email" className="cms-input" value={data.email} onChange={e => setData({...data, email: e.target.value})} placeholder="contact@example.com" />
              </div>
            </div>
            
            <div className="form-group">
              <label className="form-label">Office Address</label>
              <textarea className="cms-textarea" value={data.address} onChange={e => setData({...data, address: e.target.value})} placeholder="123 Street Name, City, Country" style={{ minHeight: '80px' }}></textarea>
            </div>

            <div className="form-group">
              <label className="form-label">Google Maps iframe code</label>
              <textarea className="cms-textarea" value={data.google_maps_iframe} onChange={e => setData({...data, google_maps_iframe: e.target.value})} placeholder='<iframe src="..."></iframe>' style={{ minHeight: '80px' }}></textarea>
            </div>

            <h3 style={{ marginTop: '30px', marginBottom: '20px', color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}>Social Media Links</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div className="form-group"><label className="form-label">Facebook URL</label><input type="text" className="cms-input" value={data.facebook_url} onChange={e => setData({...data, facebook_url: e.target.value})} /></div>
              <div className="form-group"><label className="form-label">Instagram URL</label><input type="text" className="cms-input" value={data.instagram_url} onChange={e => setData({...data, instagram_url: e.target.value})} /></div>
              <div className="form-group"><label className="form-label">LinkedIn URL</label><input type="text" className="cms-input" value={data.linkedin_url} onChange={e => setData({...data, linkedin_url: e.target.value})} /></div>
              <div className="form-group"><label className="form-label">Twitter URL</label><input type="text" className="cms-input" value={data.twitter_url} onChange={e => setData({...data, twitter_url: e.target.value})} /></div>
            </div>

            <button type="submit" className="cms-btn-primary" disabled={loading}>{loading ? 'Saving...' : 'Save Settings'}</button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default ContactCMS;
