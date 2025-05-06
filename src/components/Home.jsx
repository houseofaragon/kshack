import Link from 'next/link'
import { Canvas } from '@react-three/fiber'
import { Blob } from './Boxes'
import * as THREE from 'three'

export function Home() { 
  return (
    <>
     <div className="main-image">
      <div className='announcement'>
          <p>Hi, we're KSHACK.</p>
          <p>Our latest release is <a href='/releases/clairaudience-letters-from-emptiness'>Letters from Emptiness by Clairaudience</a>.</p>
      </div>
      <Canvas onCreated={state => state.gl.setClearColor(new THREE.Color( 0xfefefe ))} shadows dpr={[1, 2]} camera={{ position: [0, 0, 8], far: 10 }}
      >
        <Blob position={[0, 0, -20]} scale={[10, 10, 10]}/>
      </Canvas>
      </div>
      
      <div className='bottom-left flex flex-col'>
        <a target="_blank" href="https://kshack.bandcamp.com/" rel="noreferrer">Bandcamp</a>
      </div>
      <div className='bottom-right r-[6vw]'>
        <a target="_blank" href="https://soundcloud.com/kschk/" rel="noreferrer">Soundcloud</a>
      </div>
      <div className='right-middle'>An excellent shack.</div>
      <div className='bar-horizontal' />
      <div className='bar-vertical' />
    </>
  )
}
