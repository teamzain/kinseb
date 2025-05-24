
import HeroSection from "@/components/HeroSection";
import WebDevelopmentServices from "@/components/Service";
import TechMarquee from "@/components/Marquee";
import HeroSection2 from "@/components/CTA";
import KinsebWebDevelopment from "@/components/whyus";
import StatsCounter from "@/components/stats";
import TestimonialSlider from "@/components/testimonial";
import BusinessServices from "@/components/BusinnessService";
import WebDesignProcessSlider from "@/components/process";
export default function Home() {
  return (
    <>
{/* <HeroSection /> */}
<TechMarquee />
<WebDevelopmentServices />
<HeroSection2 />
<KinsebWebDevelopment />
<StatsCounter />
<TestimonialSlider />
<BusinessServices />
{/* <WebDesignProcessSlider /> */}

</>
  );
}