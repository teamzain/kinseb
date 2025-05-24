export interface FeaturedProject {
  id: number;
  title: string;
  description: string;
  image: string;
}

export interface ProjectCollection {
  serviceId: number;
  projects: FeaturedProject[];
}

// Projects for Website Design Services (Service ID: 1)
const websiteDesignProjects: FeaturedProject[] = [
 
  {
    "id": 1,
    "title": "Ikram Forces Academy",
    "description": "Educational website developed for a premier coaching academy. Features include tailored program sections, admission guidance, and a responsive design to support students preparing for cadet college and academic excellence.",
    "image": "/images/projects/webdev1.jpg"
  },
  {
    "id": 2,
    "title": "Drifinity - Digital Consulting Company",
    "description": "Custom-designed static website for a tech consulting firm featuring smooth animations, responsive layout, and clear service offerings with call-to-action elements.",
    "image": "/images/projects/webdev2.jpg"
  },
  {
    "id": 3,
    "title": "Captive Power Solution",
    "description": "E-commerce website for a generator company featuring product listings, detailed specifications, and a custom ordering system for power solutions.",
    "image": "/images/projects/webdev3.jpg"
  }
];


// Projects for Website Redesign (Service ID: 2)
const websiteRedesignProjects: FeaturedProject[] = [
  {
    id: 1,
    "title": "Body Fitness ",
  "description": "Redesigned fitness website focused on modern UI/UX, showcasing workout programs, trainer profiles, and membership plans. Built for mobile-first access and high user engagement.",

    image: "/images/projects/webredesign1.jpg"
  },
  {
    id: 2,
    "title": "Home Décor",
  "description": "Redesigned website for a home décor brand with an elegant layout, product highlights, visual storytelling, and a seamless browsing experience for interior design enthusiasts."
,
    image: "/images/projects/webredesign2.jpg"
  },
 
];

// Projects for Web App Design (Service ID: 3)
const webAppDesignProjects: FeaturedProject[] = [
  {
    id: 1,
     "title": "Cary Physicians Primary Care",
  "description": "Full-stack website for a primary care clinic featuring appointment scheduling, service overviews, provider profiles, and HIPAA-compliant contact forms.",

    image: "/images/projects/webapp2.jpg"
  },
  {
    id: 2,
    "title": "Kissan Ghar",
  "description": "E-commerce platform for Pakistan’s largest agricultural store with product categorization, mobile-friendly design, secure checkout, and digital marketing strategy to boost online sales and farmer outreach.",

    image: "/images/projects/webapp2.1.jpg"
  },
 
];

// Projects for Mobile App Design (Service ID: 4)
const mobileAppDesignProjects: FeaturedProject[] = [
  {
    id: 1,
    "title": "Food Delivery App Design",
  "description": "A sleek and intuitive mobile app design for a food delivery platform. Features include real-time order tracking, restaurant listings, dish previews, and a user-friendly checkout experience.",
    image: "/images/projects/mobiledesign1.jpg"
  },
  {
    id: 2,
    "title": " Music Player App Design",
  "description": "A modern and responsive mobile app design for a music player, offering playlist management, smooth navigation, and immersive audio controls with a visually appealing UI.",
    image: "/images/projects/mobiledesign2.jpg"
  },

];

// Projects for Branding (Service ID: 5)
const brandingProjects: FeaturedProject[] = [
  {
    id: 1,
     "title": "GreenNest – Eco Brand Identity Design",
  "description": "Full branding design for an eco-lifestyle brand including shirts, caps, mugs, USBs, tote bags, and more. Focused on sustainability and simplicity, the visuals were crafted with a clean green theme to ensure brand consistency across all products.",
    image: "/images/projects/brandingproject1.jpg"
  },
  {
    id: 2,
    "title": "CoreLoop – Modern Corporate Merchandise",
  "description": "A complete corporate branding project featuring custom-designed apparel and accessories such as polo shirts, caps, mugs, and flags. The modern design aligned with the brand’s innovative identity and ensured a polished presence at events and internal use.",
    image: "/images/projects/brandingproject2.jpg"
  },
 
];

