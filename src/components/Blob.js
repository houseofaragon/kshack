import * as THREE from 'three'
import { render } from 'react-dom'
import React, { useRef, useEffect, useMemo } from 'react'
import { Canvas, extend, useThree, useFrame } from '@react-three/fiber'
import { EffectComposer, DepthOfField, Bloom, Noise, Vignette } from '@react-three/postprocessing'


export default function Effects() {
  const composer = useRef()
  const { scene, gl, size, camera } = useThree()
  useEffect(() => void composer.current.setSize(size.width, size.height), [size])
  useFrame(() => composer.current.render(), 1)
  return (
    <EffectComposer ref={composer} args={[gl]}>
        <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={2} height={480} />
        <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
        <Noise opacity={0.02} />
        {/* <Vignette eskil={false} offset={0.1} darkness={1.1} /> */}
    </EffectComposer>
  )
}

function Boxes({ material: Material = 'meshStandardMaterial', amount = 100, spread = 6, color, ...props }) {
  const mesh = useRef()
  const dummy = new THREE.Object3D()
  const rps = () => spread / 2 - Math.random() * spread
  const coords = useMemo(() => new Array(amount).fill().map(() => [rps(), rps(), rps()]), [amount])
  useEffect(state => {
    coords.forEach(([x, y, z], i) => {
      dummy.position.set(x, y, z)
      dummy.updateMatrix()
      mesh.current.setMatrixAt(i, dummy.matrix)
    })
    mesh.current.instanceMatrix.needsUpdate = true
  }, [])
  return (
    <instancedMesh ref={mesh} args={[null, null, amount]} {...props} receiveShadow castShadow>
      <boxBufferGeometry attach="geometry" />
      <Material attach="material" color={color} roughness={1} />
    </instancedMesh>
  )
}

function Lights() {
  const ref = useRef()
  useFrame(() => (ref.current.rotation.y = ref.current.rotation.z += 0.01))
  return (
    <group ref={ref}>
      <ambientLight intensity={0.5} />
      <directionalLight castShadow intensity={2} position={[30, 30, 50]} />
      <pointLight intensity={5} position={[0, 0, 0]} />
    </group>
  )
}

function Content() {
  const ref = useRef()
  useFrame(() => (ref.current.rotation.x = ref.current.rotation.y = ref.current.rotation.z += 0.005))
  return (
    <group ref={ref}>
      <Boxes amount={20} material="meshBasicMaterial" color="lightpink" />
      <Boxes amount={60} color="#575760" />
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
