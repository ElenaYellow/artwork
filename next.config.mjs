/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  //TEST ONLY: Allow images from Art Institute of Chicago for development
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.artic.edu",
      },
    ],
    localPatterns: [
      {
        pathname: '/api/image/[^/]+\\.jpg',
      },
    ],
  },
};

export default nextConfig;