// Projects for UI/UX Design (Service ID: 13)
const uiUxDesignProjects: FeaturedProject[] = [
  {
    id: 1,
   "title": "IT Company UI/UX Design",
  "description": "Crafted a clean and modern UI/UX design for a technology company website. The interface highlights the company’s services, portfolio, and team with an intuitive layout that enhances credibility and user trust. Optimized for both desktop and mobile platforms.",
    image: "/images/projects/uiuxdesign1.jpg"
  },
  {
    id: 2,
   "title": "Multi-Product Store UI/UX",
  "description": "Designed the complete user experience for a multi-product eCommerce store, featuring dynamic product filtering, intuitive navigation, and a visually appealing interface. The goal was to improve product discovery and streamline the shopping journey for customers.",
    image: "/images/projects/uiuxdesign2.jpg"
  },
  
];


const ecommercewebdesign: FeaturedProject[] = [
  {
  id: 1,
  title: "Bookraze – Online Bookstore",
  description: "Visually engaging eCommerce UI design tailored for book enthusiasts, featuring intuitive navigation, advanced search filters, cozy visual themes, and a seamless mobile-first experience.",
  image: "/images/projects/devecom1.jpg"
},
{
  id: 2,
  title: "Falcon Innovative Technologies",
  description: "Modern eCommerce design crafted for a tech-forward brand, combining sleek layouts, interactive product displays, and a responsive interface to enhance user trust and brand perception.",
  image: "/images/projects/devecom2.jpg"
},
{
  id: 3,
  title: "Kissan Ghar",
  description: "User-centered eCommerce design for an agricultural store, emphasizing accessibility, product categorization, rural user-friendliness, and brand consistency to improve engagement and usability.",
  image: "/images/projects/webapp2.1.jpg"
}

];
// Projects for eCommerce Web Design (Service ID: 12)
const ecommerceDesignProjects: FeaturedProject[] = [
 {
  id: 1,
  title: "Bookraze – Online Bookstore",
  description: "Visually engaging eCommerce UI design tailored for book enthusiasts, featuring intuitive navigation, advanced search filters, cozy visual themes, and a seamless mobile-first experience.",
  image: "/images/projects/devecom1.jpg"
},
{
  id: 2,
  title: "Falcon Innovative Technologies",
  description: "Modern eCommerce design crafted for a tech-forward brand, combining sleek layouts, interactive product displays, and a responsive interface to enhance user trust and brand perception.",
  image: "/images/projects/devecom2.jpg"
},
{
  id: 3,
  title: "Kissan Ghar",
  description: "User-centered eCommerce design for an agricultural store, emphasizing accessibility, product categorization, rural user-friendliness, and brand consistency to improve engagement and usability.",
  image: "/images/projects/webapp2.1.jpg"
}

];
const designsystem: FeaturedProject[] = [
  {
    "id": 1,
    "title": "Dani’s Fabric – POS Interface Design System",
    "description": "A modular design system for a textile POS platform with consistent UI components, intuitive layout patterns, responsive design tokens, and scalable visual elements to support catalog, sales, and inventory management.",
    "image": "/images/projects/devpos1.jpg"
  },
  {
    "id": 2,
    "title": "Pak Traders – Web App Design System",
    "description": "Clean and scalable design system crafted for a login and user management portal. Includes standardized input fields, authentication flows, and a foundation for adding future modules with design consistency.",
    "image": "/images/projects/devpos2.jpg"
  },
  {
    "id": 3,
    "title": "Kashaf Noor Libas – POS UI Design Framework",
    "description": "Component-driven UI design system tailored for a clothing store POS. Features reusable layout grids, style guidelines for product and transaction modules, and responsive interfaces optimized for daily retail operations.",
    "image": "/images/projects/devpos3.jpg"
  }
];


// Additional service projects for new services
const logoDesignProjects: FeaturedProject[] = [
  {
    id: 1,
     "title": "Fashion Threads – Clothing Brand Logo",
    "description": "Trendy logo with a striped t-shirt and banner, perfect for a modern fashion brand.",
    image: "/images/projects/logodesign1.jpg"
  },
  {
    id: 2,
   "title": "TechNova – IT Solutions Logo",
    "description": "Sleek, futuristic logo with digital elements for an innovative IT company.",
    image: "/images/projects/logodesign2.jpg"
  },

];

