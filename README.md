# 🚀 Repute Project - Comprehensive Technical Documentation

Welcome to the **Repute** technical documentation. This guide provides a top-to-bottom explanation of the project's architecture, file structure, database integration, and administrative capabilities.

---

## 🏗️ Project Overview
Repute is a high-performance, dynamic web application built with **React**. It serves as a professional agency platform featuring integrated content management, real-time database updates, and automated inquiry handling.

### Core Technology Stack:
1.  **Frontend:** React.js (Create React App)
2.  **Backend & Database:** Supabase (PostgreSQL)
3.  **Styling:** Vanilla CSS + Tailwind CSS (Directives)
4.  **Inquiry Handling:** EmailJS
5.  **Media Storage:** Cloudinary & Supabase Storage

---

## 🗺️ Page Structure Tree
The application is divided into three main zones: **Public Site**, **Service Landing Pages**, and the **Admin Dashboard**.

```text
ROOT (/)
├── Public Pages
│   ├── /about (About Us)
│   ├── /career (Job Board)
│   │   ├── /apply (Application Form)
│   │   ├── /graphic-designer (Job Details)
│   │   └── /video-editing-intern (Job Details)
│   ├── /portfolio (Project Showcase)
│   └── /contact (Get in Touch)
│
├── Service Landing Pages
│   ├── /brand-creatives
│   ├── /web-development
│   ├── /ecommerce
│   ├── /branding-solutions
│   ├── /mobile-development
│   ├── /integrated-ecommerce
│   └── /digital-marketing
│
└── Admin Panel (/adminpage)
    └── /dashboard
        ├── /portfolio (Manage Projects)
        ├── /careers (Manage Jobs)
        ├── /inquiries (General Contacts)
        ├── /applications (Candidate Resumes)
        ├── /service-inquiries (Lead Tracking)
        └── /master-cms (Unified Content Editor)
```

---

## 🔄 User Workflows

### 1. Visitor Workflow (The Customer)
- **Discovery**: Visitor lands on the Homepage (`/`) or a specific Service page (e.g., `/web-development`).
- **Inquiry**: Visitor fills out a contact form or service-specific inquiry.
  - **Action**: Data is saved to Supabase (`contacts` or `service_inquiries` table) and a notification is sent via EmailJS.
- **Career Path**: Visitor browses `/career`, views a job, and submits an application at `/apply`.
  - **Action**: Resume and details are stored in Supabase (`applications` table).

### 2. Admin Workflow (The Manager)
- **Authentication**: Admin logs in via `/adminpage` using Supabase Auth.
- **Content Management**: Admin visits `/dashboard/master-cms` to update text, images, or SEO settings.
  - **Action**: Admin hits "Save", and the `website_settings` table in Supabase is updated.
- **Lead Management**: Admin reviews new inquiries in `/dashboard/inquiries` and evaluates candidate resumes in `/dashboard/applications`.

---

## 📂 Directory & File Breakdown

### 🛠️ Root Configuration Files
- **`package.json`**: Defines project dependencies and scripts. Includes a `prebuild` hook to run asset migration.
- **`.env`**: (Local only) Stores sensitive API keys for Supabase, EmailJS, and Cloudinary.
- **`copy-assets.js`**: A utility script used during the build process to ensure local assets are correctly mapped to the production directory.
- **`final_cms_schema.sql`**: The "source of truth" for the database. Contains the SQL commands to rebuild the entire Supabase environment.

### 💻 Source Directory (`/src`)
- **`App.jsx`**: The main controller. Handles global routing (`react-router-dom`) and manages homepage state.
- **`supabaseClient.js`**: Configures the connection between the frontend and the Supabase database.
- **`SharedComponents.js`**: Contains reusable UI elements like **Navbar**, **Footer**, and **CTA Sections**.
- **`/src/pages`**: Contains the logic for all site sections and the comprehensive Admin Dashboard modules.

---

## 🗄️ Backend & Database Architecture

### The Backend Engine: Supabase
The project utilizes **Supabase** as a Backend-as-a-Service (BaaS) provider. Unlike traditional backends that require a separate Node.js/Express server, Supabase allows the frontend to communicate directly with the database via a secure API client.

#### Key Backend Components:
1.  **PostgreSQL Database**: The core of the backend. A robust, relational database that stores all site data.
2.  **Supabase Auth**: Manages administrative access to the dashboard. It uses JWT (JSON Web Tokens) to ensure only authorized users can access sensitive CMS modules.
3.  **Supabase Storage**: A dedicated cloud storage system used for hosting files like candidate resumes and project assets.
4.  **Edge Functions (Optional Logic)**: Can be used for server-side logic, though most operations in this project are handled via direct database queries.

### Detailed Database Schema (PostgreSQL):

| Table Name | Primary Function | Technical Details |
| :--- | :--- | :--- |
| **`contacts`** | Lead Collection | Stores general inquiries from the `/contact` page. Includes `name`, `email`, `phone`, `subject`, and `status`. |
| **`job_openings`** | HR Management | Stores job postings. Features a `JSONB` column for dynamic lists of responsibilities and requirements. |
| **`applications`** | Recruitment | Links to `job_openings`. Stores candidate details and `resume_url` from Supabase Storage. |
| **`site_content`** | Universal CMS | A key-value store for page content. Allows updating sections like "Hero Text" or "About Description" without code changes. |
| **`projects`** | Portfolio Grid | Stores data for the portfolio showcase. Includes `is_deleted` flags for soft-deletion. |
| **`services`** | Service Catalog | Manages the dynamic listing of agency services, including custom icons and slugs for SEO. |
| **`testimonials`** | Social Proof | Stores client reviews, company names, and 1-5 star ratings. |
| **`blog_posts`** | Content Marketing | A full blog schema with `slug` optimization, `content` (Markdown/HTML), and `published_at` timestamps. |
| **`contact_settings`** | Global Info | Stores global phone, address, and social media URLs used in the Footer and Contact page. |
| **`seo_settings`** | SEO Engine | Maps specific page paths to `meta_title`, `meta_description`, and `og_image` for social sharing. |

---

## 🛡️ Admin Panel & Security
The Admin Panel is the heart of the project's maintainability.

- **Protected Routes**: Every route starting with `/dashboard` is wrapped in a `<ProtectedRoute>` component. This component checks the user's session with Supabase Auth.
- **Real-Time Dashboard**: The dashboard modules (Inquiries, Applications) use Supabase's real-time listeners. When a visitor submits a form, the admin sees the new entry appear instantly.
- **Cloudinary Integration**: For high-performance image delivery, images uploaded via the CMS are stored in Cloudinary, which provides automatic resizing and optimization.

---

## 🚀 Running Locally
To run this project on your local machine:
1.  Ensure you have **Node.js** installed.
2.  Install dependencies: `npm install`
3.  Set up your `.env` file with your Supabase and EmailJS keys.
4.  Start the development server: `npm start`
5.  Access the site at `http://localhost:3000`.
6.  Access the admin panel at `http://localhost:3000/adminpage`.