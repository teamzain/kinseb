'use client';

import { useState } from 'react';
import { Poppins, Lato, Barlow } from 'next/font/google';
import Image from 'next/image';
import Head from 'next/head';

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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        // Reset form
        setFormData({
          fullName: '',
          email: '',
          companyName: '',
          contactNumber: '',
          message: '',
        });
      } else {
        // setSubmitStatus('error');
        console.error('Error sending email:', result.error);
      }
    } catch (error) {
      // setSubmitStatus('error');
      console.error('Error sending email:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Define company information for consistent SEO
  const companyName = "Pixnesh";
  const companyEmail = "hello@pixnesh.com";
  const companyPhone = "+123 456 7890";
  const pageTitle = "Turn Your Ideas Into Impactful Digital Products | Pixnesh";
  const pageDescription = "Transform your business ideas into powerful digital products with Pixnesh. Our expert design team delivers pixel-perfect execution and results that speak for themselves.";

  // Generate structured data for JSON-LD
  const generateStructuredData = () => {
    const organizationData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": companyName,
      "url": "https://pixnesh.com",
      "logo": "https://pixnesh.com/logo.png",
      "email": companyEmail,
      "telephone": companyPhone,
      "description": "We turn ideas into impactful digital products with expert-led design and pixel-perfect execution.",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "US"
      },
      "sameAs": [
        "https://twitter.com/pixnesh",
        "https://facebook.com/pixnesh",
        "https://instagram.com/pixnesh",
        "https://linkedin.com/company/pixnesh"
      ]
    };
    
    return JSON.stringify(organizationData);
  };

  return (
    <>
      {/* SEO Meta Tags */}
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content="digital products, web development, expert design team, UI/UX design, digital transformation, custom software" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://pixnesh.com" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pixnesh.com" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content="https://pixnesh.com/og-image.jpg" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://pixnesh.com" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content="https://pixnesh.com/twitter-image.jpg" />
        
        {/* Additional meta tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        
        {/* Structured Data */}
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: generateStructuredData() }}
        />
      </Head>

      <div className="landing-container" role="main">
        {/* Left side content with background image */}
        <div className="left-content">
          <div className="background-image" aria-hidden="true"></div>
          <div className="content-wrapper">
            <p className={`tagline ${poppins.className}`}>Turn Your Ideas Into</p>
            
            <h1 className={`main-heading ${poppins.className}`}>Impactful Digital Products</h1>
            
            <p className={`description ${lato.className}`}>
              Have an idea, question, or collaboration in mind? Drop us a line – we're all ears.
            </p>

            {/* Features */}
            <div className="features" role="list">
              <div className="feature-item" role="listitem">
                <div className="check-mark" aria-hidden="true">✓</div>
                <p className={`feature-text ${lato.className}`}>Expert-Led Design Team</p>
              </div>
              
              <div className="feature-item" role="listitem">
                <div className="check-mark" aria-hidden="true">✓</div>
                <p className={`feature-text ${lato.className}`}>Results That Speak</p>
              </div>
              
              <div className="feature-item" role="listitem">
                <div className="check-mark" aria-hidden="true">✓</div>
                <p className={`feature-text ${lato.className}`}>Pixel-Perfect Execution</p>
              </div>
            </div>

            {/* Contact Info */}
            <div className="contact-info">
              <h2 className={`contact-heading ${poppins.className}`} id="contact-us">Contact us</h2>
              
              <div className="contact-item">
                <div className="contact-icon" aria-hidden="true">
                  <Image 
                    src="/images/email.svg" 
                    width={30} 
                    height={30} 
                    alt="Email icon" 
                    loading="lazy"
                  />
                </div>
                <p className={`contact-text ${lato.className}`}>
                  <a href={`mailto:${companyEmail}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                    {companyEmail}
                  </a>
                </p>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon" aria-hidden="true">
                  <Image 
                    src="/images/phone.svg" 
                    width={30} 
                    height={30} 
                    alt="Phone icon" 
                    loading="lazy"
                  />
                </div>
                <p className={`contact-text ${lato.className}`}>
                  <a href={`tel:${companyPhone.replace(/\s/g, '')}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                    {companyPhone}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Contact Form */}
        <div className="form-container">
          <h2 className={`form-heading ${poppins.className}`} id="contact-form">Start a Conversation</h2>
          
          {/* Success/Error Messages */}
          {submitStatus === 'success' && (
            <div className="status-message success-message">
              <p className={`status-text ${lato.className}`}>
                ✓ Message sent successfully! We'll get back to you soon.
              </p>
            </div>
          )}
          
          {submitStatus === 'error' && (
            <div className="status-message error-message">
              <p className={`status-text ${lato.className}`}>
                ✗ Failed to send message. Please try again or contact us directly.
              </p>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="contact-form" aria-labelledby="contact-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="fullName" className={`form-label ${lato.className}`}>Full Name *</label>
                <div className="input-container">
                  <div className="input-icon" aria-hidden="true">
                    <Image 
                      src="/images/user.svg" 
                      width={24} 
                      height={24} 
                      alt="" 
                      loading="lazy"
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
                    aria-required="true"
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
                      loading="lazy"
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
                      loading="lazy"
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
                      loading="lazy"
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
                rows={4}
              />
            </div>

            <button 
              type="submit" 
              className={`submit-button ${barlow.className}`}
              aria-label="Submit contact form"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Get in touch'}
            </button>
          </form>
        </div>

        {/* CSS Styles */}
        <style jsx>{`
          /* Base Styles */
          .landing-container {
            position: relative;
            width: 100%;
            min-height: 90vh;
            background: linear-gradient(180deg, #04091D 16.18%, #0D98BA 219.08%);
            display: flex;
            justify-content: space-between;
            padding: 30px 40px;
            color: #FFFFFF;
            overflow: auto;
            box-sizing: border-box;
            margin-top: 80px;
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

          /* Status Message Styles */
          .status-message {
            margin-bottom: 20px;
            padding: 12px 16px;
            border-radius: 8px;
            border: 1px solid;
          }

          .success-message {
            background: rgba(34, 197, 94, 0.1);
            border-color: #22c55e;
          }

          .error-message {
            background: rgba(239, 68, 68, 0.1);
            border-color: #ef4444;
          }

          .status-text {
            margin: 0;
            font-size: 14px;
            color: #FFFFFF;
          }

          .success-message .status-text {
            color: #22c55e;
          }

          .error-message .status-text {
            color: #ef4444;
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
            transition: opacity 0.2s ease;
          }

          .submit-button:disabled {
            opacity: 0.7;
            cursor: not-allowed;
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
    </>
  );
}