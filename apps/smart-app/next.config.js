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
