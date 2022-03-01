import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Canvas, useLoader } from '@react-three/fiber'
import * as THREE from 'three'
import { Suspense } from 'react'

const BottomLeft = styled.div`
  position: absolute;
  bottom: 6vw;
  left: 6vw;
  font-family: 'Playfair Display', sans-serif;
  font-size: 12px;
  line-height: 0.9em;
`

const BottomRight = styled.div`
  position: absolute;
  bottom: 6vw;
  right: 6vw;
  font-family: 'Inter, sans-serif';
  font-weight: 400;
  line-height: 1em;
  letter-spacing: -0.01em;
  font-size: 12px;
  text-align: right;
`

export const LeftMiddle = styled.div`
  position: absolute;
  bottom: 50%;
  right: 6vw;
  font-family: 'Inter, sans-serif';
  font-weight: 400;
  line-height: 1em;
  letter-spacing: -0.01em;
  font-size: 12px;
  transform: rotate(90deg) translate3d(50%, 0, 0);
  transform-origin: 100% 50%;
`

const Bar = styled.div`
  position: absolute;
  top: ${(props) => (props.vertical ? '0px' : '50%')};
  left: ${(props) => (props.vertical ? '50%' : '0px')};
  width: ${(props) => (props.vertical ? '2px' : '150px')};
  height: ${(props) => (props.vertical ? '150px' : '2px')};
  background: #252525;
`
function MainImage() {
  const texture = useLoader(THREE.TextureLoader, '../../504-aquatic copy.png')

  return (
    <Canvas shadows dpr={[1, 2]} camera={{ position: [-1, 1.5, 1], fov: 25 }}>
      <spotLight position={[-4, 4, -4]} angle={0.06} penumbra={1} castShadow shadow-mapSize={[2048, 2048]} />
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.025, 0]}>
        <planeBufferGeometry receiveShadow attach="geometry" args={[0.5, 0.5]} />
        <meshBasicMaterial attach="material" map={texture} />
      </mesh>
    </Canvas>
  )
}

export function Home() {
  return (
    <>

      <BottomLeft>
        <Link to="/artists">Soundcloud</Link>
      </BottomLeft>
      <BottomRight>
        Art by Hatnim Lee
      </BottomRight>
      <LeftMiddle>An excellent shack.</LeftMiddle>
      <Bar />
      <Bar vertical />
      <Suspense fallback={
        <div>...</div>}
      >
        <div>
          <MainImage />
        </div>
      </Suspense>
    </>
  )
}
