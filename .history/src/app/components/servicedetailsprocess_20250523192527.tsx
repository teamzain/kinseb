'use client';
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useParams } from 'next/navigation';

interface ProcessStep {
  number: string;
  title: string;
  description: string;
  bulletPoints: string[];
  image: string;
}

interface ProcessHeader {
  title: string;
  subtitle: string;
}

interface ServiceData {
  id: string;
  title: string;
  processSteps: ProcessStep[];
  processHeader: ProcessHeader;
}

interface WebDesignProcessProps {
  serviceId?: string;  // <-- Change number to string
}

type DeviceType = 'mobile' | 'tablet' | 'desktop';

const WebDesignProcess: React.FC<WebDesignProcessProps> = ({ serviceId }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [deviceType, setDeviceType] = useState<DeviceType>('desktop');
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [animationFrame, setAnimationFrame] = useState<number | null>(null);
  const [serviceData, setServiceData] = useState<ServiceData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const pausedTimeRef = useRef<number | null>(null);
  const animationStartTimeRef = useRef<number | null>(null);
  const lastStepTimeRef = useRef<number | null>(null);
  
  // Get the current service ID from the URL params
  const params = useParams();
const currentServiceId = useMemo(() => {
  return serviceId || params?.id || "web-design";  // Use string default
}, [serviceId, params?.id]);
  
  // Duration for each step in milliseconds
  const STEP_DURATION = 3000;
  const LAST_STEP_DISPLAY_DURATION = 1000;
const servicesData = {
  "services": [
    {
      "id": "web-design",
      "title": "Website Design Services",
      "description": "Creating sleek, strategic websites tailored to your brand.",
      "longDescription": "Our website design services focus on creating visually stunning, functionally superior websites that align perfectly with your brand identity. We combine modern aesthetics with strategic UX principles to ensure your site not only looks great but also drives conversions.",
      "price": "$1,500 - $5,000",
      "duration": "3-6 weeks",
      "featured": true,
      "image": "/images/website-design.jpg",
      "processSteps": [
        {
          "number": "01",
          "title": "Discovery & Research",
          "description": "We begin by understanding your business goals, target audience, and technical requirements to create a strategic foundation for your website.",
          "bulletPoints": [
            "Conduct stakeholder interviews and requirement gathering",
            "Research your target audience and user personas",
            "Analyze competitors and market trends",
            "Define project scope and success metrics"
          ],
          "image": "/images/processa12 1.png"
        },
        {
          "number": "02",
          "title": "Strategy & Structure",
          "description": "We utilize proven techniques to map your content, meet user intentions and create an engaging user experience. By outlining your site's structure, we ensure seamless user journeys to key conversion points.",
          "bulletPoints": [
            "Develop a base-level user flow & sitemap",
            "Utilize wireframing to create a seamless conversion funnel",
            "Add on-brand, consistent messaging to your structure"
          ],
          "image": "/images/processa12 1.png"
        },
        {
          "number": "03",
          "title": "Creative Design",
          "description": "This stage is where we take your site come to life. Our award-winning designers implement your unique branding elements to your custom web design.",
          "bulletPoints": [
            "Thoughtfully place design features to guide the user journey",
            "Utilize interactive videos & animations",
            "Create custom, branded illustrations",
            "Ensure accessibility & search engine optimization"
          ],
          "image": "/images/processa12 1.png"
        },
        {
          "number": "04",
          "title": "Responsive Development",
          "description": "A responsive website is fast, accessible and easy to navigate. It automatically scales to various screen sizes and devices, driving user experience and climbing search engine rankings.",
          "bulletPoints": [
            "Transform your wireframes into a flexible UI",
            "Implement responsive design across all devices",
            "Optimize for speed and performance"
          ],
          "image": "/images/processa12 1.png"
        },
        {
          "number": "05",
          "title": "Quality Assurance",
          "description": "All projects focus on delivering measurable results and professional outcomes. By following a strict quality assurance protocol, we guarantee a high-quality digital experience for your brand.",
          "bulletPoints": [
            "Actively involve our clients throughout every project",
            "Meticulously test all designs to catch errors",
            "Use tried and tested tools to ensure quality before launch"
          ],
          "image": "/images/processa12 1.png"
        },
        {
          "number": "06",
          "title": "Launch & Optimization",
          "description": "We launch your website with comprehensive optimization and provide ongoing support to ensure continued success and performance.",
          "bulletPoints": [
            "Deploy website to production environment",
            "Implement analytics and tracking",
            "Provide training and documentation",
            "Monitor performance and make adjustments"
          ],
          "image": "/images/processa12 1.png"
        }
      ],
      "processHeader": {
        "title": "Our Website Design Process",
        "subtitle": "From research to results — here's how we turn ideas into impactful websites."
      },
      "whyYourBusinessNeeds": {
        "paragraph": "A professionally designed website is crucial for establishing immediate trust and credibility with your audience. It serves as the foundation for every customer interaction, guiding them seamlessly from initial interest to conversion and building lasting relationships with your brand.",
        "cards": [
          {
            "number": "01",
            "title": "Conversion-Focused Design",
            "description": "Custom web design solutions fully optimized to drive more sales and leads through strategic layout and user experience optimization."
          },
          {
            "number": "02",
            "title": "Industry-Specific Solutions",
            "description": "Designs tailored to your unique industry with B2B, services, and ecommerce best practices integrated seamlessly."
          },
          {
            "number": "03",
            "title": "Mobile-First Approach",
            "description": "Responsive designs that prioritize mobile user experience, ensuring your site performs perfectly across all devices and screen sizes."
          },
          {
            "number": "04",
            "title": "SEO-Optimized Structure",
            "description": "Strategic site architecture built for search engine visibility, helping your business rank higher and attract more organic traffic."
          }
        ]
      }
    },
    {
      "id": "website-redesign",
      "title": "Website Redesign",
      "description": "Revamping outdated sites into modern, high-performing platforms.",
      "longDescription": "Transform your outdated website into a modern, high-performing digital powerhouse. Our comprehensive redesign process analyzes your current site's performance, identifies opportunities for improvement, and implements strategic updates to boost user engagement, conversion rates, and search engine rankings.",
      "price": "$2,000 - $6,000",
      "duration": "4-8 weeks",
      "featured": false,
      "image": "/images/website-redesign.jpg",
      "processSteps": [
        {
          "number": "01",
          "title": "Website Audit & Analysis",
          "description": "We conduct a comprehensive analysis of your current website to identify strengths, weaknesses, and opportunities for improvement.",
          "bulletPoints": [
            "Perform technical SEO audit and performance analysis",
            "Analyze user behavior through analytics data",
            "Review current content and information architecture",
            "Assess design elements and user experience issues"
          ],
          "image": "/images/processa12 1.png"
        },
        {
          "number": "02",
          "title": "Redesign Strategy",
          "description": "Based on our audit findings, we develop a strategic roadmap for your website redesign that addresses key issues and maximizes improvements.",
          "bulletPoints": [
            "Define redesign goals and success metrics",
            "Create new site architecture and navigation structure",
            "Plan content migration and optimization strategy",
            "Establish design direction and visual guidelines"
          ],
          "image": "/images/processa12 1.png"
        },
        {
          "number": "03",
          "title": "Modern Design Creation",
          "description": "We create contemporary designs that align with current web standards while maintaining your brand identity and improving user experience.",
          "bulletPoints": [
            "Design modern, conversion-focused layouts",
            "Implement responsive design for all devices",
            "Integrate updated branding and visual elements",
            "Optimize user interface for better engagement"
          ],
          "image": "/images/processa12 1.png"
        },
        {
          "number": "04",
          "title": "Content Migration",
          "description": "We carefully migrate and optimize your existing content while implementing new structures and improving SEO performance.",
          "bulletPoints": [
            "Migrate valuable content to new structure",
            "Optimize content for search engines",
            "Implement proper URL redirects",
            "Update and refresh outdated information"
          ],
          "image": "/images/processa12 1.png"
        },
        {
          "number": "05",
          "title": "Performance Optimization",
          "description": "We enhance your website's speed, functionality, and overall performance to deliver superior user experiences.",
          "bulletPoints": [
            "Optimize images and media files",
            "Implement caching and compression",
            "Improve site loading speeds",
            "Enhance mobile responsiveness"
          ],
          "image": "/images/processa12 1.png"
        },
        {
          "number": "06",
          "title": "Launch & Monitoring",
          "description": "We launch your redesigned website and monitor its performance to ensure all improvements are working effectively.",
          "bulletPoints": [
            "Deploy redesigned website to live environment",
            "Monitor site performance and user behavior",
            "Make post-launch adjustments as needed",
            "Provide training on new features and functionality"
          ],
          "image": "/images/processa12 1.png"
        }
      ],
      "processHeader": {
        "title": "Our Website Redesign Process",
        "subtitle": "Transforming outdated websites into modern, high-performing digital assets."
      },
      "whyYourBusinessNeeds": {
        "paragraph": "An outdated website can significantly harm your business credibility and conversion rates. A strategic redesign improves user experience, increases search engine rankings, and ensures your digital presence reflects your current brand standards and business capabilities.",
        "cards": [
          {
            "number": "01",
            "title": "Improved Performance",
            "description": "Faster loading speeds and better functionality that enhance user experience and search engine rankings."
          },
          {
            "number": "02",
            "title": "Modern Design Standards",
            "description": "Contemporary design that meets current user expectations and industry best practices."
          },
          {
            "number": "03",
            "title": "Enhanced User Experience",
            "description": "Improved navigation, accessibility, and overall usability that keeps visitors engaged longer."
          },
          {
            "number": "04",
            "title": "Better Conversion Rates",
            "description": "Optimized layouts and user flows designed to convert more visitors into customers."
          }
        ]
      }
    },
    {
      "id": "web-app-design",
      "title": "Web App Design",
      "description": "Designing intuitive web applications focused on user experience.",
      "longDescription": "We specialize in creating sophisticated, user-friendly web applications that solve complex problems with elegant simplicity. Our web app design process combines deep user research, strategic information architecture, and intuitive interface design to deliver powerful digital tools that users love to engage with.",
      "price": "$3,000 - $10,000",
      "duration": "6-12 weeks",
      "featured": false,
      "image": "/images/web-app-design.jpg",
      "processSteps": [
        {
          "number": "01",
          "title": "Requirements & Research",
          "description": "We dive deep into understanding your web application's purpose, user needs, and technical requirements to establish a solid foundation.",
          "bulletPoints": [
            "Conduct stakeholder interviews and requirements gathering",
            "Research target users and create detailed personas",
            "Analyze competitor apps and market standards",
            "Define functional specifications and user stories"
          ],
          "image": "/images/processa12 1.png"
        },
        {
          "number": "02",
          "title": "Information Architecture",
          "description": "We structure your web application's information and functionality to create logical, intuitive user flows and navigation patterns.",
          "bulletPoints": [
            "Create detailed user flow diagrams",
            "Design information hierarchy and navigation",
            "Plan feature organization and accessibility",
            "Establish data relationships and structures"
          ],
          "image": "/images/processa12 1.png"
        },
        {
          "number": "03",
          "title": "Wireframing & Prototyping",
          "description": "We create interactive wireframes and prototypes that allow you to test and refine the user experience before visual design begins.",
          "bulletPoints": [
            "Develop low-fidelity wireframes for all screens",
            "Create interactive prototypes for user testing",
            "Map out complex user interactions and workflows",
            "Validate functionality through prototype testing"
          ],
          "image": "/images/processa12 1.png"
        },
        {
          "number": "04",
          "title": "UI Design System",
          "description": "We design a comprehensive user interface system with consistent components, patterns, and visual elements for your web application.",
          "bulletPoints": [
            "Create cohesive visual design language",
            "Design reusable UI components and patterns",
            "Establish color palettes and typography systems",
            "Develop responsive design guidelines"
          ],
          "image": "/images/processa12 1.png"
        },
        {
          "number": "05",
          "title": "User Testing & Refinement",
          "description": "We test our designs with real users to validate usability and make data-driven improvements to the interface and experience.",
          "bulletPoints": [
            "Conduct usability testing sessions",
            "Gather user feedback on interface design",
            "Analyze user behavior and pain points",
            "Refine designs based on testing insights"
          ],
          "image": "/images/processa12 1.png"
        },
        {
          "number": "06",
          "title": "Developer Handoff",
          "description": "We provide comprehensive design specifications and assets to ensure seamless implementation of your web application design.",
          "bulletPoints": [
            "Create detailed design specifications",
            "Provide all necessary design assets and files",
            "Document interaction behaviors and animations",
            "Support development team during implementation"
          ],
          "image": "/images/processa12 1.png"
        }
      ],
      "processHeader": {
        "title": "Our Web App Design Process",
        "subtitle": "Creating powerful, user-friendly web applications through strategic design and testing."
      },
      "whyYourBusinessNeeds": {
        "paragraph": "A well-designed web application can transform your business operations and customer interactions. Professional web app design ensures your software is intuitive, efficient, and delivers real value to users while achieving your business objectives.",
        "cards": [
          {
            "number": "01",
            "title": "User-Centered Design",
            "description": "Interfaces designed around user needs and behaviors for maximum adoption and satisfaction."
          },
          {
            "number": "02",
            "title": "Scalable Architecture",
            "description": "Design systems that grow with your application and accommodate future features seamlessly."
          },
          {
            "number": "03",
            "title": "Reduced Development Costs",
            "description": "Thorough planning and prototyping minimize costly changes during development."
          },
          {
            "number": "04",
            "title": "Competitive Advantage",
            "description": "Superior user experience that differentiates your application in the marketplace."
          }
        ]
      }
    },
    {
      "id": "mobile-app-design",
      "title": "Mobile App Design",
      "description": "Crafting beautiful, functional apps for mobile-first users.",
      "longDescription": "Our mobile app design services create engaging, intuitive experiences specifically optimized for iOS and Android platforms. We focus on native platform conventions, touch-friendly interactions, and performance optimization to ensure your app delivers exceptional user experiences that drive engagement and retention.",
      "price": "$3,500 - $12,000",
      "duration": "6-14 weeks",
      "featured": false,
      "image": "/images/mobile-app-design.jpg",
      "processSteps": [
        {
          "number": "01",
          "title": "App Strategy & Research",
          "description": "We research your target market, analyze competitor apps, and define your mobile app's core functionality and user experience strategy.",
          "bulletPoints": [
            "Conduct market research and competitive analysis",
            "Define target audience and user personas",
            "Establish app goals and key performance indicators",
            "Plan feature set and platform selection (iOS/Android)"
          ],
          "image": "/images/processa12 1.png"
        },
        {
          "number": "02",
          "title": "User Journey Mapping",
          "description": "We map out detailed user journeys and create flow diagrams that optimize the mobile user experience for your specific app functionality.",
          "bulletPoints": [
            "Create comprehensive user flow diagrams",
            "Map onboarding and core user journeys",
            "Plan navigation and information architecture",
            "Define touch interactions and gestures"
          ],
          "image": "/images/processa12 1.png"
        },
        {
          "number": "03",
          "title": "Wireframing & Prototyping",
          "description": "We develop mobile-specific wireframes and interactive prototypes that demonstrate app functionality and user interactions.",
          "bulletPoints": [
            "Create mobile wireframes for all key screens",
            "Develop interactive prototypes for testing",
            "Plan responsive layouts for different screen sizes",
            "Design touch-friendly interface elements"
          ],
          "image": "/images/processa12 1.png"
        },
        {
          "number": "04",
          "title": "Platform-Specific Design",
          "description": "We create native-feeling designs that follow iOS and Android design guidelines while maintaining your brand identity.",
          "bulletPoints": [
            "Design platform-specific UI following native guidelines",
            "Create consistent branding across platforms",
            "Optimize for different screen densities and sizes",
            "Design app icons and launch screens"
          ],
          "image": "/images/processa12 1.png"
        },
        {
          "number": "05",
          "title": "Interaction Design",
          "description": "We design smooth animations, transitions, and micro-interactions that make your app feel responsive and delightful to use.",
          "bulletPoints": [
            "Design micro-interactions and animations",
            "Create smooth transitions between screens",
            "Plan loading states and feedback mechanisms",
            "Optimize touch targets and gesture recognition"
          ],
          "image": "/images/processa12 1.png"
        },
        {
          "number": "06",
          "title": "App Store Optimization",
          "description": "We create app store assets and prepare your app design for successful launch on iOS App Store and Google Play Store.",
          "bulletPoints": [
            "Design app store screenshots and previews",
            "Create app icons optimized for store visibility",
            "Prepare marketing materials for app launch",
            "Provide developer handoff documentation"
          ],
          "image": "/images/processa12 1.png"
        }
      ],
      "processHeader": {
        "title": "Our Mobile App Design Process",
        "subtitle": "Creating engaging mobile experiences that users love and businesses benefit from."
      },
      "whyYourBusinessNeeds": {
        "paragraph": "Mobile apps provide direct access to your customers and create opportunities for deeper engagement. Professional mobile app design ensures your app stands out in crowded app stores and delivers experiences that users want to return to regularly.",
        "cards": [
          {
            "number": "01",
            "title": "Native Platform Optimization",
            "description": "Designs that feel natural on iOS and Android, following platform-specific guidelines and conventions."
          },
          {
            "number": "02",
            "title": "Enhanced User Engagement",
            "description": "Intuitive interfaces and smooth interactions that keep users engaged and returning to your app."
          },
          {
            "number": "03",
            "title": "App Store Success",
            "description": "Optimized app store presence with compelling screenshots and descriptions that drive downloads."
          },
          {
            "number": "04",
            "title": "Performance-Focused Design",
            "description": "Lightweight designs optimized for mobile performance and battery efficiency."
          }
        ]
      }
    },
    {
      "id": "branding",
      "title": "Branding",
      "description": "Building powerful brand identities that truly connect.",
      "longDescription": "Our comprehensive branding services help establish authentic connections between your business and your audience. We develop cohesive brand identities that clearly communicate your values, differentiate you from competitors, and create lasting emotional connections with your target market through strategic positioning and compelling visual identity.",
      "price": "$2,500 - $8,000",
      "duration": "4-8 weeks",
      "featured": false,
      "image": "/images/branding.jpg",
      "processSteps": [
        {
          "number": "01",
          "title": "Brand Discovery",
          "description": "We explore your business values, mission, and market position to understand what makes your brand unique and valuable to customers.",
          "bulletPoints": [
            "Conduct brand audit and competitive analysis",
            "Define brand values, mission, and vision",
            "Research target audience and market positioning",
            "Identify brand personality and tone of voice"
          ],
          "image": "/images/processa12 1.png"
        },
        {
          "number": "02",
          "title": "Brand Strategy",
          "description": "We develop a comprehensive brand strategy that defines your positioning, messaging, and visual direction for consistent market presence.",
          "bulletPoints": [
            "Create brand positioning statement and pillars",
            "Develop messaging framework and key communications",
            "Define brand architecture and hierarchy",
            "Establish brand guidelines and standards"
          ],
          "image": "/images/processa12 1.png"
        },
        {
          "number": "03",
          "title": "Logo Design",
          "description": "We create distinctive logos that capture your brand essence and work effectively across all applications and media formats.",
          "bulletPoints": [
            "Develop multiple logo concepts and variations",
            "Create primary, secondary, and icon versions",
            "Ensure scalability and versatility across media",
            "Design in various formats for different applications"
          ],
          "image": "/images/processa12 1.png"
        },
        {
          "number": "04",
          "title": "Visual Identity System",
          "description": "We design a complete visual identity system including colors, typography, and graphic elements that work cohesively across all touchpoints.",
          "bulletPoints": [
            "Develop color palette and typography system",
            "Create pattern libraries and graphic elements",
            "Design business card and stationery systems",
            "Establish photography and imagery guidelines"
          ],
          "image": "/images/processa12 1.png"
        },
        {
          "number": "05",
          "title": "Brand Applications",
          "description": "We apply your new brand identity across various touchpoints to demonstrate how it works in real-world applications.",
          "bulletPoints": [
            "Design business cards, letterheads, and stationery",
            "Create digital applications and social media templates",
            "Develop packaging and merchandise concepts",
            "Design signage and environmental graphics"
          ],
          "image": "/images/processa12 1.png"
        },
        {
          "number": "06",
          "title": "Brand Guidelines",
          "description": "We compile comprehensive brand guidelines that ensure consistent application of your identity across all future communications and materials.",
          "bulletPoints": [
            "Create detailed brand standards manual",
            "Provide usage guidelines and examples",
            "Include do's and don'ts for brand application",
            "Supply all logo files and brand assets"
          ],
          "image": "/images/processa12 1.png"
        }
      ],
      "processHeader": {
        "title": "Our Branding Process",
        "subtitle": "Building authentic brand identities that resonate with your audience and drive business growth."
      },
      "whyYourBusinessNeeds": {
        "paragraph": "Strong branding differentiates your business in competitive markets and builds emotional connections with customers. Professional brand identity increases recognition, trust, and perceived value, ultimately driving customer loyalty and business growth.",
        "cards": [
          {
            "number": "01",
            "title": "Market Differentiation",
            "description": "Stand out from competitors with a distinctive brand identity that clearly communicates your unique value proposition."
          },
          {
            "number": "02",
            "title": "Customer Trust & Loyalty",
            "description": "Build emotional connections that foster customer loyalty and encourage repeat business and referrals."
          },
          {
            "number": "03",
            "title": "Professional Credibility",
            "description": "Establish immediate credibility and professionalism that attracts customers and business partners."
          },
          {
            "number": "04",
            "title": "Consistent Communications",
            "description": "Ensure all marketing materials and touchpoints reinforce your brand message consistently."
          }
        ]
      }
    },
    {
      "id": "ui-ux-design",
      "title": "UI/UX Design",
      "description": "Creating intuitive interfaces that delight users and drive engagement.",
      "longDescription": "Our UI/UX design services focus on creating intuitive, enjoyable digital experiences that satisfy user needs while achieving business objectives. We combine extensive user research, strategic information architecture, and beautiful visual design to build interfaces that feel natural, efficient, and delightful to use.",
      "price": "$2,500 - $9,000",
      "duration": "4-10 weeks",
      "featured": true,
      "image": "/images/ui-ux-design.jpg",
      "processSteps": [
        {
          "number": "01",
          "title": "User Research",
          "description": "We conduct comprehensive research to understand your users' needs, behaviors, and pain points to inform design decisions.",
          "bulletPoints": [
            "Conduct user interviews and surveys",
            "Create detailed user personas and journey maps",
            "Analyze user behavior through data and analytics",
            "Research competitors and industry best practices"
          ],
          "image": "/images/processa12 1.png"
        },
        {
          "number": "02",
          "title": "Information Architecture",
          "description": "We organize and structure information to create logical, intuitive navigation and content hierarchy that users can easily understand.",
          "bulletPoints": [
            "Create site maps and navigation structures",
            "Develop content organization and hierarchy",
            "Plan user flows and interaction patterns",
            "Design information taxonomy and labeling"
          ],
          "image": "/images/processa12 1.png"
        },
        {
          "number": "03",
          "title": "Wireframing",
          "description": "We create detailed wireframes that establish layout, functionality, and content placement before adding visual design elements.",
          "bulletPoints": [
            "Develop low-fidelity wireframes for all screens",
            "Plan responsive layouts for different devices",
            "Define functional requirements and interactions",
            "Establish content placement and hierarchy"
          ],
          "image": "/images/processa12 1.png"
        },
        {
          "number": "04",
          "title": "Interactive Prototyping",
          "description": "We build interactive prototypes that allow you to experience and test the user interface before final design implementation.",
          "bulletPoints": [
            "Create clickable, interactive prototypes",
            "Demonstrate user flows and interactions",
            "Test functionality and user experience",
            "Gather feedback and iterate on design"
          ],
          "image": "/images/processa12 1.png"
        },
        {
          "number": "05",
          "title": "Visual UI Design",
          "description": "We apply beautiful visual design that enhances usability while creating an engaging and memorable user experience.",
          "bulletPoints": [
            "Design cohesive visual interface elements",
            "Create color schemes and typography systems",
            "Develop iconography and graphic elements",
            "Ensure accessibility and usability standards"
          ],
          "image": "/images/processa12 1.png"
        },
        {
          "number": "06",
          "title": "Usability Testing",
          "description": "We test our designs with real users to validate usability and make data-driven improvements to optimize the user experience.",
          "bulletPoints": [
            "Conduct moderated usability testing sessions",
            "Analyze user behavior and identify pain points",
            "Gather quantitative and qualitative feedback",
            "Iterate designs based on testing insights"
          ],
          "image": "/images/processa12 1.png"
        }
      ],
      "processHeader": {
        "title": "Our UI/UX Design Process",
        "subtitle": "Creating user-centered designs through research, testing, and continuous refinement."
      },
      "whyYourBusinessNeeds": {
        "paragraph": "Exceptional user experience directly impacts customer satisfaction, conversion rates, and business success. Professional UI/UX design ensures your digital products are intuitive, accessible, and enjoyable to use, leading to higher user adoption and retention.",
        "cards": [
          {
            "number": "01",
            "title": "Increased Conversions",
            "description": "Optimized user flows and interfaces that guide users toward desired actions and improve conversion rates."
          },
          {
            "number": "02",
            "title": "Reduced Development Costs",
            "description": "Thorough planning and testing prevent costly redesigns and development changes later in the process."
          },
          {
            "number": "03",
            "title": "Enhanced User Satisfaction",
            "description": "Intuitive, accessible designs that create positive user experiences and encourage repeat usage."
          },
          {
            "number": "04",
            "title": "Data-Driven Decisions",
            "description": "Research-based design decisions that are validated through user testing and analytics insights."
          }
        ]
      }
    },
    {
      "id": "ecommerce-web-design",
      "title": "eCommerce Web Design",
      "description": "Driving sales with stunning, conversion-focused store designs.",
      "longDescription": "We design e-commerce experiences that perfectly balance aesthetic appeal with proven conversion optimization principles. Our e-commerce design services focus on creating trustworthy, user-friendly online stores that guide visitors seamlessly from product discovery through purchase completion, maximizing both user satisfaction and sales revenue.",
      "price": "$3,000 - $12,000",
      "duration": "6-12 weeks",
      "featured": false,
      "image": "/images/ecommerce-design.jpg",
      "processSteps": [
        {
          "number": "01",
          "title": "E-commerce Strategy",
          "description": "We analyze your products, target market, and business goals to develop a comprehensive e-commerce strategy that drives sales.",
          "bulletPoints": [
            "Analyze target market and customer behavior",
            "Research competitors and industry benchmarks",
            "Define e-commerce goals and success metrics",
            "Plan product catalog structure and organization"
          ],
          "image": "/images/processa12 1.png"
        },
        {
          "number": "02",
          "title": "Platform Selection & Planning",
          "description": "We help you choose the right e-commerce platform and plan the technical architecture for optimal performance and scalability.",
          "bulletPoints": [
            "Evaluate and recommend e-commerce platforms",
            "Plan site architecture and navigation structure",
            "Design product categorization and filtering",
            "Plan payment and shipping integrations"
          ],
          "image": "/images/processa12 1.png"
        },
        {
          "number": "03",
          "title": "Conversion-Focused Design",
          "description": "We create designs that prioritize conversion optimization while maintaining visual appeal and brand consistency.",
          "bulletPoints": [
            "Design product pages for maximum conversion",
            "Create compelling shopping cart and checkout flows",
            "Implement trust signals and security features",
            "Optimize for mobile shopping experiences"
          ],
          "image": "/images/processa12 1.png"
        },
        {
          "number": "04",
          "title": "Product Showcase Design",
          "description": "We design engaging product displays that highlight your merchandise effectively and encourage purchases.",
          "bulletPoints": [
            "Create attractive product gallery layouts",
            "Design product detail pages with rich media",
            "Plan product comparison and recommendation features",
            "Design effective search and filtering interfaces"
          ],
          "image": "/images/processa12 1.png"
        },
        {
          "number": "05",
          "title": "Checkout Optimization",
          "description": "We design streamlined checkout processes that minimize cart abandonment and maximize successful transactions.",
          "bulletPoints": [
            "Design simplified, multi-step checkout flows",
            "Implement guest checkout and account options",
            "Integrate secure payment gateway interfaces",
            "Create order confirmation and tracking systems"
          ],
          "image": "/images/processa12 1.png"
        },
        {
          "number": "06",
          "title": "Performance & Launch",
          "description": "We optimize your e-commerce site for speed and performance, then launch with comprehensive testing and monitoring.",
          "bulletPoints": [
            "Optimize site speed and loading performance",
            "Test all e-commerce functionality thoroughly",
            "Implement analytics and conversion tracking",
            "Provide training on store management and updates"
          ],
          "image": "/images/processa12 1.png"
        }
      ],
      "processHeader": {
        "title": "Our E-commerce Design Process",
        "subtitle": "Building high-converting online stores that drive sales and customer satisfaction."
      },
      "whyYourBusinessNeeds": {
        "paragraph": "Professional e-commerce design directly impacts your bottom line through improved conversion rates and customer experience. A well-designed online store builds trust, simplifies the buying process, and encourages repeat purchases, leading to sustainable business growth.",
        "cards": [
          {
            "number": "01",
            "title": "Higher Conversion Rates",
            "description": "Optimized checkout flows and product pages that convert more visitors into paying customers."
          },
          {
            "number": "02",
            "title": "Mobile Commerce Ready",
            "description": "Mobile-optimized designs that capture the growing mobile shopping market effectively."
          },
          {
            "number": "03",
            "title": "Trust & Security",
            "description": "Professional design that builds customer confidence and incorporates security best practices."
          },
          {
            "number": "04",
            "title": "Scalable Growth",
            "description": "Platform architecture that supports business growth and expanding product catalogs."
          }
        ]
      }
    }
  ]
};
useEffect(() => {
  try {
    setLoading(true);
    const service = servicesData.services.find((s: any) => s.id === currentServiceId);
    if (!service) {
      throw new Error(`Service with ID ${currentServiceId} not found`);
    }
    
    setServiceData(service);
    setError(null);
  } catch (err) {
    console.error('Error loading service data:', err);
    setError(err instanceof Error ? err.message : 'Unknown error occurred');
  } finally {
    setLoading(false);
  }
}, [currentServiceId]);
  const processSteps: ProcessStep[] = serviceData?.processSteps || [];
  const TOTAL_DURATION = STEP_DURATION * processSteps.length;

  // Calculate which steps to show based on device
  const getVisibleSteps = useCallback(() => {
    const visibleSteps: { step: ProcessStep; index: number }[] = [];
    
    if (deviceType === 'mobile') {
      if (processSteps[currentIndex]) {
        visibleSteps.push({
          step: processSteps[currentIndex],
          index: currentIndex
        });
      }
    } else {
      if (currentIndex === 0) {
        if (processSteps[0]) {
          visibleSteps.push({
            step: processSteps[0],
            index: 0
          });
        }
        
        if (processSteps[1]) {
          visibleSteps.push({
            step: processSteps[1],
            index: 1
          });
        }
      } 
      else if (currentIndex === processSteps.length - 1 || currentIndex === processSteps.length - 2) {
        if (processSteps[processSteps.length - 2]) {
          visibleSteps.push({
            step: processSteps[processSteps.length - 2],
            index: processSteps.length - 2
          });
        }
        
        if (processSteps[processSteps.length - 1]) {
          visibleSteps.push({
            step: processSteps[processSteps.length - 1],
            index: processSteps.length - 1
          });
        }
      }
      else {
        if (processSteps[currentIndex]) {
          visibleSteps.push({
            step: processSteps[currentIndex],
            index: currentIndex
          });
        }
        
        if (currentIndex + 1 < processSteps.length && processSteps[currentIndex + 1]) {
          visibleSteps.push({
            step: processSteps[currentIndex + 1],
            index: currentIndex + 1
          });
        }
      }
    }
    
    return visibleSteps;
  }, [deviceType, currentIndex, processSteps]);

  // Check device type
  const checkDeviceType = useCallback(() => {
    const width = window.innerWidth;
    if (width < 768) {
      setDeviceType('mobile');
    } else if (width >= 768 && width < 1024) {
      setDeviceType('tablet');
    } else {
      setDeviceType('desktop');
    }
  }, []);

  // Handle auto-scrolling animation
  const animateAutoScroll = useCallback((timestamp: number): void => {
    if (processSteps.length === 0) return;

    if (isHovered) {
      if (!pausedTimeRef.current) {
        pausedTimeRef.current = timestamp;
      }
      const frame = requestAnimationFrame(animateAutoScroll);
      setAnimationFrame(frame);
      return;
    } else if (pausedTimeRef.current) {
      if (animationStartTimeRef.current) {
        const pauseDuration = timestamp - pausedTimeRef.current;
        animationStartTimeRef.current += pauseDuration;
      }
      pausedTimeRef.current = null;
    }
    
    if (!animationStartTimeRef.current) {
      animationStartTimeRef.current = timestamp;
    }

    const elapsed = timestamp - (animationStartTimeRef.current || timestamp);
    const progress = Math.min(elapsed / TOTAL_DURATION, 1);
    
    const stepIndex = Math.min(
      Math.floor(progress * processSteps.length),
      processSteps.length - 1
    );
    
    if (stepIndex === processSteps.length - 1) {
      if (!lastStepTimeRef.current) {
        lastStepTimeRef.current = timestamp;
        setCurrentIndex(processSteps.length - 1);
      } 
      else if (timestamp - lastStepTimeRef.current >= LAST_STEP_DISPLAY_DURATION) {
        animationStartTimeRef.current = timestamp;
        setCurrentIndex(0);
        lastStepTimeRef.current = null;
      }
    } else {
      lastStepTimeRef.current = null;
      
      if (stepIndex !== currentIndex) {
        setCurrentIndex(stepIndex);
      }
    }
    
    // Update progress bar
    const stepProgress = (progress * processSteps.length) % 1;
    let progressPct: number;
    
    if (deviceType === 'mobile') {
      const baseProgress = (stepIndex / (processSteps.length - 1)) * 100;
      const stepWidth = 100 / (processSteps.length - 1);
      progressPct = baseProgress + (stepProgress * stepWidth);
    } else {
      if (stepIndex === processSteps.length - 1) {
        progressPct = 100;
      } else {
        progressPct = 50 + (stepProgress * 50);
      }
    }
    
    const progressBar = document.querySelector('.progress-fill') as HTMLElement | null;
    if (progressBar) {
      progressBar.style.width = `${progressPct}%`;
    }
    
    const frame = requestAnimationFrame(animateAutoScroll);
    setAnimationFrame(frame);
  }, [processSteps.length, TOTAL_DURATION, isHovered, currentIndex, deviceType]);

  // Handle mouse events for specific elements
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  useEffect(() => {
    checkDeviceType();
    
    window.addEventListener('resize', checkDeviceType);
    
    if (processSteps.length > 0) {
      const frame = requestAnimationFrame(animateAutoScroll);
      setAnimationFrame(frame);
    }
    
    return () => {
      window.removeEventListener('resize', checkDeviceType);
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [checkDeviceType, animateAutoScroll, processSteps.length, animationFrame]);
  
  // Generate dot indicators
  const renderDotIndicators = () => {
    if (deviceType !== 'mobile') {
      return (
        <React.Fragment>
          <div
            style={{
              position: 'absolute',
              width: '14px',
              height: '14px',
              borderRadius: '50%',
              backgroundColor: '#3DB4D0',
              top: '-5px',
              left: '0%',
              transform: 'translateX(0)',
              boxShadow: '0 0 10px rgba(61, 180, 208, 0.8)',
              zIndex: 2,
              margin: '0 20px',
            }}
          />
          
          <div
            style={{
              position: 'absolute',
              width: '14px',
              height: '14px',
              borderRadius: '50%',
              backgroundColor: '#3DB4D0',
              top: '-5px',
              left: '50%',
              transform: 'translateX(-50%)',
              boxShadow: '0 0 10px rgba(61, 180, 208, 0.8)',
              zIndex: 2,
              margin: '0 20px',
            }}
          />
        </React.Fragment>
      );
    }
    
    return processSteps.map((step: ProcessStep, index: number) => {
      const position = (index / (processSteps.length - 1)) * 100;
      
      return (
        <div
          key={index}
          style={{
            position: 'absolute',
            width: index === currentIndex ? '14px' : '10px',
            height: index === currentIndex ? '14px' : '10px',
            borderRadius: '50%',
            backgroundColor: index <= currentIndex ? '#3DB4D0' : 'rgba(255, 255, 255, 0.4)',
            top: '-5px',
            left: `${position}%`,
            transform: 'translateX(-50%)',
            boxShadow: index === currentIndex ? '0 0 10px rgba(61, 180, 208, 0.8)' : 'none',
            zIndex: 2,
            transition: 'width 0.3s, height 0.3s, background-color 0.3s',
          }}
        />
      );
    });
  };

  // Get appropriate styles based on device type
  const getResponsiveStyles = () => {
    const baseStyles = {
      container: {
        height: 'auto',
        minHeight: '100vh',
        padding: '20px 0 40px'
      },
      header: {
        marginBottom: '10px'
      },
      headerTitle: {
        fontSize: '2.25rem',
        lineHeight: '1.2'
      },
      headerDesc: {
        fontSize: '1.125rem'
      },
      content: {
        marginTop: '0'
      },
      stepContainer: {
        flexDirection: 'column' as 'column',
        width: '100%',
        padding: '0 10px',
        marginBottom: '10px'
      },
      imageContainer: {
        width: '100%',
        display: 'flex' as 'flex',
        justifyContent: 'center' as 'center',
        marginBottom: '15px'
      },
      image: {
        width: '100%',
        maxWidth: '180px',
        height: 'auto' as 'auto',
        display: 'block' as 'block',
        marginTop: '0'
      },
      numberContainer: {
        paddingTop: '0',
        width: '100%',
      },
      number: {
        fontSize: '3rem',
        marginBottom: '4px',
        textAlign: 'left' as 'left'
      },
      title: {
        fontSize: '1.4rem',
        minHeight: '2rem',
        textAlign: 'left' as 'left'
      },
      description: {
        fontSize: '0.95rem',
        lineHeight: '1.4',
        marginTop: '7px',
        textAlign: 'left' as 'left'
      },
      bulletPoint: {
        fontSize: '0.95rem',
        marginBottom: '10px',
        paddingLeft: '20px'
      },
      progressContainer: {
        marginTop: '0',
        marginBottom: '5px'
      },
      progressLine: {
        margin: '0 15px'
      }
    };

    if (deviceType === 'tablet') {
      return {
        ...baseStyles,
        container: {
          ...baseStyles.container,
          height: 'auto',
          padding: '40px 0 50px'
        },
        header: {
          marginBottom: '20px'
        },
        headerTitle: {
          fontSize: '2.5rem',
          lineHeight: '1.15'
        },
        content: {
          marginTop: '10px'
        },
        stepContainer: {
          ...baseStyles.stepContainer,
          flexDirection: 'row' as 'row',
          width: '50%',
          padding: '0 15px',
          marginBottom: '5px'
        },
        imageContainer: {
          ...baseStyles.imageContainer,
          width: 'auto',
          marginBottom: '0',
          justifyContent: 'flex-end' as 'flex-end'
        },
        image: {
          ...baseStyles.image,
          maxWidth: '150px',
          marginTop: '90px'
        },
        numberContainer: {
          ...baseStyles.numberContainer,
          paddingTop: '100px',
          textAlign: 'left' as 'left'
        },
        number: {
          ...baseStyles.number,
          fontSize: '3.5rem',
          marginBottom: '6px',
          textAlign: 'left' as 'left'
        },
        title: {
          ...baseStyles.title,
          fontSize: '1.6rem',
          minHeight: '3rem',
          textAlign: 'left' as 'left'
        },
        description: {
          ...baseStyles.description,
          fontSize: '1rem',
          lineHeight: '1.45',
          marginTop: '7px'
        },
        bulletPoint: {
          ...baseStyles.bulletPoint,
          fontSize: '1rem',
          marginBottom: '9px',
          paddingLeft: '20px'
        },
        progressContainer: {
          ...baseStyles.progressContainer,
          marginTop: '-40px',
          marginBottom: '8px'
        },
        progressLine: {
          margin: '0'
        }
      };
    }

    if (deviceType === 'desktop') {
      return {
        ...baseStyles,
        container: {
          ...baseStyles.container,
          height: '100vh',
          padding: '60px 0'
        },
        header: {
          marginBottom: '-100px'
        },
        headerTitle: {
          fontSize: '3rem',
          lineHeight: '1.1'
        },
        content: {
          marginTop: '10px'
        },
        stepContainer: {
          ...baseStyles.stepContainer,
          flexDirection: 'row' as 'row',
          width: '50%',
          padding: '0 20px',
          marginBottom: '0'
        },
        imageContainer: {
          ...baseStyles.imageContainer,
          width: 'auto',
          marginBottom: '0',
        },
        image: {
          ...baseStyles.image,
          width: '220px',
          maxWidth: '220px',
          marginTop: '100px'
        },
        numberContainer: {
          ...baseStyles.numberContainer,
          paddingTop: '140px',
          textAlign: 'left' as 'left'
        },
        number: {
          ...baseStyles.number,
          fontSize: '4rem',
          marginBottom: '8px',
          textAlign: 'left' as 'left'
        },
        title: {
          ...baseStyles.title,
          fontSize: '1.8rem',
          minHeight: '4rem',
          textAlign: 'left' as 'left'
        },
        description: {
          ...baseStyles.description,
          fontSize: '1rem',
          lineHeight: '1.5',
          marginTop: '30px'
        },
        bulletPoint: {
          ...baseStyles.bulletPoint,
          fontSize: '1rem',
          marginBottom: '8px',
          paddingLeft: '10px'
        },
        progressContainer: {
          ...baseStyles.progressContainer,
          marginTop: '-60px',
        },
        progressLine: {
          margin: '0'
        }
      };
    }

    return baseStyles;
  };

  const styles = getResponsiveStyles();

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#0a2942',
        color: 'white',
        fontSize: '1.2rem'
      }}>
        Loading process steps...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#0a2942',
        color: 'white',
        textAlign: 'center',
        padding: '20px'
      }}>
        <h2 style={{ marginBottom: '10px' }}>Error Loading Process</h2>
        <p style={{ marginBottom: '20px' }}>{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          style={{
            padding: '10px 20px',
            backgroundColor: '#3DB4D0',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  if (!serviceData || !processSteps.length) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#0a2942',
        color: 'white'
      }}>
        No process steps found for this service
      </div>
    );
  }

  return (
    <div 
      className="design-process-section"
      style={{
        position: 'relative',
        width: '100%',
        height: deviceType === 'mobile' ? 'auto' : deviceType === 'tablet' ? 'auto' : '85vh',
      }}
    >
      <div 
        ref={containerRef}
        className="design-process-container"
        style={{
          width: '100%',
          height: styles.container.height,
          minHeight: styles.container.minHeight,
          background: 'linear-gradient(180deg, rgba(13, 152, 186, 0.5) 0%, rgba(0, 0, 0, 0.5) 100%), #0a2942',
          color: 'white',
          fontFamily: 'Arial, sans-serif',
          padding: styles.container.padding,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div className="max-w-7xl mx-auto px-4">
          {/* Header section */}
          <div 
            ref={headerRef}
            className="transition-all duration-300"
            style={{
              marginBottom: styles.header.marginBottom,
              textAlign: 'center',
            }}
          >
            <h1 
              className="font-bold mb-2"
              style={{
                fontSize: styles.headerTitle.fontSize,
                lineHeight: styles.headerTitle.lineHeight,
                textAlign: 'center',
                width: '100%'
              }}
            >
              {(serviceData.processHeader?.title || 'Our Design Process').replace(/Process$/, '')} <span style={{ color: '#3DB4D0' }}>Process</span>
            </h1>
            <p className="max-w-3xl mx-auto"
               style={{
                 fontSize: styles.headerDesc.fontSize,
                 textAlign: 'center',
                 width: '100%'
               }}
            >
              {serviceData.processHeader?.subtitle || 'From research to results — here\'s how we deliver exceptional results.'}
            </p>
          </div>
          
          {/* Main content wrapper */}
          <div 
            ref={contentRef}
            style={{
              marginTop: styles.content.marginTop,
            }}
          >
            {/* Content sections */}
            <div className="mb-2 mt-0">
              <div style={{ 
                display: 'flex',
                flexDirection: deviceType === 'mobile' ? 'column' : 'row',
                transition: 'all 0.5s ease'
              }}>
                {getVisibleSteps().map(({ step, index }, position) => (
                  <div 
                    key={index}
                    style={{
                      width: styles.stepContainer.width,
                      padding: styles.stepContainer.padding,
                      flexShrink: 0,
                      marginBottom: styles.stepContainer.marginBottom,
                      animation: `fade-in 0.5s ease-in-out`,
                    }}
                    className="content-step"
                  >
                    {/* For mobile: Image first */}
                    {deviceType === 'mobile' && (
                      <div 
                        style={{
                          width: styles.imageContainer.width,
                          display: styles.imageContainer.display,
                          justifyContent: styles.imageContainer.justifyContent,
                          marginBottom: styles.imageContainer.marginBottom,
                        }}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                      >
                        <img
                          src={step.image}
                          alt={`${step.title} illustration`}
                          style={{
                            width: styles.image.width,
                            maxWidth: styles.image.maxWidth,
                            height: styles.image.height,
                            display: styles.image.display,
                          }}
                        />
                      </div>
                    )}
                    
                    {/* Number and Title */}
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'flex-start',
                      flexDirection: 'row'
                    }}>
                      {/* Left side: Number and Title */}
                      <div 
                        style={{ 
                          flex: '1', 
                          paddingTop: styles.numberContainer.paddingTop,
                          width: styles.numberContainer.width,
                        }}
                      >
                        {/* Number */}
                        <div
                          style={{
                            fontSize: styles.number.fontSize,
                            fontWeight: 'bold',
                            color: '#3DB4D0',
                            lineHeight: '1',
                            marginBottom: styles.number.marginBottom,
                          }}
                          onMouseEnter={handleMouseEnter}
                          onMouseLeave={handleMouseLeave}
                        >
                          {step.number}
                        </div>
                        
                        {/* Title */}
                        <h2
                          style={{
                            fontSize: styles.title.fontSize,
                            fontWeight: 'bold',
                            color: '#ffffff',
                            maxWidth: '100%',
                            minHeight: styles.title.minHeight,
                            lineHeight: '1.2',
                          }}
                          onMouseEnter={handleMouseEnter}
                          onMouseLeave={handleMouseLeave}
                        >
                          {step.title}
                        </h2>
                      </div>
                      
                      {/* Right side: Image (only show on tablet and desktop) */}
                      {deviceType !== 'mobile' && (
                        <div 
                          style={{
                            marginLeft: '0px',
                            alignSelf: 'flex-start',
                            marginTop: '0',
                          }}
                          onMouseEnter={handleMouseEnter}
                          onMouseLeave={handleMouseLeave}
                        >
                          <img
                            src={step.image}
                            alt={`${step.title} illustration`}
                            style={{
                              marginTop: styles.image.marginTop,
                              width: deviceType === 'tablet' ? styles.image.maxWidth : styles.image.width,
                              maxWidth: styles.image.maxWidth,
                              height: 'auto',
                              display: 'block',
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Progress line with dots */}
            <div style={{ 
              marginTop: styles.progressContainer.marginTop, 
              marginBottom: styles.progressContainer.marginBottom,
            }}>
              <div 
                style={{
                  height: '4px',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  position: 'relative',
                  borderRadius: '2px',
                  margin: styles.progressLine.margin,
                }}
              >
                <div
                  className="progress-fill"
                  style={{
                    position: 'absolute',
                    height: '100%',
                    backgroundColor: '#3DB4D0',
                    width: currentIndex === processSteps.length - 1 ? '100%' : 
                           deviceType === 'mobile' ? `${(currentIndex / (processSteps.length - 1)) * 100}%` : '50%',
                    borderRadius: '2px',
                    boxShadow: '0 0 10px rgba(61, 180, 208, 0.7)',
                    transition: 'width 0.3s ease-out',
                  }}
                ></div>
                
                {renderDotIndicators()}
              </div>
            </div>
            
            {/* Description and bullet points */}
            <div className="mt-2">
              <div style={{ 
                display: 'flex',
                flexDirection: deviceType === 'mobile' ? 'column' : 'row'
              }}>
                {getVisibleSteps().map(({ step, index }, position) => (
                  <div 
                    key={index}
                    style={{
                      width: styles.stepContainer.width,
                      padding: styles.stepContainer.padding,
                      flexShrink: 0,
                      marginBottom: deviceType === 'mobile' ? '20px' : deviceType === 'tablet' ? '10px' : '0',
                      animation: `fade-in 0.5s ease-in-out`,
                    }}
                  >
                    <div
                      style={{
                        maxWidth: deviceType === 'mobile' ? '100%' : '90%',
                        overflowWrap: 'break-word',
                        height: '100%',
                      }}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      <p 
                        className="text-base mb-3"
                        style={{
                          fontSize: styles.description.fontSize,
                          lineHeight: styles.description.lineHeight,
                          marginTop: styles.description.marginTop,
                          textAlign: 'left'
                        }}
                      >
                        {step.description}
                      </p>
                      
                      <ul className={`bullet-list ${deviceType === 'mobile' ? 'mobile-bullets' : ''}`}>
                        {step.bulletPoints?.map((point: string, pointIndex: number) => (
                          <li
                            key={pointIndex}
                            style={{
                              fontSize: styles.bulletPoint.fontSize,
                              marginBottom: styles.bulletPoint.marginBottom,
                              paddingLeft: styles.bulletPoint.paddingLeft,
                              position: 'relative',
                              textAlign: 'left'
                            }}
                          >
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* CSS for animations and bullet styling */}
        <style jsx>{`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          .bullet-list {
            list-style-type: disc;
            padding-left: 8px;
            margin-top: 10px;
            margin-left: 17px;
            margin-bottom: 15px;
          }
          
          .bullet-list li {
            margin-left: -10px;
            padding-left: -3;
            margin-bottom: 6px;
          }
          
          .mobile-bullets {
            list-style-type: disc;
            padding-left: 0;
            text-align: left;
            margin-top: 10px;
            margin-left: 0;
            margin-bottom: 15px;
          }

          .mobile-bullets li {
            padding-left: 0;
            margin-left: 15px;
            margin-bottom: 8px;
          }
          .mobile-bullets li:before {
            display: inline-block;
            width: 0.5em;
            margin-right: 0.2em;
          }
        `}</style>
      </div>
    </div>
  );
};

export default WebDesignProcess;