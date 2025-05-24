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
};

// TypeScript interfaces
interface ServiceCardProps {
  iconSrc: string;
  title: string;
  description: string;
  hoverImage: string;
  animationDelay: number;
  isVisible: boolean;
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
const ServiceCard = ({ iconSrc, title, description, hoverImage, animationDelay, isVisible }: ServiceCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();
  const destinationPage = servicePageMap[title] || "/services";
  
  const handleNavigation = () => {
    router.push(destinationPage);
  };
  
  return (
    <div 
      onClick={handleNavigation}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
      {/* Background image with enhanced transition */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: isHovered ? 0.8 : 0,
        transition: 'opacity 0.6s cubic-bezier(0.25, 0.1, 0.25, 1), transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)',
        zIndex: 0,
        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
        filter: 'brightness(0.8)',
      }}>
        <Image
          src={hoverImage}
          alt={`${title} background`}
          layout="fill"
          objectFit="cover"
          priority
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
          />
        </div>
        
        <h3 style={{
          color: 'white',
          fontSize: '20px',
          fontWeight: '600',
          marginBottom: '15px',
        }}>
          {title}
        </h3>
        
        <p style={{
          color: '#9ca3af',
          fontSize: '16px',
          lineHeight: '1.5',
          marginBottom: '20px',
        }}>
          {description}
        </p>
        
        <div style={{
          color: '#36b2c8',
          fontSize: '24px',
          fontWeight: isHovered ? '700' : '400',
          marginTop: 'auto',
          textAlign: 'right',
          transition: 'all 0.3s ease',
        }}>
          →
        </div>
      </div>
      
      {/* Enhanced overlay with animation */}
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
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
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
        }}>
          {description}
        </p>
        
        {/* Animated arrow */}
        <div style={{
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
        }}>
          ↘
        </div>
      </div>
    </div>
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
   
  return (
    <div 
      onClick={handleNavigation}
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
      }}
    >
      {/* Background image */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: isHovered ? 0.8 : 0,
        transition: 'opacity 0.6s cubic-bezier(0.25, 0.1, 0.25, 1), transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)',
        zIndex: 0,
        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
        filter: 'brightness(0.8)',
      }}>
        <Image
          src={service.hoverImage}
          alt={`${service.title} background`}
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>
      
      {/* Content - hidden on hover */}
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
        }}>
          <Image
            src={service.iconSrc}
            alt={`${service.title} icon`}
            width={48}
            height={48}
            style={{
              filter: 'invert(58%) sepia(69%) saturate(456%) hue-rotate(152deg) brightness(87%) contrast(86%)',
            }}
          />
        </div>
        
        <h3 style={{
          color: 'white',
          fontSize: '20px',
          fontWeight: '600',
          marginBottom: '15px',
        }}>
          {service.title}
        </h3>
        
        <p style={{
          color: '#9ca3af',
          fontSize: '16px',
          lineHeight: '1.5',
          marginBottom: '20px',
        }}>
          {service.description}
        </p>
        
        <div style={{
          color: '#36b2c8',
          fontSize: '24px',
          fontWeight: isHovered ? '700' : '400',
          marginTop: 'auto',
          textAlign: 'right',
          transition: 'font-weight 0.3s ease',
        }}>
          →
        </div>
      </div>
      
      {/* Enhanced overlay with animation */}
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
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
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
        }}>
          {service.description}
        </p>
        
        {/* Animated arrow */}
        <div style={{
          color: '#36b2c8',
          fontSize: '28px',
          fontWeight: '700',
          position: 'absolute',
          bottom: '20px',
          right: '20px',
          transform: isHovered ? 'translateX(0)' : 'translateX(-20px)',
          opacity: isHovered ? 1 : 0,
          transition: 'transform 0.5s ease, opacity 0.5s ease',
        }}>
          ↘
        </div>
      </div>
    </div>
  );
};

