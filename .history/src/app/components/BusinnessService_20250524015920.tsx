'use client';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { supabase } from './supabaseClient'; 

// Type definitions for the service page map
const servicePageMap: Record<string, string> = {
  "Web App Design": "/web-app-design",
  "Mobile App Design": "/mobile-app-design",
  "Website App Design": "/website-app-design",
  "Website Redesign": "/website-redesign",
  "Web Development Ecommerce": "/ecommerce-development",
  "Web Development Shopify": "/shopify-development",
  "Website Development Custom": "/custom-development",
  "Conversion-Focused Design": "/conversion-focused-design",
  "Industry-Specific Solutions": "/industry-specific-solutions",
  "Responsive Across Devices": "/responsive-web-design",
  "SEO-First Foundation": "/seo-web-development",
};

// TypeScript interfaces
interface ServiceCardProps {
  iconSrc: string;
  title: string;
  description: string;
  hoverImage: string;
  animationDelay: number;
  isVisible: boolean;
  onHover: (isHovering: boolean) => void;
}

interface ServiceItem {
  iconSrc: string;
  title: string;
  description: string;
  hoverImage: string;
}

interface BusinessSectionData {
  section_title: string;
  section_description: string;
  card1_title: string;
  card1_description: string;
  card2_title: string;
  card2_description: string;
  card3_title: string;
  card3_description: string;
  card4_title: string;
  card4_description: string;
  card5_title: string;
  card5_description: string;
  card6_title: string;
  card6_description: string;
  card7_title: string;
  card7_description: string;
}

