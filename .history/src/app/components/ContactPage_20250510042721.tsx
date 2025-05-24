'use client';

import { useState, useEffect } from 'react';
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
  
  const [viewportHeight, setViewportHeight] = useState(0);
  
  // Get viewport height on mount and window resize
  useEffect(() => {
    const updateHeight = () => {
      setViewportHeight(window.innerHeight);
    };
    
    updateHeight();
    window.addEventListener('resize', updateHeight);
    
    return () => {
      window.removeEventListener('resize', updateHeight);
    };
  }, []);

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
      height: `${viewportHeight - 10}px`, // Subtract header height
      background: 'linear-gradient(180deg, #04091D 16.18%, #0D98BA 219.08%)',
      display: 'flex',
      marginTop:'40px',
      justifyContent: 'space-between',
      padding: '20px 40px',
      color: '#FFFFFF',
      overflow: 'hidden',
    }}>
      {/* Left side content */}
      <div style={{
        maxWidth: '45%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
        <div>
          <p style={{
            fontStyle: 'normal',
            fontWeight: 600,
            fontSize: 'clamp(18px, 2vw, 25px)',
            lineHeight: '1.2',
            color: '#0D94BB',
            margin: '0 0 5px 0',
          }} className={poppins.className}>Turn Your Ideas Into</p>
          
          <h1 style={{
            fontStyle: 'normal',
            fontWeight: 600,
            fontSize: 'clamp(32px, 3vw, 45px)',
            lineHeight: '1.2',
            color: '#0D98BA',
            margin: '0 0 10px 0',
          }} className={poppins.className}>Impactful Digital Products</h1>
          
          <p style={{
            fontStyle: 'normal',
            fontWeight: 600,
            fontSize: 'clamp(14px, 1.5vw, 18px)',
            lineHeight: '150%',
            letterSpacing: '-0.006em',
            color: '#E6E6E6',
            margin: '0 0 20px 0',
          }} className={lato.className}>
            Have an idea, question, or collaboration in mind? Drop us a line – we're all ears.
          </p>

          {/* Features */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '10px',
            }}>
              <div style={{
                color: '#0D98BA',
                marginRight: '10px',
                fontSize: 'clamp(16px, 1.5vw, 20px)',
              }}>✓</div>
              <p style={{
                fontStyle: 'normal',
                fontWeight: 700,
                fontSize: 'clamp(16px, 1.5vw, 20px)',
                lineHeight: '150%',
                letterSpacing: '-0.006em',
                color: '#E6E6E6',
              }} className={lato.className}>Expert-Led Design Team</p>
            </div>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '10px',
            }}>
              <div style={{
                color: '#0D98BA',
                marginRight: '10px',
                fontSize: 'clamp(16px, 1.5vw, 20px)',
              }}>✓</div>
              <p style={{
                fontStyle: 'normal',
                fontWeight: 700,
                fontSize: 'clamp(16px, 1.5vw, 20px)',
                lineHeight: '150%',
                letterSpacing: '-0.006em',
                color: '#E6E6E6',
              }} className={lato.className}>Results That Speak</p>
            </div>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '10px',
            }}>
              <div style={{
                color: '#0D98BA',
                marginRight: '10px',
                fontSize: 'clamp(16px, 1.5vw, 20px)',
              }}>✓</div>
              <p style={{
                fontStyle: 'normal',
                fontWeight: 700,
                fontSize: 'clamp(16px, 1.5vw, 20px)',
                lineHeight: '150%',
                letterSpacing: '-0.006em',
                color: '#E6E6E6',
              }} className={lato.className}>Pixel-Perfect Execution</p>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div>
          <h2 style={{
            fontStyle: 'normal',
            fontWeight: 600,
            fontSize: 'clamp(24px, 2.5vw, 30px)',
            lineHeight: '1.2',
            letterSpacing: '-0.03em',
            color: '#FFFFFF',
            margin: '0 0 15px 0',
          }} className={poppins.className}>Contact us</h2>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '10px',
          }}>
            <div style={{ marginRight: '10px', width: '24px', height: '24px' }}>
              {/* Email icon placeholder */}
              <Image 
                src="/api/placeholder/24/24" 
                alt="Email icon" 
                width={24} 
                height={24} 
                style={{ backgroundColor: '#0D98BA', borderRadius: '50%' }}
              />
            </div>
            <p style={{
              fontStyle: 'normal',
              fontWeight: 700,
              fontSize: 'clamp(16px, 1.5vw, 20px)',
              lineHeight: '150%',
              letterSpacing: '-0.006em',
              color: '#E6E6E6',
            }} className={lato.className}>hello@pixnesh.com</p>
          </div>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '10px',
          }}>
            <div style={{ marginRight: '10px', width: '24px', height: '24px' }}>
              {/* Phone icon placeholder */}
              <Image 
                src="/api/placeholder/24/24" 
                alt="Phone icon" 
                width={24} 
                height={24} 
                style={{ backgroundColor: '#0D98BA', borderRadius: '50%' }}
              />
            </div>
            <p style={{
              fontStyle: 'normal',
              fontWeight: 700,
              fontSize: 'clamp(16px, 1.5vw, 20px)',
              lineHeight: '150%',
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
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <h2 style={{
          fontStyle: 'normal',
          fontWeight: 600,
          fontSize: 'clamp(32px, 3vw, 45px)',
          lineHeight: '1.2',
          color: '#FFFFFF',
          margin: '0 0 15px 0',
        }} className={poppins.className}>Start a Conversation</h2>
        
        <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '20px',
            marginBottom: '15px',
          }}>
            <div style={{ flex: 1 }}>
              <label style={{
                display: 'block',
                fontStyle: 'normal',
                fontWeight: 700,
                fontSize: 'clamp(14px, 1.5vw, 18px)',
                lineHeight: '150%',
                letterSpacing: '-0.006em',
                color: '#E6E6E6',
                marginBottom: '5px',
              }} className={lato.className}>Full Name</label>
              <div style={{
                position: 'relative',
                boxSizing: 'border-box',
                width: '100%',
                height: '50px',
                background: 'rgba(36, 36, 36, 0.2)',
                border: '1px solid #7D818D',
                backdropFilter: 'blur(6px)',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
              }}>
                <div style={{ margin: '0 10px', width: '20px', height: '20px' }}>
                  {/* User icon placeholder */}
                  <Image 
                    src="/api/placeholder/20/20" 
                    alt="User icon" 
                    width={20} 
                    height={20} 
                    style={{ backgroundColor: '#0D98BA', borderRadius: '50%' }}
                  />
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
                    fontSize: 'clamp(14px, 1.5vw, 18px)',
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
            
            <div style={{ flex: 1 }}>
              <label style={{
                display: 'block',
                fontStyle: 'normal',
                fontWeight: 700,
                fontSize: 'clamp(14px, 1.5vw, 18px)',
                lineHeight: '150%',
                letterSpacing: '-0.006em',
                color: '#E6E6E6',
                marginBottom: '5px',
              }} className={lato.className}>Email Address</label>
              <div style={{
                position: 'relative',
                boxSizing: 'border-box',
                width: '100%',
                height: '50px',
                background: 'rgba(36, 36, 36, 0.2)',
                border: '1px solid #7D818D',
                backdropFilter: 'blur(6px)',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
              }}>
                <div style={{ margin: '0 10px', width: '20px', height: '20px' }}>
                  {/* Email icon placeholder */}
                  <Image 
                    src="/api/placeholder/20/20" 
                    alt="Email icon" 
                    width={20} 
                    height={20} 
                    style={{ backgroundColor: '#0D98BA', borderRadius: '50%' }}
                  />
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
                    fontSize: 'clamp(14px, 1.5vw, 18px)',
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
            gap: '20px',
            marginBottom: '15px',
          }}>
            <div style={{ flex: 1 }}>
              <label style={{
                display: 'block',
                fontStyle: 'normal',
                fontWeight: 700,
                fontSize: 'clamp(14px, 1.5vw, 18px)',
                lineHeight: '150%',
                letterSpacing: '-0.006em',
                color: '#E6E6E6',
                marginBottom: '5px',
              }} className={lato.className}>Company Name</label>
              <div style={{
                position: 'relative',
                boxSizing: 'border-box',
                width: '100%',
                height: '50px',
                background: 'rgba(36, 36, 36, 0.2)',
                border: '1px solid #7D818D',
                backdropFilter: 'blur(6px)',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
              }}>
                <div style={{ margin: '0 10px', width: '20px', height: '20px' }}>
                  {/* Company icon placeholder */}
                  <Image 
                    src="/api/placeholder/20/20" 
                    alt="Company icon" 
                    width={20} 
                    height={20} 
                    style={{ backgroundColor: '#0D98BA', borderRadius: '50%' }}
                  />
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
                    fontSize: 'clamp(14px, 1.5vw, 18px)',
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
            
            <div style={{ flex: 1 }}>
              <label style={{
                display: 'block',
                fontStyle: 'normal',
                fontWeight: 700,
                fontSize: 'clamp(14px, 1.5vw, 18px)',
                lineHeight: '150%',
                letterSpacing: '-0.006em',
                color: '#E6E6E6',
                marginBottom: '5px',
              }} className={lato.className}>Contact Number</label>
              <div style={{
                position: 'relative',
                boxSizing: 'border-box',
                width: '100%',
                height: '50px',
                background: 'rgba(36, 36, 36, 0.2)',
                border: '1px solid #7D818D',
                backdropFilter: 'blur(6px)',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
              }}>
                <div style={{ margin: '0 10px', width: '20px', height: '20px' }}>
                  {/* Contact icon placeholder */}
                  <Image 
                    src="/api/placeholder/20/20" 
                    alt="Contact icon" 
                    width={20} 
                    height={20} 
                    style={{ backgroundColor: '#0D98BA', borderRadius: '50%' }}
                  />
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
                    fontSize: 'clamp(14px, 1.5vw, 18px)',
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

          <div style={{ flex: 1, marginBottom: '15px' }}>
            <label style={{
              display: 'block',
              fontStyle: 'normal',
              fontWeight: 700,
              fontSize: 'clamp(14px, 1.5vw, 18px)',
              lineHeight: '150%',
              letterSpacing: '-0.006em',
              color: '#E6E6E6',
              marginBottom: '5px',
            }} className={lato.className}>Your Message</label>
            <textarea 
              name="message"
              placeholder="Describe Your Project Needs..."
              style={{
                boxSizing: 'border-box',
                width: '100%',
                height: '100px',
                background: 'rgba(36, 36, 36, 0.2)',
                border: '1px solid #7D818D',
                backdropFilter: 'blur(6px)',
                borderRadius: '10px',
                padding: '15px',
                fontFamily: 'Barlow, sans-serif',
                fontStyle: 'normal',
                fontWeight: 400,
                fontSize: 'clamp(14px, 1.5vw, 18px)',
                lineHeight: '24px',
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
              height: '40px',
              background: '#0D98BA',
              borderRadius: '6px',
              fontStyle: 'normal',
              fontWeight: 500,
              fontSize: 'clamp(12px, 1vw, 14px)',
              lineHeight: '150%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#1A1A1A',
              border: 'none',
              cursor: 'pointer',
              marginTop: 'auto',
            }}
            className={barlow.className}
          >
            Get in touch
          </button>
        </form>
      </div>
      
      {/* Background decorative elements */}
      <div style={{
        position: 'absolute',
        bottom: '10%',
        left: '5%',
        width: '150px',
        height: '150px',
        opacity: '0.1',
        zIndex: 0,
      }}>
        <Image 
          src="/api/placeholder/150/150" 
          alt="Decorative element" 
          width={150} 
          height={150} 
          style={{ borderRadius: '50%' }}
        />
      </div>
      
      <div style={{
        position: 'absolute',
        top: '10%',
        right: '5%',
        width: '100px',
        height: '100px',
        opacity: '0.1',
        zIndex: 0,
      }}>
        <Image 
          src="/api/placeholder/100/100" 
          alt="Decorative element" 
          width={100} 
          height={100} 
          style={{ borderRadius: '50%' }}
        />
      </div>
    </div>
  );
}