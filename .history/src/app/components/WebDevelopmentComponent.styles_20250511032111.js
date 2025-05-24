// If you want to move from inline styles to styled-components, here's how you could implement it:

// First, install styled-components:
// npm install styled-components

// Then create a file called WebDevelopmentComponent.styles.js:

import styled, { css, keyframes } from 'styled-components';

// Keyframes for animations
export const shimmer = keyframes`
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
`;

export const verticalShimmer = keyframes`
  0% {
    top: -100%;
  }
  100% {
    top: 100%;
  }
`;

export const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

export const highlight = keyframes`
  0% {
    text-shadow: 0 0 5px rgba(10, 172, 220, 0.5);
  }
  50% {
    text-shadow: 0 0 20px rgba(10, 172, 220, 1);
  }
  100% {
    text-shadow: 0 0 5px rgba(10, 172, 220, 0.5);
  }
`;

// Container styles
export const Container = styled.div`
  width: 100%;
  background-color: #0b0f21;
  color: white;
  font-family: Arial, sans-serif;
  padding: ${props => props.isTablet ? '60px 0' : '80px 0'};
  text-align: center;
  overflow: hidden;
  position: relative;
`;

export const Header = styled.div`
  max-width: ${props => props.isTablet ? '900px' : '1200px'};
  margin: 0 auto;
  padding: 0 10px;
  opacity: ${props => props.isVisible ? 1 : 0};
  transform: ${props => props.isVisible ? 'translateY(0)' : 'translateY(30px)'};
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
`;

export const Title = styled.h1`
  font-size: ${props => props.isMobile ? '32px' : props.isTablet ? '38px' : '42px'};
  font-weight: 600;
  margin: 20px 0 10px;
  line-height: 1.2;
`;

export const Subtitle = styled.h2`
  font-size: ${props => props.isMobile ? '28px' : props.isTablet ? '32px' : '36px'};
  font-weight: 500;
  margin: 0 0 30px;
  line-height: 1.2;
`;

export const HighlightSpan = styled.span`
  color: #0aacdc;
  position: relative;
  display: inline-block;
  animation: ${highlight} 3s ease-in-out infinite;
`;

export const Description = styled.p`
  font-size: ${props => props.isTablet ? '16px' : '18px'};
  max-width: ${props => props.isTablet ? '700px' : '800px'};
  margin: 0 auto 60px;
  line-height: 1.5;
`;

export const ServicesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 100%;
  margin: 0 auto 20px;
  gap: 0;
  position: relative;
`;

export const ServiceSection = styled.div`
  flex: 1;
  min-width: ${props => props.isMobile ? '100%' : props.isTablet ? '50%' : '25%'};
  max-width: ${props => props.isMobile ? '100%' : props.isTablet ? '50%' : '25%'};
  display: flex;
  flex-direction: ${props => props.isMobile ? 'row' : 'column'};
  align-items: ${props => props.isMobile ? 'flex-start' : 'center'};
  text-align: ${props => props.isMobile ? 'left' : 'center'};
  margin-top: ${props => 
    props.isMobile ? '0px' : 
    props.isTablet ? (props.odd ? '0' : '30px') : 
    props.odd ? '0' : '1.25px'
  };
  margin-left: 0;
  padding: ${props => 
    props.isMobile ? '20px 15px 90px' : 
    props.isTablet ? '20px 10px 120px' : 
    '20px 0 150px'
  };
  opacity: ${props => props.isVisible ? 1 : 0};
  transform: ${props => props.isVisible ? 'translateY(0)' : 'translateY(50px)'};
  transition: opacity 0.8s ease-out ${props => props.transitionDelay}, 
    transform 0.8s ease-out ${props => props.transitionDelay}, 
    background-color 0.3s ease;
  position: relative;
  background-color: ${props => 
    ((!props.isMobile && props.isHovered) || 
    ((props.isMobile || props.isTablet) && props.isActive)) 
    ? props.backgroundColor : 'transparent'
  };
`;

export const VerticalBar = styled.div`
  width: 3px;
  height: 100%;
  position: absolute;
  left: 4px;
  top: 0;
  background-color: ${props => props.color};
  overflow: hidden;
  z-index: 1;
`;

export const VerticalShimmerEffect = styled.div`
  position: absolute;
  top: -100%;
  left: 0;
  width: 100%;
  height: 130%;
  background: linear-gradient(0deg, transparent, rgba(255,255,255,0.8), transparent);
  animation: ${verticalShimmer} 2s infinite;
`;

export const Content = styled.div`
  width: ${props => props.isMobile ? '75%' : '100%'};
  display: flex;
  flex-direction: ${props => props.isMobile ? 'row' : 'column'};
  align-items: ${props => props.isMobile ? 'center' : 'center'};
  margin-left: ${props => props.isMobile ? props.marginLeft : '0'};
  margin-top: ${props => props.isMobile ? '0' : '0'};
`;

export const ImageContainer = styled.div`
  width: ${props => props.isMobile ? '80px' : props.isTablet ? '110px' : '140px'};
  height: ${props => props.isMobile ? '80px' : props.isTablet ? '110px' : '140px'};
  margin-bottom: ${props => props.isMobile ? '0' : '20px'};
  margin-right: ${props => props.isMobile ? '20px' : '0'};
  margin-top: ${props => !props.isMobile && !props.odd ? 'auto' : props.marginTop || '0'};
  display: flex;
  justify-content: center;
  align-items: center;
  order: ${props => !props.isMobile && !props.odd ? 2 : 0};
  border-radius: 50%;
`;

export const ServiceImage = styled.img`
  width: ${props => props.isMobile ? '80px' : props.isTablet ? '110px' : '140px'};
  height: ${props => props.isMobile ? '80px' : props.isTablet ? '110px' : '140px'};
  margin-top: ${props => props.marginTop || '0'};
  object-fit: contain;
  display: block;
`;

export const TextContainer = styled.div`
  text-align: ${props => props.isMobile ? 'left' : 'center'};
  width: ${props => props.isMobile ? 'calc(100% - 100px)' : '100%'};
  order: ${props => !props.isMobile && !props.odd ? 1 : 0};
  margin-top: ${props => props.marginTop || '0'};
`;

export const HorizontalBar = styled.div`
  width: 100%;
  height: 5px;
  background-color: ${props => props.color};
  margin: 0 0 ${props => props.margin || '15px'};
  position: relative;
  overflow: hidden;
  order: ${props => props.order || 'unset'};
`;

export const H