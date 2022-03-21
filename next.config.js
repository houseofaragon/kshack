module.exports = {
  env: {
    API_URL: 'http://localhost:1337/api',
  },
  exportPathMap: async function() {
    const paths = {
      '/': { page: '/'},
      '/about': { page: 'about' },
      '/artists': { page: 'artists' },
      '/404': { page: '404' },
      '/500': { page: '500' }
    }

    const res = await fetch('http://localhost:1337/api/artists')
    const { data } = await res.json()

    const slugs = data.map(artist => artist.attributes.slug)
    slugs.forEach(slug => {
      paths[`/artists/${slug}`] = { page: '/artists/[slug]'}
    })

    return paths;
  }
}
