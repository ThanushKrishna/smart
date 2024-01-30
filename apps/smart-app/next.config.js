/** @type {import('next').NextConfig} */
const NODE_ENV='development';
const isDev = NODE_ENV === 'development'
const nextConfig = {   
    webpack: config => {
        if (isDev) {
          return config;
        }
    
        return {
          ...config,
          externals: {
            react: 'React',
            'react-dom': 'ReactDOM',
          },
        };
      },
}

module.exports = nextConfig

const withImages = require('next-images');
module.exports = withImages();

module.exports = {
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ]
      }
    ]
  }
};