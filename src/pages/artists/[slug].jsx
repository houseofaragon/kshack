import { ArtistPage } from "@/components/ArtistPage";
import { Layout } from "@/components/Layout";
import { getAllArtistSlugs, getArtistBySlug } from "@/lib/api";

export default function Index({artistData}) {
  return (
    <Layout>
    {!artistData ? <div> oops! </div>
    : <ArtistPage artistData={artistData} />}
    </Layout>

  )
}

export async function getStaticProps({params}) {
  console.log('params', params.slug)
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
  const paths = slugs.map(artist => `/artists/${artist.attributes.slug}`)

  return {
    paths,
    // https://nextjs.org/docs/api-reference/data-fetching/get-static-paths
    fallback: true,
  }
}