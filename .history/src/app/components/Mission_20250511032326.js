'use client';

import React, { useEffect, useState } from 'react';
import {
  Container,
  Header,
  Title,
  Subtitle,
  HighlightSpan,
  Description,
  ServicesContainer,
  ServiceSection,
  VerticalBar,
  VerticalShimmerEffect,
  Content,
  ImageContainer,
  ServiceImage,
  TextContainer,
  HorizontalBar,
  HorizontalShimmerEffect,
  Heading,
  Paragraph,
  ButtonContainer,
  Button,
  ButtonArrow
} from './WebDevelopmentComponent.styles'; // Import the styled components

const WebDevelopmentComponent = () => {
  // Animation states
  const [isVisible, setIsVisible] = useState(false);
  const [deviceType, setDeviceType] = useState('desktop'); // 'desktop', 'tablet', or 'mobile'
  const [hoveredSection, setHoveredSection] = useState(null);
  const [activeSection, setActiveSection] = useState(null);
  
  // Array of service data
  const services = [
    {
      key: 'wordpress',
      name: 'WordPress',
      title: 'WordPress',
      color: '#1e90ff',
      description: 'Flexible and easy-to-manage WordPress websites tailored to your goals.',
      imagePath: '/images/Wordpress.png',
      odd: true, // Used to determine layout pattern (true = image at top for desktop)
      transitionDelay: '0.2s',
      imageMarginTop: { 
        mobile: '-40px', 
        tablet: '0', 
        desktop: '39px' 
      }
    },
    {
      key: 'shopify',
      name: 'Shopify',
      title: 'Shopify',
      color: '#95d600',
      description: 'Scalable, user-friendly Shopify stores built for seamless eCommerce experiences.',
      imagePath: '/images/shopify.png',
      odd: false, // Used to determine layout pattern (false = text at top for desktop)
      transitionDelay: '0.4s',
      imageMarginTop: { 
        mobile: '-85px', 
        tablet: '0', 
        desktop: '0' 
      }
    },
    {
      key: 'pos',
      name: 'Point Of Sale',
      title: 'Point Of Sale',
      color: '#F26322',
      description: 'Powerful Magento solutions designed for high-performance online stores.',
      imagePath: '/images/Magento.png',
      odd: true, // Used to determine layout pattern (true = image at top for desktop)
      transitionDelay: '0.6s',
      imageMarginTop: { 
        mobile: '-60px', 
        tablet: '0', 
        desktop: '-5px' 
      }
    },
    {
      key: 'custom',
      name: 'Custom',
      title: 'Custom',
      color: '#A66DD4',
      description: 'Fully custom-built websites crafted from scratch to meet unique business needs.',
      imagePath: '/images/image.png',
      odd: false, // Used to determine layout pattern (false = text at top for desktop)
      transitionDelay: '0.8s',
      imageMarginTop: { 
        mobile: '-80px', 
        tablet: '0', 
        desktop: '0' 
      }
    }
  ];

  useEffect(() => {
    // Trigger animations after component mounts
    setIsVisible(true);
    
    // Check device type based on screen size
    const checkDeviceType = () => {
      const width = window.innerWidth;
      if (width <= 768) {
        setDeviceType('mobile');
      } else if (width <= 1024) {
        setDeviceType('tablet');
      } else {
        setDeviceType('desktop');
      }
    };
    
    // Initial check
    checkDeviceType();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkDeviceType);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkDeviceType);
  }, []);

  // Determine if mobile layout should be used
  const isMobile = deviceType === 'mobile';
  const isTablet = deviceType === 'tablet';
  
  // Button component for sections
  const handleSectionClick = (section) => {
    if (isMobile || isTablet) {
      if (activeSection === section) {
        // If already active, deactivate it
        setActiveSection(null);
      } else {
        // Activate the clicked section
        setActiveSection(section);
      }
    }
  };

  // Function to convert hex color to rgba for background
  const hexToRgba = (hex, alpha = 0.15) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  return (
    <Container isTablet={isTablet}>
      {/* Header Section */}
      <Header isVisible={isVisible} isTablet={isTablet}>
        <Title isMobile={isMobile} isTablet={isTablet}>
          Web Development
        </Title>
        <Subtitle isMobile={isMobile} isTablet={isTablet}>
          Tailored For <HighlightSpan>Clients</HighlightSpan> Needs
        </Subtitle>
        <Description isTablet={isTablet}>
          From popular platforms to custom builds — we develop solutions that fit your business perfectly.
        </Description>
      </Header>

      {/* Services Section - Responsive Layout */}
      <ServicesContainer>
        {/* Dynamically render all services */}
        {services.map((service, index) => {
          const isHovered = hoveredSection === service.key;
          const isActive = activeSection === service.key;
          const backgroundColor = hexToRgba(service.color);
          
          return (
            <ServiceSection 
              key={service.key}
              isMobile={isMobile}
              isTablet={isTablet}
              isVisible={isVisible}
              isHovered={isHovered}
              isActive={isActive}
              odd={service.odd}
              backgroundColor={backgroundColor}
              transitionDelay={service.transitionDelay}
              onMouseEnter={() => !isMobile && !isTablet && setHoveredSection(service.key)}
              onMouseLeave={() => !isMobile && !isTablet && setHoveredSection(null)}
              onClick={() => (isMobile || isTablet) && handleSectionClick(service.key)} 
            >
              {/* Vertical indicator bar for mobile/tablet */}
              {(isMobile || isTablet) && (
                <VerticalBar color={service.color}>
                  <VerticalShimmerEffect />
                </VerticalBar>
              )}
              
              {/* Content layout based on device type and odd/even pattern */}
              <Content 
                isMobile={isMobile} 
                marginLeft={isMobile ? (index === 0 ? '-10px' : '45px') : '0'}
              >
                {/* Mobile layout is always the same */}
                {isMobile ? (
                  <>
                    <ImageContainer isMobile={isMobile} isTablet={isTablet} odd={service.odd}>
                      <ServiceImage 
                        src={service.imagePath} 
                        alt={service.name} 
                        isMobile={isMobile}
                        isTablet={isTablet}
                        marginTop={service.imageMarginTop.mobile}
                      />
                    </ImageContainer>
                    <TextContainer isMobile={isMobile} odd={service.odd}>
                      <Heading 
                        isMobile={isMobile} 
                        isTablet={isTablet} 
                        marginTop={
                          index === 0 ? '20px' : 
                          index === 1 ? '-30px' : 
                          index === 2 ? '-10px' : 
                          '-20px'
                        }
                      >
                        {service.name}
                      </Heading>
                      <Paragraph 
                        isMobile={isMobile} 
                        isTablet={isTablet}
                        marginTop={
                          index === 0 ? '15px' : 
                          index === 1 ? '25px' : 
                          index === 2 ? '25px' : 
                          '-70px'
                        }
                        marginLeft={index === 0 ? '-7px' : '2px'}
                      >
                        {service.description}
                      </Paragraph>
                    </TextContainer>
                  </>
                ) : (
                  // Desktop/Tablet layout (varies based on odd/even)
                  service.odd ? (
                    // For odd sections (WordPress, Point of Sale)
                    <>
                      <ImageContainer 
                        isMobile={isMobile} 
                        isTablet={isTablet} 
                        odd={service.odd}
                      >
                        <ServiceImage 
                          src={service.imagePath} 
                          alt={service.name} 
                          isMobile={isMobile}
                          isTablet={isTablet}
                          marginTop={isTablet ? service.imageMarginTop.tablet : service.imageMarginTop.desktop}
                        />
                      </ImageContainer>
                      <HorizontalBar color={service.color}>
                        <HorizontalShimmerEffect />
                      </HorizontalBar>
                      <TextContainer isMobile={isMobile} odd={service.odd}>
                        <Heading 
                          isMobile={isMobile} 
                          isTablet={isTablet} 
                          marginTop={index === 2 ? '14px' : '0'}
                        >
                          {service.name}
                        </Heading>
                        <Paragraph isMobile={isMobile} isTablet={isTablet}>
                          {service.description}
                        </Paragraph>
                      </TextContainer>
                    </>
                  ) : (
                    // For even sections (Shopify, Custom)
                    <>
                      <Paragraph 
                        isMobile={isMobile} 
                        isTablet={isTablet} 
                        marginTop={index === 1 ? '21px' : '61px'}
                      >
                        {service.description}
                      </Paragraph>
                      <Heading isMobile={isMobile} isTablet={isTablet}>
                        {service.name}
                      </Heading>
                      <HorizontalBar color={service.color} margin="1px">
                        <HorizontalShimmerEffect />
                      </HorizontalBar>
                      <ImageContainer 
                        isMobile={isMobile} 
                        isTablet={isTablet} 
                        odd={service.odd}
                        marginTop={index === 3 ? '-11px' : '0'}
                      >
                        <ServiceImage 
                          src={service.imagePath} 
                          alt={service.name} 
                          isMobile={isMobile}
                          isTablet={isTablet}
                        />
                      </ImageContainer>
                    </>
                  )
                )}
              </Content>
              
              {/* Section Button (visible on hover for desktop, always visible on mobile/tablet) */}
              {(isMobile || isTablet || (!isMobile && !isTablet && isHovered)) && (
                <ButtonContainer isMobile={isMobile} isTablet={isTablet}>
                  <Button 
                    color={service.color}
                    isMobile={isMobile} 
                    isTablet={isTablet}
                    isActive={isActive}
                    onClick={() => handleSectionClick(service.key)}
                  >
                    {service.title} Development <ButtonArrow>→</ButtonArrow>
                  </Button>
                </ButtonContainer>
              )}
            </ServiceSection>
          );
        })}
      </ServicesContainer>
    </Container>
  );
};

export default WebDevelopmentComponent;