const brandIdentityProjects: FeaturedProject[] = [
  {
    id: 1,
    title: "Metro Architecture Firm",
    description: "Complete brand identity system for architectural firm including business cards, letterheads, and signage.",
    image: "/images/projects/metro-identity.jpg"
  },
  {
    id: 2,
    title: "Sunrise Wellness Spa",
    description: "Calming brand identity for wellness spa with cohesive visual elements across all touchpoints.",
    image: "/images/projects/sunrise-identity.jpg"
  },
  {
    id: 3,
    title: "Summit Financial Group",
    description: "Trustworthy brand identity for financial services with professional color palette and typography.",
    image: "/images/projects/summit-identity.jpg"
  }
];
const wordpresswebdesign: FeaturedProject[] = [
 
  {
    "id": 1,
    "title": "Falcon Innovative Technologies",
    "description": "Custom WordPress design for a tech brand, featuring a responsive layout, product-focused UI, and easy CMS integration to ensure smooth content management and brand consistency.",
    "image": "/images/projects/devecom2.jpg"
  },
  {
    "id": 2,
    "title": "Kissan Ghar",
    "description": "WordPress-powered design for an agricultural e-commerce store with intuitive categorization, mobile optimization, and a user-friendly dashboard for effortless updates and content control.",
    "image": "/images/projects/webapp2.1.jpg"
  }


];

const graphicDesignProjects: FeaturedProject[] = [
  {
    id: 1,
       "title": "Zakat Awareness Poster – Zakat Wise",
    "description": "Designed an impactful awareness poster for Zakat Wise using Adobe Photoshop. The layout emphasizes clarity and compassion, combining Islamic geometric patterns, thoughtful typography, and symbolic imagery to visually communicate the importance of Zakat in uplifting communities.",
    image: "/images/projects/graphicdesign1.jpg"
  },
 
];
const shopifywebdesign: FeaturedProject[] = [
 
  {
    "id": 1,
    "title": "Woodarq – Premium Home & Office Furniture Store",
    "description": "Modern and minimalistic design crafted for a premium furniture brand. Focuses on visual storytelling, clean product layouts, and a warm color scheme to enhance the luxurious shopping experience.",
    "image": "/images/projects/devshopify1.jpg"
  },
  {
    "id": 2,
    "title": "Romeo Lugan – Luxury Watch Store",
    "description": "High-end UI design tailored for a luxury watch brand, with elegant typography, full-width product visuals, and refined navigation to reflect exclusivity and sophistication.",
    "image": "/images/projects/devshopify2.jpg"
  },
  {
    "id": 3,
    "title": "Ferozsons – Legacy Bookstore Revamp",
    "description": "A heritage-inspired design revamp for a historic bookstore. Combines vintage elements with modern UX for an engaging, easy-to-navigate interface, emphasizing both legacy and functionality.",
    "image": "/images/projects/devshopify3.jpg"
  }


];
const customwebdesign: FeaturedProject[] = [
  {
    id: 1,
      "title": "Drifinity - Digital Consulting Company",
  "description": "Custom-designed static website for a tech consulting firm featuring smooth animations, responsive layout, and clear service offerings with call-to-action elements.",

    image: "/images/projects/webdev2.jpg"
  },
  {
    id: 2,
     "title": "Cary Physicians Primary Care",
  "description": "Full-stack website for a primary care clinic featuring appointment scheduling, service overviews, provider profiles, and HIPAA-compliant contact forms.",

    image: "/images/projects/webapp2.jpg"
  },
  
];


// Projects for Website Development (Service ID: 14)
const websiteDevelopmentProjects: FeaturedProject[] = [
  {
    id: 1,
    "title": "Ikram Forces Academy",
  "description": "Educational website developed for a premier coaching academy. Features include tailored program sections, admission guidance, and a responsive design to support students preparing for cadet college and academic excellence.",

    image: "/images/projects/webdev1.jpg"
  },
  {
    id: 2,
      "title": "Drifinity - Digital Consulting Company",
  "description": "Custom-designed static website for a tech consulting firm featuring smooth animations, responsive layout, and clear service offerings with call-to-action elements.",

    image: "/images/projects/webdev2.jpg"
  },
  {
    id: 3,
    "title": "Captive Power Solution",
  "description": "E-commerce website for a generator company featuring product listings, detailed specifications, and a custom ordering system for power solutions.",
    image: "/images/projects/webdev3.jpg"
  }
];

