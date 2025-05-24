// pages/stats.js or app/stats/page.js
'use client';

import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';

// Define the types for our counter state
interface CounterState {
  clients: number;
  projects: number;
  satisfaction: number;
  experts: number;
}

const StatsSection = () => {
  const [counters, setCounters] = useState<CounterState>({
    clients: 0,
    projects: 0,
    satisfaction: 0,
    experts: 0
  });
  
  const targetValues: CounterState = {
    clients: 50,
    projects: 70,
    satisfaction: 98,
    experts: 5
  };
  
  const containerRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const animationStarted = useRef<boolean>(false);

  useEffect(() => {
    // Change threshold to a lower value for earlier triggering
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animationStarted.current) {
          setIsVisible(true);
          animationStarted.current = true;
          startCounterAnimation();
        }
      },
      { threshold: 0.01, rootMargin: "100px 0px" } // Lower threshold and add rootMargin for earlier detection
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  const startCounterAnimation = (): void => {
    const duration = 1500; // Reduced from 2000ms to 1500ms for faster animation
    const frameDuration = 1000 / 60; // 60 fps
    const totalFrames = duration / frameDuration;

    Object.entries(targetValues).forEach(([key, targetValue]) => {
      let frame = 0;
      
      const animate = (): void => {
        frame++;
        const progress = frame / totalFrames;
        const currentValue = Math.min(Math.round(targetValue * progress), targetValue);
        
        setCounters(prev => ({
          ...prev,
          [key]: currentValue
        }));

        if (frame < totalFrames) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    });
  };

  // Use a faster transition
  const containerStyle = {
    maxWidth: '1600px',
    margin: '0 auto',
    padding: '60px 20px',
    backgroundColor: '#001525',
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
    transition: 'opacity 0.4s ease-out, transform 0.4s ease-out' // Faster transition: 0.6s -> 0.4s
  };

  const statsGridStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '10px',
    padding: '0 20px'
  };

  const statItemStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '25px',
    padding: '20px 40px',
    borderRadius: '10px',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    flex: '1 1 300px',
    maxWidth: '400px',
    position: 'relative'
  };

  const iconContainerStyle = {
    width: '80px',
    height: '80px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '10px',
    transition: 'transform 0.3s ease'
  };

  const imageStyle = {
    width: '60px',
    height: '60px',
    objectFit: 'contain',
    transition: 'transform 0.3s ease'
  };

  const contentStyle = {
    flex: 1,
    minWidth: '150px'
  };

  const numberStyle = {
    fontSize: '3rem',
    fontWeight: 'bold',
    color: '#00b4d8',
    lineHeight: '1.2',
    marginBottom: '5px',
    transition: 'color 0.3s ease'
  };

  const textStyle = {
    fontSize: '1.1rem',
    color: '#ffffff',
    opacity: 0.9,
    fontWeight: '500'
  };

  const sectionHeadingStyle = {
    fontSize: '2.5rem',
    textAlign: 'center',
    color: '#ffffff',
    marginBottom: '50px',
    fontWeight: 'bold'
  };

  // Add the section title back in
  const sectionTitle = "Our Achievement Numbers";

  const handleHover = (e: React.MouseEvent<HTMLDivElement>, isEnter: boolean): void => {
    const item = e.currentTarget;
    const icon = item.querySelector('img');
    const number = item.querySelector('div[style*="fontSize: 3rem"]');

    if (isEnter) {
      item.style.transform = 'translateY(-5px)';
      if (icon) icon.style.transform = 'scale(1.1)';
      if (number) (number as HTMLElement).style.color = '#00d4ff';
    } else {
      item.style.transform = 'translateY(0)';
      if (icon) icon.style.transform = 'scale(1)';
      if (number) (number as HTMLElement).style.color = '#00b4d8';
    }
  };

  // Pre-load the animation with a small initial delay
  useEffect(() => {
    // Start animation after a short delay even if not in view
    const timer = setTimeout(() => {
      if (!animationStarted.current) {
        setIsVisible(true);
        animationStarted.current = true;
        startCounterAnimation();
      }
    }, 500); // Wait 500ms after component mount

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Head>
        <title>Our Performance Metrics | Kinseb Web Development</title>
        <meta 
          name="description" 
          content="Discover our track record of success with 50+ happy clients, 70+ delivered projects, and 98% client satisfaction rate."
        />
        <meta 
          name="keywords" 
          content="client satisfaction, project delivery, tech experts, design experts, performance metrics"
        />
        <meta property="og:title" content="Our Performance Metrics | Kinseb Web Development" />
        <meta 
          property="og:description" 
          content="Discover our track record of success with 50+ happy clients, 70+ delivered projects, and 98% client satisfaction rate."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/og-image.jpg" />
      </Head>

      <section ref={containerRef as React.RefObject<HTMLElement>} style={containerStyle} aria-label="Company Statistics">
        <h2 style={sectionHeadingStyle}>{sectionTitle}</h2>
        
        <div style={statsGridStyle}>
          <div 
            style={statItemStyle} 
            onMouseEnter={(e) => handleHover(e, true)}
            onMouseLeave={(e) => handleHover(e, false)}
          >
            <div style={iconContainerStyle}>
              <img src="/images/people.png" alt="" style={imageStyle} aria-hidden="true" />
            </div>
            <div style={contentStyle}>
              <div style={numberStyle} aria-label={`${counters.clients}+ Happy Clients`}>
                {counters.clients}+
              </div>
              <div style={textStyle}>Happy Clients</div>
            </div>
          </div>

          <div 
            style={statItemStyle}
            onMouseEnter={(e) => handleHover(e, true)}
            onMouseLeave={(e) => handleHover(e, false)}
          >
            <div style={iconContainerStyle}>
              <img src="/images/45.png" alt="" style={imageStyle} aria-hidden="true" />
            </div>
            <div style={contentStyle}>
              <div style={numberStyle} aria-label={`${counters.projects}+ Projects Delivered`}>
                {counters.projects}+
              </div>
              <div style={textStyle}>Projects Delivered</div>
            </div>
          </div>

          <div 
            style={statItemStyle}
            onMouseEnter={(e) => handleHover(e, true)}
            onMouseLeave={(e) => handleHover(e, false)}
          >
            <div style={iconContainerStyle}>
              <img src="/images/46.png" alt="" style={imageStyle} aria-hidden="true" />
            </div>
            <div style={contentStyle}>
              <div style={numberStyle} aria-label={`${counters.satisfaction}% Client Satisfaction`}>
                {counters.satisfaction}%
              </div>
              <div style={textStyle}>Client Satisfaction</div>
            </div>
          </div>

          <div 
            style={statItemStyle}
            onMouseEnter={(e) => handleHover(e, true)}
            onMouseLeave={(e) => handleHover(e, false)}
          >
            <div style={iconContainerStyle}>
              <img src="/images/47.png" alt="" style={imageStyle} aria-hidden="true" />
            </div>
            <div style={contentStyle}>
              <div style={numberStyle} aria-label={`${counters.experts}+ Design & Tech Experts`}>
                {counters.experts}+
              </div>
              <div style={textStyle}>Design & Tech Experts</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default StatsSection;