// Desktop Service Card Component
const ServiceCard = ({ iconSrc, title, description, hoverImage, animationDelay, isVisible, onHover }: ServiceCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();
  const destinationPage = servicePageMap[title] || "/services";
  
  const handleNavigation = () => {
    router.push(destinationPage);
  };
  
  const handleMouseEnter = () => {
    setIsHovered(true);
    onHover(true);
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    onHover(false);
  };
  
  // Generate structured data for each service
  const structuredData = {
    "@type": "Service",
    "name": title,
    "description": description,
    "provider": {
      "@type": "Organization",
      "name": "Your Company Name"
    },
    "serviceType": "Web Development",
    "url": `https://yourwebsite.com${destinationPage}`
  };
  
  return (
    <article 
      onClick={handleNavigation}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      itemScope
      itemType="https://schema.org/Service"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleNavigation();
        }
      }}
      aria-label={`Learn more about ${title}: ${description}`}
      style={{
        width: '307px',
        height: '389px',
        background: 'linear-gradient(180deg, rgba(13, 152, 186, 0.3) 0%, rgba(0, 0, 0, 0.3) 100%), #16161E',
        border: '1px solid #0D98BA',
        borderRadius: '10px',
        padding: '30px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'all 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)',
        transform: isVisible 
          ? isHovered 
            ? 'translateY(-10px)' 
            : 'translateY(0)'
          : 'translateY(50px)',
        opacity: isVisible ? 1 : 0,
        cursor: 'pointer',
        position: 'relative',
        transitionDelay: `${animationDelay}ms`,
        boxShadow: isHovered 
          ? '0 15px 30px rgba(13, 152, 186, 0.2)' 
          : '0 5px 15px rgba(0, 0, 0, 0.1)',
        margin: '10px',
      }}
    >
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
      
      {/* Background image with enhanced visibility on hover */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: isHovered ? 1 : 0,
        transition: 'opacity 0.6s cubic-bezier(0.25, 0.1, 0.25, 1), transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)',
        zIndex: 0,
        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
        filter: isHovered ? 'brightness(1.1) contrast(1.2) saturate(1.1)' : 'brightness(0.8)',
      }}>
        <Image
          src={hoverImage}
          alt={`${title} service visualization showing professional web development work`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: 'cover' }}
          priority={animationDelay < 300}
          loading={animationDelay < 300 ? 'eager' : 'lazy'}
        />
      </div>
      
      {/* Content with icon, title, description */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        opacity: isHovered ? 0 : 1,
        transition: 'opacity 0.4s ease',
      }}>
        <div style={{
          width: '48px',
          height: '48px',
          marginBottom: '20px',
          transform: isHovered ? 'translateY(-10px)' : 'translateY(0)',
          transition: 'transform 0.4s ease',
        }}>
          <Image
            src={iconSrc}
            alt={`${title} icon`}
            width={48}
            height={48}
            style={{
              filter: 'invert(58%) sepia(69%) saturate(456%) hue-rotate(152deg) brightness(87%) contrast(86%)',
            }}
            loading="lazy"
          />
        </div>
        
        <h3 
          itemProp="name"
          style={{
            color: 'white',
            fontSize: '20px',
            fontWeight: '600',
            marginBottom: '15px',
            lineHeight: '1.3',
          }}
        >
          {title}
        </h3>
        
        <p 
          itemProp="description"
          style={{
            color: '#9ca3af',
            fontSize: '16px',
            lineHeight: '1.5',
            marginBottom: '20px',
          }}
        >
          {description}
        </p>
        
        <div 
          aria-hidden="true"
          style={{
            color: '#36b2c8',
            fontSize: '24px',
            fontWeight: isHovered ? '700' : '400',
            marginTop: 'auto',
            textAlign: 'right',
            transition: 'all 0.3s ease',
          }}
        >
          →
        </div>
      </div>
      
      {/* Enhanced overlay with animation and clearer background */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '30px',
        boxSizing: 'border-box',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        opacity: isHovered ? 1 : 0,
        transform: isHovered ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.5s ease, transform 0.5s ease',
        zIndex: 2,
      }}>
        <h3 style={{
          color: 'white',
          fontSize: '24px',
          fontWeight: '600',
          marginBottom: '15px',
          textAlign: 'center',
          transform: isHovered ? 'translateY(0)' : 'translateY(-15px)',
          transition: 'transform 0.5s ease',
          transitionDelay: '0.1s',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
        }}>
          {title}
        </h3>
        
        <p style={{
          color: 'white',
          fontSize: '16px',
          lineHeight: '1.5',
          textAlign: 'center',
          transform: isHovered ? 'translateY(0)' : 'translateY(15px)',
          transition: 'transform 0.5s ease',
          transitionDelay: '0.2s',
          textShadow: '1px 1px 3px rgba(0, 0, 0, 0.8)',
        }}>
          {description}
        </p>
        
        {/* Animated arrow */}
        <div 
          aria-hidden="true"
          style={{
            color: '#36b2c8',
            fontSize: '28px',
            fontWeight: '700',
            position: 'absolute',
            bottom: '20px',
            right: '20px',
            transform: isHovered ? 'translateX(0)' : 'translateX(-20px)',
            opacity: isHovered ? 1 : 0,
            transition: 'transform 0.5s ease, opacity 0.5s ease',
            transitionDelay: '0.3s',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
          }}
        >
          ↘
        </div>
      </div>
    </article>
  );
};

