import withPWA from 'next-pwa';

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

export default withPWA({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
})(nextConfig);
