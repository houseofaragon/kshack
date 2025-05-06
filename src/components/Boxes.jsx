import * as THREE from 'three'
import React, { useRef, useEffect, useMemo } from 'react'
import { extend, useThree, useFrame } from '@react-three/fiber'
import { EffectComposer, SSAO, Bloom, Vignette, Noise } from '@react-three/postprocessing';

export default function Effects() {
  const { size } = useThree()

  return (
    <EffectComposer>
      <Bloom
        intensity={2.2}             
        luminanceThreshold={0.2}    
        luminanceSmoothing={0.8}    
        mipmapBlur={true}
      />
      <SSAO
        samples={16}               
        radius={0.2}
        intensity={10}             
        luminanceInfluence={0.6}
        color="black"
      />
      <Vignette
        eskil={false}
        offset={0.2}              
        darkness={0.8}            
      />
      <Noise opacity={0.2} />
    </EffectComposer>
  )
}

function Boxes({ material: Material = 'meshStandardMaterial', amount = 100, spread = 6, color, ...props }) {
  const mesh = useRef()
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const rps = () => spread  - Math.random() * spread
  const coords = useMemo(() => new Array(amount).fill().map(() => [rps() - 3, rps(), rps() + 1]), [amount])
  const randomY = Math.floor(Math.random() * (10)) + 2
  const randomX = Math.floor(Math.random() * (1.5)) + 0.5
 
  useEffect(state => {
    coords.forEach(([x, y, z], i) => {
      dummy.position.set(x, y, z)
      dummy.updateMatrix()
      mesh.current.setMatrixAt(i, dummy.matrix)
    })
    mesh.current.instanceMatrix.needsUpdate = true
  }, [coords, dummy])

  return (
    <instancedMesh ref={mesh} args={[null, null, amount]} {...props} receiveShadow castShadow>
      <boxGeometry attach="geometry" args={[randomX, randomY, 0.1]}/>
      <meshStandardMaterial attach="material" color={color} roughness={1} />
    </instancedMesh>
  )
}

function Lights() {
  const ref = useRef()
  // useFrame(() => (ref.current.rotation.y = ref.current.rotation.x += 0.01))
  return (
    <group ref={ref}>
      <ambientLight intensity={0.5} />
      <directionalLight castShadow intensity={0.5} position={[0, 0, 0]} />
      {/* <pointLight intensity={1} position={[0, 0, 0]} /> */}
    </group>
  )
}

function Content() {
  const ref = useRef()
  useFrame(() => (ref.current.rotation.x  = ref.current.rotation.z = ref.current.rotation.y += 0.001))
  return (
    <group ref={ref}>
      <Boxes amount={5} color="#aaaaaa" />
      <Boxes amount={5} color="#999999" />
      <Boxes amount={2} color="#666666" />
    </group>
  )
}

export function Blob() {
  return (
    <>
      <Lights />
      <Content />
      <Effects />
    </>
  )
}
