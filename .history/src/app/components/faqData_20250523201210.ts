export interface FAQ {
  id: number;
  question: string;
  answer: string;
}

export interface FAQCollection {
  serviceId: number;
  faqs: FAQ[];
}

// FAQs for Website Design Services (Service ID: 1)
const websiteDesignFAQs: FAQ[] = [
  {
    id: 1,
    question: "What's included in your website design service?",
    answer: "Our website design service includes custom responsive design, user experience strategy, content strategy consultation, SEO-friendly architecture, browser compatibility testing, and ongoing support. We create 100% custom designs tailored to your brand and business goals."
  },
  {
    id: 2,
    question: "Will my website be mobile-friendly and responsive?",
    answer: "Absolutely! All our websites are built with responsive design principles, ensuring they look and function perfectly on all devices including smartphones, tablets, and desktop computers. We follow mobile-first design approaches to guarantee optimal user experience across all screen sizes."
  },
  {
    id: 3,
    question: "How long does it take to design and build a website?",
    answer: "The timeline for website design typically ranges from 3-6 weeks, depending on the complexity and scope of the project. Simple websites can be completed in 3-4 weeks, while more complex sites with custom features may take 5-6 weeks. We provide detailed timelines during our initial consultation."
  },
  {
    id: 4,
    question: "Do you provide content creation and SEO optimization?",
    answer: "Yes, we offer content strategy consultation and ensure all websites are built with SEO-friendly architecture. We can help with content planning, optimization for search engines, and implementing best practices for on-page SEO to help your site rank better in search results."
  }
];

// FAQs for Website Redesign (Service ID: 2)
const websiteRedesignFAQs: FAQ[] = [
  {
    id: 1,
    question: "Will my current website content be preserved during redesign?",
    answer: "Yes, we carefully migrate and optimize your existing content during the redesign process. We ensure no valuable content or SEO rankings are lost, while improving content organization and updating outdated information to align with your new design."
  },
  {
    id: 2,
    question: "How do you ensure my redesigned website performs better?",
    answer: "We conduct a comprehensive audit of your current site, identifying performance issues, user experience problems, and conversion barriers. Our redesign focuses on improving site speed, mobile responsiveness, user navigation, and implementing modern design standards that enhance performance."
  },
  {
    id: 3,
    question: "Will my search engine rankings be affected by the redesign?",
    answer: "We take great care to preserve and improve your SEO rankings during redesign. We implement proper URL redirects, optimize site structure, maintain meta data, and follow SEO best practices to ensure your search visibility is maintained or improved."
  },
  {
    id: 4,
    question: "Do you provide training on managing the redesigned website?",
    answer: "Yes, we provide comprehensive training on managing your redesigned website, including content updates, basic maintenance tasks, and using any new features or functionality. We also provide documentation and ongoing support to ensure you're comfortable managing your site."
  }
];

// FAQs for Web App Design (Service ID: 3)
const webAppDesignFAQs: FAQ[] = [
  {
    id: 1,
    question: "What's the difference between web app design and website design?",
    answer: "Web applications are interactive software programs accessed through browsers, requiring more complex user interface design, workflow optimization, and functionality planning. Unlike traditional websites, web apps focus on user tasks, data management, and interactive features rather than just information presentation."
  },
  {
    id: 2,
    question: "Do you conduct user testing for web applications?",
    answer: "Yes, user testing is a crucial part of our web app design process. We conduct usability testing sessions with real users to validate design decisions, identify pain points, and optimize the interface for maximum user satisfaction and task completion efficiency."
  },
  {
    id: 3,
    question: "Will you provide a design system for our web application?",
    answer: "Absolutely! We create comprehensive design systems with reusable components, style guides, and documentation that ensure consistency and scalability as your web application grows. This includes UI components, patterns, and guidelines for future development."
  },
  {
    id: 4,
    question: "How do you handle complex user workflows in web app design?",
    answer: "We start with detailed user research and workflow analysis to understand complex processes. We then create user flow diagrams, interactive prototypes, and conduct testing to optimize workflows, ensuring the interface is intuitive even for complex tasks and multi-step processes."
  }
];

