// DiagonalMarquee.tsx
import { useEffect, useRef, useState } from 'react';
import Head from 'next/head';

export default function DiagonalMarquee() {
  const column1Ref = useRef<HTMLDivElement>(null);
  const column2Ref = useRef<HTMLDivElement>(null);
  const column3Ref = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if we're on mobile initially
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
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
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Calculate rotation angle based on device width
  const rotationAngle = isMobile ? 25 : 15;

  return (
    <>
      <Head>
        <title>Diagonal Marquee Animation</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Head>
      
      <div className="marquee-container">
        <div className="viewport-container">
          <div 
            className="rotated-container"
            style={{
              transform: `rotate(${rotationAngle}deg)`,
            }}
          >
            {/* First Column - moving down */}
            <div ref={column1Ref} className="diagonal-column column-1">
              <img 
                src="/images/col-left.png" 
                alt=""
                className="column-image"
              />
            </div>
            
            {/* Middle Column - moving up */}
            <div ref={column2Ref} className="diagonal-column column-2">
              <img 
                src="/images/col-middle.png" 
                alt=""
                className="column-image"
              />
            </div>
            
            {/* Third Column - moving down */}
            <div ref={column3Ref} className="diagonal-column column-3">
              <img 
                src="/images/col-right.png" 
                alt=""
                className="column-image"
              />
            </div>
          </div>
        </div>
        
        <style jsx global>{`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          html, body {
            overflow-x: hidden;
            width: 100%;
            position: relative;
          }
          
          .marquee-container {
            background-color: #04091d;
            overflow: hidden;
            height: 100vh;
            width: 100vw;
            position: fixed;
            top: 0;
            left: 0;
          }
          
          .viewport-container {
            position: relative;
            width: 100%;
            height: 100%;
            overflow: hidden;
          }
          
          .rotated-container {
            position: absolute;
            top: -100%;
            left: 0;
            width: 100%;
            height: 300%;
            transform-origin: center;
          }
          
          .diagonal-column {
            position: absolute;
            height: 100%;
            width: 25%;
            display: flex;
            flex-direction: column;
            animation-timing-function: linear;
            animation-iteration-count: infinite;
          }
          
          .column-1 {
            left: 40%;
            animation: marquee-diagonal-down 65s linear infinite;
          }
          
          .column-2 {
            left: 65%;
            animation: marquee-diagonal-up 55s linear infinite;
            animation-delay: -15s;
          }
          
          .column-3 {
            left: 90%;
            animation: marquee-diagonal-down 65s linear infinite;
            animation-delay: -25s;
          }
          
          .column-image {
            width: 100%;
            object-fit: contain;
            margin-bottom: 1px;
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
          
          /* Responsive adjustments for tablets */
          @media (max-width: 768px) {
            .diagonal-column {
              width: 30%;
            }
            
            .column-1 {
              left: 25%;
            }
            
            .column-2 {
              left: 55%;
            }
            
            .column-3 {
              left: 85%;
            }
          }
          
          /* Responsive adjustments for mobile phones */
          @media (max-width: 480px) {
            .diagonal-column {
              width: 40%;
            }
            
            .column-1 {
              left: 15%;
            }
            
            .column-2 {
              left: 50%;
            }
            
            .column-3 {
              left: 85%;
            }
            
            /* Adjust animation speed for mobile */
            .column-1, .column-3 {
              animation-duration: 45s;
            }
            
            .column-2 {
              animation-duration: 40s;
            }
          }
          
          /* Extreme small screens */
          @media (max-width: 320px) {
            .diagonal-column {
              width: 45%;
            }
            
            .column-1 {
              left: 10%;
            }
            
            .column-2 {
              left: 45%;
            }
            
            .column-3 {
              left: 80%;
            }
          }
        `}</style>
      </div>
    </>
  );
}