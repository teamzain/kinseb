'use client';

import { useEffect, useState, useRef, CSSProperties } from 'react';

const ContactSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize window width on client side
    setWindowWidth(window.innerWidth);
    
    // Set isVisible to true immediately to show animation on load
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    // Add resize listener
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Determine if we're on mobile or desktop
  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;

  return (
    <section ref={sectionRef} className="contact-section" style={styles.frame}>
      <div style={styles.vector}></div>
      
      {/* Container for better responsiveness */}
      <div style={styles.container}>
        {/* Left Side */}
        <div style={{
          ...styles.leftContent,
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateX(0)' : 'translateX(-100px)',
          transition: isVisible ? 'all 1.2s ease-out' : 'all 0s',
          width: isMobile ? '100%' : isTablet ? '45%' : '40%',
          marginRight: isMobile ? '0' : '5%',
          marginBottom: isMobile ? '30px' : '0',
        }}>
          <div style={styles.leftContentTop}>
            <h3 style={{
              ...styles.subheading,
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(-20px)',
              transition: 'all 1.4s ease-out',
              fontSize: isMobile ? '18px' : '22px',
            }}>Turn Your Ideas Into</h3>
            <h2 style={{
              ...styles.heading,
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(-20px)',
              transition: 'all 1.6s ease-out',
              fontSize: isMobile ? '28px' : isTablet ? '32px' : '38px',
              lineHeight: isMobile ? '38px' : isTablet ? '46px' : '54px',
            }}>
              <span style={styles.impactful}>Impactful</span> Digital Products
            </h2>
            <p style={{
              ...styles.paragraph,
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(-20px)',
              transition: 'all 1.8s ease-out',
            }}>
              Send us your idea — we'll turn it into something brilliant.
            </p>
          </div>
          
          {!isMobile && (
            <div style={{
              ...styles.imageContainer,
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'scale(1)' : 'scale(0.8)',
              transition: 'all 2.2s ease-out',
            }}>
              <img 
                src="/images/message.svg" 
                alt="Digital Product" 
                style={styles.centerImage}
              />
            </div>
          )}
          
          <div style={{
            ...styles.social,
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 2s ease-out',
            marginTop: isMobile ? '20px' : '60px',
          }}>
            <h3 style={{
              ...styles.followUs,
              marginTop: isMobile ? '0' : '-80px',
              textAlign: isMobile ? 'center' : 'left',
            }}>Follow us</h3>
            <div style={{
              ...styles.socialIcons,
              justifyContent: isMobile ? 'center' : 'left',
            }}>
              <a href="#" style={styles.iconLink}>
                <img src="/images/twitter.svg" alt="Twitter" style={styles.socialIcon} />
              </a>
              <a href="#" style={styles.iconLink}>
                <img src="/images/facebook.svg" alt="Facebook" style={styles.socialIcon} />
              </a>
              <a href="#" style={styles.iconLink}>
                <img src="/images/insta.svg" alt="Instagram" style={styles.socialIcon} />
              </a>
              <a href="#" style={styles.iconLink}>
                <img src="/images/linkedin.svg" alt="LinkedIn" style={styles.socialIcon} />
              </a>
            </div>
          </div>
        </div>
        
        {/* Right Side - Form Container */}
        <div style={{
          ...styles.formContainer,
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateX(0)' : 'translateX(100px)',
          transition: isVisible ? 'all 1.5s ease-out' : 'all 0s',
          width: isMobile ? '100%' : isTablet ? '50%' : '560px',
          maxWidth: '100%',
        }}>
          <h2 style={{
            ...styles.formHeading,
            fontSize: isMobile ? '24px' : '32px',
            lineHeight: isMobile ? '36px' : '48px',
          }}>Start a Conversation</h2>
          
          <div style={{
            ...styles.formRow,
            flexDirection: isMobile ? 'column' : 'row',
            gap: isMobile ? '15px' : '20px',
          }}>
            <div style={{
              ...styles.inputContainer,
              width: isMobile ? '100%' : '47%',
            }}>
              <div style={styles.iconContainer}>
                <img src="/images/user.svg" alt="User Icon" style={styles.inputIcon} />
              </div>
              <input type="text" placeholder="Your Name" style={styles.input} />
            </div>
            
            <div style={{
              ...styles.inputContainer,
              width: isMobile ? '100%' : '47%',
            }}>
              <div style={styles.iconContainer}>
                <img src="/images/email.svg" alt="Email Icon" style={styles.inputIcon} />
              </div>
              <input type="email" placeholder="Your Email" style={styles.input} />
            </div>
          </div>
          
          <div style={{
            ...styles.formRow,
            flexDirection: isMobile ? 'column' : 'row',
            gap: isMobile ? '15px' : '20px',
          }}>
            <div style={{
              ...styles.inputContainer,
              width: isMobile ? '100%' : '47%',
            }}>
              <div style={styles.iconContainer}>
                <img src="/images/company.svg" alt="Company Icon" style={styles.inputIcon} />
              </div>
              <input type="text" placeholder="Company Name" style={styles.input} />
            </div>
            
            <div style={{
              ...styles.inputContainer,
              width: isMobile ? '100%' : '47%',
            }}>
              <div style={styles.iconContainer}>
                <img src="/images/phone.svg" alt="Phone Icon" style={styles.inputIcon} />
              </div>
              <input type="tel" placeholder="Contact Number" style={styles.input} />
            </div>
          </div>
          
          <div style={styles.textareaContainer}>
            <textarea 
              placeholder="Describe Your Project Need." 
              style={styles.textarea}
              rows={isMobile ? 4 : 6}
            ></textarea>
          </div>
          
          <button style={{
            ...styles.button,
            alignSelf: isMobile ? 'center' : 'flex-start',
          }}>
            <span style={styles.buttonText}>Get in Touch</span>
          </button>
        </div>
      </div>
    </section>
  );
};

