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
  }
];

// Get FAQs for a specific service ID
export const getFAQsByServiceId = (serviceId: number): FAQ[] => {
  const collection = allFAQs.find(f => f.serviceId === serviceId);
  return collection ? collection.faqs : websiteDesignFAQs; // Default to website design FAQs
};

export default allFAQs;