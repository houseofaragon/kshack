import { ArtistPage } from "@/components/ReleasePage";
import { Layout } from "@/components/Layout";
import { getAllArtistSlugs, getArtistBySlug } from "@/lib/api";
import Head from "next/head"

export default function Index({artistData}) {
  return (
    !artistData ?
      (<div> oops! </div>)
      : 
      (
        <Layout>
          <Head>
            <title>{artistData.niceName} - {artistData.albumName}</title>
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
  return {
    props: {
      artistData: {
        id: data.id,
        ...data.attributes
      }
    }
  }
}

export async function getStaticPaths() {
  const slugs = await getAllArtistSlugs()
  const paths = slugs.map(artist => `/releases/${artist.attributes.slug}`)

  return {
    paths,
    // https://nextjs.org/docs/api-reference/data-fetching/get-static-paths
    fallback: false,
  }
}