// FAQs for Mobile App Design (Service ID: 4)
const mobileAppDesignFAQs: FAQ[] = [
  {
    id: 1,
    question: "Do you design for both iOS and Android platforms?",
    answer: "Yes, we design platform-specific interfaces that follow Apple's Human Interface Guidelines for iOS and Google's Material Design principles for Android, ensuring native feel and optimal user experience on each platform while maintaining your brand consistency."
  },
  {
    id: 2,
    question: "Will you help with app store optimization and submission?",
    answer: "Yes, our mobile app design service includes creating app store screenshots, icons, and promotional materials optimized for both Apple App Store and Google Play Store. We design assets that maximize download rates and help your app stand out in search results."
  },
  {
    id: 3,
    question: "How do you ensure good user experience on different screen sizes?",
    answer: "We design responsive layouts that adapt to various screen sizes and densities. Our design process includes creating interfaces for different device categories (phones, tablets) and testing across multiple screen resolutions to ensure consistent, optimal experiences."
  },
  {
    id: 4,
    question: "Do you include animation and interaction design in mobile apps?",
    answer: "Yes, thoughtful micro-interactions and animations are essential for mobile app engagement. We design smooth transitions, loading animations, and interactive feedback that make your app feel responsive and delightful to use, following platform-specific animation guidelines."
  }
];

// FAQs for Branding (Service ID: 5)
const brandingFAQs: FAQ[] = [
  {
    id: 1,
    question: "What's included in a complete branding package?",
    answer: "Our comprehensive branding package includes brand strategy and positioning, logo design and variations, color palette and typography system, brand voice and messaging guidelines, business stationery design, and a complete brand guidelines document for consistent application."
  },
  {
    id: 2,
    question: "How long does the branding process typically take?",
    answer: "The branding process usually takes 4-8 weeks, depending on the scope and complexity. This includes discovery and research, strategy development, concept creation, refinement rounds, and final deliverable preparation. We work closely with you throughout the process."
  },
  {
    id: 3,
    question: "Will I own all the rights to my brand design?",
    answer: "Yes, upon final payment, you receive full ownership and rights to all brand assets including logos, design files, and brand elements. We provide all necessary file formats for print and digital use, ensuring you have everything needed for future applications."
  },
  {
    id: 4,
    question: "Can you help rebrand an existing business?",
    answer: "Absolutely! We specialize in both new brand creation and rebranding existing businesses. For rebranding, we conduct thorough analysis of your current brand, market position, and business evolution to create a refreshed identity that honors your heritage while positioning you for future growth."
  }
];

// FAQs for UI/UX Design (Service ID: 13)
const uiUxDesignFAQs: FAQ[] = [
  {
    id: 1,
    question: "What research methods do you use for UX design?",
    answer: "We employ various research methods including user interviews, surveys, analytics analysis, competitive research, user journey mapping, and persona development. This research-driven approach ensures our design decisions are based on real user needs and behaviors rather than assumptions."
  },
  {
    id: 2,
    question: "How do you measure the success of UI/UX design?",
    answer: "We measure success through usability testing results, user satisfaction scores, task completion rates, conversion improvements, reduced support tickets, and analytics data showing improved user engagement. We establish baseline metrics and track improvements post-implementation."
  },
  {
    id: 3,
    question: "Do you create design systems and style guides?",
    answer: "Yes, we create comprehensive design systems with reusable UI components, style guides, and documentation. This ensures design consistency, streamlines development, and provides a scalable foundation for future design work and team collaboration."
  },
  {
    id: 4,
    question: "Will you conduct usability testing with real users?",
    answer: "Absolutely! We conduct structured usability testing sessions with your target users to validate design decisions, identify pain points, and optimize interfaces. This includes both moderated sessions and remote testing, providing valuable insights for design refinement."
  }
];

// FAQs for eCommerce Web Design (Service ID: 12)
const ecommerceDesignFAQs: FAQ[] = [
  {
    id: 1,
    question: "Which e-commerce platforms do you work with?",
    answer: "We work with all major e-commerce platforms including Shopify, WooCommerce, Magento, BigCommerce, and custom solutions. We help you choose the best platform based on your business needs, budget, technical requirements, and growth plans."
  },
  {
    id: 2,
    question: "How do you optimize e-commerce sites for conversions?",
    answer: "We implement proven conversion optimization techniques including streamlined checkout flows, trust signals, product recommendation engines, abandoned cart recovery, mobile optimization, fast loading speeds, and strategic placement of call-to-action buttons throughout the shopping experience."
  },
  {
    id: 3,
    question: "Will my online store be secure for customer transactions?",
    answer: "Yes, security is our top priority. We implement SSL certificates, secure payment gateways, PCI compliance measures, and follow e-commerce security best practices. We also include trust badges and security features that build customer confidence during checkout."
  },
  {
    id: 4,
    question: "Do you provide training on managing the e-commerce store?",
    answer: "Yes, we provide comprehensive training on managing your online store including adding products, managing inventory, processing orders, handling customer service, and using analytics tools. We also provide documentation and ongoing support for store management."
  }
];

