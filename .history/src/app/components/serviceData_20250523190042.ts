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
    image: "/images/website-design.jpg",
    bannerImage: "/images/website-design.jpg",
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
    image: "/images/website-redesign.jpg",
    bannerImage: "/images/website-redesign.jpg",
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
    image: "/images/mobile-app-design.jpg",
    bannerImage: "/images/mobile-app-design.jpg",
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
    id: "branding",
    numericId: 5,
    title: "Branding",
    description: "Building powerful brand identities that truly connect.",
    longDescription: "Our comprehensive branding services help establish authentic connections between your business and your audience. We develop cohesive brand identities that clearly communicate your values, differentiate you from competitors, and create lasting emotional connections with your target market through strategic positioning and compelling visual identity.",
    price: "$2,500 - $8,000",
    duration: "4-8 weeks",
    featured: false,
    image: "/images/branding.jpg",
    bannerImage: "/images/branding.jpg",
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
    id: "ecommerce-web-design",
    numericId: 12,
    title: "eCommerce Web Design",
    description: "Driving sales with stunning, conversion-focused store designs.",
    longDescription: "We design e-commerce experiences that perfectly balance aesthetic appeal with proven conversion optimization principles. Our e-commerce design services focus on creating trustworthy, user-friendly online stores that guide visitors seamlessly from product discovery through purchase completion, maximizing both user satisfaction and sales revenue.",
    price: "$3,000 - $12,000",
    duration: "6-12 weeks",
    featured: false,
    image: "/images/ecommerce-design.jpg",
    bannerImage: "/images/ecommerce-design.jpg",
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