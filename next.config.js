/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
};

module.exports = {
  compiler: {
      // Enables the styled-components SWC transform
      styledComponents: true
  },
  exportPathMap: async function() {
    const paths = {
      '/': { page: '/'},
      '/about': { page: '/about' },
      '/releases': { page: '/releases' },
      '/404': { page: '/404' },
      '/500': { page: '/500' }
    }
    return paths;
  }
}