// FAQs for Logo Design (Service ID: 6)
const logoDesignFAQs: FAQ[] = [
  {
    id: 1,
    question: "How many logo concepts do you provide?",
    answer: "We typically provide 3-5 initial logo concepts based on our research and strategy. After reviewing these concepts with you, we refine the selected direction through 2-3 revision rounds to ensure the final logo perfectly represents your brand."
  },
  {
    id: 2,
    question: "What file formats will I receive for my logo?",
    answer: "You'll receive your logo in all necessary formats including vector files (AI, EPS, SVG), high-resolution images (PNG, JPG), and various sizes for different applications. We also provide versions for light and dark backgrounds, and simplified versions for small applications."
  },
  {
    id: 3,
    question: "Will my logo work across all applications and sizes?",
    answer: "Yes, we design logos to be versatile and scalable, working effectively from business cards to billboards. We test scalability and create variations (horizontal, stacked, icon-only) to ensure your logo maintains impact and legibility across all applications."
  },
  {
    id: 4,
    question: "Do you research competitors before designing our logo?",
    answer: "Absolutely! Competitive research is crucial to ensure your logo stands out in your industry. We analyze competitor logos, identify design trends in your market, and create distinctive designs that differentiate your brand while appealing to your target audience."
  }
];

// FAQs for Brand Identity (Service ID: 7)
const brandIdentityFAQs: FAQ[] = [
  {
    id: 1,
    question: "What's the difference between a logo and brand identity?",
    answer: "A logo is one element of brand identity. Brand identity encompasses your complete visual system including logo, color palette, typography, imagery style, patterns, business cards, letterheads, and guidelines for consistent application across all touchpoints."
  },
  {
    id: 2,
    question: "How do you ensure brand consistency across all materials?",
    answer: "We create comprehensive brand guidelines that specify exactly how to use each brand element including logo placement, color codes, typography rules, spacing requirements, and do's and don'ts. This ensures anyone applying your brand maintains consistency."
  },
  {
    id: 3,
    question: "Will you design business cards and stationery?",
    answer: "Yes, brand identity includes designing business cards, letterheads, envelopes, and other stationery items. We ensure all materials work cohesively and represent your brand professionally across all business communications and touchpoints."
  },
  {
    id: 4,
    question: "Can you help apply brand identity to digital platforms?",
    answer: "Absolutely! We provide guidelines and templates for digital applications including social media profiles, email signatures, website headers, and digital marketing materials. We ensure your brand translates effectively across both print and digital mediums."
  }
];

// FAQs for Graphic Design (Service ID: 8)
const graphicDesignFAQs: FAQ[] = [
  {
    id: 1,
    question: "What types of graphic design materials do you create?",
    answer: "We create a wide range of graphic design materials including brochures, flyers, posters, banners, social media graphics, presentations, infographics, packaging design, trade show materials, and digital marketing assets tailored to your brand and objectives."
  },
  {
    id: 2,
    question: "Do you provide print-ready files for my designs?",
    answer: "Yes, we provide print-ready files with proper resolution, color profiles (CMYK), bleed areas, and cut marks. We work with your preferred print vendors and can provide technical specifications to ensure your designs print perfectly every time."
  },
  {
    id: 3,
    question: "Can you create graphics that match my existing brand?",
    answer: "Absolutely! We work within your existing brand guidelines to create graphics that are consistent with your established visual identity. If you don't have formal brand guidelines, we can work from your existing materials to maintain consistency."
  },
  {
    id: 4,
    question: "Do you design for both print and digital applications?",
    answer: "Yes, we design for both print and digital mediums, understanding the technical requirements for each. We optimize graphics for their intended use, whether that's high-resolution printing, web display, social media platforms, or email marketing campaigns."
  }
];
// FAQs for Website Development (Service ID: 14)
const websiteDevelopmentFAQs: FAQ[] = [
  {
    id: 1,
    question: "What technologies do you use for website development?",
    answer: "We use modern web technologies including React, Next.js, Vue.js, Node.js, PHP, Python, and various databases like MySQL, PostgreSQL, and MongoDB. We choose the best technology stack based on your specific requirements and project goals."
  },
  {
    id: 2,
    question: "Will my website be optimized for search engines?",
    answer: "Yes, all our websites are built with SEO best practices including clean code structure, fast loading speeds, mobile responsiveness, proper meta tags, schema markup, and optimized URLs to help improve your search engine rankings."
  },
  {
    id: 3,
    question: "How do you ensure website security and performance?",
    answer: "We implement multiple security measures including SSL certificates, secure coding practices, regular security updates, and performance optimizations like caching, image optimization, and code minification to ensure your website is both secure and fast."
  },
  {
    id: 4,
    question: "Do you provide ongoing maintenance and support?",
    answer: "Yes, we offer comprehensive maintenance packages including regular updates, security monitoring, performance optimization, backup management, and technical support to keep your website running smoothly and securely."
  }
];

