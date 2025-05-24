'use client';

import React, { useState, FormEvent, ChangeEvent } from 'react';
import { Poppins, Barlow } from 'next/font/google';

// Font configurations
const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ['500', '600'],
  variable: '--font-poppins',
});

const barlow = Barlow({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500'],
  variable: '--font-barlow',
});

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Email submitted:', email);
    
    // Show success message
    setIsSubmitted(true);
    
    // Reset form after delay
    setTimeout(() => {
      setEmail('');
      setIsSubmitted(false);
    }, 3000);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  return (
    <div className={`${poppins.variable} ${barlow.variable}`} style={{
      position: 'relative',
      width: '100%',
      height: 'auto', 
      minHeight: '350px',
      background: 'linear-gradient(0deg, rgba(4, 9, 29, 0.08) 62.29%, rgba(4, 9, 29, 0.4) 100%), linear-gradient(270deg, rgba(0, 0, 0, 0.6) -0.83%, rgba(0, 0, 0, 0) 50%), url(/network-background.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      overflow: 'hidden',
      padding: '40px 0',
      display: 'flex',
      alignItems: 'center',
    }}>
      <div style={{
        position: 'relative',
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%',
        padding: '0 20px',
      }}>
        {/* Heading */}
        <h2 style={{
          position: 'relative',
          width: '100%',
          maxWidth: '1136px',
          fontFamily: 'var(--font-poppins)',
          fontWeight: 600,
          fontSize: 'clamp(32px, 5vw, 56px)',
          lineHeight: '1.15',
          color: '#FFFFFF',
          margin: '0 0 10px 0',
        }}>
          Get <span style={{ color: '#0D98BA' }}>Updates</span>
        </h2>

        {/* Subheading */}
        <h3 style={{
          position: 'relative',
          width: '100%',
          maxWidth: '650px',
          fontFamily: 'var(--font-poppins)',
          fontWeight: 500,
          fontSize: 'clamp(18px, 3vw, 35px)',
          lineHeight: '1.3',
          color: '#FFFFFF',
          margin: '0 0 30px 0',
        }}>
          Sign up to get the latest updates and exclusive insights!
        </h3>

        {/* Email subscription form */}
        <form onSubmit={handleSubmit} style={{
          position: 'relative',
          maxWidth: '425px',
          width: '100%',
          height: 'auto',
          minHeight: '73px',
          background: 'rgba(4, 9, 29, 0.8)',
          border: '1px solid #7D818D',
          backdropFilter: 'blur(6px)',
          borderRadius: '10px',
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px',
          boxSizing: 'border-box',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            paddingLeft: '10px',
            flex: '1 1 auto',
            minWidth: '60%',
          }}>
            <input
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={handleChange}
              required
              style={{
                background: 'transparent',
                border: 'none',
                outline: 'none',
                fontFamily: 'var(--font-barlow)',
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '22px',
                color: '#FFFFFF',
                width: '100%',
                padding: '10px 5px',
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              width: '104px',
              height: '50px',
              background: isSubmitted ? '#4CAF50' : '#0D98BA',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'var(--font-barlow)',
              fontWeight: 500,
              fontSize: '16px',
              lineHeight: '150%',
              textAlign: 'center',
              color: '#FFFFFF',
              transition: 'all 0.3s ease',
              margin: '5px 0',
              flex: '0 0 auto',
            }}
            onMouseOver={(e) => {
              if (!isSubmitted) e.currentTarget.style.background = '#0A7F9A';
            }}
            onMouseOut={(e) => {
              if (!isSubmitted) e.currentTarget.style.background = '#0D98BA';
            }}
          >
            {isSubmitted ? 'Sent!' : 'Send'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Newsletter;