// Projects for Web App Development (Service ID: 15)
const webAppDevelopmentProjects: FeaturedProject[] = [
  {
    id: 1,
     "title": "Cary Physicians Primary Care",
  "description": "Full-stack website for a primary care clinic featuring appointment scheduling, service overviews, provider profiles, and HIPAA-compliant contact forms.",

    image: "/images/projects/webapp2.jpg"
  },
  {
    id: 2,
    "title": "Kissan Ghar",
  "description": "E-commerce platform for Pakistan’s largest agricultural store with product categorization, mobile-friendly design, secure checkout, and digital marketing strategy to boost online sales and farmer outreach.",

    image: "/images/projects/webapp2.1.jpg"
  },
 
];

// Projects for Custom Web Development (Service ID: 16)
const customWebDevelopmentProjects: FeaturedProject[] = [
  {
    id: 1,
      "title": "Drifinity - Digital Consulting Company",
  "description": "Custom-designed static website for a tech consulting firm featuring smooth animations, responsive layout, and clear service offerings with call-to-action elements.",

    image: "/images/projects/webdev2.jpg"
  },
  {
    id: 2,
     "title": "Cary Physicians Primary Care",
  "description": "Full-stack website for a primary care clinic featuring appointment scheduling, service overviews, provider profiles, and HIPAA-compliant contact forms.",

    image: "/images/projects/webapp2.jpg"
  },
  
];

// Projects for E-commerce Development (Service ID: 17)
const ecommerceDevelopmentProjects: FeaturedProject[] = [
  {
    id: 1,
     "title": "Bookraze – Online Bookstore",
  "description": "E-commerce website for book lovers offering a wide range of books with search functionality, secure checkout, and a mobile-friendly shopping experience.",

    image: "/images/projects/devecom1.jpg"
  },
  {
    id: 2,
      "title": "Falcon Innovative Technologies",
  "description": "Product-focused e-commerce website for a tech brand offering innovative solutions with a responsive design, detailed product pages, and streamlined purchasing experience for a safer, smarter future.",

    image: "/images/projects/devecom2.jpg"
  },
   {
    id: 3,
    "title": "Kissan Ghar",
  "description": "E-commerce platform for Pakistan’s largest agricultural store with product categorization, mobile-friendly design, secure checkout, and digital marketing strategy to boost online sales and farmer outreach.",

    image: "/images/projects/webapp2.1.jpg"
  }
];

// Projects for Shopify Development (Service ID: 18)
const shopifyDevelopmentProjects: FeaturedProject[] = [
  {
    id: 1,
     "title": "Woodarq – Premium Home & Office Furniture Store",
  "description": "E-commerce website for a premium furniture brand featuring custom design, product categorization, responsive layout, and secure checkout for a seamless shopping experience.",

    image: "/images/projects/devshopify1.jpg"
  },
  {
    id: 2,
     "title": "Romeo Lugan – Luxury Watch Store",
  "description": "Elegant e-commerce website for a luxury watch brand featuring high-end product displays, responsive design, smooth navigation, and secure checkout tailored for a premium shopping experience.",

    image: "/images/projects/devshopify2.jpg"
  },
  {
    id: 3,
      "title": "Ferozsons – Legacy Bookstore Revamp",
  "description": "Revamped e-commerce website for a 130-year-old bookstore featuring a fully customized homepage, engaging product pages, simplified payment process, user reviews via Stars App, and optimized content management with metafields and custom classes.",

    image: "/images/projects/devshopify3.jpg"
  }
];

// Projects for WordPress Development (Service ID: 19)
const wordPressDevelopmentProjects: FeaturedProject[] = [
 {
  id: 1,
      "title": "Falcon Innovative Technologies",
  "description": "Product-focused e-commerce website for a tech brand offering innovative solutions with a responsive design, detailed product pages, and streamlined purchasing experience for a safer, smarter future.",

    image: "/images/projects/devecom2.jpg"
  },
   {
    id: 2,
    "title": "Kissan Ghar",
  "description": "E-commerce platform for Pakistan’s largest agricultural store with product categorization, mobile-friendly design, secure checkout, and digital marketing strategy to boost online sales and farmer outreach.",

    image: "/images/projects/webapp2.1.jpg"
  }
];

