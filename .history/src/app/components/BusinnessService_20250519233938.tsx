'use client';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { supabase } from './supabaseClient'; 

// Updated service page map to match service titles in the services array
const servicePageMap: Record<string, string> = {
  "Web App Design": "/web-app-design",
  "Mobile App Design": "/mobile-app-design",
  "Website App Design": "/website-app-design",
  "Website Redesign": "/website-redesign",
  "Web Development Ecommerce": "/ecommerce-development",
  "Web Development Shopify": "/shopify-development",
  "Website Development Custom": "/custom-development",
  "Support and Maintenance": "/support-maintenance",
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
  isLast?: boolean;
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
  card8_title: string;
  card8_description: string;
}

// Service Card Component
const ServiceCard = ({ iconSrc, title, description, hoverImage, animationDelay, isVisible, isLast = false }: ServiceCardProps) => {
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
        marginRight: isLast ? '0' : '24px',
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
        marginRight: '0',
        marginLeft: '0',
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

// Tablet Service Card Component
const TabletServiceCard = ({ service, index, isVisible }: 
  { service: ServiceItem, index: number, isVisible: boolean }) => {
  const [isHovered, setIsHovered] = useState(false);
  const destinationPage = servicePageMap[service.title] || "/services";
  const router = useRouter();
  const handleNavigation = () => {
    router.push(destinationPage);
  };
   
  return (
    <div 
      onClick={handleNavigation}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        flex: '0 0 calc(50% - 16px)', // Two cards per row with spacing
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
        margin: '0 8px 16px 8px', // Even spacing between cards
        cursor: 'pointer',
        transitionDelay: `${index % 2 * 150}ms`, // Staggered animation for pairs
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
      
      {/* Overlay with fade effect */}
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
  const carouselRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [visibleCards, setVisibleCards] = useState(4); // Default to 4 cards for desktop
  const [totalWidth, setTotalWidth] = useState(0);
  const [currentMobileIndex, setCurrentMobileIndex] = useState(0);
  const [viewportType, setViewportType] = useState('desktop'); // 'mobile', 'tablet', or 'desktop'
  const [showHover, setShowHover] = useState(false);
  const [hoverTimer, setHoverTimer] = useState<NodeJS.Timeout | null>(null);
  const [leftButtonHovered, setLeftButtonHovered] = useState(false);
  const [rightButtonHovered, setRightButtonHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [autoScrollInterval, setAutoScrollInterval] = useState<NodeJS.Timeout | null>(null);
  const [autoLoopTimeout, setAutoLoopTimeout] = useState<NodeJS.Timeout | null>(null);
  const [userInteracted, setUserInteracted] = useState(false);
  const [userInteractionTimeout, setUserInteractionTimeout] = useState<NodeJS.Timeout | null>(null);
  const [loading, setLoading] = useState(true);
  const [sectionData, setSectionData] = useState<BusinessSectionData | null>(null);
  const [reachedEnd, setReachedEnd] = useState(false);
  
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
    {
      iconSrc: "/images/tools.png",
      title: "Support and Maintenance",
      description: "Ongoing support and maintenance to keep your digital assets running smoothly.",
      hoverImage: "/images/5.jpg",
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
    {
      iconSrc: "/images/tools.png",
      title: sectionData.card8_title || "Support and Maintenance",
      description: sectionData.card8_description || "Ongoing support and maintenance to keep your digital assets running smoothly.",
      hoverImage: "/images/5.jpg",
    },
  ] : defaultServices;
  
  // Calculate visible cards based on viewport type
  useEffect(() => {
    if (viewportType === 'mobile') {
      setVisibleCards(1);
    } else if (viewportType === 'tablet') {
      setVisibleCards(2);
    } else {
      setVisibleCards(4);
    }
  }, [viewportType]);
  
  // Calculate max scroll position based on total cards
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
  
  // Calculate container width and update viewport type on mount and resize
  useEffect(() => {
    const updateWidth = () => {
      if (servicesRef.current) {
        setTotalWidth(servicesRef.current.clientWidth);
      }
      
      // Check viewport size
      const width = window.innerWidth;
      if (width < 640) {
        setViewportType('mobile');
      } else if (width < 1024) {
        setViewportType('tablet');
      } else {
        setViewportType('desktop');
      }
    };
    
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);
  
  // Effect to start the 3-second timer when currentMobileIndex changes
  useEffect(() => {
    if (viewportType !== 'mobile') return;
    
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
  }, [currentMobileIndex, viewportType]);
  
  // Auto-scroll to current mobile index when it changes
  useEffect(() => {
    if ((viewportType === 'mobile') && servicesRef.current) {
      servicesRef.current.scrollTo({
        left: currentMobileIndex * totalWidth, // Full width of container
        behavior: 'smooth'
      });
    }
  }, [currentMobileIndex, viewportType, totalWidth]);
  
  // Handle the auto-scroll functionality
// Handle the auto-scroll functionality
const startAutoScroll = () => {
  // Clear any existing interval first
  if (autoScrollInterval) {
    clearInterval(autoScrollInterval);
    setAutoScrollInterval(null); // Add this line to properly reset the state
  }
  
  if (autoLoopTimeout) {
    clearTimeout(autoLoopTimeout);
    setAutoLoopTimeout(null); // Add this line to properly reset the state
  }
  
  // Set a new interval that scrolls right every 5 seconds
  const interval = setInterval(() => {
    if (viewportType === 'mobile') {
      // For mobile, check if we're at the last card
      if (currentMobileIndex >= services.length - 1) {
        // At the last card, set a flag
        setReachedEnd(true);
        // Clear the current interval safely
        if (autoScrollInterval) {
          clearInterval(autoScrollInterval);
          setAutoScrollInterval(null); // Add this line
        }
        
        // Set a timeout to go back to the first card after 4 seconds
        const loopTimeout = setTimeout(() => {
          setCurrentMobileIndex(0);
          setReachedEnd(false);
          // Restart the auto-scroll after looping
          startAutoScroll();
        }, 4000); // Wait 4 seconds on the last card
        
        setAutoLoopTimeout(loopTimeout);
      } else {
        // Not at the last card, move to the next one
        setCurrentMobileIndex(prev => prev + 1);
      }
    } else {
      // Desktop and tablet carousel scrolling
      if (servicesRef.current) {
        const maxScrollSize = servicesRef.current.scrollWidth - servicesRef.current.clientWidth;
        
        // Check if we're at the last set of cards
        if (cardSetIndex >= maxScrollIndex) {
          // At the last set, set a flag
          setReachedEnd(true);
          // Clear the current interval safely
          if (autoScrollInterval) {
            clearInterval(autoScrollInterval);
            setAutoScrollInterval(null); // Add this line
          }
          
          // Set a timeout to go back to the first set after 4 seconds
          const loopTimeout = setTimeout(() => {
            setScrollPosition(0);
            servicesRef.current?.scrollTo({
              left: 0,
              behavior: 'smooth'
            });
            setReachedEnd(false);
            // Restart the auto-scroll after looping
            startAutoScroll();
          }, 4000); // Wait 4 seconds on the last set
          
          setAutoLoopTimeout(loopTimeout);
        } else {
          // Not at the last set, move to the next one
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
  // Set up auto-scroll functionality
  // Set up auto-scroll functionality
  useEffect(() => {
    // Only start auto-scrolling when the section is visible
    if (!isVisible) return;
    
    // If user has interacted, but the inactivity period has passed
    if (!userInteracted) {
      startAutoScroll();
    }
    
    return () => {
      if (autoScrollInterval) {
        clearInterval(autoScrollInterval);
      }
      if (autoLoopTimeout) {
        clearTimeout(autoLoopTimeout);
      }
    };
  }, [isVisible, userInteracted, viewportType, maxScrollIndex, cardSetIndex, services.length]);
  
  // Handle user interaction
 // Handle user interaction
const handleUserInteraction = () => {
  setUserInteracted(true);
  
  // Clear existing auto-scroll and timeout
  if (autoScrollInterval) {
    clearInterval(autoScrollInterval);
    setAutoScrollInterval(null);
  }
  
  if (autoLoopTimeout) {
    clearTimeout(autoLoopTimeout);
    setAutoLoopTimeout(null);
  }
  
  if (userInteractionTimeout) {
    clearTimeout(userInteractionTimeout);
  }
  
  // Set a timeout to restart auto-scrolling after 10 seconds of inactivity
  const timeout = setTimeout(() => {
    setUserInteracted(false); // Reset user interaction flag
  }, 10000);
  
  setUserInteractionTimeout(timeout);
};
  
  // Setup user interaction listeners
  useEffect(() => {
    // Add event listeners for user interaction
    if (servicesRef.current) {
      servicesRef.current.addEventListener('mousedown', handleUserInteraction);
      servicesRef.current.addEventListener('touchstart', handleUserInteraction);
    }
    
    // Clean up on component unmount
    return () => {
      if (servicesRef.current) {
        servicesRef.current.removeEventListener('mousedown', handleUserInteraction);
        servicesRef.current.removeEventListener('touchstart', handleUserInteraction);
      }
      
      if (userInteractionTimeout) {
        clearTimeout(userInteractionTimeout);
      }
      
      if (autoScrollInterval) {
        clearInterval(autoScrollInterval);
      }

      if (autoLoopTimeout) {
        clearTimeout(autoLoopTimeout);
      }
    };
  }, []);
  
  // Scroll controls with circular navigation
  const scrollLeft = () => {
    handleUserInteraction(); // Register user interaction
    
    if (servicesRef.current) {
      if (viewportType === 'mobile') {
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
    handleUserInteraction(); // Register user interaction
    
    if (servicesRef.current) {
      if (viewportType === 'mobile') {
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
    fontSize: viewportType === 'mobile' ? '32px' : '42px',
    fontWeight: '700',
    lineHeight: '1.2',
    marginBottom: '16px',
  };
  
  const subtitleStyle = {
    color: '#d1d5db',
    fontSize: viewportType === 'mobile' ? '16px' : '18px',
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
  
  // Navigation container style based on viewport type
  const navigationContainerStyle = {
    position: viewportType === 'mobile' ? 'relative' : 'absolute' as const,
    top: viewportType === 'mobile' ? 'auto' : '55px',
    right: viewportType === 'mobile' ? 'auto' : '20px',
    display: 'flex',
    zIndex: 10,
    justifyContent: viewportType === 'mobile' ? 'center' : 'flex-end',
    marginTop: viewportType === 'mobile' ? '30px' : '0',
  } as const;
  
  // Get section title and description from data or use defaults
  const sectionTitle = sectionData?.section_title || "Your <span style={{ color: '#36b2c8' }}>Business</span> Is Unique";
  const sectionDescription = sectionData?.section_description || "That's Why We Provide Custom Solutions Tailored To Your Needs";

  // If still loading, can show a placeholder or the default content
  if (loading) {
    // Return the same structure but with default values
    // This could also be a loading indicator if desired
  }
  
  return (
    <div style={containerStyle} ref={sectionRef}>
      <div style={contentStyle}>
        <div style={headerStyle}>
          <h2 style={titleStyle} dangerouslySetInnerHTML={{ __html: sectionTitle }} />
          <p style={subtitleStyle}>
            {sectionDescription}
          </p>
          
          {/* Navigation buttons - only shown here for desktop */}
          {viewportType === 'desktop' && (
            <div style={navigationContainerStyle}>
              <button 
                onClick={scrollLeft} 
                style={{
                  ...buttonStyle,
                  background: leftButtonHovered
                    ? 'linear-gradient(180deg, rgba(13, 152, 186, 0.5) 0%, rgba(0, 0, 0, 0.5) 100%), #16161E'
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
                  ...buttonStyle,
                  background: rightButtonHovered
                    ? 'linear-gradient(180deg, rgba(13, 152, 186, 0.5) 0%, rgba(0, 0, 0, 0.5) 100%), #16161E'
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
        
        <div style={carouselContainerStyle}>
          {/* Card container with horizontal scrolling */}
          <div 
            ref={servicesRef} 
            style={{
              ...carouselStyle,
              overflow: 'hidden',
              scrollSnapType: viewportType === 'mobile' ? 'x mandatory' : 'none',
            }}
            onScroll={(e) => viewportType !== 'mobile' && setScrollPosition(e.currentTarget.scrollLeft)}
          >
            {viewportType === 'mobile' ? (
              // Mobile view - one card at a time with snap points
              <div ref={carouselRef} style={{ 
                display: 'flex', 
                width: `${services.length * 100}%`,
              }}>
                {services.map((service, index) => (
                  <div 
                    key={index} 
                    style={{ 
                      flex: `0 0 ${100 / services.length}%`,
                      scrollSnapAlign: 'center',
                      padding: '0 8px', // Added padding for space between cards
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
            ) : viewportType === 'tablet' ? (
              // Tablet view - two cards per row with grid layout
              <div style={{ 
                display: 'flex', 
                flexWrap: 'wrap',
                justifyContent: 'center',
                margin: '0 -8px', // Negative margin to offset the card margins
              }}>
                {services.map((service, index) => (
                  <TabletServiceCard 
                    key={index}
                    service={service}
                    index={index}
                    isVisible={isVisible}
                  />
                ))}
              </div>
            ) : (
              // Desktop view - four cards with staggered animation
              <div ref={carouselRef} style={{ 
                display: 'flex', 
                width: `${Math.ceil(services.length / visibleCards) * 100}%`,
              }}>
                {services.map((service, index) => (
                  <ServiceCard 
                    key={index} 
                    {...service} 
                    animationDelay={index % 4 * 150}
                    isVisible={isVisible}
                    isLast={index === services.length - 1}
                  />
                ))}
              </div>
            )}
          </div>
          
          {/* Mobile and Tablet navigation buttons - positioned below the cards */}
          {viewportType !== 'desktop' && (
            <div style={navigationContainerStyle}>
              <button 
                onClick={scrollLeft}
                style={{
                  ...buttonStyle,
                  background: leftButtonHovered
                    ? 'linear-gradient(180deg, rgba(13, 152, 186, 0.5) 0%, rgba(0, 0, 0, 0.5) 100%), #16161E'
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
                  ...buttonStyle,
                  background: rightButtonHovered
                    ? 'linear-gradient(180deg, rgba(13, 152, 186, 0.5) 0%, rgba(0, 0, 0, 0.5) 100%), #16161E'
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