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
      minHeight: '90vh', // Reduced from 100vh to 90vh
      background: 'linear-gradient(180deg, #04091D 16.18%, #0D98BA 219.08%)',
      display: 'flex',
      justifyContent: 'space-between',
      padding: '30px 40px', // Reduced vertical padding
      color: '#FFFFFF',
      overflow: 'auto',
      boxSizing: 'border-box',
      marginTop: '80px', // Added top margin as requested
    }}>
      {/* Left side content */}
      <div style={{
        maxWidth: '600px', // Reduced max width
        paddingTop: '15px', // Further reduced top padding
      }}>
        <p style={{
          fontStyle: 'normal',
          fontWeight: 600,
          fontSize: '22px', // Reduced from 25px
          lineHeight: '32px', // Reduced from 38px
          color: '#0D94BB',
          margin: '0 0 3px 0', // Reduced margin
        }} className={poppins.className}>Turn Your Ideas Into</p>
        
        <h1 style={{
          fontStyle: 'normal',
          fontWeight: 600,
          fontSize: '40px', // Reduced from 45px
          lineHeight: '55px', // Reduced from 68px
          color: '#0D98BA',
          margin: '0 0 8px 0', // Reduced margin
        }} className={poppins.className}>Impactful Digital Products</h1>
        
        <p style={{
          fontStyle: 'normal',
          fontWeight: 600,
          fontSize: '16px', // Reduced from 18px
          lineHeight: '140%', // Reduced from 150%
          letterSpacing: '-0.006em',
          color: '#E6E6E6',
          maxWidth: '850px', // Reduced from 942px
          margin: '0 0 25px 0', // Further reduced margin
        }} className={lato.className}>
          Have an idea, question, or collaboration in mind? Drop us a line – we're all ears.
        </p>

        {/* Features */}
        <div style={{ marginBottom: '20px' }}> {/* Further reduced margin */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '15px',
          }}>
            <div style={{
              color: '#0D98BA',
              marginRight: '10px',
              fontSize: '20px',
            }}>✓</div>
            <p style={{
              fontStyle: 'normal',
              fontWeight: 700,
              fontSize: '18px', // Reduced from 20px
              lineHeight: '140%', // Reduced from 150%
              letterSpacing: '-0.006em',
              color: '#E6E6E6',
            }} className={lato.className}>Expert-Led Design Team</p>
          </div>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '15px',
          }}>
            <div style={{
              color: '#0D98BA',
              marginRight: '10px',
              fontSize: '20px',
            }}>✓</div>
            <p style={{
              fontStyle: 'normal',
              fontWeight: 700,
              fontSize: '18px', // Reduced from 20px
              lineHeight: '140%', // Reduced from 150%
              letterSpacing: '-0.006em',
              color: '#E6E6E6',
            }} className={lato.className}>Results That Speak</p>
          </div>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '15px',
          }}>
            <div style={{
              color: '#0D98BA',
              marginRight: '10px',
              fontSize: '20px',
            }}>✓</div>
            <p style={{
              fontStyle: 'normal',
              fontWeight: 700,
              fontSize: '18px', // Reduced from 20px
              lineHeight: '140%', // Reduced from 150%
              letterSpacing: '-0.006em',
              color: '#E6E6E6',
            }} className={lato.className}>Pixel-Perfect Execution</p>
          </div>
        </div>

        {/* Contact Info */}
        <div style={{ marginTop: '25px' }}> {/* Further reduced margin */}
          <h2 style={{
            fontStyle: 'normal',
            fontWeight: 600,
            fontSize: '26px', // Reduced from 30px
            lineHeight: '36px', // Further reduced line height
            letterSpacing: '-0.03em',
            color: '#FFFFFF',
            margin: '0 0 15px 0', // Reduced margin
          }} className={poppins.className}>Contact us</h2>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '15px',
          }}>
            <div style={{ marginRight: '10px', width: '30px', height: '30px' }}>
              {/* Email icon placeholder - add your own image */}
              <div style={{ width: '30px', height: '30px', backgroundColor: '#0D98BA' }}></div>
            </div>
            <p style={{
              fontStyle: 'normal',
              fontWeight: 700,
              fontSize: '18px', // Reduced from 20px
              lineHeight: '140%', // Reduced from 150%
              letterSpacing: '-0.006em',
              color: '#E6E6E6',
            }} className={lato.className}>hello@pixnesh.com</p>
          </div>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '15px',
          }}>
            <div style={{ marginRight: '10px', width: '30px', height: '30px' }}>
              {/* Phone icon placeholder - add your own image */}
              <div style={{ width: '30px', height: '30px', backgroundColor: '#0D98BA' }}></div>
            </div>
            <p style={{
              fontStyle: 'normal',
              fontWeight: 700,
              fontSize: '18px', // Reduced from 20px
              lineHeight: '140%', // Reduced from 150%
              letterSpacing: '-0.006em',
              color: '#E6E6E6',
            }} className={lato.className}>+123 456 7890</p>
          </div>
        </div>
      </div>

      {/* Right side - Contact Form */}
      <div style={{
        width: '600px', // Reduced from 663px
        background: 'linear-gradient(180deg, #0D98BA -213.84%, #04091D 103.97%)',
        border: '1px solid #07435D',
        backdropFilter: 'blur(6px)',
        borderRadius: '10px',
        padding: '20px', // Further reduced padding
      }}>
        <h2 style={{
          fontStyle: 'normal',
          fontWeight: 600,
          fontSize: '38px', // Reduced from 45px
          lineHeight: '50px', // Further reduced line height
          color: '#FFFFFF',
          margin: '0 0 15px 0', // Reduced margin
        }} className={poppins.className}>Start a Conversation</h2>
        
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '30px',
            marginBottom: '20px',
          }}>
            <div style={{ flex: 1, marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                fontStyle: 'normal',
                fontWeight: 700,
                fontSize: '16px', // Reduced from 20px
                lineHeight: '140%', // Reduced from 150%
                letterSpacing: '-0.006em',
                color: '#E6E6E6',
                marginBottom: '6px', // Reduced from 10px
              }} className={lato.className}>Full Name</label>
              <div style={{
                position: 'relative',
                boxSizing: 'border-box',
                width: '100%',
                height: '50px', // Further reduced height from 60px
                background: 'rgba(36, 36, 36, 0.2)',
                border: '1px solid #7D818D',
                backdropFilter: 'blur(6px)',
                borderRadius: '8px', // Reduced from 10px
                display: 'flex',
                alignItems: 'center',
              }}>
                <div style={{ margin: '0 15px', width: '24px', height: '24px' }}>
                  {/* User icon placeholder - add your own image */}
                  <div style={{ width: '24px', height: '24px', backgroundColor: '#0D98BA' }}></div>
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
                    fontSize: '16px', // Reduced from 20px
                    lineHeight: '24px',
                    color: '#98989A',
                    padding: '0',
                  }}
                  className={barlow.className}
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div style={{ flex: 1, marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                fontStyle: 'normal',
                fontWeight: 700,
                fontSize: '16px', // Reduced from 20px
                lineHeight: '140%', // Reduced from 150%
                letterSpacing: '-0.006em',
                color: '#E6E6E6',
                marginBottom: '6px', // Reduced from 10px
              }} className={lato.className}>Email Address</label>
              <div style={{
                position: 'relative',
                boxSizing: 'border-box',
                width: '100%',
                height: '50px', // Further reduced height from 60px
                background: 'rgba(36, 36, 36, 0.2)',
                border: '1px solid #7D818D',
                backdropFilter: 'blur(6px)',
                borderRadius: '8px', // Reduced from 10px
                display: 'flex',
                alignItems: 'center',
              }}>
                <div style={{ margin: '0 15px', width: '24px', height: '24px' }}>
                  {/* Email icon placeholder - add your own image */}
                  <div style={{ width: '24px', height: '24px', backgroundColor: '#0D98BA' }}></div>
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
                    fontSize: '20px',
                    lineHeight: '24px',
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
            gap: '30px',
            marginBottom: '20px',
          }}>
            <div style={{ flex: 1, marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                fontStyle: 'normal',
                fontWeight: 700,
                fontSize: '16px', // Reduced from 20px
                lineHeight: '140%', // Reduced from 150%
                letterSpacing: '-0.006em',
                color: '#E6E6E6',
                marginBottom: '6px', // Reduced from 10px
              }} className={lato.className}>Company Name</label>
              <div style={{
                position: 'relative',
                boxSizing: 'border-box',
                width: '100%',
                height: '50px', // Further reduced height from 60px
                background: 'rgba(36, 36, 36, 0.2)',
                border: '1px solid #7D818D',
                backdropFilter: 'blur(6px)',
                borderRadius: '8px', // Reduced from 10px
                display: 'flex',
                alignItems: 'center',
              }}>
                <div style={{ margin: '0 15px', width: '24px', height: '24px' }}>
                  {/* Company icon placeholder - add your own image */}
                  <div style={{ width: '24px', height: '24px', backgroundColor: '#0D98BA' }}></div>
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
                    fontSize: '20px',
                    lineHeight: '24px',
                    color: '#98989A',
                    padding: '0',
                  }}
                  className={barlow.className}
                  value={formData.companyName}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div style={{ flex: 1, marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                fontStyle: 'normal',
                fontWeight: 700,
                fontSize: '16px', // Reduced from 20px
                lineHeight: '140%', // Reduced from 150%
                letterSpacing: '-0.006em',
                color: '#E6E6E6',
                marginBottom: '6px', // Reduced from 10px
              }} className={lato.className}>Contact Number</label>
              <div style={{
                position: 'relative',
                boxSizing: 'border-box',
                width: '100%',
                height: '50px', // Further reduced height from 60px
                background: 'rgba(36, 36, 36, 0.2)',
                border: '1px solid #7D818D',
                backdropFilter: 'blur(6px)',
                borderRadius: '8px', // Reduced from 10px
                display: 'flex',
                alignItems: 'center',
              }}>
                <div style={{ margin: '0 15px', width: '24px', height: '24px' }}>
                  {/* Contact icon placeholder - add your own image */}
                  <div style={{ width: '24px', height: '24px', backgroundColor: '#0D98BA' }}></div>
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
                    fontSize: '20px',
                    lineHeight: '24px',
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

          <div style={{ flex: 1, marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontStyle: 'normal',
              fontWeight: 700,
              fontSize: '16px', // Reduced from 20px
              lineHeight: '140%', // Reduced from 150%
              letterSpacing: '-0.006em',
              color: '#E6E6E6',
              marginBottom: '6px', // Reduced from 10px
            }} className={lato.className}>Your Message</label>
            <textarea 
              name="message"
              placeholder="Describe Your Project Needs..."
              style={{
                boxSizing: 'border-box',
                width: '100%',
                height: '100px', // Further reduced height from 120px
                background: 'rgba(36, 36, 36, 0.2)',
                border: '1px solid #7D818D',
                backdropFilter: 'blur(6px)',
                borderRadius: '8px', // Reduced from 10px
                padding: '15px', // Reduced from 20px
                fontFamily: 'Barlow, sans-serif',
                fontStyle: 'normal',
                fontWeight: 400,
                fontSize: '16px', // Reduced from 20px
                lineHeight: '22px', // Reduced from 24px
                color: '#98989A',
                resize: 'none',
                outline: 'none',
              }}
              className={barlow.className}
              value={formData.message}
              onChange={handleChange}
              rows={4}
            />
          </div>

          <button 
            type="submit" 
            style={{
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
              color: '#1A1A1A',
              border: 'none',
              cursor: 'pointer',
              marginTop: '10px',
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