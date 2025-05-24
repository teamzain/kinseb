'use client';
import React, { useState, useEffect, useRef } from 'react';

// Define types for the service data structure
interface ProcessStep {
  number: string;
  title: string;
  description: string;
  bulletPoints: string[];
  image: string;
  alt?: string;
}

interface ProcessHeader {
  title: string;
  subtitle: string;
}

interface ServiceData {
  id: string;
  processSteps: ProcessStep[];
  processHeader: ProcessHeader;
}

interface WebDesignProcessProps {
  serviceId: string;
}

// Services data - you would typically import this from your data file
const servicesData: ServiceData[] = [

    {
      "id": "web-design",
      "title": "Website Design Services",
      "description": "Creating sleek, strategic websites tailored to your brand.",
      "longDescription": "Our website design services focus on creating visually stunning, functionally superior websites that align perfectly with your brand identity. We combine modern aesthetics with strategic UX principles to ensure your site not only looks great but also drives conversions.",
      "price": "$1,500 - $5,000",
      "duration": "3-6 weeks",
      "featured": true,
      "image": "/images/website-design.jpg",
  "faq": [
  {
    "id": "section1",
    "title": "What's included in your web design service?",
    "description": "Our comprehensive service includes custom design, UX/UI optimization, mobile responsiveness, SEO integration, and branded animations to create a unique website that drives conversions."
  },
  {
    "id": "section2",
    "title": "How long does the design process take?",
    "description": "Most website design projects take 3-6 weeks from start to finish. Timeline depends on project complexity, content readiness, and feedback cycles during the design process."
  },
  {
    "id": "section3",
    "title": "Will my website work on mobile devices?",
    "description": "Yes! All our websites are built with a mobile-first approach, ensuring perfect functionality and appearance across all devices and screen sizes."
  },
  {
    "id": "section4",
    "title": "Do you provide ongoing support after launch?",
    "description": "We offer post-launch support including training, documentation, performance monitoring, and are available for future updates and maintenance needs."
  }
],
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
          "image": "/images/step3.png"
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
          "image": "/images/step4.png"
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
          "image": "/images/step5.png"
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
          "image": "/images/step6.png"
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
  "id": "wordpress-web-design",
  
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
      "image": "/images/step3.png"
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
      "image": "/images/step4.png"
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
      "image": "/images/step5.png"
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
      "image": "/images/step6.png"
    }
  ],
  "processHeader": {
    "title": "Our E-commerce Design Process",
    "subtitle": "Building high-converting online stores that drive sales and customer satisfaction."
  },

},
{
  "id": "design-systems",
 
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
      "image": "/images/step3.png"
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
      "image": "/images/step4.png"
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
      "image": "/images/step5.png"
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
      "image": "/images/step6.png"
    }
  ],
  "processHeader": {
    "title": "Our Website Design Process",
    "subtitle": "From research to results — here's how we turn ideas into impactful websites."
  },


},
    {
      "id": "website-redesign",
  
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
          "image": "/images/step3.png"
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
          "image": "/images/step4.png"
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
          "image": "/images/step5.png"
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
          "image": "/images/step6.png"
        }
      ],
      "processHeader": {
        "title": "Our Website Redesign Process",
        "subtitle": "Transforming outdated websites into modern, high-performing digital assets."
      },

    },
    {
      "id": "web-app-design",
  
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
          "image": "/images/step3.png"
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
          "image": "/images/step4.png"
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
          "image": "/images/step5.png"
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
          "image": "/images/step6.png"
        }
      ],
      "processHeader": {
        "title": "Our Web App Design Process",
        "subtitle": "Creating powerful, user-friendly web applications through strategic design and testing."
      },

    },
    {
      "id": "mobile-app-design",
    
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
          "image": "/images/step3.png"
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
          "image": "/images/step4.png"
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
          "image": "/images/step5.png"
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
          "image": "/images/step6.png"
        }
      ],
      "processHeader": {
        "title": "Our Mobile App Design Process",
        "subtitle": "Creating engaging mobile experiences that users love and businesses benefit from."
      },
  
    },
    {
      "id": "branding",
  
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
          "image": "/images/step3.png"
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
          "image": "/images/step4.png"
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
          "image": "/images/step5.png"
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
          "image": "/images/step6.png"
        }
      ],
      "processHeader": {
        "title": "Our Branding Process",
        "subtitle": "Building authentic brand identities that resonate with your audience and drive business growth."
      },

    },
    {
      "id": "ui-ux-design",

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
          "image": "/images/step3.png"
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
          "image": "/images/step4.png"
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
          "image": "/images/step5.png"
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
          "image": "/images/step6.png"
        }
      ],
      "processHeader": {
        "title": "Our UI/UX Design Process",
        "subtitle": "Creating user-centered designs through research, testing, and continuous refinement."
      },
 
    },
    {
      "id": "ecommerce-web-design",
    
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
          "image": "/images/step3.png"
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
          "image": "/images/step4.png"
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
          "image": "/images/step5.png"
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
          "image": "/images/step6.png"
        }
      ],
      "processHeader": {
        "title": "Our E-commerce Design Process",
        "subtitle": "Building high-converting online stores that drive sales and customer satisfaction."
      },

    },
    
    {
      "id": "website-development",
     
      "processSteps": [
        {
          "number": "01",
          "title": "Technical Planning & Setup",
          "description": "We analyze technical requirements and set up the development environment with the optimal technology stack for your project.",
          "bulletPoints": [
            "Analyze technical requirements and specifications",
            "Choose optimal technology stack and frameworks",
            "Set up development environment and version control",
            "Plan database architecture and hosting infrastructure"
          ],
          "image": "/images/processa12 1.png"
        },
        {
          "number": "02",
          "title": "Frontend Development",
          "description": "We code responsive, interactive user interfaces that work seamlessly across all devices and browsers.",
          "bulletPoints": [
            "Convert designs into responsive HTML/CSS code",
            "Implement interactive features and animations",
            "Ensure cross-browser compatibility",
            "Optimize for mobile-first experiences"
          ],
          "image": "/images/step3.png"
        },
        {
          "number": "03",
          "title": "Backend Development",
          "description": "We build robust server-side functionality that powers your website's features and manages data securely.",
          "bulletPoints": [
            "Develop server-side logic and APIs",
            "Implement database design and optimization",
            "Create content management system integration",
            "Build secure user authentication systems"
          ],
          "image": "/images/processa12 1.png"
        },
        {
          "number": "04",
          "title": "Integration & Testing",
          "description": "We integrate all components and conduct comprehensive testing to ensure everything works perfectly together.",
          "bulletPoints": [
            "Integrate frontend and backend components",
            "Implement third-party service integrations",
            "Conduct thorough functionality testing",
            "Perform security and performance testing"
          ],
          "image": "/images/step4.png"
        },
        {
          "number": "05",
          "title": "Performance Optimization",
          "description": "We optimize your website for speed, SEO, and user experience to ensure maximum performance and search visibility.",
          "bulletPoints": [
            "Optimize page loading speeds and performance",
            "Implement SEO best practices and meta tags",
            "Configure caching and compression systems",
            "Optimize images and media files"
          ],
          "image": "/images/step5.png"
        },
        {
          "number": "06",
          "title": "Deployment & Launch",
          "description": "We deploy your website to production servers and provide comprehensive training and documentation.",
          "bulletPoints": [
            "Deploy website to production environment",
            "Configure SSL certificates and security measures",
            "Set up analytics and monitoring tools",
            "Provide training and documentation"
          ],
          "image": "/images/step6.png"
        }
      ],
      "processHeader": {
        "title": "Our Website Development Process",
        "subtitle": "From code to launch — building high-performance websites with modern technology."
      },

    },
    {
      "id": "webapp-development",
      
      "processSteps": [
        {
          "number": "01",
          "title": "Requirements Analysis",
          "description": "We conduct detailed analysis of your business requirements and define the technical specifications for your web application.",
          "bulletPoints": [
            "Gather detailed functional requirements",
            "Define user roles and permission systems",
            "Plan data models and workflow processes",
            "Create technical specifications document"
          ],
          "image": "/images/processa12 1.png"
        },
        {
          "number": "02",
          "title": "System Architecture",
          "description": "We design scalable system architecture that can handle complex business logic and high user loads.",
          "bulletPoints": [
            "Design scalable application architecture",
            "Plan database schema and relationships",
            "Define API structure and endpoints",
            "Choose appropriate technology frameworks"
          ],
          "image": "/images/step3.png"
        },
        {
          "number": "03",
          "title": "Core Development",
          "description": "We build the core functionality of your web application with robust backend systems and intuitive user interfaces.",
          "bulletPoints": [
            "Develop core business logic and features",
            "Build user authentication and authorization",
            "Create responsive user interface components",
            "Implement real-time features and notifications"
          ],
          "image": "/images/processa12 1.png"
        },
        {
          "number": "04",
          "title": "API Development",
          "description": "We create comprehensive APIs that enable seamless data exchange and third-party integrations.",
          "bulletPoints": [
            "Develop RESTful APIs for data access",
            "Implement API authentication and security",
            "Create comprehensive API documentation",
            "Build integration endpoints for third-party services"
          ],
          "image": "/images/step4.png"
        },
        {
          "number": "05",
          "title": "Testing & Quality Assurance",
          "description": "We conduct extensive testing to ensure your web application is reliable, secure, and performs optimally.",
          "bulletPoints": [
            "Perform unit and integration testing",
            "Conduct user acceptance testing",
            "Execute security and performance testing",
            "Test across different browsers and devices"
          ],
          "image": "/images/step5.png"
        },
        {
          "number": "06",
          "title": "Deployment & Monitoring",
          "description": "We deploy your web application and set up monitoring systems to ensure optimal performance and reliability.",
          "bulletPoints": [
            "Deploy to production environment",
            "Configure monitoring and alerting systems",
            "Set up automated backup systems",
            "Provide user training and documentation"
          ],
          "image": "/images/step6.png"
        }
      ],
      "processHeader": {
        "title": "Our Web App Development Process",
        "subtitle": "Building powerful web applications that solve complex business challenges."
      },

    },
    {
      "id": "custom-web-development",
    
      "processSteps": [
        {
          "number": "01",
          "title": "Discovery & Analysis",
          "description": "We conduct comprehensive discovery to understand your unique business requirements and technical challenges.",
          "bulletPoints": [
            "Analyze current systems and workflows",
            "Document specific business requirements",
            "Identify integration needs and constraints",
            "Define success criteria and objectives"
          ],
          "image": "/images/processa12 1.png"
        },
        {
          "number": "02",
          "title": "Custom Solution Design",
          "description": "We design a tailored solution architecture that perfectly fits your business processes and technical requirements.",
          "bulletPoints": [
            "Create custom system architecture",
            "Design bespoke user interfaces",
            "Plan custom database structures",
            "Define integration points and APIs"
          ],
          "image": "/images/step3.png"
        },
        {
          "number": "03",
          "title": "Agile Development",
          "description": "We use agile methodology to build your custom solution with regular feedback and iterative improvements.",
          "bulletPoints": [
            "Develop in iterative sprints",
            "Implement custom business logic",
            "Build tailored user interfaces",
            "Create custom workflow automation"
          ],
          "image": "/images/processa12 1.png"
        },
        {
          "number": "04",
          "title": "System Integration",
          "description": "We integrate your custom solution with existing systems and third-party services for seamless operation.",
          "bulletPoints": [
            "Integrate with existing business systems",
            "Connect third-party services and APIs",
            "Implement data synchronization",
            "Create custom reporting and analytics"
          ],
          "image": "/images/step4.png"
        },
        {
          "number": "05",
          "title": "Testing & Refinement",
          "description": "We thoroughly test your custom solution and refine it based on user feedback and performance metrics.",
          "bulletPoints": [
            "Conduct comprehensive functionality testing",
            "Perform user acceptance testing",
            "Optimize performance and security",
            "Refine based on user feedback"
          ],
          "image": "/images/step5.png"
        },
        {
          "number": "06",
          "title": "Deployment & Training",
          "description": "We deploy your custom solution and provide comprehensive training to ensure successful adoption.",
          "bulletPoints": [
            "Deploy to production environment",
            "Provide comprehensive user training",
            "Create detailed documentation",
            "Establish ongoing support procedures"
          ],
          "image": "/images/step6.png"
        }
      ],
      "processHeader": {
        "title": "Our Custom Web Development Process",
        "subtitle": "Creating bespoke solutions that perfectly fit your unique business requirements."
      },

    },
{
  "id": "graphic-design",
  
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
      "image": "/images/step3.png"
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
      "image": "/images/step4.png"
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
      "image": "/images/step5.png"
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
      "image": "/images/step6.png"
    }
  ],
  "processHeader": {
    "title": "Our UI/UX Design Process",
    "subtitle": "Creating user-centered designs through research, testing, and continuous refinement."
  },

},
    {
      "id": "ecommerce-development",
   
      "processSteps": [
        {
          "number": "01",
          "title": "E-commerce Strategy",
          "description": "We develop a comprehensive e-commerce strategy based on your business model, target market, and sales objectives.",
          "bulletPoints": [
            "Analyze business model and target market",
            "Define e-commerce requirements and features",
            "Choose optimal platform and technology stack",
            "Plan product catalog and pricing structure"
          ],
          "image": "/images/processa12 1.png"
        },
        {
          "number": "02",
          "title": "Platform Development",
          "description": "We build your e-commerce platform with custom features and functionality tailored to your business needs.",
          "bulletPoints": [
            "Develop custom e-commerce platform",
            "Build product catalog and management system",
            "Create user account and profile systems",
            "Implement search and filtering functionality"
          ],
          "image": "/images/step3.png"
        },
        {
          "number": "03",
          "title": "Payment & Security",
          "description": "We integrate secure payment systems and implement robust security measures to protect customer data and transactions.",
          "bulletPoints": [
            "Integrate multiple payment gateways",
            "Implement SSL certificates and encryption",
            "Build secure checkout processes",
            "Add fraud detection and prevention"
          ],
          "image": "/images/processa12 1.png"
        },
        {
          "number": "04",
          "title": "Inventory & Order Management",
          "description": "We build comprehensive systems for managing inventory, orders, and fulfillment processes.",
          "bulletPoints": [
            "Develop inventory management system",
            "Create order processing workflows",
            "Build shipping and fulfillment integration",
            "Implement customer service tools"
          ],
          "image": "/images/step4.png"
        },
        {
          "number": "05",
          "title": "Conversion Optimization",
          "description": "We optimize your e-commerce store for maximum conversions and sales performance.",
          "bulletPoints": [
            "Optimize checkout flow and user experience",
            "Implement abandoned cart recovery",
            "Add product recommendations and upselling",
            "Create loyalty and rewards programs"
          ],
          "image": "/images/step5.png"
        },
        {
          "number": "06",
          "title": "Launch & Analytics",
          "description": "We launch your e-commerce store and implement comprehensive analytics to track performance and sales.",
          "bulletPoints": [
            "Deploy store to production environment",
            "Configure analytics and conversion tracking",
            "Set up performance monitoring",
            "Provide store management training"
          ],
          "image": "/images/step6.png"
        }
      ],
      "processHeader": {
        "title": "Our E-commerce Development Process",
        "subtitle": "Building high-converting online stores that drive sales and customer satisfaction."
      },

    },
    {
      "id": "shopify-development",
       "processSteps": [
        {
          "number": "01",
          "title": "Shopify Store Setup",
          "description": "We set up your Shopify store with optimal configuration and prepare the foundation for custom development.",
          "bulletPoints": [
            "Configure Shopify store settings and preferences",
            "Set up product categories and collections",
            "Configure payment and shipping settings",
            "Plan custom theme requirements"
          ],
          "image": "/images/processa12 1.png"
        },
        {
          "number": "02",
          "title": "Custom Theme Development",
          "description": "We create custom Shopify themes that reflect your brand and provide unique shopping experiences.",
          "bulletPoints": [
            "Develop custom Shopify theme from scratch",
            "Implement responsive design for all devices",
            "Create custom product page layouts",
            "Build unique homepage and landing pages"
          ],
          "image": "/images/step3.png"
        },
        {
          "number": "03",
          "title": "App Integration & Customization",
          "description": "We integrate and customize Shopify apps to extend your store's functionality and improve operations.",
          "bulletPoints": [
            "Research and select optimal Shopify apps",
            "Integrate apps with custom configurations",
            "Customize app functionality for specific needs",
            "Develop custom Shopify apps when needed"
          ],
          "image": "/images/processa12 1.png"
        },
        {
          "number": "04",
          "title": "Product & Content Setup",
          "description": "We set up your product catalog and content with SEO optimization and compelling presentations.",
          "bulletPoints": [
            "Import and organize product catalog",
            "Optimize product descriptions for SEO",
            "Set up product variants and inventory",
            "Create compelling content and pages"
          ],
          "image": "/images/step4.png"
        },
        {
          "number": "05",
          "title": "Performance Optimization",
          "description": "We optimize your Shopify store for speed, conversions, and search engine visibility.",
          "bulletPoints": [
            "Optimize page loading speeds",
            "Implement SEO best practices",
            "Configure conversion tracking",
            "Optimize checkout flow for conversions"
          ],
          "image": "/images/step5.png"
        },
        {
          "number": "06",
          "title": "Launch & Training",
          "description": "We launch your Shopify store and provide comprehensive training on managing your online business.",
          "bulletPoints": [
            "Launch store with full functionality",
            "Provide comprehensive Shopify training",
            "Set up analytics and reporting",
            "Establish ongoing support procedures"
          ],
          "image": "/images/step6.png"
        }
      ],
      "processHeader": {
        "title": "Our Shopify Development Process",
        "subtitle": "Creating powerful Shopify stores that drive sales and provide exceptional shopping experiences."
      },

    },
    {
      "id": "wordpress-development",
   
      "processSteps": [
        {
          "number": "01",
          "title": "WordPress Setup & Planning",
          "description": "We set up WordPress with optimal configuration and plan the site structure and functionality requirements.",
          "bulletPoints": [
            "Install and configure WordPress core",
            "Plan site structure and content organization",
            "Choose and configure hosting environment",
            "Set up development and staging environments"
          ],
          "image": "/images/processa12 1.png"
        },
        {
          "number": "02",
          "title": "Custom Theme Development",
          "description": "We create custom WordPress themes that perfectly match your brand and provide unique functionality.",
          "bulletPoints": [
            "Develop custom WordPress theme from scratch",
            "Implement responsive design principles",
            "Create custom post types and fields",
            "Build dynamic content templates"
          ],
          "image": "/images/step3.png"
        },
        {
          "number": "03",
          "title": "Plugin Integration & Development",
          "description": "We integrate essential plugins and develop custom functionality to meet your specific requirements.",
          "bulletPoints": [
            "Select and configure essential plugins",
            "Develop custom plugins for specific needs",
            "Customize existing plugin functionality",
            "Ensure plugin compatibility and security"
          ],
          "image": "/images/processa12 1.png"
        },
        {
          "number": "04",
          "title": "Content Management Setup",
          "description": "We configure WordPress for easy content management and create user-friendly admin interfaces.",
          "bulletPoints": [
            "Configure user roles and permissions",
            "Set up content editing workflows",
            "Create custom admin interfaces",
            "Implement SEO optimization tools"
          ],
          "image": "/images/step4.png"
        },
        {
          "number": "05",
          "title": "Security & Performance",
          "description": "We implement comprehensive security measures and optimize WordPress for maximum performance.",
          "bulletPoints": [
            "Implement security best practices",
            "Configure backup and recovery systems",
            "Optimize database and caching",
            "Improve page loading speeds"
          ],
          "image": "/images/step5.png"
        },
        {
          "number": "06",
          "title": "Launch & Training",
          "description": "We launch your WordPress site and provide comprehensive training on content management and maintenance.",
          "bulletPoints": [
            "Deploy site to production environment",
            "Provide WordPress training and documentation",
            "Set up maintenance and update procedures",
            "Configure analytics and monitoring"
          ],
          "image": "/images/step6.png"
        }
      ],
      "processHeader": {
        "title": "Our WordPress Development Process",
        "subtitle": "Building powerful, user-friendly WordPress websites with custom functionality."
      },
    
    },
    {
      "id": "pos-development",
      
      "processSteps": [
        {
          "number": "01",
          "title": "Business Analysis",
          "description": "We analyze your business operations and requirements to design a POS system that fits your specific workflow.",
          "bulletPoints": [
            "Analyze current business processes",
            "Document POS requirements and features",
            "Plan hardware and software integration",
            "Define user roles and access levels"
          ],
          "image": "/images/processa12 1.png"
        },
        {
          "number": "02",
          "title": "System Architecture",
          "description": "We design the technical architecture for your POS system with consideration for scalability and reliability.",
          "bulletPoints": [
            "Design scalable system architecture",
            "Plan database structure for transactions",
            "Define API endpoints and integrations",
            "Choose optimal technology stack"
          ],
          "image": "/images/step3.png"
        },
        {
          "number": "03",
          "title": "Core POS Development",
          "description": "We develop the core POS functionality including sales processing, inventory tracking, and customer management.",
          "bulletPoints": [
            "Build sales processing and checkout system",
            "Develop inventory management features",
            "Create customer database and profiles",
            "Implement employee management system"
          ],
          "image": "/images/processa12 1.png"
        },
        {
          "number": "04",
          "title": "Payment & Hardware Integration",
          "description": "We integrate payment processing systems and hardware components for seamless operation.",
          "bulletPoints": [
            "Integrate payment processing systems",
            "Connect receipt printers and cash drawers",
            "Set up barcode scanners and card readers",
            "Configure multi-location synchronization"
          ],
          "image": "/images/step4.png"
        },
        {
          "number": "05",
          "title": "Reporting & Analytics",
          "description": "We build comprehensive reporting and analytics features to help you understand your business performance.",
          "bulletPoints": [
            "Create sales and financial reports",
            "Build inventory and product analytics",
            "Develop customer and employee reports",
            "Implement real-time dashboard features"
          ],
          "image": "/images/step5.png"
        },
        {
          "number": "06",
          "title": "Deployment & Training",
          "description": "We deploy your POS system and provide comprehensive training to ensure smooth operations.",
          "bulletPoints": [
            "Install and configure POS hardware",
            "Deploy software to all locations",
            "Provide comprehensive staff training",
            "Set up ongoing support and maintenance"
          ],
          "image": "/images/step6.png"
        }
      ],
      "processHeader": {
        "title": "Our POS Development Process",
        "subtitle": "Building custom point-of-sale systems that streamline business operations."
      },

    },
    {
      "id": "custom-software-development",
    
     "processSteps": [
        {
          "number": "01",
          "title": "Requirements Engineering",
          "description": "We conduct comprehensive requirements analysis to understand your business challenges and define the optimal software solution.",
          "bulletPoints": [
            "Analyze current business processes and pain points",
            "Define detailed functional and technical requirements",
            "Create user stories and acceptance criteria",
            "Plan system integration and data migration needs"
          ],
          "image": "/images/processa12 1.png"
        },
        {
          "number": "02",
          "title": "System Design & Architecture",
          "description": "We design robust system architecture that ensures scalability, maintainability, and optimal performance.",
          "bulletPoints": [
            "Design scalable software architecture",
            "Plan database schema and data models",
            "Define API structures and integration points",
            "Create technical specifications and documentation"
          ],
          "image": "/images/step3.png"
        },
        {
          "number": "03",
          "title": "Agile Development",
          "description": "We develop your custom software using agile methodology with regular feedback and iterative improvements.",
          "bulletPoints": [
            "Implement core business logic and features",
            "Build user interfaces and experience flows",
            "Develop data processing and automation",
            "Create integration modules and APIs"
          ],
          "image": "/images/processa12 1.png"
        },
        {
          "number": "04",
          "title": "Integration & Testing",
          "description": "We integrate your software with existing systems and conduct comprehensive testing to ensure reliability.",
          "bulletPoints": [
            "Integrate with existing business systems",
            "Perform comprehensive functionality testing",
            "Conduct security and performance testing",
            "Execute user acceptance testing"
          ],
          "image": "/images/step4.png"
        },
        {
          "number": "05",
          "title": "Deployment & Migration",
          "description": "We deploy your custom software and migrate data from existing systems with minimal business disruption.",
          "bulletPoints": [
            "Deploy software to production environment",
            "Migrate data from legacy systems",
            "Configure monitoring and backup systems",
            "Implement security and access controls"
          ],
          "image": "/images/step5.png"
        },
        {
          "number": "06",
          "title": "Training & Support",
          "description": "We provide comprehensive training and establish ongoing support to ensure successful software adoption.",
          "bulletPoints": [
            "Provide comprehensive user training",
            "Create detailed documentation and manuals",
            "Establish support and maintenance procedures",
            "Plan future enhancements and updates"
          ],
          "image": "/images/step6.png"
        }
      ],
      "processHeader": {
        "title": "Our Custom Software Development Process",
        "subtitle": "Creating bespoke software solutions that solve unique business challenges."
      },
    
    },

    {
      "id": "seo-strategy",
       "processSteps": [
        {
          "number": "01",
          "title": "Business & Competitive Analysis",
          "description": "We analyze your business goals, target audience, and competitive landscape to understand your market position and opportunities.",
          "bulletPoints": [
            "Analyze business objectives and target audience",
            "Conduct comprehensive competitor analysis",
            "Assess current market position and opportunities",
            "Identify competitive gaps and advantages"
          ],
          "image": "/images/processa12 1.png"
        },
        {
          "number": "02",
          "title": "Technical & Content Audit",
          "description": "We perform thorough audits of your website's technical foundation and content to identify optimization opportunities and issues.",
          "bulletPoints": [
            "Conduct comprehensive technical SEO audit",
            "Analyze current content performance and gaps",
            "Assess website architecture and user experience",
            "Identify quick wins and priority improvements"
          ],
          "image": "/images/step3.png"
        },
        {
          "number": "03",
          "title": "Keyword Research & Mapping",
          "description": "We research and identify high-value keyword opportunities that align with your business goals and target audience intent.",
          "bulletPoints": [
            "Conduct extensive keyword research and analysis",
            "Map keywords to business objectives and user intent",
            "Identify long-tail and competitive opportunities",
            "Create keyword hierarchy and content mapping"
          ],
          "image": "/images/processa12 1.png"
        },
        {
          "number": "04",
          "title": "Strategy Development",
          "description": "We develop a comprehensive SEO strategy with clear objectives, tactics, and timelines for achieving sustainable growth.",
          "bulletPoints": [
            "Create comprehensive SEO strategy document",
            "Define clear objectives and success metrics",
            "Develop content and link building strategies",
            "Plan technical improvements and optimizations"
          ],
          "image": "/images/step4.png"
        },
        {
          "number": "05",
          "title": "Implementation Roadmap",
          "description": "We create detailed implementation plans with priorities, timelines, and resource requirements for executing the strategy.",
          "bulletPoints": [
            "Create prioritized implementation roadmap",
            "Define timelines and resource requirements",
            "Establish performance tracking and reporting",
            "Plan ongoing optimization and refinement"
          ],
          "image": "/images/step5.png"
        },
        {
          "number": "06",
          "title": "Performance Monitoring & Optimization",
          "description": "We establish monitoring systems and provide ongoing strategy refinement to ensure continuous improvement and adaptation.",
          "bulletPoints": [
            "Set up comprehensive performance tracking",
            "Establish regular reporting and review cycles",
            "Provide ongoing strategy refinement",
            "Adapt to algorithm changes and market shifts"
          ],
          "image": "/images/step6.png"
        }
      ],
      "processHeader": {
        "title": "Our SEO Strategy Process",
        "subtitle": "From analysis to implementation — creating comprehensive SEO strategies that drive sustainable growth."
      },

    },
    {
      "id": "local-seo",
    
      "processSteps": [
        {
          "number": "01",
          "title": "Local Market Analysis",
          "description": "We analyze your local market, competitors, and customer behavior to understand local search opportunities and challenges.",
          "bulletPoints": [
            "Analyze local market dynamics and competition",
            "Research local customer search behavior",
            "Assess current local search visibility",
            "Identify local keyword opportunities"
          ],
          "image": "/images/processa12 1.png"
        },
        {
          "number": "02",
          "title": "Google Business Profile Optimization",
          "description": "We optimize and manage your Google Business Profile to maximize local search visibility and customer engagement.",
          "bulletPoints": [
            "Complete and optimize Google Business Profile",
            "Add high-quality photos and business information",
            "Implement local posting and update strategies",
            "Set up messaging and customer interaction features"
          ],
          "image": "/images/step3.png"
        },
        {
          "number": "03",
          "title": "Local Citation Building",
          "description": "We build and manage local citations across relevant directories and platforms to establish local authority and consistency.",
          "bulletPoints": [
            "Audit existing citations for accuracy and consistency",
            "Build citations on relevant local directories",
            "Ensure NAP (Name, Address, Phone) consistency",
            "Monitor and manage citation portfolio"
          ],
          "image": "/images/processa12 1.png"
        },
        {
          "number": "04",
          "title": "Local Content Optimization",
          "description": "We create and optimize content that targets local keywords and serves local customer needs and interests.",
          "bulletPoints": [
            "Optimize existing pages for local keywords",
            "Create location-specific landing pages",
            "Develop local content and blog topics",
            "Implement local schema markup"
          ],
          "image": "/images/step4.png"
        },
        {
          "number": "05",
          "title": "Review Management Strategy",
          "description": "We implement strategies for generating positive reviews and managing your online reputation across review platforms.",
          "bulletPoints": [
            "Develop review generation strategies",
            "Set up review monitoring and alerts",
            "Create response templates and protocols",
            "Implement reputation management best practices"
          ],
          "image": "/images/step5.png"
        },
        {
          "number": "06",
          "title": "Local Performance Tracking",
          "description": "We monitor local search performance and provide ongoing optimization to maintain and improve local visibility.",
          "bulletPoints": [
            "Set up local SEO performance tracking",
            "Monitor local rankings and visibility",
            "Track customer actions and conversions",
            "Provide regular reporting and optimization"
          ],
          "image": "/images/step6.png"
        }
      ],
      "processHeader": {
        "title": "Our Local SEO Process",
        "subtitle": "Dominating local search results to attract nearby customers and drive foot traffic."
      },

    },
    {
      "id": "technical-seo",
    
      "processSteps": [
        {
          "number": "01",
          "title": "Technical SEO Audit",
          "description": "We conduct a comprehensive technical analysis to identify issues affecting search engine crawling, indexing, and ranking.",
          "bulletPoints": [
            "Perform comprehensive website crawl analysis",
            "Identify technical SEO issues and opportunities",
            "Analyze site architecture and URL structure",
            "Assess crawling and indexing status"
          ],
          "image": "/images/processa12 1.png"
        },
        {
          "number": "02",
          "title": "Site Speed Optimization",
          "description": "We optimize website performance and Core Web Vitals to improve user experience and search rankings.",
          "bulletPoints": [
            "Analyze Core Web Vitals and performance metrics",
            "Optimize images and media files",
            "Implement caching and compression strategies",
            "Minimize code and improve loading speeds"
          ],
          "image": "/images/step3.png"
        },
        {
          "number": "03",
          "title": "Crawling & Indexing Optimization",
          "description": "We ensure search engines can efficiently crawl and index your website content for maximum visibility.",
          "bulletPoints": [
            "Optimize robots.txt and XML sitemaps",
            "Fix crawl errors and broken links",
            "Implement proper redirect strategies",
            "Optimize internal linking structure"
          ],
          "image": "/images/processa12 1.png"
        },
        {
          "number": "04",
          "title": "Structured Data Implementation",
          "description": "We implement schema markup to help search engines understand your content and enable rich snippets.",
          "bulletPoints": [
            "Identify structured data opportunities",
            "Implement relevant schema markup",
            "Test and validate structured data",
            "Monitor rich snippet performance"
          ],
          "image": "/images/step4.png"
        },
        {
          "number": "05",
          "title": "Mobile & UX Optimization",
          "description": "We ensure your website provides optimal user experience across all devices and platforms.",
          "bulletPoints": [
            "Optimize mobile responsiveness and usability",
            "Improve user experience signals",
            "Fix mobile-specific technical issues",
            "Enhance accessibility and navigation"
          ],
          "image": "/images/step5.png"
        },
        {
          "number": "06",
          "title": "Technical Monitoring & Maintenance",
          "description": "We establish ongoing monitoring to maintain technical SEO health and quickly address new issues.",
          "bulletPoints": [
            "Set up technical SEO monitoring systems",
            "Establish regular technical health checks",
            "Monitor Core Web Vitals and performance",
            "Provide ongoing technical optimization"
          ],
          "image": "/images/step6.png"
        }
      ],
      "processHeader": {
        "title": "Our Technical SEO Process",
        "subtitle": "Building a solid technical foundation that supports superior search engine performance."
      },

    },
    {
      "id": "on-page-seo",
      
      "processSteps": [
        {
          "number": "01",
          "title": "Page-Level SEO Analysis",
          "description": "We analyze individual pages to identify optimization opportunities and content gaps that impact search performance.",
          "bulletPoints": [
            "Conduct comprehensive page-level SEO audit",
            "Analyze keyword targeting and optimization",
            "Assess content quality and user engagement",
            "Identify optimization priorities and opportunities"
          ],
          "image": "/images/processa12 1.png"
        },
        {
          "number": "02",
          "title": "Content Optimization",
          "description": "We optimize existing content and create new content that serves user intent while targeting relevant keywords.",
          "bulletPoints": [
            "Optimize content for target keywords and user intent",
            "Improve content structure and readability",
            "Enhance content depth and comprehensiveness",
            "Create supporting content for topic clusters"
          ],
          "image": "/images/step3.png"
        },
        {
          "number": "03",
          "title": "Meta Tag Optimization",
          "description": "We craft compelling meta titles and descriptions that improve click-through rates and search rankings.",
          "bulletPoints": [
            "Optimize meta titles for keywords and engagement",
            "Create compelling meta descriptions that drive clicks",
            "Implement proper header tag hierarchy",
            "Optimize title tags for different page types"
          ],
          "image": "/images/processa12 1.png"
        },
        {
          "number": "04",
          "title": "Internal Linking Strategy",
          "description": "We develop strategic internal linking to distribute authority and create logical content relationships.",
          "bulletPoints": [
            "Analyze current internal linking structure",
            "Create strategic internal linking plans",
            "Implement topic cluster linking strategies",
            "Optimize anchor text and link distribution"
          ],
          "image": "/images/step4.png"
        },
        {
          "number": "05",
          "title": "User Experience Enhancement",
          "description": "We improve on-page user experience factors that impact both search rankings and user satisfaction.",
          "bulletPoints": [
            "Optimize page layout and visual hierarchy",
            "Improve content formatting and readability",
            "Enhance call-to-action placement and effectiveness",
            "Optimize for user engagement signals"
          ],
          "image": "/images/step5.png"
        },
        {
          "number": "06",
          "title": "Performance Monitoring & Refinement",
          "description": "We monitor on-page SEO performance and continuously refine optimization strategies for improved results.",
          "bulletPoints": [
            "Track keyword rankings and organic traffic",
            "Monitor user engagement and conversion metrics",
            "Analyze content performance and opportunities",
            "Continuously refine and improve optimization"
          ],
          "image": "/images/step6.png"
        }
      ],
      "processHeader": {
        "title": "Our On-Page SEO Process",
        "subtitle": "Optimizing individual pages to rank higher and provide exceptional user experiences."
      },
     
    
    },
    {
      "id": "off-page-seo",
     
      "processSteps": [
        {
          "number": "01",
          "title": "Link Opportunity Research",
          "description": "We research and identify high-quality link building opportunities that align with your industry and target audience.",
          "bulletPoints": [
            "Analyze competitor backlink profiles",
            "Identify high-authority link opportunities",
            "Research industry-relevant publications and websites",
            "Assess link building potential and strategies"
          ],
          "image": "/images/processa12 1.png"
        },
        {
          "number": "02",
          "title": "Content Creation for Link Building",
          "description": "We create valuable, linkable content assets that naturally attract backlinks and provide value to target audiences.",
          "bulletPoints": [
            "Develop linkable content assets and resources",
            "Create industry research and data studies",
            "Produce guest content for authoritative sites",
            "Design infographics and visual content"
          ],
          "image": "/images/step3.png"
        },
        {
          "number": "03",
          "title": "Outreach & Relationship Building",
          "description": "We build genuine relationships with industry influencers, bloggers, and publishers to earn natural backlinks.",
          "bulletPoints": [
            "Develop personalized outreach strategies",
            "Build relationships with industry influencers",
            "Create partnerships with relevant websites",
            "Establish ongoing content collaboration opportunities"
          ],
          "image": "/images/processa12 1.png"
        },
        {
          "number": "04",
          "title": "Strategic Link Acquisition",
          "description": "We execute targeted link building campaigns that earn high-quality backlinks from authoritative sources.",
          "bulletPoints": [
            "Execute guest posting and content partnerships",
            "Secure resource page and directory listings",
            "Earn mentions through digital PR and outreach",
            "Build relationships for ongoing link opportunities"
          ],
          "image": "/images/step4.png"
        },
        {
          "number": "05",
          "title": "Brand Authority Building",
          "description": "We enhance your online reputation and brand authority through strategic promotion and thought leadership.",
          "bulletPoints": [
            "Develop thought leadership content strategies",
            "Build brand mentions and citations",
            "Enhance social media presence for SEO",
            "Create industry recognition and awards opportunities"
          ],
          "image": "/images/step5.png"
        },
        {
          "number": "06",
          "title": "Link Profile Monitoring",
          "description": "We monitor your backlink profile and maintain link quality while tracking the impact of off-page SEO efforts.",
          "bulletPoints": [
            "Monitor backlink acquisition and quality",
            "Track domain authority and ranking improvements",
            "Analyze competitor link building activities",
            "Provide regular reporting and strategy refinement"
          ],
          "image": "/images/step6.png"
        }
      ],
      "processHeader": {
        "title": "Our Off-Page SEO Process",
        "subtitle": "Building authority and trust through strategic link building and digital relationship management."
      },

    },
    {
      "id": "ecommerce-seo",
      
      "processSteps": [
        {
          "number": "01",
          "title": "E-commerce SEO Audit",
          "description": "We conduct comprehensive analysis of your online store to identify optimization opportunities and technical issues.",
          "bulletPoints": [
            "Analyze e-commerce site structure and navigation",
            "Assess product and category page optimization",
            "Identify technical SEO issues specific to e-commerce",
            "Evaluate conversion funnel and user experience"
          ],
          "image": "/images/processa12 1.png"
        },
        {
          "number": "02",
          "title": "Product Page Optimization",
          "description": "We optimize individual product pages for search visibility while maintaining focus on conversions and sales.",
          "bulletPoints": [
            "Optimize product titles and descriptions for SEO",
            "Implement product schema markup",
            "Optimize product images and alt text",
            "Create SEO-friendly product URLs and navigation"
          ],
          "image": "/images/step3.png"
        },
        {
          "number": "03",
          "title": "Category & Site Structure",
          "description": "We optimize category pages and overall site architecture to support both user navigation and search engine crawling.",
          "bulletPoints": [
            "Optimize category page content and structure",
            "Implement logical site hierarchy and navigation",
            "Create SEO-friendly faceted navigation",
            "Optimize internal linking for product discovery"
          ],
          "image": "/images/processa12 1.png"
        },
        {
          "number": "04",
          "title": "E-commerce Keyword Strategy",
          "description": "We develop keyword strategies that target high-intent shoppers at different stages of the buying journey.",
          "bulletPoints": [
            "Research commercial and transactional keywords",
            "Target long-tail product-specific searches",
            "Optimize for local and seasonal shopping terms",
            "Map keywords to product and category pages"
          ],
          "image": "/images/step4.png"
        },
        {
          "number": "05",
          "title": "Technical E-commerce SEO",
          "description": "We address technical challenges specific to e-commerce sites like duplicate content and large-scale optimization.",
          "bulletPoints": [
            "Resolve duplicate content issues",
            "Optimize site speed for product pages",
            "Implement proper canonicalization",
            "Optimize XML sitemaps for e-commerce"
          ],
          "image": "/images/step5.png"
        },
        {
          "number": "06",
          "title": "Conversion-Focused Optimization",
          "description": "We integrate SEO improvements with conversion optimization to maximize both traffic and sales performance.",
          "bulletPoints": [
            "Optimize for shopping-intent keywords",
            "Implement review and rating optimization",
            "Create content that supports buying decisions",
            "Monitor and optimize conversion metrics"
          ],
          "image": "/images/step6.png"
        }
      ],
      "processHeader": {
        "title": "Our E-commerce SEO Process",
        "subtitle": "Driving qualified traffic and sales through specialized e-commerce optimization strategies."
      },

    },
    {
      "id": "content-strategy",
    
      "processSteps": [
        {
          "number": "01",
          "title": "Audience & Content Analysis",
          "description": "We analyze your target audience and existing content to understand preferences, gaps, and opportunities.",
          "bulletPoints": [
            "Analyze target audience needs and preferences",
            "Conduct comprehensive content audit",
            "Assess competitor content strategies",
            "Identify content gaps and opportunities"
          ],
          "image": "/images/processa12 1.png"
        },
        {
          "number": "02",
          "title": "Topic Research & Clustering",
          "description": "We research relevant topics and organize them into strategic clusters that build topical authority.",
          "bulletPoints": [
            "Research trending and evergreen topics",
            "Develop topic clusters and pillar content",
            "Map content to user journey stages",
            "Identify content format opportunities"
          ],
          "image": "/images/step3.png"
        },
        {
          "number": "03",
          "title": "Content Planning & Calendar",
          "description": "We create detailed content plans and editorial calendars that align with business goals and SEO objectives.",
          "bulletPoints": [
            "Develop comprehensive content calendar",
            "Plan content themes and campaigns",
            "Schedule content for optimal timing",
            "Create content brief templates and guidelines"
          ],
          "image": "/images/processa12 1.png"
        },
        {
          "number": "04",
          "title": "SEO Content Guidelines",
          "description": "We establish SEO best practices and guidelines for creating content that ranks well and serves user intent.",
          "bulletPoints": [
            "Create SEO content creation guidelines",
            "Develop keyword integration strategies",
            "Establish content optimization checklists",
            "Plan internal linking and content relationships"
          ],
          "image": "/images/step4.png"
        },
        {
          "number": "05",
          "title": "Content Workflow Setup",
          "description": "We establish efficient content creation workflows and processes that ensure consistent quality and optimization.",
          "bulletPoints": [
            "Design content creation workflows",
            "Establish review and approval processes",
            "Create content performance tracking systems",
            "Set up collaboration and project management"
          ],
          "image": "/images/step5.png"
        },
        {
          "number": "06",
          "title": "Performance & Optimization",
          "description": "We monitor content performance and continuously optimize strategy based on data and results.",
          "bulletPoints": [
            "Track content performance metrics",
            "Analyze user engagement and conversions",
            "Identify top-performing content types",
            "Refine strategy based on performance data"
          ],
          "image": "/images/step6.png"
        }
      ],
      "processHeader": {
        "title": "Our Content Strategy Process",
        "subtitle": "Creating strategic content that builds authority, engages audiences, and drives business results."
      },

    },
    {
      "id": "keyword-research",
  
      "processSteps": [
        {
          "number": "01",
          "title": "Business & Audience Analysis",
          "description": "We analyze your business model and target audience to understand search behavior and keyword opportunities.",
          "bulletPoints": [
            "Analyze business goals and target market",
            "Research customer personas and search behavior",
            "Assess current keyword performance",
            "Identify business-relevant search categories"
          ],
          "image": "/images/processa12 1.png"
        },
        {
          "number": "02",
          "title": "Keyword Discovery & Expansion",
          "description": "We use advanced tools and techniques to discover comprehensive keyword opportunities across your market.",
          "bulletPoints": [
            "Conduct comprehensive keyword discovery",
            "Expand keyword lists using multiple data sources",
            "Identify long-tail and niche opportunities",
            "Research seasonal and trending keywords"
          ],
          "image": "/images/step3.png"
        },
        {
          "number": "03",
          "title": "Competition & Difficulty Analysis",
          "description": "We analyze keyword competition and difficulty to identify realistic ranking opportunities and strategic priorities.",
          "bulletPoints": [
            "Assess keyword competition and difficulty",
            "Analyze competitor keyword strategies",
            "Identify keyword gaps and opportunities",
            "Evaluate ranking feasibility and timelines"
          ],
          "image": "/images/processa12 1.png"
        },
        {
          "number": "04",
          "title": "Search Intent Categorization",
          "description": "We categorize keywords by search intent to ensure alignment with content strategy and business goals.",
          "bulletPoints": [
            "Categorize keywords by search intent",
            "Map keywords to buyer journey stages",
            "Identify informational vs. commercial keywords",
            "Align keywords with conversion objectives"
          ],
          "image": "/images/step4.png"
        },
        {
          "number": "05",
          "title": "Keyword Prioritization & Mapping",
          "description": "We prioritize keywords based on business value and create strategic mapping for content and optimization.",
          "bulletPoints": [
            "Prioritize keywords by business value and opportunity",
            "Create keyword clusters and themes",
            "Map keywords to existing and planned content",
            "Develop keyword targeting strategies"
          ],
          "image": "/images/step5.png"
        },
        {
          "number": "06",
          "title": "Strategy & Implementation Planning",
          "description": "We develop actionable keyword strategies and implementation plans for immediate and long-term SEO success.",
          "bulletPoints": [
            "Create comprehensive keyword strategy document",
            "Develop implementation timelines and priorities",
            "Establish keyword tracking and monitoring",
            "Provide ongoing keyword strategy refinement"
          ],
          "image": "/images/step6.png"
        }
      ],
      "processHeader": {
        "title": "Our Keyword Research Process",
        "subtitle": "Discovering and strategizing around keywords that drive targeted traffic and business growth."
      },

    },
    {
      "id": "seo-audit",
      
   

      "processSteps": [
        {
          "number": "01",
          "title": "Comprehensive Website Crawl",
          "description": "We perform thorough technical analysis using professional tools to identify all SEO issues and opportunities.",
          "bulletPoints": [
            "Conduct comprehensive website crawl and analysis",
            "Identify technical SEO issues and errors",
            "Analyze site architecture and structure",
            "Assess indexing and crawling status"
          ],
          "image": "/images/processa12 1.png"
        },
        {
          "number": "02",
          "title": "Content & On-Page Analysis",
          "description": "We evaluate your content quality, optimization, and on-page SEO factors that impact search performance.",
          "bulletPoints": [
            "Analyze content quality and optimization",
            "Review meta tags and on-page elements",
            "Assess keyword targeting and content gaps",
            "Evaluate user experience and engagement factors"
          ],
          "image": "/images/step3.png"
        },
        {
          "number": "03",
          "title": "Backlink Profile Analysis",
          "description": "We analyze your backlink profile to identify link quality, opportunities, and potential issues.",
          "bulletPoints": [
            "Analyze backlink profile and link quality",
            "Identify toxic links and disavow opportunities",
            "Assess domain authority and link metrics",
            "Compare link profile to competitors"
          ],
          "image": "/images/processa12 1.png"
        },
        {
          "number": "04",
          "title": "Competitive Benchmarking",
          "description": "We analyze your competitive position and identify opportunities to outperform competitors in search.",
          "bulletPoints": [
            "Analyze top competitors' SEO strategies",
            "Identify competitive gaps and opportunities",
            "Benchmark performance against industry leaders",
            "Assess competitive keyword and content strategies"
          ],
          "image": "/images/step4.png"
        },
        {
          "number": "05",
          "title": "Opportunity Identification",
          "description": "We identify and prioritize optimization opportunities based on potential impact and implementation ease.",
          "bulletPoints": [
            "Identify quick wins and immediate opportunities",
            "Prioritize fixes by impact and difficulty",
            "Assess long-term optimization potential",
            "Develop strategic improvement recommendations"
          ],
          "image": "/images/step5.png"
        },
        {
          "number": "06",
          "title": "Actionable Recommendations",
          "description": "We deliver comprehensive reports with prioritized recommendations and implementation roadmaps.",
          "bulletPoints": [
            "Create detailed audit report with findings",
            "Provide prioritized action plan and roadmap",
            "Include step-by-step implementation guidance",
            "Establish performance tracking and measurement"
          ],
          "image": "/images/step6.png"
        }
      ],
      "processHeader": {
        "title": "Our SEO Audit Process",
        "subtitle": "Comprehensive analysis that identifies opportunities and creates roadmaps for SEO success."
      },
  
    }
  ]


