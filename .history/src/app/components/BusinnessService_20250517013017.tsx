'use client';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { supabase } from './supabaseClient';  // Import supabaseClient

// Updated service page map to match service titles in the services array
const servicePageMap: Record<string, string> = {
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

// Service Card Component
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
        transition: 'transform 0.5s ease, opacity 0.8s ease',
        transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
        opacity: isVisible ? 1 : 0,
        cursor: 'pointer',
        marginRight: '24px',
        position: 'relative',
        transitionDelay: `${animationDelay}ms`,
      }}
    >
      {/* Background image (always present, opacity changes on hover) */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: isHovered ? 1 : 0,
        transition: 'opacity 0.3s ease',
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
        transition: 'opacity 0.3s ease',
      }}>
        <div style={{
          width: '48px',
          height: '48px',
          marginBottom: '20px',
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
          transition: 'font-weight 0.3s ease',
        }}>
          →
        </div>
      </div>
      
      {/* Overlay that fades in instead of sliding from the top */}
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
        transition: 'opacity 0.3s ease',
        zIndex: 2,
      }}>
        <h3 style={{
          color: 'white',
          fontSize: '24px',
          fontWeight: '600',
          marginBottom: '15px',
          textAlign: 'center',
        }}>
          {title}
        </h3>
        
        <p style={{
          color: 'white',
          fontSize: '16px',
          lineHeight: '1.5',
          textAlign: 'center',
        }}>
          {description}
        </p>
        
        {/* Arrow positioned in the bottom right corner with bold weight on hover */}
        <div style={{
          color: '#36b2c8',
          fontSize: '24px',
          fontWeight: '700',
          position: 'absolute',
          bottom: '20px',
          right: '20px',
        }}>
          ↘
        </div>
      </div>
    </div>
    
  );
};

