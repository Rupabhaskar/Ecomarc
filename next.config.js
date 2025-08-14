// // next.config.js

// const nextConfig = {
//   images: {
//     domains: [
//       'rukminim2.flixcart.com',
//       'm.media-amazon.com',
//       'handbag-asia.com'
//     ],
//   },
// };

// module.exports = nextConfig;

// next.config.js
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'rukminim2.flixcart.com' },
      { protocol: 'https', hostname: 'm.media-amazon.com' },
      { protocol: 'https', hostname: 'handbag-asia.com' },
      { protocol: 'https', hostname: 'tse2.mm.bing.net' }, // ✅ Added
      { protocol: 'https', hostname: 'tse3.mm.bing.net' }, // ✅ Already had
    ],
  },
};

module.exports = nextConfig;