// Mobile Service Card Component with enhanced animations
const MobileServiceCard = ({ service, index, isActive, showHover, isVisible }: 
  { service: ServiceItem, index: number, isActive: boolean, showHover: boolean, isVisible: boolean }) => {
  const isHovered = isActive && showHover;
  const router = useRouter();
  const destinationPage = servicePageMap[service.title] as string || "/services";
  
  const handleNavigation = () => {
    router.push(destinationPage);
  };
  
  // Generate structured data for mobile card
  const structuredData = {
    "@type": "Service",
    "name": service.title,
    "description": service.description,
    "provider": {
      "@type": "Organization",
      "name": "Your Company Name"
    },
    "serviceType": "Web Development",
    "url": `https://yourwebsite.com${destinationPage}`
  };
   
  return (
    <article 
      onClick={handleNavigation}
      onMouseEnter={(e) => e.preventDefault()}
      onMouseLeave={(e) => e.preventDefault()}
      onMouseOver={(e) => e.preventDefault()}
      onMouseOut={(e) => e.preventDefault()}
      itemScope
      itemType="https://schema.org/Service"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleNavigation();
        }
      }}
      aria-label={`Learn more about ${service.title}: ${service.description}`}
      style={{
        width: '307px',
        height: '389px',
        background: 'linear-gradient(180deg, rgba(13, 152, 186, 0.3) 0%, rgba(0, 0, 0, 0.3) 100%), #16161E',
        border: '1px solid #0D98BA',
        borderRadius: '10px',
        padding: '30px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'all 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)',
        transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
        opacity: isVisible ? 1 : 0,
        position: 'relative',
        margin: '0 auto',
        boxShadow: isHovered ? '0 15px 30px rgba(13, 152, 186, 0.2)' : 'none',
        WebkitTapHighlightColor: 'transparent',
        WebkitTouchCallout: 'none',
        WebkitUserSelect: 'none',
        touchAction: 'manipulation',
        pointerEvents: 'auto',
      }}
    >
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
      
      {/* Background image with enhanced visibility */}
      <div 
        className="card-background"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: isHovered ? 0.9 : 0,
          transition: 'opacity 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)',
          zIndex: 0,
          transform: 'scale(1)',
          filter: isHovered ? 'brightness(1.1) contrast(1.2) saturate(1.1)' : 'brightness(0.8)',
          borderRadius: '10px',
          overflow: 'hidden',
        }}>
        <Image
          src={service.hoverImage}
          alt={`${service.title} service visualization showing professional web development work`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{
            objectFit: 'cover',
            borderRadius: '10px',
          }}
          priority={index === 0}
          loading={index === 0 ? 'eager' : 'lazy'}
        />
      </div>
      
      {/* Content - hidden on hover */}
      <div 
        className="card-content"
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          opacity: isHovered ? 0 : 1,
          transition: 'opacity 0.4s ease',
        }}>
        <div style={{
          width: '48px',
          height: '48px',
          marginBottom: '20px',
        }}>
          <Image
            src={service.iconSrc}
            alt={`${service.title} icon`}
            width={48}
            height={48}
            style={{
              filter: 'invert(58%) sepia(69%) saturate(456%) hue-rotate(152deg) brightness(87%) contrast(86%)',
            }}
            loading="lazy"
          />
        </div>
        
        <h3 
          itemProp="name"
          style={{
            color: 'white',
            fontSize: '20px',
            fontWeight: '600',
            marginBottom: '15px',
            lineHeight: '1.3',
          }}
        >
          {service.title}
        </h3>
        
        <p 
          itemProp="description"
          style={{
            color: '#9ca3af',
            fontSize: '16px',
            lineHeight: '1.5',
            marginBottom: '20px',
          }}
        >
          {service.description}
        </p>
        
        <div 
          aria-hidden="true"
          style={{
            color: '#36b2c8',
            fontSize: '24px',
            fontWeight: isHovered ? '700' : '400',
            marginTop: 'auto',
            textAlign: 'right',
            transition: 'font-weight 0.3s ease',
          }}
        >
          →
        </div>
      </div>
      
      {/* Enhanced overlay with animation and clearer background */}
      <div 
        className="card-overlay"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '30px',
          boxSizing: 'border-box',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.5s ease',
          zIndex: 2,
        }}>
        <h3 style={{
          color: 'white',
          fontSize: '24px',
          fontWeight: '600',
          marginBottom: '15px',
          textAlign: 'center',
          transform: isHovered ? 'translateY(0)' : 'translateY(-15px)',
          transition: 'transform 0.5s ease',
          opacity: isHovered ? 1 : 0,
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
        }}>
          {service.title}
        </h3>
        
        <p style={{
          color: 'white',
          fontSize: '16px',
          lineHeight: '1.5',
          textAlign: 'center',
          transform: isHovered ? 'translateY(0)' : 'translateY(15px)',
          transition: 'transform 0.5s ease',
          opacity: isHovered ? 1 : 0,
          textShadow: '1px 1px 3px rgba(0, 0, 0, 0.8)',
        }}>
          {service.description}
        </p>
        
        {/* Arrow with position change for hover state */}
        <div 
          aria-hidden="true"
          style={{
            color: '#36b2c8',
            fontSize: '24px',
            fontWeight: '400',
            position: 'absolute',
            bottom: '20px',
            right: '20px',
            transform: isHovered ? 'translate(10px, 10px)' : 'translateX(0)',
            opacity: isHovered ? 1 : 0,
            transition: 'transform 0.5s ease, opacity 0.5s ease',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
          }}
        >
          →
        </div>
      </div>
    </article>
  );
};

