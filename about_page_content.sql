-- Seed content for About Us page in site_sections table
-- Run this in the Supabase SQL Editor

DELETE FROM site_sections WHERE page_slug = 'about';

INSERT INTO site_sections (page_slug, section_name, section_type, sort_order, content) VALUES
(
  'about', 
  'About Us Hero', 
  'hero', 
  1, 
  '{
    "heading": "About Repute Digital",
    "subtext": "A Full Service Digital Agency since 2012",
    "button_text": "Our Vision",
    "image_url": "/img/about-hero.jpg"
  }'::JSONB
),
(
  'about', 
  'Our Story', 
  'about', 
  2, 
  '{
    "tag": "OUR STORY",
    "heading": "Excellence in Every Pixel",
    "text": "Repute is a Full Service Digital Agency that helps Build - Promote - Market Brands. We help brands grow through innovative technology and strategic marketing.",
    "button_text": "Meet The Team"
  }'::JSONB
),
(
  'about', 
  'About Stats', 
  'stats', 
  3, 
  '{
    "stats": "10+:Years of Experience, 50+:Creative Minds, 500+:Awards Won"
  }'::JSONB
),
(
  'about',
  'Our Values',
  'services',
  4,
  '{
    "tag": "PHILOSOPHY",
    "heading": "Core Values That Drive Us",
    "items": "Innovation: Always pushing boundaries, Integrity: Honest and transparent work, Impact: Delivering measurable results, Insight: Data-driven decision making"
  }'::JSONB
);
