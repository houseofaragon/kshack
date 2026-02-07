import { ArtistPage } from "@/components/ReleasePage";
import { Layout } from "@/components/Layout";
import { getAllArtistSlugs, getArtistBySlug, getAllArtists } from "@/lib/api";
import Head from "next/head"

export default function Index({artistData}) {
  return (
    !artistData ?
      (<div> oops! </div>)
      : 
      (
        <Layout>
          <Head>
            <title key="title">{`${artistData.niceName} - ${artistData.albumName}`}</title>
          </Head>
          <ArtistPage artistData={artistData} />
        </Layout>
      )
  )
}

export async function getStaticProps({params}) {
  const response = await getArtistBySlug(params.slug)
  if (!(response && response.length)) {
    return {
      props: {
        artistData: null,
      }
    }
  }

  const data = response[0]
  const allArtists = await getAllArtists()
  const formatLinkText = (artist) => {
    if (!artist) return null
    if (artist.niceName && artist.albumName) {
      return `${artist.niceName} - ${artist.albumName}`
    }
    if (artist.slug) {
      return artist.slug.replace(/-/g, ' ')
    }
    return null
  }
  const normalizedArtists = (allArtists || []).map(artist => ({
    ...artist,
    _catalogNumber: Number(artist.catalogNumber),
  }))
  const sortedArtists = normalizedArtists
    .filter(artist => Number.isFinite(artist._catalogNumber))
    .slice()
    .sort((a, b) => a._catalogNumber - b._catalogNumber)
  const currentIndex = sortedArtists.findIndex(artist => artist.slug === data.slug)
  const prevArtist = currentIndex > 0 ? sortedArtists[currentIndex - 1] : null
  const nextArtist = currentIndex >= 0 && currentIndex < sortedArtists.length - 1
    ? sortedArtists[currentIndex + 1]
    : null

  return {
    props: {
      artistData: {
        ...data,
        prevArtistSlug: prevArtist?.slug || null,
        prevArtistLinkText: formatLinkText(prevArtist),
        nextArtistSlug: nextArtist?.slug || null,
        nextArtistLinkText: formatLinkText(nextArtist),
      }
    }
  }
}

export async function getStaticPaths() {
  const slugs = await getAllArtistSlugs()
  const paths = slugs.map(artist => `/releases/${artist.slug}`)

  return {
    paths,
    // https://nextjs.org/docs/api-reference/data-fetching/get-static-paths
    fallback: false,
  }
}
