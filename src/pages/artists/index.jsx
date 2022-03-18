import { Artists } from "@/components/Artists"
import { Layout } from "@/components/Layout"
import { getAllArtists } from "@/lib/api"

export default function Index({artists}) {
  return (
    <Layout>
      <Artists artists={artists} />
    </Layout>
  )
}

export async function getStaticProps() {
  const artists = await getAllArtists();

  return {
    props: {
      artists
    }
  }
}