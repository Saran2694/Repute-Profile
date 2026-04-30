import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { supabase } from '../supabaseClient';
import PortfolioCMS_Content from './PortfolioCMS_Content';
import CareersCMS_Content from './CareersCMS_Content';
import ContactCMS_Content from './ContactCMS_Content';

const CMS_STYLE = `
  .master-cms-wrapper { display: flex; min-height: 100vh; background: #0b1120; font-family: 'Inter', sans-serif; position: relative; }
  .master-cms-content { 
    margin-left: 260px; 
    padding: 40px; 
    min-height: 100vh;
    width: calc(100% - 260px); 
    color: #e2e8f0; 
    animation: pageEntrance 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards;
    box-sizing: border-box;
  }
  
  @keyframes pageEntrance {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .master-header { margin-bottom: 30px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 20px; display: flex; justify-content: space-between; align-items: flex-end; }
  .header-left { flex: 1; }
  .master-title { font-size: 2rem; font-weight: 800; color: #fff; margin: 0 0 15px 0; }
  .master-select { width: 100%; max-width: 400px; padding: 14px; border-radius: 10px; background: #1e293b; border: 1px solid rgba(255,255,255,0.2); color: #fff; font-size: 1rem; cursor: pointer; outline: none; }
  .master-select:focus { border-color: #e10600; box-shadow: 0 0 10px rgba(225,6,0,0.2); }
  
  .add-btn { background: linear-gradient(135deg, #e10600 0%, #a30400 100%); color: white; border: none; padding: 12px 24px; border-radius: 12px; font-weight: 700; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(225, 6, 0, 0.2); height: fit-content; }
  .add-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(225, 6, 0, 0.3); }

  .table-container { background: rgba(30, 41, 59, 0.5); border-radius: 20px; border: 1px solid rgba(255,255,255,0.1); overflow: hidden; }
  .admin-table { width: 100%; border-collapse: collapse; text-align: left; }
  .admin-table th { background: rgba(0,0,0,0.2); padding: 15px 20px; font-weight: 700; color: #94a3b8; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid rgba(255,255,255,0.05); }
  .admin-table td { padding: 15px 20px; border-bottom: 1px solid rgba(255,255,255,0.05); color: #cbd5e1; font-size: 0.95rem; }
  .section-img { width: 60px; height: 40px; object-fit: cover; border-radius: 6px; margin-right: 5px; margin-bottom: 5px; }

  .action-btn { background: none; border: none; cursor: pointer; font-weight: 600; padding: 5px 10px; border-radius: 6px; transition: background 0.2s; }
  .edit-btn { color: #3b82f6; margin-right: 10px; }
  .edit-btn:hover { background: rgba(59, 130, 246, 0.1); }
  .delete-btn { color: #ef4444; }
  .delete-btn:hover { background: rgba(239, 68, 68, 0.1); }

  .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.7); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; z-index: 1000; }
  .modal-content { background: #1e293b; padding: 30px; border-radius: 20px; width: 100%; max-width: 600px; max-height: 90vh; overflow-y: auto; border: 1px solid rgba(255,255,255,0.1); box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5); }
  .modal-content::-webkit-scrollbar { width: 6px; }
  .modal-content::-webkit-scrollbar-thumb { background: #475569; border-radius: 10px; }
  .modal-title { margin-top: 0; margin-bottom: 25px; font-weight: 800; font-size: 1.5rem; color: #fff; }
  
  .form-group { margin-bottom: 20px; }
  .form-label { display: block; margin-bottom: 8px; font-weight: 600; color: #94a3b8; }
  .form-input, .form-textarea { width: 100%; padding: 12px 16px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.1); background: #0f172a; color: #fff; font-family: inherit; font-size: 1rem; box-sizing: border-box; }
  .form-textarea { resize: vertical; min-height: 100px; }
  .form-input:focus, .form-textarea:focus { border-color: #e10600; outline: none; }
  
  .form-actions { display: flex; gap: 15px; margin-top: 30px; }
  .cancel-btn { flex: 1; padding: 12px; background: #334155; color: #fff; border: none; border-radius: 12px; font-weight: 700; cursor: pointer; transition: background 0.2s; }
  .cancel-btn:hover { background: #475569; }
  .save-btn { flex: 2; padding: 12px; background: linear-gradient(135deg, #e10600 0%, #a30400 100%); color: white; border: none; border-radius: 12px; font-weight: 700; cursor: pointer; }
  .save-btn:disabled, .cancel-btn:disabled { opacity: 0.5; cursor: not-allowed; }

  .status-msg { padding: 12px; border-radius: 10px; margin-bottom: 20px; font-weight: 600; text-align: center; font-size: 0.9rem; }
  .status-success { background: rgba(22, 163, 74, 0.2); color: #4ade80; border: 1px solid #16a34a; }
  .status-error { background: rgba(239, 68, 68, 0.2); color: #f87171; border: 1px solid #ef4444; }
  .status-loading { background: rgba(148, 163, 184, 0.2); color: #cbd5e1; border: 1px solid #64748b; }
  
  .radio-group { display: flex; gap: 20px; margin-bottom: 10px; }
  .radio-label { display: flex; align-items: center; gap: 8px; cursor: pointer; color: #cbd5e1; font-size: 0.9rem; }

  .image-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
  .image-box { background: rgba(0,0,0,0.2); padding: 15px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.05); }
  .image-box-title { font-size: 0.85rem; font-weight: 700; color: #cbd5e1; margin-bottom: 10px; text-transform: uppercase; }
`;

