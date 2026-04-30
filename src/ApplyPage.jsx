import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Navbar, Footer } from './SharedComponents';
import { supabase } from './supabaseClient';
import './ApplyPage.css';

const ApplyPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [jobTitle, setJobTitle] = useState('General Application');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    serviceType: '',
    source: '',
    resume: null,
    workedWithUs: 'No',
    securityAnswer: ''
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    // Reveal logic
    const els = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
      });
    }, { threshold: 0.1 });
    els.forEach(el => obs.observe(el));

    // Get jobTitle from state if passed via navigate()
    if (location.state && location.state.jobTitle) {
      setJobTitle(location.state.jobTitle);
    }
    return () => obs.disconnect();
  }, [location]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, resume: e.target.files[0] });
  };

  const [isSending, setIsSending] = useState(false);

  // Helper to upload file to Cloudinary
  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);
    
    const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/raw/upload`, {
      method: 'POST',
      body: formData,
    });
    
    if (!res.ok) {
      throw new Error('Cloudinary upload failed');
    }
    
    const data = await res.json();
    return data.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.firstName || !formData.email || !formData.mobile || !formData.resume) {
      alert('Please fill in all required fields and upload your resume.');
      return;
    }

    if (formData.securityAnswer !== '18') {
      alert('Security answer is incorrect. (6 + 12 = 18)');
      return;
    }

    // File validation
    const allowedExtensions = /(\.pdf|\.doc|\.docx)$/i;
    if (!allowedExtensions.exec(formData.resume.name) && formData.resume.type !== 'application/pdf' && !formData.resume.type.includes('word')) {
      alert('Allowed formats are only PDF, DOC, and DOCX.');
      return;
    }

    if (formData.resume.size > 5 * 1024 * 1024) {
      alert('File size exceeds the 5MB limit.');
      return;
    }

    setIsSending(true);

    try {
      // 1. Upload resume to Cloudinary
      const resumeUrl = await uploadToCloudinary(formData.resume);

      // 2. Save to Supabase
      const { error: dbError } = await supabase
        .from('applications')
        .insert([{
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          mobile: formData.mobile,
          selected_job: jobTitle,
          service_type: formData.serviceType,
          source: formData.source,
          worked_before: formData.workedWithUs,
          resume_url: resumeUrl
        }]);

      if (dbError) throw dbError;

      // 3. Send via EmailJS (Keep existing notification)
      const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
      const TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID; 
      const PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
 
       const templateParams = {
         // Fallbacks for original EmailJS Template
         name: `${formData.firstName} ${formData.lastName}`,
         subject: `New Career Application - ${jobTitle}`,
         message: `
           Job Role: ${jobTitle}
           Service Type: ${formData.serviceType}
           Source: ${formData.source}
           Worked Before: ${formData.workedWithUs}
           Email: ${formData.email}
           Phone: ${formData.mobile}
         `,
         time: new Date().toLocaleString(),
         // New variables as requested
         first_name: formData.firstName,
         last_name: formData.lastName,
         email: formData.email,
         mobile: formData.mobile,
         selected_job: jobTitle,
         service_type: formData.serviceType,
         source: formData.source,
         worked_before: formData.workedWithUs,
         resume_link: resumeUrl
       };
 
       const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({
           service_id: SERVICE_ID,
           template_id: TEMPLATE_ID,
           user_id: PUBLIC_KEY,
           template_params: templateParams,
         }),
       });

      if (response.ok) {
        setIsModalOpen(true);
      } else {
        alert('Application sent failed. Please retry.');
      }
    } catch (error) {
      console.error('Submission Error:', error);
      alert('Resume upload failed. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    navigate('/career');
  };

  return (
    <div className="apply-page">
      <Navbar activePage="career" />

      {/* ── HERO SECTION ── */}
      <section className="apply-hero">
        <div className="reveal">
          <p>Join Our Team</p>
          <h1>Career Application</h1>
          <div className="hero-accent"></div>
        </div>
        {/* Curved divider to transition to form */}
        <div className="hero-divider">
          <svg viewBox="0 0 1440 120" fill="#F8FAFC" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
          </svg>
        </div>
      </section>

      <div className="apply-main-wrapper">
        <div className="apply-container reveal">
          <div className="apply-head">
            <h2>Call us to talk about!</h2>
            <div className="title-accent"></div>
          </div>

          <div className="apply-form-card">
            <form onSubmit={handleSubmit} className="apply-grid-form">
              {/* Row 1 */}
              <div className="form-group half">
                <label>First Name *</label>
                <input 
                  type="text" 
                  name="firstName" 
                  placeholder="Enter your first name" 
                  required 
                  onChange={handleInputChange} 
                />
              </div>
              <div className="form-group half">
                <label>Last Name</label>
                <input 
                  type="text" 
                  name="lastName" 
                  placeholder="Enter your last name" 
                  onChange={handleInputChange} 
                />
              </div>

              {/* Row 2 */}
              <div className="form-group half">
                <label>Email Id *</label>
                <input 
                  type="email" 
                  name="email" 
                  placeholder="name@example.com" 
                  required 
                  onChange={handleInputChange} 
                />
              </div>
              <div className="form-group half">
                <label>Mobile No. *</label>
                <input 
                  type="tel" 
                  name="mobile" 
                  placeholder="10-digit mobile number" 
                  required 
                  onChange={handleInputChange} 
                />
              </div>

              {/* Row 3 */}
              <div className="form-group half">
                <label>Service Type?</label>
                <select name="serviceType" defaultValue="" onChange={handleInputChange}>
                  <option value="" disabled>—Please choose an option—</option>
                  <option value="Brand Creatives">Brand Creatives</option>
                  <option value="Web Development & Design">Web Development & Design</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Digital and Social Media Marketing">Digital and Social Media Marketing</option>
                </select>
              </div>
              <div className="form-group half">
                <label>Where did you hear about us through?</label>
                <select name="source" defaultValue="" onChange={handleInputChange}>
                  <option value="" disabled>—Please choose an option—</option>
                  <option value="-Select-">-Select-</option>
                  <option value="Referral">Referral</option>
                  <option value="Internet Search">Internet Search</option>
                  <option value="Job Fair">Job Fair</option>
                  <option value="Others">Others</option>
                </select>
              </div>

              {/* Row 4: Selected Job (Auto-filled) */}
              <div className="form-group full">
                <label>Selected Job Role</label>
                <input 
                  type="text" 
                  value={jobTitle} 
                  readOnly 
                  className="readonly-input" 
                />
              </div>

              {/* Row 5: Upload Resume */}
              <div className="form-group full">
                <label>Upload Resume (Max 5MB - PDF/DOC/DOCX) *</label>
                <div className={`file-input-wrapper ${formData.resume ? 'has-file' : ''}`}>
                  {!formData.resume ? (
                    <>
                      <input 
                        type="file" 
                        accept=".pdf,.doc,.docx" 
                        required 
                        onChange={handleFileChange} 
                        className="file-input-hidden"
                      />
                      <div className="file-custom-ui">
                        <svg className="upload-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                        <span>Drag & Drop or Click to Select</span>
                      </div>
                    </>
                  ) : (
                    <div className="file-preview">
                      <div className="file-info">
                        <svg className="file-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>
                        <span className="file-name">{formData.resume.name}</span>
                      </div>
                      <button 
                        type="button" 
                        className="remove-file-btn" 
                        onClick={() => setFormData({...formData, resume: null})}
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Row 6: Radio */}
              <div className="form-group full">
                <label>Have you worked with us already?</label>
                <div className="radio-group">
                  <label className="radio-label">
                    <input 
                      type="radio" 
                      name="workedWithUs" 
                      value="Yes" 
                      checked={formData.workedWithUs === 'Yes'}
                      onChange={handleInputChange}
                    />
                    <span>Yes</span>
                  </label>
                  <label className="radio-label">
                    <input 
                      type="radio" 
                      name="workedWithUs" 
                      value="No" 
                      checked={formData.workedWithUs === 'No'}
                      onChange={handleInputChange}
                    />
                    <span>No</span>
                  </label>
                </div>
              </div>
              {/* Row 7: Security Quest */}
              <div className="form-group full security-row">
                <label>Security Question: six+12? (Solve to verify)</label>
                <input 
                  type="text" 
                  name="securityAnswer" 
                  placeholder="Enter answer" 
                  required 
                  onChange={handleInputChange} 
                />
              </div>

              {/* Submit */}
              <div className="form-submit-area">
                <button 
                  type="submit" 
                  className={`apply-submit-btn ${isSending ? 'is-loading' : ''}`} 
                  disabled={isSending}
                >
                  {isSending ? "Submitting Application..." : "Submit Application"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {isModalOpen && (
        <div className="success-modal-overlay">
          <div className="success-modal-card">
            <div className="success-icon">✓</div>
            <h3>Application Submitted Successfully</h3>
            <p>Thank you for applying to Repute. Our HR team will review your application and contact you soon.</p>
            <div className="modal-btn-group">
              <button onClick={closeModal} className="modal-btn-close">Close</button>
              <Link to="/career" className="modal-btn-back">Back to Careers</Link>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ApplyPage;
