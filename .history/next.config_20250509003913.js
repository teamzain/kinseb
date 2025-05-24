/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable production mode
  reactStrictMode: false, // Disable strict mode in production for performance
  
  // Improve production build
  swcMinify: true, // Use SWC minifier
  
  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96],
  },
  
  // Experimental features
  experimental: {
    // Enable these if you're using Next.js 13+ App Router
    serverActions: true,
    serverComponentsExternalPackages: [],
  },
  
  // Compress responses
  compress: true,
  
  // Cache optimization
  onDemandEntries: {
    // period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 25 * 1000,
    // number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 2,
  },
};

module.exports = nextConfig;