// Projects for POS Development (Service ID: 20)
const posDevelopmentProjects: FeaturedProject[] = [
  {
    id: 1,
     "title": "Dani’s Fabric – Online POS for Fabric Store",
  "description": "Custom-built POS system for a textile store featuring product catalog management, sales tracking, inventory control, and a lightweight, mobile-friendly dashboard for efficient operations.",

    image: "/images/projects/devpos1.jpg"
  },
  {
    id: 2,
     "title": "Pak Traders – Login & User Management Web App",
  "description": "Web-based portal for a wholesale business featuring secure user authentication, admin panel foundation, and a scalable interface ready for future inventory or sales module integration.",

    image: "/images/projects/devpos2.jpg"
  },
  {
    id: 3,
     "title": "Kashaf Noor Libas – POS System for Clothing Store",
  "description": "Comprehensive POS system for a clothing shop handling purchases, sales, inventory management, and daily operations with an easy-to-use interface tailored for garment businesses.",

    image: "/images/projects/devpos3.jpg"
  }
];

// Projects for Custom Software Development (Service ID: 21)
const customSoftwareDevelopmentProjects: FeaturedProject[] = [
  {
    id: 1,
     "title": "Dani’s Fabric – Online POS for Fabric Store",
  "description": "Custom-built POS system for a textile store featuring product catalog management, sales tracking, inventory control, and a lightweight, mobile-friendly dashboard for efficient operations.",

    image: "/images/projects/devpos1.jpg"
  },
  {
    id: 2,
    "title": "Captive Power Solution",
  "description": "E-commerce website for a generator company featuring product listings, detailed specifications, and a custom ordering system for power solutions.",
    image: "/images/projects/medpro-development.jpg"
  },
  {
    id: 3,
     "title": "Kashaf Noor Libas – POS System for Clothing Store",
  "description": "Comprehensive POS system for a clothing shop handling purchases, sales, inventory management, and daily operations with an easy-to-use interface tailored for garment businesses.",

    image: "/images/projects/devpos3.jpg"
  }
];

// Projects for Backend & API Development (Service ID: 22)
const backendApiDevelopmentProjects: FeaturedProject[] = [
  {
    id: 1,
     "title": "Magnetic Reconnection – NASA Space Apps Project",
  "description": "Custom API-driven web platform developed for the NASA Space Apps Challenge to assist scientists in measuring magnetic reconnections in space. The tool processes and visualizes data from NASA missions like ACE, WIND, and DSCOVR through a custom-built API and intuitive web interface.",

    image: "/images/projects/devappi1.jpg"
  },
  {
    id: 2,
    title: "PaymentGateway Integration",
    description: "Secure payment processing API with multi-currency support, fraud detection, and comprehensive transaction management features.",
    image: "/images/projects/devappi2.jpg"
  },

 
];


const seoStrategyProjects: FeaturedProject[] = [
  {
    "id": 1,
    "title": "Falcon Innovative Technologies – SEO-Optimized E-Commerce Platform",
    "description": "Developed an SEO-focused e-commerce website for a tech brand, featuring optimized meta tags, schema markup, fast-loading pages, mobile responsiveness, and keyword-enriched product descriptions to boost search engine rankings and user engagement.",
    "image": "/images/projects/devecom2.jpg"
  },
  {
    "id": 2,
    "title": "Kissan Ghar – Agricultural E-Commerce with SEO Integration",
    "description": "Implemented a robust SEO strategy for Pakistan’s leading agricultural store, including content optimization, targeted keywords, structured data, and mobile-first indexing to drive organic traffic, improve visibility, and enhance farmer outreach.",
    "image": "/images/projects/webapp2.1.jpg"
  }
];


