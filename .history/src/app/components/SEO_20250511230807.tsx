import React from 'react';

const SEOSection = () => {
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '750px',
      background: 'linear-gradient(180deg, #0D98BA -223.2%, #04091D 100%)',
      overflow: 'hidden',
    }}>
      {/* H2 Title - SEO optimized with primary keyword */}
      <div style={{
        position: 'absolute',
        width: '324px',
        height: '64px',
        left: '74px',
        top: '117px',
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 600,
        fontSize: '56px',
        lineHeight: '64px',
        letterSpacing: '-0.03em',
        color: '#FFFFFF',
      }}>
        Professional Web Design
      </div>

      {/* Subtitle - Enhanced with secondary keywords */}
      <div style={{
        position: 'absolute',
        width: '653px',
        height: '70px',
        left: '74px',
        top: '228px',
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 600,
        fontSize: '28px',
        lineHeight: '35px',
        color: '#0D98BA',
      }}>
        Custom Website Development & Responsive UI/UX Design
      </div>

      {/* Description Text - SEO-rich content with target keywords */}
      <div style={{
        position: 'absolute',
        width: '549px',
        height: '120px',
        left: '74px',
        top: '317px',
        fontFamily: 'Lato',
        fontStyle: 'normal',
        fontWeight: 600,
        fontSize: '20px',
        lineHeight: '30px',
        letterSpacing: '-0.03em',
        color: '#FFFFFF',
      }}>
        Our expert web design services combine striking visuals with conversion-focused strategies. We create mobile-optimized websites that drive traffic, engage visitors, and boost your digital ROI through intuitive navigation, fast loading times, and brand-aligned design elements.
      </div>

      {/* Button - CTA with action keyword */}
      <div style={{
        position: 'absolute',
        width: '238px',
        height: '45px',
        left: '74px',
        top: '484px',
        background: '#0D98BA',
        border: '2px solid #0D98BA',
        borderRadius: '6px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
      }}>
        <div style={{
          fontFamily: 'Lato',
          fontStyle: 'normal',
          fontWeight: 600,
          fontSize: '16px',
          lineHeight: '150%',
          textAlign: 'center',
          color: '#04091D',
        }}>
          Get a Free Web Design Quote
        </div>
      </div>

      {/* Website Mockups Image */}
      <div style={{
        position: 'absolute',
        width: '632.23px',
        height: '422px',
        left: '755px',
        top: '159px',
        borderRadius: '10px',
        backgroundImage: 'url(/images/about-3.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
      </div>
    </div>
  );
};

export default SEOSection;