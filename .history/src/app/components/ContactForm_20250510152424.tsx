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
    <div className="landing-container">
      {/* Left side content with background image */}
      <div className="left-content">
        <div className="background-image"></div>
        <div className="content-wrapper">
          <p className={`tagline ${poppins.className}`}>Turn Your Ideas Into</p>
          
          <h1 className={`main-heading ${poppins.className}`}>Impactful Digital Products</h1>
          
          <p className={`description ${lato.className}`}>
            Have an idea, question, or collaboration in mind? Drop us a line – we're all ears.
          </p>

          {/* Features */}


          {/* Contact Info */}
          <div className="contact-info">
            <h2 className={`contact-heading ${poppins.className}`}>Contact us</h2>
            
            <div className="contact-item">
              <div className="contact-icon">
                <Image 
                  src="/images/email.svg" 
                  width={30} 
                  height={30} 
                  alt="Email icon" 
                />
              </div>
              <p className={`contact-text ${lato.className}`}>hello@pixnesh.com</p>
            </div>
            
            <div className="contact-item">
              <div className="contact-icon">
                <Image 
                  src="/images/phone.svg" 
                  width={30} 
                  height={30} 
                  alt="Phone icon" 
                />
              </div>
              <p className={`contact-text ${lato.className}`}>+123 456 7890</p>
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
              <label className={`form-label ${lato.className}`}>Full Name</label>
              <div className="input-container">
                <div className="input-icon">
                  <Image 
                    src="/images/user.svg" 
                    width={24} 
                    height={24} 
                    alt="User icon" 
                  />
                </div>
                <input 
                  type="text" 
                  name="fullName"
                  placeholder="Your Name"
                  className={`form-input ${barlow.className}`}
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="form-group">
              <label className={`form-label ${lato.className}`}>Email Address</label>
              <div className="input-container">
                <div className="input-icon">
                  <Image 
                    src="/images/email.svg" 
                    width={24} 
                    height={24} 
                    alt="Email icon" 
                  />
                </div>
                <input 
                  type="email" 
                  name="email"
                  placeholder="Your Email"
                  className={`form-input ${barlow.className}`}
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className={`form-label ${lato.className}`}>Company Name</label>
              <div className="input-container">
                <div className="input-icon">
                  <Image 
                    src="/images/company.svg" 
                    width={24} 
                    height={24} 
                    alt="Company icon" 
                  />
                </div>
                <input 
                  type="text" 
                  name="companyName"
                  placeholder="Company Name"
                  className={`form-input ${barlow.className}`}
                  value={formData.companyName}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="form-group">
              <label className={`form-label ${lato.className}`}>Contact Number</label>
              <div className="input-container">
                <div className="input-icon">
                  <Image 
                    src="/images/phone.svg" 
                    width={24} 
                    height={24} 
                    alt="Phone icon" 
                  />
                </div>
                <input 
                  type="tel" 
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
            <label className={`form-label ${lato.className}`}>Your Message</label>
            <textarea 
              name="message"
              placeholder="Describe Your Project Needs..."
              className={`form-textarea ${barlow.className}`}
              value={formData.message}
              onChange={handleChange}
              rows={4}
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
          position: relative;
          width: 100%;
          min-height: 100vh;
          background: linear-gradient(180deg, #04091D 16.18%, #0D98BA 219.08%);
          display: flex;
          justify-content: space-between;
          padding: 30px 40px;
          color: #FFFFFF;
          overflow: auto;
          box-sizing: border-box;
   
          gap: 40px; /* Add gap between left and right columns */
        }

        /* Left Content Styles */
        .left-content {
          max-width: 600px;
          padding: 30px;
          position: relative;
          z-index: 1;
        }
        
        /* Background image container */
        .background-image {
          position: absolute;
          top: 50%;
          left: 60%;
          transform: translate(-50%, -50%);
          width: 50%; /* Make image smaller */
          height: 50%;
          background-image: url('/images/message.svg');
          background-repeat: no-repeat;
          background-position: center;
          background-size: contain; /* Use contain to ensure image is fully visible */
      /* Subtle background */
          z-index: -1;
        }
        
        /* Ensure text is readable */
        .content-wrapper {
          position: relative;
          z-index: 2;
        }

        .tagline {
          font-style: normal;
          font-weight: 600;
          font-size: 22px;
          line-height: 32px;
          color: #0D94BB;
          margin: 0 0 3px 0;
        }

        .main-heading {
          font-style: normal;
          font-weight: 600;
          font-size: 40px;
          line-height: 55px;
          color: #0D98BA;
          margin: 0 0 8px 0;
        }

        .description {
          font-style: normal;
          font-weight: 600;
          font-size: 16px;
          line-height: 140%;
          letter-spacing: -0.006em;
          color: #E6E6E6;
          max-width: 850px;
          margin: 0 0 25px 0;
        }

        /* Features Styles */
        .features {
          margin-bottom: 20px;
        }

        .feature-item {
          display: flex;
          align-items: center;
          margin-bottom: 15px;
        }

        .check-mark {
          color: #0D98BA;
          margin-right: 10px;
          font-size: 20px;
        }

        .feature-text {
          font-style: normal;
          font-weight: 700;
          font-size: 18px;
          line-height: 140%;
          letter-spacing: -0.006em;
          color: #E6E6E6;
          margin: 0;
        }

        /* Contact Info Styles */
        .contact-info {
          margin-top: 60px; /* Increased gap before Contact us section */
        }

        .contact-heading {
          font-style: normal;
          font-weight: 600;
          font-size: 26px;
          line-height: 36px;
          letter-spacing: -0.03em;
          color: #FFFFFF;
          margin: 0 0 15px 0;
        }

        .contact-item {
          display: flex;
          align-items: center;
          margin-bottom: 15px;
        }

        .contact-icon {
          margin-right: 10px;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .contact-text {
          font-style: normal;
          font-weight: 700;
          font-size: 18px;
          line-height: 140%;
          letter-spacing: -0.006em;
          color: #E6E6E6;
          margin: 0;
        }

        /* Form Container Styles */
        .form-container {
          width: 600px;
          background: linear-gradient(180deg, #0D98BA -213.84%, #04091D 103.97%);
          border: 1px solid #07435D;
          backdrop-filter: blur(6px);
          border-radius: 10px;
          padding: 20px;
        }

        .form-heading {
          font-style: normal;
          font-weight: 600;
          font-size: 38px;
          line-height: 50px;
          color: #FFFFFF;
          margin: 0 0 15px 0;
        }

        /* Form Styles */
        .contact-form {
          width: 100%;
        }

        .form-row {
          display: flex;
          justify-content: space-between;
          gap: 30px;
          margin-bottom: 20px;
        }

        .form-group {
          flex: 1;
          margin-bottom: 20px;
        }

        .full-width {
          width: 100%;
        }

        .form-label {
          display: block;
          font-style: normal;
          font-weight: 700;
          font-size: 16px;
          line-height: 140%;
          letter-spacing: -0.006em;
          color: #E6E6E6;
          margin-bottom: 6px;
        }

        .input-container {
          position: relative;
          box-sizing: border-box;
          width: 100%;
          height: 50px;
          background: rgba(4, 9, 29, 0.9);
          border: 1px solid #07435D;
          backdrop-filter: blur(6px);
          border-radius: 8px;
          display: flex;
          align-items: center;
          padding-left: 50px; /* Add padding to accommodate the icon */
        }

        .input-icon {
          position: absolute;
          left: 15px;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #0D98BA;
          width: 24px;
          height: 24px;
          z-index: 1;
          pointer-events: none; /* Prevents icon from interfering with input */
        }

        .form-input {
          width: 100%;
          background: transparent;
          border: none;
          outline: none;
          height: 100%;
          font-style: normal;
          font-weight: 400;
          font-size: 16px;
          line-height: 24px;
          color: #98989A;
          padding: 0 15px 0 0; /* Remove left padding since container has it */
        }

        .form-textarea {
          box-sizing: border-box;
          width: 100%;
          height: 100px;
          background: rgba(4, 9, 29, 0.9);
          border: 1px solid #07435D;
          backdrop-filter: blur(6px);
          border-radius: 8px;
          padding: 15px;
          font-style: normal;
          font-weight: 400;
          font-size: 16px;
          line-height: 22px;
          color: #98989A;
          resize: none;
          outline: none;
        }

        .submit-button {
          width: 125px;
          height: 45px;
          background: #0D98BA;
          border-radius: 6px;
          font-style: normal;
          font-weight: 500;
          font-size: 14px;
          line-height: 150%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #1A1A1A;
          border: none;
          cursor: pointer;
          margin-top: 10px;
        }

        /* Responsive Styles */
        @media (max-width: 1200px) {
          .form-container {
            width: 500px;
          }
        }

        @media (max-width: 1024px) {
          .landing-container {
            padding: 25px 30px;
          }
          
          .left-content {
            max-width: 450px;
          }
          
          .form-container {
            width: 450px;
          }
          
          .main-heading {
            font-size: 36px;
            line-height: 48px;
          }
          
          .form-heading {
            font-size: 34px;
            line-height: 46px;
          }
        }

        @media (max-width: 900px) {
          .landing-container {
            flex-direction: column;
            align-items: center;
            padding: 20px;
            gap: 30px; /* Adjusted gap for mobile */
          }
          
          .left-content {
            max-width: 100%;
            margin-bottom: 10px;
            padding: 20px;
            border-radius: 10px;
          }
          
          .form-container {
            width: 100%;
            max-width: 700px;
          }
        }

        @media (max-width: 768px) {
          .landing-container {
            margin-top: 60px;
          }
          
          .main-heading {
            font-size: 32px;
            line-height: 44px;
          }
          
          .form-heading {
            font-size: 30px;
            line-height: 40px;
          }
          
          .tagline {
            font-size: 20px;
            line-height: 28px;
          }
          
          /* Ensure the form background color is consistent */
          .form-container {
            background: linear-gradient(180deg, #0D98BA -213.84%, #04091D 103.97%);
          }
          
          /* Hide background image on mobile */
          .background-image {
            display: none;
          }
        }

        @media (max-width: 640px) {
          .form-row {
            flex-direction: column;
            gap: 0;
          }
          
          .form-group {
            width: 100%;
          }
          
          .main-heading {
            font-size: 28px;
            line-height: 40px;
          }
          
          .form-heading {
            font-size: 26px;
            line-height: 36px;
          }
          
          /* Ensure the input containers maintain their structure */
          .input-container {
            height: 50px;
            background: rgba(4, 9, 29, 0.9);
          }
          
          /* Keep icon positioning consistent */
          .input-icon {
            left: 15px;
            top: 50%;
            transform: translateY(-50%);
          }
        }

        @media (max-width: 480px) {
          .landing-container {
            padding: 15px;
            margin-top: 50px;
          }
          
          .main-heading {
            font-size: 24px;
            line-height: 34px;
          }
          
          .tagline {
            font-size: 18px;
            line-height: 26px;
          }
          
          .description {
            font-size: 14px;
          }
          
          .feature-text, .contact-text {
            font-size: 16px;
          }
          
          .form-heading {
            font-size: 24px;
            line-height: 32px;
          }
          
          .form-label {
            font-size: 14px;
          }
          
          .form-input, .form-textarea {
            font-size: 14px;
          }
          
          .form-container {
            padding: 15px;
            /* Maintain gradient background color across all screen sizes */
            background: linear-gradient(180deg, #0D98BA -213.84%, #04091D 103.97%);
          }
          
          .input-container {
            background: rgba(4, 9, 29, 0.9);
            border-color: #07435D;
          }
        }
      `}</style>
    </div>
  );
}