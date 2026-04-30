import { supabase } from '../supabaseClient';

/* -------------------------------------------------
   PAGES
------------------------------------------------- */
export const getPages = () =>
  supabase.from('site_pages').select('*').order('id', { ascending: true });

export const getPageBySlug = (slug) =>
  supabase.from('site_pages').select('*').eq('slug', slug).single();

export const updatePage = (id, data) =>
  supabase.from('site_pages').update(data).eq('id', id);

/* -------------------------------------------------
   SECTIONS
------------------------------------------------- */
export const getSections = (pageSlug) =>
  supabase
    .from('site_sections')
    .select('*')
    .eq('page_slug', pageSlug)
    .order('sort_order', { ascending: true });

export const createSection = (data) =>
  supabase.from('site_sections').insert([data]).select();

export const updateSection = (id, data) =>
  supabase.from('site_sections').update(data).eq('id', id).select();

export const deleteSection = (id) =>
  supabase.from('site_sections').delete().eq('id', id);

/* -------------------------------------------------
   SETTINGS
------------------------------------------------- */
export const getSettings = () =>
  supabase.from('site_settings').select('*');

export const updateSetting = (key, value) =>
  supabase
    .from('site_settings')
    .upsert(
      { setting_key: key, setting_value: value },
      { onConflict: 'setting_key' }
    );

/* -------------------------------------------------
   MEDIA LIBRARY (Cloudinary-backed)
------------------------------------------------- */
const uploadToCloudinary = async (file) => {
  const form = new FormData();
  form.append('file', file);
  form.append('upload_preset', 'resumes_upload');

  const res = await fetch(
    'https://api.cloudinary.com/v1_1/dnkwxs0uh/auto/upload',
    { method: 'POST', body: form }
  );

  if (!res.ok) throw new Error('Cloudinary upload failed');
  const data = await res.json();
  return data.secure_url;
};

export const uploadMedia = async (file) => {
  const url = await uploadToCloudinary(file);
  const { data, error } = await supabase
    .from('media_library')
    .insert([{ file_name: file.name, file_url: url, file_type: file.type }])
    .select();
  if (error) throw error;
  return { url, record: data?.[0] };
};

export const getMedia = () =>
  supabase.from('media_library').select('*').order('created_at', { ascending: false });

export const deleteMedia = (id) =>
  supabase.from('media_library').delete().eq('id', id);
