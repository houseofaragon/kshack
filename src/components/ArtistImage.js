import * as THREE from 'three'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { useMemo, useState, useRef } from 'react'
import glsl from 'glslify';
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { a } from '@react-spring/three'
import gsap from 'gsap';

import { fragmentShader, vertexShader}  from '../assets/shader.js'

/*
 Load texture into shader
 https://codesandbox.io/s/divine-shape-wqf6f?from-embed=&file=/src/App.js:90-155
 https://codesandbox.io/s/02-make-some-noise-forked-inj5q?file=/src/gl/index.js
 https://codesandbox.io/s/03-adding-the-texture-forked-h6sup?file=/src/gl/index.js
*/
export function ArtistImage({src, index}) {
  const imageRef = useRef()
  const [hover, setHover] = useState(false);

  const plane = useMemo(() => <planeGeometry attach="geometry" args={[5, 5, 32, 32]} />)
  const texture = useMemo(() => useLoader(TextureLoader, src))
  texture.minFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;
  
  const shaderMaterialData = useMemo(
    () => ({
      uniforms: {
          uTexture: { value: texture},
          uTime: { value: 0 },
          uProg: { value: 0 },
          uIndex: { value: index },
      },
      fragmentShader,
      vertexShader
    }),
    []
  )
  
  /* https://onion2k.hashnode.dev/using-a-useframe-render-hook-in-@react-three/fiber */
  useFrame((state, delta) => {
    if (imageRef && imageRef.current && hover) {
      imageRef.current.material.uniformsNeedUpdate = true;
      imageRef.current.material.uniforms.uTime.value += delta/2;
    }
  })

  function handlePointerOver() {
    setHover(true)
    gsap.to(imageRef.current.material.uniforms.uProg, {
      // duration: 1,
      value: 1,
      ease: 'power.inOut',
    });
  }

  function handlePointerOut() {
    setHover(false);
    gsap.to(imageRef.current.material.uniforms.uProg, {
      // duration: 1,
      value: 0,
      ease: 'power.inOut',
    });
  }

  return (
    <a.mesh ref={imageRef}
      onPointerOver={() => handlePointerOver()}
      onPointerOut={() => handlePointerOut()}
    >
      {plane}
      <shaderMaterial attach="material" args={[{
        uniforms: shaderMaterialData.uniforms,
        uniformsNeedUpdate: true,
        vertexShader: glsl(shaderMaterialData.vertexShader),
        fragmentShader: glsl(shaderMaterialData.fragmentShader),
      }]} />
    </a.mesh>
  )
}
