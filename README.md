# 🚀 Repute Website - Production Deployment Guide

This project is optimized for deployment on **Vercel**.

## 🛠️ Deployment Instructions (Vercel - Recommended)

1. **Import Project:** Select your repository in the Vercel dashboard.
2. **Framework Preset:** Choose `Create React App`.
3. **Environment Variables:**
   Add the following in **Settings > Environment Variables**:
   - `REACT_APP_SUPABASE_URL`
   - `REACT_APP_SUPABASE_ANON_KEY`
   - `REACT_APP_EMAILJS_SERVICE_ID`
   - `REACT_APP_EMAILJS_TEMPLATE_ID`
   - `REACT_APP_EMAILJS_PUBLIC_KEY`
   - `REACT_APP_CLOUDINARY_CLOUD_NAME`
   - `REACT_APP_CLOUDINARY_UPLOAD_PRESET`
   - `CI=false` (To prevent build failure on warnings)

4. **Deploy:** Vercel will automatically use `vercel.json` for SPA routing.

## 🛠️ Alternative Deployment (Netlify)

1. **Connect to GitHub:** Link your repository to Netlify.
2. **Build Settings:**
   - **Build Command:** `npm run build`
   - **Publish Directory:** `build`
3. **Environment Variables:** Add the same keys as above in **Site Settings > Build & deploy > Environment variables**.
4. **Routing:** Netlify handles routing via `public/_redirects` and `netlify.toml`.

---

## 🏗️ Technical Architecture

### 📊 Database (Supabase / PostgreSQL)
The site is powered by a Supabase backend. All dynamic content (Portfolio, Careers, Testimonials, Inquiries) is stored in PostgreSQL tables.

### 🏠 Master CMS (Administrative Panel)
The project features a full-featured CMS located at `/admin`.
- **Live Editing:** Changes made in the CMS reflect immediately on the site without redeployment.
- **Media Management:** Integrated with Cloudinary/Supabase for asset storage.

### 🛡️ Security
- **Environment Variables:** All API keys are secured via `.env` files and deployment secrets.
- **Protected Routes:** Administrative pages are protected by Supabase Auth.

---

## 📂 Project Structure
- `/src/pages`: Main application pages and CMS modules.
- `/src/components`: Reusable UI components.
- `copy-assets.js`: Script to handle local asset migration during build.
- `final_cms_schema.sql`: Full database schema for Supabase setup.
