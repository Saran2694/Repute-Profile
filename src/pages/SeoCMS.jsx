import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { supabase } from '../supabaseClient';

const CMS_STYLE = `
  .cms-wrapper { display: flex; min-height: 100vh; background: #0b1120; font-family: 'Inter', sans-serif; }
  .cms-content { margin-left: 260px; padding: 40px; width: calc(100% - 260px); color: #e2e8f0; }
  .cms-title { font-size: 1.8rem; font-weight: 800; margin-bottom: 24px; color: #fff; }
  .cms-panel { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 16px; padding: 28px; }
  .cms-input { width: 100%; padding: 12px; border-radius: 8px; background: #1e293b; border: 1px solid rgba(255,255,255,0.1); color: #fff; margin-bottom: 15px; }
  .cms-btn-primary { background: #e10600; color: #fff; padding: 12px 24px; border-radius: 8px; border: none; font-weight: 600; cursor: pointer; transition: 0.3s; }
  .cms-btn-primary:hover { background: #c50500; }
  .cms-table { width: 100%; border-collapse: collapse; text-align: left; margin-top: 20px; }
  .cms-table th { background: rgba(255,255,255,0.05); padding: 15px 20px; font-weight: 700; color: #94a3b8; border-bottom: 1px solid rgba(255,255,255,0.1); }
  .cms-table td { padding: 15px 20px; border-bottom: 1px solid rgba(255,255,255,0.05); color: #e2e8f0; }
  .status-msg { padding: 12px; border-radius: 8px; margin-bottom: 20px; text-align: center; font-weight: 600; }
  .success { background: rgba(34,197,94,0.1); color: #4ade80; border: 1px solid rgba(34,197,94,0.2); }
  .error { background: rgba(239,68,68,0.1); color: #f87171; border: 1px solid rgba(239,68,68,0.2); }
`;

const SeoCMS = () => {
  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState('');
  const [data, setData] = useState({ meta_title: '', meta_description: '', keywords: '', og_image: '' });
  const [status, setStatus] = useState({ type: '', message: '' });

  useEffect(() => {
    // We'll manage standard routes here
    setPages(['home', 'about', 'portfolio', 'careers', 'contact']);
  }, []);

  useEffect(() => {
    if (selectedPage) loadSeo();
  }, [selectedPage]);

  const loadSeo = async () => {
    const { data: seo } = await supabase.from('seo_settings').select('*').eq('page', selectedPage).single();
    if (seo) setData({ meta_title: seo.meta_title || '', meta_description: seo.meta_description || '', keywords: seo.keywords || '', og_image: seo.og_image || '' });
    else setData({ meta_title: '', meta_description: '', keywords: '', og_image: '' });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!selectedPage) return;
    setStatus({ type: '', message: '' });
    try {
      const { error } = await supabase.from('seo_settings').upsert({ page: selectedPage, ...data }, { onConflict: 'page' });
      if (error) throw error;
      setStatus({ type: 'success', message: 'SEO updated successfully!' });
    } catch (err) {
      setStatus({ type: 'error', message: err.message });
    }
  };

  return (
    <div className="cms-wrapper">
      <style dangerouslySetInnerHTML={{ __html: CMS_STYLE }} />
      <Sidebar />
      <div className="cms-content">
        <h1 className="cms-title">SEO Settings</h1>
        <div className="cms-panel">
          {status.message && <div className={`status-msg ${status.type}`}>{status.message}</div>}
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{ color: '#94a3b8', display: 'block', marginBottom: '8px', fontWeight: 600 }}>Select Page</label>
            <select className="cms-input" value={selectedPage} onChange={e => setSelectedPage(e.target.value)}>
              <option value="" disabled>Choose a page</option>
              {pages.map(p => <option key={p} value={p}>{p.toUpperCase()}</option>)}
            </select>
          </div>

          {selectedPage && (
            <form onSubmit={handleSave} style={{ marginTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
              <div>
                <label style={{ display: 'block', color: '#94a3b8', marginBottom: '8px' }}>Meta Title</label>
                <input type="text" className="cms-input" value={data.meta_title} onChange={e => setData({...data, meta_title: e.target.value})} placeholder="e.g. Repute - Digital Agency" />
              </div>
              <div>
                <label style={{ display: 'block', color: '#94a3b8', marginBottom: '8px' }}>Meta Description</label>
                <textarea className="cms-input" value={data.meta_description} onChange={e => setData({...data, meta_description: e.target.value})} placeholder="Description for search engines..." style={{ minHeight: '80px', resize: 'vertical' }}></textarea>
              </div>
              <div>
                <label style={{ display: 'block', color: '#94a3b8', marginBottom: '8px' }}>Keywords (comma separated)</label>
                <input type="text" className="cms-input" value={data.keywords} onChange={e => setData({...data, keywords: e.target.value})} placeholder="agency, web design, digital marketing" />
              </div>
              <button type="submit" className="cms-btn-primary">Save SEO</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
export default SeoCMS;
