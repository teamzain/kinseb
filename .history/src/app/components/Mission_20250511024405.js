// WebDevelopmentComponent.jsx
import React from 'react';

const WebDevelopmentComponent = () => {
  const styles = {
    frame: {
      position: 'relative',
      width: '100%',
      minHeight: '889px',
      background: '#04091D',
      margin: '0 auto',
      overflow: 'hidden',
      padding: '0',
    },
    
    line1: {
      position: 'absolute',
      width: '100%',
      height: '0px',
      left: '0',
      top: '548px',
      border: '4px solid #3B7BCE',
      zIndex: 1,
    },
    
    line2: {
      position: 'absolute',
      width: '100%',
      height: '0px',
      left: '25%',
      top: '548px',
      border: '4px solid #95BF47',
      zIndex: 2,
    },
    
    line3: {
      position: 'absolute',
      width: '100%',
      height: '0px',
      left: '50%',
      top: '548px',
      border: '4px solid #F26322',
      zIndex: 3,
    },
    
    line4: {
      position: 'absolute',
      width: '25%',
      height: '0px',
      left: '75%',
      top: '548px',
      border: '4px solid #A66DD4',
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
    
    // Platform containers for images
    wordpressContainer: {
      position: 'absolute',
      width: '80px',
      height: '80px',
      left: '6%',
      top: '150px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    
    shopifyContainer: {
      position: 'absolute',
      width: '80px',
      height: '80px',
      left: '6%',
      top: '350px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 5,
    },
    
    magentoContainer: {
      position: 'absolute',
      width: '80px',
      height: '80px',
      left: '6%',
      top: '550px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    
    customContainer: {
      position: 'absolute',
      width: '80px',
      height: '80px',
      left: '6%',
      top: '750px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 5,
    },

    // Image placeholders - you'll replace these with your actual images
    imagePlaceholder: {
      width: '100%',
      height: '100%',
      background: '#3B7BCE',
      borderRadius: '50%',
    },
    
    // Text containers for each platform
    wordpressText: {
      position: 'absolute',
      width: 'calc(100% - 120px)',
      left: '100px',
      top: '150px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: '10px',
      zIndex: 5,
    },
    
    shopifyText: {
      position: 'absolute',
      width: 'calc(100% - 120px)',
      left: '100px',
      top: '350px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: '10px',
      zIndex: 5,
    },
    
    magentoText: {
      position: 'absolute',
      width: 'calc(100% - 120px)',
      left: '100px',
      top: '550px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: '10px',
      zIndex: 5,
    },
    
    customText: {
      position: 'absolute',
      width: 'calc(100% - 120px)',
      left: '100px',
      top: '750px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: '10px',
      zIndex: 5,
    },
    
    heading: {
      width: '100%',
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 600,
      fontSize: '26px',
      lineHeight: '150%',
      textAlign: 'left',
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
      textAlign: 'left',
      letterSpacing: '-0.006em',
      color: '#FFFFFF',
      margin: 0,
    },
    
    button: {
      display: 'inline-block',
      marginTop: '15px',
      padding: '8px 20px',
      border: '1px solid #3B7BCE',
      borderRadius: '4px',
      backgroundColor: 'transparent',
      color: '#FFFFFF',
      fontFamily: 'Poppins, sans-serif',
      fontSize: '16px',
      cursor: 'pointer',
      textDecoration: 'none',
    }
  };

: 'translateX(-50%)', top: '400px' },
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
        minHeight: '1200px',
      },
      title: {
        fontSize: '32px',
        margin: '40px auto 20px',
        maxWidth: '90%',
      },
      subtitle: {
        fontSize: '16px',
        maxWidth: '90%',
      },
      
      // Stack everything vertically for mobile, matching the image layout
      wordpressContainer: { 
        left: '20px', 
        top: '150px',
        width: '60px',
        height: '60px',
      },
      wordpressText: { 
        left: '90px', 
        top: '150px',
        width: 'calc(100% - 100px)',
      },
      
      shopifyContainer: { 
        left: '20px', 
        top: '350px',
        width: '60px',
        height: '60px',
      },
      shopifyText: { 
        left: '90px', 
        top: '350px',
        width: 'calc(100% - 100px)',
      },
      
      magentoContainer: { 
        left: '20px', 
        top: '550px',
        width: '60px',
        height: '60px',
      },
      magentoText: { 
        left: '90px', 
        top: '550px',
        width: 'calc(100% - 100px)',
      },
      
      customContainer: { 
        left: '20px', 
        top: '750px',
        width: '60px',
        height: '60px',
      },
      customText: { 
        left: '90px', 
        top: '750px',
        width: 'calc(100% - 100px)',
      },
      
      heading: {
        fontSize: '22px',
      },
      paragraph: {
        fontSize: '16px',
      },
      button: {
        fontSize: '14px',
        padding: '6px 16px',
      }
    },
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
        fontSize: '20px',
      },
      paragraph: {
        fontSize: '14px',
      },
      button: {
        fontSize: '12px',
        padding: '5px 12px',
      }
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
        {/* Replace with your actual image */}
        <div style={responsiveStyles.imagePlaceholder}></div>
      </div>
      <div style={responsiveStyles.wordpressText}>
        <h3 style={responsiveStyles.heading}>WordPress</h3>
        <p style={responsiveStyles.paragraph}>Flexible and easy-to-manage WordPress websites tailored to your goals.</p>
        <a href="#" style={{...responsiveStyles.button, borderColor: '#3B7BCE'}}>
          WordPress Development →
        </a>
      </div>
      
      {/* Shopify */}
      <div style={responsiveStyles.shopifyContainer}>
        {/* Replace with your actual image */}
        <div style={{...responsiveStyles.imagePlaceholder, background: '#95BF47'}}></div>
      </div>
      <div style={responsiveStyles.shopifyText}>
        <h3 style={responsiveStyles.heading}>Shopify</h3>
        <p style={responsiveStyles.paragraph}>Scalable, user-friendly Shopify stores built for seamless eCommerce experiences.</p>
        <a href="#" style={{...responsiveStyles.button, borderColor: '#95BF47'}}>
          Shopify Development →
        </a>
      </div>
      
      {/* Magento / Point of Sale */}
      <div style={responsiveStyles.magentoContainer}>
        {/* Replace with your actual image */}
        <div style={{...responsiveStyles.imagePlaceholder, background: '#F26322'}}></div>
      </div>
      <div style={responsiveStyles.magentoText}>
        <h3 style={responsiveStyles.heading}>Point Of Sale</h3>
        <p style={responsiveStyles.paragraph}>Powerful Magento solutions designed for high-performance online stores.</p>
        <a href="#" style={{...responsiveStyles.button, borderColor: '#F26322'}}>
          Point Of Sale Development →
        </a>
      </div>
      
      {/* Custom */}
      <div style={responsiveStyles.customContainer}>
        {/* Replace with your actual image */}
        <div style={{...responsiveStyles.imagePlaceholder, background: '#A66DD4'}}></div>
      </div>
      <div style={responsiveStyles.customText}>
        <h3 style={responsiveStyles.heading}>Custom</h3>
        <p style={responsiveStyles.paragraph}>Fully custom-built websites crafted from scratch to meet unique business needs.</p>
        <a href="#" style={{...responsiveStyles.button, borderColor: '#A66DD4'}}>
          Custom Development →
        </a>
      </div>
    </div>
  );
};

// Add a display name for debugging
WebDevelopmentComponent.displayName = 'WebDevelopmentComponent';

export default WebDevelopmentComponent;