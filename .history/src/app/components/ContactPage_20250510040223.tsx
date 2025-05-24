'use client';

import { useState } from 'react';
import { Poppins, Lato, Barlow } from 'next/font/google';

// Font setup
const poppins = Poppins({
  weight: ['600'],
  subsets: ['latin'],
  display: 'swap',
});

const lato = Lato({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const barlow = Barlow({
  weight: ['400', '500'],
  subsets: ['latin'],
  display: 'swap',
});

export default function LandingPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    companyName: '',
    contactNumber: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    // Here you would add your API call to send the form data
  };

  return (
    <div style={styles.frame}>
      {/* Left side content */}
      <div style={styles.leftContent}>
        <p style={styles.introText} className={poppins.className}>Turn Your Ideas Into</p>
        <h1 style={styles.mainHeading} className={poppins.className}>Impactful Digital Products</h1>
        <p style={styles.paragraph} className={lato.className}>
          Have an idea, question, or collaboration in mind? Drop us a line – we're all ears.
        </p>

        {/* Features */}
        <div style={styles.features}>
          <div style={styles.featureItem}>
            <div style={styles.checkmark}>✓</div>
            <p style={styles.featureText} className={lato.className}>Expert-Led Design Team</p>
          </div>
          <div style={styles.featureItem}>
            <div style={styles.checkmark}>✓</div>
            <p style={styles.featureText} className={lato.className}>Results That Speak</p>
          </div>
          <div style={styles.featureItem}>
            <div style={styles.checkmark}>✓</div>
            <p style={styles.featureText} className={lato.className}>Pixel-Perfect Execution</p>
          </div>
        </div>

        {/* Contact Info */}
        <div style={styles.contactSection}>
          <h2 style={styles.contactHeading} className={poppins.className}>Contact us</h2>
          <div style={styles.contactItem}>
            <div style={styles.contactIcon}>
              <EmailIcon />
            </div>
            <p style={styles.contactText} className={lato.className}>hello@pixnesh.com</p>
          </div>
          <div style={styles.contactItem}>
            <div style={styles.contactIcon}>
              <PhoneIcon />
            </div>
            <p style={styles.contactText} className={lato.className}>+123 456 7890</p>
          </div>
        </div>
      </div>

      {/* Right side - Contact Form */}
      <div style={styles.formContainer}>
        <h2 style={styles.formHeading} className={poppins.className}>Start a Conversation</h2>
        
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formRow}>
            <div style={styles.formGroup}>
              <label style={styles.label} className={lato.className}>Full Name</label>
              <div style={styles.inputContainer}>
                <div style={styles.inputIcon}><UserIcon /></div>
                <input 
                  type="text" 
                  name="fullName"
                  placeholder="Your Name"
                  style={styles.input}
                  className={barlow.className}
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.label} className={lato.className}>Email Address</label>
              <div style={styles.inputContainer}>
                <div style={styles.inputIcon}><AtIcon /></div>
                <input 
                  type="email" 
                  name="email"
                  placeholder="Your Email"
                  style={styles.input}
                  className={barlow.className}
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div style={styles.formRow}>
            <div style={styles.formGroup}>
              <label style={styles.label} className={lato.className}>Company Name</label>
              <div style={styles.inputContainer}>
                <div style={styles.inputIcon}><CompanyIcon /></div>
                <input 
                  type="text" 
                  name="companyName"
                  placeholder="Company Name"
                  style={styles.input}
                  className={barlow.className}
                  value={formData.companyName}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.label} className={lato.className}>Contact Number</label>
              <div style={styles.inputContainer}>
                <div style={styles.inputIcon}><ContactIcon /></div>
                <input 
                  type="tel" 
                  name="contactNumber"
                  placeholder="Contact Number"
                  style={styles.input}
                  className={barlow.className}
                  value={formData.contactNumber}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label} className={lato.className}>Your Message</label>
            <textarea 
              name="message"
              placeholder="Describe Your Project Needs..."
              style={styles.textarea}
              className={barlow.className}
              value={formData.message}
              onChange={handleChange}
              rows={4}
            />
          </div>

          <button type="submit" style={styles.submitButton} className={barlow.className}>
            Get in touch
          </button>
        </form>
      </div>
    </div>
  );
}

// Icon components
const UserIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 15L16 15V17C16 18.657 14.657 20 13 20H11C9.343 20 8 18.657 8 17V15Z" stroke="#0D98BA" strokeWidth="2" />
    <circle cx="12" cy="8" r="3" stroke="#0D98BA" strokeWidth="2" />
  </svg>
);

const AtIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="4" stroke="#0D98BA" strokeWidth="2" />
    <path d="M20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12Z" stroke="#0D98BA" strokeWidth="2" />
  </svg>
);

const CompanyIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 7V19H4V7M20 7L12 3L4 7M20 7L12 11L4 7" stroke="#0D98BA" strokeWidth="2" />
  </svg>
);

const ContactIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="4" width="7" height="7" rx="1" stroke="#0D98BA" strokeWidth="1.5" />
    <rect x="13" y="4" width="7" height="7" rx="1" stroke="#0D98BA" strokeWidth="1.5" />
    <rect x="4" y="13" width="7" height="7" rx="1" stroke="#0D98BA" strokeWidth="1.5" />
  </svg>
);