// Projects for Local SEO (Service ID: 24)
const localSEOProjects: FeaturedProject[] = [
  
  {
    "id": 1,
    "title": "Woodarq – Premium Furniture Store with Local SEO",
    "description": "Designed an e-commerce website for a premium furniture brand with a focus on Local SEO, including Google My Business integration, location-based keywords, and local schema to increase visibility in regional searches and attract nearby customers.",
    "image": "/images/projects/devshopify1.jpg"
  },
  {
    "id": 2,
    "title": "Romeo Lugan – Localized SEO for Luxury Watch Store",
    "description": "Developed a high-end e-commerce store for a luxury watch brand with Local SEO strategies such as local citations, geo-targeted content, and optimized business listings to attract affluent, location-based clientele.",
    "image": "/images/projects/devshopify2.jpg"
  },
  {
    "id": 3,
    "title": "Ferozsons – Local SEO for Heritage Bookstore",
    "description": "Revamped the digital presence of a 130-year-old bookstore with Local SEO enhancements, including location-focused meta content, Google Maps embedding, and customer review integration to boost walk-in traffic and local discoverability.",
    "image": "/images/projects/devshopify3.jpg"
  }


];

// Projects for Technical SEO (Service ID: 25)
const technicalSEOProjects: FeaturedProject[] =[
  {
    "id": 1,
    "title": "Bookraze – Online Bookstore",
    "description": "E-commerce website for book lovers offering a wide range of books with search functionality, secure checkout, and a mobile-friendly shopping experience. Technical SEO implemented including optimized meta tags, structured data, and mobile performance enhancements.",
    "image": "/images/projects/devecom1.jpg"
  },
  {
    "id": 2,
    "title": "Falcon Innovative Technologies",
    "description": "Product-focused e-commerce website for a tech brand offering innovative solutions with a responsive design, detailed product pages, and streamlined purchasing experience for a safer, smarter future. Technical SEO enhancements applied such as product schema, optimized page speed, and crawlability improvements.",
    "image": "/images/projects/devecom2.jpg"
  },
  {
    "id": 3,
    "title": "Kissan Ghar",
    "description": "E-commerce platform for Pakistan’s largest agricultural store with product categorization, mobile-friendly design, secure checkout, and digital marketing strategy to boost online sales and farmer outreach. Technical SEO performed including structured data, sitemap optimization, and category-level metadata improvements.",
    "image": "/images/projects/webapp2.1.jpg"
  }
]
;

// Projects for On-Page SEO (Service ID: 26)
const onPageSEOProjects: FeaturedProject[] = [
 
  {
    "id": 1,
    "title": "Ikram Forces Academy",
    "description": "Educational website developed for a premier coaching academy. Features include tailored program sections, admission guidance, and a responsive design to support students preparing for cadet college and academic excellence. On-page SEO implemented with optimized headings, meta tags, content structure, and internal linking for improved search visibility.",
    "image": "/images/projects/webdev1.jpg"
  },
  {
    "id": 2,
    "title": "Drifinity - Digital Consulting Company",
    "description": "Custom-designed static website for a tech consulting firm featuring smooth animations, responsive layout, and clear service offerings with call-to-action elements. On-page SEO enhancements applied, including keyword-optimized service descriptions, structured headings, and improved metadata for better organic performance.",
    "image": "/images/projects/webdev2.jpg"
  },
  {
    "id": 3,
    "title": "Captive Power Solution",
    "description": "E-commerce website for a generator company featuring product listings, detailed specifications, and a custom ordering system for power solutions. On-page SEO implemented with product-level keyword optimization, proper use of alt tags, internal linking, and meta content improvements.",
    "image": "/images/projects/webdev3.jpg"
  }


];

// Projects for Off-Page SEO (Service ID: 27)
const offPageSEOProjects: FeaturedProject[] =[
  {
    "id": 1,
    "title": "Ikram Forces Academy",
    "description": "Educational website developed for a premier coaching academy. Features include tailored program sections, admission guidance, and a responsive design to support students preparing for cadet college and academic excellence. Off-page SEO implemented including local citation building, educational directory submissions, and backlink strategy to boost domain authority and search engine presence.",
    "image": "/images/projects/webdev1.jpg"
  },
  {
    "id": 2,
    "title": "Drifinity - Digital Consulting Company",
    "description": "Custom-designed static website for a tech consulting firm featuring smooth animations, responsive layout, and clear service offerings with call-to-action elements. Off-page SEO strategies applied, including guest posting, business profile listings, and social media engagement to improve visibility and generate high-quality referral traffic.",
    "image": "/images/projects/webdev2.jpg"
  },
  {
    "id": 3,
    "title": "Captive Power Solution",
    "description": "E-commerce website for a generator company featuring product listings, detailed specifications, and a custom ordering system for power solutions. Off-page SEO efforts included industry-specific backlink acquisition, content syndication, and local business listings to enhance authority and organic reach.",
    "image": "/images/projects/webdev3.jpg"
  }
]
;

