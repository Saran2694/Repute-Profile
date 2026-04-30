# 🚀 Repute Website - Production Deployment Guide

This project is optimized for deployment on **Netlify** and **Vercel**.

## 🛠️ Deployment Instructions (Netlify - Recommended)

1. **Connect to GitHub:** Link your repository to Netlify.
2. **Build Settings:**
   - **Build Command:** `npm run build`
   - **Publish Directory:** `build`
3. **Environment Variables:**
   Add the following in **Site Settings > Build & deploy > Environment variables**:
   - `REACT_APP_SUPABASE_URL`
   - `REACT_APP_SUPABASE_ANON_KEY`
   - `REACT_APP_EMAILJS_SERVICE_ID`
   - `REACT_APP_EMAILJS_TEMPLATE_ID`
   - `REACT_APP_EMAILJS_PUBLIC_KEY`
   - `REACT_APP_CLOUDINARY_CLOUD_NAME`
   - `REACT_APP_CLOUDINARY_UPLOAD_PRESET`
   - `CI=false` (To prevent build failure on warnings)

4. **Routing:** The project includes `public/_redirects` and `netlify.toml` to handle SPA routing.

## 🛠️ Alternative Deployment (Vercel)

1. **Import Project:** Select the repository in Vercel.
2. **Framework Preset:** `Create React App`.
3. **Environment Variables:** Add the same keys as above in **Settings > Environment Variables**.
4. **Deploy:** Vercel will use `vercel.json` for routing.

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
