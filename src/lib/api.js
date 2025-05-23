async function fetchApi(query) {
  const response = await fetch(
    `${process.env.GRAPHQL_URL}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query
      })
    }
  )

  const data = await response.json()

  if (data.errors) {
    throw new Error(`Failed to fetch data: ${JSON.stringify(data.errors, null, 4)}`)
  }

  return data.data
}

export async function getAllArtists() {
  const query = `
 query Artists {
      artists(
        pagination: { page: 1, pageSize: 100},
        sort: "catalogNumber:DESC"
      ) {
          catalogNumber
          name,
          niceName,
          albumName,
          releaseDate,
          slug
        }
    }
  `
  const data = await fetchApi(query)
  return data?.artists
}

export async function getAllArtistSlugs() {
  const query = `
    query Artists {
      artists(pagination: { page: 1, pageSize: 100 }) {
          slug
      }
    }
  `
  const data = await fetchApi(query)
  return data?.artists
}

export async function getArtistBySlug(slug) {
  const query = `
  query Artists {
    artists(filters: { slug: { eq: "${slug}"}}) {
          slug,
          niceName,
          catalogNumber
          featuredSongName,
          featuredSongUrl,
          releaseDate,
          coverArtist,
          masteredBy,
          producer,
          bandcampUrl,
          soundcloudUrl,
          soundcloudPlaylistId,
          prevArtistSlug,
          prevArtistLinkText,
          nextArtistSlug,
          nextArtistLinkText,
          description,
          albumName
    }
  }
  `
  const data = await fetchApi(query)
  
  return data?.artists
}