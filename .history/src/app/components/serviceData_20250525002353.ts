export interface ServiceData {
  id: string;
  numericId: number;
  title: string;
  description: string;
  longDescription: string;
  price: string;
  duration: string;
  featured: boolean;
  image: string;
  bannerImage: string;
  deliverables: string[];
  process: string[];
  features: string[];
  faq?: Array<{
    id: string;
    title: string;
    description: string;
  }>;
}

export const services: ServiceData[] = [
  {
    id: "web-design",
    numericId: 1,
    title: "Website Design Services",
    description: "Creating sleek, strategic websites tailored to your brand.",
    longDescription: "Our custom website design services focus on creating visually stunning, strategically crafted websites that perfectly represent your brand identity. We blend modern aesthetics with conversion-driven UX principles to ensure your site not only captivates visitors but also drives meaningful business results.",
    price: "$1,500 - $5,000",
    duration: "3-6 weeks",
    featured: true,
    image: "/images/web-design.png",
    bannerImage: "/images/web-design.png",
    deliverables: [
      "Custom responsive website design",
      "Strategic user experience planning",
      "Content strategy consultation",
      "SEO-optimized site architecture",
      "Cross-browser compatibility testing",
      "Mobile-first design approach"
    ],
    process: [
      "Brand discovery and strategy session",
      "Wireframing and site architecture",
      "Custom visual design creation",
      "Responsive development",
      "Quality testing and launch"
    ],
    features: [
      "100% custom design, no templates",
      "Conversion-focused layouts",
      "Brand-aligned visual identity",
      "Fast loading optimization"
    ],
    faq: [
      {
        id: "section1",
        title: "Custom Website Design Process",
        description: "Our custom website design process begins with understanding your brand, target audience, and business goals. We create unique, tailored designs that reflect your brand identity while optimizing for user experience and conversions."
      },
      {
        id: "section2",
        title: "Responsive Design Standards",
        description: "Every website we design is fully responsive, ensuring optimal viewing and interaction across all devices - from desktop computers to tablets and smartphones. We prioritize mobile-first design principles."
      },
      {
        id: "section3",
        title: "SEO-Friendly Architecture",
        description: "Our websites are built with clean, semantic code and SEO best practices from the ground up, helping your site rank better in search engines and attract more organic traffic."
      },
      {
        id: "section4",
        title: "Brand Integration",
        description: "We seamlessly integrate your brand elements, color schemes, and messaging throughout the website design to create a cohesive digital presence that strengthens brand recognition."
      }
    ]
  },
  {
    id: "website-redesign",
    numericId: 2,
    title: "Website Redesign",
    description: "Revamping outdated sites into modern, high-performing platforms.",
    longDescription: "Transform your outdated website into a modern, high-performing digital powerhouse. Our comprehensive redesign process analyzes your current site's performance, identifies opportunities for improvement, and implements strategic updates to boost user engagement, conversion rates, and search engine rankings.",
    price: "$2,000 - $6,000",
    duration: "4-8 weeks",
    featured: false,
    image: "/images/website redesign.png",
    bannerImage: "/images/website redesign.png",
    deliverables: [
      "Comprehensive site audit and analysis",
      "Content migration and optimization",
      "Modern responsive redesign",
      "Performance optimization",
      "Analytics setup and tracking",
      "SEO improvements"
    ],
    process: [
      "Current site audit and analysis",
      "Redesign strategy development",
      "New design concepts creation",
      "Development and content migration",
      "Testing, optimization, and launch"
    ],
    features: [
      "Performance-driven improvements",
      "Modern design standards",
      "Enhanced user experience",
      "Improved conversion rates"
    ],
    faq: [
      {
        id: "section1",
        title: "Website Audit Process",
        description: "We conduct a thorough analysis of your current website, examining design, functionality, performance, and user experience to identify areas for improvement and optimization."
      },
      {
        id: "section2",
        title: "Content Migration",
        description: "Our team carefully migrates your existing content while optimizing it for better performance, SEO, and user engagement. We ensure no valuable content or SEO rankings are lost in the process."
      },
      {
        id: "section3",
        title: "Performance Optimization",
        description: "We implement advanced optimization techniques to improve site speed, reduce loading times, and enhance overall performance metrics that impact user experience and search rankings."
      },
      {
        id: "section4",
        title: "Modern Design Updates",
        description: "Your redesigned website will feature contemporary design trends, improved navigation, and enhanced visual appeal that reflects current web standards and user expectations."
      }
    ]
  },
  {
    id: "web-app-design",
    numericId: 3,
    title: "Web App Design",
    description: "Designing intuitive web applications focused on user experience.",
    longDescription: "We specialize in creating sophisticated, user-friendly web applications that solve complex problems with elegant simplicity. Our web app design process combines deep user research, strategic information architecture, and intuitive interface design to deliver powerful digital tools that users love to engage with.",
    price: "$3,000 - $10,000",
    duration: "6-12 weeks",
    featured: false,
    image: "/images/web-app-design.jpg",
    bannerImage: "/images/web-app-design.jpg",
    deliverables: [
      "User research and persona development",
      "Information architecture and user flows",
      "Interactive wireframes and prototypes",
      "Complete UI design system",
      "Component library documentation",
      "Developer handoff specifications"
    ],
    process: [
      "User research and requirements analysis",
      "Information architecture planning",
      "Wireframing and user flow mapping",
      "Interactive prototype development",
      "Visual design and system creation",
      "User testing and design refinement"
    ],
    features: [
      "User-centered design approach",
      "Scalable design systems",
      "Interactive prototyping",
      "Complex workflow optimization"
    ],
    faq: [
      {
        id: "section1",
        title: "Web App vs Website Design",
        description: "Web applications are interactive software programs accessed through browsers, requiring more complex user interface design, workflow optimization, and functionality planning compared to traditional websites."
      },
      {
        id: "section2",
        title: "User Experience Research",
        description: "We conduct thorough user research including interviews, surveys, and usability testing to understand your target users' needs, behaviors, and pain points before designing solutions."
      },
      {
        id: "section3",
        title: "Prototype Development",
        description: "Interactive prototypes allow you to test and refine the user experience before development begins, saving time and costs while ensuring the final product meets user expectations."
      },
      {
        id: "section4",
        title: "Design System Creation",
        description: "We create comprehensive design systems with reusable components, style guides, and documentation that ensure consistency and scalability as your web application grows."
      }
    ]
  },
  {
    id: "mobile-app-design",
    numericId: 4,
    title: "Mobile App Design",
    description: "Crafting beautiful, functional apps for mobile-first users.",
    longDescription: "Our mobile app design services create engaging, intuitive experiences specifically optimized for iOS and Android platforms. We focus on native platform conventions, touch-friendly interactions, and performance optimization to ensure your app delivers exceptional user experiences that drive engagement and retention.",
    price: "$3,500 - $12,000",
    duration: "6-14 weeks",
    featured: false,
    image: "/images/mobile App Design.png",
    bannerImage: "/images/mobile App Design.png",
    deliverables: [
      "Platform-specific UI designs (iOS/Android)",
      "Interactive app prototypes",
      "Micro-interaction and animation specs",
      "Complete design system and style guide",
      "App store optimization assets",
      "Developer-ready design files"
    ],
    process: [
      "Market research and competitive analysis",
      "User persona and journey mapping",
      "App wireframing and flow design",
      "Platform-specific UI design",
      "Interactive prototype testing",
      "Design refinement and finalization"
    ],
    features: [
      "Native platform optimization",
      "Touch-first interaction design",
      "App store ready assets",
      "Performance-optimized interfaces"
    ],
    faq: [
      {
        id: "section1",
        title: "iOS vs Android Design",
        description: "We design platform-specific interfaces that follow Apple's Human Interface Guidelines for iOS and Google's Material Design principles for Android, ensuring native feel and optimal user experience."
      },
      {
        id: "section2",
        title: "App Store Optimization",
        description: "Our design package includes app store screenshots, icons, and promotional materials optimized for both Apple App Store and Google Play Store to maximize download rates."
      },
      {
        id: "section3",
        title: "User Experience Testing",
        description: "We conduct usability testing with interactive prototypes to validate design decisions and ensure the app interface is intuitive and engaging for your target audience."
      },
      {
        id: "section4",
        title: "Animation and Interactions",
        description: "Thoughtful micro-interactions and animations enhance user engagement and provide visual feedback, making your app feel responsive and delightful to use."
      }
    ]
  },
  {
    id: "design-systems",
    numericId: 1,
    title: " Design Systems",
    description: "Creating sleek, strategic websites tailored to your brand.",
    longDescription: "Our custom website design services focus on creating visually stunning, strategically crafted websites that perfectly represent your brand identity. We blend modern aesthetics with conversion-driven UX principles to ensure your site not only captivates visitors but also drives meaningful business results.",
    price: "$1,500 - $5,000",
    duration: "3-6 weeks",
    featured: true,
    image: "/images/design system.png",
    bannerImage: "/images/design system.png",
    deliverables: [
      "Custom responsive website design",
      "Strategic user experience planning",
      "Content strategy consultation",
      "SEO-optimized site architecture",
      "Cross-browser compatibility testing",
      "Mobile-first design approach"
    ],
    process: [
      "Brand discovery and strategy session",
      "Wireframing and site architecture",
      "Custom visual design creation",
      "Responsive development",
      "Quality testing and launch"
    ],
    features: [
      "100% custom design, no templates",
      "Conversion-focused layouts",
      "Brand-aligned visual identity",
      "Fast loading optimization"
    ],
    faq: [
      {
        id: "section1",
        title: "Custom Website Design Process",
        description: "Our custom website design process begins with understanding your brand, target audience, and business goals. We create unique, tailored designs that reflect your brand identity while optimizing for user experience and conversions."
      },
      {
        id: "section2",
        title: "Responsive Design Standards",
        description: "Every website we design is fully responsive, ensuring optimal viewing and interaction across all devices - from desktop computers to tablets and smartphones. We prioritize mobile-first design principles."
      },
      {
        id: "section3",
        title: "SEO-Friendly Architecture",
        description: "Our websites are built with clean, semantic code and SEO best practices from the ground up, helping your site rank better in search engines and attract more organic traffic."
      },
      {
        id: "section4",
        title: "Brand Integration",
        description: "We seamlessly integrate your brand elements, color schemes, and messaging throughout the website design to create a cohesive digital presence that strengthens brand recognition."
      }
    ]
  },
  {
    id: "branding",
    numericId: 5,
    title: "Branding",
    description: "Building powerful brand identities that truly connect.",
    longDescription: "Our comprehensive branding services help establish authentic connections between your business and your audience. We develop cohesive brand identities that clearly communicate your values, differentiate you from competitors, and create lasting emotional connections with your target market through strategic positioning and compelling visual identity.",
    price: "$2,500 - $8,000",
    duration: "4-8 weeks",
    featured: false,
    image: "/images/branding.png",
    bannerImage: "/images/branding.png",
    deliverables: [
      "Brand strategy and positioning document",
      "Logo design and variations",
      "Color palette and typography system",
      "Brand voice and messaging guidelines",
      "Comprehensive brand style guide",
      "Business stationery design package"
    ],
    process: [
      "Brand discovery and market research",
      "Strategic positioning development",
      "Visual identity concept creation",
      "Brand application design",
      "Brand guidelines compilation",
      "Brand launch strategy support"
    ],
    features: [
      "Strategic brand positioning",
      "Comprehensive visual identity",
      "Market differentiation focus",
      "Emotional connection building"
    ],
    faq: [
      {
        id: "section1",
        title: "Brand Strategy Development",
        description: "We start every branding project with strategic discovery to understand your business goals, target audience, and competitive landscape, ensuring your brand positioning is both authentic and market-effective."
      },
      {
        id: "section2",
        title: "Logo Design Process",
        description: "Our logo design process includes multiple concept development, refinement rounds, and final delivery of logo files in all necessary formats for print and digital applications."
      },
      {
        id: "section3",
        title: "Brand Guidelines",
        description: "Comprehensive brand guidelines ensure consistent application of your visual identity across all touchpoints, maintaining brand integrity as your business grows and evolves."
      },
      {
        id: "section4",
        title: "Brand Application",
        description: "We design how your brand appears across various touchpoints including business cards, letterheads, packaging, and digital platforms to create a cohesive brand experience."
      }
    ]
  },
  {
    id: "ui-ux-design",
    numericId: 13,
    title: "UI/UX Design",
    description: "Creating intuitive interfaces that delight users and drive engagement.",
    longDescription: "Our UI/UX design services focus on creating intuitive, enjoyable digital experiences that satisfy user needs while achieving business objectives. We combine extensive user research, strategic information architecture, and beautiful visual design to build interfaces that feel natural, efficient, and delightful to use.",
    price: "$2,500 - $9,000",
    duration: "4-10 weeks",
    featured: true,
    image: "/images/ui-ux-design.jpg",
    bannerImage: "/images/ui-ux-design.jpg",
    deliverables: [
      "User research insights and personas",
      "Information architecture blueprints",
      "Low and high-fidelity wireframes",
      "Interactive prototypes and user flows",
      "Complete UI design system",
      "Usability testing reports and recommendations"
    ],
    process: [
      "User research and analysis",
      "Information architecture planning",
      "Wireframing and user flow design",
      "Interactive prototype development",
      "Visual interface design",
      "Usability testing and optimization"
    ],
    features: [
      "Research-driven design decisions",
      "User-centered design approach",
      "Data-backed optimization",
      "Comprehensive testing validation"
    ],
    faq: [
      {
        id: "section1",
        title: "UX Research Methods",
        description: "We employ various research methods including user interviews, surveys, analytics analysis, and competitive research to understand user needs and create evidence-based design solutions."
      },
      {
        id: "section2",
        title: "Design System Benefits",
        description: "Our UI design systems provide consistent, scalable interface components that streamline development, ensure design consistency, and improve user experience across all digital touchpoints."
      },
      {
        id: "section3",
        title: "Usability Testing Process",
        description: "We conduct structured usability testing sessions with real users to validate design decisions, identify pain points, and optimize interfaces for maximum user satisfaction and task completion."
      },
      {
        id: "section4",
        title: "Wireframing to Prototype",
        description: "Our process progresses from basic wireframes to interactive prototypes, allowing stakeholders to experience and refine the user experience before final development begins."
      }
    ]
  },
  {
    id: "wordpress-web-design",
    numericId: 12,
    title: "Wordpress Web Design",
    description: "Driving sales with stunning, conversion-focused store designs.",
    longDescription: "We design e-commerce experiences that perfectly balance aesthetic appeal with proven conversion optimization principles. Our e-commerce design services focus on creating trustworthy, user-friendly online stores that guide visitors seamlessly from product discovery through purchase completion, maximizing both user satisfaction and sales revenue.",
    price: "$3,000 - $12,000",
    duration: "6-12 weeks",
    featured: false,
    image: "/images/wordpress2.png",
    bannerImage: "/images/wordpress2.png",
    deliverables: [
      "Conversion-optimized store design",
      "Product catalog design and setup",
      "Shopping cart and checkout optimization",
      "Payment gateway integration design",
      "Inventory management interface",
      "Analytics and conversion tracking setup"
    ],
    process: [
      "E-commerce strategy and platform selection",
      "User experience and conversion optimization",
      "Store design and product showcase",
      "Shopping flow and checkout design",
      "Payment integration and security",
      "Testing, optimization, and launch"
    ],
    features: [
      "Conversion rate optimization",
      "Secure payment processing",
      "Mobile-first shopping experience",
      "Advanced product merchandising"
    ],
    faq: [
      {
        id: "section1",
        title: "E-commerce Platform Selection",
        description: "We help you choose the right e-commerce platform (Shopify, WooCommerce, Magento, etc.) based on your business needs, budget, and technical requirements for optimal performance and scalability."
      },
      {
        id: "section2",
        title: "Conversion Optimization",
        description: "Our e-commerce designs incorporate proven conversion optimization techniques including strategic product placement, streamlined checkout flows, and trust-building elements to maximize sales."
      },
      {
        id: "section3",
        title: "Mobile Commerce Design",
        description: "With mobile commerce growing rapidly, we prioritize mobile-first design ensuring your store provides excellent shopping experiences across all devices and screen sizes."
      },
      {
        id: "section4",
        title: "Payment Security",
        description: "We integrate secure payment gateways and implement SSL certificates, trust badges, and security features that build customer confidence and protect sensitive transaction data."
      }
    ]
  },
  {
    id: "ecommerce-web-design",
    numericId: 12,
    title: "ECommerce Web Design",
    description: "Driving sales with stunning, conversion-focused store designs.",
    longDescription: "We design e-commerce experiences that perfectly balance aesthetic appeal with proven conversion optimization principles. Our e-commerce design services focus on creating trustworthy, user-friendly online stores that guide visitors seamlessly from product discovery through purchase completion, maximizing both user satisfaction and sales revenue.",
    price: "$3,000 - $12,000",
    duration: "6-12 weeks",
    featured: false,
    image: "/images/storefront.png",
    bannerImage: "/images/storefront.png",
    deliverables: [
      "Conversion-optimized store design",
      "Product catalog design and setup",
      "Shopping cart and checkout optimization",
      "Payment gateway integration design",
      "Inventory management interface",
      "Analytics and conversion tracking setup"
    ],
    process: [
      "E-commerce strategy and platform selection",
      "User experience and conversion optimization",
      "Store design and product showcase",
      "Shopping flow and checkout design",
      "Payment integration and security",
      "Testing, optimization, and launch"
    ],
    features: [
      "Conversion rate optimization",
      "Secure payment processing",
      "Mobile-first shopping experience",
      "Advanced product merchandising"
    ],
    faq: [
      {
        id: "section1",
        title: "E-commerce Platform Selection",
        description: "We help you choose the right e-commerce platform (Shopify, WooCommerce, Magento, etc.) based on your business needs, budget, and technical requirements for optimal performance and scalability."
      },
      {
        id: "section2",
        title: "Conversion Optimization",
        description: "Our e-commerce designs incorporate proven conversion optimization techniques including strategic product placement, streamlined checkout flows, and trust-building elements to maximize sales."
      },
      {
        id: "section3",
        title: "Mobile Commerce Design",
        description: "With mobile commerce growing rapidly, we prioritize mobile-first design ensuring your store provides excellent shopping experiences across all devices and screen sizes."
      },
      {
        id: "section4",
        title: "Payment Security",
        description: "We integrate secure payment gateways and implement SSL certificates, trust badges, and security features that build customer confidence and protect sensitive transaction data."
      }
    ]
  },
   {
    id: "website-development",
    numericId: 14,
    title: "Website Development",
    description: "Building robust, scalable websites with cutting-edge technology.",
    longDescription: "Our website development services transform designs into fully functional, high-performance websites. We use modern technologies and best practices to create fast, secure, and scalable web solutions that provide exceptional user experiences while being easy to maintain and update.",
    price: "$2,000 - $8,000",
    duration: "4-8 weeks",
    featured: true,
    image: "/images/step6.png",
    bannerImage: "/images/step6.png",
    deliverables: [
      "Fully responsive website development",
      "Cross-browser compatibility testing",
      "Performance optimization and speed enhancement",
      "Content Management System integration",
      "SEO-friendly code structure",
      "Security implementation and SSL setup",
      "Analytics and tracking integration",
      "Documentation and training materials"
    ],
    process: [
      "Technical requirements analysis",
      "Development environment setup",
      "Frontend and backend development",
      "Integration and testing",
      "Performance optimization",
      "Deployment and launch"
    ],
    features: [
      "Modern web technologies",
      "Responsive and mobile-optimized",
      "Fast loading and performance optimized",
      "Secure and reliable architecture",

    ]
  },
  {
    id: "webapp-development",
    numericId: 15,
    title: "Web App Development",
    description: "Creating powerful web applications for complex business needs.",
    longDescription: "We develop sophisticated web applications that handle complex business logic and provide rich user experiences. Our web apps are built with scalable architectures, real-time capabilities, and advanced functionality to support your business operations and user requirements.",
    price: "$5,000 - $25,000",
    duration: "8-16 weeks",
    featured: true,
    image: "/images/web-design.png",
    bannerImage: "/images/web-design.png",
    deliverables: [
      "Custom web application development",
      "Database design and implementation",
      "User authentication and authorization",
      "Real-time features and notifications",
      "API development and integration",
      "Admin dashboard and analytics",
      "Automated testing and quality assurance",
      "Deployment and hosting setup"
    ],
    process: [
      "Requirements analysis and planning",
      "System architecture design",
      "Database and backend development",
      "Frontend application development",
      "Integration and testing",
      "Deployment and optimization"
    ],
    features: [
      "Scalable architecture",
      "Real-time functionality",
      "Advanced user management",
      "Custom business logic",
      "API integrations",
      "Performance monitoring"
    ]
  },
  {
    id: "custom-web-development",
    numericId: 16,
    title: "Custom Web Development",
    description: "Tailored web solutions built specifically for your unique requirements.",
    longDescription: "Our custom web development services create bespoke solutions tailored to your specific business needs. We build from scratch using the most appropriate technologies for your requirements, ensuring your web solution is perfectly aligned with your business processes and goals.",
    price: "$4,000 - $20,000",
    duration: "6-14 weeks",
    featured: false,
    image: "/images/custom website design.png",
    bannerImage: "/images/custom website design.png",
    deliverables: [
      "Custom-built web solution",
      "Tailored functionality and features",
      "Third-party system integrations",
      "Custom database design",
      "Automated workflows and processes",
      "Custom reporting and analytics",
      "API development for integrations",
      "Comprehensive documentation"
    ],
    process: [
      "Detailed requirements gathering",
      "Custom solution architecture",
      "Agile development methodology",
      "Continuous testing and feedback",
      "Integration and deployment",
      "Training and handover"
    ],
    features: [
      "100% custom-built solution",
      "Tailored to specific requirements",
      "Flexible and extensible",
      "Integration-ready",
      
    ]
  },
  {
    id: "ecommerce-development",
    numericId: 17,
    title: "E-commerce Development",
    description: "Building high-converting online stores with advanced functionality.",
    longDescription: "We develop comprehensive e-commerce solutions that drive sales and provide exceptional shopping experiences. Our e-commerce development includes custom features, payment integrations, inventory management, and optimization for conversion and performance.",
    price: "$4,000 - $15,000",
    duration: "6-12 weeks",
    featured: true,
    image: "/images/storefront.png",
    bannerImage: "/images/storefront.png",
    deliverables: [
      "Custom e-commerce platform development",
      "Payment gateway integrations",
      "Inventory management system",
      "Order processing and fulfillment",
      "Customer account management",
      "Shopping cart and checkout optimization",
      "Product catalog and search functionality",
      "Analytics and reporting dashboard"
    ],
    process: [
      "E-commerce strategy and planning",
      "Platform development and setup",
      "Payment and shipping integration",
      "Product catalog implementation",
      "Testing and optimization",
      "Launch and monitoring"
    ],
    features: [
      "Multi-payment gateway support",
      "Advanced inventory management",
      "Mobile-optimized shopping",
      "SEO-friendly structure",
      "Security and compliance",
      "Scalable for growth"
    ]
  },
  {
    id: "shopify-development",
    numericId: 18,
    title: "Shopify Development",
    description: "Expert Shopify store development and customization services.",
    longDescription: "Our Shopify development services leverage the power of the Shopify platform to create beautiful, high-converting online stores. We specialize in custom theme development, app integrations, and advanced Shopify features to maximize your store's potential.",
    price: "$2,500 - $10,000",
    duration: "4-10 weeks",
    featured: false,
    image: "/images/shopify.png",
    bannerImage: "/images/shopify banner.png",
    deliverables: [
      "Custom Shopify theme development",
      "Shopify app integrations",
      "Product catalog setup and optimization",
      "Payment and shipping configuration",
      "Custom functionality development",
      "Shopify Plus advanced features",
      "Performance optimization",
      "Store management training"
    ],
    process: [
      "Shopify store setup and configuration",
      "Custom theme development",
      "App integration and customization",
      "Product and content migration",
      "Testing and optimization",
      "Launch and training"
    ],
    features: [
      "Custom Shopify themes",
      "Advanced app integrations",
      "Mobile-first development",
      "Conversion optimization",
    
    ]
  },
  {
    id: "wordpress-development",
    numericId: 19,
    title: "WordPress Development",
    description: "Professional WordPress websites with custom functionality.",
    longDescription: "We create powerful WordPress websites that combine ease of use with advanced functionality. Our WordPress development includes custom themes, plugin development, and optimization to deliver fast, secure, and user-friendly websites that are easy to manage.",
    price: "$1,800 - $8,000",
    duration: "3-8 weeks",
    featured: false,
    image: "/images/wordpress2.png",
    bannerImage: "/images/wordpress2.png",
    deliverables: [
      "Custom WordPress theme development",
      "Plugin development and customization",
      "Content management system setup",
      "SEO optimization and configuration",
      "Security hardening and optimization",
      "Performance optimization",
      "Backup and maintenance setup",
      "User training and documentation"
    ],
    process: [
      "WordPress setup and configuration",
      "Custom theme development",
      "Plugin integration and customization",
      "Content migration and setup",
      "Testing and optimization",
      "Launch and training"
    ],
    features: [
      "Custom WordPress themes",
      "Plugin development",
      "Easy content management",
      "SEO-optimized structure",
      "Security best practices",
      "Performance optimized"
    ]
  },
  {
    id: "pos-development",
    numericId: 20,
    title: "POS Development",
    description: "Custom point-of-sale systems for retail and service businesses.",
    longDescription: "We develop custom Point of Sale (POS) systems that streamline your business operations. Our POS solutions include inventory management, sales tracking, customer management, and reporting features tailored to your specific business requirements.",
    price: "$8,000 - $30,000",
    duration: "10-18 weeks",
    featured: false,
    image: "/images/pos-development.jpg",
    bannerImage: "/images/pos-development.jpg",
    deliverables: [
      "Custom POS system development",
      "Inventory management integration",
      "Sales processing and tracking",
      "Customer relationship management",
      "Reporting and analytics dashboard",
      "Payment processing integration",
      "Multi-location support",
      "Staff training and support"
    ],
    process: [
      "Business requirements analysis",
      "POS system architecture design",
      "Core functionality development",
      "Integration and testing",
      "Hardware setup and configuration",
      "Training and deployment"
    ],
    features: [
      "Real-time inventory tracking",
      "Multi-payment support",
      "Customer management",
      "Detailed reporting",
      "Multi-location capable",
      "Hardware integration"
    ]
  },
  {
    id: "custom-software-development",
    numericId: 21,
    title: "Custom Software Development",
    description: "Bespoke software solutions for unique business challenges.",
    longDescription: "We develop custom software solutions that address your specific business challenges and requirements. Our software development process ensures that you get a solution that perfectly fits your workflow, integrates with existing systems, and scales with your business growth.",
    price: "$10,000 - $50,000",
    duration: "12-24 weeks",
    featured: true,
    image: "/images/custom software design.png",
    bannerImage: "/images/custom software design.png",
    deliverables: [
      "Custom software application",
      "Database design and implementation",
      "User interface and experience design",
      "System integrations and APIs",
      "Automated testing and quality assurance",
      "Documentation and training materials",
      "Deployment and hosting setup",
      "Ongoing support and maintenance"
    ],
    process: [
      "Requirements analysis and planning",
      "System design and architecture",
      "Agile development methodology",
      "Continuous testing and iteration",
      "Integration and deployment",
      "Training and support"
    ],
    features: [
      "Fully customized solution",
      "Scalable architecture",
      "Integration capabilities",
      "Advanced functionality",
 
    ]
  },
  {
    id: "backend-api-development",
    numericId: 22,
    title: "Backend & API Development",
    description: "Robust backend systems and APIs that power modern applications.",
    longDescription: "We build powerful backend systems and APIs that serve as the foundation for web applications, mobile apps, and integrations. Our backend development focuses on performance, security, and scalability to ensure your applications run smoothly and efficiently.",
    price: "$6,000 - $25,000",
    duration: "8-16 weeks",
    featured: false,
    image: "/images/backend-api-development.jpg",
    bannerImage: "/images/backend-api-development.jpg",
    deliverables: [
      "RESTful API development",
      "Database design and optimization",
      "Server architecture and setup",
      "Authentication and authorization systems",
      "Data processing and analytics",
      "Third-party service integrations",
      "API documentation and testing",
      "Performance monitoring and optimization"
    ],
    process: [
      "API design and documentation",
      "Database architecture planning",
      "Backend development and testing",
      "Security implementation",
      "Performance optimization",
      "Deployment and monitoring"
    ],
    features: [
      "RESTful API architecture",
      "Scalable backend systems",
      "Database optimization",
      "Security best practices",
      "Real-time capabilities",
      "Integration-ready"
    ]
  },
   {
    id: "seo-strategy",
    numericId: 23,
    title: "SEO Strategy",
    description: "Comprehensive SEO strategies that drive long-term organic growth.",
    longDescription: "Our SEO strategy services develop comprehensive roadmaps for achieving sustainable organic growth. We analyze your business goals, competitive landscape, and target audience to create data-driven strategies that improve search rankings, increase organic traffic, and drive meaningful conversions.",
    price: "$2,500 - $8,000",
    duration: "4-8 weeks",
    featured: true,
    image: "/images/SEO Strategy.png",
    bannerImage: "/images/SEO Strategy.png",
    deliverables: [
      "Comprehensive SEO strategy document",
      "Competitive analysis and gap assessment",
      "Keyword research and target identification",
      "Content strategy and topic clusters",
      "Technical SEO roadmap",
      "Link building strategy",
      "Performance tracking and KPI setup",
      "Implementation timeline and priorities"
    ],
    process: [
      "Business and competitor analysis",
      "Keyword research and opportunity mapping",
      "Strategy development and planning",
      "Implementation roadmap creation",
      "Performance measurement setup",
      "Ongoing strategy refinement"
    ],
    features: [
      "Data-driven strategy development",
      "Competitive landscape analysis",
      "Long-term growth planning",
      "ROI-focused approach",
    
    ]
  },
  {
    id: "local-seo",
    numericId: 24,
    title: "Local SEO",
    description: "Dominate local search results and attract nearby customers.",
    longDescription: "Our local SEO services help businesses dominate local search results and attract customers in their geographic area. We optimize your online presence for local searches, manage your Google Business Profile, and build local citations to increase visibility and drive foot traffic.",
    price: "$1,500 - $5,000",
    duration: "3-6 weeks",
    featured: true,
    image: "/images/Local SEO.png",
    bannerImage: "/images/Local SEO.png"",
    deliverables: [
      "Google Business Profile optimization",
      "Local keyword research and targeting",
      "Local citation building and management",
      "Review generation and management strategy",
      "Local content optimization",
      "NAP consistency audit and fixes",
      "Local schema markup implementation",
      "Local SEO performance tracking setup"
    ],
    process: [
      "Local market and competitor analysis",
      "Google Business Profile setup and optimization",
      "Local citation building and management",
      "Review strategy implementation",
      "Local content creation and optimization",
      "Performance monitoring and reporting"
    ],
    features: [
      "Google Business Profile optimization",
      "Local citation management",
      "Review generation strategies",
      "Local keyword targeting",
  
    ]
  },
  {
    id: "technical-seo",
    numericId: 25,
    title: "Technical SEO",
    description: "Optimize your website's technical foundation for search engines.",
    longDescription: "Our technical SEO services ensure your website's technical foundation supports optimal search engine performance. We address crawling and indexing issues, improve site speed, implement structured data, and optimize technical elements that impact search rankings and user experience.",
    price: "$2,000 - $6,000",
    duration: "4-8 weeks",
    featured: false,
    image: "/images/Technical SEO.png",
    bannerImage: "/images/Technical SEO.png",
    deliverables: [
      "Comprehensive technical SEO audit",
      "Site speed optimization and Core Web Vitals improvement",
      "Crawling and indexing optimization",
      "Structured data and schema markup implementation",
      "Mobile optimization and responsiveness fixes",
      "URL structure and internal linking optimization",
      "XML sitemap creation and optimization",
      "Technical SEO monitoring setup"
    ],
    process: [
      "Technical audit and issue identification",
      "Site architecture and crawling optimization",
      "Page speed and performance improvements",
      "Structured data implementation",
      "Mobile and user experience optimization",
      "Ongoing technical monitoring"
    ],
    features: [
      "Comprehensive technical audits",
      "Site speed optimization",
      "Crawling and indexing improvements",
      "Structured data implementation",
     
    ]
  },
  {
    id: "on-page-seo",
    numericId: 26,
    title: "On-Page SEO",
    description: "Optimize individual pages for higher rankings and better user experience.",
    longDescription: "Our on-page SEO services optimize individual web pages to rank higher and earn more relevant traffic. We focus on content optimization, meta tags, internal linking, and user experience factors that help search engines understand and rank your content effectively.",
    price: "$1,200 - $4,000",
    duration: "3-6 weeks",
    featured: false,
    image: "/images/on-page-seo.jpg",
    bannerImage: "/images/on-page-seo.jpg",
    deliverables: [
      "Content optimization and keyword integration",
      "Meta titles and descriptions optimization",
      "Header tag structure optimization",
      "Internal linking strategy and implementation",
      "Image optimization and alt text",
      "Content gap analysis and recommendations",
      "User experience and engagement improvements",
      "On-page SEO performance tracking"
    ],
    process: [
      "Page-level SEO audit and analysis",
      "Content optimization and keyword integration",
      "Meta tag and header optimization",
      "Internal linking improvements",
      "User experience enhancements",
      "Performance monitoring and refinement"
    ],
    features: [
      "Content optimization",
      "Meta tag optimization",
      "Internal linking strategies",
      "User experience improvements",
      "Keyword integration",
      "Content quality enhancement"
    ]
  },
  {
    id: "off-page-seo",
    numericId: 27,
    title: "Off-Page SEO",
    description: "Build authority and trust through strategic link building and promotion.",
    longDescription: "Our off-page SEO services build your website's authority and trustworthiness through strategic link building, content promotion, and relationship building. We focus on earning high-quality backlinks and building online reputation to improve search rankings and domain authority.",
    price: "$2,000 - $7,000",
    duration: "6-12 weeks",
    featured: false,
    image: "/images/Off page SEO.png",
    bannerImage: "/images/Off page SEO.png",
    deliverables: [
      "Link building strategy and implementation",
      "High-quality backlink acquisition",
      "Content promotion and outreach",
      "Brand mention and citation building",
      "Social media optimization for SEO",
      "Online reputation management",
      "Competitor backlink analysis",
      "Link profile monitoring and reporting"
    ],
    process: [
      "Link opportunity research and analysis",
      "Outreach strategy development",
      "Content creation for link building",
      "Relationship building and networking",
      "Link acquisition and monitoring",
      "Authority building and reputation management"
    ],
    features: [
      "Strategic link building",
      "High-quality backlink acquisition",
      "Content promotion strategies",
      "Brand authority building",
    
    ]
  },
  {
    id: "ecommerce-seo",
    numericId: 28,
    title: "E-commerce SEO",
    description: "Drive more qualified traffic and sales to your online store.",
    longDescription: "Our e-commerce SEO services are specifically designed to drive qualified traffic and increase sales for online stores. We optimize product pages, category structures, and implement e-commerce-specific SEO strategies that improve visibility and conversion rates.",
    price: "$2,500 - $8,000",
    duration: "6-12 weeks",
    featured: true,
    image: "/images/ecommerce-seo.jpg",
    bannerImage: "/images/ecommerce-seo.jpg",
    deliverables: [
      "E-commerce SEO strategy and roadmap",
      "Product page optimization",
      "Category and navigation structure optimization",
      "E-commerce keyword research and targeting",
      "Product schema markup implementation",
      "Internal linking strategy for e-commerce",
      "Content strategy for product and category pages",
      "Conversion-focused SEO improvements"
    ],
    process: [
      "E-commerce site audit and analysis",
      "Product and category optimization",
      "Technical e-commerce SEO improvements",
      "Content strategy for e-commerce",
      "Conversion optimization integration",
      "Performance tracking and refinement"
    ],
    features: [
      "Product page optimization",
      "E-commerce technical SEO",
      "Category structure optimization",
      "Shopping-focused keyword targeting",
      "Product schema implementation",
      "Conversion rate integration"
    ]
  },
  {
    id: "content-strategy",
    numericId: 29,
    title: "Content Strategy",
    description: "Create content that ranks, engages, and converts your audience.",
    longDescription: "Our content strategy services develop comprehensive plans for creating content that ranks well in search engines while engaging and converting your target audience. We focus on topic clusters, user intent, and strategic content planning that supports your SEO and business goals.",
    price: "$1,800 - $6,000",
    duration: "4-8 weeks",
    featured: false,
    image: "/images/content-strategy.jpg",
    bannerImage: "/images/content-strategy.jpg",
    deliverables: [
      "Comprehensive content strategy document",
      "Topic cluster and pillar page planning",
      "Content calendar and publishing schedule",
      "User intent and audience analysis",
      "Content gap analysis and opportunities",
      "SEO content guidelines and templates",
      "Content performance measurement framework",
      "Editorial workflow and process documentation"
    ],
    process: [
      "Audience and competitor content analysis",
      "Topic research and cluster development",
      "Content planning and calendar creation",
      "SEO integration and optimization guidelines",
      "Content creation workflow setup",
      "Performance tracking and optimization"
    ],
    features: [
      "Topic cluster development",
      "User intent alignment",
      "Content gap analysis",
      "SEO-optimized content planning",
      "Editorial calendar creation",
      "Performance measurement framework"
    ]
  },
  {
    id: "keyword-research",
    numericId: 30,
    title: "Keyword Research",
    description: "Discover high-value keywords that drive targeted traffic and conversions.",
    longDescription: "Our keyword research services identify high-value keyword opportunities that drive targeted traffic and conversions. We analyze search volume, competition, and user intent to develop comprehensive keyword strategies that align with your business goals and target audience.",
    price: "$800 - $3,000",
    duration: "2-4 weeks",
    featured: false,
    image: "/images/keyword-research.jpg",
    bannerImage: "/images/keyword-research.jpg",
    deliverables: [
      "Comprehensive keyword research report",
      "Target keyword list with metrics and priorities",
      "Competitor keyword analysis",
      "Long-tail keyword opportunities",
      "Search intent analysis and categorization",
      "Keyword mapping to content and pages",
      "Seasonal and trending keyword insights",
      "Keyword tracking and monitoring setup"
    ],
    process: [
      "Business and audience analysis",
      "Keyword discovery and expansion",
      "Competition and difficulty analysis",
      "Search intent categorization",
      "Keyword prioritization and mapping",
      "Strategy development and recommendations"
    ],
    features: [
      "Comprehensive keyword discovery",
      "Competition analysis",
      "Search intent mapping",
      "Long-tail opportunity identification",
      "Keyword difficulty assessment",
      "Strategic keyword prioritization"
    ]
  },
  {
    id: "seo-audit",
    numericId: 31,
    title: "SEO Audit",
    description: "Comprehensive analysis to identify and fix SEO issues holding you back.",
    longDescription: "Our SEO audit services provide comprehensive analysis of your website's SEO performance, identifying technical issues, content gaps, and optimization opportunities. We deliver actionable recommendations and prioritized action plans to improve your search rankings and organic visibility.",
    price: "$1,000 - $4,000",
    duration: "2-4 weeks",
    featured: false,
    image: "/images/seo-audit.jpg",
    bannerImage: "/images/seo-audit.jpg",
    deliverables: [
      "Comprehensive SEO audit report",
      "Technical SEO issue identification and fixes",
      "Content analysis and optimization opportunities",
      "Backlink profile analysis",
      "Competitor analysis and benchmarking",
      "Prioritized action plan and recommendations",
      "Quick wins and long-term strategy",
      "Performance tracking setup recommendations"
    ],
    process: [
      "Technical SEO crawl and analysis",
      "Content and on-page SEO evaluation",
      "Off-page and backlink analysis",
      "Competitor benchmarking",
      "Opportunity identification and prioritization",
      "Actionable recommendations and roadmap"
    ],
    features: [
      "Comprehensive website analysis",
      "Technical issue identification",
      "Content optimization opportunities",
      "Competitive benchmarking",
      "Prioritized action plans",
      "Performance improvement roadmap"
    ]
  }
];

// Updated function to work with string IDs
export const getServiceById = async (id: string): Promise<ServiceData | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const service = services.find(s => s.id === id);
      resolve(service || null);
    }, 500);
  });
};

// Helper function to get numeric ID for components that still need it
export const getNumericServiceId = (stringId: string): number => {
  const service = services.find(s => s.id === stringId);
  return service?.numericId || 1;
};

export default services;