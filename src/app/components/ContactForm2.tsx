'use client';
import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { Poppins, Lato, Barlow } from 'next/font/google';
import Image from 'next/image';
import Head from 'next/head';
import servicesData from '../../../public/data/services.json';

// Font setup with display optimization
const poppins = Poppins({
  weight: ['600'],
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

const lato = Lato({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

const barlow = Barlow({
  weight: ['400', '500'],
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

interface FaqItem {
  id: string;
  title: string;
  description: string;
}

interface ProcessStep {
  number: string;
  title: string;
  description: string;
  bulletPoints: string[];
  image: string;
}

interface ProcessHeader {
  title: string;
  description: string;
}

interface WhyYourBusinessNeeds {
  title: string;
  description: string;
  benefits: string[];
}

interface Service {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  price: string;
  duration: string;
  featured: boolean;
  image: string;
  processSteps: ProcessStep[];
  processHeader: ProcessHeader;
  whyYourBusinessNeeds: WhyYourBusinessNeeds;
  faq?: FaqItem[];
  deliverables?: string[];
  process?: string[];
}

interface ContactForm2Props {
  serviceId: string;
}

export default function ContactForm2({ serviceId }: ContactForm2Props) {
  interface FormData {
    fullName: string;
    email: string;
    companyName: string;
    contactNumber: string;
    message: string;
  }
  
  const initialFormData = useMemo<FormData>(() => ({
    fullName: '',
    email: '',
    companyName: '',
    contactNumber: '',
    message: '',
  }), []);
  
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [animateElements, setAnimateElements] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });
  
  // Find the current service data from services.json
  const currentService = useMemo(() => {
    let service = servicesData.services.find((service: any) => service.id === serviceId);
    
    if (!service && !isNaN(Number(serviceId))) {
      const numericId = Number(serviceId);
      service = servicesData.services.find((service: any) => Number(service.id) === numericId);
    }
    
    return service || servicesData.services[0];
  }, [serviceId]);
  
  // SEO meta data generation
  const seoData = useMemo(() => {
    const baseTitle = `${currentService.title} - Professional Services`;
    const baseDescription = `${currentService.description} Get in touch with our experts for ${currentService.title.toLowerCase()} solutions. Free consultation available.`;
    
    return {
      title: baseTitle,
      description: baseDescription.length > 160 ? baseDescription.substring(0, 157) + '...' : baseDescription,
      keywords: `${currentService.title.toLowerCase()}, professional services, consultation, ${currentService.title.toLowerCase()} expert, business solutions`,
      canonical: `/services/${serviceId}`,
      ogTitle: baseTitle,
      ogDescription: baseDescription.length > 300 ? baseDescription.substring(0, 297) + '...' : baseDescription,
      ogImage: currentService.image || '/images/default-service-og.jpg',
    };
  }, [currentService, serviceId]);

  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  
  const leftContentRef = useRef(null);
  const formContainerRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateElements(true);
    }, 100);

    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry: IntersectionObserverEntry) => {
        if (entry.isIntersecting && entry.target instanceof HTMLElement) {
          entry.target.classList.add('visible');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach((el) => observer.observe(el));

    return () => {
      clearTimeout(timer);
      animatedElements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);

  const toggleSection = useCallback((sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  }, [expandedSection]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear any previous error messages when user starts typing
    if (submitStatus.type === 'error') {
      setSubmitStatus({ type: null, message: '' });
    }
  }, [submitStatus.type]);

  // Enhanced form submission handler with API integration
  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Basic client-side validation
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.message.trim()) {
      setSubmitStatus({
        type: 'error',
        message: 'Please fill in all required fields (Name, Email, and Message).'
      });
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitStatus({
        type: 'error',
        message: 'Please enter a valid email address.'
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      // Prepare data to send including service information
      const submissionData = {
        ...formData,
        // Include service data for the email
        serviceInfo: {
          id: currentService.id,
          title: currentService.title,
          description: currentService.description,
          price: currentService.price,
          duration: currentService.duration
        },
        submittedAt: new Date().toISOString()
      };

      console.log('Submitting form data:', submissionData);

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: 'Thank you! Your message has been sent successfully. We\'ll get back to you within 24 hours.'
        });
        
        // Reset form after successful submission
        setFormData(initialFormData);
        
        // Auto-clear success message after 10 seconds
        setTimeout(() => {
          setSubmitStatus({ type: null, message: '' });
        }, 10000);
        
      } else {
        throw new Error(result.error || 'Failed to send message');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Failed to send message. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, currentService, initialFormData]);

  // Generate structured data for SEO
  const structuredData = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "Service",
    "name": currentService.title,
    "description": currentService.description,
    "provider": {
      "@type": "Organization",
      "name": "Kinseb Web Development",
      "url": "https://kinsebwebdevelopment.com"
    },
    "areaServed": "Global",
    "serviceType": currentService.title,
    "offers": {
      "@type": "Offer",
      "price": currentService.price,
      "priceCurrency": "USD"
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://kinsebwebdevelopment.com/services/${serviceId}`
    }
  }), [currentService, serviceId]);

  const faqStructuredData = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": (currentService.faq || []).map((faq: FaqItem) => ({
      "@type": "Question",
      "name": faq.title,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.description
      }
    }))
  }), [currentService.faq]);

  return (
    <>
      <Head>
        <title>{seoData.title}</title>
        <meta name="description" content={seoData.description} />
        <meta name="keywords" content={seoData.keywords} />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="author" content="Your Company Name" />
        <link rel="canonical" href={`https://kinsebwebdevelopment.com${seoData.canonical}`} />
        
        <meta property="og:title" content={seoData.ogTitle} />
        <meta property="og:description" content={seoData.ogDescription} />
        <meta property="og:image" content={seoData.ogImage} />
        <meta property="og:url" content={`https://kinsebwebdevelopment.com${seoData.canonical}`} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Your Company Name" />
        <meta property="og:locale" content="en_US" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoData.ogTitle} />
        <meta name="twitter:description" content={seoData.ogDescription} />
        <meta name="twitter:image" content={seoData.ogImage} />
        <meta name="twitter:site" content="@yourcompany" />
        <meta name="twitter:creator" content="@yourcompany" />
        
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="theme-color" content="#0D98BA" />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqStructuredData)
          }}
        />
      </Head>

      <main className="landing-container" role="main">
        <section 
          className={`left-content ${animateElements ? 'animate' : ''}`} 
          ref={leftContentRef}
          aria-labelledby="service-title"
        >
          <div className="content-wrapper">
            <header className="header-content">
              <h1 id="service-title" className={`main-heading ${poppins.className} animate-item`}>
                {currentService.title.includes('Design') ? (
                  <>
                    {currentService.title.split('Design')[0]} 
                    <span className="blue-text">Design</span> 
                    {currentService.title.includes('Design Services') ? 'Services' : ''}
                  </>
                ) : (
                  currentService.title
                )}
              </h1>
                  
              <p className={`description ${lato.className} animate-item`}>
                {currentService.description}
              </p>
            </header>
            
            {currentService.faq && Array.isArray(currentService.faq) && currentService.faq.length > 0 ? (
              <section className="faq-container animate-on-scroll" aria-labelledby="faq-heading">
                <h2 id="faq-heading" className="sr-only">Frequently Asked Questions</h2>
                {currentService.faq.map((faqItem: FaqItem) => (
                  <article 
                    key={faqItem.id}
                    className={`faq-item ${expandedSection === faqItem.id ? 'expanded' : ''}`}
                    itemScope
                    itemType="https://schema.org/Question"
                  >
                    <button 
                      className="faq-header" 
                      onClick={() => toggleSection(faqItem.id)}
                      aria-expanded={expandedSection === faqItem.id}
                      aria-controls={`faq-content-${faqItem.id}`}
                      type="button"
                    >
                      <h3 className={`faq-title ${poppins.className}`} itemProp="name">
                        {faqItem.title}
                      </h3>
                      <div 
                        className={`faq-arrow ${expandedSection === faqItem.id ? 'rotated' : ''}`}
                        aria-hidden="true"
                      >
                        <svg width="20" height="12" viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 1L10 10L19 1" stroke="#0D98BA" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                      </div>
                    </button>
                    <div 
                      className="faq-content"
                      id={`faq-content-${faqItem.id}`}
                      itemScope
                      itemType="https://schema.org/Answer"
                    >
                      <div className="faq-content-inner">
                        <p className={`faq-text ${lato.className}`} itemProp="text">
                          {faqItem.description}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </section>
            ) : (
              <section className="info-container animate-on-scroll" aria-labelledby="service-info-heading">
                <h2 id="service-info-heading" className="sr-only">Service Information</h2>
                <div className="info-item">
                  <div className="info-header">
                    <h3 className={`info-title ${poppins.className}`}>
                      Ready to Get Started?
                    </h3>
                  </div>
                  <div className="info-content">
                    <p className={`info-text ${lato.className}`}>
                      Contact us today to discuss your {currentService.title.toLowerCase()} needs. Our team of experts is ready to help you achieve your goals with a customized solution.
                    </p>
                  </div>
                </div>
                <div className="info-item">
                  <div className="info-header">
                    <h3 className={`info-title ${poppins.className}`}>
                      What to Expect
                    </h3>
                  </div>
                  <div className="info-content">
                    <p className={`info-text ${lato.className}`}>
                      Our {currentService.title.toLowerCase()} process is designed to deliver exceptional results. We'll work closely with you from initial consultation through project completion.
                    </p>
                  </div>
                </div>
              </section>
            )}
          </div>
        </section>

        <section 
          className={`form-container ${animateElements ? 'animate' : ''}`}
          ref={formContainerRef}
          aria-labelledby="contact-form-title"
        >
          <h2 id="contact-form-title" className={`form-heading ${poppins.className} animate-item`}>
            Start a Conversation
          </h2>
          
          {/* Status messages */}
          {submitStatus.type && (
            <div 
              className={`status-message ${submitStatus.type}`}
              role={submitStatus.type === 'error' ? 'alert' : 'status'}
              aria-live="polite"
            >
              {submitStatus.message}
            </div>
          )}
          
          <form 
            onSubmit={handleSubmit} 
            className="contact-form"
            noValidate
            aria-describedby="form-description"
          >
            <p id="form-description" className="sr-only">
              Fill out this form to get in touch with our {currentService.title.toLowerCase()} experts
            </p>
            
            <div className="form-row">
              <div className="form-group animate-item">
                <label htmlFor="fullName" className={`form-label ${lato.className}`}>
                  Full Name *
                </label>
                <div className="input-container">
                  <div className="input-icon" aria-hidden="true">
                    <Image 
                      src="/images/user.svg" 
                      width={24} 
                      height={24} 
                      alt="" 
                      loading="lazy"
                      priority={false}
                    />
                  </div>
                  <input 
                    type="text" 
                    id="fullName"
                    name="fullName"
                    placeholder="Your Name"
                    className={`form-input ${barlow.className}`}
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    aria-required="true"
                    aria-describedby="fullName-error"
                    autoComplete="name"
                    disabled={isSubmitting}
                  />
                </div>
              </div>
              
              <div className="form-group animate-item" style={{ animationDelay: '100ms' }}>
                <label htmlFor="email" className={`form-label ${lato.className}`}>
                  Email Address *
                </label>
                <div className="input-container">
                  <div className="input-icon" aria-hidden="true">
                    <Image 
                      src="/images/email.svg" 
                      width={24} 
                      height={24} 
                      alt="" 
                      loading="lazy"
                      priority={false}
                    />
                  </div>
                  <input 
                    type="email" 
                    id="email"
                    name="email"
                    placeholder="Your Email"
                    className={`form-input ${barlow.className}`}
                    value={formData.email}
                    onChange={handleChange}
                    required
                    aria-required="true"
                    aria-describedby="email-error"
                    autoComplete="email"
                    disabled={isSubmitting}
                  />
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group animate-item" style={{ animationDelay: '200ms' }}>
                <label htmlFor="companyName" className={`form-label ${lato.className}`}>
                  Company Name
                </label>
                <div className="input-container">
                  <div className="input-icon" aria-hidden="true">
                    <Image 
                      src="/images/company.svg" 
                      width={24} 
                      height={24} 
                      alt="" 
                      loading="lazy"
                      priority={false}
                    />
                  </div>
                  <input 
                    type="text" 
                    id="companyName"
                    name="companyName"
                    placeholder="Company Name"
                    className={`form-input ${barlow.className}`}
                    value={formData.companyName}
                    onChange={handleChange}
                    autoComplete="organization"
                    disabled={isSubmitting}
                  />
                </div>
              </div>
              
              <div className="form-group animate-item" style={{ animationDelay: '300ms' }}>
                <label htmlFor="contactNumber" className={`form-label ${lato.className}`}>
                  Contact Number
                </label>
                <div className="input-container">
                  <div className="input-icon" aria-hidden="true">
                    <Image 
                      src="/images/phone.svg" 
                      width={24} 
                      height={24} 
                      alt="" 
                      loading="lazy"
                      priority={false}
                    />
                  </div>
                  <input 
                    type="tel" 
                    id="contactNumber"
                    name="contactNumber"
                    placeholder="Contact Number"
                    className={`form-input ${barlow.className}`}
                    value={formData.contactNumber}
                    onChange={handleChange}
                    autoComplete="tel"
                    disabled={isSubmitting}
                  />
                </div>
              </div>
            </div>

            <div className="form-group full-width animate-item" style={{ animationDelay: '400ms' }}>
              <label htmlFor="message" className={`form-label ${lato.className}`}>
                Your Message *
              </label>
              <textarea 
                id="message"
                name="message"
                placeholder="Describe Your Project Needs..."
                className={`form-textarea ${barlow.className}`}
                value={formData.message}
                onChange={handleChange}
                rows={3}
                required
                aria-required="true"
                aria-describedby="message-error"
                disabled={isSubmitting}
              />
            </div>

            <button 
              type="submit" 
              className={`submit-button ${barlow.className} animate-item ${isSubmitting ? 'submitting' : ''}`}
              style={{ animationDelay: '500ms' }}
              aria-describedby="submit-description"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Get in Touch'}
            </button>
            <p id="submit-description" className="sr-only">
              Submit the form to start your {currentService.title.toLowerCase()} consultation
            </p>
          </form>
        </section>

        <style jsx>{`
          .sr-only {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border: 0;
          }

          /* Status message styles */
          .status-message {
            padding: 1rem;
            margin-bottom: 1.5rem;
            border-radius: 8px;
            font-size: 0.875rem;
            line-height: 1.5;
            font-weight: 500;
            animation: slideIn 0.3s ease-out;
          }

          .status-message.success {
            background: rgba(34, 197, 94, 0.1);
            border: 1px solid rgba(34, 197, 94, 0.3);
            color: #22c55e;
          }

          .status-message.error {
            background: rgba(239, 68, 68, 0.1);
            border: 1px solid rgba(239, 68, 68, 0.3);
            color: #ef4444;
          }

          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          /* Base Styles */
          .landing-container {
            display: flex;
            justify-content: space-between;
            align-items: stretch;
            width: 100%;
            min-height: 100vh;
            height: 100%;
            background: linear-gradient(180deg, #04091D 16.18%, #0D98BA 287.92%);
            padding: 2rem;
            color: #FFFFFF;
            box-sizing: border-box;
            gap: 2.5rem;
            overflow: hidden;
          }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes scaleIn {
            from {
              opacity: 0;
              transform: scale(0.95);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }

          .animate-item {
            opacity: 0;
          }

          .left-content.animate .animate-item,
          .form-container.animate .animate-item {
            animation: fadeInUp 0.6s ease-out forwards;
          }

          .left-content.animate .animate-item:nth-child(1) {
            animation-delay: 0.1s;
          }
          .left-content.animate .animate-item:nth-child(2) {
            animation-delay: 0.2s;
          }
          .left-content.animate .animate-item:nth-child(3) {
            animation-delay: 0.3s;
          }

          .animate-on-scroll {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
          }

          .animate-on-scroll.visible {
            opacity: 1;
            transform: translateY(0);
          }

          .left-content {
            flex: 1;
            max-width: 50%;
            height: 100%;
            display: flex;
            flex-direction: column;
            position: relative;
            z-index: 1;
          }
          
          .content-wrapper {
            position: relative;
            z-index: 2;
            display: flex;
            flex-direction: column;
            height: 100%;
            justify-content: flex-start;
            gap: 2rem;
          }

          .header-content {
            padding-top: 1.5rem;
            display: flex;
            flex-direction: column;
            width: 100%;
          }

          .main-heading {
            font-weight: 600;
            font-size: clamp(2rem, 4vw, 2.8rem);
            line-height: 1.3;
            color: #FFFFFF;
            margin: 0 0 1rem 0;
            width: 100%;
            order: 1;
          }

          .description {
            font-weight: 600;
            font-size: clamp(0.875rem, 1.5vw, 1.125rem);
            line-height: 1.5;
            color: #FFFFFF;
            margin: 0 0 1.5rem 0;
            width: 100%;
            max-width: 100%;
            order: 2;
          }

          .blue-text {
            color: #0D98BA;
          }

          .faq-container,
          .info-container {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            width: 100%;
            margin-top: 3px;
          }

          .faq-item,
          .info-item {
            width: 100%;
            background: rgba(13, 152, 186, 0.1);
            border-radius: 10px;
            overflow: hidden;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            min-height: 75px;
          }

          .faq-item:hover,
          .info-item:hover {
            background: rgba(13, 152, 186, 0.15);
          }

          .faq-header,
          .info-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1.2rem 1.5rem;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            height: 75px;
            background: none;
            border: none;
            width: 100%;
            text-align: left;
            color: inherit;
          }

          .info-header {
            cursor: default;
          }

          .faq-header:hover,
          .info-header:hover {
            background: rgba(13, 152, 186, 0.15);
          }

          .faq-title,
          .info-title {
            font-weight: 600;
            font-size: clamp(1.125rem, 2vw, 1.5rem);
            line-height: 1.4;
            color: #FFFFFF;
            margin: 0;
            padding-left: 0.5rem;
            transition: color 0.3s ease;
          }

          .faq-header:hover .faq-title,
          .info-header:hover .info-title {
            color: #FFFFFF;
          }

          .faq-arrow {
            transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            transform-origin: center;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 24px;
            height: 24px;
          }

          .faq-arrow.rotated {
            transform: rotate(180deg);
          }

          .faq-arrow svg {
            transition: all 0.3s ease;
          }

          .faq-header:hover .faq-arrow svg path {
            stroke: #3DB4D0;
          }

          .faq-content,
          .info-content {
            overflow: hidden;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            height: 0;
            opacity: 0;
          }

          .info-content {
            height: auto;
            opacity: 1;
            padding: 0 1.5rem 1.2rem 1.5rem;
          }

          .faq-content-inner,
          .info-content-inner {
            padding: 0 1.5rem 1.2rem 1.5rem;
            transform: translateY(-10px);
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            opacity: 0;
          }

          .info-content .info-text {
            padding: 0;
            transform: none;
            opacity: 1;
            margin: 0;
          }

          .faq-item.expanded .faq-content {
            height: auto;
            min-height: 80px;
            opacity: 1;
          }

          .faq-item.expanded .faq-content-inner {
            transform: translateY(0);
            opacity: 1;
            transition-delay: 0.1s;
          }

          .faq-text,
          .info-text {
            font-weight: 600;
            font-size: clamp(0.875rem, 1.5vw, 1rem);
            line-height: 1.5;
            color: #E6E6E6;
            margin: 0;
            transition: color 0.3s ease;
          }

          .form-container {
            flex: 1;
            max-width: 50%;
            min-height: 55vh;
            background: linear-gradient(180deg, #0D98BA -213.84%, #04091D 103.97%);
            border: 1px solid #07435D;
            backdrop-filter: blur(6px);
            border-radius: 10px;
            padding: 2.5rem;
            display: flex;
            flex-direction: column;
            box-shadow: 0 8px 32px rgba(4, 9, 29, 0.3);
          }

          .form-heading {
            font-weight: 600;
            font-size: clamp(1.5rem, 3vw, 2.375rem);
            line-height: 1.3;
            color: #FFFFFF;
            margin: 0 0 1.5rem 0;
          }

          .contact-form {
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 1.25rem;
          }

          .form-row {
            display: flex;
            justify-content: space-between;
            gap: 1.5rem;
            width: 100%;
          }

          .form-group {
            flex: 1;
            display: flex;
            flex-direction: column;
          }

          .full-width {
            width: 100%;
          }

          .form-label {
            font-weight: 700;
            font-size: clamp(0.875rem, 1vw, 1rem);
            line-height: 1.4;
            letter-spacing: -0.006em;
            color: #E6E6E6;
            margin-bottom: 0.5rem;
          }

          .input-container {
            position: relative;
            width: 100%;
            height: 3.125rem;
            background: rgba(4, 9, 29, 0.9);
            border: 1px solid #07435D;
            backdrop-filter: blur(6px);
            border-radius: 8px;
            display: flex;
            align-items: center;
            padding-left: 3.125rem;
            transition: all 0.3s ease;
          }

          .input-container:focus-within {
            border-color: #0D98BA;
            box-shadow: 0 0 0 2px rgba(13, 152, 186, 0.3);
            transform: translateY(-2px);
          }

          .input-icon {
            position: absolute;
            left: 0.9375rem;
            top: 50%;
            transform: translateY(-50%);
            display: flex;
            align-items: center;
            justify-content: center;
            color: #0D98BA;
            width: 1.5rem;
            height: 1.5rem;
            z-index: 1;
            pointer-events: none;
          }

          .form-input {
            width: 100%;
            background: transparent;
            border: none;
            outline: none;
            height: 100%;
            font-weight: 400;
            font-size: clamp(0.875rem, 1vw, 1rem);
            line-height: 1.5;
            color: #FFFFFF;
            padding: 0 0.9375rem 0 0;
          }

          .form-input::placeholder {
            color: #98989A;
          }

          .form-input:disabled {
            opacity: 0.7;
            cursor: not-allowed;
          }

          .form-textarea {
            width: 100%;
            min-height: 5.5rem;
            background: rgba(4, 9, 29, 0.9);
            border: 1px solid #07435D;
            backdrop-filter: blur(6px);
            border-radius: 8px;
            padding: 0.9375rem;
            font-weight: 400;
            font-size: clamp(0.875rem, 1vw, 1rem);
            line-height: 1.4;
            color: #FFFFFF;
            resize: none;
            outline: none;
            transition: all 0.3s ease;
          }

          .form-textarea::placeholder {
            color: #98989A;
          }

          .form-textarea:focus {
            border-color: #0D98BA;
            box-shadow: 0 0 0 2px rgba(13, 152, 186, 0.3);
            transform: translateY(-2px);
          }

          .form-textarea:disabled {
            opacity: 0.7;
            cursor: not-allowed;
          }

          .submit-button {
            width: 145px;
            height: 48px;
            background: #0D98BA;
            border-radius: 6px;
            font-weight: 500;
            font-size: 0.875rem;
            line-height: 1.5;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #1A1A1A;
            border: none;
            cursor: pointer;
            margin-top: 0.625rem;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
          }

          .submit-button:disabled {
            opacity: 0.7;
            cursor: not-allowed;
            transform: none !important;
          }

          .submit-button.submitting {
            background: #0B86A5;
          }

          .submit-button:before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 0;
            height: 100%;
            background: rgba(255, 255, 255, 0.2);
            transition: width 0.3s ease;
          }

          .submit-button:hover:not(:disabled) {
            background: #0B86A5;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(13, 152, 186, 0.3);
          }

          .submit-button:hover:not(:disabled):before {
            width: 100%;
          }

          .submit-button:focus {
            outline: 2px solid #0D98BA;
            outline-offset: 2px;
          }

          @media (max-width: 1200px) {
            .landing-container {
              padding: 1.5rem;
              gap: 2rem;
            }
            
            .form-container {
              padding: 2rem;
            }
            
            .faq-header {
              padding: 1rem 1.2rem;
            }
          }

          @media (max-width: 1024px) {
            .landing-container {
              padding: 1.25rem;
            }
            
            .form-container {
              padding: 1.75rem;
            }
            
            .faq-title {
              font-size: 1.25rem;
            }
          }

          @media (max-width: 900px) {
            .landing-container {
              flex-direction: column;
              justify-content: flex-start;
              min-height: 100vh;
              height: auto;
              gap: 2rem;
              padding: 2rem 1.25rem;
            }
            
            .left-content {
              max-width: 100%;
              flex: none;
              width: 100%;
              padding-bottom: 1rem;
              order: 1;
            }
            
            .form-container {
              max-width: 100%;
              flex: none;
              width: 100%;
              min-height: auto;
              padding: 2rem 1.75rem;
              order: 2;
            }
            
            .faq-container {
              margin-top: 1rem;
            }

            .header-content {
              flex-direction: column-reverse;
            }
            
            .main-heading {
              order: 2;
              margin: 1rem 0 0 0;
            }
            
            .description {
              order: 1;
              margin: 0 0 0 0;
            }
          }

          @media (max-width: 768px) {
            .landing-container {
              padding: 1.5rem 1rem;
            }
            
            .form-row {
              flex-direction: column;
              gap: 1rem;
            }
            
            .form-heading {
              margin-bottom: 1rem;
            }
            
            .form-container {
              padding: 1.75rem 1.5rem;
            }
            
            .animate-item {
              animation-duration: 0.5s !important;
            }
          }

          @media (max-width: 480px) {
            .landing-container {
              padding: 1rem 0.75rem;
              gap: 1.5rem;
            }
            
            .form-container {
              padding: 1.5rem 1.25rem;
            }
            
            .left-content {
              padding: 0 0.5rem;
            }
            
            .form-textarea {
              min-height: 5rem;
            }
            
            .header-content {
              padding-top: 1rem;
            }
            
            .faq-header {
              padding: 0.75rem 1rem;
            }
            
            .faq-title {
              font-size: 1.125rem;
            }
            
            .left-content.animate .animate-item,
            .form-container.animate .animate-item {
              animation-duration: 0.4s;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .animate-item,
            .animate-on-scroll,
            .faq-arrow,
            .submit-button,
            .input-container,
            .form-textarea,
            .faq-content,
            .faq-content-inner {
              animation: none !important;
              transition: none !important;
            }
          }

          @media (prefers-contrast: high) {
            .faq-header:focus {
              outline: 3px solid #FFFFFF;
            }
            
            .submit-button:focus {
              outline: 3px solid #FFFFFF;
            }
            
            .form-input:focus,
            .form-textarea:focus {
              outline: 2px solid #FFFFFF;
            }
          }

          @media print {
            .landing-container {
              background: white !important;
              color: black !important;
              flex-direction: column;
            }
            
            .form-container {
              background: white !important;
              border: 1px solid black !important;
            }
            
            .submit-button {
              background: white !important;
              color: black !important;
              border: 1px solid black !important;
            }
          }
        `}</style>
      </main>
    </>
  );
}