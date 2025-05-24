// WebDevelopmentComponent.jsx
import React from 'react';

const WebDevelopmentComponent = () => {
  const styles = {
    frame: {
      position: 'relative',
      width: '100%',
      maxWidth: '1430px',
      minHeight: '889px',
      background: '#04091D',
      margin: '0 auto',
      overflow: 'hidden',
      padding: '20px',
    },
    
    line1: {
      position: 'absolute',
      width: '100%',
      height: '0px',
      left: '0',
      top: '548px',
      border: '8px solid #3B7BCE',
      zIndex: 1,
    },
    
    line2: {
      position: 'absolute',
      width: '100%',
      height: '0px',
      left: '25%',
      top: '548px',
      border: '8px solid #95BF47',
      zIndex: 2,
    },
    
    line3: {
      position: 'absolute',
      width: '100%',
      height: '0px',
      left: '50%',
      top: '548px',
      border: '8px solid #F26322',
      zIndex: 3,
    },
    
    line4: {
      position: 'absolute',
      width: '25%',
      height: '0px',
      left: '75%',
      top: '548px',
      border: '8px solid #A66DD4',
      zIndex: 4,
    },
    
    title: {
      position: 'relative',
      width: '100%',
      maxWidth: '696px',
      margin: '85px auto 20px',
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 600,
      fontSize: 'clamp(32px, 5vw, 56px)',
      lineHeight: '1.15',
      textAlign: 'center',
      letterSpacing: '-0.03em',
      color: '#FFFFFF',
    },
    
    titleSpan: {
      color: '#3B7BCE',
    },
    
    subtitle: {
      position: 'relative',
      width: '100%',
      maxWidth: '792px',
      margin: '0 auto',
      fontFamily: 'Lato, sans-serif',
      fontWeight: 600,
      fontSize: 'clamp(16px, 2vw, 20px)',
      lineHeight: '1.6',
      textAlign: 'center',
      letterSpacing: '-0.03em',
      color: '#FFFFFF',
      marginBottom: '50px',
    },
    
    // Platform icons and their positioning
    wordpressContainer: {
      position: 'absolute',
      width: '203px',
      height: '203px',
      left: '6%',
      top: '346px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    
    wordpressIcon: {
      width: '100%',
      height: '100%',
      background: '#3B7BCE',
      maskImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath d='M61.7 169.4l101.5 278C92.2 413 43.3 340.2 43.3 256c0-30.9 6.6-60.1 18.4-86.6zm337.9 75.9c0-26.3-9.4-44.5-17.5-58.7-10.8-17.5-20.9-32.4-20.9-49.9 0-19.6 14.8-37.8 35.7-37.8.9 0 1.8.1 2.8.2-37.9-34.7-88.3-55.9-143.7-55.9-74.3 0-139.7 38.1-177.8 95.9 5 .2 9.7.3 13.7.3 22.2 0 56.7-2.7 56.7-2.7 11.5-.7 12.8 16.2 1.4 17.5 0 0-11.5 1.3-24.3 2l77.5 230.4L249.8 247l-33.1-90.8c-11.5-.7-22.3-2-22.3-2-11.5-.7-10.1-18.2 1.3-17.5 0 0 35.1 2.7 56 2.7 22.2 0 56.7-2.7 56.7-2.7 11.5-.7 12.8 16.2 1.4 17.5 0 0-11.5 1.3-24.3 2l76.9 228.7 21.2-70.9c9-29.4 16-50.5 16-68.7zm-139.9 29.3l-63.8 185.5c19.1 5.6 39.2 8.7 60.1 8.7 24.8 0 48.5-4.3 70.6-12.1-.6-.9-1.1-1.9-1.5-2.9l-65.4-179.2zm183-120.7c.9 6.8 1.4 14 1.4 21.9 0 21.6-4 45.8-16.2 76.2l-65 187.9C426.2 403 468.7 334.5 468.7 256c0-37-9.4-71.8-26-102.1zM256 50.7c-112.5 0-203.6 91.1-203.6 203.6 0 112.5 91.1 203.6 203.6 203.6 112.5 0 203.6-91.1 203.6-203.6 0-112.5-91.1-203.6-203.6-203.6zm0 398.1c-107.2 0-194.5-87.3-194.5-194.5 0-107.2 87.3-194.5 194.5-194.5 107.2 0 194.5 87.3 194.5 194.5 0 107.2-87.3 194.5-194.5 194.5z'/%3E%3C/svg%3E\")",
      maskSize: 'contain',
      maskRepeat: 'no-repeat',
      maskPosition: 'center',
      WebkitMaskImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath d='M61.7 169.4l101.5 278C92.2 413 43.3 340.2 43.3 256c0-30.9 6.6-60.1 18.4-86.6zm337.9 75.9c0-26.3-9.4-44.5-17.5-58.7-10.8-17.5-20.9-32.4-20.9-49.9 0-19.6 14.8-37.8 35.7-37.8.9 0 1.8.1 2.8.2-37.9-34.7-88.3-55.9-143.7-55.9-74.3 0-139.7 38.1-177.8 95.9 5 .2 9.7.3 13.7.3 22.2 0 56.7-2.7 56.7-2.7 11.5-.7 12.8 16.2 1.4 17.5 0 0-11.5 1.3-24.3 2l77.5 230.4L249.8 247l-33.1-90.8c-11.5-.7-22.3-2-22.3-2-11.5-.7-10.1-18.2 1.3-17.5 0 0 35.1 2.7 56 2.7 22.2 0 56.7-2.7 56.7-2.7 11.5-.7 12.8 16.2 1.4 17.5 0 0-11.5 1.3-24.3 2l76.9 228.7 21.2-70.9c9-29.4 16-50.5 16-68.7zm-139.9 29.3l-63.8 185.5c19.1 5.6 39.2 8.7 60.1 8.7 24.8 0 48.5-4.3 70.6-12.1-.6-.9-1.1-1.9-1.5-2.9l-65.4-179.2zm183-120.7c.9 6.8 1.4 14 1.4 21.9 0 21.6-4 45.8-16.2 76.2l-65 187.9C426.2 403 468.7 334.5 468.7 256c0-37-9.4-71.8-26-102.1zM256 50.7c-112.5 0-203.6 91.1-203.6 203.6 0 112.5 91.1 203.6 203.6 203.6 112.5 0 203.6-91.1 203.6-203.6 0-112.5-91.1-203.6-203.6-203.6zm0 398.1c-107.2 0-194.5-87.3-194.5-194.5 0-107.2 87.3-194.5 194.5-194.5 107.2 0 194.5 87.3 194.5 194.5 0 107.2-87.3 194.5-194.5 194.5z'/%3E%3C/svg%3E\")",
      WebkitMaskSize: 'contain',
      WebkitMaskRepeat: 'no-repeat',
      WebkitMaskPosition: 'center',
    },
    
    shopifyContainer: {
      position: 'absolute',
      width: '149px',
      height: '170px',
      left: '31%',
      top: '548px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 5,
    },
    
    shopifyIcon: {
      width: '100%',
      height: '100%',
      background: '#95BF46',
      maskImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'%3E%3Cpath d='M388.32 104.1a4.66 4.66 0 0 0-4.4-4c-2 0-37.23-.8-37.23-.8s-21.61-20.82-29.62-28.83V503.2L442.76 472s-34.88-125.87-54.44-368c-.24-3-1-5.92-4.21-5.62a923.42 923.42 0 0 0-58.74-15 1.2 1.2 0 0 0-.9 1 1 1 0 0 0 .78 1.08 952.7 952.7 0 0 1 58.12 14.86q2.76 1 5.64 2.09M309.33 347.46V99.7c0-.51.1-.76-.3-1a6.73 6.73 0 0 0-2.92-.58c-1.32 0-2.64-.1-3.76 0a1.22 1.22 0 0 0-.9.58c-.5 1.43 0 98.83 0 98.83a1.18 1.18 0 0 0-.5-.38c-9.13-6.31-28-15.39-45.77-15.39-36.28 0-64 33.2-74.91 76.8-45.28 10.8-78.3 35.37-78.3 94.44 0 26.4 9.13 43.69 23.38 54.39 27.18 20.66 72 12.74 95.5-2.39v36c0 .51-.1.76.2 1s.6.4.9.4a14.76 14.76 0 0 0 5.64-.4c3.46-.58 68.48-13.25 68.48-13.25.31-.11.41-.22.51-.42s.1-.5 0-.61c-1.62-32.63-1.62-266.43-1.62-266.43M270.38 212.44c0 2.59.1 34.88.1 66.16 0 .64.1 1.06-.5 1.62-1.3 48.42-27.78 75.53-66.46 95.1-6.92 3.47-14 5.87-20.71 7a1.13 1.13 0 0 1-1-.5c-.51-.5-.71-1.87-.71-2.88 0-67.81 46.72-100.81 82.38-100.81 2.39 0 4.27.1 6.4.3a1.32 1.32 0 0 1 1 .5c0 .51.1 33.53.5 33.52'/%3E%3C/svg%3E\")",
      maskSize: 'contain',
      maskRepeat: 'no-repeat',
      maskPosition: 'center',
      WebkitMaskImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'%3E%3Cpath d='M388.32 104.1a4.66 4.66 0 0 0-4.4-4c-2 0-37.23-.8-37.23-.8s-21.61-20.82-29.62-28.83V503.2L442.76 472s-34.88-125.87-54.44-368c-.24-3-1-5.92-4.21-5.62a923.42 923.42 0 0 0-58.74-15 1.2 1.2 0 0 0-.9 1 1 1 0 0 0 .78 1.08 952.7 952.7 0 0 1 58.12 14.86q2.76 1 5.64 2.09M309.33 347.46V99.7c0-.51.1-.76-.3-1a6.73 6.73 0 0 0-2.92-.58c-1.32 0-2.64-.1-3.76 0a1.22 1.22 0 0 0-.9.58c-.5 1.43 0 98.83 0 98.83a1.18 1.18 0 0 0-.5-.38c-9.13-6.31-28-15.39-45.77-15.39-36.28 0-64 33.2-74.91 76.8-45.28 10.8-78.3 35.37-78.3 94.44 0 26.4 9.13 43.69 23.38 54.39 27.18 20.66 72 12.74 95.5-2.39v36c0 .51-.1.76.2 1s.6.4.9.4a14.76 14.76 0 0 0 5.64-.4c3.46-.58 68.48-13.25 68.48-13.25.31-.11.41-.22.51-.42s.1-.5 0-.61c-1.62-32.63-1.62-266.43-1.62-266.43M270.38 212.44c0 2.59.1 34.88.1 66.16 0 .64.1 1.06-.5 1.62-1.3 48.42-27.78 75.53-66.46 95.1-6.92 3.47-14 5.87-20.71 7a1.13 1.13 0 0 1-1-.5c-.51-.5-.71-1.87-.71-2.88 0-67.81 46.72-100.81 82.38-100.81 2.39 0 4.27.1 6.4.3a1.32 1.32 0 0 1 1 .5c0 .51.1 33.53.5 33.52'/%3E%3C/svg%3E\")",
      WebkitMaskSize: 'contain',
      WebkitMaskRepeat: 'no-repeat',
      WebkitMaskPosition: 'center',
    },
    
    magentoContainer: {
      position: 'absolute',
      width: '159px',
      height: '188px',
      left: '57%',
      top: '360px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    
    magentoIcon: {
      width: '100%',
      height: '100%',
      background: '#F26322',
      maskImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'%3E%3Cpath d='M445.7 127.9V384l-63.4 36.5V164.7L223.8 73.1 65.2 164.7l.4 255.9L2.3 384V128.1L224.2 0l221.5 127.9zM255.6 420.5L224 438.9l-31.8-18.2v-256l-63.3 36.6.1 255.9 94.9 54.9 95.1-54.9v-256l-63.4-36.6v255.9z'/%3E%3C/svg%3E\")",
      maskSize: 'contain',
      maskRepeat: 'no-repeat',
      maskPosition: 'center',
      WebkitMaskImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'%3E%3Cpath d='M445.7 127.9V384l-63.4 36.5V164.7L223.8 73.1 65.2 164.7l.4 255.9L2.3 384V128.1L224.2 0l221.5 127.9zM255.6 420.5L224 438.9l-31.8-18.2v-256l-63.3 36.6.1 255.9 94.9 54.9 95.1-54.9v-256l-63.4-36.6v255.9z'/%3E%3C/svg%3E\")",
      WebkitMaskSize: 'contain',
      WebkitMaskRepeat: 'no-repeat',
      WebkitMaskPosition: 'center',
    },
    
    customContainer: {
      position: 'absolute',
      width: '167px',
      height: '167px',
      left: '81%',
      top: '542px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 5,
    },
    
    customIcon: {
      width: '100%',
      height: '100%',
      background: '#A66DD4',
      maskImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 576 512'%3E%3Cpath d='M528 0H48C21.5 0 0 21.5 0 48v320c0 26.5 21.5 48 48 48h192l-16 48h-72c-13.3 0-24 10.7-24 24s10.7 24 24 24h272c13.3 0 24-10.7 24-24s-10.7-24-24-24h-72l-16-48h192c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48zm-16 352H64V64h448v288z'/%3E%3C/svg%3E\")",
      maskSize: 'contain',
      maskRepeat: 'no-repeat',
      maskPosition: 'center',
      WebkitMaskImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 576 512'%3E%3Cpath d='M528 0H48C21.5 0 0 21.5 0 48v320c0 26.5 21.5 48 48 48h192l-16 48h-72c-13.3 0-24 10.7-24 24s10.7 24 24 24h272c13.3 0 24-10.7 24-24s-10.7-24-24-24h-72l-16-48h192c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48zm-16 352H64V64h448v288z'/%3E%3C/svg%3E\")",
      WebkitMaskSize: 'contain',
      WebkitMaskRepeat: 'no-repeat',
      WebkitMaskPosition: 'center',
    },
    
    // Text containers for each platform
    wordpressText: {
      position: 'absolute',
      width: '266px',
      left: '54px',
      top: '578px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '14px',
      zIndex: 5,
    },
    
    shopifyText: {
      position: 'absolute',
      width: '266px',
      left: '415px', 
      top: '392px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '14px',
      zIndex: 5,
    },
    
    magentoText: {
      position: 'absolute',
      width: '266px',
      left: '768px',
      top: '578px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '14px',
      zIndex: 5,
    },
    
    customText: {
      position: 'absolute',
      width: '266px',
      left: '1120px',
      top: '392px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '14px',
      zIndex: 5,
    },
    
    heading: {
      width: '100%',
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 600,
      fontSize: '26px',
      lineHeight: '150%',
      textAlign: 'center',
      letterSpacing: '-0.006em',
      color: '#FFFFFF',
      margin: 0,
    },
    
    paragraph: {
      width: '100%',
      fontFamily: 'Lato, sans-serif',
      fontWeight: 400,
      fontSize: '18px',
      lineHeight: '150%',
      textAlign: 'center',
      letterSpacing: '-0.006em',
      color: '#FFFFFF',
      margin: 0,
    }
  };

  // Media queries for responsive design
  const mediaQueries = {
    // For tablets
    '@media (max-width: 1024px)': {
      frame: {
        minHeight: '1200px',
        padding: '10px',
      },
      title: {
        fontSize: '44px',
        margin: '60px auto 20px',
      },
      subtitle: {
        fontSize: '18px',
        maxWidth: '80%',
      },
      // Reposition the lines
      line1: { top: '650px' },
      line2: { top: '650px' },
      line3: { top: '650px' },
      line4: { top: '650px' },
      // Reposition the icons and text
      wordpressContainer: { left: '5%', top: '400px' },
      shopifyContainer: { left: '50%', transform: 'translateX(-50%)', top: '400px' },
      magentoContainer: { left: '70%', top: '400px' },
      customContainer: { left: '50%', transform: 'translateX(-50%)', top: '800px' },
      wordpressText: { left: '5%', top: '650px' },
      shopifyText: { left: '50%', transform: 'translateX(-50%)', top: '650px' },
      magentoText: { left: '70%', top: '650px' },
      customText: { left: '50%', transform: 'translateX(-50%)', top: '1000px' },
    },
    // For mobile devices
    '@media (max-width: 768px)': {
      frame: {
        minHeight: '1800px',
      },
      title: {
        fontSize: '36px',
        margin: '40px auto 20px',
        maxWidth: '90%',
      },
      subtitle: {
        fontSize: '16px',
        maxWidth: '90%',
      },
      // Stack everything vertically
      line1: { display: 'none' },
      line2: { display: 'none' },
      line3: { display: 'none' },
      line4: { display: 'none' },
      wordpressContainer: { left: '50%', transform: 'translateX(-50%)', top: '300px' },
      shopifyContainer: { left: '50%', transform: 'translateX(-50%)', top: '650px' },
      magentoContainer: { left: '50%', transform: 'translateX(-50%)', top: '1000px' },
      customContainer: { left: '50%', transform: 'translateX(-50%)', top: '1350px' },
      wordpressText: { left: '50%', transform: 'translateX(-50%)', top: '450px' },
      shopifyText: { left: '50%', transform: 'translateX(-50%)', top: '800px' },
      magentoText: { left: '50%', transform: 'translateX(-50%)', top: '1150px' },
      customText: { left: '50%', transform: 'translateX(-50%)', top: '1500px' },
    },
    // For smaller mobile devices
    '@media (max-width: 480px)': {
      title: {
        fontSize: '28px',
      },
      subtitle: {
        fontSize: '14px',
      },
      heading: {
        fontSize: '22px',
      },
      paragraph: {
        fontSize: '16px',
      },
    }
  };

  // Function to apply media queries
  const applyMediaQueries = (baseStyles) => {
    const styleWithMedia = { ...baseStyles };
    
    // Add window check for SSR
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      
      if (width <= 480) {
        // Apply mobile small styles
        Object.keys(mediaQueries['@media (max-width: 480px)']).forEach(key => {
          if (styleWithMedia[key]) {
            styleWithMedia[key] = { ...styleWithMedia[key], ...mediaQueries['@media (max-width: 480px)'][key] };
          }
        });
      }
      
      if (width <= 768) {
        // Apply mobile styles
        Object.keys(mediaQueries['@media (max-width: 768px)']).forEach(key => {
          if (styleWithMedia[key]) {
            styleWithMedia[key] = { ...styleWithMedia[key], ...mediaQueries['@media (max-width: 768px)'][key] };
          }
        });
      } 
      else if (width <= 1024) {
        // Apply tablet styles
        Object.keys(mediaQueries['@media (max-width: 1024px)']).forEach(key => {
          if (styleWithMedia[key]) {
            styleWithMedia[key] = { ...styleWithMedia[key], ...mediaQueries['@media (max-width: 1024px)'][key] };
          }
        });
      }
    }
    
    return styleWithMedia;
  };

  // Apply media queries to styles
  const responsiveStyles = applyMediaQueries(styles);

  return (
    <div style={responsiveStyles.frame}>
      <h2 style={responsiveStyles.title}>
        Web Development<br />
        Tailored For <span style={responsiveStyles.titleSpan}>Clients</span> Needs
      </h2>
      <p style={responsiveStyles.subtitle}>
        From popular platforms to custom builds — we develop solutions that fit your business perfectly.
      </p>
      
      {/* Lines */}
      <div style={responsiveStyles.line1}></div>
      <div style={responsiveStyles.line2}></div>
      <div style={responsiveStyles.line3}></div>
      <div style={responsiveStyles.line4}></div>
      
      {/* WordPress */}
      <div style={responsiveStyles.wordpressContainer}>
        <div style={responsiveStyles.wordpressIcon}></div>
      </div>
      <div style={responsiveStyles.wordpressText}>
        <h3 style={responsiveStyles.heading}>WordPress</h3>
        <p style={responsiveStyles.paragraph}>Flexible and easy to manage WordPress solutions tailored to your goals.</p>
      </div>
      
      {/* Shopify */}
      <div style={responsiveStyles.shopifyContainer}>
        <div style={responsiveStyles.shopifyIcon}></div>
      </div>
      <div style={responsiveStyles.shopifyText}>
        <h3 style={responsiveStyles.heading}>Shopify</h3>
        <p style={responsiveStyles.paragraph}>Scalable, user-friendly Shopify solutions built for superior eCommerce experiences.</p>
      </div>
      
      {/* Magento */}
      <div style={responsiveStyles.magentoContainer}>
        <div style={responsiveStyles.magentoIcon}></div>
      </div>
      <div style={responsiveStyles.magentoText}>
        <h3 style={responsiveStyles.heading}>Magento</h3>
        <p style={responsiveStyles.paragraph}>Powerful Magento solutions designed for high-performance online stores.</p>
      </div>
      
      {/* Custom */}
      <div style={responsiveStyles.customContainer}>
        <div style={responsiveStyles.customIcon}></div>
      </div>
      <div style={responsiveStyles.customText}>
        <h3 style={responsiveStyles.heading}>Custom</h3>
        <p style={responsiveStyles.paragraph}>Fully custom-built websites crafted from scratch to meet unique business needs.</p>
      </div>
    </div>
  );
};

// Add a display name for debugging
WebDevelopmentComponent.displayName = 'WebDevelopmentComponent';

export default WebDevelopmentComponent;