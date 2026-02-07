/** @type {import('next').NextConfig} */
module.exports = {
  output: 'export',
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
  // getStaticPaths handles dynamic routes during export
}
