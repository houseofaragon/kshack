import * as THREE from 'three'
import { useEffect, useRef } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'

import { useAsset } from 'use-asset'

export function SoundVisualizer({animate, artistImgSrc}) {
  const texture = useLoader(THREE.TextureLoader, artistImgSrc)

  return (
    <Canvas shadows dpr={[1, 2]} camera={{ position: [-1, 1.5, 1], fov: 25 }}>
      <spotLight position={[-4, 4, -4]} angle={0.06} penumbra={1} castShadow shadow-mapSize={[2048, 2048]} />
      <Track position-z={0} url="/sleep.wav" animate={animate} />
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.025, 0]}>
        <planeBufferGeometry receiveShadow attach="geometry" args={[0.8, 0.8]} />
        <shadowMaterial transparent opacity={0.05} />
        <meshBasicMaterial attach="material" map={texture} />
      </mesh>
    </Canvas>
  )
}

function Track({ url, y = 2500, space = 3, width = 0.01, height = 0.05, obj = new THREE.Object3D(), animate,...props }) {
  const ref = useRef()
  // use-asset is the library that r3f uses internally for useLoader. It caches promises and
  // integrates them with React suspense. You can use it as-is with or without r3f.
  const { gain, context, update, data } = useAsset(() => createAudio(url), url)

  useEffect(() => {
    // Connect the gain node, which plays the audio
    gain.connect(context.destination)

      if (!animate && context.state === 'running') {
        context.suspend()
      } else if (context.state === 'suspended') {
        context.resume()
      }
    // Disconnect it on unmount
    return () => gain.disconnect()
  }, [gain, context, animate])
  
  useFrame((state) => {
    if (animate) {
      let avg = update()
      // Distribute the instanced planes according to the frequency daza
      for (let i = 0; i < data.length; i++) {
        obj.position.set(i * width * space - (data.length * width * space) / 2, data[i] / y * 2, 0)
        obj.updateMatrix()
        ref.current.setMatrixAt(i, obj.matrix)
      }
      // Set the hue according to the frequency average
      ref.current.material.color.setHSL(avg / 500, 0.75, 0.75)
      ref.current.instanceMatrix.needsUpdate = true
    }
  })

  return (
    <instancedMesh castShadow ref={ref} args={[null, null, data.length]} {...props}>
      <sphereBufferGeometry attach="geometry" args={[0.01, 32, 64]} />
      {/* <planeGeometry args={[width, height]} /> */}
      <meshBasicMaterial toneMapped={false} />
    </instancedMesh>
  )
}

async function createAudio(url) {
  // Fetch audio data and create a buffer source
  const res = await fetch(url)
  const buffer = await res.arrayBuffer()
  const context = new (window.AudioContext || window.webkitAudioContext)()
  const source = context.createBufferSource()
  source.buffer = await new Promise((res) => context.decodeAudioData(buffer, res))
  source.loop = true
  // This is why it doesn't run in Safari 🍏🐛. Start has to be called in an onClick event
  // which makes it too awkward for a little demo since you need to load the async data first
  source.start(0)

  // Create gain node and an analyser
  const gain = context.createGain()
  const analyser = context.createAnalyser()
  analyser.fftSize = 64
  source.connect(analyser)
  analyser.connect(gain)


  // The data array receive the audio frequencies
  const data = new Uint8Array(analyser.frequencyBinCount)
  console.log('data', data)
  return {
    context,
    source,
    gain,
    data,
    // This function gets called every frame per audio source
    update: () => {
      analyser.getByteFrequencyData(data)
      // Calculate a frequency average
      return (data.avg = data.reduce((prev, cur) => prev + cur / data.length, 0))
    },
  }
}

export function StaticTrack({ y = 2500, space = 3, width = 0.01, height = 0.05, obj = new THREE.Object3D() }) {
  const ref = useRef()

  for (let i = 0; i < 40; i++) {
    obj.position.set(i * width * space - (40 * width * space) / 2, 0, 0)
  }
  // Set the hue according to the frequency average
  // ref.current.material.color.setHSL(500, 0.75, 0.75)
  // ref.current.instanceMatrix.needsUpdate = true

  return (
    <instancedMesh castShadow ref={ref} args={[null, null, 40]}>
      <sphereBufferGeometry attach="geometry" args={[0.01, 32, 64]} />
      <meshBasicMaterial toneMapped={false} />
    </instancedMesh>
  )
}
