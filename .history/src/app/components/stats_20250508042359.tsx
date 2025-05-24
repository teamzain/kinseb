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
  const animationStarted = useRef<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animationStarted.current) {
          animationStarted.current = true;
          startCounterAnimation();
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
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
    const duration = 2000; // 2 seconds
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

  // Reset animation when component is hidden and shown again
  const resetAnimation = () => {
    if (!animationStarted.current) return;
    
    setCounters({
      clients: 0,
      projects: 0,
      satisfaction: 0,
      experts: 0
    });
    
    animationStarted.current = false;
  };

  // Add visibility change event listener to reset animation when tab becomes visible again
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        resetAnimation();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
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

      <section 
        ref={containerRef as React.RefObject<HTMLElement>} 
        className="stats-section"
        aria-label="Company Statistics"
      >
        <div className="stats-container">
          <div className="stats-item">
            <div className="icon-container">
              <img src="/images/people.png" alt="" aria-hidden="true" />
            </div>
            <div className="stats-text">
              <div className="stats-number" aria-label={`${counters.clients}+ Happy Clients`}>
                {counters.clients}+
              </div>
              <div className="stats-label">Happy Clients</div>
            </div>
          </div>

          <div className="stats-item">
            <div className="icon-container">
              <img src="/images/45.png" alt="" aria-hidden="true" />
            </div>
            <div className="stats-text">
              <div className="stats-number" aria-label={`${counters.projects}+ Projects Delivered`}>
                {counters.projects}+
              </div>
              <div className="stats-label">Projects Delivered</div>
            </div>
          </div>

          <div className="stats-item">
            <div className="icon-container">
              <img src="/images/46.svg" alt="" aria-hidden="true" />
            </div>
            <div className="stats-text">
              <div className="stats-number" aria-label={`${counters.satisfaction}% Client Satisfaction`}>
                {counters.satisfaction}%
              </div>
              <div className="stats-label">Client Satisfaction</div>
            </div>
          </div>

          <div className="stats-item">
            <div className="icon-container">
              <img src="/images/47.png" alt="" aria-hidden="true" />
            </div>
            <div className="stats-text">
              <div className="stats-number" aria-label={`${counters.experts}+ Design & Tech Experts`}>
                {counters.experts}+
              </div>
              <div className="stats-label">Design & Tech Experts</div>
            </div>
          </div>
        </div>

        <style jsx>{`
          .stats-section {
            max-width: 1600px;
            margin: 0 auto;
            padding: 40px 15px;
            background: linear-gradient(90deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0) 100%), 
                        linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(13, 152, 186, 0.2) 100%), 
                        #04091D;
            position: relative;
          }
          
          .stats-container {
            width: 100%;
            min-height: 153.66px;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            align-items: center;
            gap: 20px;
            padding: 20px;
          }
          
          .stats-item {
            display: flex;
            align-items: center;
            gap: 15px;
            transition: all 0.3s ease;
            padding: 10px;
          }
          
          .icon-container {
            width: 93.26px;
            height: 93.26px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: transform 0.3s ease;
          }
          
          .icon-container img {
            width: 100%;
            height: 100%;
            object-fit: contain;
          }
          
          .stats-item:hover .icon-container {
            transform: scale(1.1);
          }
          
          .stats-text {
            display: flex;
            flex-direction: column;
          }
          
          .stats-number {
            font-family: Inter, sans-serif;
            font-weight: 600;
            font-size: 56px;
            line-height: 64px;
            text-align: left;
            letter-spacing: -0.03em;
            color: #FFFFFF;
            margin-bottom: 5px;
          }
          
          .stats-label {
            font-family: Inter, sans-serif;
            font-weight: 600;
            font-size: 20px;
            line-height: 24px;
            color: #FFFFFF;
          }
          
          /* Responsive styles */
          @media (max-width: 1200px) {
            .stats-container {
              justify-content: center;
              gap: 30px;
            }
            
            .stats-item {
              width: calc(50% - 30px);
              justify-content: center;
            }
          }
          
          @media (max-width: 768px) {
            .stats-container {
              flex-direction: column;
              align-items: center;
            }
            
            .stats-item {
              width: 100%;
              justify-content: flex-start;
              max-width: 400px;
            }
            
            .stats-number {
              font-size: 42px;
              line-height: 50px;
            }
            
            .stats-label {
              font-size: 18px;
              line-height: 22px;
            }
          }
          
          @media (max-width: 480px) {
            .stats-container {
              padding: 10px 5px;
            }
            
            .stats-item {
              flex-direction: row;
              align-items: center;
              justify-content: center;
              gap: 10px;
              width: 100%;
              padding: 10px 5px;
            }
            
            .stats-text {
              align-items: flex-start;
            }
            
            .stats-number {
              font-size: 32px;
              line-height: 38px;
            }
            
            .stats-label {
              font-size: 16px;
              line-height: 20px;
            }
            
            .icon-container {
              width: 60px;
              height: 60px;
              flex-shrink: 0;
            }
          }
        `}</style>
      </section>
    </>
  );
};

export default StatsSection;