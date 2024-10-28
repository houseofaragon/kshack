import { Layout } from "@/components/Layout";

export default function About() {
  return (
    <Layout>
      <div className="main-image">
      <div className="announcement">
        <p>Hi, we're KSHACK.</p>
        <p>You can reach us at kshack [at] gmail dot com</p>
        <p className="pt-7"><a href="https://kshack.bandcamp.com/" target="_blank" rel="noreferrer" >Bandcamp</a></p>
        <p><a href="https://soundcloud.com/kschk/" target="_blank" rel="noreferrer" >Soundcloud</a></p>
        <p> <a href="https://soundcloud.com/kschk/" target="_blank" rel="noreferrer" >Instagram</a></p> 
      </div>
      </div>

    <div className='bottom-left flex flex-col'>
      </div>
      <div className='bottom-right'>
        We are based in NY.
      </div>
      <div className='right-middle'>An excellent shack.</div>
      <div className='bar-horizontal' />
      <div className='bar-vertical' />
    </Layout>
  )
}