// FAQs for Web App Development (Service ID: 15)
const webAppDevelopmentFAQs: FAQ[] = [
  {
    id: 1,
    question: "What's the difference between a website and a web application?",
    answer: "Web applications are interactive software programs that run in browsers and handle complex business logic, user data, and real-time interactions. Unlike static websites, web apps provide dynamic functionality like user dashboards, data processing, and advanced user interactions."
  },
  {
    id: 2,
    question: "How do you handle data security in web applications?",
    answer: "We implement enterprise-level security measures including encryption, secure authentication, role-based access control, data validation, SQL injection prevention, and compliance with security standards like OWASP to protect sensitive user and business data."
  },
  {
    id: 3,
    question: "Can you integrate with existing business systems?",
    answer: "Yes, we specialize in API integrations and can connect your web application with existing CRM, ERP, accounting, marketing, and other business systems to ensure seamless data flow and unified operations across your organization."
  },
  {
    id: 4,
    question: "How do you ensure web application scalability?",
    answer: "We design scalable architectures using cloud services, microservices, load balancing, and database optimization techniques. This ensures your web application can handle increased users and data volume as your business grows."
  }
];

// FAQs for Custom Web Development (Service ID: 16)
const customWebDevelopmentFAQs: FAQ[] = [
  {
    id: 1,
    question: "Why choose custom development over pre-built solutions?",
    answer: "Custom development provides solutions tailored exactly to your business processes, requirements, and goals. Unlike pre-built solutions, custom development offers unlimited flexibility, better integration capabilities, and can evolve with your business needs."
  },
  {
    id: 2,
    question: "How do you gather and validate requirements for custom projects?",
    answer: "We use a comprehensive discovery process including stakeholder interviews, workflow analysis, requirement documentation, prototyping, and iterative feedback to ensure we fully understand your needs before development begins."
  },
  {
    id: 3,
    question: "What development methodology do you follow?",
    answer: "We follow Agile development methodology with regular sprints, continuous feedback, and iterative improvements. This approach allows for flexibility, transparency, and ensures the final product meets your evolving requirements."
  },
  {
    id: 4,
    question: "Do you provide source code and documentation?",
    answer: "Yes, upon project completion, you receive all source code, comprehensive documentation, deployment guides, and technical specifications. This ensures you have complete ownership and can maintain or extend the solution in the future."
  }
];

// FAQs for E-commerce Development (Service ID: 17)
const ecommerceDevelopmentFAQs: FAQ[] = [
  {
    id: 1,
    question: "Which e-commerce platforms do you develop on?",
    answer: "We develop on various platforms including custom-built solutions, Shopify, WooCommerce, Magento, BigCommerce, and others. We recommend the best platform based on your business size, requirements, budget, and growth plans."
  },
  {
    id: 2,
    question: "How do you ensure secure payment processing?",
    answer: "We integrate PCI-compliant payment gateways, implement SSL encryption, use secure coding practices, and follow industry security standards. We support multiple payment methods including credit cards, PayPal, digital wallets, and bank transfers."
  },
  {
    id: 3,
    question: "Can you integrate inventory management and shipping?",
    answer: "Yes, we integrate comprehensive inventory management systems with real-time stock tracking, automated reorder points, and multi-warehouse support. We also connect with shipping providers for automated label generation and tracking updates."
  },
  {
    id: 4,
    question: "Do you optimize e-commerce sites for mobile shopping?",
    answer: "Absolutely! All our e-commerce developments are mobile-first, ensuring optimal shopping experiences on smartphones and tablets. This includes touch-friendly navigation, fast loading, and streamlined mobile checkout processes."
  }
];

// FAQs for Shopify Development (Service ID: 18)
const shopifyDevelopmentFAQs: FAQ[] = [
  {
    id: 1,
    question: "Do you create custom Shopify themes or use existing ones?",
    answer: "We create custom Shopify themes tailored to your brand and requirements. While we can modify existing themes, custom development ensures your store stands out and provides the exact functionality you need for your business."
  },
  {
    id: 2,
    question: "Can you develop custom Shopify apps and integrations?",
    answer: "Yes, we develop custom Shopify apps and integrate third-party services including CRM, inventory management, accounting software, marketing tools, and analytics platforms to extend your store's functionality."
  },
  {
    id: 3,
    question: "Do you work with Shopify Plus for enterprise clients?",
    answer: "Yes, we're experienced with Shopify Plus and its advanced features including automation, custom checkout experiences, wholesale capabilities, and multi-store management for high-volume businesses and enterprises."
  },
  {
    id: 4,
    question: "How do you optimize Shopify stores for performance?",
    answer: "We optimize Shopify stores through image compression, code optimization, app audit and cleanup, lazy loading implementation, and CDN configuration. We also optimize checkout flows and page load speeds to improve conversion rates and user experience."
  }
];

