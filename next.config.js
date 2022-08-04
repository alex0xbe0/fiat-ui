/** @type {import('next').NextConfig} */
const moduleExports = {
  reactStrictMode: false,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        and: [/\.(js|ts)x?$/],
      },
      use: ['@svgr/webpack'],
    });

    return config
  },
  async redirects() {
    return [
      {
        source: "/senatus",
        permanent: true,
        destination: "https://gov.fiatdao.com/senatus"
      },
      {
        source: "/rewards",
        permanent: true,
        destination: "https://gov.fiatdao.com/rewards"
      },
      {
        source: "/age-of-romulus",
        permanent: true,
        destination: "https://gov.fiatdao.com/age-of-romulus"
      },
      {
        source: "/airdrop",
        permanent: true,
        destination: "https://gov.fiatdao.com/airdrop"
      }
    ]
  },
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/create-position',
      },
    ]
  },
  env: {
    commitHash: Buffer.from(require('child_process').execSync('git rev-parse --short HEAD')).toString().trim()
  },
  // Required for Fleek.io deploy
  trailingSlash: true,
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    // Dynamic routes are intentionally not added
    return {
      '/': { page: '/create-position' },
      '/create-position': { page: '/create-position' },
      '/getting-started': { page: '/getting-started' },
      '/auctions': { page: '/auctions' },
      '/your-positions': { page: '/your-positions' },
      '/404': { page: '/404' }
    }
  },
}

module.exports = moduleExports;