// Projects for E-commerce SEO (Service ID: 28)
const ecommerceSEOProjects: FeaturedProject[] = [
  
 
  {
    "id": 1,
    "title": "Bookraze – Online Bookstore",
    "description": "E-commerce website for book lovers offering a wide range of books with search functionality, secure checkout, and a mobile-friendly shopping experience. eCommerce SEO implemented including optimized product pages, structured data for books, clean URLs, and performance improvements to enhance visibility and conversion rates.",
    "image": "/images/projects/devecom1.jpg"
  },
  {
    "id": 2,
    "title": "Falcon Innovative Technologies",
    "description": "Product-focused e-commerce website for a tech brand offering innovative solutions with a responsive design, detailed product pages, and streamlined purchasing experience for a safer, smarter future. eCommerce SEO applied through product-level keyword targeting, rich snippets, mobile UX optimization, and crawlable navigation to improve organic rankings.",
    "image": "/images/projects/devecom2.jpg"
  },
  {
    "id": 3,
    "title": "Kissan Ghar",
    "description": "E-commerce platform for Pakistan’s largest agricultural store with product categorization, mobile-friendly design, secure checkout, and digital marketing strategy to boost online sales and farmer outreach. eCommerce SEO strategies executed including category-based SEO, product schema markup, internal linking, and optimized metadata for improved search visibility.",
    "image": "/images/projects/webapp2.1.jpg"
  }



];

// Projects for Content Strategy (Service ID: 29)
const contentStrategyProjects: FeaturedProject[] = [
 
  {
    "id": 1,
    "title": "Body Fitness",
    "description": "Redesigned fitness website focused on modern UI/UX, showcasing workout programs, trainer profiles, and membership plans. Built for mobile-first access and high user engagement. Content strategic SEO implemented with keyword-optimized landing pages, structured workout content, blog integration, and a content hierarchy designed to drive organic traffic and user retention.",
    "image": "/images/projects/webredesign1.jpg"
  },
  {
    "id": 2,
    "title": "Home Décor",
    "description": "Redesigned website for a home décor brand with an elegant layout, product highlights, visual storytelling, and a seamless browsing experience for interior design enthusiasts. Content strategic SEO applied by creating category-driven content, implementing keyword-rich descriptions, improving internal linking, and integrating story-driven sections to enhance both search visibility and user engagement.",
    "image": "/images/projects/webredesign2.jpg"
  }


];

// Projects for Keyword Research (Service ID: 30)
const keywordResearchProjects: FeaturedProject[] = [
  
  {
    "id": 1,
    "title": "Ikram Forces Academy",
    "description": "Educational website developed for a premier coaching academy. Features include tailored program sections, admission guidance, and a responsive design to support students preparing for cadet college and academic excellence. Keyword research was conducted to enhance SEO and target relevant academic search terms.",
    "image": "/images/projects/webdev1.jpg"
  },
  {
    "id": 2,
    "title": "Drifinity - Digital Consulting Company",
    "description": "Custom-designed static website for a tech consulting firm featuring smooth animations, responsive layout, and clear service offerings with call-to-action elements. SEO was strengthened through targeted keyword research focused on tech consulting and digital solutions.",
    "image": "/images/projects/webdev2.jpg"
  },
  {
    "id": 3,
    "title": "Captive Power Solution",
    "description": "E-commerce website for a generator company featuring product listings, detailed specifications, and a custom ordering system for power solutions. Keyword research was performed to optimize product visibility in search engines and attract high-intent traffic.",
    "image": "/images/projects/webdev3.jpg"
  }


];

