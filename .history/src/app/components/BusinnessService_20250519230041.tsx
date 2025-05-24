'use client';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { supabase } from './supabaseClient'; 

// Updated service page map to match service titles in the services array
const servicePageMap = {
  "Web App Design": "/web-app-design",
  "Mobile App Design": "/mobile-app-design",
  "Website App Design": "/website-app-design",
  "Website Redesign": "/website-redesign",
  "Web Development Ecommerce": "/ecommerce-development",
  "Web Development Shopify": "/shopify-development",
  "Website Development Custom": "/custom-development",
  // Add more mappings for other services as needed
};

// Define TypeScript interfaces for props
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

// Interface for the database content
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

// Service Card Component with enhanced animations
const ServiceCard = ({ iconSrc, title, description, hoverImage, animationDelay, isVisible }: ServiceCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
 
  const router = useRouter();
  // Fixed: Changed servicetitle to title
  const destinationPage = servicePageMap[title] || "/services";
  
  // Handle navigation with animation
  const handleNavigation = () => {
    setIsAnimating(true);
    setTimeout(() => {
      router.push(destinationPage);
    }, 400); // Delay navigation to allow animation to complete
  };

  // Animation for the card when it comes into view
  useEffect(() => {
    if (isVisible && cardRef.current) {
      cardRef.current.style.opacity = '1';
      cardRef.current.style.transform = 'translateY(0) rotate(0deg)';
    }
  }, [isVisible]);
  
  return (
    <div 
      ref={cardRef}
      onClick={handleNavigation}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        flex: '0 0 calc(25% - 24px)',
        height: '389px',
        background: 'linear-gradient(180deg, rgba(13, 152, 186, 0.3) 0%, rgba(0, 0, 0, 0.3) 100%), #16161E',
        border: '1px solid #0D98BA',
        borderRadius: '10px',
        padding: '30px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 1s ease, box-shadow 0.3s ease',
        transform: isVisible ? 'translateY(0) rotate(0deg)' : 'translateY(80px) rotate(-3deg)',
        opacity: isVisible ? 1 : 0,
        cursor: 'pointer',
        marginRight: '24px',
        position: 'relative',
        transitionDelay: `${animationDelay}ms`,
        boxShadow: isHovered ? '0 10px 25px rgba(13, 152, 186, 0.3)' : '0 4px 10px rgba(0, 0, 0, 0.3)',
        animation: isAnimating ? 'cardClickAnimation 0.4s forwards' : 'none',
      }}
    >
      {/* Background image with parallax effect */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: isHovered ? 1 : 0,
        transition: 'opacity 0.5s ease, transform 0.5s ease',
        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
        zIndex: 0,
      }}>
        <Image
          src={hoverImage}
          alt={`${title} background`}
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>
      
      {/* Content with icon, title, description (hidden on hover) */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        opacity: isHovered ? 0 : 1,
        transition: 'opacity 0.4s ease, transform 0.3s ease',
        transform: isHovered ? 'translateY(-10px)' : 'translateY(0)',
      }}>
        <div style={{
          width: '48px',
          height: '48px',
          marginBottom: '20px',
          transition: 'transform 0.3s ease',
          transform: isVisible ? 'scale(1)' : 'scale(0)',
          transitionDelay: `${animationDelay + 300}ms`,
        }}>
          <Image
            src={iconSrc}
            alt={`${title} icon`}
            width={48}
            height={48}
            style={{
              filter: 'invert(58%) sepia(69%) saturate(456%) hue-rotate(152deg) brightness(87%) contrast(86%)',
              transition: 'transform 0.3s ease',
              transform: isHovered ? 'rotate(10deg)' : 'rotate(0)',
            }}
          />
        </div>
        
        <h3 style={{
          color: 'white',
          fontSize: '20px',
          fontWeight: '600',
          marginBottom: '15px',
          transition: 'transform 0.4s ease',
          transform: isVisible ? 'translateX(0)' : 'translateX(-20px)',
          transitionDelay: `${animationDelay + 200}ms`,
        }}>
          {title}
        </h3>
        
        <p style={{
          color: '#9ca3af',
          fontSize: '16px',
          lineHeight: '1.5',
          marginBottom: '20px',
          transition: 'transform 0.4s ease, opacity 0.4s ease',
          transform: isVisible ? 'translateX(0)' : 'translateX(-20px)',
          opacity: isVisible ? 1 : 0,
          transitionDelay: `${animationDelay + 300}ms`,
        }}>
          {description}
        </p>
        
        <div style={{
          color: '#36b2c8',
          fontSize: '24px',
          fontWeight: isHovered ? '700' : '400',
          marginTop: 'auto',
          textAlign: 'right',
          transition: 'transform 0.3s ease, font-weight 0.3s ease',
          transform: isHovered ? 'translateX(5px)' : 'translateX(0)',
        }}>
          →
        </div>
      </div>
      
      {/* Overlay that fades in with scale animation */}
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
        transition: 'opacity 0.4s ease, transform 0.4s ease',
        transform: isHovered ? 'scale(1)' : 'scale(0.9)',
        zIndex: 2,
      }}>
        <h3 style={{
          color: 'white',
          fontSize: '24px',
          fontWeight: '600',
          marginBottom: '15px',
          textAlign: 'center',
          transition: 'transform 0.3s ease',
          transform: isHovered ? 'translateY(0)' : 'translateY(20px)',
        }}>
          {title}
        </h3>
        
        <p style={{
          color: 'white',
          fontSize: '16px',
          lineHeight: '1.5',
          textAlign: 'center',
          transition: 'transform 0.3s ease, opacity 0.3s ease',
          transform: isHovered ? 'translateY(0)' : 'translateY(20px)',
          opacity: isHovered ? 1 : 0,
          transitionDelay: '0.1s',
        }}>
          {description}
        </p>
        
        {/* Arrow positioned in the bottom right corner with animation */}
        <div style={{
          color: '#36b2c8',
          fontSize: '24px',
          fontWeight: '700',
          position: 'absolute',
          bottom: '20px',
          right: '20px',
          transition: 'transform 0.3s ease',
          transform: isHovered ? 'translate(0, 0)' : 'translate(-10px, -10px)',
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
  const [isAnimating, setIsAnimating] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const destinationPage = servicePageMap[service.title] || "/services";
  const router = useRouter();
  
  // Handle navigation with animation
  const handleNavigation = () => {
    setIsAnimating(true);
    setTimeout(() => {
      router.push(destinationPage);
    }, 400);
  };

  // Animation for mobile card
  useEffect(() => {
    if (isVisible && cardRef.current) {
      cardRef.current.style.opacity = '1';
      cardRef.current.style.transform = 'translateY(0) scale(1)';
    }
  }, [isVisible]);
   
  return (
    <div 
      ref={cardRef}
      onClick={handleNavigation}
      style={{
        flex: '0 0 100%',
        height: '389px',
        background: 'linear-gradient(180deg, rgba(13, 152, 186, 0.3) 0%, rgba(0, 0, 0, 0.3) 100%), #16161E',
        border: '1px solid #0D98BA',
        borderRadius: '10px',
        padding: '30px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 1s ease, box-shadow 0.3s ease',
        transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(50px) scale(0.95)',
        opacity: isVisible ? 1 : 0,
        position: 'relative',
        width: '100%',
        marginRight: '20px',
        boxShadow: isActive ? '0 10px 25px rgba(13, 152, 186, 0.3)' : '0 4px 10px rgba(0, 0, 0, 0.3)',
        animation: isAnimating ? 'cardClickAnimation 0.4s forwards' : 'none',
      }}
    >
      {/* Background image with parallax effect */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: isHovered ? 1 : 0,
        transition: 'opacity 0.5s ease, transform 0.5s ease',
        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
        zIndex: 0,
      }}>
        <Image
          src={service.hoverImage}
          alt={`${service.title} background`}
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>
      
      {/* Content - hidden on hover with slide animation */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        opacity: isHovered ? 0 : 1,
        transition: 'opacity 0.4s ease, transform 0.3s ease',
        transform: isHovered ? 'translateY(-10px)' : 'translateY(0)',
      }}>
        <div style={{
          width: '48px',
          height: '48px',
          marginBottom: '20px',
          transition: 'transform 0.5s ease',
          transform: isActive ? 'scale(1.1)' : 'scale(1)',
        }}>
          <Image
            src={service.iconSrc}
            alt={`${service.title} icon`}
            width={48}
            height={48}
            style={{
              filter: 'invert(58%) sepia(69%) saturate(456%) hue-rotate(152deg) brightness(87%) contrast(86%)',
              transition: 'transform 0.3s ease',
              transform: isHovered ? 'rotate(10deg)' : 'rotate(0)',
            }}
          />
        </div>
        
        <h3 style={{
          color: 'white',
          fontSize: '20px',
          fontWeight: '600',
          marginBottom: '15px',
          transition: 'transform 0.3s ease',
          transform: isActive ? 'translateX(0)' : 'translateX(0)',
        }}>
          {service.title}
        </h3>
        
        <p style={{
          color: '#9ca3af',
          fontSize: '16px',
          lineHeight: '1.5',
          marginBottom: '20px',
          transition: 'transform 0.3s ease, opacity 0.3s ease',
        }}>
          {service.description}
        </p>
        
        <div style={{
          color: '#36b2c8',
          fontSize: '24px',
          fontWeight: isHovered ? '700' : '400',
          marginTop: 'auto',
          textAlign: 'right',
          transition: 'transform 0.3s ease, font-weight 0.3s ease',
          transform: isHovered ? 'translateX(5px)' : 'translateX(0)',
        }}>
          →
        </div>
      </div>
      
      {/* Overlay with fade and scale effect */}
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
        transition: 'opacity 0.4s ease, transform 0.4s ease',
        transform: isHovered ? 'scale(1)' : 'scale(0.9)',
        zIndex: 2,
      }}>
        <h3 style={{
          color: 'white',
          fontSize: '24px',
          fontWeight: '600',
          marginBottom: '15px',
          textAlign: 'center',
          transition: 'transform 0.3s ease',
          transform: isHovered ? 'translateY(0)' : 'translateY(20px)',
        }}>
          {service.title}
        </h3>
        
        <p style={{
          color: 'white',
          fontSize: '16px',
          lineHeight: '1.5',
          textAlign: 'center',
          transition: 'transform 0.3s ease, opacity 0.3s ease',
          transform: isHovered ? 'translateY(0)' : 'translateY(20px)',
          opacity: isHovered ? 1 : 0,
          transitionDelay: '0.1s',
        }}>
          {service.description}
        </p>
        
        {/* Arrow positioned in the bottom right corner with animation */}
        <div style={{
          color: '#36b2c8',
          fontSize: '24px',
          fontWeight: '700',
          position: 'absolute',
          bottom: '20px',
          right: '20px',
          transition: 'transform 0.3s ease',
          transform: isHovered ? 'translate(0, 0)' : 'translate(-10px, -10px)',
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
  const servicesRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [visibleCards, setVisibleCards] = useState(4); // Default to 4 cards for desktop
  const [totalWidth, setTotalWidth] = useState(0);
  const [currentMobileIndex, setCurrentMobileIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [showHover, setShowHover] = useState(false);
  const [hoverTimer, setHoverTimer] = useState<NodeJS.Timeout | null>(null);
  const [leftButtonHovered, setLeftButtonHovered] = useState(false);
  const [rightButtonHovered, setRightButtonHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [autoScrollInterval, setAutoScrollInterval] = useState<NodeJS.Timeout | null>(null);
  const [loading, setLoading] = useState(true);
  const [sectionData, setSectionData] = useState<BusinessSectionData | null>(null);
  const [pageLoaded, setPageLoaded] = useState(false);
  
  // Default services data
  const defaultServices: ServiceItem[] = [
    {
      iconSrc: "/images/Vector.png",
      title: "Web App Design",
      description: "Custom web app design tailored for seamless user experience.",
      hoverImage: "/images/4.jpg",
    },
    {
      iconSrc: "/images/briefcase.png",
      title: "Mobile App Design",
      description: "Intuitive mobile app designs that engage users effectively.",
      hoverImage: "/images/3.jpg",
    },
    {
      iconSrc: "/images/monitor.png",
      title: "Website App Design",
      description: "Modern website app interfaces built for performance and clarity.",
      hoverImage: "/images/1.jpg",
    },
    {
      iconSrc: "/images/search.png",
      title: "Website Redesign",
      description: "Refresh your online presence with a modern, responsive redesign.",
      hoverImage: "/images/2.jpg",
    },
    {
      iconSrc: "/images/Vector.png",
      title: "Web Development Ecommerce",
      description: "Build powerful ecommerce platforms that convert visitors into buyers.",
      hoverImage: "/images/4.jpg",
    },
    {
      iconSrc: "/images/briefcase.png",
      title: "Web Development Shopify",
      description: "Professional Shopify stores developed for scalability and growth.",
      hoverImage: "/images/3.jpg",
    },
    {
      iconSrc: "/images/monitor.png",
      title: "Website Development Custom",
      description: "Fully custom websites crafted to meet unique business requirements.",
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
    
    // Set page loaded true after a small delay to ensure smooth animations
    setTimeout(() => {
      setPageLoaded(true);
    }, 100);
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
  
  // Calculate max scroll position based on total cards - moved before use in useEffect
  const maxScrollIndex = Math.max(0, services.length - visibleCards);
  const cardSetIndex = Math.min(Math.round(scrollPosition / (totalWidth / maxScrollIndex)), maxScrollIndex);
  
  // Set up Intersection Observer to detect when section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Start header animation
          setHeaderVisible(true);
          
          // Delay cards animation to start after header animation
          setTimeout(() => {
            setIsVisible(true);
          }, 400);
        }
      },
      { threshold: 0.1 } // Trigger earlier when just 10% of section is visible
    );
    
    if (sectionRef.current && pageLoaded) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [pageLoaded]);
  
  // Calculate container width on mount and resize
  useEffect(() => {
    const updateWidth = () => {
      if (servicesRef.current) {
        setTotalWidth(servicesRef.current.clientWidth);
      }
      
      // Check if mobile view based on screen width
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setVisibleCards(mobile ? 1 : 4); // Show 4 cards on desktop
    };
    
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);
  
  // Effect to start the 3-second timer when currentMobileIndex changes
  useEffect(() => {
    if (!isMobile) return;
    
    // Clear any existing hover and timer
    setShowHover(false);
    if (hoverTimer) clearTimeout(hoverTimer);
    
    // Start a new 3-second timer
    const timer = setTimeout(() => {
      setShowHover(true);
    }, 3000);
    
    setHoverTimer(timer);
    
    return () => {
      if (hoverTimer) clearTimeout(hoverTimer);
    };
  }, [currentMobileIndex, isMobile]);
  
  // Auto-scroll to current mobile index when it changes
  useEffect(() => {
    if (isMobile && servicesRef.current) {
      servicesRef.current.scrollTo({
        left: currentMobileIndex * totalWidth, // Full width of container
        behavior: 'smooth'
      });
    }
  }, [currentMobileIndex, isMobile, totalWidth]);
  
  // Set up auto-scroll functionality
  useEffect(() => {
    // Only start auto-scrolling when the section is visible
    if (!isVisible) return;
    
    // Start auto-scrolling
    const startAutoScroll = () => {
      // Clear any existing interval first
      if (autoScrollInterval) {
        clearInterval(autoScrollInterval);
      }
      
      // Set a new interval that scrolls right every 5 seconds
      const interval = setInterval(() => {
        if (isMobile) {
          setCurrentMobileIndex((prev) => 
            prev >= services.length - 1 ? 0 : prev + 1
          );
        } else {
          // Desktop carousel circular scrolling
          if (servicesRef.current) {
            const maxScrollSize = servicesRef.current.scrollWidth - servicesRef.current.clientWidth;
            if (cardSetIndex >= maxScrollIndex) {
              setScrollPosition(0);
              servicesRef.current.scrollTo({
                left: 0,
                behavior: 'smooth'
              });
            } else {
              const newPosition = Math.min(
                ((cardSetIndex + 1) / maxScrollIndex) * maxScrollSize,
                maxScrollSize
              );
              setScrollPosition(newPosition);
              servicesRef.current.scrollTo({
                left: newPosition,
                behavior: 'smooth'
              });
            }
          }
        }
      }, 5000); // Auto-scroll every 5 seconds
      
      setAutoScrollInterval(interval);
    };

    startAutoScroll();
    
    // Pause auto-scrolling when user interacts with the carousel
    const handleUserInteraction = () => {
      if (autoScrollInterval) {
        clearInterval(autoScrollInterval);
      }
      
      // Restart auto-scrolling after 10 seconds of inactivity
      const timeout = setTimeout(startAutoScroll, 10000);
      return () => clearTimeout(timeout);
    };
    
    // Add event listeners for user interaction
    if (servicesRef.current) {
      servicesRef.current.addEventListener('mouseenter', handleUserInteraction);
      servicesRef.current.addEventListener('touchstart', handleUserInteraction);
    }
    
    // Clean up on component unmount
    return () => {
      if (autoScrollInterval) {
        clearInterval(autoScrollInterval);
      }
      if (servicesRef.current) {
        servicesRef.current.removeEventListener('mouseenter', handleUserInteraction);
        servicesRef.current.removeEventListener('touchstart', handleUserInteraction);
      }
    };
  }, [isVisible, isMobile, maxScrollIndex, cardSetIndex, services.length]);
  
  // Scroll controls with circular navigation
  const scrollLeft = () => {
    if (servicesRef.current) {
      if (isMobile) {
        setCurrentMobileIndex((prev) => 
          prev <= 0 ? services.length - 1 : prev - 1
        );
      } else {
        // Circular navigation - go to the end if at the beginning
        const maxScrollSize = servicesRef.current.scrollWidth - servicesRef.current.clientWidth;
        if (cardSetIndex <= 0) {
          const newPosition = maxScrollSize;
          setScrollPosition(newPosition);
          servicesRef.current.scrollTo({
            left: newPosition,
            behavior: 'smooth'
          });
        } else {
          const newPosition = Math.max(
            ((cardSetIndex - 1) / maxScrollIndex) * maxScrollSize,
            0
          );
          setScrollPosition(newPosition);
          servicesRef.current.scrollTo({
            left: newPosition,
            behavior: 'smooth'
          });
        }
      }
    }
  };
  
 const scrollRight = () => {
    if (servicesRef.current) {
      if (isMobile) {
        setCurrentMobileIndex((prev) => 
          prev >= services.length - 1 ? 0 : prev + 1
        );
      } else {
        // Circular navigation - go to the beginning if at the end
        const maxScrollSize = servicesRef.current.scrollWidth - servicesRef.current.clientWidth;
        if (cardSetIndex >= maxScrollIndex) {
          setScrollPosition(0);
          servicesRef.current.scrollTo({
            left: 0,
            behavior: 'smooth'
          });
        } else {
          const newPosition = Math.min(
            ((cardSetIndex + 1) / maxScrollIndex) * maxScrollSize,
            maxScrollSize
          );
          setScrollPosition(newPosition);
          servicesRef.current.scrollTo({
            left: newPosition,
            behavior: 'smooth'
          });
        }
      }
    }
  };
  
  // For responsive styling with animations
  const containerStyle = {
    backgroundColor: '#0b1a27',
    padding: '80px 0',
    width: '100%',
    fontFamily: 'Arial, sans-serif',
    position: 'relative',
    overflow: 'hidden',
  };
  
  // Add animated background elements
  const backgroundElements = [];
  for (let i = 0; i < 5; i++) {
    backgroundElements.push({
      top: Math.random() * 100 + '%',
      left: Math.random() * 100 + '%',
      size: Math.random() * 80 + 40,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 5,
    });
  }
  
  const contentStyle = {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 24px',
    position: 'relative',
    zIndex: 1,
  };
  
  const headerStyle = {
    position: 'relative' as const,
    marginBottom: '40px',
    opacity: headerVisible ? 1 : 0,
    transform: headerVisible ? 'translateY(0)' : 'translateY(-30px)',
    transition: 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.17, 0.67, 0.4, 1.33)',
  };
  
  const titleStyle = {
    color: 'white',
    fontSize: isMobile ? '32px' : '42px',
    fontWeight: '700',
    lineHeight: '1.2',
    marginBottom: '16px',
    position: 'relative',
  };
  
  const subtitleStyle = {
    color: '#d1d5db',
    fontSize: isMobile ? '16px' : '18px',
    position: 'relative',
    opacity: headerVisible ? 1 : 0,
    transform: headerVisible ? 'translateY(0)' : 'translateY(20px)',
    transition: 'opacity 0.8s ease, transform 0.8s ease',
    transitionDelay: '0.2s',
  };
  
  const carouselContainerStyle = {
    position: 'relative',
    width: '100%',
    padding: '0',
    overflow: 'hidden',
  } as const;
  
  const carouselStyle = {
    display: 'flex',
    scrollBehavior: 'smooth',
    width: '100%',
    position: 'relative',
  } as const;
  
  // Button style with hover animation and pulse effect
  const buttonStyle = {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    color: 'white',
    fontSize: '28px',
    fontWeight: '700',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    cursor: 'pointer',
    zIndex: 10,
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    margin: '0 5px',
    transition: 'all 0.3s ease, transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    opacity: headerVisible ? 1 : 0,
    transform: headerVisible ? 'translateY(0) scale(1)' : 'translateY(-20px) scale(0.8)',
    transitionDelay: '0.3s',
  } as const;
  
  // Navigation container style based on mobile or desktop
  const navigationContainerStyle = {
    position: isMobile ? 'relative' : 'absolute' as const,
    top: isMobile ? 'auto' : '55px',
    right: isMobile ? 'auto' : '20px',
    display: 'flex',
    zIndex: 10,
    justifyContent: isMobile ? 'center' : 'flex-end',
    marginTop: isMobile ? '30px' : '0',
  } as const;
  
  // Get section title and description from data or use defaults
  const sectionTitle = sectionData?.section_title || "Your <span style={{ color: '#36b2c8' }}>Business</span> Is Unique";
  const sectionDescription = sectionData?.section_description || "That's Why We Provide Custom Solutions Tailored To Your Needs";

  // CSS keyframes for animations
  const keyframes = `
    @keyframes floatingElement {
      0% { transform: translate(0, 0) rotate(0deg); }
      50% { transform: translate(15px, -15px) rotate(5deg); }
      100% { transform: translate(0, 0) rotate(0deg); }
    }
    
    @keyframes pulse {
      0% { box-shadow: 0 0 0 0 rgba(13, 152, 186, 0.7); }
      70% { box-shadow: 0 0 0 15px rgba(13, 152, 186, 0); }
      100% { box-shadow: 0 0 0 0 rgba(13, 152, 186, 0); }
    }
    
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes cardClickAnimation {
      0% { transform: scale(1); }
      50% { transform: scale(0.95); }
      100% { transform: scale(0.9); opacity: 0; }
    }
    
    @keyframes highlightText {
      0% { color: white; }
      50% { color: #36b2c8; }
      100% { color: white; }
    }
  `;
  
  // If still loading, can show a placeholder or the default content
  if (loading) {
    // Return the same structure but with default values
    // This could also be a loading indicator if desired
  }
  
  return (
    <div style={containerStyle} ref={sectionRef}>
      {/* Add animated CSS keyframes */}
      <style>
        {keyframes}
      </style>
      
      {/* Animated background elements */}
      {backgroundElements.map((elem, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            top: elem.top,
            left: elem.left,
            width: elem.size + 'px',
            height: elem.size + 'px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(13, 152, 186, 0.05) 0%, rgba(13, 152, 186, 0) 70%)',
            animation: `floatingElement ${elem.duration}s infinite linear`,
            animationDelay: `${elem.delay}s`,
            zIndex: 0,
          }}
        />
      ))}
      
      <div style={contentStyle}>
        <div style={headerStyle}>
          <h2 
            style={titleStyle} 
            dangerouslySetInnerHTML={{ __html: sectionTitle }}
          />
          <p style={subtitleStyle}>
            {sectionDescription}
          </p>
          
          {/* Navigation buttons - only shown here for desktop */}
          {!isMobile && (
            <div style={navigationContainerStyle}>
              <button 
                onClick={scrollLeft} 
                style={{
                  ...buttonStyle,
                  background: leftButtonHovered
                    ? 'linear-gradient(180deg, rgba(13, 152, 186, 0.7) 0%, rgba(0, 0, 0, 0.7) 100%), #16161E'
                    : 'linear-gradient(180deg, rgba(13, 152, 186, 0.3) 0%, rgba(0, 0, 0, 0.3) 100%), #16161E',
                  animation: leftButtonHovered ? 'pulse 1.5s infinite' : 'none',
                  transform: leftButtonHovered 
                    ? 'translateY(0) scale(1.1)' 
                    : headerVisible ? 'translateY(0) scale(1)' : 'translateY(-20px) scale(0.8)',
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
                  ...buttonStyle,
                  background: rightButtonHovered
                    ? 'linear-gradient(180deg, rgba(13, 152, 186, 0.7) 0%, rgba(0, 0, 0, 0.7) 100%), #16161E'
                    : 'linear-gradient(180deg, rgba(13, 152, 186, 0.3) 0%, rgba(0, 0, 0, 0.3) 100%), #16161E',
                  animation: rightButtonHovered ? 'pulse 1.5s infinite' : 'none',
                  transform: rightButtonHovered 
                    ? 'translateY(0) scale(1.1)' 
                    : headerVisible ? 'translateY(0) scale(1)' : 'translateY(-20px) scale(0.8)',
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
        
        <div style={carouselContainerStyle}>
          {/* Card container with horizontal scrolling */}
          <div 
            ref={servicesRef} 
            style={{
              ...carouselStyle,
              overflow: 'hidden',
              scrollSnapType: isMobile ? 'x mandatory' : 'none',
            }}
            onScroll={(e) => !isMobile && setScrollPosition(e.currentTarget.scrollLeft)}
          >
            {isMobile ? (
              // Mobile view - one card at a time with snap points
              services.map((service, index) => (
                <div 
                  key={index} 
                  style={{ 
                    flex: '0 0 100%',
                    scrollSnapAlign: 'center',
                    padding: '0 0',
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
              ))
            ) : (
              // Desktop view - multiple cards with staggered animation
              services.map((service, index) => (
                <ServiceCard 
                  key={index} 
                  {...service} 
                  animationDelay={index % 4 * 150}
                  isVisible={isVisible}
                />
              ))
            )}
          </div>
          
          {/* Mobile navigation buttons - positioned below the card */}
          {isMobile && (
            <div style={navigationContainerStyle}>
              <button 
                onClick={scrollLeft}
                style={{
                  ...buttonStyle,
                  background: leftButtonHovered
                    ? 'linear-gradient(180deg, rgba(13, 152, 186, 0.7) 0%, rgba(0, 0, 0, 0.7) 100%), #16161E'
                    : 'linear-gradient(180deg, rgba(13, 152, 186, 0.3) 0%, rgba(0, 0, 0, 0.3) 100%), #16161E',
                  animation: leftButtonHovered ? 'pulse 1.5s infinite' : 'none',
                  transform: leftButtonHovered 
                    ? 'scale(1.1)' 
                    : headerVisible ? 'scale(1)' : 'scale(0.8)',
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
                  ...buttonStyle,
                  background: rightButtonHovered
                    ? 'linear-gradient(180deg, rgba(13, 152, 186, 0.7) 0%, rgba(0, 0, 0, 0.7) 100%), #16161E'
                    : 'linear-gradient(180deg, rgba(13, 152, 186, 0.3) 0%, rgba(0, 0, 0, 0.3) 100%), #16161E',
                  animation: rightButtonHovered ? 'pulse 1.5s infinite' : 'none',
                  transform: rightButtonHovered 
                    ? 'scale(1.1)' 
                    : headerVisible ? 'scale(1)' : 'scale(0.8)',
                }}
                aria-label="Next services"
                onMouseEnter={() => setRightButtonHovered(true)}
                onMouseLeave={() => setRightButtonHovered(false)}
              >
                &gt;
              </button>
            </div>
          )}
          
          {/* Indicator dots for mobile */}
          {isMobile && (
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '20px',
              gap: '8px',
              opacity: headerVisible ? 1 : 0,
              transform: headerVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.8s ease, transform 0.8s ease',
              transitionDelay: '0.5s',
            }}>
              {services.map((_, index) => (
                <div
                  key={index}
                  onClick={() => setCurrentMobileIndex(index)}
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: index === currentMobileIndex 
                      ? '#36b2c8' 
                      : 'rgba(255, 255, 255, 0.3)',
                    cursor: 'pointer',
                    transition: 'background 0.3s ease, transform 0.3s ease',
                    transform: index === currentMobileIndex ? 'scale(1.2)' : 'scale(1)',
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}