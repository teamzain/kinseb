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
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100vh', // Set to viewport height
      background: 'linear-gradient(180deg, #04091D 16.18%, #0D98BA 219.08%)',
      display: 'flex',
      justifyContent: 'space-between',
      padding: '20px 30px', // Reduced padding
      color: '#FFFFFF',
      overflow: 'hidden',
    }}>
      {/* Left side content */}
      <div style={{
        maxWidth: '45%',
        paddingTop: '15px', // Reduced padding
      }}>
        <p style={{
          fontStyle: 'normal',
          fontWeight: 600,
          fontSize: '18px', // Smaller font
          lineHeight: '24px', // Reduced line height
          color: '#0D94BB',
          margin: '0 0 2px 0', // Reduced margin
        }} className={poppins.className}>Turn Your Ideas Into</p>
        
        <h1 style={{
          fontStyle: 'normal',
          fontWeight: 600,
          fontSize: '32px', // Smaller font
          lineHeight: '38px', // Reduced line height
          color: '#0D98BA',
          margin: '0 0 8px 0', // Reduced margin
        }} className={poppins.className}>Impactful Digital Products</h1>
        
        <p style={{
          fontStyle: 'normal',
          fontWeight: 600,
          fontSize: '14px', // Smaller font
          lineHeight: '130%', // Reduced line height
          letterSpacing: '-0.006em',
          color: '#E6E6E6',
          maxWidth: '942px',
          margin: '0 0 16px 0', // Reduced margin
        }} className={lato.className}>
          Have an idea, question, or collaboration in mind? Drop us a line – we're all ears.
        </p>

        {/* Features */}
        <div style={{ marginBottom: '20px' }}> {/* Reduced margin */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '6px', // Reduced margin
          }}>
            <div style={{
              color: '#0D98BA',
              marginRight: '8px', // Reduced margin
              fontSize: '16px', // Smaller font
            }}>✓</div>
            <p style={{
              fontStyle: 'normal',
              fontWeight: 700,
              fontSize: '15px', // Smaller font
              lineHeight: '130%', // Reduced line height
              letterSpacing: '-0.006em',
              color: '#E6E6E6',
            }} className={lato.className}>Expert-Led Design Team</p>
          </div>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '6px', // Reduced margin
          }}>
            <div style={{
              color: '#0D98BA',
              marginRight: '8px', // Reduced margin
              fontSize: '16px', // Smaller font
            }}>✓</div>
            <p style={{
              fontStyle: 'normal',
              fontWeight: 700,
              fontSize: '15px', // Smaller font
              lineHeight: '130%', // Reduced line height
              letterSpacing: '-0.006em',
              color: '#E6E6E6',
            }} className={lato.className}>Results That Speak</p>
          </div>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '6px', // Reduced margin
          }}>
            <div style={{
              color: '#0D98BA',
              marginRight: '8px', // Reduced margin
              fontSize: '16px', // Smaller font
            }}>✓</div>
            <p style={{
              fontStyle: 'normal',
              fontWeight: 700,
              fontSize: '15px', // Smaller font
              lineHeight: '130%', // Reduced line height
              letterSpacing: '-0.006em',
              color: '#E6E6E6',
            }} className={lato.className}>Pixel-Perfect Execution</p>
          </div>
        </div>

        {/* Contact Info */}
        <div style={{ marginTop: '20px' }}> {/* Reduced margin */}
          <h2 style={{
            fontStyle: 'normal',
            fontWeight: 600,
            fontSize: '20px', // Smaller font
            lineHeight: '28px', // Reduced line height
            letterSpacing: '-0.03em',
            color: '#FFFFFF',
            margin: '0 0 12px 0', // Reduced margin
          }} className={poppins.className}>Contact us</h2>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '8px', // Reduced margin
          }}>
            <div style={{ marginRight: '8px', width: '20px', height: '20px' }}> {/* Smaller icon */}
              {/* Email icon placeholder - add your own image */}
              <div style={{ width: '20px', height: '20px', backgroundColor: '#0D98BA' }}></div>
            </div>
            <p style={{
              fontStyle: 'normal',
              fontWeight: 700,
              fontSize: '15px', // Smaller font
              lineHeight: '130%', // Reduced line height
              letterSpacing: '-0.006em',
              color: '#E6E6E6',
            }} className={lato.className}>hello@pixnesh.com</p>
          </div>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '8px', // Reduced margin
          }}>
            <div style={{ marginRight: '8px', width: '20px', height: '20px' }}> {/* Smaller icon */}
              {/* Phone icon placeholder - add your own image */}
              <div style={{ width: '20px', height: '20px', backgroundColor: '#0D98BA' }}></div>
            </div>
            <p style={{
              fontStyle: 'normal',
              fontWeight: 700,
              fontSize: '15px', // Smaller font
              lineHeight: '130%', // Reduced line height
              letterSpacing: '-0.006em',
              color: '#E6E6E6',
            }} className={lato.className}>+123 456 7890</p>
          </div>
        </div>
      </div>

      {/* Right side - Contact Form */}
      <div style={{
        width: '50%',
        background: 'linear-gradient(180deg, #0D98BA -213.84%, #04091D 103.97%)',
        border: '1px solid #07435D',
        backdropFilter: 'blur(6px)',
        borderRadius: '10px',
        padding: '20px', // Reduced padding
      }}>
        <h2 style={{
          fontStyle: 'normal',
          fontWeight: 600,
          fontSize: '28px', // Smaller font
          lineHeight: '34px', // Reduced line height
          color: '#FFFFFF',
          margin: '0 0 12px 0', // Reduced margin
        }} className={poppins.className}>Start a Conversation</h2>
        
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '15px', // Reduced gap
            marginBottom: '10px', // Reduced margin
          }}>
            <div style={{ flex: 1, marginBottom: '10px' }}> {/* Reduced margin */}
              <label style={{
                display: 'block',
                fontStyle: 'normal',
                fontWeight: 700,
                fontSize: '14px', // Smaller font
                lineHeight: '130%', // Reduced line height
                letterSpacing: '-0.006em',
                color: '#E6E6E6',
                marginBottom: '4px', // Reduced margin
              }} className={lato.className}>Full Name</label>
              <div style={{
                position: 'relative',
                boxSizing: 'border-box',
                width: '100%',
                height: '45px', // Reduced height
                background: 'rgba(36, 36, 36, 0.2)',
                border: '1px solid #7D818D',
                backdropFilter: 'blur(6px)',
                borderRadius: '8px', // Reduced border radius
                display: 'flex',
                alignItems: 'center',
              }}>
                <div style={{ margin: '0 10px', width: '16px', height: '16px' }}> {/* Smaller icon */}
                  {/* User icon placeholder - add your own image */}
                  <div style={{ width: '16px', height: '16px', backgroundColor: '#0D98BA' }}></div>
                </div>
                <input 
                  type="text" 
                  name="fullName"
                  placeholder="Your Name"
                  style={{
                    flex: 1,
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    height: '100%',
                    fontFamily: 'Barlow, sans-serif',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    fontSize: '14px', // Smaller font
                    lineHeight: '18px', // Reduced line height
                    color: '#98989A',
                    padding: '0',
                  }}
                  className={barlow.className}
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div style={{ flex: 1, marginBottom: '10px' }}> {/* Reduced margin */}
              <label style={{
                display: 'block',
                fontStyle: 'normal',
                fontWeight: 700,
                fontSize: '14px', // Smaller font
                lineHeight: '130%', // Reduced line height
                letterSpacing: '-0.006em',
                color: '#E6E6E6',
                marginBottom: '4px', // Reduced margin
              }} className={lato.className}>Email Address</label>
              <div style={{
                position: 'relative',
                boxSizing: 'border-box',
                width: '100%',
                height: '45px', // Reduced height
                background: 'rgba(36, 36, 36, 0.2)',
                border: '1px solid #7D818D',
                backdropFilter: 'blur(6px)',
                borderRadius: '8px', // Reduced border radius
                display: 'flex',
                alignItems: 'center',
              }}>
                <div style={{ margin: '0 10px', width: '16px', height: '16px' }}> {/* Smaller icon */}
                  {/* Email icon placeholder - add your own image */}
                  <div style={{ width: '16px', height: '16px', backgroundColor: '#0D98BA' }}></div>
                </div>
                <input 
                  type="email" 
                  name="email"
                  placeholder="Your Email"
                  style={{
                    flex: 1,
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    height: '100%',
                    fontFamily: 'Barlow, sans-serif',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    fontSize: '14px', // Smaller font
                    lineHeight: '18px', // Reduced line height
                    color: '#98989A',
                    padding: '0',
                  }}
                  className={barlow.className}
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '15px', // Reduced gap
            marginBottom: '10px', // Reduced margin
          }}>
            <div style={{ flex: 1, marginBottom: '10px' }}> {/* Reduced margin */}
              <label style={{
                display: 'block',
                fontStyle: 'normal',
                fontWeight: 700,
                fontSize: '14px', // Smaller font
                lineHeight: '130%', // Reduced line height
                letterSpacing: '-0.006em',
                color: '#E6E6E6',
                marginBottom: '4px', // Reduced margin
              }} className={lato.className}>Company Name</label>
              <div style={{
                position: 'relative',
                boxSizing: 'border-box',
                width: '100%',
                height: '45px', // Reduced height
                background: 'rgba(36, 36, 36, 0.2)',
                border: '1px solid #7D818D',
                backdropFilter: 'blur(6px)',
                borderRadius: '8px', // Reduced border radius
                display: 'flex',
                alignItems: 'center',
              }}>
                <div style={{ margin: '0 10px', width: '16px', height: '16px' }}> {/* Smaller icon */}
                  {/* Company icon placeholder - add your own image */}
                  <div style={{ width: '16px', height: '16px', backgroundColor: '#0D98BA' }}></div>
                </div>
                <input 
                  type="text" 
                  name="companyName"
                  placeholder="Company Name"
                  style={{
                    flex: 1,
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    height: '100%',
                    fontFamily: 'Barlow, sans-serif',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    fontSize: '14px', // Smaller font
                    lineHeight: '18px', // Reduced line height
                    color: '#98989A',
                    padding: '0',
                  }}
                  className={barlow.className}
                  value={formData.companyName}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div style={{ flex: 1, marginBottom: '10px' }}> {/* Reduced margin */}
              <label style={{
                display: 'block',
                fontStyle: 'normal',
                fontWeight: 700,
                fontSize: '14px', // Smaller font
                lineHeight: '130%', // Reduced line height
                letterSpacing: '-0.006em',
                color: '#E6E6E6',
                marginBottom: '4px', // Reduced margin
              }} className={lato.className}>Contact Number</label>
              <div style={{
                position: 'relative',
                boxSizing: 'border-box',
                width: '100%',
                height: '45px', // Reduced height
                background: 'rgba(36, 36, 36, 0.2)',
                border: '1px solid #7D818D',
                backdropFilter: 'blur(6px)',
                borderRadius: '8px', // Reduced border radius
                display: 'flex',
                alignItems: 'center',
              }}>
                <div style={{ margin: '0 10px', width: '16px', height: '16px' }}> {/* Smaller icon */}
                  {/* Contact icon placeholder - add your own image */}
                  <div style={{ width: '16px', height: '16px', backgroundColor: '#0D98BA' }}></div>
                </div>
                <input 
                  type="tel" 
                  name="contactNumber"
                  placeholder="Contact Number"
                  style={{
                    flex: 1,
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    height: '100%',
                    fontFamily: 'Barlow, sans-serif',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    fontSize: '14px', // Smaller font
                    lineHeight: '18px', // Reduced line height
                    color: '#98989A',
                    padding: '0',
                  }}
                  className={barlow.className}
                  value={formData.contactNumber}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div style={{ flex: 1, marginBottom: '10px' }}> {/* Reduced margin */}
            <label style={{
              display: 'block',
              fontStyle: 'normal',
              fontWeight: 700,
              fontSize: '14px', // Smaller font
              lineHeight: '130%', // Reduced line height
              letterSpacing: '-0.006em',
              color: '#E6E6E6',
              marginBottom: '4px', // Reduced margin
            }} className={lato.className}>Your Message</label>
            <textarea 
              name="message"
              placeholder="Describe Your Project Needs..."
              style={{
                boxSizing: 'border-box',
                width: '100%',
                height: '80px', // Reduced height
                background: 'rgba(36, 36, 36, 0.2)',
                border: '1px solid #7D818D',
                backdropFilter: 'blur(6px)',
                borderRadius: '8px', // Reduced border radius
                padding: '10px', // Reduced padding
                fontFamily: 'Barlow, sans-serif',
                fontStyle: 'normal',
                fontWeight: 400,
                fontSize: '14px', // Smaller font
                lineHeight: '18px', // Reduced line height
                color: '#98989A',
                resize: 'none',
                outline: 'none',
              }}
              className={barlow.className}
              value={formData.message}
              onChange={handleChange}
              rows={3} // Reduced rows
            />
          </div>

          <button 
            type="submit" 
            style={{
              width: '100px', // Reduced width
              height: '36px', // Reduced height
              background: '#0D98BA',
              borderRadius: '6px',
              fontStyle: 'normal',
              fontWeight: 500,
              fontSize: '13px', // Smaller font
              lineHeight: '130%', // Reduced line height
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#1A1A1A',
              border: 'none',
              cursor: 'pointer',
              marginTop: '6px', // Reduced margin
            }}
            className={barlow.className}
          >
            Get in touch
          </button>
        </form>
      </div>
    </div>
  );
}