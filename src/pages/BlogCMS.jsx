import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { supabase } from '../supabaseClient';

const CMS_STYLE = `
  .cms-wrapper { display: flex; min-height: 100vh; background: #0b1120; font-family: 'Inter', sans-serif; }
  .cms-content { margin-left: 260px; padding: 40px; width: calc(100% - 260px); color: #e2e8f0; }
  .cms-title { font-size: 1.8rem; font-weight: 800; margin-bottom: 24px; color: #fff; }
  .cms-panel { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 16px; padding: 28px; }
  .cms-input { width: 100%; padding: 12px; border-radius: 8px; background: #1e293b; border: 1px solid rgba(255,255,255,0.1); color: #fff; margin-bottom: 15px; }
  .cms-textarea { width: 100%; padding: 12px; border-radius: 8px; background: #1e293b; border: 1px solid rgba(255,255,255,0.1); color: #fff; min-height: 300px; margin-bottom: 15px; resize: vertical; }
  .cms-btn-primary { background: #e10600; color: #fff; padding: 10px 20px; border-radius: 8px; border: none; font-weight: 600; cursor: pointer; transition: 0.3s; }
  .cms-btn-primary:hover { background: #c50500; }
  .cms-btn-danger { background: #ef4444; color: #fff; padding: 6px 12px; border-radius: 6px; border: none; font-weight: 600; cursor: pointer; font-size: 0.8rem; }
  .cms-table { width: 100%; border-collapse: collapse; text-align: left; margin-top: 20px; }
  .cms-table th { background: rgba(255,255,255,0.05); padding: 15px 20px; font-weight: 700; color: #94a3b8; border-bottom: 1px solid rgba(255,255,255,0.1); }
  .cms-table td { padding: 15px 20px; border-bottom: 1px solid rgba(255,255,255,0.05); color: #e2e8f0; }
  .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.8); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; z-index: 100; padding: 40px; }
  .modal-content { background: #1e293b; padding: 30px; border-radius: 20px; width: 100%; max-width: 900px; max-height: 90vh; overflow-y: auto; border: 1px solid rgba(255,255,255,0.1); }
  .status-msg { padding: 12px; border-radius: 8px; margin-bottom: 20px; text-align: center; font-weight: 600; }
`;

const BlogCMS = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ title: '', slug: '', content: '', image_url: '', status: 'published' });

  useEffect(() => { loadBlogs(); }, []);

  const loadBlogs = async () => {
    setLoading(true);
    const { data } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false });
    if (data) setBlogs(data);
    setLoading(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const slug = formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      const { error } = await supabase.from('blog_posts').insert([{ ...formData, slug }]);
      if (error) throw error;
      loadBlogs();
      setShowModal(false);
      setFormData({ title: '', slug: '', content: '', image_url: '', status: 'published' });
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this post?')) return;
    await supabase.from('blog_posts').delete().eq('id', id);
    loadBlogs();
  };

  return (
    <div className="cms-wrapper">
      <style dangerouslySetInnerHTML={{ __html: CMS_STYLE }} />
      <Sidebar />
      <div className="cms-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 className="cms-title">Blog Manager</h1>
          <button className="cms-btn-primary" onClick={() => setShowModal(true)}>+ Write Post</button>
        </div>
        
        <div className="cms-panel">
          {loading ? <p style={{ color: '#94a3b8' }}>Loading...</p> : (
            <table className="cms-table">
              <thead><tr><th>Title</th><th>Status</th><th>Date</th><th>Actions</th></tr></thead>
              <tbody>
                {blogs.map(b => (
                  <tr key={b.id}>
                    <td style={{ fontWeight: 600 }}>{b.title}</td>
                    <td><span style={{ padding: '4px 8px', borderRadius: '4px', background: b.status === 'published' ? 'rgba(34,197,94,0.1)' : 'rgba(255,255,255,0.1)', color: b.status === 'published' ? '#4ade80' : '#fff', fontSize: '0.8rem', textTransform: 'uppercase' }}>{b.status}</span></td>
                    <td>{new Date(b.created_at).toLocaleDateString()}</td>
                    <td><button className="cms-btn-danger" onClick={() => handleDelete(b.id)}>Delete</button></td>
                  </tr>
                ))}
                {blogs.length === 0 && <tr><td colSpan="4" style={{ textAlign: 'center', color: '#94a3b8' }}>No blog posts yet.</td></tr>}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 style={{ marginTop: 0, color: '#fff' }}>Write New Post</h2>
            <form onSubmit={handleSave}>
              <input type="text" className="cms-input" placeholder="Post Title" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
              <input type="text" className="cms-input" placeholder="Featured Image URL (Paste from Media Library)" value={formData.image_url} onChange={e => setFormData({...formData, image_url: e.target.value})} />
              <select className="cms-input" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
              <textarea className="cms-textarea" placeholder="Write your post content here (HTML supported)..." required value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})}></textarea>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button type="button" className="cms-btn-primary" style={{ background: 'transparent', border: '1px solid #e10600', flex: 1 }} onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="cms-btn-primary" style={{ flex: 1 }}>Publish</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default BlogCMS;
