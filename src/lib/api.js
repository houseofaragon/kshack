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
    throw new Error(`Failed to fetch data: ${data.errors}`)
  }

  return data.data
}

export async function getAllArtists() {
  const query = `
    query Artists {
      artists {
        data {
          id,
          attributes {
            niceName,
            albumName,
            albumImage {
              data {
                attributes {
                  url
                }
              }
            }
            slug
          }
        }
      }
    }
  `

  const data = await fetchApi(query)
  return data?.artists?.data
}

export async function getAllArtistSlugs() {
  const query = `
    query Artists {
      artists {
        data {
          attributes {
            slug
          }
        }
      }
    }
  `
  const data = await fetchApi(query)
  return data?.artists?.data
}

export async function getArtistBySlug(slug) {
  const query = `
  query Artists {
    artists(filters: { slug: { eq: "${slug}"}}) {
      data {
        id,
        attributes {
          slug,
          niceName,
          featuredSongName,
          featuredSongUrl,
          releaseDate,
          coverArtist,
          masteredBy,
          producer,
          bandcampUrl,
          soundcloudUrl,
          nextArtistSlug,
          nextArtistLinkText,
          albumImage {
            data {
              attributes {
                url
              }
            }
          },
          albumName
        }
      }
    }
  }
  `
  const data = await fetchApi(query)
  
  return data?.artists?.data
}