const MasterCMS = () => {
  const [selectedPage, setSelectedPage] = useState('home');
  const [sections, setSections] = useState([]);
  const [workServices, setWorkServices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showWorkModal, setShowWorkModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [globalContent, setGlobalContent] = useState({});
  const [isSavingGlobal, setIsSavingGlobal] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  
  const [formData, setFormData] = useState({ title: '', content: '', domain: '' });
  const [elements, setElements] = useState([{ icon: '', title: '', description: '' }]);
  
  const initialImagesState = [
    { source: 'url', file: null, url: '' },
    { source: 'url', file: null, url: '' },
    { source: 'url', file: null, url: '' },
    { source: 'url', file: null, url: '' }
  ];
  const [images, setImages] = useState(initialImagesState);

  const [viewDeleted, setViewDeleted] = useState(false);
  const [viewWorkDeleted, setViewWorkDeleted] = useState(false);

  const pages = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'career', label: 'Careers' },
    { id: 'contact', label: 'Contact' }
  ];

  useEffect(() => {
    if (['home', 'about'].includes(selectedPage)) {
      fetchSections();
      if (selectedPage === 'home') {
        fetchWorkServices();
        fetchGlobalContent();
      }
      if (selectedPage === 'about') {
        fetchGlobalContent(); // Shared logic for about page text
      }
    }
  }, [selectedPage, viewDeleted, viewWorkDeleted]);

  const fetchGlobalContent = async () => {
    try {
      const { data } = await supabase.from('site_content').select('*').eq('page', selectedPage);
      if (data) {
        const content = {};
        data.forEach(item => content[item.field_key] = item.field_value);
        setGlobalContent(content);
      }
    } catch (err) {
      console.error('Error fetching global content:', err);
    }
  };

  const handleGlobalChange = (key, value) => {
    setGlobalContent(prev => ({ ...prev, [key]: value }));
  };

  const saveGlobalContent = async () => {
    setIsSavingGlobal(true);
    try {
      const updates = Object.entries(globalContent).map(([key, value]) => ({
        page: selectedPage,
        section: 'general',
        field_key: key,
        field_value: value
      }));

      // Upsert logic
      for (const update of updates) {
        await supabase.from('site_content').upsert(update, { onConflict: 'page,field_key' });
      }
      alert('Global content updated successfully!');
    } catch (err) {
      console.error('Error saving global content:', err);
      alert('Failed to save settings.');
    } finally {
      setIsSavingGlobal(false);
    }
  };

  const fetchWorkServices = async () => {
    try {
      const slugToFetch = viewWorkDeleted ? `home_work_services_deleted` : 'home_work_services';
      const { data, error } = await supabase
        .from('page_sections')
        .select('*')
        .eq('page_slug', slugToFetch)
        .order('created_at', { ascending: true });
      
      if (error) {
        if (error.code !== '42P01') throw error;
        setWorkServices([]);
      } else {
        setWorkServices(data || []);
      }
    } catch (err) {
      console.error('Error fetching work services:', err);
    }
  };

  const fetchSections = async () => {
    try {
      const slugToFetch = viewDeleted ? `${selectedPage}_deleted` : selectedPage;
      const { data, error } = await supabase
        .from('page_sections')
        .select('*')
        .eq('page_slug', slugToFetch)
        .order('created_at', { ascending: true });
      
      if (error) {
        if (error.code === '42P01') {
          setSections([]);
        } else {
          throw error;
        }
      } else {
        setSections(data || []);
      }
    } catch (err) {
      console.error('Error fetching sections:', err);
    }
  };

  const handleImageChange = (index, field, value) => {
    const updatedImages = [...images];
    updatedImages[index][field] = value;
    setImages(updatedImages);
  };

  const handleFileChange = (index, file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const updatedImages = [...images];
      updatedImages[index].file = file;
      updatedImages[index].url = ev.target.result;
      setImages(updatedImages);
    };
    reader.readAsDataURL(file);
  };

  const uploadImageIfNecessary = async (imgState) => {
    if (imgState.source === 'upload' && imgState.file) {
      const fileExt = imgState.file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `sections/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('media')
        .upload(filePath, imgState.file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('media')
        .getPublicUrl(filePath);
      
      return publicUrl;
    }
    return imgState.url;
  };

  const handleSaveSection = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: 'loading', message: 'Saving section...' });

    try {
      // Process all 4 images
      const finalImageUrls = await Promise.all(images.map(img => uploadImageIfNecessary(img)));

      const payload = {
        title: formData.title,
        content: formData.content,
        button_text: formData.button_text || '',
        image_url: finalImageUrls[0] || '',
        image_url_2: finalImageUrls[1] || '',
        image_url_3: finalImageUrls[2] || '',
        image_url_4: finalImageUrls[3] || ''
      };

      if (isEditing) {
        const { error: updateError } = await supabase
          .from('page_sections')
          .update(payload)
          .eq('id', editingId);

        if (updateError) throw updateError;
        setStatus({ type: 'success', message: 'Section updated successfully!' });
      } else {
        const { error: insertError } = await supabase
          .from('page_sections')
          .insert([{ page_slug: selectedPage, ...payload }]);

        if (insertError) throw insertError;
        setStatus({ type: 'success', message: 'Section added successfully!' });
      }

      fetchSections();
      setTimeout(() => {
        closeModal();
      }, 1500);

    } catch (err) {
      console.error('Error saving section:', err);
      setStatus({ type: 'error', message: err.message || 'Failed to save section.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const openAddModal = () => {
    setIsEditing(false);
    setEditingId(null);
    setFormData({ title: '', content: '', button_text: '' });
    setImages(initialImagesState.map(i => ({...i})));
    setStatus({ type: '', message: '' });
    setShowModal(true);
  };

  const openEditModal = (section) => {
    setIsEditing(true);
    setEditingId(section.id);
    setFormData({ title: section.title, content: section.content, button_text: section.button_text || '' });
    
    setImages([
      { source: 'url', file: null, url: section.image_url || '' },
      { source: 'url', file: null, url: section.image_url_2 || '' },
      { source: 'url', file: null, url: section.image_url_3 || '' },
      { source: 'url', file: null, url: section.image_url_4 || '' }
    ]);
    
    setStatus({ type: '', message: '' });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Move this section to Recently Deleted?')) {
      try {
        const { error } = await supabase
          .from('page_sections')
          .update({ page_slug: `${selectedPage}_deleted` })
          .eq('id', id);

        if (error) throw error;
        fetchSections();
      } catch (err) {
        console.error('Error deleting section:', err);
        alert('Failed to delete section.');
      }
    }
  };

  const handleRestore = async (id) => {
    try {
      const { error } = await supabase
        .from('page_sections')
        .update({ page_slug: selectedPage })
        .eq('id', id);
      if (error) throw error;
      fetchSections();
    } catch (err) {
      console.error('Error restoring section:', err);
      alert('Failed to restore.');
    }
  };

  const handlePermanentDelete = async (id) => {
    if (window.confirm('Are you sure? This cannot be undone.')) {
      try {
        const { error } = await supabase.from('page_sections').delete().eq('id', id);
        if (error) throw error;
        fetchSections();
      } catch (err) {
        console.error('Error deleting permanently:', err);
        alert('Failed to delete.');
      }
    }
  };

  const handleSaveWorkService = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: 'loading', message: 'Saving Work & Services...' });

    try {
      const payload = {
        title: formData.title,
        button_text: formData.domain, 
        content: JSON.stringify(elements)
      };

      if (isEditing) {
        const { error: updateError } = await supabase
          .from('page_sections')
          .update(payload)
          .eq('id', editingId);

        if (updateError) throw updateError;
        setStatus({ type: 'success', message: 'Work & Services updated successfully!' });
      } else {
        const { error: insertError } = await supabase
          .from('page_sections')
          .insert([{ page_slug: 'home_work_services', ...payload }]);

        if (insertError) throw insertError;
        setStatus({ type: 'success', message: 'Work & Services added successfully!' });
      }

      fetchWorkServices();
      setTimeout(() => {
        closeWorkModal();
      }, 1500);

    } catch (err) {
      console.error('Error saving work service:', err);
      setStatus({ type: 'error', message: err.message || 'Failed to save.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const openAddWorkModal = () => {
    setIsEditing(false);
    setEditingId(null);
    setFormData({ title: '', content: '', domain: '' });
    setElements([{ icon: '', title: '', description: '' }]);
    setStatus({ type: '', message: '' });
    setShowWorkModal(true);
  };

  const openEditWorkModal = (work) => {
    setIsEditing(true);
    setEditingId(work.id);
    setFormData({ title: work.title, content: '', domain: work.button_text || '' });
    try {
      setElements(JSON.parse(work.content) || [{ icon: '', title: '', description: '' }]);
    } catch (e) {
      setElements([{ icon: '', title: '', description: '' }]);
    }
    setStatus({ type: '', message: '' });
    setShowWorkModal(true);
  };

  const closeWorkModal = () => {
    setShowWorkModal(false);
  };

  const handleAddElement = () => {
    setElements([...elements, { icon: '', title: '', description: '' }]);
  };

  const handleRemoveElement = (index) => {
    const newElements = elements.filter((_, i) => i !== index);
    setElements(newElements.length > 0 ? newElements : [{ icon: '', title: '', description: '' }]);
  };

  const handleElementChange = (index, field, value) => {
    const newElements = [...elements];
    newElements[index][field] = value;
    setElements(newElements);
  };

  const handleDeleteWork = async (id) => {
    if (window.confirm('Move this to Recently Deleted?')) {
      try {
        const { error } = await supabase
          .from('page_sections')
          .update({ page_slug: `home_work_services_deleted` })
          .eq('id', id);

        if (error) throw error;
        fetchWorkServices();
      } catch (err) {
        console.error('Error deleting:', err);
        alert('Failed to delete.');
      }
    }
  };

  const handleRestoreWork = async (id) => {
    try {
      const { error } = await supabase
        .from('page_sections')
        .update({ page_slug: 'home_work_services' })
        .eq('id', id);
      if (error) throw error;
      fetchWorkServices();
    } catch (err) {
      console.error('Error restoring:', err);
      alert('Failed to restore.');
    }
  };

  const handlePermanentDeleteWork = async (id) => {
    if (window.confirm('Are you sure? This cannot be undone.')) {
      try {
        const { error } = await supabase.from('page_sections').delete().eq('id', id);
        if (error) throw error;
        fetchWorkServices();
      } catch (err) {
        console.error('Error deleting permanently:', err);
        alert('Failed to delete.');
      }
    }
  };

  const handleMoveUp = async (index) => {
    if (index === 0) return;
    const current = sections[index];
    const previous = sections[index - 1];
    
    let tCurrent = new Date(current.created_at).getTime();
    let tPrev = new Date(previous.created_at).getTime();
    
    if (tCurrent === tPrev) {
      tCurrent -= 1000;
    }
    
    await Promise.all([
      supabase.from('page_sections').update({ created_at: new Date(tPrev).toISOString() }).eq('id', current.id),
      supabase.from('page_sections').update({ created_at: new Date(tCurrent).toISOString() }).eq('id', previous.id)
    ]);
    fetchSections();
  };

  const handleMoveDown = async (index) => {
    if (index === sections.length - 1) return;
    const current = sections[index];
    const next = sections[index + 1];
    
    let tCurrent = new Date(current.created_at).getTime();
    let tNext = new Date(next.created_at).getTime();
    
    if (tCurrent === tNext) {
      tCurrent += 1000;
    }
    
    await Promise.all([
      supabase.from('page_sections').update({ created_at: new Date(tNext).toISOString() }).eq('id', current.id),
      supabase.from('page_sections').update({ created_at: new Date(tCurrent).toISOString() }).eq('id', next.id)
    ]);
    fetchSections();
  };

  const renderContent = () => {
    switch (selectedPage) {
      case 'home':
        return (
          <>
            {/* ── GLOBAL TEXT CONTENT ── */}
            <div className="cms-template-box" style={{ background: '#1e293b', borderRadius: '12px', padding: '24px', border: '1px solid #334155', marginBottom: '30px' }}>
              <div className="cms-template-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '15px', borderBottom: '1px solid #334155' }}>
                <h2 style={{ margin: 0, color: '#f8fafc', fontSize: '1.4rem' }}>Global Home Content</h2>
                <button className="add-btn" onClick={saveGlobalContent} disabled={isSavingGlobal} style={{ margin: 0 }}>
                  {isSavingGlobal ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
                <div className="form-group">
                  <label className="form-label">Years of Experience</label>
                  <input type="text" className="form-input" value={globalContent.stats_years || ''} onChange={(e) => handleGlobalChange('stats_years', e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">Professionals</label>
                  <input type="text" className="form-input" value={globalContent.stats_professionals || ''} onChange={(e) => handleGlobalChange('stats_professionals', e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">Satisfied Clients</label>
                  <input type="text" className="form-input" value={globalContent.stats_clients || ''} onChange={(e) => handleGlobalChange('stats_clients', e.target.value)} />
                </div>
              </div>
            </div>

            {/* ── HERO SLIDER ── */}
            <div className="cms-template-box" style={{ background: '#1e293b', borderRadius: '12px', padding: '24px', border: '1px solid #334155', marginBottom: '30px' }}>
              <div className="cms-template-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '15px', borderBottom: '1px solid #334155' }}>
                <h2 style={{ margin: 0, color: '#f8fafc', fontSize: '1.4rem' }}>Hero Slider Template</h2>
                <div style={{ display: 'flex', gap: '15px' }}>
                  <button onClick={() => setViewDeleted(!viewDeleted)} style={{ background: 'transparent', border: '1px solid #475569', color: '#cbd5e1', padding: '10px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>
                    {viewDeleted ? 'View Active Sections' : 'Recently Deleted'}
                  </button>
                  {!viewDeleted && (
                    <button className="add-btn" onClick={openAddModal} style={{ margin: 0 }}>
                      + Add Slide
                    </button>
                  )}
                </div>
              </div>

              <div className="table-container" style={{ margin: 0 }}>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Images</th>
                      <th>Title</th>
                      <th>Catch Line</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sections.length > 0 ? (
                      sections.map((sec, index) => {
                        const allImages = [sec.image_url, sec.image_url_2, sec.image_url_3, sec.image_url_4].filter(Boolean);
                        return (
                          <tr key={sec.id}>
                            <td>
                              {allImages.length > 0 ? (
                                <div style={{ display: 'flex', flexWrap: 'wrap', maxWidth: '140px' }}>
                                  {allImages.map((img, idx) => (
                                    <img key={idx} src={img} alt="" className="section-img" />
                                  ))}
                                </div>
                              ) : (
                                <span style={{ color: '#64748b' }}>No Images</span>
                              )}
                            </td>
                            <td style={{ fontWeight: 600 }}>{sec.title}</td>
                            <td>{sec.content && sec.content.length > 60 ? sec.content.substring(0, 60) + '...' : (sec.content || '')}</td>
                            <td>
                              {viewDeleted ? (
                                <button className="action-btn edit-btn" style={{ color: '#10b981' }} onClick={() => handleRestore(sec.id)}>Restore</button>
                              ) : (
                                <>
                                  <button className="action-btn" disabled={index === 0} onClick={() => handleMoveUp(index)}>↑</button>
                                  <button className="action-btn" disabled={index === sections.length - 1} onClick={() => handleMoveDown(index)}>↓</button>
                                  <button className="action-btn edit-btn" style={{ marginLeft: '10px' }} onClick={() => openEditModal(sec)}>Edit</button>
                                  <button className="action-btn delete-btn" onClick={() => handleDelete(sec.id)}>Delete</button>
                                </>
                              )}
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr><td colSpan="4" style={{ textAlign: 'center', padding: '30px' }}>No slides found.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* ── WORK & SERVICES ── */}
            <div className="cms-template-box" style={{ background: '#1e293b', borderRadius: '12px', padding: '24px', border: '1px solid #334155', marginBottom: '30px' }}>
              <div className="cms-template-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '15px', borderBottom: '1px solid #334155' }}>
                <h2 style={{ margin: 0, color: '#f8fafc', fontSize: '1.4rem' }}>Work & Services</h2>
                <div style={{ display: 'flex', gap: '15px' }}>
                  <button onClick={() => setViewWorkDeleted(!viewWorkDeleted)} style={{ background: 'transparent', border: '1px solid #475569', color: '#cbd5e1', padding: '10px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>
                    {viewWorkDeleted ? 'View Active Sections' : 'Recently Deleted'}
                  </button>
                  {!viewWorkDeleted && (
                    <button className="add-btn" onClick={openAddWorkModal} style={{ margin: 0 }}>
                      + Add Section
                    </button>
                  )}
                </div>
              </div>

              <div className="table-container" style={{ margin: 0 }}>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Domain Name</th>
                      <th>Title</th>
                      <th>Elements</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {workServices.length > 0 ? (
                      workServices.map((work) => {
                        let parsedElements = [];
                        try { parsedElements = JSON.parse(work.content) || []; } catch(e) {}
                        return (
                          <tr key={work.id}>
                            <td style={{ fontWeight: 600 }}>{work.button_text}</td>
                            <td>{work.title}</td>
                            <td>{parsedElements.length} Item(s)</td>
                            <td>
                              {viewWorkDeleted ? (
                                <button className="action-btn edit-btn" style={{ color: '#10b981' }} onClick={() => handleRestoreWork(work.id)}>Restore</button>
                              ) : (
                                <>
                                  <button className="action-btn edit-btn" onClick={() => openEditWorkModal(work)}>Edit</button>
                                  <button className="action-btn delete-btn" onClick={() => handleDeleteWork(work.id)}>Delete</button>
                                </>
                              )}
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr><td colSpan="4" style={{ textAlign: 'center', padding: '30px' }}>No Work & Services found.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        );

      case 'about':
        return (
          <>


            {/* ── DYNAMIC SECTIONS ── */}
            <div className="cms-template-box" style={{ background: '#1e293b', borderRadius: '12px', padding: '24px', border: '1px solid #334155', marginBottom: '30px' }}>
              <div className="cms-template-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '15px', borderBottom: '1px solid #334155' }}>
                <h2 style={{ margin: 0, color: '#f8fafc', fontSize: '1.4rem' }}>Dynamic Content Sections</h2>
                <div style={{ display: 'flex', gap: '15px' }}>
                  <button onClick={() => setViewDeleted(!viewDeleted)} style={{ background: 'transparent', border: '1px solid #475569', color: '#cbd5e1', padding: '10px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>
                    {viewDeleted ? 'View Active Sections' : 'Recently Deleted'}
                  </button>
                  {!viewDeleted && (
                    <button className="add-btn" onClick={openAddModal} style={{ margin: 0 }}>
                      + Add Section
                    </button>
                  )}
                </div>
              </div>

              <div className="table-container" style={{ margin: 0 }}>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Images</th>
                      <th>Title</th>
                      <th>Content Snippet</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sections.length > 0 ? (
                      sections.map((sec, index) => {
                        const allImages = [sec.image_url, sec.image_url_2, sec.image_url_3, sec.image_url_4].filter(Boolean);
                        return (
                          <tr key={sec.id}>
                            <td>
                              {allImages.length > 0 ? (
                                <div style={{ display: 'flex', flexWrap: 'wrap', maxWidth: '140px' }}>
                                  {allImages.map((img, idx) => (
                                    <img key={idx} src={img} alt="" className="section-img" />
                                  ))}
                                </div>
                              ) : (
                                <span style={{ color: '#64748b' }}>No Images</span>
                              )}
                            </td>
                            <td style={{ fontWeight: 600 }}>{sec.title}</td>
                            <td>{sec.content && sec.content.length > 60 ? sec.content.substring(0, 60) + '...' : (sec.content || '')}</td>
                            <td>
                              {viewDeleted ? (
                                <button className="action-btn edit-btn" style={{ color: '#10b981' }} onClick={() => handleRestore(sec.id)}>Restore</button>
                              ) : (
                                <>
                                  <button className="action-btn" disabled={index === 0} onClick={() => handleMoveUp(index)}>↑</button>
                                  <button className="action-btn" disabled={index === sections.length - 1} onClick={() => handleMoveDown(index)}>↓</button>
                                  <button className="action-btn edit-btn" style={{ marginLeft: '10px' }} onClick={() => openEditModal(sec)}>Edit</button>
                                  <button className="action-btn delete-btn" onClick={() => handleDelete(sec.id)}>Delete</button>
                                </>
                              )}
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr><td colSpan="4" style={{ textAlign: 'center', padding: '30px' }}>No sections found.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        );
      case 'portfolio':
        return <PortfolioCMS_Content />;
      case 'career':
        return <CareersCMS_Content />;
      case 'contact':
        return <ContactCMS_Content />;
      default:
        return (
          <div style={{ padding: '60px', textAlign: 'center', background: 'rgba(30, 41, 59, 0.5)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <h2 style={{ color: '#f8fafc', marginBottom: '15px' }}>Coming Soon</h2>
            <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>The Content Manager for the <strong>{pages.find(p => p.id === selectedPage)?.label}</strong> page is currently under development.</p>
          </div>
        );
    }
  };

  return (
    <div className="master-cms-wrapper">
      <style dangerouslySetInnerHTML={{ __html: CMS_STYLE }} />
      <Sidebar />
      <div className="master-cms-content">
        
        <div className="master-header">
          <div className="header-left">
            <h1 className="master-title">Website CMS</h1>
            <p style={{ color: '#94a3b8', marginBottom: '15px' }}>Select a page to edit its dynamic sections.</p>
            <select 
              className="master-select" 
              value={selectedPage} 
              onChange={(e) => { setSelectedPage(e.target.value); setViewDeleted(false); }}
            >
              {pages.map(p => (
                <option key={p.id} value={p.id}>{p.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="master-body">
          {renderContent()}
        </div>

      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="modal-title">{isEditing ? 'Edit Section' : 'Add New Section'}</h2>
            
            {status.type && (
              <div className={`status-msg status-${status.type}`}>
                {status.message}
              </div>
            )}

            <form onSubmit={handleSaveSection}>
              <div className="form-group">
                <label className="form-label">Section Title</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. Hero Section, About Content..." 
                  required 
                  value={formData.title} 
                  onChange={(e) => setFormData({...formData, title: e.target.value})} 
                />
              </div>

              {selectedPage === 'home' && (
                <div className="form-group">
                  <label className="form-label">Button Text (Optional)</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g. Learn More" 
                    value={formData.button_text || ''} 
                    onChange={(e) => setFormData({...formData, button_text: e.target.value})} 
                  />
                </div>
              )}

              <div className="form-group">
                <label className="form-label">{selectedPage === 'home' ? 'Catch Line' : 'Content / HTML'}</label>
                <textarea 
                  className="form-textarea" 
                  placeholder={selectedPage === 'home' ? "Enter catch line..." : "Enter section content or HTML..."}
                  required 
                  value={formData.content} 
                  onChange={(e) => setFormData({...formData, content: e.target.value})} 
                ></textarea>
              </div>

              <label className="form-label" style={{ marginTop: '30px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>Images ({selectedPage === 'home' ? 'Max 1' : 'Max 4'})</label>
              
              <div className="image-grid">
                {images.slice(0, selectedPage === 'home' ? 1 : 4).map((imgState, index) => (
                  <div key={index} className="image-box">
                    <div className="image-box-title">Image {index + 1}</div>
                    <div className="radio-group">
                      <label className="radio-label">
                        <input type="radio" checked={imgState.source === 'upload'} onChange={() => handleImageChange(index, 'source', 'upload')} /> Upload
                      </label>
                      <label className="radio-label">
                        <input type="radio" checked={imgState.source === 'url'} onChange={() => handleImageChange(index, 'source', 'url')} /> URL
                      </label>
                    </div>
                    {imgState.source === 'upload' ? (
                      <>
                        <input type="file" accept="image/*" className="form-input" style={{ padding: '8px', fontSize: '0.85rem' }} onChange={(e) => handleFileChange(index, e.target.files[0])} />
                        {imgState.url && imgState.file && (
                          <div style={{ marginTop: '10px' }}>
                            <img src={imgState.url} alt="Preview" style={{ width: '100%', height: '80px', objectFit: 'cover', borderRadius: '8px' }} />
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        <input type="url" className="form-input" style={{ padding: '8px', fontSize: '0.85rem' }} placeholder="https://..." value={imgState.url} onChange={(e) => handleImageChange(index, 'url', e.target.value)} />
                        {imgState.url && imgState.source === 'url' && (
                          <div style={{ marginTop: '10px' }}>
                            <img src={imgState.url} alt="Preview" style={{ width: '100%', height: '80px', objectFit: 'cover', borderRadius: '8px' }} onError={(e) => e.target.style.display='none'} />
                          </div>
                        )}
                      </>
                    )}
                  </div>
                ))}
              </div>

              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={closeModal} disabled={isSubmitting}>Cancel</button>
                <button type="submit" className="save-btn" disabled={isSubmitting}>
                  {isSubmitting ? 'Saving...' : (isEditing ? 'Update Section' : 'Add Section')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showWorkModal && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '800px' }}>
            <h2 className="modal-title">{isEditing ? 'Edit Work & Services' : 'Add Work & Services'}</h2>
            
            {status.type && (
              <div className={`status-msg status-${status.type}`}>
                {status.message}
              </div>
            )}

            <form onSubmit={handleSaveWorkService}>
              <div className="image-grid" style={{ marginBottom: '20px' }}>
                <div className="form-group">
                  <label className="form-label">Domain Name</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g. Web Development" 
                    required 
                    value={formData.domain} 
                    onChange={(e) => setFormData({...formData, domain: e.target.value})} 
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Title</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g. Our Web Services" 
                    required 
                    value={formData.title} 
                    onChange={(e) => setFormData({...formData, title: e.target.value})} 
                  />
                </div>
              </div>

              <label className="form-label" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px', marginBottom: '15px' }}>
                Elements (Icons, Titles, Descriptions)
              </label>

              {elements.map((el, index) => (
                <div key={index} style={{ background: 'rgba(0,0,0,0.2)', padding: '15px', borderRadius: '12px', marginBottom: '15px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span style={{ color: '#cbd5e1', fontWeight: 600 }}>Element {index + 1}</span>
                    {elements.length > 1 && (
                      <button type="button" className="action-btn delete-btn" onClick={() => handleRemoveElement(index)} style={{ padding: '4px 8px' }}>Remove</button>
                    )}
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '15px', marginBottom: '15px' }}>
                    <div>
                      <label className="form-label" style={{ fontSize: '0.85rem' }}>Icon Class (e.g. fas fa-code)</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        placeholder="Icon..." 
                        required 
                        value={el.icon} 
                        onChange={(e) => handleElementChange(index, 'icon', e.target.value)} 
                      />
                    </div>
                    <div>
                      <label className="form-label" style={{ fontSize: '0.85rem' }}>Title</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        placeholder="Title..." 
                        required 
                        value={el.title} 
                        onChange={(e) => handleElementChange(index, 'title', e.target.value)} 
                      />
                    </div>
                  </div>
                  <div>
                    <label className="form-label" style={{ fontSize: '0.85rem' }}>Description</label>
                    <textarea 
                      className="form-textarea" 
                      placeholder="Description..." 
                      required 
                      value={el.description} 
                      onChange={(e) => handleElementChange(index, 'description', e.target.value)}
                      style={{ minHeight: '60px' }}
                    ></textarea>
                  </div>
                </div>
              ))}

              <button type="button" className="add-btn" onClick={handleAddElement} style={{ width: '100%', marginBottom: '20px', padding: '10px', fontSize: '0.9rem' }}>
                + Add Another Element
              </button>

              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={closeWorkModal} disabled={isSubmitting}>Cancel</button>
                <button type="submit" className="save-btn" disabled={isSubmitting}>
                  {isSubmitting ? 'Saving...' : (isEditing ? 'Update Section' : 'Add Section')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default MasterCMS;
