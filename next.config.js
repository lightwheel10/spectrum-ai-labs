/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'cdn.simpleicons.org',
      'cdn.worldvectorlogo.com',
      'www.paypalobjects.com',
      'download.logo.wine',
      'cdn.cdnlogo.com',
      'wise.com',
      'randomuser.me'
    ],
  },
}

module.exports = nextConfig 