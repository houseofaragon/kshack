import * as THREE from 'three'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { useEffect, useMemo, useState, useRef } from 'react'
import glsl from 'glslify';
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { a } from '@react-spring/three'
import gsap from 'gsap';

import { fragmentShader, vertexShader}  from '@/helpers/shader'

// async function isValidImage(url) {
//   try {
//       const response = await fetch(url);
//       if (!response.ok) {
//           return false;
//       }
//       const blob = await response.blob();
//       const img = new Image();
//       return new Promise((resolve) => {
//           img.onload = () => resolve(true);
//           img.onerror = () => resolve(false);
//           img.src = URL.createObjectURL(blob);
//       });
//   } catch (error) {
//       console.error('Error fetching the image:', error);
//       return false;
//   }
// }

/*
 Load texture into shader
 https://codesandbox.io/s/divine-shape-wqf6f?from-embed=&file=/src/App.js:90-155
 https://codesandbox.io/s/02-make-some-noise-forked-inj5q?file=/src/gl/index.js
 https://codesandbox.io/s/03-adding-the-texture-forked-h6sup?file=/src/gl/index.js
*/
const defaultImageSrc = `https://kshack-assets.s3.amazonaws.com/salem-hilal-bite.png`;

export function ArtistImage({src, index}) {
  // const [imageSrc, setImageSrc] = useState(defaultImageSrc)

  // useEffect(() => {
  //   const checkImage = async () => {
  //       const valid = await isValidImage(src);
  //       setImageSrc(valid ? src : defaultImageSrc); // Use default image if invalid
  //   };

  //   checkImage();
  // }, [imageSrc]);

  // const imageRef = useRef()
  // const [hover, setHover] = useState(false);
  // const plane = useMemo(() => <planeGeometry attach="geometry" args={[5, 5, 32, 32]} />, [])
  
  // const texture = useLoader(TextureLoader, imageSrc)
  // texture.minFilter = THREE.LinearFilter;
  // texture.generateMipmaps = false;
  
  // const shaderMaterialData = useMemo(
  //   () => ({
  //     uniforms: {
  //         uTexture: { value: texture},
  //         uTime: { value: 0 },
  //         uProg: { value: 0 },
  //         uIndex: { value: index },
  //     },
  //     fragmentShader,
  //     vertexShader
  //   }),
  //   [index, texture]
  // )
  
  /* https://onion2k.hashnode.dev/using-a-useframe-render-hook-in-react-three-fiber */
  // useFrame((state, delta) => {
  //   if (imageRef && imageRef.current && hover) {
  //     imageRef.current.material.uniformsNeedUpdate = true;
  //     imageRef.current.material.uniforms.uTime.value += delta/2;
  //   }
  // })

  // function handlePointerOver() {
  //   setHover(true)
  //   gsap.to(imageRef.current.material.uniforms.uProg, {
  //     value: 1,
  //     ease: 'power.inOut',
  //   });
  // }

  // function handlePointerOut() {
  //   setHover(false);
  //   gsap.to(imageRef.current.material.uniforms.uProg, {
  //     value: 0,
  //     ease: 'power.inOut',
  //   });
  // }

  return (
    // <a.mesh ref={imageRef}
    //   onPointerOver={() => handlePointerOver()}
    //   onPointerOut={() => handlePointerOut()}
    // >
    //   {plane}
    //   <shaderMaterial attach="material" args={[{
    //     uniforms: shaderMaterialData.uniforms,
    //     uniformsNeedUpdate: true,
    //     vertexShader: glsl(shaderMaterialData.vertexShader),
    //     fragmentShader: glsl(shaderMaterialData.fragmentShader),
    //   }]} />
    // </a.mesh>    
    <img src={src} alt="Artist" className=''  />
  )
}
