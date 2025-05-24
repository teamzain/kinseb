/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizeCss: true, // Optimize CSS loading to reduce FOUC
  },
  compiler: {
    styledComponents: true, // If using styled-components
  },
};

module.exports = nextConfig;
