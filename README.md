# 🚀 Repute Digital Business Agency — Enterprise Web Platform

---

## 📖 Project Overview

**Repute Digital Business Agency** is a comprehensive, production-grade web platform designed for one of Coimbatore's leading digital agencies. This project transcends a simple landing page, serving as a dual-facing ecosystem:

1.  **Premium Public Interface:** A high-performance, animated React application showcasing 18+ years of expertise in Web Development, Digital Marketing, E-Commerce, and Branding.
2.  **Master CMS (Administrative Suite):** A secure, private administrative dashboard that provides full CRUD (Create, Read, Update, Delete) capabilities over the entire website content without requiring code changes.

---

## 🎨 Technology Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend** | React.js (v18) | Core UI Library with Hooks |
| **Routing** | React Router DOM v6 | Single Page Application (SPA) Navigation |
| **Backend / DB** | Supabase (PostgreSQL) | Real-time database, Authentication, and Storage |
| **Styling** | Vanilla CSS + Tailwind | Custom design system with modern glassmorphism |
| **Email Service** | EmailJS | Automated lead & application notifications |
| **File Storage** | Cloudinary / Supabase | Dynamic asset management and resume hosting |
| **Icons & Fonts** | FontAwesome & Google Fonts | Professional typography (Inter, Outfit) |

---

## 🗄️ Database Architecture (Supabase/PostgreSQL)

The heart of the application is a robust **PostgreSQL** database hosted on **Supabase**. The platform leverages Supabase not just for data storage, but as a complete Backend-as-a-Service (BaaS).

### 🛰️ Supabase Integration Details
*   **PostgreSQL Database:** Handles all relational data with advanced querying capabilities.
*   **Supabase Auth:** Manages secure administrative login and session persistence.
*   **Supabase Storage:** Hosts a public `media` bucket for dynamic website assets and document uploads.
*   **Row-Level Security (RLS):** Configured to allow public read access for the website while restricting write/delete access to authenticated admins.

### 📊 Database Schema Overview
Below are the core tables and their roles:

### 1. Lead & Inquiry Management
*   **`contacts`**: Stores general inquiries from the homepage and contact page.
*   **`service_inquiries`**: Specific leads generated from individual service pages (Web Dev, SEO, etc.).

### 2. Careers Ecosystem
*   **`job_openings`**: Manages the "Immediate Hiring" section. Admins can post roles with requirements, responsibilities, and status.
*   **`applications`**: Stores applicant data, including links to resumes (hosted in the cloud) and linked to specific `job_id`s.

### 3. Dynamic Site Content (Visual CMS)
*   **`site_content`**: A key-value store used to update text, headings, and images across the Home and About pages instantly.
*   **`page_sections`**: Manages repeatable sections like homepage slides and feature grids.

### 4. Professional Showcase
*   **`projects`**: The portfolio engine. Categorizes work into Branding, Web, E-Commerce, etc.
*   **`services`**: Controls the visibility and content of the agency's service offerings.

### 5. Social & SEO
*   **`testimonials`**: Manages client reviews and ratings shown on the site.
*   **`blog_posts`**: A full-featured blog engine with slug management and status control.
*   **`contact_settings`**: Global settings for phone, email, address, and social media links.
*   **`seo_settings`**: Page-by-page Meta Title, Description, and OG Image management.
*   **`media_library`**: Tracks all files uploaded to the Supabase storage bucket for centralized management.

---

## 🔐 Master CMS — Administrative Control

The Admin Panel (`/adminpage`) is a secure gateway to the **Master CMS**, allowing the Repute team to manage:

*   **Dashboard Stats:** Real-time overview of new leads and applications.
*   **Career Manager:** Post/Close job openings instantly.
*   **Portfolio Manager:** Upload new case studies with external links or local assets.
*   **Website CMS:** Live-edit text content for the homepage sections.
*   **SEO Manager:** Optimize every page for search engines without touching HTML.
*   **Contact Manager:** Update global office details and social handles.

---

## 🚀 Netlify Deployment & Live Updates

To deploy this project to Netlify while ensuring the **Admin CMS** and **Dynamic Updates** work correctly, follow these steps:

### 1. Environment Variables
Since we have moved all sensitive keys to `.env`, you must add these same keys in the **Netlify Dashboard**:
1. Go to **Site Settings > Environment variables**.
2. Add the following variables:
   *   `REACT_APP_SUPABASE_URL`
   *   `REACT_APP_SUPABASE_ANON_KEY`
   *   `REACT_APP_EMAILJS_SERVICE_ID`
   *   `REACT_APP_EMAILJS_TEMPLATE_ID`
   *   `REACT_APP_EMAILJS_PUBLIC_KEY`
   *   `REACT_APP_CLOUDINARY_CLOUD_NAME`
   *   `REACT_APP_CLOUDINARY_UPLOAD_PRESET`

### 2. Handling Client-Side Routing
We have included a `public/_redirects` file with the following content:
```text
/*  /index.html  200
```
This ensures that if you refresh the page on `/dashboard` or `/adminpage`, Netlify correctly routes the request back to the React app instead of showing a 404 error.

### 3. Build Settings
*   **Build Command:** `npm run build`
*   **Publish Directory:** `build`

### 4. Live Dynamic Updates
Because the frontend fetches data directly from the **Supabase (PostgreSQL)** database at runtime, any changes you make in the Admin CMS will reflect on the live site **instantly** without needing a new deployment.

---

## 📂 Project Structure

```text
Repute/
├── public/                     # Static assets & images
├── src/
│   ├── components/             # Functional UI components (Sidebar, ProtectedRoute)
│   ├── pages/                  # Admin Dashboard Pages (Careers, Portfolio, CMS)
│   ├── assets/                 # Local images and media
│   ├── App.jsx                 # Core Routing & Central Logic
│   ├── SharedComponents.js     # Reusable Navbar, Footer, Icons, CTA
│   ├── supabaseClient.js       # Database connection initialization
│   └── index.css               # Global Design System & Variables
├── final_cms_schema.sql        # Core Database Schema
├── cms_extension.sql           # SEO & Global Settings Schema
└── package.json                # Dependencies & Scripts
```

---

## ⚡ Setup & Installation

### 1. Prerequisites
*   Node.js installed
*   A Supabase Project created

### 2. Installation
```bash
# Clone the repository
git clone <repo-url>

# Install dependencies
npm install
```

### 3. Database Initialization
Copy the contents of `final_cms_schema.sql` and `cms_extension.sql` into your **Supabase SQL Editor** and run them to create the necessary tables, storage buckets, and RLS policies.

### 4. Configuration
Create/Update `src/supabaseClient.js` with your credentials:
```javascript
const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY';
```

### 5. Launch
```bash
# Start development server
npm start
```
The app will be live at `http://localhost:3000`. Access the admin panel at `/adminpage`.

---

## 📞 Business Contact
*   **Agency**: Repute Digital Business Agency
*   **Website**: [www.irepute.in](https://www.irepute.in)
*   **Location**: Coimbatore, Tamil Nadu, India

---
*Created for Repute Digital Business Agency - 2024*
