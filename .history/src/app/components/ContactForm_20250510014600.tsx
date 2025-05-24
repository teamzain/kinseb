'use client';

import { useEffect, useState, useRef, CSSProperties } from 'react';

const ContactSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set isVisible to true after a short delay for animation
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    // Set initial window width (only in browser environment)
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
      
      // Handle window resize
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };
      
      window.addEventListener('resize', handleResize);
      
      return () => {
        clearTimeout(timer);
        window.removeEventListener('resize', handleResize);
      };
    }
    
    return () => clearTimeout(timer);
  }, []);

  // Determine if mobile layout should be used
  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;

  // Apply responsive styles based on window width
  const getContainerStyle = () => {
    const baseStyle = {...styles.container};
    if (isMobile) {
      return {
        ...baseStyle,
        flexDirection: 'column' as 'column',
      };
    }
    return baseStyle;
  };

  const getLeftContentStyle = () => {
    const baseStyle = {...styles.leftContent};
    if (isMobile) {
      return {
        ...baseStyle,
        width: '100%',
        marginRight: '0',
        marginBottom: '40px',
        alignItems: 'center' as 'center',
        textAlign: 'center' as 'center',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateX(0)' : 'translateX(-100px)',
        transition: isVisible ? 'all 1.2s ease-out' : 'all 0s'
      };
    } else if (isTablet) {
      return {
        ...baseStyle,
        width: '45%',
        marginRight: '5%',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateX(0)' : 'translateX(-100px)',
        transition: isVisible ? 'all 1.2s ease-out' : 'all 0s'
      };
    } else {
      return {
        ...baseStyle,
        width: '40%',
        marginRight: '5%',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateX(0)' : 'translateX(-100px)',
        transition: isVisible ? 'all 1.2s ease-out' : 'all 0s'
      };
    }
  };

  const getVectorStyle = () => {
    const baseStyle = {...styles.vector};
    if (isMobile) {
      return {
        ...baseStyle,
        left: '15%',
        right: '15%',
      };
    }
    return baseStyle;
  };

  const getSocialIconsStyle = () => {
    const baseStyle = {...styles.socialIcons};
    if (isMobile) {
      return {
        ...baseStyle,
        justifyContent: 'center' as 'center',
      };
    }
    return baseStyle;
  };

  const getFollowUsStyle = () => {
    const baseStyle = {...styles.followUs};
    if (isMobile) {
      return {
        ...baseStyle,
        textAlign: 'center' as 'center',
        marginTop: '-40px',
        fontSize: '20px',
      };
    }
    return baseStyle;
  };

  const getFormContainerStyle = () => {
    const baseStyle = {...styles.formContainer};
    if (isMobile) {
      return {
        ...baseStyle,
        width: '100%',
        maxHeight: 'none',
        padding: '20px',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateX(0)' : 'translateX(100px)',
        transition: isVisible ? 'all 1.5s ease-out' : 'all 0s'
      };
    } else if (isTablet) {
      return {
        ...baseStyle,
        width: '90%',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateX(0)' : 'translateX(100px)',
        transition: isVisible ? 'all 1.5s ease-out' : 'all 0s'
      };
    } else {
      return {
        ...baseStyle,
        width: '560px',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateX(0)' : 'translateX(100px)',
        transition: isVisible ? 'all 1.5s ease-out' : 'all 0s'
      };
    }
  };

  const getFormRowStyle = () => {
    const baseStyle = {...styles.formRow};
    if (isMobile) {
      return {
        ...baseStyle,
        flexDirection: 'column' as 'column',
        gap: '15px',
      };
    }
    return baseStyle;
  };

  const getInputContainerStyle = () => {
    const baseStyle = {...styles.inputContainer};
    if (isMobile) {
      return {
        ...baseStyle,
        width: '100%',
      };
    }
    return {
      ...baseStyle,
      width: '47%',
    };
  };

  const getButtonStyle = () => {
    const baseStyle = {...styles.button};
    if (isMobile) {
      return {
        ...baseStyle,
        width: '100%',
        alignSelf: 'center' as 'center',
      };
    }
    return {
      ...baseStyle,
      width: '125px',
    };
  };

  const getHeadingStyle = () => {
    const baseStyle = {...styles.heading};
    if (isMobile) {
      return {
        ...baseStyle,
        fontSize: '28px',
        lineHeight: '38px',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(-20px)',
        transition: 'all 1.6s ease-out',
      };
    } else if (isTablet) {
      return {
        ...baseStyle,
        fontSize: '32px',
        lineHeight: '46px',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(-20px)',
        transition: 'all 1.6s ease-out',
      };
    } else {
      return {
        ...baseStyle,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(-20px)',
        transition: 'all 1.6s ease-out',
      };
    }
  };

  const getFormHeadingStyle = () => {
    const baseStyle = {...styles.formHeading};
    if (isMobile) {
      return {
        ...baseStyle,
        fontSize: '26px',
        lineHeight: '36px',
      };
    }
    return baseStyle;
  };

  const getSubheadingStyle = () => {
    const baseStyle = {...styles.subheading};
    if (isMobile) {
      return {
        ...baseStyle,
        fontSize: '18px',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(-20px)',
        transition: 'all 1.4s ease-out',
      };
    }
    return {
      ...baseStyle,
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(-20px)',
      transition: 'all 1.4s ease-out',
    };
  };

  const getParagraphStyle = () => {
    const baseStyle = {...styles.paragraph};
    if (isMobile) {
      return {
        ...baseStyle,
        fontSize: '14px',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(-20px)',
        transition: 'all 1.8s ease-out',
      };
    }
    return {
      ...baseStyle,
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(-20px)',
      transition: 'all 1.8s ease-out',
    };
  };

  const getSocialStyle = () => {
    const baseStyle = {...styles.social};
    if (isMobile) {
      return {
        ...baseStyle,
        marginTop: '30px',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 2s ease-out',
      };
    }
    return {
      ...baseStyle,
      marginTop: '60px',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
      transition: 'all 2s ease-out',
    };
  };

  const getImageContainerStyle = () => {
    return {
      ...styles.imageContainer,
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'scale(1)' : 'scale(0.8)',
      transition: 'all 2.2s ease-out',
    };
  };

  return (
    <section ref={sectionRef} style={styles.frame}>
      <div style={getVectorStyle()}></div>
      
      <div style={getContainerStyle()}>
        {/* Left Side */}
        <div style={getLeftContentStyle()}>
          <div style={styles.leftContentTop}>
            <h3 style={getSubheadingStyle()}>Turn Your Ideas Into</h3>
            <h2 style={getHeadingStyle()}>
              <span style={styles.impactful}>Impactful</span> Digital Products
            </h2>
            <p style={getParagraphStyle()}>
              Send us your idea — we'll turn it into something brilliant.
            </p>
          </div>
          
          <div style={getImageContainerStyle()}>
            <img 
              src="/images/message.svg" 
              alt="Digital Product" 
              style={styles.centerImage}
            />
          </div>
          
          <div style={getSocialStyle()}>
            <h3 style={getFollowUsStyle()}>Follow us</h3>
            <div style={getSocialIconsStyle()}>
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
        <div style={getFormContainerStyle()}>
          <h2 style={getFormHeadingStyle()}>Start a Conversation</h2>
          
          <div style={getFormRowStyle()}>
            <div style={getInputContainerStyle()}>
              <div style={styles.iconContainer}>
                <img src="/images/user.svg" alt="User Icon" style={styles.inputIcon} />
              </div>
              <input type="text" placeholder="Your Name" style={styles.input} />
            </div>
            
            <div style={getInputContainerStyle()}>
              <div style={styles.iconContainer}>
                <img src="/images/email.svg" alt="Email Icon" style={styles.inputIcon} />
              </div>
              <input type="email" placeholder="Your Email" style={styles.input} />
            </div>
          </div>
          
          <div style={getFormRowStyle()}>
            <div style={getInputContainerStyle()}>
              <div style={styles.iconContainer}>
                <img src="/images/company.svg" alt="Company Icon" style={styles.inputIcon} />
              </div>
              <input type="text" placeholder="Company Name" style={styles.input} />
            </div>
            
            <div style={getInputContainerStyle()}>
              <div style={styles.iconContainer}>
                <img src="/images/phone.svg" alt="Phone Icon" style={styles.inputIcon} />
              </div>
              <input type="tel" placeholder="Contact Number" style={styles.input} />
            </div>
          </div>
          
          <div style={styles.textareaContainer}>
            <textarea placeholder="Describe Your Project Need." style={styles.textarea}></textarea>
          </div>
          
          <button style={getButtonStyle()}>
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
    padding: '30px 15px',
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
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    maxWidth: '1280px',
    zIndex: 2,
    position: 'relative',
  },
  vector: {
    position: 'absolute',
    left: '35%',
    right: '43%',
    top: '32%',
    bottom: '31%',
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
    height: '100%',
    opacity: 0,
    transform: 'translateX(-100px)',
    transition: 'all 0s',
  },
  leftContentTop: {
    marginTop: '20px',
    marginBottom: '20px',
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
    fontWeight: 500,
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
    width: '100%',
    maxWidth: '400px',
  },
  centerImage: {
    maxWidth: '100%',
    borderRadius: '8px',
    height: 'auto',
  },
  social: {
    marginTop: '60px',
    marginBottom: '30px',
    width: '100%',
  },
  followUs: {
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 600,
    fontSize: '24px',
    lineHeight: '36px',
    letterSpacing: '-0.03em',
    color: '#FFFFFF',
    marginTop: '-80px',
    marginBottom: '15px',
    textAlign: 'left',
  },
  socialIcons: {
    display: 'flex',
    gap: '25px',
    justifyContent: 'flex-start',
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
    maxWidth: '560px',
    padding: '25px',
    background: 'linear-gradient(180deg, #0D98BA -213.84%, #04091D 103.97%)',
    border: '1px solid #07435D',
    backdropFilter: 'blur(6px)',
    borderRadius: '10px',
    position: 'relative',
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box',
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
    boxSizing: 'border-box',
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
    height: '45px',
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