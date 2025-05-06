import Head from 'next/head'
import { Home } from '@/components/Home'
import { Layout } from '@/components/Layout'
import { getLatestRelease } from "@/lib/api"

export default function App() {
  return (
    <Layout>
      <Head>
        <title>kshack recs</title>
      </Head>
      <Home />
    </Layout>
  )
}

