/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com'], // For Google profile images
  },
  output: 'standalone', // For Docker deployment
}

module.exports = nextConfig
