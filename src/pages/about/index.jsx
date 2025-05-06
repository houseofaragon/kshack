import { Layout } from "@/components/Layout";
import Head from "next/head";

export default function About() {
  return (
    <Layout>
      <Head>
        <title>About</title>
      </Head>
      <div className="main-image">
      <div className="announcement">
        <p>Hi, we're KSHACK.</p>
        <p>You can reach us at kshackrecs [at] gmail dot com</p>
        <p className="pt-7"><a href="https://kshack.bandcamp.com/" target="_blank" rel="noreferrer" >Bandcamp</a></p>
        <p><a href="https://soundcloud.com/kschk/" target="_blank" rel="noreferrer" >Soundcloud</a></p>
        <p> <a href="https://soundcloud.com/kschk/" target="_blank" rel="noreferrer" >Instagram</a></p> 
        <p> <a href="https://open.spotify.com/playlist/4gMewBIPO6NwNUSefKeenP?si=201ac2a1b3444d27" target="_blank" rel="noreferrer" >Spotify</a></p>
        <p> <a href="https://linktr.ee/kschk" target="_blank" rel="noreferrer" >Linktree</a></p>
      </div>
      </div>

    <div className='bottom-left flex flex-col'>
      </div>
      <div className='bottom-right'>
        With love from NYC.
      </div>
      <div className='right-middle'>An excellent shack.</div>
      <div className='bar-horizontal' />
      <div className='bar-vertical' />
    </Layout>
  )
}