// Mobile Service Card Component
const MobileServiceCard = ({ service, index, isActive, showHover, isVisible }: 
  { service: ServiceItem, index: number, isActive: boolean, showHover: boolean, isVisible: boolean }) => {
  const isHovered = isActive && showHover;
  const destinationPage = servicePageMap[service.title] || "/services";
  const router = useRouter();
  const handleNavigation = () => {
    router.push(destinationPage);
  };
   
  return (
    <div 
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
        transition: 'transform 0.5s ease, opacity 0.8s ease',
        transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
        opacity: isVisible ? 1 : 0,
        position: 'relative',
        width: '100%',
        marginRight: '20px',
      }}
    >
      {/* Background image */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: isHovered ? 1 : 0,
        transition: 'opacity 0.3s ease',
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
      
      {/* Content - hidden on hover */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        opacity: isHovered ? 0 : 1,
        transition: 'opacity 0.3s ease',
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
      
      {/* Overlay with fade effect instead of sliding */}
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
        transition: 'opacity 0.3s ease',
        zIndex: 2,
      }}>
        <h3 style={{
          color: 'white',
          fontSize: '24px',
          fontWeight: '600',
          marginBottom: '15px',
          textAlign: 'center',
        }}>
          {service.title}
        </h3>
        
        <p style={{
          color: 'white',
          fontSize: '16px',
          lineHeight: '1.5',
          textAlign: 'center',
        }}>
          {service.description}
        </p>
        
        {/* Arrow positioned in the bottom right corner with bold weight */}
        <div style={{
          color: '#36b2c8',
          fontSize: '24px',
          fontWeight: '700',
          position: 'absolute',
          bottom: '20px',
          right: '20px',
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
  
  // Add states for Supabase data
  const [isLoading, setIsLoading] = useState(true);
  const [sectionData, setSectionData] = useState<BusinessSectionData | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Default services data - will be used as fallback if no Supabase data
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

  // Icon and background image mappings
  const iconMappings = [
    "/images/Vector.png",
    "/images/briefcase.png",
    "/images/monitor.png",
    "/images/search.png",
    "/images/Vector.png",
    "/images/briefcase.png",
    "/images/monitor.png"
  ];

  const hoverImageMappings = [
    "/images/4.jpg",
    "/images/3.jpg",
    "/images/1.jpg",
    "/images/2.jpg",
    "/images/4.jpg",
    "/images/3.jpg",
    "/images/1.jpg"
  ];
  
  // Function to create services array from Supabase data
  const createServicesArray = (data: BusinessSectionData): ServiceItem[] => {
    return [
      {
        iconSrc: iconMappings[0],
        title: data.card1_title || defaultServices[0].title,
        description: data.card1_description || defaultServices[0].description,
        hoverImage: hoverImageMappings[0],
      },
      {
        iconSrc: iconMappings[1],
        title: data.card2_title || defaultServices[1].title,
        description: data.card2_description || defaultServices[1].description,
        hoverImage: hoverImageMappings[1],
      },
      {
        iconSrc: iconMappings[2],
        title: data.card3_title || defaultServices[2].title,
        description: data.card3_description || defaultServices[2].description,
        hoverImage: hoverImageMappings[2],
      },
      {
        iconSrc: iconMappings[3],
        title: data.card4_title || defaultServices[3].title,
        description: data.card4_description || defaultServices[3].description,
        hoverImage: hoverImageMappings[3],
      },
      {
        iconSrc: iconMappings[4],
        title: data.card5_title || defaultServices[4].title,
        description: data.card5_description || defaultServices[4].description,
        hoverImage: hoverImageMappings[4],
      },
      {
        iconSrc: iconMappings[5],
        title: data.card6_title || defaultServices[5].title,
        description: data.card6_description || defaultServices[5].description,
        hoverImage: hoverImageMappings[5],
      },
      {
        iconSrc: iconMappings[6],
        title: data.card7_title || defaultServices[6].title,
        description: data.card7_description || defaultServices[6].description,
        hoverImage: hoverImageMappings[6],
      },
    ];
  };

  // Fetch data from Supabase
  useEffect(() => {
    const fetchSectionData = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabaseClient
          .from('homebuisnesssection')
          .select('*')
          .order('id', { ascending: true })
          .limit(1)
          .single();
          
        if (error) {
          console.error('Error fetching business section data:', error);
          setError(error.message);
        } else if (data) {
          setSectionData(data);
        }
      } catch (err) {
        console.error('Unexpected error fetching data:', err);
        setError('An unexpected error occurred');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSectionData();
  }, []);
  
  // Derived services data - use Supabase data if available, otherwise use defaults
  const services: ServiceItem[] = sectionData ? createServicesArray(sectionData) : defaultServices;
  
  // Calculate max scroll position based on total cards - moved before use in useEffect
  const maxScrollIndex = Math.max(0, services.length - visibleCards);
  const cardSetIndex = Math.min(Math.round(scrollPosition / (totalWidth / maxScrollIndex)), maxScrollIndex);
  
  // Set up Intersection Observer to detect when section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true);
          // Delay cards animation to start after header animation
          setTimeout(() => {
            setIsVisible(true);
          }, 300);
        }
      },
      { threshold: 0.2 } // Trigger when 20% of section is visible
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
  
  // For responsive styling
  const containerStyle = {
    backgroundColor: '#0b1a27',
    padding: '80px 0',
    width: '100%',
    fontFamily: 'Arial, sans-serif',
  };
  
  const contentStyle = {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 24px',
  };
  
  const headerStyle = {
    position: 'relative' as const,
    marginBottom: '40px',
    opacity: headerVisible ? 1 : 0,
    transform: headerVisible ? 'translateY(0)' : 'translateY(-30px)',
    transition: 'opacity 0.8s ease, transform 0.8s ease',
  };
  
  const titleStyle = {
    color: 'white',
    fontSize: isMobile ? '32px' : '42px',
    fontWeight: '700',
    lineHeight: '1.2',
    marginBottom: '16px',
  };
  
  const subtitleStyle = {
    color: '#d1d5db',
    fontSize: isMobile ? '16px' : '18px',
  };
  
  const carouselContainerStyle = {
    position: 'relative',
    width: '100%',
    padding: '0 0',
    overflow: 'hidden',
  } as const;
  
  const carouselStyle = {
    display: 'flex',
    scrollBehavior: 'smooth',
    width: '100%',
    position: 'relative',
  } as const;
  
  // Button style (base only - actual hover effect is applied inline)
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
    transition: 'all 0.3s ease',
    opacity: headerVisible ? 1 : 0,
    transform: headerVisible ? 'translateY(0)' : 'translateY(-20px)',
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

  // Show loading state while data is being fetched
  if (isLoading) {
    return (
      <div style={containerStyle} ref={sectionRef}>
        <div style={contentStyle}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '200px',
            color: 'white',
          }}>
            Loading...
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div style={containerStyle} ref={sectionRef}>
      <div style={contentStyle}>
        <div style={headerStyle}>
          <h2 style={titleStyle}>
            {/* Use dynamic title if available, otherwise fallback to default */}
            {sectionData?.section_title ? (
              // Split the title to find words to highlight
              <>
                {sectionData.section_title.split(' ').map((word, index, array) => {
                  // Highlight the word "Business" or any other third word if present
                  const targetIndex = array.findIndex(w => w.toLowerCase() === 'business');
                  const highlightIndex = targetIndex !== -1 ? targetIndex : 2; // Default to third word
                  
                  return (
                    <span key={index} style={{ color: index === highlightIndex ? '#36b2c8' : 'inherit' }}>
                      {word}{index < array.length - 1 ? ' ' : ''}
                    </span>
                  );
                })}
              </>
            ) : (
              <>Business <span style={{ color: '#36b2c8' }}>Services</span></>
            )}
          </h2>
          <p style={subtitleStyle}>
            {sectionData?.section_description || 
              "We offer a comprehensive range of digital solutions to help your business thrive online."}
          </p>
        </div>
        
        {/* Desktop & Mobile Navigation Controls */}
        <div style={navigationContainerStyle}>
          <button 
            onClick={scrollLeft}
            onMouseEnter={() => setLeftButtonHovered(true)}
            onMouseLeave={() => setLeftButtonHovered(false)}
            style={{
              ...buttonStyle,
              backgroundColor: leftButtonHovered ? '#36b2c8' : '#1a2333',
            }}
            aria-label="Previous service"
          >
            ←
          </button>
          <button 
            onClick={scrollRight}
            onMouseEnter={() => setRightButtonHovered(true)}
            onMouseLeave={() => setRightButtonHovered(false)}
            style={{
              ...buttonStyle,
              backgroundColor: rightButtonHovered ? '#36b2c8' : '#1a2333',
            }}
            aria-label="Next service"
          >
            →
          </button>
        </div>
        
        {/* Carousel Container */}
        <div style={carouselContainerStyle}>
          {/* Desktop Service Cards */}
          {!isMobile && (
            <div 
              ref={servicesRef}
              style={{
                ...carouselStyle,
                overflowX: 'auto',
                scrollbarWidth: 'none', // Firefox
                msOverflowStyle: 'none', // IE/Edge
                '&::-webkit-scrollbar': { display: 'none' }, // Chrome/Safari/Opera
              }}
              onScroll={(e) => {
                setScrollPosition((e.target as HTMLDivElement).scrollLeft);
              }}
            >
              {services.map((service, index) => (
                <ServiceCard
                  key={index}
                  iconSrc={service.iconSrc}
                  title={service.title}
                  description={service.description}
                  hoverImage={service.hoverImage}
                  animationDelay={100 * index}
                  isVisible={isVisible}
                />
              ))}
            </div>
          )}
          
          {/* Mobile Service Cards */}
          {isMobile && (
            <div 
              ref={servicesRef}
              style={{
                ...carouselStyle,
                overflowX: 'hidden', // Hide scrollbar but allow scrolling
                width: '100%',
              }}
            >
              {services.map((service, index) => (
                <MobileServiceCard
                  key={index}
                  service={service}
                  index={index}
                  isActive={index === currentMobileIndex}
                  showHover={showHover}
                  isVisible={isVisible}
                />
              ))}
            </div>
          )}
          
          {/* Mobile service indicators */}
          {isMobile && (
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '20px',
            }}>
              {services.map((_, index) => (
                <div
                  key={index}
                  onClick={() => setCurrentMobileIndex(index)}
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: index === currentMobileIndex ? '#36b2c8' : '#1a2333',
                    margin: '0 4px',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease',
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