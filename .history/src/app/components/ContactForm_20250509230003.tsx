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
        <h3 style={styles.subheading}>Turn Your Ideas Into</h3>
        <h2 style={styles.heading}>
          <span style={styles.impactful}>Impactful</span> Digital Products
        </h2>
        <p style={styles.paragraph}>
          Send us your idea — we'll turn it into something brilliant.
        </p>
        <div style={styles.social}>
          <h3 style={styles.followUs}>Follow us</h3>
          <div style={styles.socialIcons}>
            <a href="#" style={styles.iconLink}>
              <i style={styles.icon}>
                <svg width="24" height="21" viewBox="0 0 24 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23 1.01a10 10 0 01-2.82.78 4.96 4.96 0 002.17-2.72 9.9 9.9 0 01-3.12 1.19 4.92 4.92 0 00-8.52 3.37 13.87 13.87 0 01-10.09-5.12 4.93 4.93 0 001.52 6.57 4.9 4.9 0 01-2.23-.61v.06c0 2.39 1.7 4.38 3.95 4.84a4.95 4.95 0 01-2.22.08 4.93 4.93 0 004.6 3.42A9.87 9.87 0 010 15.54 13.98 13.98 0 007.55 18c9.06 0 14-7.5 14-14 0-.21 0-.42-.01-.63A10 10 0 0023 1.01z" fill="#7D818D"/>
                </svg>
              </i>
            </a>
            <a href="#" style={styles.iconLink}>
              <i style={styles.icon}>
                <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.62 0H1.38C.62 0 0 .62 0 1.38v22.24C0 24.38.62 25 1.38 25h11.97v-9.67H10.1v-3.76h3.25V8.77c0-3.23 1.97-4.99 4.86-4.99 1.38 0 2.57.1 2.92.15v3.38h-2c-1.56 0-1.87.74-1.87 1.84v2.41h3.74l-.49 3.76h-3.25V25h6.36c.76 0 1.38-.62 1.38-1.38V1.38C25 .62 24.38 0 23.62 0z" fill="#7D818D"/>
                </svg>
              </i>
            </a>
            <a href="#" style={styles.iconLink}>
              <i style={styles.icon}>
                <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.5 2.25c3.36 0 3.76.01 5.08.07 1.23.06 1.9.26 2.34.43.59.23 1 .5 1.44.94.44.44.71.85.94 1.44.17.44.37 1.11.43 2.34.06 1.32.07 1.72.07 5.08 0 3.36-.01 3.76-.07 5.08-.06 1.23-.26 1.9-.43 2.34-.23.59-.5 1-.94 1.44-.44.44-.85.71-1.44.94-.44.17-1.11.37-2.34.43-1.32.06-1.72.07-5.08.07-3.36 0-3.76-.01-5.08-.07-1.23-.06-1.9-.26-2.34-.43-.59-.23-1-.5-1.44-.94-.44-.44-.71-.85-.94-1.44-.17-.44-.37-1.11-.43-2.34-.06-1.32-.07-1.72-.07-5.08 0-3.36.01-3.76.07-5.08.06-1.23.26-1.9.43-2.34.23-.59.5-1 .94-1.44.44-.44.85-.71 1.44-.94.44-.17 1.11-.37 2.34-.43 1.32-.06 1.72-.07 5.08-.07zM12.5 0c-3.41 0-3.84.01-5.18.08-1.34.06-2.25.27-3.05.58a6.17 6.17 0 00-2.23 1.45A6.17 6.17 0 00.6 4.34C.29 5.14.08 6.06.02 7.4-.05 8.73-.04 9.16-.04 12.57c0 3.41.01 3.84.08 5.18.06 1.34.27 2.25.58 3.05a6.17 6.17 0 001.45 2.23 6.17 6.17 0 002.23 1.45c.8.31 1.72.52 3.05.58 1.34.07 1.77.08 5.18.08 3.41 0 3.84-.01 5.18-.08 1.34-.06 2.25-.27 3.05-.58a6.17 6.17 0 002.23-1.45 6.17 6.17 0 001.45-2.23c.31-.8.52-1.72.58-3.05.07-1.34.08-1.77.08-5.18 0-3.41-.01-3.84-.08-5.18-.06-1.34-.27-2.25-.58-3.05a6.17 6.17 0 00-1.45-2.23 6.17 6.17 0 00-2.23-1.45c-.8-.31-1.72-.52-3.05-.58C16.34.01 15.9 0 12.5 0z" fill="#7D818D"/>
                  <path d="M12.5 6.11a6.46 6.46 0 100 12.92 6.46 6.46 0 000-12.92zm0 10.66a4.2 4.2 0 110-8.39 4.2 4.2 0 010 8.39z" fill="#7D818D"/>
                  <path d="M20.68 5.85a1.51 1.51 0 11-3.02 0 1.51 1.51 0 013.02 0z" fill="#7D818D"/>
                </svg>
              </i>
            </a>
            <a href="#" style={styles.iconLink}>
              <i style={styles.icon}>
                <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.18 0H1.82C.82 0 0 .82 0 1.82v21.36C0 24.18.82 25 1.82 25h21.36c1 0 1.82-.82 1.82-1.82V1.82C25 .82 24.18 0 23.18 0zM7.5 21.43H3.75V9.47H7.5v11.96zm-1.88-13.6a2.18 2.18 0 110-4.36 2.18 2.18 0 010 4.36zm15.88 13.6h-3.75v-5.89c0-1.4-.03-3.19-1.95-3.19-1.95 0-2.25 1.52-2.25 3.09v6H9.8V9.47h3.6v1.65h.05a3.95 3.95 0 013.55-1.95c3.8 0 4.5 2.5 4.5 5.75v6.51z" fill="#7D818D"/>
                </svg>
              </i>
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
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="#0D98BA" strokeWidth="2"/>
                <circle cx="12" cy="7" r="4" stroke="#0D98BA" strokeWidth="2"/>
              </svg>
            </div>
            <input type="text" placeholder="Your Name" style={styles.input} />
          </div>
          
          <div style={styles.inputContainer}>
            <div style={styles.iconContainer}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="4" stroke="#0D98BA" strokeWidth="2"/>
                <path d="M16 7.9A7 7 0 0 0 9.9 4" stroke="#0D98BA" strokeWidth="2"/>
                <path d="M20 4a9 9 0 0 0-9-9" stroke="#0D98BA" strokeWidth="2"/>
              </svg>
            </div>
            <input type="email" placeholder="Your Email" style={styles.input} />
          </div>
        </div>
        
        <div style={styles.formRow}>
          <div style={styles.inputContainer}>
            <div style={styles.iconContainer}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="3" width="20" height="18" rx="2" stroke="#0D98BA" strokeWidth="2"/>
              </svg>
            </div>
            <input type="text" placeholder="Company Name" style={styles.input} />
          </div>
          
          <div style={styles.inputContainer}>
            <div style={styles.iconContainer}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 20v-2a4 4 0 00-2-3.5M15 7A4 4 0 0118 10" stroke="#0D98BA" strokeWidth="1.5"/>
                <path d="M4 7h10v10H4V7z" stroke="#0D98BA" strokeWidth="1.5"/>
              </svg>
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
    height: '828px',
    padding: '67px 0',
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
    width: '50%',
    maxWidth: '674px',
    padding: '0 30px',
    position: 'relative',
    zIndex: 2,
    opacity: 0,
    transform: 'translateX(-50px)',
    transition: 'all 0s',
  },
  subheading: {
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 600,
    fontSize: '25px',
    lineHeight: '38px',
    color: '#0D94BB',
    margin: '0 0 8px 0',
  },
  heading: {
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 600,
    fontSize: '45px',
    lineHeight: '68px',
    color: '#FFFFFF',
    margin: '0 0 16px 0',
  },
  impactful: {
    color: '#0D98BA',
  },
  paragraph: {
    fontFamily: 'Lato, sans-serif',
    fontWeight: 600,
    fontSize: '18px',
    lineHeight: '150%',
    letterSpacing: '-0.006em',
    color: '#E6E6E6',
    marginBottom: '50px',
  },
  social: {
    marginTop: '120px',
  },
  followUs: {
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 600,
    fontSize: '30px',
    lineHeight: '64px',
    letterSpacing: '-0.03em',
    color: '#FFFFFF',
    marginBottom: '20px',
  },
  socialIcons: {
    display: 'flex',
    gap: '30px',
  },
  iconLink: {
    textDecoration: 'none',
    color: 'inherit',
  },
  icon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'transform 0.3s ease',
  },
  formContainer: {
    width: '663px',
    height: '643px',
    padding: '30px',
    background: 'linear-gradient(180deg, #0D98BA -213.84%, #04091D 103.97%)',
    border: '1px solid #07435D',
    backdropFilter: 'blur(6px)',
    borderRadius: '10px',
    position: 'relative',
    zIndex: 2,
  },
  formHeading: {
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 600,
    fontSize: '45px',
    lineHeight: '68px',
    color: '#FFFFFF',
    marginBottom: '30px',
  },
  formRow: {
    display: 'flex',
    gap: '30px',
    marginBottom: '26px',
    width: '100%',
  },
  inputContainer: {
    boxSizing: 'border-box',
    position: 'relative',
    width: '281px',
    height: '67px',
    background: 'rgba(36, 36, 36, 0.2)',
    border: '1px solid #7D818D',
    backdropFilter: 'blur(6px)',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
  },
  iconContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '24px',
    height: '24px',
    marginLeft: '21px',
  },
  input: {
    background: 'transparent',
    border: 'none',
    outline: 'none',
    width: 'calc(100% - 70px)',
    height: '100%',
    padding: '0 15px',
    fontFamily: 'Barlow, sans-serif',
    fontWeight: 400,
    fontSize: '20px',
    lineHeight: '24px',
    color: '#FFFFFF',
  },
  textareaContainer: {
    boxSizing: 'border-box',
    width: '594px',
    height: '220px',
    background: 'rgba(36, 36, 36, 0.2)',
    border: '1px solid #7D818D',
    backdropFilter: 'blur(6px)',
    borderRadius: '10px',
    padding: '20px',
    marginBottom: '26px',
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
    fontSize: '20px',
    lineHeight: '24px',
    color: '#FFFFFF',
  },
  button: {
    width: '125px',
    height: '45px',
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

export default ContactSection;