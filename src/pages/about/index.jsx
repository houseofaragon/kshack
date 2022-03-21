import { Layout } from "@/components/Layout";

export default function About() {
  return (
    <Layout>
      <div className="m-auto">
        <p>Hi, we're KShack. You can reach us at [email]</p>
      </div>
      <div className='bottom-left'>
        Put something funny here?
      </div>
      <div className='bottom-right'>
        We are based in Brooklyn, Ny
      </div>
      <div className='right-middle'>An excellent shack.</div>
      <div className='left-middle'>KSHACK</div>
      <div className='bar-horizontal' />
      <div className='bar-vertical' />
    </Layout>
  )
}