// Projects for SEO Audit (Service ID: 31)
const seoAuditProjects: FeaturedProject[] = [
 
  {
    "id": 1,
    "title": "Ikram Forces Academy",
    "description": "Educational website developed for a premier coaching academy. Features include tailored program sections, admission guidance, and a responsive design to support students preparing for cadet college and academic excellence. Keyword research was conducted to enhance SEO and target relevant academic search terms. A complete SEO audit was performed to identify and fix on-page and technical issues.",
    "image": "/images/projects/webdev1.jpg"
  },
  {
    "id": 2,
    "title": "Drifinity - Digital Consulting Company",
    "description": "Custom-designed static website for a tech consulting firm featuring smooth animations, responsive layout, and clear service offerings with call-to-action elements. SEO was strengthened through targeted keyword research focused on tech consulting and digital solutions. An SEO audit was conducted to optimize performance, metadata, and page structure.",
    "image": "/images/projects/webdev2.jpg"
  },
  {
    "id": 3,
    "title": "Captive Power Solution",
    "description": "E-commerce website for a generator company featuring product listings, detailed specifications, and a custom ordering system for power solutions. Keyword research was performed to optimize product visibility in search engines and attract high-intent traffic. An SEO audit was carried out to enhance indexing, fix technical issues, and improve site speed and structure.",
    "image": "/images/projects/webdev3.jpg"
  }


];
// Collection of all project sets by service ID
const allProjects: ProjectCollection[] = [
  {
    serviceId: 1,
    projects: websiteDesignProjects
  },
  {
    serviceId: 2,
    projects: websiteRedesignProjects
  },
  {
    serviceId: 3,
    projects: webAppDesignProjects
  },
  {
    serviceId: 4,
    projects: mobileAppDesignProjects
  },
  {
    serviceId: 5,
    projects: brandingProjects
  },
  {
    serviceId: 12,
    projects: ecommerceDesignProjects
  },
  {
    serviceId: 13,
    projects: uiUxDesignProjects
  },
  // Additional projects for new services (you can assign service IDs as needed)
  {
    serviceId: 6, // Logo Design
    projects: logoDesignProjects
  },
  {
    serviceId: 7, // Brand Identity
    projects: brandIdentityProjects
  },
  {
    serviceId: 8, // Graphic Design
    projects: graphicDesignProjects
  },
   {
    serviceId: 14,
    projects: websiteDevelopmentProjects
  },
  {
    serviceId: 15,
    projects: webAppDevelopmentProjects
  },
  {
    serviceId: 16,
    projects: customWebDevelopmentProjects
  },
  {
    serviceId: 17,
    projects: ecommerceDevelopmentProjects
  },
  {
    serviceId: 18,
    projects: shopifyDevelopmentProjects
  },
  {
    serviceId: 19,
    projects: wordPressDevelopmentProjects
  },
  {
    serviceId: 20,
    projects: posDevelopmentProjects
  },
  {
    serviceId: 21,
    projects: customSoftwareDevelopmentProjects
  },
  {
    serviceId: 22,
    projects: backendApiDevelopmentProjects
  },
   {
    serviceId: 23,
    projects: seoStrategyProjects
  },
  {
    serviceId: 24,
    projects: localSEOProjects
  },
  {
    serviceId: 25,
    projects: technicalSEOProjects
  },
  {
    serviceId: 26,
    projects: onPageSEOProjects
  },
  {
    serviceId: 27,
    projects: offPageSEOProjects
  },
  {
    serviceId: 28,
    projects: ecommerceSEOProjects
  },
  {
    serviceId: 29,
    projects: contentStrategyProjects
  },
  {
    serviceId: 30,
    projects: keywordResearchProjects
  },
  {
    serviceId: 31,
    projects: seoAuditProjects
  },
  {
    serviceId: 32,
    projects: wordpresswebdesign
  },
   {
    serviceId: 32,
    projects: customwebdesign
  },
   {
    serviceId: 33,
    projects: shopifywebdesign
  },
    {
    serviceId: 33,
    projects: ecommercewebdesign
  },
   {
    serviceId: 33,
    projects: designsystem
  }
];


// Get projects for a specific service ID
export const getProjectsByServiceId = (serviceId: number): FeaturedProject[] => {
  const collection = allProjects.find(p => p.serviceId === serviceId);
  return collection ? collection.projects : websiteDesignProjects; // Default to website projects
};

// Background image for the showcase component
export const showcaseBackground = "/images/feature.png";

// Monitor/laptop frame image
export const monitorFrameImage = "/images/ct2.png";