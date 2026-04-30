import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const ContactCMS_Content = () => {
  const [data, setData] = useState({ 
    phone: '', 
    email: '', 
    address: '', 
    google_maps_iframe: '', 
    facebook_url: '', 
    instagram_url: '', 
    linkedin_url: '', 
    twitter_url: '',
    youtube_url: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  useEffect(() => { loadContactSettings(); }, []);

  const loadContactSettings = async () => {
    try {
      const { data: settings, error } = await supabase.from('contact_settings').select('*').eq('id', 1).single();
      if (settings && !error) {
        // Only set the fields we care about to avoid sending system columns back
        setData({
          phone: settings.phone || '',
          email: settings.email || '',
          address: settings.address || '',
          google_maps_iframe: settings.google_maps_iframe || '',
          facebook_url: settings.facebook_url || '',
          instagram_url: settings.instagram_url || '',
          linkedin_url: settings.linkedin_url || '',
          twitter_url: settings.twitter_url || '',
          youtube_url: settings.youtube_url || ''
        });
      }
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      // Clean data: ensure we only send what the table expects
      const payload = {
        id: 1,
        phone: data.phone,
        email: data.email,
        address: data.address,
        google_maps_iframe: data.google_maps_iframe,
        facebook_url: data.facebook_url,
        instagram_url: data.instagram_url,
        linkedin_url: data.linkedin_url,
        twitter_url: data.twitter_url
      };

      const { error } = await supabase.from('contact_settings').upsert(payload);
      
      if (error) {
        console.error('Supabase Save Error:', error);
        setStatus({ type: 'error', message: `Error: ${error.message}` });
      } else {
        setStatus({ type: 'success', message: 'Settings saved successfully!' });
      }
    } catch (err) {
      console.error('General Save Error:', err);
      setStatus({ type: 'error', message: 'An unexpected error occurred.' });
    } finally {
      setLoading(false);
      setTimeout(() => setStatus({ type: '', message: '' }), 5000);
    }
  };

  return (
    <div className="contact-cms-embedded">
      <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', marginBottom: '25px' }}>Contact & Social Settings</h2>
      <div style={{ background: 'rgba(30, 41, 59, 0.5)', padding: '30px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>
        {status.message && <div className={`status-msg status-${status.type}`} style={{ marginBottom: '20px', padding: '10px', borderRadius: '8px', textAlign: 'center', background: status.type === 'success' ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)', color: status.type === 'success' ? '#4ade80' : '#f87171' }}>{status.message}</div>}
        <form onSubmit={handleSave}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
            <div className="form-group"><label className="form-label">Phone</label><input className="form-input" value={data.phone} onChange={e => setData({...data, phone: e.target.value})} /></div>
            <div className="form-group"><label className="form-label">Email</label><input className="form-input" value={data.email} onChange={e => setData({...data, email: e.target.value})} /></div>
          </div>
          <div className="form-group" style={{ marginBottom: '20px' }}><label className="form-label">Address</label><textarea className="form-textarea" value={data.address} onChange={e => setData({...data, address: e.target.value})} style={{ minHeight: '80px' }} /></div>
          <div className="form-group" style={{ marginBottom: '20px' }}><label className="form-label">Google Maps Iframe URL</label><input className="form-input" value={data.google_maps_iframe} onChange={e => setData({...data, google_maps_iframe: e.target.value})} placeholder="https://www.google.com/maps/embed?..." /></div>

          <h3 style={{ fontSize: '1.1rem', color: '#94a3b8', margin: '30px 0 15px' }}>Social Media Links</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-group"><label className="form-label">Facebook URL</label><input className="form-input" value={data.facebook_url} onChange={e => setData({...data, facebook_url: e.target.value})} /></div>
            <div className="form-group"><label className="form-label">Instagram URL</label><input className="form-input" value={data.instagram_url} onChange={e => setData({...data, instagram_url: e.target.value})} /></div>
            <div className="form-group"><label className="form-label">LinkedIn URL</label><input className="form-input" value={data.linkedin_url} onChange={e => setData({...data, linkedin_url: e.target.value})} /></div>
            <div className="form-group"><label className="form-label">X (Twitter) URL</label><input className="form-input" value={data.twitter_url} onChange={e => setData({...data, twitter_url: e.target.value})} /></div>
            <div className="form-group"><label className="form-label">YouTube URL</label><input className="form-input" value={data.youtube_url} onChange={e => setData({...data, youtube_url: e.target.value})} /></div>
          </div>

          <div className="form-actions" style={{ marginTop: '30px' }}>
            <button type="submit" className="save-btn" style={{ width: '200px' }} disabled={loading}>{loading ? 'Saving...' : 'Save All Settings'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactCMS_Content;
