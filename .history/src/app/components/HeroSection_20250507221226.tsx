// DiagonalMarquee.tsx
import { useEffect, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';

export default function DiagonalMarquee() {
  const column1Ref = useRef<HTMLDivElement>(null);
  const column2Ref = useRef<HTMLDivElement>(null);
  const column3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Function to duplicate images to ensure smooth animation
    // Using a more general type that accepts the useRef result
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
        const imagesNeeded = Math.ceil((columnHeight * 3) / imageHeight) + 2;
        const currentImages = images.length;
        
        // Add more images if needed
        if (currentImages < imagesNeeded) {
          for (let i = 0; i < imagesNeeded - currentImages; i++) {
            const clone = firstImage.cloneNode(true) as HTMLImageElement;
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
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Diagonal Marquee Animation</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      
      <div style={{
        margin: 0,
        padding: 0,
        backgroundColor: '#04091d',
        overflow: 'hidden',
        height: '90vh', // Reduced height for laptops (was 100vh)
        width: '100%',
        maxWidth: '100%',
        boxSizing: 'border-box',
      }}>
        <div style={{
          position: 'relative',
          width: '100%',
          height: '100%', // Use parent's height
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
              }}
            >
              <img 
                src="/images/col-left.png" 
                alt=""
                style={{
                  width: '100%',
                  objectFit: 'contain',
                  marginBottom: '1px',
                }}
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
              }}
            >
              <img 
                src="/images/col-middle.png" 
                alt=""
                style={{
                  width: '100%',
                  objectFit: 'contain',
                  marginBottom: '1px',
                }}
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
              }}
            >
              <img 
                src="/images/col-right.png" 
                alt=""
                style={{
                  width: '100%',
                  objectFit: 'contain',
                  marginBottom: '1px',
                }}
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
          }
          
          @keyframes marquee-diagonal-up {
            0% {
              transform: translateY(0%);
            }
            100% {
              transform: translateY(-50%);
            }
          }

          @keyframes marquee-diagonal-down {
            0% {
              transform: translateY(-50%);
            }
            100% {
              transform: translateY(0%);
            }
          }
          
          /* Responsive adjustments */
          @media (max-width: 768px) {
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
          
          /* Mobile view with only two columns visible like in the reference image */
          @media (max-width: 480px) {
            .diagonal-column {
              width: 45% !important;
            }
            
            .column-1 {
              left: 15% !important;
              z-index: 1;
              opacity: 0.7;
            }
            
            .column-2 {
              left: 60% !important;
              z-index: 2;
              opacity: 0.7;
            }
            
            .column-3 {
              display: none !important; /* Hide the third column on mobile */
            }
          }
        `}</style>
      </div>
    </>
  );
}