import { useEffect, useRef } from 'react';
import Head from 'next/head';

export default function DiagonalMarquee() {
  const column1Ref = useRef<HTMLDivElement>(null);
  const column2Ref = useRef<HTMLDivElement>(null);
  const column3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Function to duplicate images to ensure smooth animation
    const ensureSmoothAnimation = (columnRef: { current: HTMLDivElement | null }) => {
      if (!columnRef.current) return;
      
      const column = columnRef.current;
      const images = column.querySelectorAll('img');
      
      if (images.length === 0) return;
      
      // Get first image to calculate its height
      const firstImage = images[0] as HTMLImageElement;
      
      // Wait for image to load to get its dimensions
      const handleImageLoad = () => {
        const columnHeight = column.offsetHeight;
        const imageHeight = firstImage.height;
        
        // Calculate how many images we need to fill the track and then some
        const imagesNeeded = Math.ceil((columnHeight * 4) / imageHeight) + 4;
        const currentImages = images.length;
        
        // Add more images if needed
        if (currentImages < imagesNeeded) {
          for (let i = 0; i < imagesNeeded - currentImages; i++) {
            const clone = firstImage.cloneNode(true) as HTMLImageElement;
            // Ensure image is fully loaded before appending
            clone.onload = () => {
              // This helps prevent layout shifts
              clone.style.opacity = '1';
            };
            clone.style.opacity = '0';
            column.appendChild(clone);
          }
        }
      };
      
      // If image is already loaded
      if (firstImage.complete) {
        handleImageLoad();
      } else {
        firstImage.onload = handleImageLoad;
      }
    };

    // Apply to all columns
    ensureSmoothAnimation(column1Ref);
    ensureSmoothAnimation(column2Ref);
    ensureSmoothAnimation(column3Ref);
    
    // Handle window resize
    const handleResize = () => {
      ensureSmoothAnimation(column1Ref);
      ensureSmoothAnimation(column2Ref);
      ensureSmoothAnimation(column3Ref);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Also run on initial load to prevent layout shifts
    window.addEventListener('load', handleResize);
    
    // Add delayed re-calculation to handle late-loading images
    const delayedResize = setTimeout(handleResize, 1000);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('load', handleResize);
      clearTimeout(delayedResize);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Diagonal Marquee Animation</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* Add Poppins font with preload for better performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>
      
      <div style={{
        margin: 0,
        padding: 0,
        backgroundColor: '#04091d',
        overflow: 'hidden',
        height: '88vh',
        width: '100%',
        maxWidth: '100%',
        boxSizing: 'border-box',
        position: 'relative',
        fontFamily: 'Poppins, sans-serif',
      }}>
        {/* Full screen overlay with gradient for depth */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to right, rgba(0, 0, 0, 0.85) 50%, rgba(0, 0, 0, 0.5) 100%)',
          zIndex: 10,
        }}>
          {/* Content positioned on the left side with animation classes */}
          <div className="content-container" style={{
            padding: '70px 50px',
            color: 'white',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            maxWidth: '100%',
            width: '100%',
            textAlign: 'left', // Default to left aligned for desktop
            alignItems: 'flex-start', // Default to left aligned for desktop
          }}>
            <div className="slide-down" style={{ color: '#0099cc', fontSize: '20px', marginBottom: '20px', fontWeight: '500' }}>
              Your Web Development Provider
            </div>
            <h1 className="heading-animation" style={{ fontSize: '56px', marginBottom: '25px', fontWeight: '700', lineHeight: 1.1, textAlign: 'left' }}>
              <div className="first-line">Building <span style={{ color: '#0099cc' }}>Websites</span> That</div>
              <div className="second-line">Drive Growth</div>
            </h1>
            <p className="fade-in" style={{ fontSize: '20px', lineHeight: 1.6, marginBottom: '35px', maxWidth: '700px', textAlign: 'left' }}>
              From startups to enterprises, we build responsive, SEO-optimized websites.
              Let your brand stand out with designs tailored for results.
            </p>
            <div className="buttons-animation" style={{ display: 'flex', gap: '15px', justifyContent: 'flex-start' }}>
              <button style={{
                backgroundColor: 'transparent',
                color: 'white',
                border: '1px solid #0099cc',
                padding: '14px 28px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 500,
                fontSize: '16px',
                transition: 'all 0.3s ease',
              }}>
                See Our Work
              </button>
              <button style={{
                backgroundColor: '#0099cc',
                color: 'white',
                border: 'none',
                padding: '14px 28px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 500,
                fontSize: '16px',
                transition: 'all 0.3s ease',
              }}>
                Request A Quote
              </button>
            </div>
          </div>
          <div className="tech-text" style={{ 
            position: 'absolute', 
            bottom: '30px', 
            left: '0',
            right: '0',
            textAlign: 'center',
            fontSize: '14px',
            color: '#aaa',
            zIndex: 11
          }}>
            Built With Industry-Leading Technologies
          </div>
        </div>

        <div style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute',
            top: '-100%',
            left: 0,
            width: '100%',
            height: '300%',
            transform: 'rotate(15deg)',
            transformOrigin: 'center',
            willChange: 'transform',
          }}>
            {/* First Column - moving down */}
            <div 
              ref={column1Ref}
              className="diagonal-column column-1"
              style={{
                position: 'absolute',
                height: '100%',
                width: '25%',
                left: '40%',
                display: 'flex',
                flexDirection: 'column',
                animationTimingFunction: 'linear',
                animationIterationCount: 'infinite',
                animation: 'marquee-diagonal-down 65s linear infinite',
                willChange: 'transform',
              }}
            >
              <img 
                src="/images/col-left.png" 
                alt=""
                style={{
                  width: '100%',
                  objectFit: 'contain',
                  marginBottom: '1px',
                  willChange: 'transform',
                }}
                loading="eager"
              />
            </div>
            
            {/* Middle Column - moving up */}
            <div 
              ref={column2Ref}
              className="diagonal-column column-2"
              style={{
                position: 'absolute',
                height: '100%',
                width: '25%',
                left: '65%',
                display: 'flex',
                flexDirection: 'column',
                animationTimingFunction: 'linear',
                animationIterationCount: 'infinite',
                animation: 'marquee-diagonal-up 55s linear infinite',
                animationDelay: '-15s',
                willChange: 'transform',
              }}
            >
              <img 
                src="/images/col-middle.png" 
                alt=""
                style={{
                  width: '100%',
                  objectFit: 'contain',
                  marginBottom: '1px',
                  willChange: 'transform',
                }}
                loading="eager"
              />
            </div>
            
            {/* Third Column - moving down */}
            <div 
              ref={column3Ref}
              className="diagonal-column column-3"
              style={{
                position: 'absolute',
                height: '100%',
                width: '25%',
                left: '90%',
                display: 'flex',
                flexDirection: 'column',
                animationTimingFunction: 'linear',
                animationIterationCount: 'infinite',
                animation: 'marquee-diagonal-down 65s linear infinite',
                animationDelay: '-25s',
                willChange: 'transform',
              }}
            >
              <img 
                src="/images/col-right.png" 
                alt=""
                style={{
                  width: '100%',
                  objectFit: 'contain',
                  marginBottom: '1px',
                  willChange: 'transform',
                }}
                loading="eager"
              />
            </div>
          </div>
        </div>
        
        <style jsx global>{`
          html, body {
            margin: 0;
            padding: 0;
            overflow-x: hidden;
            width: 100%;
            max-width: 100%;
            box-sizing: border-box;
            font-family: 'Poppins', sans-serif;
          }
          
          /* Smooth animation with GPU acceleration */
          @keyframes marquee-diagonal-up {
            0% {
              transform: translateY(0%) translateZ(0);
            }
            100% {
              transform: translateY(-50%) translateZ(0);
            }
          }

          @keyframes marquee-diagonal-down {
            0% {
              transform: translateY(-50%) translateZ(0);
            }
            100% {
              transform: translateY(0%) translateZ(0);
            }
          }
          
          /* Left content animations - improved for smoothness */
          .slide-down {
            animation: slideDown 0.8s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
            opacity: 0;
            will-change: transform, opacity;
          }
          
          .heading-animation {
            overflow: hidden;
          }
          
          .heading-animation div {
            animation: slideInRight 0.8s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
            opacity: 0;
            will-change: transform, opacity;
          }
          
          .heading-animation div:nth-child(1) {
            animation-delay: 0.3s;
          }
          
          .heading-animation div:nth-child(2) {
            animation-delay: 0.6s;
          }
          
          .fade-in {
            animation: fadeIn 1s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
            animation-delay: 0.7s;
            opacity: 0;
            will-change: opacity;
          }
          
          .buttons-animation {
            animation: fadeInUp 0.8s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
            animation-delay: 1s;
            opacity: 0;
            will-change: transform, opacity;
          }
          
          .tech-text {
            animation: fadeIn 1s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
            animation-delay: 1.3s;
            opacity: 0;
            will-change: opacity;
          }
          
          @keyframes slideDown {
            from {
              transform: translateY(-20px) translateZ(0);
              opacity: 0;
            }
            to {
              transform: translateY(0) translateZ(0);
              opacity: 1;
            }
          }
          
          @keyframes slideInRight {
            from {
              transform: translateX(-30px) translateZ(0);
              opacity: 0;
            }
            to {
              transform: translateX(0) translateZ(0);
              opacity: 1;
            }
          }
          
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
          
          @keyframes fadeInUp {
            from {
              transform: translateY(20px) translateZ(0);
              opacity: 0;
            }
            to {
              transform: translateY(0) translateZ(0);
              opacity: 1;
            }
          }
          
          /* Button hover effects */
          button {
            transition: all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
            will-change: transform, box-shadow;
          }
          
          button:hover {
            transform: translateY(-3px) translateZ(0);
            box-shadow: 0 5px 15px rgba(0, 153, 204, 0.3);
          }
          
          /* Force images to start in their initial positions */
          .diagonal-column img {
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;
          }
          
          /* Responsive adjustments */
          @media (max-width: 768px) {
            .content-container {
              padding: 50px 30px !important;
              justify-content: center !important;
              padding-top: 100px !important;
              text-align: center !important;
              align-items: center !important;
            }
            
            .content-container h1 {
              font-size: 44px !important;
              text-align: center !important;
              line-height: 1.2 !important;
            }
            
            .heading-animation .first-line,
            .heading-animation .second-line {
              display: block !important;
              text-align: center !important;
            }
            
            .content-container p {
              text-align: center !important;
            }
            
            .buttons-animation {
              justify-content: center !important;
            }
            
            .content-container p {
              font-size: 16px !important;
            }
            
            .diagonal-column {
              width: 30% !important;
            }
            
            .column-1 {
              left: 30% !important;
            }
            
            .column-2 {
              left: 60% !important;
            }
            
            .column-3 {
              left: 90% !important;
            }
          }
          
          /* Small tablet and large mobile */
          @media (max-width: 640px) {
            .content-container {
              padding: 40px 25px !important;
              padding-top: 100px !important;
              text-align: center !important;
              align-items: center !important;
            }
            
            .content-container h1 {
              font-size: 36px !important;
              margin-bottom: 20px !important;
              line-height: 1.2 !important;
              text-align: center !important;
            }
            
            .heading-animation .heading-text span {
              display: inline-block !important;
            }
            
            .content-container p {
              font-size: 15px !important;
              margin-bottom: 25px !important;
              text-align: center !important;
            }
            
            .buttons-animation {
              flex-direction: row !important;
              gap: 10px !important;
              width: 100%;
              justify-content: center !important;
            }
            
            button {
              padding: 10px 20px !important;
              font-size: 14px !important;
            }
          }
          
          /* Mobile view with only two columns visible */
          @media (max-width: 480px) {
            .content-container {
              padding: 30px 20px !important;
              padding-top: 90px !important;
              text-align: center !important;
              align-items: center !important;
            }
            
            .content-container h1 {
              font-size: 32px !important;
              margin-bottom: 15px !important;
              text-align: center !important;
              line-height: 1.3 !important;
            }
            
            /* Force heading to display in two lines only on mobile */
            .heading-animation .first-line,
            .heading-animation .second-line {
              display: block !important;
              text-align: center !important;
            }
            
            .content-container p {
              font-size: 14px !important;
              margin-bottom: 20px !important;
              text-align: center !important;
            }
            
            .buttons-animation {
              flex-direction: row !important;
              gap: 8px !important;
              width: 100%;
              justify-content: center !important;
            }
            
            button {
              padding: 10px 16px !important;
              font-size: 13px !important;
              white-space: nowrap !important;
              flex: 1 !important;
            }
            
            .diagonal-column {
              width: 45% !important;
            }
            
            .column-1 {
              left: 35% !important;
              z-index: 1;
              opacity: 0.7;
            }
            
            .column-2 {
              left: 80% !important;
              z-index: 2;
              opacity: 0.7;
            }
            
            .column-3 {
              display: none !important; /* Hide the third column on mobile */
            }
            
            .tech-text {
              left: 20px !important;
              bottom: 20px !important;
              font-size: 12px !important;
            }
            
            .slide-down {
              font-size: 16px !important;
            }
          }
          
          /* Extra small mobile devices */
          @media (max-width: 360px) {
            .content-container {
              text-align: center !important;
              align-items: center !important;
            }
            
            .content-container h1 {
              font-size: 28px !important;
              text-align: center !important;
              line-height: 1.3 !important;
            }
            
            /* Ensure heading text stays in two lines */
            .heading-animation .first-line,
            .heading-animation .second-line {
              display: block !important;
              text-align: center !important;
            }
            
            .content-container p {
              font-size: 13px !important;
              text-align: center !important;
            }
            
            .buttons-animation {
              gap: 8px !important;
              justify-content: center !important;
            }
            
            button {
              padding: 10px 16px !important;
              font-size: 12px !important;
            }
            
            .slide-down {
              font-size: 14px !important;
            }
          }
          
          /* Prevent animation flashing on page load */
          @media (prefers-reduced-motion: no-preference) {
            .diagonal-column {
              will-change: transform;
            }
          }
          
          /* Optimize for devices with reduced motion preferences */
          @media (prefers-reduced-motion: reduce) {
            .diagonal-column {
              animation-duration: 120s !important;
            }
            
            .slide-down,
            .heading-animation .heading-text,
            .fade-in,
            .buttons-animation,
            .tech-text {
              animation-duration: 1.5s !important;
            }
          }
        `}</style>
      </div>
    </>
  );
}