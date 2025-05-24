'use client';

import { useEffect, useState, useRef } from 'react';
import { 
  FaHtml5, FaCss3Alt, FaReact, FaNodeJs, FaDocker, 
  FaGithub, FaNpm, FaDatabase, FaBootstrap, FaSass,
  FaPython, FaAws, FaJava, FaPhp, FaAngular, FaVuejs
} from 'react-icons/fa';
import { 
  SiJavascript, SiTypescript, SiNextdotjs, SiTailwindcss, 
  SiMongodb, SiGraphql, SiRedux, SiFirebase, SiVercel, SiNetlify,
  SiPostgresql, SiMysql, SiRust, SiGo, SiKubernetes, SiFlutter,
  SiElastic, SiTensorflow, SiAmazon, SiFigma
} from 'react-icons/si';

/**
 * TechStackMarquee Component
 * 
 * A visually enhanced, accessible marquee displaying technology stack icons
 * with smooth animations and interactive hover effects.
 * Improved design with increased spacing and better responsiveness.
 */
const TechStackMarquee = () => {
  const [animate, setAnimate] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLElement>(null);

  // Tech icons with names (for accessibility) and hover colors
  const technologies = [
    { Icon: SiNextdotjs, name: 'Next.js', hoverColor: '#ffffff' },
    { Icon: FaReact, name: 'React', hoverColor: '#61DAFB' },
    { Icon: FaNodeJs, name: 'Node.js', hoverColor: '#68A063' },
    { Icon: SiGraphql, name: 'GraphQL', hoverColor: '#E535AB' },
    { Icon: SiMongodb, name: 'MongoDB', hoverColor: '#4DB33D' },
    { Icon: FaGithub, name: 'GitHub', hoverColor: '#ffffff' },
    { Icon: SiJavascript, name: 'JavaScript', hoverColor: '#F7DF1E' },
    { Icon: SiTypescript, name: 'TypeScript', hoverColor: '#3178C6' },
    { Icon: SiTailwindcss, name: 'Tailwind CSS', hoverColor: '#38B2AC' },
    { Icon: SiRedux, name: 'Redux', hoverColor: '#764ABC' },
    { Icon: FaCss3Alt, name: 'CSS3', hoverColor: '#1572B6' },
    { Icon: FaHtml5, name: 'HTML5', hoverColor: '#E34F26' },
    { Icon: FaNpm, name: 'npm', hoverColor: '#CB3837' },
    { Icon: FaDatabase, name: 'Database', hoverColor: '#ffffff' },
    { Icon: SiFirebase, name: 'Firebase', hoverColor: '#FFCA28' },
    { Icon: FaDocker, name: 'Docker', hoverColor: '#2496ED' },
    { Icon: SiPostgresql, name: 'PostgreSQL', hoverColor: '#336791' },
    { Icon: FaAws, name: 'AWS', hoverColor: '#FF9900' },
    { Icon: SiKubernetes, name: 'Kubernetes', hoverColor: '#326CE5' },
    { Icon: FaPython, name: 'Python', hoverColor: '#3776AB' },
    { Icon: FaJava, name: 'Java', hoverColor: '#ED8B00' },
    { Icon: SiRust, name: 'Rust', hoverColor: '#DEA584' },
    { Icon: SiGo, name: 'Go', hoverColor: '#00ADD8' },
    { Icon: FaVuejs, name: 'Vue.js', hoverColor: '#4FC08D' },
    { Icon: FaAngular, name: 'Angular', hoverColor: '#DD0031' },
    { Icon: SiFlutter, name: 'Flutter', hoverColor: '#02569B' },
    { Icon: SiTensorflow, name: 'TensorFlow', hoverColor: '#FF6F00' },
    { Icon: SiFigma, name: 'Figma', hoverColor: '#F24E1E' },
  ];

  // Create duplicate arrays for seamless infinite loop
  const allTechnologies = [...technologies, ...technologies];

  // Control animation playback
  const pauseAnimation = () => {
    if (marqueeRef.current) {
      marqueeRef.current.style.animationPlayState = 'paused';
    }
    setIsPaused(true);
  };

  const resumeAnimation = () => {
    if (marqueeRef.current) {
      marqueeRef.current.style.animationPlayState = 'running';
    }
    setIsPaused(false);
  };

  useEffect(() => {
    // Start animation after component mounts with a slight delay for better performance
    const animationTimer = setTimeout(() => {
      setAnimate(true);
    }, 100);
    
    // For more seamless looping, handle animation iteration
    const handleAnimationEnd = () => {
      if (marqueeRef.current) {
        marqueeRef.current.style.animation = 'none';
        // Force reflow
        void marqueeRef.current.offsetWidth;
        marqueeRef.current.style.animation = isPaused ? 'none' : 'scroll 50s linear infinite';
      }
    };

    if (marqueeRef.current) {
      marqueeRef.current.addEventListener('animationiteration', handleAnimationEnd);
    }

    return () => {
      clearTimeout(animationTimer);
      if (marqueeRef.current) {
        marqueeRef.current.removeEventListener('animationiteration', handleAnimationEnd);
      }
    };
  }, [isPaused]);

  // Adjust animation speed based on screen size for better performance
  useEffect(() => {
    const handleResize = () => {
      if (marqueeRef.current && !isPaused) {
        // Adjust speed based on screen width - slower animation for better visibility
        const speed = window.innerWidth < 480 ? '35s' : 
                     (window.innerWidth < 768 ? '45s' : 
                     (window.innerWidth < 1024 ? '50s' : '55s'));
        marqueeRef.current.style.animation = `scroll ${speed} linear infinite`;
      }
    };

    window.addEventListener('resize', handleResize);
    // Initial call
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [animate, isPaused]);

  return (
    <section 
      aria-label="Technology Stack Showcase" 
      className="tech-stack-marquee"
      ref={containerRef}
      style={{
        width: '100%',
        overflow: 'hidden',
        backgroundColor: '#111827', // Darker background for better contrast
        padding: '16px 0', // Increased vertical padding
        margin: '0',
        position: 'relative',
        boxShadow: 'inset 0 0 30px rgba(0,0,0,0.7)',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}
      onMouseEnter={pauseAnimation}
      onMouseLeave={resumeAnimation}
      onFocus={pauseAnimation}
      onBlur={resumeAnimation}
    >
      {/* Screen reader description */}
      <div className="sr-only">
        A showcase of technologies including JavaScript, React, Node.js, and more.
      </div>
      
      <div 
        ref={marqueeRef}
        className="marquee-content" 
        style={{
          display: 'flex',
          whiteSpace: 'nowrap',
          animation: animate && !isPaused ? 'scroll 50s linear infinite' : 'none',
          padding: '10px 0', // Increased for better vertical spacing
        }}
        aria-hidden="true" // Hide from screen readers as we provided an alternative description
      >
        {allTechnologies.map((tech, index) => (
          <div key={index} 
            className="tech-icon"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 clamp(25px, 4vw, 60px)', // Increased spacing between icons
              height: 'clamp(36px, 5vw, 50px)', // Slightly increased icon container height
              transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              position: 'relative',
            }}
            title={tech.name} // Show name on hover
          >
            <tech.Icon 
              style={{
                fontSize: 'clamp(32px, 4vw, 42px)', // Slightly increased icon size
                color: '#FFFFFF',
                opacity: '0.85', // Slightly dimmed by default
                filter: 'drop-shadow(0 0 3px rgba(255,255,255,0.2))',
                transition: 'all 0.3s ease',
              }} 
              className="icon"
              data-hover-color={tech.hoverColor}
              aria-label={tech.name}
              role="img"
            />
            {/* Icon label that appears on hover */}
            <span 
              className="tech-label"
              style={{
                position: 'absolute',
                bottom: '-28px',
                left: '50%',
                transform: 'translateX(-50%) translateY(10px)',
                color: '#fff',
                fontSize: 'clamp(10px, 1.5vw, 12px)',
                fontWeight: '500',
                opacity: '0',
                transition: 'all 0.3s ease',
                pointerEvents: 'none',
                whiteSpace: 'nowrap',
                textShadow: '0 0 4px rgba(0,0,0,0.8)',
              }}
            >
              {tech.name}
            </span>
            {/* Hidden text for better SEO */}
            <span className="sr-only">{tech.name}</span>
          </div>
        ))}
      </div>
      
      {/* Enhanced fade edges for better visual appearance */}
      <div className="fade-edge fade-left" aria-hidden="true"></div>
      <div className="fade-edge fade-right" aria-hidden="true"></div>
      
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border-width: 0;
        }
        
        .tech-icon {
          position: relative;
          z-index: 1;
        }
        
        .tech-icon:hover {
          transform: translateY(-8px) scale(1.2);
        }
        
        .tech-icon:hover .icon {
          color: var(--hover-color, #fff) !important;
          opacity: 1 !important;
          filter: drop-shadow(0 0 10px rgba(255,255,255,0.7)) brightness(1.3);
        }
        
        .tech-icon:hover .tech-label {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }
        
        .tech-icon:hover::after {
          content: '';
          position: absolute;
          bottom: -12px;
          left: 50%;
          transform: translateX(-50%);
          width: 6px;
          height: 6px;
          background: var(--hover-color, #fff);
          border-radius: 50%;
          box-shadow: 0 0 10px 3px rgba(255,255,255,0.6);
        }
        
        .fade-edge {
          content: '';
          position: absolute;
          top: 0;
          width: clamp(80px, 10vw, 150px); /* Wider fade edges */
          height: 100%;
          z-index: 2;
        }
        
        .fade-left {
          left: 0;
          background: linear-gradient(to right, #111827, transparent);
        }
        
        .fade-right {
          right: 0;
          background: linear-gradient(to left, #111827, transparent);
        }
        
        @media (prefers-reduced-motion: reduce) {
          .marquee-content {
            animation: none !important;
          }
          
          .tech-icon:hover {
            transform: scale(1.1);
          }
        }
        
        /* Responsive adjustments */
        @media (max-width: 1200px) {
          .tech-icon {
            margin: 0 clamp(20px, 3.5vw, 50px) !important;
          }
        }
        
        @media (max-width: 768px) {
          .tech-stack-marquee {
            padding: 12px 0 !important;
          }
          
          .marquee-content {
            padding: 8px 0 !important;
          }
          
          .tech-icon {
            margin: 0 clamp(18px, 3vw, 40px) !important;
          }
        }
        
        @media (max-width: 480px) {
          .tech-stack-marquee {
            padding: 10px 0 !important;
          }
          
          .tech-icon {
            margin: 0 clamp(15px, 2.5vw, 30px) !important;
          }
          
          .tech-icon:hover {
            transform: translateY(-5px) scale(1.15);
          }
        }
        
        /* Apply hover colors dynamically */
        ${technologies.map(tech => `
          .tech-icon:hover .icon[data-hover-color="${tech.hoverColor}"] {
            --hover-color: ${tech.hoverColor};
          }
          
          .tech-icon:hover::after[data-hover-color="${tech.hoverColor}"] {
            --hover-color: ${tech.hoverColor};
          }
        `).join('\n')}
      `}</style>
    </section>
  );
};

export default TechStackMarquee;