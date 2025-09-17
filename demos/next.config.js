/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: {
      rules: {},
    },
    ppr: false, // flip to true to try Partial Prerendering experimentally
  },
};

export default nextConfig;
