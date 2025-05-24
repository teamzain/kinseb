'use client';

import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { supabase } from './supabaseClient'; 
// Define the types for our counter state
interface CounterState {
  clients: number;
  projects: number;
  satisfaction: number;
  experts: number;
}

// Define the type for our Supabase data
interface StatsData {
  id: number;
  number1: string;
  title1: string;
  number2: string;
  title2: string;
  number3: string;
  title3: string;
  number4: string;
  title4: string;
}

const StatsSection = () => {
  const [counters, setCounters] = useState<CounterState>({
    clients: 0,
    projects: 0,
    satisfaction: 0,
    experts: 0
  });
  
  const [statsData, setStatsData] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  
  // Default target values if database fetch fails
  const defaultTargetValues: CounterState = {
    clients: 50,
    projects: 70,
    satisfaction: 98,
    experts: 5
  };
  
  // Computed target values that will use database values if available
  const targetValues: CounterState = {
    clients: statsData ? parseInt(statsData.number1) : defaultTargetValues.clients,
    projects: statsData ? parseInt(statsData.number2) : defaultTargetValues.projects,
    satisfaction: statsData ? parseInt(statsData.number3) : defaultTargetValues.satisfaction,
    experts: statsData ? parseInt(statsData.number4) : defaultTargetValues.experts
  };
  
  const containerRef = useRef<HTMLElement | null>(null);
  const animationStarted = useRef<boolean>(false);

  // Fetch data from Supabase
  useEffect(() => {
    const fetchStatsData = async () => {
      try {
        const { data, error } = await supabase
          .from('homestats')
          .select('*')
          .limit(1)
          .single();

        if (error) {
          console.error('Error fetching stats data:', error);
        } else if (data) {
          setStatsData(data);
        }
      } catch (error) {
        console.error('Failed to fetch stats data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStatsData();
  }, []);

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
  }, [loading, targetValues]); // Add dependencies to re-run when data is loaded

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

  // Get title texts from database or fallback to defaults
  const title1 = statsData?.title1 || "Happy Clients";
  const title2 = statsData?.title2 || "Projects Delivered";
  const title3 = statsData?.title3 || "Client Satisfaction";
  const title4 = statsData?.title4 || "Design & Tech Experts";

  // Meta description using dynamic values if available
  const metaDescription = `Trusted by ${targetValues.clients}+ happy clients with ${targetValues.projects}+ successful projects delivered, ${targetValues.satisfaction}% client satisfaction rate, and ${targetValues.experts}+ design & tech experts at Kinseb Web Development.`;

  return (
    <>
      <Head>
        <title>Our Performance Metrics | Kinseb Web Development</title>
        <meta 
          name="description" 
          content={metaDescription}
        />
        <meta 
          name="keywords" 
          content="web development metrics, client satisfaction, project delivery, tech experts, design experts, Kinseb, performance statistics"
        />
        <link rel="canonical" href="https://www.kinseb.com/metrics" />
        <meta property="og:title" content="Our Performance Metrics | Kinseb Web Development" />
        <meta 
          property="og:description" 
          content={metaDescription}
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/og-image.jpg" />
        <meta property="og:url" content="https://www.kinseb.com/metrics" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Our Performance Metrics | Kinseb Web Development" />
        <meta 
          name="twitter:description" 
          content={metaDescription}
        />
        <meta name="twitter:image" content="/images/og-image.jpg" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Kinseb Web Development",
              "url": "https://www.kinseb.com",
              "logo": "https://www.kinseb.com/images/logo.png",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "ratingCount": "50",
                "bestRating": "5"
              }
            }
          `}
        </script>
      </Head>

      <section 
        ref={containerRef as React.RefObject<HTMLElement>} 
        className="stats-section"
        aria-label="Company Performance Statistics"
        itemScope
        itemType="https://schema.org/Service"
      >
        <h2 className="stats-heading visually-hidden">Our Performance Metrics</h2>
        <div className="stats-container">
          <div className="stats-item" itemProp="hasOfferCatalog" itemScope itemType="https://schema.org/OfferCatalog">
            <div className="icon-container">
              <img src="/images/people.png" alt={`${title1} Icon`} width="93" height="93" />
            </div>
            <div className="stats-text">
              <div className="stats-number" aria-label={`${counters.clients}+ ${title1}`} itemProp="itemListElement">
                <span itemProp="numberOfItems">{counters.clients}</span>+
              </div>
              <div className="stats-label" itemProp="name">{title1}</div>
            </div>
          </div>

          <div className="stats-item">
            <div className="icon-container">
              <img src="/images/45.png" alt={`${title2} Icon`} width="93" height="93" />
            </div>
            <div className="stats-text">
              <div className="stats-number" aria-label={`${counters.projects}+ ${title2}`} itemProp="serviceOutput">
                <span>{counters.projects}</span>+
              </div>
              <div className="stats-label">{title2}</div>
            </div>
          </div>

          <div className="stats-item">
            <div className="icon-container">
              <img src="/images/46.svg" alt={`${title3} Icon`} width="93" height="93" />
            </div>
            <div className="stats-text">
              <div className="stats-number" aria-label={`${counters.satisfaction}% ${title3}`} itemProp="aggregateRating" itemScope itemType="https://schema.org/AggregateRating">
                <span itemProp="ratingValue">{counters.satisfaction}</span>%
              </div>
              <div className="stats-label" itemProp="reviewCount">{title3}</div>
            </div>
          </div>

          <div className="stats-item">
            <div className="icon-container">
              <img src="/images/47.png" alt={`${title4} Icon`} width="93" height="93" />
            </div>
            <div className="stats-text">
              <div className="stats-number" aria-label={`${counters.experts}+ ${title4}`} itemProp="employees">
                <span>{counters.experts}</span>+
              </div>
              <div className="stats-label">{title4}</div>
            </div>
          </div>
        </div>

        <style jsx>{`
          .visually-hidden {
            position: absolute;
            width: 1px;
            height: 1px;
            margin: -1px;
            padding: 0;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            border: 0;
          }
          
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