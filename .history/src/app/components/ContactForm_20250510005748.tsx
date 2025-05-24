'use client';

import { useEffect, useState, useRef, CSSProperties } from 'react';

const ContactSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set isVisible to true for animation
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    // Handle resize events
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Responsive styles based on window width
  const isMobile = windowWidth < 768;
  const isSmallMobile = windowWidth < 480;

  return (
    <section ref={sectionRef} style={{
      ...styles.frame,
      flexDirection: isMobile ? 'column' : 'row',
      height: 'auto',
      minHeight: isMobile ? 'auto' : '100vh',
    }}>
      {/* Content Side */}
      <div style={{
        ...styles.contentContainer,
        width: isMobile ? '100%' : '50%',
        padding: isMobile ? '40px 20px' : '60px 40px',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: isVisible ? 'all 0.8s ease-out' : 'all 0s'
      }}>
        <div style={styles.contentWrapper}>
          <h3 style={{
            ...styles.subheading,
            fontSize: isMobile ? '18px' : '20px',
          }}>Turn Your Ideas Into</h3>
          
          <h2 style={{
            ...styles.heading,
            fontSize: isSmallMobile ? '28px' : isMobile ? '32px' : '36px',
          }}>
            <span style={styles.impactful}>Impactful</span> Digital<br />Products
          </h2>
          
          <p style={{
            ...styles.paragraph,
            fontSize: isMobile ? '14px' : '16px',
          }}>
            Send us your idea — we'll turn it into something brilliant.
          </p>
          
          <div style={{
            ...styles.social,
            marginTop: '40px'
          }}>
            <h3 style={{
              ...styles.followUs,
              fontSize: isMobile ? '18px' : '20px',
            }}>Follow us</h3>
            
            <div style={styles.socialIcons}>
              <a href="#" style={styles.iconLink}>
                <div style={styles.socialIconCircle}>
                  <img src="/images/twitter.svg" alt="Twitter" style={styles.socialIcon} />
                </div>
              </a>
              <a href="#" style={styles.iconLink}>
                <div style={styles.socialIconCircle}>
                  <img src="/images/facebook.svg" alt="Facebook" style={styles.socialIcon} />
                </div>
              </a>
              <a href="#" style={styles.iconLink}>
                <div style={styles.socialIconCircle}>
                  <img src="/images/insta.svg" alt="Instagram" style={styles.socialIcon} />
                </div>
              </a>
              <a href="#" style={styles.iconLink}>
                <div style={styles.socialIconCircle}>
                  <img src="/images/linkedin.svg" alt="LinkedIn" style={styles.socialIcon} />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Form Container */}
      <div style={{
        ...styles.formContainer,
        width: isMobile ? '100%' : '50%',
        padding: isSmallMobile ? '30px 20px' : '40px 30px',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: isVisible ? 'all 1s ease-out' : 'all 0s'
      }}>
        <h2 style={{
          ...styles.formHeading,
          fontSize: isSmallMobile ? '24px' : '28px',
          marginBottom: isSmallMobile ? '20px' : '30px',
        }}>Start a Conversation</h2>
        
        <div style={styles.inputWrapper}>
          <div style={styles.inputContainer}>
            <div style={styles.iconContainer}>
              <img src="/images/user.svg" alt="User Icon" style={styles.inputIcon} />
            </div>
            <input type="text" placeholder="Your Name" style={styles.input} />
          </div>
          
          <div style={styles.inputContainer}>
            <div style={styles.iconContainer}>
              <img src="/images/email.svg" alt="Email Icon" style={styles.inputIcon} />
            </div>
            <input type="email" placeholder="Your Email" style={styles.input} />
          </div>
          
          <div style={styles.inputContainer}>
            <div style={styles.iconContainer}>
              <img src="/images/company.svg" alt="Company Icon" style={styles.inputIcon} />
            </div>
            <input type="text" placeholder="Company Name" style={styles.input} />
          </div>
          
          <div style={styles.inputContainer}>
            <div style={styles.iconContainer}>
              <img src="/images/phone.svg" alt="Phone Icon" style={styles.inputIcon} />
            </div>
            <input type="tel" placeholder="Contact Number" style={styles.input} />
          </div>
        </div>
        
        <div style={styles.textareaContainer}>
          <textarea placeholder="Describe Your Project Need." style={styles.textarea}></textarea>
        </div>
        
        <button 
          style={styles.button}
          onMouseEnter={(e) => e.currentTarget.style.background = '#0A7A9A'}
          onMouseLeave={(e) => e.currentTarget.style.background = '#0D98BA'}
        >
          <span style={styles.buttonText}>Get in Touch</span>
        </button>
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
    background: '#04091D',
    display: 'flex',
    flexWrap: 'wrap',
    overflow: 'hidden',
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    boxSizing: 'border-box',
  },
  contentWrapper: {
    maxWidth: '450px',
  },
  subheading: {
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 600,
    fontSize: '20px',
    lineHeight: '1.4',
    color: '#0D94BB',
    margin: '0 0 8px 0',
  },
  heading: {
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 600,
    fontSize: '36px',
    lineHeight: '1.3',
    color: '#FFFFFF',
    margin: '0 0 16px 0',
  },
  impactful: {
    color: '#0D98BA',
  },
  paragraph: {
    fontFamily: 'Lato, sans-serif',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '1.5',
    color: '#E6E6E6',
    marginBottom: '20px',
  },
  social: {
    marginTop: '30px',
  },
  followUs: {
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 600,
    fontSize: '20px',
    lineHeight: '1.4',
    color: '#FFFFFF',
    marginBottom: '15px',
  },
  socialIcons: {
    display: 'flex',
    gap: '15px',
  },
  iconLink: {
    textDecoration: 'none',
    color: 'inherit',
  },
  socialIconCircle: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.08)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'background 0.3s ease',
  },
  socialIcon: {
    width: '20px',
    height: '20px',
  },
  formContainer: {
    background: 'rgba(13, 152, 186, 0.1)',
    borderRadius: '10px',
    boxSizing: 'border-box',
    border: '1px solid rgba(13, 152, 186, 0.2)',
    display: 'flex',
    flexDirection: 'column',
  },
  formHeading: {
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 600,
    fontSize: '28px',
    lineHeight: '1.3',
    color: '#FFFFFF',
    marginBottom: '30px',
  },
  inputWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    marginBottom: '15px',
  },
  inputContainer: {
    boxSizing: 'border-box',
    position: 'relative',
    height: '50px',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  iconContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '24px',
    height: '24px',
    marginLeft: '15px',
    opacity: 0.7,
  },
  inputIcon: {
    width: '20px',
    height: '20px',
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
    height: '150px',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
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
    alignSelf: 'flex-start',
  },
  buttonText: {
    fontFamily: 'Barlow, sans-serif',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '150%',
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    color: '#FFFFFF',
  },
};

export default ContactSection;