// Main Business Services Component
export default function BusinessServices() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [visibleCards, setVisibleCards] = useState(4); // Default to 4 cards for desktop
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
  
  // Default services data
  const defaultServices: ServiceItem[] = [
    {
      iconSrc: "/images/Vector.png",
      title: "Web App Design",
      description: "Custom web app design tailored for seamless user experience with responsive interfaces.",
      hoverImage: "/images/50.jpg",
    },
    {
      iconSrc: "/images/briefcase.png",
      title: "Mobile App Design",
      description: "Intuitive mobile app designs that engage users effectively across iOS and Android platforms.",
      hoverImage: "/images/51.jpg",
    },
    {
      iconSrc: "/images/monitor.png",
      title: "Website App Design",
      description: "Modern website app interfaces built for performance and clarity with a focus on user-centered design.",
      hoverImage: "/images/1.jpg",
    },
    {
      iconSrc: "/images/search.png",
      title: "Website Redesign",
      description: "Refresh your online presence with a modern, responsive redesign that improves conversions.",
      hoverImage: "/images/2.jpg",
    },
    {
      iconSrc: "/images/Vector.png",
      title: "Web Development Ecommerce",
      description: "Build powerful ecommerce platforms that convert visitors into buyers with secure payment.",
      hoverImage: "/images/4.jpg",
    },
    {
      iconSrc: "/images/briefcase.png",
      title: "Web Development Shopify",
      description: "Professional Shopify stores developed for scalability and growth with customized themes.",
      hoverImage: "/images/3.jpg",
    },
    {
      iconSrc: "/images/monitor.png",
      title: "Website Development Custom",
      description: "Fully custom websites crafted to meet unique business requirements and optimize for your goals.",
      hoverImage: "/images/1.jpg",
    },
  ];
  
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
  
  // Calculate max scroll position based on total cards
  const maxScrollIndex = Math.max(0, services.length - visibleCards);
  
  // Set up IntersectionObserver to detect when section is in view
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
      // Check device type based on screen width
      const mobile = window.innerWidth < 768;
      const tablet = window.innerWidth >= 768 && window.innerWidth < 1024;
      
      setIsMobile(mobile);
      setIsTablet(tablet);
      
      // Set number of visible cards based on screen width while maintaining consistent spacing
      if (mobile) {
        setVisibleCards(1); // 1 card for mobile
      } else if (tablet) {
        setVisibleCards(2); // 2 cards for tablet
      } else {
        setVisibleCards(4); // 4 cards for desktop - showing 4 at a time
      }
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);
  
  // Effect to handle hover timer for mobile
  useEffect(() => {
    if (!isMobile) return;
    
    // Clear existing hover and timer
    setShowHover(false);
    if (hoverTimer) clearTimeout(hoverTimer);
    
    // Start a new timer
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
    if (!isVisible || !autoScrollActive || userInteracted) return;
    
    const interval = setInterval(() => {
      if (isMobile) {
        setCurrentMobileIndex((prev) => 
          prev >= services.length - 1 ? 0 : prev + 1
        );
      } else {
        // Increment card index with smooth scrolling
        setCurrentCardIndex((prev) => {
          // If we're at the end, go back to the beginning
          if (prev >= services.length - visibleCards) {
            return 0;
          }
          // Otherwise, move forward by 1
          return prev + 1;
        });
      }
    }, 3000); // Faster scroll for better user experience
    
    setAutoScrollInterval(interval);
    
    return () => {
      if (autoScrollInterval) {
        clearInterval(autoScrollInterval);
      }
    };
  }, [isVisible, autoScrollActive, isMobile, services.length, visibleCards, userInteracted]);
  
  // Handle scroll to card index
  useEffect(() => {
    if (carouselRef.current) {
      if (isMobile) {
        // For mobile: scroll to the current card with consistent spacing
        const cardWidth = 307 + 15; // Card width + smaller gap for mobile
        const scrollPosition = currentMobileIndex * cardWidth;
        
        carouselRef.current.scrollTo({
          left: scrollPosition,
          behavior: 'smooth'
        });
      } else {
        // For desktop/tablet: scroll by individual cards with consistent spacing
        const cardWidth = 307 + 20; // Card width + gap (consistent across desktop/tablet)
        const scrollPosition = currentCardIndex * cardWidth;
        
        carouselRef.current.scrollTo({
          left: scrollPosition,
          behavior: 'smooth'
        });
      }
    }
  }, [currentCardIndex, currentMobileIndex, isMobile]);
  
  // Handle user interaction
  const handleUserInteraction = () => {
    setUserInteracted(true);
    if (autoScrollInterval) {
      clearInterval(autoScrollInterval);
      setAutoScrollActive(false);
    }
  };
  
  // Scroll controls
  const scrollLeft = () => {
    handleUserInteraction();
    
    if (isMobile) {
      setCurrentMobileIndex((prev) => 
        prev <= 0 ? services.length - 1 : prev - 1
      );
    } else {
      setCurrentCardIndex((prev) => 
        prev <= 0 ? maxScrollIndex : prev - 1
      );
    }
  };
  
  const scrollRight = () => {
    handleUserInteraction();
    
    if (isMobile) {
      setCurrentMobileIndex((prev) => 
        prev >= services.length - 1 ? 0 : prev + 1
      );
    } else {
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
    if (touchStart - touchEnd > 75) {
      // Swipe left
      scrollRight();
    }
    
    if (touchStart - touchEnd < -75) {
      // Swipe right
      scrollLeft();
    }
  };
  
  // Get section title and description from data or use defaults
  const sectionTitle = sectionData?.section_title || "Your <span style={{ color: '#36b2c8' }}>Business</span> Is Unique";
  const sectionDescription = sectionData?.section_description || "That's Why We Provide Custom Solutions Tailored To Your Needs";

  return (
    <div 
      style={{
        backgroundColor: '#0b1a27',
        padding: '80px 0',
        width: '100%',
        fontFamily: 'Arial, sans-serif',
        overflow: 'hidden',
        position: 'relative',
      }} 
      ref={sectionRef}
    >
      {/* Add keyframes for fadeInOut animation and scrollbar hiding */}
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
        `
      }} />
      
      <div style={{
        maxWidth: '1440px',
        margin: '0 auto',
        padding: '0 20px',
        position: 'relative',
      }}>
        <div style={{
          position: 'relative',
          marginBottom: '50px',
          opacity: headerVisible ? 1 : 0,
          transform: headerVisible ? 'translateY(0)' : 'translateY(-30px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease',
        }}>
          <h2 
            style={{
              color: 'white',
              fontSize: isMobile ? '28px' : '42px',
              fontWeight: '700',
              lineHeight: '1.2',
              marginBottom: '16px',
            }} 
            dangerouslySetInnerHTML={{ __html: sectionTitle }} 
          />
          <p style={{
            color: '#d1d5db',
            fontSize: isMobile ? '16px' : '18px',
          }}>
            {sectionDescription}
          </p>
        </div>
        
        <div style={{
          position: 'relative',
          width: '100%',
          overflow: 'hidden',
        }}>
          {/* Scroll hint text for all screen sizes */}
          <div style={{
            position: 'absolute',
            bottom: isMobile ? '-25px' : '10px',
            right: '20px',
            color: '#36b2c8',
            fontSize: '14px',
            fontStyle: 'italic',
            opacity: 0.9,
            zIndex: 5,
            animation: 'fadeInOut 2s infinite',
          }}>
            Scroll to see more →
          </div>

          {/* Navigation buttons - for desktop and tablet */}
          {!isMobile && (
            <div style={{
              position: 'absolute',
              top: '-70px',
              right: '20px',
              display: 'flex',
              zIndex: 20,
              justifyContent: 'flex-end',
              gap: '15px',
            }}>
              <button 
                onClick={scrollLeft} 
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
                  background: leftButtonHovered
                    ? 'linear-gradient(180deg, rgba(13, 152, 186, 0.8) 0%, rgba(0, 0, 0, 0.8) 100%), #16161E'
                    : 'linear-gradient(180deg, rgba(13, 152, 186, 0.5) 0%, rgba(0, 0, 0, 0.5) 100%), #16161E',
                  transform: leftButtonHovered 
                    ? 'scale(1.1)' 
                    : 'scale(1)',
                }}
                aria-label="Previous services"
                onMouseEnter={() => setLeftButtonHovered(true)}
                onMouseLeave={() => setLeftButtonHovered(false)}
              >
                &lt;
              </button>
              
              <button 
                onClick={scrollRight} 
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
                  background: rightButtonHovered
                    ? 'linear-gradient(180deg, rgba(13, 152, 186, 0.8) 0%, rgba(0, 0, 0, 0.8) 100%), #16161E'
                    : 'linear-gradient(180deg, rgba(13, 152, 186, 0.5) 0%, rgba(0, 0, 0, 0.5) 100%), #16161E',
                  transform: rightButtonHovered 
                    ? 'scale(1.1)' 
                    : 'scale(1)',
                }}
                aria-label="Next services"
                onMouseEnter={() => setRightButtonHovered(true)}
                onMouseLeave={() => setRightButtonHovered(false)}
              >
                &gt;
              </button>
            </div>
          )}
          
          {/* Card carousel with responsive grid */}
          <div 
            ref={carouselRef}
            className="carousel-container"
            style={{
              display: 'flex',
              overflowX: 'auto',
              scrollBehavior: 'smooth',
              padding: '10px 0 25px 0', // Added bottom padding for scroll hint
              scrollbarWidth: 'none', /* Firefox */
              msOverflowStyle: 'none', /* IE and Edge */
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
                      {isMobile ? (
              // Mobile view - single card with proper spacing (no large gaps)
              <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                width: 'max-content',
                gap: '15px', // Reduced gap for mobile
              }}>
                {services.map((service, index) => (
                  <div 
                    key={index}
                    style={{
                      flex: '0 0 auto',
                      width: '307px', // Fixed width to match design
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
              // Desktop/Tablet view - horizontal scrolling single row with consistent spacing
              <div style={{
                display: 'flex',
                justifyContent: 'flex-start',
                gap: '20px', // Consistent gap spacing
                width: 'max-content',
                padding: '0 10px',
              }}>
                {services.map((service, index) => (
                  <ServiceCard 
                    key={index}
                    {...service}
                    animationDelay={index % visibleCards * 150}
                    isVisible={isVisible}
                  />
                ))}
              </div>
            )}
          </div>
          
          {/* Mobile navigation elements - REMOVED */}
          {isMobile && (
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '30px',
            }}>
              <button 
                onClick={scrollLeft} 
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
                  background: leftButtonHovered
                    ? 'linear-gradient(180deg, rgba(13, 152, 186, 0.7) 0%, rgba(0, 0, 0, 0.7) 100%), #16161E'
                    : 'linear-gradient(180deg, rgba(13, 152, 186, 0.3) 0%, rgba(0, 0, 0, 0.3) 100%), #16161E',
                }}
                aria-label="Previous services"
                onMouseEnter={() => setLeftButtonHovered(true)}
                onMouseLeave={() => setLeftButtonHovered(false)}
              >
                &lt;
              </button>
              
              <button 
                onClick={scrollRight} 
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
                  background: rightButtonHovered
                    ? 'linear-gradient(180deg, rgba(13, 152, 186, 0.7) 0%, rgba(0, 0, 0, 0.7) 100%), #16161E'
                    : 'linear-gradient(180deg, rgba(13, 152, 186, 0.3) 0%, rgba(0, 0, 0, 0.3) 100%), #16161E',
                }}
                aria-label="Next services"
                onMouseEnter={() => setRightButtonHovered(true)}
                onMouseLeave={() => setRightButtonHovered(false)}
              >
                &gt;
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}