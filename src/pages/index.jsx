import Head from 'next/head'
import { Home } from '@/components/Home'
import { Layout } from '@/components/Layout'

export default function App() {
  return (
    <Layout>
      <Head />
      <Home />
    </Layout>
  )
}
