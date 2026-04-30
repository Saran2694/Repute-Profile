-- SQL to seed the entire Home Page content into Supabase
-- This will delete existing 'home' sections and insert the new detailed content

DELETE FROM site_sections WHERE page_slug = 'home';

INSERT INTO site_sections (page_slug, section_name, section_type, sort_order, content) VALUES

-- 1. Hero Section
('home', 'Hero Slider', 'hero', 1, '{
  "heading": "Is Your Brand Attracting Prospects?",
  "subtext": "Let us discuss",
  "button_text": "Repute Branding Services",
  "image_url": "/img/hero-bg.jpg"
}'),

-- 2. Web Services (What We Do)
('home', 'What We Do', 'services', 2, '{
  "tag": "What We Do",
  "heading": "Website Design & Development Services",
  "items": "Website Design: Modern, aesthetic designs that captivate your audience, Content Managed Websites: Easy-to-manage websites with flexible content control, Web Application Development: Scalable, robust web applications for your business needs, Search Engine Optimisation: Improve visibility and rank higher in search results"
}'),

-- 3. Digital Marketing (Growth Strategy)
('home', 'Growth Strategy', 'services', 3, '{
  "tag": "Growth Strategy",
  "heading": "Digital Marketing Solutions",
  "items": "Search Engine Optimisation: Organic growth through strategic SEO tactics, Social Media Marketing: Engaging campaigns that build brand loyalty, Search Engine Marketing: Targeted ads to reach your ideal customers, PPC Marketing & Management: Maximize ROI with strategic paid advertising"
}'),

-- 4. Key Statistics
('home', 'Company Stats', 'stats', 4, '{
  "stats": "18+: Years in Market, 50+: Experienced Professionals, 600+: Happy Clients"
}'),

-- 5. Who We Are (About Section)
('home', 'Who We Are', 'about', 5, '{
  "tag": "Who We Are",
  "heading": "Full Service Digital Agency",
  "text": "Repute is a Full Service Digital Agency that helps Build - Promote - Market Brands. We are focused on building relationships with our clients and community.",
  "button_text": "Learn More"
}'),

-- 6. E-Commerce Development
('home', 'Online Business', 'services', 6, '{
  "tag": "Online Business",
  "heading": "E-Commerce Development",
  "items": "Custom E-Commerce Portal: Tailored solutions built to your specifications, WooCommerce Development: Powerful WordPress-based solutions, Magento Development: Enterprise-grade platforms, Shopify Development: Quick-to-market solutions"
}'),

-- 7. Call To Action
('home', 'Work Together', 'cta', 7, '{
  "heading": "Ride high on your E-Commerce Sales",
  "subtext": "We are keen, clinical, creative and outcome-driven.",
  "button_text": "Let’s Work Together"
}'),

-- 8. Contact / Enquiry Form
('home', 'Contact Section', 'contact', 8, '{
  "tag": "Get in Touch",
  "heading": "Let’s Discuss Your Project",
  "subtext": "Fill out the form below and our team will get back to you shortly",
  "email": "support@irepute.in",
  "phone": "+91-422 4980307"
}'),

-- 9. Footer Details
('home', 'Footer Info', 'footer', 9, '{
  "about_text": "We aim high at being focused on building relationships with our clients and community. Using our creative gifts drives this foundation.",
  "phone": "+91-422 4980307",
  "email": "support@irepute.in",
  "address": "Repute Digital Business Agency, #15/9A, Sabapathi Street, Church Road, KK Pudur, Coimbatore - 641038, Tamil Nadu."
}'),

-- 10. Extra Placeholders for growth
('home', 'Extra Placeholder 1', 'custom', 10, '{"text": "Custom content section for future use."}'),
('home', 'Extra Placeholder 2', 'custom', 11, '{"text": "Custom content section for future use."}'),
('home', 'Extra Placeholder 3', 'custom', 12, '{"text": "Custom content section for future use."}');
