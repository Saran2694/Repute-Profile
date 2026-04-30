import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { supabase } from '../supabaseClient';

const CMS_STYLE = `
  .cms-wrapper { display: flex; min-height: 100vh; background: #0b1120; font-family: 'Inter', sans-serif; }
  .cms-content { margin-left: 260px; padding: 40px; width: calc(100% - 260px); color: #e2e8f0; }
  .cms-title { font-size: 1.8rem; font-weight: 800; margin-bottom: 24px; color: #fff; }
  .cms-panel { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 16px; padding: 28px; }
  .cms-btn-primary { background: #e10600; color: #fff; padding: 10px 20px; border-radius: 8px; border: none; font-weight: 600; cursor: pointer; transition: 0.3s; }
  .cms-btn-primary:hover { background: #c50500; }
  .cms-btn-danger { background: #ef4444; color: #fff; padding: 6px 12px; border-radius: 6px; border: none; font-weight: 600; cursor: pointer; font-size: 0.8rem; }
  .media-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 20px; margin-top: 20px; }
  .media-card { background: #1e293b; border-radius: 12px; overflow: hidden; border: 1px solid rgba(255,255,255,0.1); }
  .media-img { width: 100%; height: 150px; object-fit: cover; }
  .media-info { padding: 12px; }
  .media-name { font-size: 0.85rem; color: #fff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-bottom: 8px; }
  .copy-btn { background: rgba(255,255,255,0.1); color: #fff; padding: 4px 8px; border-radius: 4px; border: none; cursor: pointer; font-size: 0.75rem; margin-right: 5px; }
  .copy-btn:hover { background: rgba(255,255,255,0.2); }
  .upload-area { border: 2px dashed rgba(255,255,255,0.2); padding: 40px; text-align: center; border-radius: 16px; cursor: pointer; transition: 0.3s; margin-bottom: 30px; }
  .upload-area:hover { border-color: rgba(255,255,255,0.4); background: rgba(255,255,255,0.02); }
  .status-msg { padding: 12px; border-radius: 8px; margin-bottom: 20px; text-align: center; font-weight: 600; }
`;

const MediaLibraryCMS = () => {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => { loadMedia(); }, []);

  const loadMedia = async () => {
    setLoading(true);
    const { data } = await supabase.from('media_library').select('*').order('created_at', { ascending: false });
    if (data) setMedia(data);
    setLoading(false);
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('media')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('media')
        .getPublicUrl(filePath);

      if (publicUrl) {
        await supabase.from('media_library').insert([{ file_name: file.name, file_url: publicUrl, file_type: file.type }]);
        loadMedia();
      }
    } catch (err) {
      alert("Upload failed: " + err.message);
    }
    setUploading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this media?")) return;
    await supabase.from('media_library').delete().eq('id', id);
    loadMedia();
  };

  const copyToClipboard = (url) => {
    navigator.clipboard.writeText(url);
    alert('URL Copied!');
  };

  return (
    <div className="cms-wrapper">
      <style dangerouslySetInnerHTML={{ __html: CMS_STYLE }} />
      <Sidebar />
      <div className="cms-content">
        <h1 className="cms-title">Media Library</h1>
        <div className="cms-panel">
          
          <label className="upload-area" style={{ display: 'block' }}>
            <input type="file" style={{ display: 'none' }} onChange={handleUpload} accept="image/*,application/pdf" disabled={uploading} />
            <div style={{ fontSize: '2rem', marginBottom: '10px' }}>📁</div>
            <h3 style={{ color: '#fff', margin: '0 0 10px 0' }}>{uploading ? 'Uploading...' : 'Click to Upload Media'}</h3>
            <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.9rem' }}>Supports JPG, PNG, PDF</p>
          </label>

          <h2 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}>Your Media</h2>
          
          {loading ? <p style={{ color: '#94a3b8' }}>Loading...</p> : (
            <div className="media-grid">
              {media.map(m => (
                <div key={m.id} className="media-card">
                  {m.file_type?.includes('image') ? (
                    <img src={m.file_url} alt={m.file_name} className="media-img" />
                  ) : (
                    <div style={{ height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#334155', color: '#fff' }}>PDF</div>
                  )}
                  <div className="media-info">
                    <div className="media-name" title={m.file_name}>{m.file_name}</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <button className="copy-btn" onClick={() => copyToClipboard(m.file_url)}>Copy URL</button>
                      <button className="cms-btn-danger" onClick={() => handleDelete(m.id)}>Delete</button>
                    </div>
                  </div>
                </div>
              ))}
              {media.length === 0 && <p style={{ color: '#94a3b8', gridColumn: '1 / -1' }}>No media uploaded yet.</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default MediaLibraryCMS;
