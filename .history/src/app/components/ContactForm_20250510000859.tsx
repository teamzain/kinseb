'use client';

import { useEffect, useState, useRef, CSSProperties } from 'react';

const ContactSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // When the section is 20% visible, trigger the animation
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} style={styles.frame}>
      <div style={styles.vector}></div>
      
      {/* Left Side */}
      <div style={{
        ...styles.leftContent,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateX(0)' : 'translateX(-50px)',
        transition: isVisible ? 'all 0.8s ease-out' : 'all 0s'
      }}>
        <div style={styles.leftContentTop}>
          <h3 style={styles.subheading}>Turn Your Ideas Into</h3>
          <h2 style={styles.heading}>
            <span style={styles.impactful}>Impactful</span> Digital Products
          </h2>
          <p style={styles.paragraph}>
            Send us your idea — we'll turn it into something brilliant.
          </p>
        </div>
        
        <div style={styles.imageContainer}>
          <img 
            src="/images/message.svg" 
            alt="Digital Product" 
            style={styles.centerImage}
          />
        </div>
        
        <div style={styles.social}>
          <h3 style={styles.followUs}>Follow us</h3>
          <div style={styles.socialIcons}>
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
              <img src="/api/placeholder/24/24" alt="LinkedIn" style={styles.socialIcon} />
            </a>
          </div>
        </div>
      </div>
      
      {/* Right Side - Form Container */}
      <div style={{
        ...styles.formContainer,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateX(0)' : 'translateX(50px)',
        transition: isVisible ? 'all 0.8s ease-out' : 'all 0s'
      }}>
        <h2 style={styles.formHeading}>Start a Conversation</h2>
        
        <div style={styles.formRow}>
          <div style={styles.inputContainer}>
            <div style={styles.iconContainer}>
              <img src="/images/message.svg" alt="User Icon" style={styles.inputIcon} />
            </div>
            <input type="text" placeholder="Your Name" style={styles.input} />
          </div>
          
          <div style={styles.inputContainer}>
            <div style={styles.iconContainer}>
              <img src="/api/placeholder/24/24" alt="Email Icon" style={styles.inputIcon} />
            </div>
            <input type="email" placeholder="Your Email" style={styles.input} />
          </div>
        </div>
        
        <div style={styles.formRow}>
          <div style={styles.inputContainer}>
            <div style={styles.iconContainer}>
              <img src="/api/placeholder/24/24" alt="Company Icon" style={styles.inputIcon} />
            </div>
            <input type="text" placeholder="Company Name" style={styles.input} />
          </div>
          
          <div style={styles.inputContainer}>
            <div style={styles.iconContainer}>
              <img src="/api/placeholder/24/24" alt="Phone Icon" style={styles.inputIcon} />
            </div>
            <input type="tel" placeholder="Contact Number" style={styles.input} />
          </div>
        </div>
        
        <div style={styles.textareaContainer}>
          <textarea placeholder="Describe Your Project Need." style={styles.textarea}></textarea>
        </div>
        
        <button style={styles.button}>
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
    height: '100vh', // Use viewport height instead of fixed height
    maxHeight: '700px', // Limit max height to fit on screen
    padding: '30px 0',
    background: '#04091D',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
    width: '45%',
    maxWidth: '600px',
    padding: '0 30px',
    position: 'relative',
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    opacity: 0,
    transform: 'translateX(-50px)',
    transition: 'all 0s',
  },
  leftContentTop: {
    marginTop: '20px', // Push to top
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
    margin: '0 auto',
  },
  centerImage: {
    maxWidth: '100%',
    borderRadius: '8px',
  },
  social: {
    marginTop: '20px',
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
    width: '560px',
    maxHeight: '600px',
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
    gap: '20px',
    marginBottom: '20px',
    width: '100%',
  },
  inputContainer: {
    boxSizing: 'border-box',
    position: 'relative',
    width: '47%',
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
    color: '#1A1A1A',
  },
};

export default ContactSection;