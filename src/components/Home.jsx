import Link from 'next/link'
import { Canvas } from '@react-three/fiber'
import { Blob } from './Blob'
import * as THREE from 'three'

export function Home() {
  return (
    <>
     <div className="main-image">
        <Canvas onCreated={state => state.gl.setClearColor(   new THREE.Color( 0xfefefe ))} shadows dpr={[1, 2]} camera={{ position: [0, 0, 8], far: 10 }}
        >
          <Blob position={[0, 0, -20]} scale={[20, 20, 20]}/>
        </Canvas>
      </div>
      <div className='bottom-left'>
        <Link href="/artists">Soundcloud</Link>
      </div>
      <div className='bottom-right'>
        Art by Hatnim Lee
      </div>
      <div className='right-middle'>An excellent shack.</div>
      <div className='left-middle'>KSHACK</div>
      <div className='bar-horizontal' />
      <div className='bar-vertical' />
    </>
  )
}
