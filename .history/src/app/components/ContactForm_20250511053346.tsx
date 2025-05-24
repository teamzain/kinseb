'use client';

import { useState } from 'react';
import { Poppins, Lato, Barlow } from 'next/font/google';
import Image from 'next/image';

// Font setup
const poppins = Poppins({
  weight: ['600'],
  subsets: ['latin'],
  display: 'swap',
});

const lato = Lato({
  weight: ['400', '700'],
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    // Here you would add your API call to send the form data
  };

  return (
    <main className="landing-container">
      {/* Left side content with background image */}
      <div className="left-content">
        <div className="background-image" aria-hidden="true"></div>
        <div className="content-wrapper">
          <p className={`tagline ${poppins.className}`}>Turn Your Ideas Into</p>
          
          <h1 className={`main-heading ${poppins.className}`}>Impactful Digital Products</h1>
          
          <p className={`description ${lato.className}`}>
            Have an idea, question, or collaboration in mind? Drop us a line – we're all ears.
          </p>

          {/* Contact Info - Updated to match the image */}
          <div className="contact-info">
            <h2 className={`contact-heading ${poppins.className}`}>Follow us</h2>
            
            <div className="social-icons">
              <a href="#" className="social-icon" aria-label="Twitter">
                <Image 
                  src="/images/twitter.svg" 
                  width={24} 
                  height={24} 
                  alt="Twitter icon" 
                />
              </a>
              <a href="#" className="social-icon" aria-label="Facebook">
                <Image 
                  src="/images/facebook.svg" 
                  width={24} 
                  height={24} 
                  alt="Facebook icon" 
                />
              </a>
              <a href="#" className="social-icon" aria-label="Instagram">
                <Image 
                  src="/images/insta.svg" 
                  width={24} 
                  height={24} 
                  alt="Instagram icon" 
                />
              </a>
              <a href="#" className="social-icon" aria-label="LinkedIn">
                <Image 
                  src="/images/linkedin.svg" 
                  width={24} 
                  height={24} 
                  alt="LinkedIn icon" 
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Contact Form */}
      <div className="form-container">
        <h2 className={`form-heading ${poppins.className}`}>Start a Conversation</h2>
        
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="fullName" className={`form-label ${lato.className}`}>Full Name</label>
              <div className="input-container">
                <div className="input-icon" aria-hidden="true">
                  <Image 
                    src="/images/user.svg" 
                    width={24} 
                    height={24} 
                    alt="" 
                  />
                </div>
                <input 
                  type="text" 
                  id="fullName"
                  name="fullName"
                  placeholder="Your Name"
                  className={`form-input ${barlow.className}`}
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="email" className={`form-label ${lato.className}`}>Email Address</label>
              <div className="input-container">
                <div className="input-icon" aria-hidden="true">
                  <Image 
                    src="/images/email.svg" 
                    width={24} 
                    height={24} 
                    alt="" 
                  />
                </div>
                <input 
                  type="email" 
                  id="email"
                  name="email"
                  placeholder="Your Email"
                  className={`form-input ${barlow.className}`}
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="companyName" className={`form-label ${lato.className}`}>Company Name</label>
              <div className="input-container">
                <div className="input-icon" aria-hidden="true">
                  <Image 
                    src="/images/company.svg" 
                    width={24} 
                    height={24} 
                    alt="" 
                  />
                </div>
                <input 
                  type="text" 
                  id="companyName"
                  name="companyName"
                  placeholder="Company Name"
                  className={`form-input ${barlow.className}`}
                  value={formData.companyName}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="contactNumber" className={`form-label ${lato.className}`}>Contact Number</label>
              <div className="input-container">
                <div className="input-icon" aria-hidden="true">
                  <Image 
                    src="/images/phone.svg" 
                    width={24} 
                    height={24} 
                    alt="" 
                  />
                </div>
                <input 
                  type="tel" 
                  id="contactNumber"
                  name="contactNumber"
                  placeholder="Contact Number"
                  className={`form-input ${barlow.className}`}
                  value={formData.contactNumber}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="form-group full-width">
            <label htmlFor="message" className={`form-label ${lato.className}`}>Your Message</label>
            <textarea 
              id="message"
              name="message"
              placeholder="Describe Your Project Needs..."
              className={`form-textarea ${barlow.className}`}
              value={formData.message}
              onChange={handleChange}
              rows={3}
              required
            />
          </div>

          <button 
            type="submit" 
            className={`submit-button ${barlow.className}`}
          >
            Get in touch
          </button>
        </form>
      </div>

      {/* CSS Styles */}
      <style jsx>{`
        /* Base Styles */
        .landing-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          min-height: 100vh;
          height: 100%;
          background: linear-gradient(180deg, #04091D 16.18%, #0D98BA 219.08%);
          padding: 2rem;
          color: #FFFFFF;
          box-sizing: border-box;
          gap: 2.5rem;
          overflow: hidden;
        }

        /* Left Content Styles */
        .left-content {
          flex: 1;
          max-width: 50%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          z-index: 1;
        }
        
        /* Background image container */
        .background-image {
          position: absolute;
          top: 50%;
          left: 70%;
          transform: translate(-50%, -50%);
          width: 80%;
          height: 80%;
          max-height: 500px;
          background-image: url('/images/message.svg');
          background-repeat: no-repeat;
          background-position: center;
          background-size: contain;
          opacity: 0.4;
          z-index: -1;
        }
        
        /* Ensure text is readable */
        .content-wrapper {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .tagline {
          font-weight: 600;
          font-size: clamp(1.125rem, 2vw, 1.375rem);
          line-height: 1.4;
          color: #0D94BB;
          margin: 0 0 0.25rem 0;
        }

        .main-heading {
          font-weight: 600;
          font-size: clamp(1.75rem, 3.5vw, 2.5rem);
          line-height: 1.3;
          color: #0D98BA;
          margin: 0 0 0.75rem 0;
        }

        .description {
          font-weight: 600;
          font-size: clamp(0.875rem, 1.5vw, 1rem);
          line-height: 1.4;
          letter-spacing: -0.006em;
          color: #E6E6E6;
          margin: 0 0 1.5rem 0;
          max-width: 85%;
        }

        /* Contact Info Styles */
        .contact-info {
          margin-top: auto;
          padding-top: 2rem;
        }

        .contact-heading {
          font-weight: 600;
          font-size: clamp(1.25rem, 2vw, 1.625rem);
          line-height: 1.4;
          letter-spacing: -0.03em;
          margin: 0 0 1rem 0;
          color: #FFFFFF;
        }

        /* Social Icons Row */
        .social-icons {
          display: flex;
          gap: 1.25rem;
        }

        .social-icon {
          width: 2rem;
          height: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s ease;
          background: rgba(13, 152, 186, 0.1);
          border-radius: 50%;
          padding: 0.5rem;
        }

        .social-icon:hover {
          transform: scale(1.1);
          background: rgba(13, 152, 186, 0.2);
        }

        /* Form Container Styles */
        .form-container {
          flex: 1;
          max-width: 50%;
          height: auto;
          background: linear-gradient(180deg, #0D98BA -213.84%, #04091D 103.97%);
          border: 1px solid #07435D;
          backdrop-filter: blur(6px);
          border-radius: 10px;
          padding: 2rem;
          display: flex;
          flex-direction: column;
        }

        .form-heading {
          font-weight: 600;
          font-size: clamp(1.5rem, 3vw, 2.375rem);
          line-height: 1.3;
          color: #FFFFFF;
          margin: 0 0 1.5rem 0;
        }

        /* Form Styles */
        .contact-form {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .form-row {
          display: flex;
          justify-content: space-between;
          gap: 1.5rem;
          width: 100%;
        }

        .form-group {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .full-width {
          width: 100%;
        }

        .form-label {
          font-weight: 700;
          font-size: clamp(0.875rem, 1vw, 1rem);
          line-height: 1.4;
          letter-spacing: -0.006em;
          color: #E6E6E6;
          margin-bottom: 0.5rem;
        }

        .input-container {
          position: relative;
          width: 100%;
          height: 3.125rem;
          background: rgba(4, 9, 29, 0.9);
          border: 1px solid #07435D;
          backdrop-filter: blur(6px);
          border-radius: 8px;
          display: flex;
          align-items: center;
          padding-left: 3.125rem;
          transition: border-color 0.2s ease;
        }

        .input-container:focus-within {
          border-color: #0D98BA;
        }

        .input-icon {
          position: absolute;
          left: 0.9375rem;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #0D98BA;
          width: 1.5rem;
          height: 1.5rem;
          z-index: 1;
          pointer-events: none;
        }

        .form-input {
          width: 100%;
          background: transparent;
          border: none;
          outline: none;
          height: 100%;
          font-weight: 400;
          font-size: clamp(0.875rem, 1vw, 1rem);
          line-height: 1.5;
          color: #FFFFFF;
          padding: 0 0.9375rem 0 0;
        }

        .form-input::placeholder {
          color: #98989A;
        }

        .form-textarea {
          width: 100%;
          min-height: 6.25rem;
          background: rgba(4, 9, 29, 0.9);
          border: 1px solid #07435D;
          backdrop-filter: blur(6px);
          border-radius: 8px;
          padding: 0.9375rem;
          font-weight: 400;
          font-size: clamp(0.875rem, 1vw, 1rem);
          line-height: 1.4;
          color: #FFFFFF;
          resize: none;
          outline: none;
          transition: border-color 0.2s ease;
        }

        .form-textarea::placeholder {
          color: #98989A;
        }

        .form-textarea:focus {
          border-color: #0D98BA;
        }

        .submit-button {
          width: 125px;
          height: 45px;
          background: #0D98BA;
          border-radius: 6px;
          font-weight: 500;
          font-size: 0.875rem;
          line-height: 1.5;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #1A1A1A;
          border: none;
          cursor: pointer;
          margin-top: 0.625rem;
          transition: background-color 0.2s ease;
        }

        .submit-button:hover {
          background: #0B86A5;
        }

        .submit-button:focus {
          outline: 2px solid #0D98BA;
          outline-offset: 2px;
        }

        /* Responsive Styles - Using a Mobile-First Approach */
        @media (max-width: 1200px) {
          .landing-container {
            padding: 1.5rem;
            gap: 2rem;
          }
        }

        @media (max-width: 1024px) {
          .landing-container {
            padding: 1.25rem;
          }
          
          .form-container {
            padding: 1.5rem;
          }
          
          .background-image {
            opacity: 0.3;
          }
        }

        @media (max-width: 900px) {
          .landing-container {
            flex-direction: column;
            justify-content: flex-start;
            min-height: 100vh;
            height: auto;
            gap: 2rem;
            padding: 2rem 1.25rem;
          }
          
          .left-content {
            max-width: 100%;
            flex: none;
            width: 100%;
            padding-bottom: 1rem;
          }
          
          .form-container {
            max-width: 100%;
            flex: none;
            width: 100%;
          }
          
          .background-image {
            width: 50%;
            height: 50%;
            left: 50%;
            opacity: 0.2;
          }
          
          .contact-info {
            margin-top: 2rem;
            padding-top: 1rem;
          }
          
          .description {
            max-width: 100%;
          }
        }

        @media (max-width: 768px) {
          .landing-container {
            padding: 1.5rem 1rem;
          }
          
          .form-row {
            flex-direction: column;
            gap: 1rem;
          }
          
          .form-heading {
            margin-bottom: 1rem;
          }
          
          .background-image {
            opacity: 0.15;
          }
        }

        @media (max-width: 480px) {
          .landing-container {
            padding: 1rem 0.75rem;
            gap: 1.5rem;
          }
          
          .form-container {
            padding: 1.25rem 1rem;
          }
          
          .left-content {
            padding: 0 0.5rem;
          }
          
          .social-icons {
            gap: 0.75rem;
          }
          
          .social-icon {
            width: 1.75rem;
            height: 1.75rem;
            padding: 0.375rem;
          }
          
          .form-textarea {
            min-height: 5rem;
          }
          
          .background-image {
            display: none;
          }
        }
      `}</style>
    </main>
  );
}