const EmailIcon = () => (
  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 8.33334H25V21.6667C25 22.5 24.3333 23.1667 23.5 23.1667H6.5C5.66667 23.1667 5 22.5 5 21.6667V8.33334Z" stroke="#0D98BA" strokeWidth="1.5" fill="#0D98BA" />
    <path d="M5 8.33334L15 16.6667L25 8.33334" stroke="#0D98BA" strokeWidth="1.5" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M25 20V23C25 23.7956 24.6839 24.5587 24.1213 25.1213C23.5587 25.6839 22.7956 26 22 26C17.4913 26 13.1673 24.2089 9.97919 21.0208C6.79107 17.8327 5 13.5087 5 9C5 8.20435 5.31607 7.44129 5.87868 6.87868C6.44129 6.31607 7.20435 6 8 6H11C11.7956 6 12.5587 6.31607 13.1213 6.87868C13.6839 7.44129 14 8.20435 14 9C14 10.5 14.25 11.5 14.5 12.5C14.66 13.13 14.4 13.8 13.9 14.3L12 16.5C13.2 18.5 15 20.5 17 22L19.2 20C19.7 19.5 20.4 19.24 21 19.4C22 19.65 23 19.9 24.5 20C25.3 20 26.1 20.3 26.6 20.9C27.2 21.5 25 20 25 20Z" fill="#0D98BA" />
  </svg>
);

// Styles
const styles = {
  frame: {
    position: 'relative',
    width: '100%',
    minHeight: '828px',
    background: 'linear-gradient(180deg, #04091D 16.18%, #0D98BA 219.08%)',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '67px 40px',
    color: '#FFFFFF',
    overflow: 'hidden',
  },
  leftContent: {
    maxWidth: '650px',
    paddingTop: '30px',
  },
  introText: {
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '25px',
    lineHeight: '38px',
    color: '#0D94BB',
    margin: '0 0 5px 0',
  },
  mainHeading: {
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '45px',
    lineHeight: '68px',
    color: '#0D98BA',
    margin: '0 0 10px 0',
  },
  paragraph: {
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '18px',
    lineHeight: '150%',
    letterSpacing: '-0.006em',
    color: '#E6E6E6',
    maxWidth: '942px',
    margin: '0 0 40px 0',
  },
  features: {
    marginBottom: '50px',
  },
  featureItem: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '15px',
  },
  checkmark: {
    color: '#0D98BA',
    marginRight: '10px',
    fontSize: '20px',
  },
  featureText: {
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '20px',
    lineHeight: '150%',
    letterSpacing: '-0.006em',
    color: '#E6E6E6',
  },
  contactSection: {
    marginTop: '80px',
  },
  contactHeading: {
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '30px',
    lineHeight: '64px',
    letterSpacing: '-0.03em',
    color: '#FFFFFF',
    margin: '0 0 20px 0',
  },
  contactItem: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '15px',
  },
  contactIcon: {
    marginRight: '10px',
  },
  contactText: {
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '20px',
    lineHeight: '150%',
    letterSpacing: '-0.006em',
    color: '#E6E6E6',
  },
  formContainer: {
    width: '663px',
    background: 'linear-gradient(180deg, #0D98BA -213.84%, #04091D 103.97%)',
    border: '1px solid #07435D',
    backdropFilter: 'blur(6px)',
    borderRadius: '10px',
    padding: '30px',
  },
  formHeading: {
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '45px',
    lineHeight: '68px',
    color: '#FFFFFF',
    margin: '0 0 20px 0',
  },
  form: {
    width: '100%',
  },
  formRow: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '30px',
    marginBottom: '20px',
  },
  formGroup: {
    flex: 1,
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '20px',
    lineHeight: '150%',
    letterSpacing: '-0.006em',
    color: '#E6E6E6',
    marginBottom: '10px',
  },
  inputContainer: {
    position: 'relative',
    boxSizing: 'border-box',
    width: '100%',
    height: '67px',
    background: 'rgba(36, 36, 36, 0.2)',
    border: '1px solid #7D818D',
    backdropFilter: 'blur(6px)',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
  },
  inputIcon: {
    margin: '0 15px',
  },
  input: {
    flex: 1,
    background: 'transparent',
    border: 'none',
    outline: 'none',
    height: '100%',
    fontFamily: 'Barlow, sans-serif',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '20px',
    lineHeight: '24px',
    color: '#98989A',
    padding: '0',
  },
  textarea: {
    boxSizing: 'border-box',
    width: '100%',
    height: '140px',
    background: 'rgba(36, 36, 36, 0.2)',
    border: '1px solid #7D818D',
    backdropFilter: 'blur(6px)',
    borderRadius: '10px',
    padding: '20px',
    fontFamily: 'Barlow, sans-serif',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '20px',
    lineHeight: '24px',
    color: '#98989A',
    resize: 'none',
    outline: 'none',
  },
  submitButton: {
    width: '125px',
    height: '45px',
    background: '#0D98BA',
    borderRadius: '6px',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '150%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    color: '#1A1A1A',
    border: 'none',
    cursor: 'pointer',
    marginTop: '10px',
  },
};