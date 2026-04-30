import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { supabase } from '../supabaseClient';

const CMS_STYLE = `
  .cms-wrapper { display: flex; min-height: 100vh; background: #0b1120; font-family: 'Inter', sans-serif; }
  .cms-content { margin-left: 260px; padding: 40px; width: calc(100% - 260px); color: #e2e8f0; }
  .cms-title { font-size: 1.8rem; font-weight: 800; margin-bottom: 24px; color: #fff; }
  .cms-panel { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 16px; padding: 28px; margin-bottom: 30px; }
  .cms-input { width: 100%; padding: 12px; border-radius: 8px; background: #1e293b; border: 1px solid rgba(255,255,255,0.1); color: #fff; margin-bottom: 15px; }
  .cms-btn-primary { background: #e10600; color: #fff; padding: 12px 24px; border-radius: 8px; border: none; font-weight: 600; cursor: pointer; transition: 0.3s; }
  .cms-btn-primary:hover { background: #c50500; }
  .form-label { display: block; margin-bottom: 8px; font-weight: 600; color: #94a3b8; }
  .status-msg { padding: 12px; border-radius: 8px; margin-bottom: 20px; text-align: center; font-weight: 600; }
  .success { background: rgba(34,197,94,0.1); color: #4ade80; border: 1px solid rgba(34,197,94,0.2); }
`;

const AboutCMS = () => {
  const [data, setData] = useState({
    about_title: '', about_description: '', team_image: '', 
    mission_text: '', vision_text: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    const { data: content } = await supabase.from('site_content').select('*').eq('page', 'about');
    if (content) {
      const formatted = {};
      content.forEach(item => { formatted[item.field_key] = item.field_value; });
      setData(prev => ({ ...prev, ...formatted }));
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });
    
    try {
      const updates = Object.keys(data).map(key => ({
        page: 'about',
        section: 'main',
        field_key: key,
        field_value: data[key],
        type: key.includes('image') ? 'image_url' : 'text'
      }));

      for (const item of updates) {
        const { data: existing } = await supabase.from('site_content').select('id').eq('page', item.page).eq('field_key', item.field_key).single();
        if (existing) {
          await supabase.from('site_content').update({ field_value: item.field_value }).eq('id', existing.id);
        } else {
          await supabase.from('site_content').insert([item]);
        }
      }

      setStatus({ type: 'success', message: 'About page content saved successfully!' });
    } catch (err) {
      setStatus({ type: 'error', message: err.message });
    }
  };

  return (
    <div className="cms-wrapper">
      <style dangerouslySetInnerHTML={{ __html: CMS_STYLE }} />
      <Sidebar />
      <div className="cms-content">
        <h1 className="cms-title">About Page CMS</h1>
        
        {status.message && <div className={`status-msg ${status.type}`}>{status.message}</div>}

        <div style={{ textAlign: 'center', padding: '40px', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.06)' }}>
          <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>About page editor fields have been removed. Content will be updated through the main Website CMS.</p>
        </div>

      </div>
    </div>
  );
};
export default AboutCMS;