// Main Business Services Component
export default function BusinessServices() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [visibleCards, setVisibleCards] = useState(4);
  const [currentMobileIndex, setCurrentMobileIndex] = useState(0);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [showHover, setShowHover] = useState(false);
  const [hoverTimer, setHoverTimer] = useState<NodeJS.Timeout | null>(null);
  const [leftButtonHovered, setLeftButtonHovered] = useState(false);
  const [rightButtonHovered, setRightButtonHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [autoScrollActive, setAutoScrollActive] = useState(true);
  const [autoScrollInterval, setAutoScrollInterval] = useState<NodeJS.Timeout | null>(null);
  const [loading, setLoading] = useState(true);
  const [sectionData, setSectionData] = useState<BusinessSectionData | null>(null);
  const [userInteracted, setUserInteracted] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [userSwipedOnMobile, setUserSwipedOnMobile] = useState(false);
  const [isCardHovered, setIsCardHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  
  // Default services data with SEO-optimized content
  const defaultServices: ServiceItem[] = [
    {
      iconSrc: "/images/Bicon1.png",
      title: "Conversion-Focused Design",
      description: "Custom web design solutions fully optimized to drive more sales and leads with proven UX strategies.",
      hoverImage: "/images/B1.jpg",
    },
    {
      iconSrc: "/images/briefcase.png",
      title: "Industry-Specific Solutions",
      description: "Tailored web development for your industry with B2B, services, and ecommerce best practices.",
      hoverImage: "/images/B2.jpg",
    },
    {
      iconSrc: "/images/monitor.png",
      title: "Responsive Across Devices",
      description: "Mobile-first responsive design that delivers perfect user experience across all devices and screen sizes.",
      hoverImage: "/images/B3.jpg",
    },
    {
      iconSrc: "/images/search.png",
      title: "SEO-First Foundation",
      description: "Built with technical SEO best practices and Core Web Vitals optimization for higher search rankings.",
      hoverImage: "/images/B4.jpg",
    },
    {
      iconSrc: "/images/Bicon1.png",
      title: "Performance Optimization",
      description: "Lightning-fast websites with optimized loading speeds and enhanced user experience metrics.",
      hoverImage: "/images/B5.jpg",
    },
    {
      iconSrc: "/images/briefcase.png",
      title: "Security & Maintenance",
      description: "Enterprise-grade security implementation with ongoing maintenance and monitoring services.",
      hoverImage: "/images/B6.jpg",
    },
    {
      iconSrc: "/images/monitor.png",
      title: "Analytics & Tracking",
      description: "Comprehensive analytics setup and conversion tracking to measure and improve your ROI.",
      hoverImage: "/images/B7.jpg",
    },
  ];
  
  // Detect touch device on mount
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);
  
  // Fetch data from Supabase
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from('homebuisnessservice')
          .select('*')
          .limit(1)
          .single();
        
        if (error) {
          console.error('Error fetching business section data:', error);
        } else if (data) {
          setSectionData(data);
        }
      } catch (error) {
        console.error('Failed to fetch business section data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Generate services data based on fetched data or fallback to defaults
  const services: ServiceItem[] = sectionData ? [
    {
      iconSrc: "/images/Vector.png",
      title: sectionData.card1_title || defaultServices[0].title,
      description: sectionData.card1_description || defaultServices[0].description,
      hoverImage: "/images/4.jpg",
    },
    {
      iconSrc: "/images/briefcase.png",
      title: sectionData.card2_title || defaultServices[1].title,
      description: sectionData.card2_description || defaultServices[1].description,
      hoverImage: "/images/3.jpg",
    },
    {
      iconSrc: "/images/monitor.png",
      title: sectionData.card3_title || defaultServices[2].title,
      description: sectionData.card3_description || defaultServices[2].description,
      hoverImage: "/images/1.jpg",
    },
    {
      iconSrc: "/images/search.png",
      title: sectionData.card4_title || defaultServices[3].title,
      description: sectionData.card4_description || defaultServices[3].description,
      hoverImage: "/images/2.jpg",
    },
    {
      iconSrc: "/images/Vector.png",
      title: sectionData.card5_title || defaultServices[4].title,
      description: sectionData.card5_description || defaultServices[4].description,
      hoverImage: "/images/4.jpg",
    },
    {
      iconSrc: "/images/briefcase.png",
      title: sectionData.card6_title || defaultServices[5].title,
      description: sectionData.card6_description || defaultServices[5].description,
      hoverImage: "/images/3.jpg",
    },
    {
      iconSrc: "/images/monitor.png",
      title: sectionData.card7_title || defaultServices[6].title,
      description: sectionData.card7_description || defaultServices[6].description,
      hoverImage: "/images/1.jpg",
    },
  ] : defaultServices;
  
  const maxScrollIndex = Math.max(0, services.length - visibleCards);
  
  // Set up IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true);
          setTimeout(() => {
            setIsVisible(true);
          }, 300);
        }
      },
      { threshold: 0.2 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  // Calculate container width on mount and resize
  useEffect(() => {
    const updateDimensions = () => {
      const mobile = window.innerWidth < 768;
      const tablet = window.innerWidth >= 768 && window.innerWidth < 1024;
      
      setIsMobile(mobile);
      setIsTablet(tablet);
      
      if (mobile) {
        setVisibleCards(1);
      } else if (tablet) {
        setVisibleCards(2);
      } else {
        setVisibleCards(4);
      }
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);
  
  // Effect to handle hover timer for mobile
  useEffect(() => {
    if (!isMobile) return;
    
    setShowHover(false);
    if (hoverTimer) clearTimeout(hoverTimer);
    
    const timer = setTimeout(() => {
      setShowHover(true);
    }, 2000);
    
    setHoverTimer(timer);
    
    return () => {
      if (hoverTimer) clearTimeout(hoverTimer);
    };
  }, [currentMobileIndex, isMobile]);
  
  // Handle auto-scrolling
  useEffect(() => {
    if (!isVisible || !autoScrollActive) return;
    
    if (isMobile && userSwipedOnMobile) return;
    if (!isMobile && (userInteracted || isCardHovered)) return;
    
    const interval = setInterval(() => {
      if (isMobile) {
        setCurrentMobileIndex((prev) => 
          prev >= services.length - 1 ? 0 : prev + 1
        );
      } else {
        setCurrentCardIndex((prev) => {
          if (prev >= services.length - visibleCards) {
            return 0;
          }
          return prev + 1;
        });
      }
    }, 3000);
    
    setAutoScrollInterval(interval);
    
    return () => {
      if (autoScrollInterval) {
        clearInterval(autoScrollInterval);
      }
    };
  }, [isVisible, autoScrollActive, isMobile, services.length, visibleCards, userInteracted, userSwipedOnMobile, isCardHovered]);
  
  // Handle scroll to card index
  useEffect(() => {
    if (carouselRef.current) {
      if (isMobile) {
        const cardWidth = 307 + 15;
        const scrollPosition = currentMobileIndex * cardWidth;
        
        carouselRef.current.scrollTo({
          left: scrollPosition,
          behavior: 'smooth'
        });
      } else {
        const cardWidth = 307 + 20;
        const scrollPosition = currentCardIndex * cardWidth;
        
        carouselRef.current.scrollTo({
          left: scrollPosition,
          behavior: 'smooth'
        });
      }
    }
  }, [currentCardIndex, currentMobileIndex, isMobile]);
  
  // Handle card hover callback
  const handleCardHover = (isHovering: boolean) => {
    setIsCardHovered(isHovering);
    
    if (isHovering && autoScrollInterval) {
      clearInterval(autoScrollInterval);
      setAutoScrollInterval(null);
    }
    
    if (!isHovering && autoScrollActive && !userInteracted && !isMobile) {
      setTimeout(() => {
        if (!isCardHovered && autoScrollActive && !userInteracted) {
          setAutoScrollActive(true);
        }
      }, 100);
    }
  };
  
  // Handle user interaction
  const handleUserInteraction = () => {
    if (!isMobile) {
      setUserInteracted(true);
      if (autoScrollInterval) {
        clearInterval(autoScrollInterval);
        setAutoScrollActive(false);
      }
    }
  };
  
  // Handle mobile swipe interaction
  const handleMobileSwipeInteraction = () => {
    if (isMobile) {
      setUserSwipedOnMobile(true);
      if (autoScrollInterval) {
        clearInterval(autoScrollInterval);
        setAutoScrollActive(false);
      }
    }
  };
  
  // Scroll controls
  const scrollLeft = () => {
    if (isMobile) {
      setCurrentMobileIndex((prev) => 
        prev <= 0 ? services.length - 1 : prev - 1
      );
    } else {
      handleUserInteraction();
      setCurrentCardIndex((prev) => 
        prev <= 0 ? maxScrollIndex : prev - 1
      );
    }
  };
  
  const scrollRight = () => {
    if (isMobile) {
      setCurrentMobileIndex((prev) => 
        prev >= services.length - 1 ? 0 : prev + 1
      );
    } else {
      handleUserInteraction();
      setCurrentCardIndex((prev) => 
        prev >= maxScrollIndex ? 0 : prev + 1
      );
    }
  };
  
  // Touch handlers for swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (Math.abs(touchStart - touchEnd) > 75) {
      handleMobileSwipeInteraction();
      
      if (touchStart - touchEnd > 75) {
        setCurrentMobileIndex((prev) => 
          prev >= services.length - 1 ? 0 : prev + 1
        );
      }
      
      if (touchStart - touchEnd < -75) {
        setCurrentMobileIndex((prev) => 
          prev <= 0 ? services.length - 1 : prev - 1
        );
      }
    }
  };
  
  // Get section title and description
  const sectionTitle = sectionData?.section_title || "Your <span style={{ color: '#36b2c8' }}>Business</span> Is Unique";
  const sectionDescription = sectionData?.section_description || "That's Why We Provide Custom Solutions Tailored To Your Needs";

  // Generate main section structured data
  const sectionStructuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Web Development Services",
    "description": "Professional web development services including custom design, SEO optimization, and responsive development",
    "numberOfItems": services.length,
    "itemListElement": services.map((service, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Service",
        "name": service.title,
        "description": service.description,
        "provider": {
          "@type": "Organization",
          "name": "Your Company Name"
        },
        "serviceType": "Web Development"
      }
    }))
  };

  return (
    <section 
      style={{
        backgroundColor: '#0b1a27',
        padding: '80px 0',
        width: '100%',
        fontFamily: 'Arial, sans-serif',
        overflow: 'hidden',
        position: 'relative',
      }} 
      ref={sectionRef}
      aria-labelledby="business-services-heading"
      itemScope
      itemType="https://schema.org/ItemList"
    >
      {/* Main Section Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(sectionStructuredData)
        }}
      />
      
      {/* SEO-optimized CSS with performance improvements */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes fadeInOut {
            0% { opacity: 0.7; }
            50% { opacity: 1; }
            100% { opacity: 0.7; }
          }
          
          .carousel-container::-webkit-scrollbar {
            display: none;
          }
          
          /* Performance optimizations */
          .carousel-container {
            will-change: scroll-position;
            transform: translateZ(0);
          }
          
          /* iOS-specific fixes for hover states */
          @media (hover: none) and (pointer: coarse) {
            .nav-button {
              background: linear-gradient(180deg, rgba(13, 152, 186, 0.3) 0%, rgba(0, 0, 0, 0.3) 100%), #16161E !important;
              transform: scale(1) !important;
            }
            .nav-button:active {
              background: linear-gradient(180deg, rgba(13, 152, 186, 0.7) 0%, rgba(0, 0, 0, 0.7) 100%), #16161E !important;
              transform: scale(0.95) !important;
            }
            
            .mobile-service-card:hover,
            .mobile-service-card:focus,
            .mobile-service-card:active {
              pointer-events: none;
            }
            
            .mobile-service-card {
              pointer-events: auto !important;
              -webkit-tap-highlight-color: transparent !important;
              -webkit-touch-callout: none !important;
              -webkit-user-select: none !important;
              touch-action: manipulation !important;
            }
          }
          
          /* Accessibility improvements */
          @media (prefers-reduced-motion: reduce) {
            * {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
            }
          }
          
          /* Focus styles for accessibility */
          .nav-button:focus,
          article:focus {
            outline: 2px solid #36b2c8;
            outline-offset: 2px;
          }
        `
      }} />
      
      <div style={{
        maxWidth: '1440px',
        margin: '0 auto',
        padding: '0 20px',
        position: 'relative',
      }}>
        <header style={{
          position: 'relative',
          marginBottom: '50px',
          opacity: headerVisible ? 1 : 0,
          transform: headerVisible ? 'translateY(0)' : 'translateY(-30px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease',
        }}>
          <h2 
            id="business-services-heading"
            itemProp="name"
            style={{
              color: 'white',
              fontSize: isMobile ? '28px' : '42px',
              fontWeight: '700',
              lineHeight: '1.2',
              marginBottom: '16px',
            }} 
            dangerouslySetInnerHTML={{ __html: sectionTitle }} 
          />
          <p 
            itemProp="description"
            style={{
              color: '#d1d5db',
              fontSize: isMobile ? '16px' : '18px',
              lineHeight: '1.6',
            }}
          >
            {sectionDescription}
          </p>
        </header>
        
        <div style={{
          position: 'relative',
          width: '100%',
          overflow: 'hidden',
        }}>
          {/* Scroll hint with better accessibility */}
          <div 
            aria-live="polite"
            aria-label="Scroll indicator"
            style={{
              position: 'absolute',
              bottom: isMobile ? '-25px' : '10px',
              right: '20px',
              color: '#36b2c8',
              fontSize: '14px',
              fontStyle: 'italic',
              opacity: 0.9,
              zIndex: 5,
              animation: 'fadeInOut 2s infinite',
            }}
          >
            Scroll to see more →
          </div>

          {/* Navigation buttons for desktop and tablet */}
          {!isMobile && (
            <nav 
              aria-label="Service navigation"
              style={{
                position: 'absolute',
                top: '-70px',
                right: '20px',
                display: 'flex',
                zIndex: 20,
                justifyContent: 'flex-end',
                gap: '15px',
              }}
            >
              <button 
                className="nav-button"
                onClick={scrollLeft} 
                aria-label="View previous services"
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  color: 'white',
                  fontSize: '24px',
                  fontWeight: '700',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                  transition: 'all 0.3s ease',
                  background: leftButtonHovered && !isTouchDevice
                    ? 'linear-gradient(180deg, rgba(13, 152, 186, 0.8) 0%, rgba(0, 0, 0, 0.8) 100%), #16161E'
                    : 'linear-gradient(180deg, rgba(13, 152, 186, 0.5) 0%, rgba(0, 0, 0, 0.5) 100%), #16161E',
                  transform: leftButtonHovered && !isTouchDevice
                    ? 'scale(1.1)' 
                    : 'scale(1)',
                }}
                onMouseEnter={() => !isTouchDevice && setLeftButtonHovered(true)}
                onMouseLeave={() => !isTouchDevice && setLeftButtonHovered(false)}
                onTouchStart={() => setLeftButtonHovered(true)}
                onTouchEnd={() => setLeftButtonHovered(false)}
              >
                &lt;
              </button>
              
              <button 
                className="nav-button"
                onClick={scrollRight} 
                aria-label="View next services"
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  color: 'white',
                  fontSize: '24px',
                  fontWeight: '700',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                  transition: 'all 0.3s ease',
                  background: rightButtonHovered && !isTouchDevice
                    ? 'linear-gradient(180deg, rgba(13, 152, 186, 0.8) 0%, rgba(0, 0, 0, 0.8) 100%), #16161E'
                    : 'linear-gradient(180deg, rgba(13, 152, 186, 0.5) 0%, rgba(0, 0, 0, 0.5) 100%), #16161E',
                  transform: rightButtonHovered && !isTouchDevice
                    ? 'scale(1.1)' 
                    : 'scale(1)',
                }}
                onMouseEnter={() => !isTouchDevice && setRightButtonHovered(true)}
                onMouseLeave={() => !isTouchDevice && setRightButtonHovered(false)}
                onTouchStart={() => setRightButtonHovered(true)}
                onTouchEnd={() => setRightButtonHovered(false)}
              >
                &gt;
              </button>
            </nav>
          )}
          
          {/* Card carousel with responsive grid */}
          <div 
            ref={carouselRef}
            className="carousel-container"
            role="region"
            aria-label="Services carousel"
            style={{
              display: 'flex',
              overflowX: 'auto',
              scrollBehavior: 'smooth',
              padding: '10px 0 25px 0',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {isMobile ? (
              <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                width: 'max-content',
                gap: '15px',
              }}>
                {services.map((service, index) => (
                  <div 
                    key={`mobile-service-${index}`}
                    className="mobile-service-card"
                    style={{
                      flex: '0 0 auto',
                      width: '307px',
                    }}
                  >
                    <MobileServiceCard 
                      service={service}
                      index={index}
                      isActive={index === currentMobileIndex}
                      showHover={showHover}
                      isVisible={isVisible}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div style={{
                display: 'flex',
                justifyContent: 'flex-start',
                gap: '20px',
                width: 'max-content',
                padding: '0 10px',
              }}>
                {services.map((service, index) => (
                  <ServiceCard 
                    key={`desktop-service-${index}`}
                    {...service}
                    animationDelay={index % visibleCards * 150}
                    isVisible={isVisible}
                    onHover={handleCardHover}
                  />
                ))}
              </div>
            )}
          </div>
          
          {/* Mobile navigation elements */}
          {isMobile && (
            <nav 
              aria-label="Mobile service navigation"
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '30px',
              }}
            >
              <button 
                className="nav-button"
                onClick={scrollLeft} 
                aria-label="View previous service"
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  color: 'white',
                  fontSize: '24px',
                  fontWeight: '700',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: 'none',
                  cursor: 'pointer',
                  zIndex: 10,
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                  margin: '0 8px',
                  transition: 'all 0.3s ease',
                  background: 'linear-gradient(180deg, rgba(13, 152, 186, 0.3) 0%, rgba(0, 0, 0, 0.3) 100%), #16161E',
                  transform: 'scale(1)',
                }}
                onTouchStart={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(180deg, rgba(13, 152, 186, 0.7) 0%, rgba(0, 0, 0, 0.7) 100%), #16161E';
                  e.currentTarget.style.transform = 'scale(0.95)';
                }}
                onTouchEnd={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(180deg, rgba(13, 152, 186, 0.3) 0%, rgba(0, 0, 0, 0.3) 100%), #16161E';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                &lt;
              </button>
              
              <button 
                className="nav-button"
                onClick={scrollRight} 
                aria-label="View next service"
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  color: 'white',
                  fontSize: '24px',
                  fontWeight: '700',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: 'none',
                  cursor: 'pointer',
                  zIndex: 10,
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                  margin: '0 8px',
                  transition: 'all 0.3s ease',
                  background: 'linear-gradient(180deg, rgba(13, 152, 186, 0.3) 0%, rgba(0, 0, 0, 0.3) 100%), #16161E',
                  transform: 'scale(1)',
                }}
                onTouchStart={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(180deg, rgba(13, 152, 186, 0.7) 0%, rgba(0, 0, 0, 0.7) 100%), #16161E';
                  e.currentTarget.style.transform = 'scale(0.95)';
                }}
                onTouchEnd={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(180deg, rgba(13, 152, 186, 0.3) 0%, rgba(0, 0, 0, 0.3) 100%), #16161E';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                &gt;
              </button>
            </nav>
          )}
        </div>
      </div>
    </section>
  );
}