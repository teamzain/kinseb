/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Helps catch hydration issues
  swcMinify: true,        // Makes JS smaller/faster

  
  experimental: {
    // Disable appDir if you're not using /app folder
    appDir: false,
  },
};

module.exports = nextConfig;