const WebDesignProcess: React.FC<WebDesignProcessProps> = ({ serviceId }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [deviceType, setDeviceType] = useState('desktop');
  const [isHovered, setIsHovered] = useState(false);
  const [animationFrame, setAnimationFrame] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const pausedTimeRef = useRef<number | null>(null);
  const animationStartTimeRef = useRef<number | null>(null);
  const lastStepTimeRef = useRef<number | null>(null);
  
  // Get service data based on serviceId
  const serviceData = servicesData.find(service => service.id === serviceId);
  
  // Fallback to default data if service not found
  const processSteps = serviceData?.processSteps || [];
  const processHeader = serviceData?.processHeader || {
    title: "Our Process",
    subtitle: "From research to results — here's how we turn ideas into impactful solutions."
  };
  
  // Early return if no process steps found
  if (!processSteps.length) {
    return (
      <div className="design-process-section" style={{ padding: '40px', textAlign: 'center', color: 'white' }}>
        <h2>Process information not available for this service.</h2>
      </div>
    );
  }
  
  // Duration for each step in milliseconds
  const STEP_DURATION = 3000; 
  // Total animation duration
  const TOTAL_DURATION = STEP_DURATION * processSteps.length;
  // Time to show last step before resetting
  const LAST_STEP_DISPLAY_DURATION = 1000;

  // Calculate which steps to show based on device
  const getVisibleSteps = () => {
    const visibleSteps = [];
    
    if (deviceType === 'mobile') {
      // On mobile, show only the current step
      visibleSteps.push({
        step: processSteps[currentIndex],
        index: currentIndex
      });
    } else {
      // For tablet and desktop, show two steps at a time
      // For the first index, show steps 1 and 2
      if (currentIndex === 0) {
        visibleSteps.push({
          step: processSteps[0],
          index: 0
        });
        
        if (processSteps[1]) {
          visibleSteps.push({
            step: processSteps[1],
            index: 1
          });
        }
      } 
      // For the last step, always show steps n-1 and n together
      else if (currentIndex === processSteps.length - 1 || currentIndex === processSteps.length - 2) {
        if (processSteps[processSteps.length - 2]) {
          visibleSteps.push({
            step: processSteps[processSteps.length - 2],
            index: processSteps.length - 2
          });
        }
        
        visibleSteps.push({
          step: processSteps[processSteps.length - 1],
          index: processSteps.length - 1
        });
      }
      else {
        // For all other cases, show current and next step
        visibleSteps.push({
          step: processSteps[currentIndex],
          index: currentIndex
        });
        
        // Add the next step if available
        if (currentIndex + 1 < processSteps.length) {
          visibleSteps.push({
            step: processSteps[currentIndex + 1],
            index: currentIndex + 1
          });
        }
      }
    }
    
    return visibleSteps;
  };

  // Check device type
  const checkDeviceType = () => {
    const width = window.innerWidth;
    if (width < 768) {
      setDeviceType('mobile');
    } else if (width >= 768 && width < 1024) {
      setDeviceType('tablet');
    } else {
      setDeviceType('desktop');
    }
  };

  // Handle auto-scrolling animation
  const animateAutoScroll = (timestamp: number): void => {
    // If we're hovering, pause the animation by storing the current timestamp
    if (isHovered) {
      if (!pausedTimeRef.current) {
        pausedTimeRef.current = timestamp;
      }
      // Keep the animation frame going but don't update anything
      const frame = requestAnimationFrame(animateAutoScroll);
      setAnimationFrame(frame);
      return;
    } else if (pausedTimeRef.current) {
      // Resume animation by adjusting the start time to account for the pause duration
      if (animationStartTimeRef.current) {
        const pauseDuration = timestamp - pausedTimeRef.current;
        animationStartTimeRef.current += pauseDuration;
      }
      pausedTimeRef.current = null;
    }
    
    // Initialize animation start time if needed
    if (!animationStartTimeRef.current) {
      animationStartTimeRef.current = timestamp;
    }

    const elapsed = timestamp - (animationStartTimeRef.current || timestamp);
    const progress = Math.min(elapsed / TOTAL_DURATION, 1);
    
    // Calculate which step we should be on based on progress
    const stepIndex = Math.min(
      Math.floor(progress * processSteps.length),
      processSteps.length - 1
    );
    
    // When we reach the last step
    if (stepIndex === processSteps.length - 1) {
      // If we haven't recorded the time when we reached the last step yet
      if (!lastStepTimeRef.current) {
        lastStepTimeRef.current = timestamp;
        setCurrentIndex(processSteps.length - 1);
      } 
      // If we've been on the last step for the display duration
      else if (timestamp - lastStepTimeRef.current >= LAST_STEP_DISPLAY_DURATION) {
        // Reset animation to start from step 1
        animationStartTimeRef.current = timestamp;
        setCurrentIndex(0);
        lastStepTimeRef.current = null;
      }
    } else {
      // Reset the last step time reference when not on the last step
      lastStepTimeRef.current = null;
      
      // Only update the index if it's changed
      if (stepIndex !== currentIndex) {
        setCurrentIndex(stepIndex);
      }
    }
    
    // Update progress bar
    const stepProgress = (progress * processSteps.length) % 1;
    let progressPct;
    
    if (deviceType === 'mobile') {
      const baseProgress = (stepIndex / (processSteps.length - 1)) * 100;
      const stepWidth = 100 / (processSteps.length - 1);
      progressPct = baseProgress + (stepProgress * stepWidth);
    } else {
      // For tablet and desktop view, ensure the progress bar goes fully to 100% when on step 6
      if (stepIndex === processSteps.length - 1) {
        progressPct = 100; // Force to 100% on the last step
      } else {
        progressPct = deviceType === 'mobile' ? 
          ((stepIndex + stepProgress) / (processSteps.length - 1)) * 100 : 
          50 + (stepProgress * 50); // 50-100% range for tablet and desktop
      }
    }
    
    // Update progress bar
    const progressBar = document.querySelector('.progress-fill') as HTMLElement | null;
    if (progressBar) {
      progressBar.style.width = `${progressPct}%`;
    }
    
    // Continue animation
    const frame = requestAnimationFrame(animateAutoScroll);
    setAnimationFrame(frame);
  };

  // Handle mouse events for specific elements
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  useEffect(() => {
    // Initial check for device type
    checkDeviceType();
    
    // Add event listener for resizing
    window.addEventListener('resize', checkDeviceType);
    
    // Start auto-scrolling animation
    const frame = requestAnimationFrame(animateAutoScroll);
    setAnimationFrame(frame);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', checkDeviceType);
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [deviceType, isHovered, processSteps.length]);
  
  // Generate dot indicators
  const renderDotIndicators = () => {
    if (deviceType !== 'mobile') {
      // For tablet and desktop, just show the two dots as before
      return (
        <>
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
            aria-hidden="true"
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
            aria-hidden="true"
          />
        </>
      );
    }
    
    // On mobile, generate a dot for each step
    return processSteps.map((step, index) => {
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
          aria-hidden="true"
        />
      );
    });
  };

  // Get appropriate styles based on device type
  const getResponsiveStyles = () => {
    // Base styles for mobile first
    const styles = {
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
        flexDirection: 'column',
        width: '100%',
        padding: '0 10px',
        marginBottom: '10px'
      },
      imageContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '15px'
      },
      image: {
        width: '100%',
        maxWidth: '180px',
        height: 'auto',
        display: 'block',
        marginTop: '0'
      },
      numberContainer: {
        paddingTop: '0',
        width: '100%',
      },
      number: {
        fontSize: '3rem',
        marginBottom: '4px',
        textAlign: 'left'
      },
      title: {
        fontSize: '1.4rem',
        minHeight: '2rem',
        textAlign: 'left'
      },
      description: {
        fontSize: '0.95rem',
        lineHeight: '1.4',
        marginTop: '7px',
        textAlign: 'left'
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

    // Override for tablet
    if (deviceType === 'tablet') {
      return {
        ...styles,
        container: {
          ...styles.container,
          height: 'auto',
          padding: '40px 0 50px'
        },
        header: {
          marginBottom: '0px'
        },
        headerTitle: {
          fontSize: '2.5rem',
          lineHeight: '1.15'
        },
        content: {
          marginTop: '20px'
        },
        stepContainer: {
          ...styles.stepContainer,
          flexDirection: 'row',
          width: '50%',
          padding: '0 15px',
          marginBottom: '5px'
        },
        imageContainer: {
          ...styles.imageContainer,
          width: 'auto',
          marginBottom: '0',
          justifyContent: 'flex-end'
        },
        image: {
          ...styles.image,
          maxWidth: '150px',
          marginTop: '20px'
        },
        numberContainer: {
          ...styles.numberContainer,
          paddingTop: '100px',
          textAlign: 'left'
        },
        number: {
          ...styles.number,
          fontSize: '3.5rem',
          marginBottom: '6px',
          textAlign: 'left'
        },
        title: {
          ...styles.title,
          fontSize: '1.6rem',
          minHeight: '3rem',
          textAlign: 'left'
        },
        description: {
          ...styles.description,
          fontSize: '1rem',
          lineHeight: '1.45',
          marginTop: '7px'
        },
        bulletPoint: {
          ...styles.bulletPoint,
          fontSize: '1rem',
          marginBottom: '9px',
          paddingLeft: '20px'
        },
        progressContainer: {
          ...styles.progressContainer,
          marginTop: '0px',
          marginBottom: '8px'
        },
        progressLine: {
          margin: '0'
        }
      };
    }

    // Override for desktop
    if (deviceType === 'desktop') {
      return {
        ...styles,
        container: {
          ...styles.container,
          height: '100vh',
          padding: '60px 0'
        },
        header: {
          marginBottom: '0px'
        },
        headerTitle: {
          fontSize: '3rem',
          lineHeight: '1.1'
        },
        content: {
          marginTop: '10px'
        },
        stepContainer: {
          ...styles.stepContainer,
          flexDirection: 'row',
          width: '50%',
          padding: '0 20px',
          marginBottom: '0'
        },
        imageContainer: {
          ...styles.imageContainer,
          width: 'auto',
          marginBottom: '0',
        },
        image: {
          ...styles.image,
          width: '220px',
          maxWidth: '220px',
          marginTop: '40px'
        },
        numberContainer: {
          ...styles.numberContainer,
          paddingTop: '140px',
          textAlign: 'left'
        },
        number: {
          ...styles.number,
          fontSize: '4rem',
          marginBottom: '8px',
          textAlign: 'left'
        },
        title: {
          ...styles.title,
          fontSize: '1.8rem',
          minHeight: '4rem',
          textAlign: 'left',
        },
        description: {
          ...styles.description,
          fontSize: '1rem',
          lineHeight: '1.5',
          marginTop: '20px'
        },
        bulletPoint: {
          ...styles.bulletPoint,
          fontSize: '1rem',
          marginBottom: '8px',
          paddingLeft: '10px'
        },
        progressContainer: {
          ...styles.progressContainer,
          marginTop: '-10px',
        },
        progressLine: {
          margin: '0'
        }
      };
    }

    return styles;
  };

  const styles = getResponsiveStyles();

  return (
    <section 
      className="design-process-section"
      style={{
        position: 'relative',
        width: '100%',
        height: deviceType === 'mobile' ? 'auto' : deviceType === 'tablet' ? 'auto' : '85vh',
      }}
      aria-labelledby="web-design-process-heading"
      itemScope
      itemType="https://schema.org/Service"
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
          {/* Header section - dynamically loaded */}
          <header 
            ref={headerRef}
            className="transition-all duration-300"
            style={{
              marginBottom: styles.header.marginBottom,
              textAlign: 'center',
            }}
          >
            <h1 
              id="web-design-process-heading"
              className="font-bold mb-2"
              style={{
                fontSize: styles.headerTitle.fontSize,
                lineHeight: styles.headerTitle.lineHeight,
                textAlign: 'center',
                width: '100%'
              }}
              itemProp="name"
            >
              {processHeader.title}
            </h1>
            <p className="max-w-3xl mx-auto"
               style={{
                 fontSize: styles.headerDesc.fontSize,
                 textAlign: 'center',
                 width: '100%'
               }}
               itemProp="description"
            >
              {processHeader.subtitle}
            </p>
          </header>
          
          {/* Main content wrapper */}
          <main 
            ref={contentRef}
            style={{
              marginTop: styles.content.marginTop,
            }}
            role="main"
          >
            {/* Content sections - responsive for all device sizes */}
            <div className="mb-2 mt-0">
              <div style={{ 
                display: 'flex',
                flexDirection: deviceType === 'mobile' ? 'column' : 'row',
                transition: 'all 0.5s ease'
              }}>
                {getVisibleSteps().map(({ step, index }, position) => (
                  <article 
                    key={index}
                    style={{
                      width: styles.stepContainer.width,
                      padding: styles.stepContainer.padding,
                      flexShrink: 0,
                      marginBottom: styles.stepContainer.marginBottom,
                      animation: `fade-in 0.5s ease-in-out`,
                    }}
                    className="content-step"
                    itemScope
                    itemType="https://schema.org/Step"
                    aria-labelledby={`step-${index + 1}-title`}
                  >
                    {/* For mobile: Image first (moved to top) */}
                    {deviceType === 'mobile' && (
                      <figure 
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
                          alt={step.alt || `${step.title} process illustration`}
                          style={{
                            width: styles.image.width,
                            maxWidth: styles.image.maxWidth,
                            height: styles.image.height,
                            display: styles.image.display,
                          }}
                          loading="lazy"
                          itemProp="image"
                        />
                      </figure>
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
                          aria-label={`Step ${step.number}`}
                          itemProp="position"
                        >
                          {step.number}
                        </div>
                        
                        {/* Title */}
                        <h2
                          id={`step-${index + 1}-title`}
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
                          itemProp="name"
                        >
                          {step.title}
                        </h2>
                      </div>
                      
                      {/* Right side: Image (only show on tablet and desktop) */}
                      {deviceType !== 'mobile' && (
                        <figure 
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
                            alt={step.alt || `${step.title} process illustration`}
                            style={{
                              marginTop: deviceType === 'mobile' ? '0' : styles.image.marginTop,
                              width: deviceType === 'tablet' ? styles.image.maxWidth : styles.image.width,
                              maxWidth: styles.image.maxWidth,
                              height: 'auto',
                              display: 'block',
                            }}
                            loading="lazy"
                            itemProp="image"
                          />
                        </figure>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </div>
            
            {/* Progress line with dots - responsive for all device sizes */}
            <div 
              style={{ 
                marginTop: styles.progressContainer.marginTop, 
                marginBottom: styles.progressContainer.marginBottom,
              }}
              role="progressbar"
              aria-valuenow={currentIndex + 1}
              aria-valuemin={1}
              aria-valuemax={processSteps.length}
              aria-label={`Process step ${currentIndex + 1} of ${processSteps.length}`}
            >
              {/* The progress line itself */}
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
                
                {/* Dots - dynamic based on device type */}
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
                      {/* Description */}
                      <p
                        style={{
                          fontSize: styles.description.fontSize,
                          lineHeight: styles.description.lineHeight,
                          color: 'rgba(255, 255, 255, 0.9)',
                          marginTop: styles.description.marginTop,
                          marginBottom: '12px',
                   
                        }}
                        itemProp="description"
                      >
                        {step.description}
                      </p>
                      
                      {/* Bullet points */}
                      <ul 
                        style={{ 
                          listStyle: 'none', 
                          padding: '0', 
                          margin: '0' 
                        }}
                        itemProp="additionalProperty"
                        itemScope
                        itemType="https://schema.org/PropertyValue"
                      >
                        {step.bulletPoints.map((point, bulletIndex) => (
                          <li
                            key={bulletIndex}
                            style={{
                              fontSize: styles.bulletPoint.fontSize,
                              color: 'rgba(255, 255, 255, 0.8)',
                              marginBottom: styles.bulletPoint.marginBottom,
                              paddingLeft: styles.bulletPoint.paddingLeft,
                              position: 'relative',
                              lineHeight: '1.4',
                            }}
                            itemProp="value"
                          >
                            <span
                              style={{
                                position: 'absolute',
                                left: '0',
                                top: '0.2em',
                                width: '6px',
                                height: '6px',
                                backgroundColor: '#3DB4D0',
                                borderRadius: '50%',
                              }}
                              aria-hidden="true"
                            />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
      
      {/* Add CSS animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .content-step {
          transition: all 0.3s ease;
        }
        
        .content-step:hover {
          transform: translateY(-2px);
        }
        
        .progress-fill {
          transition: width 0.3s ease-out;
        }
        
        /* Responsive adjustments */
        @media (max-width: 767px) {
          .design-process-container {
            padding: 20px 0 40px !important;
          }
        }
        
        @media (min-width: 768px) and (max-width: 1023px) {
          .design-process-container {
            padding: 40px 0 50px !important;
          }
        }
        
        @media (min-width: 1024px) {
          .design-process-container {
            padding: 60px 0 !important;
            height: 100vh !important;
          }
        }
        
        /* Accessibility improvements */
        @media (prefers-reduced-motion: reduce) {
          .content-step,
          .progress-fill {
            transition: none;
          }
          
          @keyframes fade-in {
            from, to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        }
        
        /* Focus styles for keyboard navigation */
        .content-step:focus-within {
          outline: 2px solid #3DB4D0;
          outline-offset: 4px;
          border-radius: 4px;
        }
      `}</style>
    </section>
  );
};

export default WebDesignProcess;