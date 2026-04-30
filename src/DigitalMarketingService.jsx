import React, { useEffect, useState } from 'react';
import { Navbar, Footer, Icons, CTASection } from './SharedComponents';
import { Link } from 'react-router-dom';
import { supabase } from './supabaseClient';
import './DigitalMarketingService.css';

const DigitalMarketingService = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    subject: '',
    location: '',
    services: [],
    message: '',
    captcha: ''
  });
  const [status, setStatus] = useState({ type: '', msg: '' });

  /* Scroll reveal logic */
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { 
        if (e.isIntersecting) {
          e.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const handleCheckboxChange = (service) => {
    const updatedServices = formData.services.includes(service)
      ? formData.services.filter(s => s !== service)
      : [...formData.services, service];
    setFormData({ ...formData, services: updatedServices });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: 'loading', msg: 'Sending...' });

    try {
      const { error } = await supabase
        .from('contacts')
        .insert([{
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: 'Service Inquiry: Digital Marketing',
          service: 'Digital Marketing',
          message: `Company: ${formData.company}\nLocation: ${formData.location}\nServices: ${formData.services.join(', ')}\n\n${formData.message}`
        }]);

      if (error) throw error;
      setStatus({ type: 'success', msg: 'Thank you! Your message has been sent.' });
      setFormData({
        name: '', company: '', email: '', phone: '', subject: '', location: '',
        services: [], message: '', captcha: ''
      });
    } catch (err) {
      console.error('Submission error:', err);
      setStatus({ type: 'error', msg: 'Failed to send. Please try again.' });
    }
  };

  const servicesGrid = [
    { title: 'Market Research', icon: 'https://cdn-icons-png.flaticon.com/512/3592/3592186.png', desc: 'Market research is essential for gaining insights into your audience’s preferences, behaviours, and pain points. It helps identify competitor strengths and weaknesses, which in turn inform the development of effective digital marketing strategies and the creation of content that drives audience engagement. We conduct extensive research employing cutting-edge listening tools, delivering top-notch market research services in Coimbatore for multiple business types.' },
    { title: 'Website Design and Development', icon: 'https://cdn-icons-png.flaticon.com/512/3592/3592150.png', desc: 'A website is a critical element that builds your brand’s credibility, and Repute is a one-stop solution for crafting stunning, user-friendly, navigable, and functional web designs. We deliver comprehensive web design and development services in Coimbatore, featuring custom and responsive web design, engaging content, best Local SEO practices, and intuitive UI/UX to drive desired outcomes and captivate your audience.' },
    { title: 'Search Engine Optimization (SEO)', icon: 'https://cdn-icons-png.flaticon.com/512/3592/3592147.png', desc: 'Repute devises tailored SEO strategies to increase website traffic, reach, generate quality leads, and improve conversion rates based on the outcomes of the SEO site audit, analysis, and by following Google norms, delivering the best search engine optimization services in Coimbatore. We identify high-impact keywords, perform On-page and Off-page optimization, improve online visibility, and track performance to optimize outcomes.' },
    { title: 'Social Media Marketing (SMM)', icon: 'https://cdn-icons-png.flaticon.com/512/3592/3592134.png', desc: 'Boost your online presence and build a strong reputation with Repute’s Best social media marketing in Coimbatore. Reach your target audience, increase brand awareness, and drive traffic to your website with our expert strategies and creative content. With our tailored approach, your brand will shine brighter and attract more customers. Let us help you grow your business and stand out in the competitive digital world.' },
    { title: 'Pay-Per-Click (PPC)', icon: 'https://cdn-icons-png.flaticon.com/512/3592/3592161.png', desc: 'Over the years, Repute has guided hundreds of businesses with their monthly PPC drives and paid internet advertising strategy development, employing brilliant approaches to generate relevant leads, brand awareness, and repeat Leads/sales. We identify high-performance keywords, design engaging ad copies, monitor key metrics, and strategically manage bids to ensure cost efficiency, delivering top-notch PPC services in Coimbatore.' },
    { title: 'Search Engine Marketing (SEM)', icon: 'https://cdn-icons-png.flaticon.com/512/3592/3592181.png', desc: 'Boost your online visibility and drive targeted traffic with Repute’s Search Engine Marketing service. Our team of experts utilizes strategic keyword optimization, PPC campaigns, and comprehensive analytics to ensure your brand stands out in the digital landscape. Trust us to help your business maximize ROI.' },
    { title: 'Content Marketing', icon: 'https://cdn-icons-png.flaticon.com/512/3592/3592158.png', desc: 'Our team at Repute drafts content strategies based on your target audience segment, their expectations, and reading preferences and delivers the best content marketing services in Coimbatore. We deliver captivating and SEO-friendly blog posts, articles, infographics, videos, etc., to rank well in SERPs, by strategically sharing and promoting content to reach the relevant audience segments and optimizing them for improved performance.' },
    { title: 'Link Building', icon: 'https://cdn-icons-png.flaticon.com/512/3592/3592170.png', desc: 'Repute boasts an expert digital marketing team that devises link-building approaches that comply with Google regulations, building highly authorised backlinks. This team also analyzes and constructs prospective internet marketing approaches to deliver the best link-building services in Coimbatore.' },
    { title: 'Online Reputation Management', icon: 'https://cdn-icons-png.flaticon.com/512/3592/3592186.png', desc: 'Repute has an expert team of reputation management strategists in Coimbatore who understand your business goal, evaluate your current online reputation, manage online reviews by suppressing negative comments and promoting positive comments, delivering comprehensive Online Reputation Management services in India.' },
    { title: 'Digital PR', icon: 'https://cdn-icons-png.flaticon.com/512/3592/3592150.png', desc: 'Repute delivers top-notch digital PR services in Coimbatore by strategically building and managing a digital presence. We connect with relevant influencers to promote your brand, craft compelling content that resonates with your audience segment, sustain a positive brand image and strategically engage with your audience, thereby establishing the credibility of your brand across the digital medium.' },
    { title: 'Amazon SEO', icon: 'https://cdn-icons-png.flaticon.com/512/3592/3592147.png', desc: 'Our experienced Amazon SEO team identifies relevant keywords, conducts competitor analysis, optimizes content and images and responds to customer reviews to build credibility, enhancing your product listings and boosting your brand visibility, sales and ROI. Repute is one of the top Amazon marketing agencies in India that delivers tailored SEO strategies essential to elevate your brand presence in the highly competitive Amazon marketplace.' },
    { title: 'CRO Service', icon: 'https://cdn-icons-png.flaticon.com/512/3592/3592134.png', desc: 'Repute has proven expertise in delivering tailored strategies to boost sales conversion rates for multiple business types. Our process starts with a detailed analysis of your existing conversion funnel, identify challenges, optimize landing pages and CTAs, craft engaging content, and enhance website usability and responsiveness, delivering the best Conversion Rate Optimization (CRO) services in Coimbatore.' }
  ];

  const benefits = [
    { title: 'Experienced Experts', icon: 'https://cdn-icons-png.flaticon.com/512/3592/3592186.png', desc: 'Repute has skilled and experienced professionals with digital marketing expertise, making it one of the top digital marketing companies in Coimbatore. It takes time and effort to build a successful strategy that suits your business.' },
    { title: 'Cost-effective Solutions', icon: 'https://cdn-icons-png.flaticon.com/512/3592/3592150.png', desc: 'Repute specializes in attracting and driving traffic with the best SEO practices, creating compelling content, leveraging social media channels and email marketing campaigns, and executing data-driven PPC campaigns.' },
    { title: 'Proven Results', icon: 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png', desc: 'Repute’s result-driven strategies align with your business objectives and target audience, elevating your brand to new heights in the digital landscape, delivering the best digital marketing in Coimbatore.' },
    { title: 'Customized Strategies', icon: 'https://cdn-icons-png.flaticon.com/512/3592/3592134.png', desc: 'Repute delivers tailored and structured online marketing plans that meet your unique business needs, audience segment, budget and goals and is one of the top digital marketing service providers in India.' },
    { title: 'Innovative Techniques', icon: 'https://cdn-icons-png.flaticon.com/512/3592/3592161.png', desc: 'At Repute, our digital marketing professionals stay tuned to the latest industry trends and experiment to determine the best technique that yields the desired results for your brand.' },
    { title: 'Data-driven Insights', icon: 'https://cdn-icons-png.flaticon.com/512/3592/3592147.png', desc: 'We gain insights employing various tools and analyzing metrics across multiple channels, allocating budget on approaches that generate maximum ROI. Repute is one of the top digital marketing service providers.' },
    { title: 'Targeted Campaigns', icon: 'https://cdn-icons-png.flaticon.com/512/3592/3592158.png', desc: 'We identify your ideal audience segment based on their browsing preferences, identify the effective online channels to reach them, send personalized messages, and consistently monitor campaign performance.' },
    { title: 'Competitive Advantage', icon: 'https://cdn-icons-png.flaticon.com/512/3592/3592170.png', desc: 'Our extensive experience, comprehensive research, data-driven culture, multi-channel integration, tailored strategies and proven results provide you with a significant advantage over competitors.' },
    { title: 'Increased Visibility', icon: 'https://cdn-icons-png.flaticon.com/512/3592/3592181.png', desc: 'Irrespective of whether you are a start-up or a large enterprise, sustaining brand visibility is essential to succeed in the dynamic digital landscape. Repute helps your brand with enhanced visibility.' },
    { title: 'Brand Recognition', icon: 'https://cdn-icons-png.flaticon.com/512/3592/3592186.png', desc: 'Brand recognition helps you set your brand apart from competitors, gain credibility and customer loyalty, and make your customers brand ambassadors. At Repute, we execute brand audits.' },
    { title: 'Effective ROI', icon: 'https://cdn-icons-png.flaticon.com/512/3592/3592150.png', desc: 'At Repute, we are persistent in our commitment to achieve desired results and exceed your ROI expectations with our strategic expertise and data-driven approaches. Repute delivers the best digital marketing.' },
    { title: 'Reliable Support', icon: 'https://cdn-icons-png.flaticon.com/512/3592/3592134.png', desc: 'Our team offers comprehensive services, timely support and expert guidance with data-driven insights. Repute is one of the top digital marketing company in Coimbatore that offers SEO, SMM, PPC, etc.' }
  ];

  const faqs = [
    { q: 'How do you develop a custom digital marketing strategy for each client?', a: 'We work with the awareness that each client’s business size, phase of the product life cycle, needs, and expectations are different. We prioritize by analyzing and understanding each of our client’s brands, products, services, campaign ideas, and goals.' },
    { q: 'How do you measure the success of your digital marketing campaigns?', a: 'We track key performance indicators (KPIs) like organic traffic, conversion rates, and ROI using advanced analytics tools.' },
    { q: 'What type of reporting and analytics do you provide to clients?', a: 'We provide transparent, data-driven reports regularly, showcasing performance across search, social, and display channels.' },
    { q: 'What is your pricing structure for digital marketing services?', a: 'Our pricing is customized based on the scope of work and business objectives.' },
    { q: 'Can you get me on the first page of Google?', a: 'Yes, through strategic SEO and PPC efforts, we aim for top rankings on SERPs.' },
    { q: 'When can I expect to see results?', a: 'Results vary based on the service, but typically SEO takes 3-6 months, while PPC and Social Ads can show impact within weeks.' },
    { q: 'How do you handle changes to digital marketing platforms or algorithms?', a: 'Our experts stay tuned to industry trends and adapt strategies continuously to maintain success.' }
  ];

  return (
    <div className="service-page dm-service">
      <Navbar activePage="services" />

      {/* ── RED BANNER HERO ── */}
      <section className="dm-banner-hero">
        <div className="section-container">
          <h1 className="main-heading reveal">As a Leading digital marketing company in Coimbatore, we help you maximize your online visibility, drive targeted traffic with strategic approaches, grow your brand, and achieve measurable results.</h1>
          
          <div className="hero-split-layout reveal">
            <div className="hero-text-side">
              <span className="service-badge">Services</span>
              <h2 className="sub-heading">
                <span className="yellow-highlight">Digital Marketing Company</span> in Coimbatore
              </h2>
              <div className="hero-description">
                <p>Online Marketing, Digital Marketing, or Internet Marketing is the process of promoting your products, brand, or services online through one or more forms of electronic media.</p>
                <p>Today, Digital Marketing is one of the most essential dimensions for any business, from small business owners to established enterprises, to quickly widen their brand visibility and sales.</p>
              </div>
            </div>

            <div className="hero-form-side">
              <div className="form-card-mini">
                {status.type === 'success' ? (
                  <div className="success-confirmation reveal visible">
                    <div className="success-icon-large">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>
                    </div>
                    <h3>Thank You!</h3>
                    <p>We'll reach out shortly.</p>
                  </div>
                ) : (
                  <form className="mini-inquiry-form" onSubmit={handleSubmit}>
                    <div className="form-row">
                      <input type="text" placeholder="Full Name*" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                      <input type="text" placeholder="Company Name" value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} />
                    </div>
                    <div className="form-row">
                      <input type="email" placeholder="Email Id*" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                      <input type="text" placeholder="Contact Number*" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                    </div>
                    <div className="form-row">
                      <input type="text" placeholder="Subject" value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})} />
                      <input type="text" placeholder="Location" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} />
                    </div>
                    
                    <div className="checkbox-section-mini">
                      <p>Services (What can we help with?)</p>
                      <div className="mini-checkbox-grid">
                        {['Brand creatives', 'Web Development', 'e Commerce development', 'SEO', 'SMM', 'SEM', 'PPC', 'Mobile application Development', 'Marketplace', 'Other Service'].map((s, idx) => (
                          <label key={idx} className="checkbox-item-mini">
                            <input type="checkbox" checked={formData.services.includes(s)} onChange={() => handleCheckboxChange(s)} />
                            <span>{s}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="form-footer-mini">
                      <textarea placeholder="Message" rows="2" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}></textarea>
                      <div className="captcha-group">
                        <label>SOLVE - 9+seven?</label>
                        <input type="text" required value={formData.captcha} onChange={(e) => setFormData({...formData, captcha: e.target.value})} />
                      </div>
                      <button type="submit" className="dm-submit-btn-mini" disabled={status.type === 'loading'}>
                        {status.type === 'loading' ? 'Sending...' : 'Send Message'}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="hero-wave">
          <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path fill="#ffffff" fillOpacity="1" d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,149.3C672,149,768,203,864,218.7C960,235,1056,213,1152,186.7C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* ── INTRO SECTION ── */}
      <section className="dm-intro-section">
        <div className="section-container">
          <div className="intro-full reveal">
            <p>At Repute, we blend creative storytelling with data-driven execution to accelerate your growth online. Our team audits your current presence, studies competitors and audience behaviour, and crafts a custom roadmap aligned to clear KPIs-traffic, qualified leads, CAC, and revenue. We run targeted campaigns across search, social, and display, optimise landing pages for conversions, and A/B test continuously to improve results. With transparent reporting, dedicated account managers, and deep understanding of the Coimbatore market, we help you scale confidently across India and beyond.</p>
          </div>
        </div>
      </section>

      {/* ── OFFERINGS ── */}
      <section className="dm-offerings-section">
        <div className="section-container">
          <div className="offer-flex reveal">
            <div className="offer-visual">
               <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800" alt="Marketing Analytics" />
            </div>
            <div className="offer-text">
              <h2>Repute <span className="yellow-highlight">Digital Marketing</span> Offerings</h2>
              <p>Repute offers top-notch digital marketing services in Coimbatore, comprising Search Engine Optimization (SEO), Pay Per Click (PPC), Social Media Marketing (SMM), Content Marketing, Email Marketing, Mobile Marketing, and much more.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES GRID (CLEAN 3-COLUMN) ── */}
      <section className="dm-services-grid-section">
        <div className="section-container">
          <div className="grid-header reveal">
            <h2>Repute Digital Marketing Services</h2>
          </div>
          <div className="dm-detailed-grid reveal">
            {servicesGrid.map((s, i) => (
              <div key={i} className="dm-service-card">
                <div className="card-icon">
                  <img src={s.icon} alt={s.title} />
                </div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="centered-action reveal" style={{ marginTop: '50px', textAlign: 'center' }}>
             <Link to="/contact" className="red-contact-btn">Contact Us</Link>
          </div>
        </div>
      </section>

      {/* ── BENEFITS SECTION ── */}
      <section className="dm-benefits-section">
        <div className="section-container">
          <div className="benefits-header reveal">
            <h2>Unlock marketing ROI with <span className="yellow-highlight">REPUTE's digital marketing</span> Services</h2>
            <p>Partner with Repute for comprehensive digital marketing services to multiply your Return On Investment (ROI) besides enhancing your online presence.</p>
          </div>
          <div className="benefits-grid reveal">
            {benefits.map((b, i) => (
              <div key={i} className="benefit-item">
                <div className="benefit-icon">
                   <img src={b.icon} alt={b.title} />
                </div>
                <h4>{b.title}</h4>
                <p className="benefit-desc">Repute has skilled and experienced professionals with digital marketing expertise...</p>
              </div>
            ))}
          </div>
          <div className="centered-action reveal" style={{ marginTop: '50px', textAlign: 'center' }}>
             <Link to="/contact" className="red-contact-btn">Contact Us</Link>
          </div>
        </div>
      </section>

      {/* ── RESULT DRIVEN SECTION ── */}
      <section className="dm-result-driven">
        <div className="section-container">
           <div className="result-flex reveal">
              <div className="result-visual">
                <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800" alt="Team Collaboration" />
              </div>
              <div className="result-text">
                <h2>Repute’s <span className="yellow-highlight">result-driven digital marketing</span> service</h2>
                <p>At Repute, we take time to understand your business goals and KPIs, study your traffic patterns and devise the most promising digital marketing strategies that align with your needs.</p>
              </div>
           </div>
        </div>
      </section>

      {/* ── INVESTMENT SECTION ── */}
      <section className="dm-investment-section">
        <div className="section-container">
           <div className="investment-flex reveal">
              <div className="investment-text">
                <h2>Why <span className="yellow-highlight">Digital Marketing</span> is a Great Investment</h2>
                <p>Repute is a digital marketing agency in Coimbatore with over two decades of experience in devising the best strategies, helping businesses expand their reach and increase profits.</p>
              </div>
              <div className="investment-visual">
                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800" alt="Marketing Success" />
              </div>
           </div>
        </div>
      </section>

      {/* ── FAQ SECTION ── */}
      <section className="dm-faq-section">
        <div className="section-container">
          <div className="faq-header reveal">
            <h2>Digital Marketing FAQs</h2>
          </div>
          <div className="faq-list reveal">
            {faqs.map((f, i) => (
              <details key={i} className="faq-item">
                <summary>{f.q}</summary>
                <div className="faq-answer">{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CASE STUDIES ── */}
      <section className="dm-case-studies">
        <div className="section-container">
          <div className="case-header reveal">
            <h2>Case Studies</h2>
          </div>
          <div className="case-logos-grid reveal">
            <div className="case-logo-card">
              <img src="https://irepute.in/file/wp-content/uploads/2025/01/img-logo-1.png" alt="Karpagam" />
              <div className="card-line-accent"></div>
            </div>
            <div className="case-logo-card">
              <img src="https://irepute.in/file/wp-content/uploads/2025/01/img-logo-2.png" alt="Vishwankar" />
              <div className="card-line-accent"></div>
            </div>
            <div className="case-logo-card">
              <img src="https://irepute.in/file/wp-content/uploads/2025/01/img-logo-3.png" alt="FASO" />
              <div className="card-line-accent"></div>
            </div>
            <div className="case-logo-card">
              <img src="https://irepute.in/file/wp-content/uploads/2025/01/img-logo-4.png" alt="Karpagam Hospital" />
              <div className="card-line-accent"></div>
            </div>
          </div>
        </div>
      </section>

      <CTASection 
        title="Call us to talk about!" 
        subtitle="Business, E-Commerce, Digital Marketing, Ideas or Just a Coffee"
      />

      <Footer />
    </div>
  );
};

export default DigitalMarketingService;
