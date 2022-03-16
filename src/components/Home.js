import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Canvas, useLoader } from 'react-three-fiber'
import * as THREE from 'three'
import { Suspense } from 'react'
import { Blob } from './Blob'

const BottomLeft = styled.div`
  position: absolute;
  bottom: 6vw;
  left: 6vw;
  font-size: 12px;
`

export const BottomRight = styled.div`
  position: absolute;
  bottom: 6vw;
  right: 6vw;
  font-weight: 400;
  letter-spacing: -0.01em;
  font-size: 12px;
  text-align: right;
`

export const RightMiddle = styled.div`
  position: absolute;
  bottom: 50%;
  right: 6vw;
  font-weight: 400;
  letter-spacing: -0.01em;
  font-size: 12px;
  transform: rotate(90deg) translate3d(50%, 0, 0);
  transform-origin: 100% 50%;
`
export const LeftMiddle = styled.div`
  position: absolute;
  bottom: 48.3%;
  left: 4.8vw;
  letter-spacing: -0.01em;
  font-size: 17px;
  transform: rotate(0deg) translate3d(50%, 0, 0);
  transform-origin: 100% 50%;
`
export const Bar = styled.div`
  position: absolute;
  top: ${(props) => (props.vertical ? '0px' : '50%')};
  left: ${(props) => (props.vertical ? '50%' : '0px')};
  width: ${(props) => (props.vertical ? '2px' : '150px')};
  height: ${(props) => (props.vertical ? '150px' : '2px')};
  background: #252525;
`

export const MainImage = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  margin-top: -70px;
  margin-left: -50px;
  z-index: -1;
`
export function Home() {
  return (
    <>
     <MainImage>
      <Canvas onCreated={state => state.gl.setClearColor( new THREE.Color( 0xffffff ))} shadows dpr={[1, 2]} camera={{ position: [0, 0, 8], far: 10 }}
            >
        <Blob position={[0, 0, -20]} scale={[20, 20, 20]}/>
        </Canvas>
      </MainImage>
      <BottomLeft>
        <Link to="/artists">Soundcloud</Link>
      </BottomLeft>
      <BottomRight>
        Art by Hatnim Lee
      </BottomRight>
      <RightMiddle>An excellent shack.</RightMiddle>
      <LeftMiddle>KSHACK</LeftMiddle>
      <Bar />
      <Bar vertical />
    </>
  )
}
