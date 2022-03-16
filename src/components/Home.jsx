import Link from 'next/link'

export function Home() {
  return (
    <>
     {/* <MainImage>
          <Canvas onCreated={state => state.gl.setClearColor( new THREE.Color( 0xffffff ))} shadows dpr={[1, 2]} camera={{ position: [0, 0, 8], far: 10 }}
      >
        <Blob position={[0, 0, -20]} scale={[20, 20, 20]}/>
        </Canvas>
      </MainImage> */}
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
