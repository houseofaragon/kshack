import { Artists } from "@/components/Releases"
import { Layout } from "@/components/Layout"
import { getAllArtists } from "@/lib/api"
import Head from "next/head"

export default function Index({artists}) {
  return (
   <Layout>
    <Head>
      <title>"Releases"</title>
    </Head>
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