// FAQs for WordPress Development (Service ID: 19)
const wordPressDevelopmentFAQs: FAQ[] = [
  {
    id: 1,
    question: "Do you create custom WordPress themes or use existing ones?",
    answer: "We create custom WordPress themes from scratch tailored to your brand and requirements. Custom themes ensure unique design, optimal performance, and functionality that perfectly matches your business needs without unnecessary bloat."
  },
  {
    id: 2,
    question: "Can you develop custom WordPress plugins?",
    answer: "Yes, we develop custom WordPress plugins to add specific functionality to your site. Whether you need custom forms, integrations, e-commerce features, or unique business logic, we can create plugins that extend WordPress capabilities."
  },
  {
    id: 3,
    question: "How do you ensure WordPress security?",
    answer: "We implement WordPress security best practices including regular updates, security plugins, strong authentication, secure hosting, SSL certificates, database security, and regular backups to protect your site from threats and vulnerabilities."
  },
  {
    id: 4,
    question: "Will I be able to easily update content myself?",
    answer: "Yes, WordPress is designed for easy content management. We provide training on using the WordPress admin panel, creating pages and posts, managing media, and updating content. We also create custom documentation for any special features."
  }
];

// FAQs for POS Development (Service ID: 20)
const posDevelopmentFAQs: FAQ[] = [
  {
    id: 1,
    question: "What types of businesses can benefit from custom POS systems?",
    answer: "Custom POS systems benefit retail stores, restaurants, service businesses, multi-location chains, specialty retailers, and any business with unique workflow requirements that standard POS systems can't accommodate effectively."
  },
  {
    id: 2,
    question: "Can your POS systems work offline?",
    answer: "Yes, our POS systems are designed to work offline and sync data when internet connection is restored. This ensures uninterrupted sales processing even during network outages, with automatic data synchronization once connectivity returns."
  },
  {
    id: 3,
    question: "Do you integrate with existing accounting and inventory systems?",
    answer: "Yes, we can integrate POS systems with existing accounting software (QuickBooks, Xero), inventory management systems, CRM platforms, and other business tools to ensure seamless data flow across your operations."
  },
  {
    id: 4,
    question: "What hardware do you support for POS systems?",
    answer: "We support various POS hardware including tablets, touch screens, receipt printers, barcode scanners, cash drawers, card readers, and mobile devices. We help recommend the best hardware setup for your specific business needs."
  }
];

// FAQs for Custom Software Development (Service ID: 21)
const customSoftwareDevelopmentFAQs: FAQ[] = [
  {
    id: 1,
    question: "How do you determine if custom software is right for my business?",
    answer: "We analyze your business processes, existing systems, scalability needs, and budget to determine if custom software provides better ROI than off-the-shelf solutions. Custom software is ideal when you have unique workflows or need specific integrations."
  },
  {
    id: 2,
    question: "What's your approach to software testing and quality assurance?",
    answer: "We implement comprehensive testing including unit testing, integration testing, user acceptance testing, and automated testing. Our QA process ensures the software meets requirements, performs reliably, and provides excellent user experience."
  },
  {
    id: 3,
    question: "How do you handle software updates and maintenance?",
    answer: "We provide ongoing maintenance including bug fixes, security updates, performance optimization, and feature enhancements. We offer different support levels and can train your team for basic maintenance tasks while handling complex updates."
  },
  {
    id: 4,
    question: "Can you migrate data from our existing systems?",
    answer: "Yes, we handle data migration from legacy systems, databases, spreadsheets, and other software. We ensure data integrity, perform thorough testing, and provide backup strategies to minimize disruption during the transition process."
  }
];

// FAQs for Backend & API Development (Service ID: 22)
const backendApiDevelopmentFAQs: FAQ[] = [
  {
    id: 1,
    question: "What types of APIs do you develop?",
    answer: "We develop RESTful APIs, GraphQL APIs, WebSocket APIs for real-time features, and microservices architectures. We also create API documentation, authentication systems, and integration endpoints for third-party services."
  },
  {
    id: 2,
    question: "How do you ensure API security and performance?",
    answer: "We implement authentication protocols (OAuth, JWT), rate limiting, data encryption, input validation, and monitoring systems. For performance, we use caching, database optimization, load balancing, and CDN integration."
  },
  {
    id: 3,
    question: "Can you integrate with existing databases and systems?",
    answer: "Yes, we can work with existing databases (MySQL, PostgreSQL, MongoDB, Oracle) and integrate with legacy systems, CRM, ERP, payment processors, and other third-party services through APIs and custom connectors."
  },
  {
    id: 4,
    question: "Do you provide API documentation and testing tools?",
    answer: "Yes, we provide comprehensive API documentation using tools like Swagger/OpenAPI, include code examples, and set up testing environments. We also provide SDK development and integration support for your development team."
  }
];

