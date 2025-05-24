'use client';

import { useEffect, useState, useRef, CSSProperties } from 'react';
import Image from 'next/image';
import { Poppins, Lato, Barlow } from 'next/font/google';

// Initialize the fonts
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700'],  // Lato only supports 100, 300, 400, 700, 900
  display: 'swap',
});

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
});

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
      {/* Background vector */}
      <div style={styles.vector}></div>
      
      {/* Center Image with opacity */}
      <div style={styles.centerImageContainer}>
        <Image 
          src="/center-illustration.png" 
          alt="Center Illustration"
          width={400}
          height={400}
          style={styles.centerImage}
        />
      </div>
      
      {/* Left Side Content */}
      <div style={{
        ...styles.leftContent,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateX(0)' : 'translateX(-50px)',
        transition: isVisible ? 'all 0.8s ease-out' : 'all 0s'
      }}>
        <h3 style={{...styles.turnYourIdeas, fontFamily: poppins.className}}>Turn Your Ideas Into</h3>
        <h2 style={{...styles.impactfulHeading, fontFamily: poppins.className}}>
          <span style={styles.impactful}>Impactful</span> Digital Products
        </h2>
        <p style={{...styles.paragraph, fontFamily: lato.className}}>
          Send us your idea — we'll turn it into something brilliant.
        </p>
        
        {/* Social Media Section */}
        <div style={styles.socialSection}>
          <h3 style={{...styles.followUs, fontFamily: poppins.className}}>Follow us</h3>
          <div style={styles.socialIcons}>
            {/* Twitter Icon */}
            <a href="#" style={styles.iconLink}>
              <div style={styles.iconContainer}>
                <Image src="/icons/twitter.png" alt="Twitter" width={24} height={24} />
              </div>
            </a>
            {/* Facebook Icon */}
            <a href="#" style={styles.iconLink}>
              <div style={styles.iconContainer}>
                <Image src="/icons/facebook.png" alt="Facebook" width={24} height={24} />
              </div>
            </a>
            {/* Instagram Icon */}
            <a href="#" style={styles.iconLink}>
              <div style={styles.iconContainer}>
                <Image src="/icons/instagram.png" alt="Instagram" width={24} height={24} />
              </div>
            </a>
            {/* LinkedIn Icon */}
            <a href="#" style={styles.iconLink}>
              <div style={styles.iconContainer}>
                <Image src="/icons/linkedin.png" alt="LinkedIn" width={24} height={24} />
              </div>
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
        <h2 style={{...styles.formHeading, fontFamily: poppins.className}}>Start a Conversation</h2>
        
        <div style={styles.formRow}>
          {/* Name Input */}
          <div style={styles.inputContainer}>
            <div style={styles.inputIconContainer}>
              <Image src="/icons/user.png" alt="User" width={24} height={24} />
            </div>
            <input 
              type="text" 
              placeholder="Your Name" 
              style={{...styles.input, fontFamily: barlow.className}} 
            />
          </div>
          
          {/* Email Input */}
          <div style={styles.inputContainer}>
            <div style={styles.inputIconContainer}>
              <Image src="/icons/email.png" alt="Email" width={24} height={24} />
            </div>
            <input 
              type="email" 
              placeholder="Your Email" 
              style={{...styles.input, fontFamily: barlow.className}} 
            />
          </div>
        </div>
        
        <div style={styles.formRow}>
          {/* Company Input */}
          <div style={styles.inputContainer}>
            <div style={styles.inputIconContainer}>
              <Image src="/icons/company.png" alt="Company" width={24} height={24} />
            </div>
            <input 
              type="text" 
              placeholder="Company Name" 
              style={{...styles.input, fontFamily: barlow.className}} 
            />
          </div>
          
          {/* Phone Input */}
          <div style={styles.inputContainer}>
            <div style={styles.inputIconContainer}>
              <Image src="/icons/phone.png" alt="Phone" width={24} height={24} />
            </div>
            <input 
              type="tel" 
              placeholder="Contact Number" 
              style={{...styles.input, fontFamily: barlow.className}} 
            />
          </div>
        </div>
        
        {/* Textarea for project description */}
        <div style={styles.textareaContainer}>
          <textarea 
            placeholder="Describe Your Project Need." 
            style={{...styles.textarea, fontFamily: barlow.className}}
          ></textarea>
        </div>
        
        {/* Submit Button */}
        <button style={styles.button}>
          <span style={{...styles.buttonText, fontFamily: barlow.className}}>Get in Touch</span>
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
    left: '0px',
    top: '0px',
    background: '#04091D',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 74px',
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
  centerImageContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 1,
    opacity: 0.15,
  },
  centerImage: {
    objectFit: 'contain',
  },
  leftContent: {
    width: '50%',
    maxWidth: '674px',
    position: 'relative',
    zIndex: 2,
    opacity: 0,
    transform: 'translateX(-50px)',
    transition: 'all 0s',
  },
  turnYourIdeas: {
    fontWeight: 600,
    fontSize: '25px',
    lineHeight: '38px',
    color: '#0D94BB',
    margin: '0 0 0 0',
  },
  impactfulHeading: {
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
    fontWeight: 600,
    fontSize: '18px',
    lineHeight: '150%',
    letterSpacing: '-0.006em',
    color: '#E6E6E6',
    marginBottom: '50px',
  },
  socialSection: {
    marginTop: '150px',
  },
  followUs: {
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
  iconContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'transform 0.3s ease',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: 'rgba(125, 129, 141, 0.2)',
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
  inputIconContainer: {
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