// Define styles as TypeScript compatible CSS properties
const styles: Record<string, CSSProperties> = {
  frame: {
    position: 'relative',
    width: '100%',
    minHeight: '100vh',
    padding: '40px 20px',
    background: '#04091D',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: '1200px',
    zIndex: 2,
  },
  vector: {
    position: 'absolute',
    left: '35.42%',
    right: '43.75%',
    top: '32%',
    bottom: '31.76%',
    background: 'rgba(13, 152, 186, 0.04)',
    transform: 'matrix(-1, 0, 0, 1, 0, 0)',
    zIndex: 1,
  },
  leftContent: {
    maxWidth: '580px',
    padding: '0 15px',
    position: 'relative',
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  leftContentTop: {
    marginTop: '30px',
    marginBottom: '30px',
  },
  subheading: {
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 600,
    fontSize: '22px',
    lineHeight: '33px',
    color: '#0D94BB',
    margin: '0 0 8px 0',
  },
  heading: {
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 600,
    fontSize: '38px',
    lineHeight: '54px',
    color: '#FFFFFF',
    margin: '0 0 16px 0',
  },
  impactful: {
    color: '#0D98BA',
  },
  paragraph: {
    fontFamily: 'Lato, sans-serif',
    fontWeight: 600,
    fontSize: '16px',
    lineHeight: '150%',
    letterSpacing: '-0.006em',
    color: '#E6E6E6',
    marginBottom: '20px',
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 auto 20px',
  },
  centerImage: {
    maxWidth: '100%',
    height: 'auto',
    borderRadius: '8px',
  },
  social: {
    marginBottom: '30px',
  },
  followUs: {
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 600,
    fontSize: '24px',
    lineHeight: '36px',
    letterSpacing: '-0.03em',
    color: '#FFFFFF',
    marginBottom: '15px',
  },
  socialIcons: {
    display: 'flex',
    gap: '25px',
  },
  iconLink: {
    textDecoration: 'none',
    color: 'inherit',
  },
  socialIcon: {
    width: '24px',
    height: '24px',
    borderRadius: '4px',
    transition: 'transform 0.3s ease',
  },
  inputIcon: {
    width: '24px',
    height: '24px',
  },
  formContainer: {
    padding: '25px',
    background: 'linear-gradient(180deg, #0D98BA -213.84%, #04091D 103.97%)',
    border: '1px solid #07435D',
    backdropFilter: 'blur(6px)',
    borderRadius: '10px',
    position: 'relative',
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column',
  },
  formHeading: {
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 600,
    fontSize: '32px',
    lineHeight: '48px',
    color: '#FFFFFF',
    marginBottom: '25px',
  },
  formRow: {
    display: 'flex',
    marginBottom: '20px',
    width: '100%',
  },
  inputContainer: {
    boxSizing: 'border-box',
    position: 'relative',
    height: '55px',
    background: 'rgba(36, 36, 36, 0.2)',
    border: '1px solid #7D818D',
    backdropFilter: 'blur(6px)',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    flex: '1 1 0',
  },
  iconContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '24px',
    height: '24px',
    marginLeft: '15px',
  },
  input: {
    background: 'transparent',
    border: 'none',
    outline: 'none',
    width: 'calc(100% - 60px)',
    height: '100%',
    padding: '0 10px',
    fontFamily: 'Barlow, sans-serif',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '20px',
    color: '#FFFFFF',
  },
  textareaContainer: {
    boxSizing: 'border-box',
    width: '100%',
    height: '180px',
    background: 'rgba(36, 36, 36, 0.2)',
    border: '1px solid #7D818D',
    backdropFilter: 'blur(6px)',
    borderRadius: '8px',
    padding: '15px',
    marginBottom: '20px',
  },
  textarea: {
    background: 'transparent',
    border: 'none',
    outline: 'none',
    width: '100%',
    height: '100%',
    resize: 'none',
    fontFamily: 'Barlow, sans-serif',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '20px',
    color: '#FFFFFF',
  },
  button: {
    width: '125px',
    height: '40px',
    background: '#0D98BA',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
  },
  buttonText: {
    fontFamily: 'Barlow, sans-serif',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '150%',
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    color: '#1A1A1A',
  },
};

// Add global styles for better responsiveness with CSS-in-JS
const GlobalStyles = () => {
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @media (max-width: 767px) {
        .contact-section {
          padding: 20px 15px !important;
          height: auto !important;
          min-height: 100vh !important;
        }
      }
      
      @media (min-width: 768px) and (max-width: 1023px) {
        .contact-section {
          padding: 30px 20px !important;
          height: auto !important;
          min-height: 100vh !important;
        }
      }
      
      /* For mobile devices in landscape */
      @media (max-height: 500px) and (max-width: 767px) {
        .contact-section {
          height: auto !important;
          padding-top: 20px !important;
          padding-bottom: 20px !important;
        }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  return null;
};

const ResponsiveContactSection = () => (
  <>
    <GlobalStyles />
    <ContactSection />
  </>
);

export default ResponsiveContactSection;