// FAQs for SEO Strategy (Service ID: 23)
const seoStrategyFAQs: FAQ[] = [
  {
    id: 1,
    question: "How long does it take to see results from an SEO strategy?",
    answer: "SEO is a long-term investment that typically shows initial results within 3-6 months, with significant improvements seen after 6-12 months. The timeline depends on factors like competition, current website status, and strategy implementation speed."
  },
  {
    id: 2,
    question: "What's included in your SEO strategy development?",
    answer: "Our SEO strategy includes comprehensive competitor analysis, keyword research, technical audit, content strategy, link building plan, implementation roadmap, and performance tracking setup. We provide a detailed action plan with priorities and timelines."
  },
  {
    id: 3,
    question: "How do you measure SEO strategy success?",
    answer: "We track key metrics including organic traffic growth, keyword ranking improvements, conversion rates, organic revenue, and domain authority. We provide regular reports showing progress against goals and strategy adjustments based on performance data."
  },
  {
    id: 4,
    question: "Do you provide ongoing SEO strategy support?",
    answer: "Yes, we offer ongoing strategy refinement and support. SEO is dynamic, so we continuously monitor performance, adjust strategies based on algorithm updates, and refine approaches to maintain and improve results over time."
  }
];

// FAQs for Local SEO (Service ID: 24)
const localSEOFAQs: FAQ[] = [
  {
    id: 1,
    question: "How important is Google Business Profile for local SEO?",
    answer: "Google Business Profile is crucial for local SEO success. It's often the first thing potential customers see in local searches. We optimize your profile with accurate information, engaging photos, regular posts, and review management to maximize local visibility."
  },
  {
    id: 2,
    question: "What are local citations and why do they matter?",
    answer: "Local citations are mentions of your business name, address, and phone number (NAP) on other websites like directories and local sites. They help establish credibility and consistency, which Google uses to determine local search rankings."
  },
  {
    id: 3,
    question: "How do online reviews impact local SEO?",
    answer: "Online reviews significantly impact local SEO rankings and customer trust. We help you develop strategies for generating positive reviews, responding professionally to all reviews, and managing your online reputation to improve local search performance."
  },
  {
    id: 4,
    question: "Can you help with multiple business locations?",
    answer: "Yes, we specialize in multi-location local SEO. We create location-specific pages, manage multiple Google Business Profiles, ensure NAP consistency across all locations, and develop strategies tailored to each market's competitive landscape."
  }
];

// FAQs for Technical SEO (Service ID: 25)
const technicalSEOFAQs: FAQ[] = [
  {
    id: 1,
    question: "What technical issues most commonly hurt SEO performance?",
    answer: "Common technical SEO issues include slow page speeds, crawling errors, duplicate content, mobile usability problems, broken internal links, and poor URL structure. We identify and fix these issues to improve search engine accessibility and user experience."
  },
  {
    id: 2,
    question: "How do Core Web Vitals affect SEO rankings?",
    answer: "Core Web Vitals are Google ranking factors that measure page loading speed, interactivity, and visual stability. Poor scores can hurt rankings and user experience. We optimize these metrics through technical improvements like image compression, caching, and code optimization."
  },
  {
    id: 3,
    question: "What is structured data and why is it important?",
    answer: "Structured data helps search engines understand your content better, enabling rich snippets and enhanced search results. We implement schema markup for products, reviews, events, and other content types to improve visibility and click-through rates."
  },
  {
    id: 4,
    question: "How often should technical SEO audits be performed?",
    answer: "We recommend comprehensive technical SEO audits quarterly, with monthly monitoring for critical issues. Website changes, updates, and algorithm changes can introduce new technical problems, so regular auditing ensures optimal search engine performance."
  }
];

// FAQs for On-Page SEO (Service ID: 26)
const onPageSEOFAQs: FAQ[] = [
  {
    id: 1,
    question: "What's the difference between on-page and off-page SEO?",
    answer: "On-page SEO focuses on optimizing elements within your website like content, meta tags, and internal linking. Off-page SEO involves external factors like backlinks and social signals. Both are essential for comprehensive SEO success."
  },
  {
    id: 2,
    question: "How do you optimize content for both search engines and users?",
    answer: "We balance keyword optimization with user value by creating comprehensive, well-structured content that answers user questions. We optimize meta tags, headers, and internal linking while maintaining readability and engagement for human visitors."
  },
  {
    id: 3,
    question: "What role do meta titles and descriptions play in SEO?",
    answer: "Meta titles and descriptions are crucial for both rankings and click-through rates. We craft compelling, keyword-optimized titles and descriptions that accurately represent page content while encouraging users to click from search results."
  },
  {
    id: 4,
    question: "How important is internal linking for on-page SEO?",
    answer: "Internal linking is vital for distributing page authority, helping search engines understand site structure, and improving user navigation. We create strategic internal linking strategies that boost important pages and create logical content relationships."
  }
];

