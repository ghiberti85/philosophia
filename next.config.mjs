/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['three'],
  async redirects() {
    return [
      // The app lives entirely under /<locale>; send the root to the default locale.
      { source: '/', destination: '/en', permanent: false },
    ];
  },
};

export default nextConfig;
