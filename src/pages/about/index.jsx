import { Layout } from "@/components/Layout";

export default function About() {
  return (
    <Layout>
      <div className="flex h-screen -mt-[120px] text-center">
      <div className="m-auto">
        <p>Hi, we're KSHACK.</p>
        <p>You can reach us at kshack [at] gmail dot com</p>
      </div>
    </div>
    <div className='bottom-left flex flex-col'>
        <a href="https://kshack.bandcamp.com/" target="_blank" rel="noreferrer" >Bandcamp</a>
        <a href="https://soundcloud.com/kschk/" target="_blank" rel="noreferrer" >Soundcloud</a>
      </div>
      <div className='bottom-right'>
        We are based in Brooklyn, NY.
      </div>
      <div className='right-middle'>An excellent shack.</div>
      <div className='bar-horizontal' />
      <div className='bar-vertical' />
    </Layout>
  )
}