// FAQs for Off-Page SEO (Service ID: 27)
const offPageSEOFAQs: FAQ[] = [
  {
    id: 1,
    question: "What makes a high-quality backlink?",
    answer: "High-quality backlinks come from authoritative, relevant websites with good domain authority. They should be contextually relevant, from trusted sources, and acquired naturally through valuable content and relationship building rather than paid schemes."
  },
  {
    id: 2,
    question: "How do you build backlinks without violating Google guidelines?",
    answer: "We focus on white-hat link building through creating valuable content, building genuine relationships, guest posting on relevant sites, and earning mentions through digital PR. We never use paid link schemes or manipulative tactics that violate Google guidelines."
  },
  {
    id: 3,
    question: "How long does it take to see results from link building?",
    answer: "Link building results typically become visible within 2-6 months, depending on the authority of linking sites and competition level. We focus on building sustainable link profiles that provide long-term authority and ranking improvements."
  },
  {
    id: 4,
    question: "Do social media signals impact SEO rankings?",
    answer: "While social signals aren't direct ranking factors, they can indirectly benefit SEO by increasing content visibility, driving traffic, and creating opportunities for natural link building. We integrate social media strategies with off-page SEO efforts."
  }
];

// FAQs for E-commerce SEO (Service ID: 28)
const ecommerceSEOFAQs: FAQ[] = [
  {
    id: 1,
    question: "How is e-commerce SEO different from regular SEO?",
    answer: "E-commerce SEO focuses on product pages, category optimization, conversion-driven keywords, and technical challenges like duplicate content and large site structures. We also emphasize product schema, reviews, and shopping-intent optimization."
  },
  {
    id: 2,
    question: "How do you handle duplicate content issues in e-commerce?",
    answer: "We address duplicate content through canonical tags, unique product descriptions, category page optimization, and technical solutions for product variants. This ensures search engines understand which pages to prioritize and index."
  },
  {
    id: 3,
    question: "What's the importance of product reviews for e-commerce SEO?",
    answer: "Product reviews provide fresh, user-generated content that helps with long-tail keywords and builds trust. We implement review systems and schema markup to display star ratings in search results, improving click-through rates."
  },
  {
    id: 4,
    question: "How do you optimize for product-specific keywords?",
    answer: "We research high-intent commercial keywords, optimize product titles and descriptions, implement strategic internal linking, and create category structures that support both user navigation and search engine understanding of product relationships."
  }
];

// FAQs for Content Strategy (Service ID: 29)
const contentStrategyFAQs: FAQ[] = [
  {
    id: 1,
    question: "What is a topic cluster and how does it help SEO?",
    answer: "Topic clusters are groups of related content organized around pillar pages and supporting cluster content. This structure helps establish topical authority, improves internal linking, and signals to search engines that you're an expert in specific subjects."
  },
  {
    id: 2,
    question: "How do you align content strategy with business goals?",
    answer: "We analyze your business objectives, target audience, and sales funnel to create content that serves both SEO and business purposes. Content is mapped to buyer journey stages and optimized to drive conversions, not just traffic."
  },
  {
    id: 3,
    question: "How often should new content be published for SEO?",
    answer: "Content frequency depends on your industry, competition, and resources. We typically recommend consistent publishing schedules rather than sporadic bursts. Quality is more important than quantity, but regular fresh content signals activity to search engines."
  },
  {
    id: 4,
    question: "How do you measure content strategy success?",
    answer: "We track metrics like organic traffic growth, keyword rankings, engagement metrics, conversion rates, and content performance. We also monitor how content supports business goals like lead generation, brand awareness, and customer education."
  }
];

// FAQs for Keyword Research (Service ID: 30)
const keywordResearchFAQs: FAQ[] = [
  {
    id: 1,
    question: "What's the difference between short-tail and long-tail keywords?",
    answer: "Short-tail keywords are 1-2 words with high search volume but high competition (like 'shoes'). Long-tail keywords are 3+ words with lower volume but higher intent and less competition (like 'women's running shoes for flat feet')."
  },
  {
    id: 2,
    question: "How do you determine keyword difficulty and competition?",
    answer: "We analyze factors like domain authority of ranking sites, content quality, backlink profiles, and SERP features. We use tools like Ahrefs, SEMrush, and Moz combined with manual analysis to assess realistic ranking opportunities."
  },
  {
    id: 3,
    question: "What is search intent and why does it matter?",
    answer: "Search intent is the reason behind a user's search query - whether they want information, to make a purchase, or find a specific website. Understanding intent helps us target keywords that align with your business goals and user needs."
  },
  {
    id: 4,
    question: "How often should keyword research be updated?",
    answer: "We recommend updating keyword research quarterly or when launching new products/services. Search trends, competition, and user behavior evolve constantly, so regular research ensures you're targeting the most relevant and valuable keywords."
  }
];

// FAQs for SEO Audit (Service ID: 31)
const seoAuditFAQs: FAQ[] = [
  {
    id: 1,
    question: "What does a comprehensive SEO audit include?",
    answer: "Our SEO audit covers technical analysis, on-page optimization review, content assessment, backlink profile analysis, competitive benchmarking, and performance evaluation. We provide prioritized recommendations with expected impact and implementation difficulty."
  },
  {
    id: 2,
    question: "How long does an SEO audit take to complete?",
    answer: "Most SEO audits take 2-4 weeks depending on website size and complexity. Large e-commerce sites or enterprise websites may require additional time for thorough analysis. We provide preliminary findings within the first week."
  },
  {
    id: 3,
    question: "What tools do you use for SEO audits?",
    answer: "We use professional tools like Screaming Frog, Ahrefs, SEMrush, Google Search Console, PageSpeed Insights, and custom scripts for comprehensive analysis. This ensures we catch issues that single tools might miss."
  },
  {
    id: 4,
    question: "How do you prioritize SEO audit recommendations?",
    answer: "We prioritize recommendations based on potential impact, implementation difficulty, and business goals. Quick wins are identified for immediate improvements, while long-term strategies are outlined for sustained growth and competitive advantage."
  }
];
// Collection of all FAQ sets by service ID
const allFAQs: FAQCollection[] = [
  {
    serviceId: 1,
    faqs: websiteDesignFAQs
  },
  {
    serviceId: 2,
    faqs: websiteRedesignFAQs
  },
  {
    serviceId: 3,
    faqs: webAppDesignFAQs
  },
  {
    serviceId: 4,
    faqs: mobileAppDesignFAQs
  },
  {
    serviceId: 5,
    faqs: brandingFAQs
  },
  {
    serviceId: 6,
    faqs: logoDesignFAQs
  },
  {
    serviceId: 7,
    faqs: brandIdentityFAQs
  },
  {
    serviceId: 8,
    faqs: graphicDesignFAQs
  },
  {
    serviceId: 12,
    faqs: ecommerceDesignFAQs
  },
  {
    serviceId: 13,
    faqs: uiUxDesignFAQs
  },
   {
    serviceId: 14,
    faqs: websiteDevelopmentFAQs
  },
  {
    serviceId: 15,
    faqs: webAppDevelopmentFAQs
  },
  {
    serviceId: 16,
    faqs: customWebDevelopmentFAQs
  },
  {
    serviceId: 17,
    faqs: ecommerceDevelopmentFAQs
  },
  {
    serviceId: 18,
    faqs: shopifyDevelopmentFAQs
  },
  {
    serviceId: 19,
    faqs: wordPressDevelopmentFAQs
  },
  {
    serviceId: 20,
    faqs: posDevelopmentFAQs
  },
  {
    serviceId: 21,
    faqs: customSoftwareDevelopmentFAQs
  },
  {
    serviceId: 22,
    faqs: backendApiDevelopmentFAQs
  },
    {
    serviceId: 23,
    faqs: seoStrategyFAQs
  },
  {
    serviceId: 24,
    faqs: localSEOFAQs
  },
  {
    serviceId: 25,
    faqs: technicalSEOFAQs
  },
  {
    serviceId: 26,
    faqs: onPageSEOFAQs
  },
  {
    serviceId: 27,
    faqs: offPageSEOFAQs
  },
  {
    serviceId: 28,
    faqs: ecommerceSEOFAQs
  },
  {
    serviceId: 29,
    faqs: contentStrategyFAQs
  },
  {
    serviceId: 30,
    faqs: keywordResearchFAQs
  },
  {
    serviceId: 31,
    faqs: seoAuditFAQs
  }
];

// Get FAQs for a specific service ID
export const getFAQsByServiceId = (serviceId: number): FAQ[] => {
  const collection = allFAQs.find(f => f.serviceId === serviceId);
  return collection ? collection.faqs : websiteDesignFAQs; // Default to website design FAQs
};

export default allFAQs;