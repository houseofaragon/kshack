import React, { useState, useRef, useCallback } from "react";
import { Canvas, useFrame, useLoader } from "react-three-fiber";
import * as THREE from "three";
import { a } from "@react-spring/three";
import MarchingLights from "./MarchingLights";
import gsap from 'gsap';

import { FRONT,BACK, VERTICES_NUM, easeInOutQuad } from "../util/utils";

export function Blob(props) {
  const [hover, setHover] = useState(false);
  const { position, scale } = props;
  const ref = useRef();

  const base = useLoader(THREE.TextureLoader, "ronnie-makebelieve.png");
  const clippingPlanes = [
    new THREE.Plane(new THREE.Vector3(100, 100, 100), 100)
  ];

    // function onFrame(state, delta) {
    //   const time = delta.getElapsedTime() / 20;
    //   console.log(state)
    //   //ref.current.rotation.x += time / 500;
    //   ref.current.rotation.y += time / 500;
    //   //ref.current.rotation.z += time / 500;
    //   //const noiseFactor = state.hover ? 5 : 1;
    //   const noiseFactor = 5;

    //   for (let i = 0; i < ref.current.geometry.vertices.length; i++) {
    //     const p = ref.current.geometry.vertices[i];
    //     p.normalize().multiplyScalar(
    //       1 +
    //         0.3 *
    //           easeInOutQuad(Math.sin(2 * Math.PI * time)) *
    //           window.noise.perlin3(
    //             p.x * noiseFactor + time,
    //             p.y * noiseFactor + time,
    //             p.z * noiseFactor + time
    //           )
    //     );
    //   }
    //   ref.current.geometry.computeVertexNormals();
    //   ref.current.geometry.normalsNeedUpdate = true;
    //   ref.current.geometry.verticesNeedUpdate = true;
    // }

  useFrame((state, delta) => {
    if (ref && ref.current) {
      const time = delta / 20;
      ref.current.rotation.x += time / 500;
      ref.current.rotation.y += time / 500;
      ref.current.rotation.z += time / 500;
      const noiseFactor = hover ? 10 : 10;

      for (let i = 0; i < ref.current.geometry.vertices.length; i++) {
        const p = ref.current.geometry.vertices[i];
        p.normalize().multiplyScalar(
          1 +
            0.3 *
              easeInOutQuad(Math.sin(2 * Math.PI * time)) *
              window.noise.perlin3(
                p.x * noiseFactor + time,
                p.y * noiseFactor + time,
                p.z * noiseFactor + time
              )
        );
      }
      ref.current.geometry.computeVertexNormals();
      ref.current.geometry.normalsNeedUpdate = true;
      ref.current.geometry.verticesNeedUpdate = true;
    }
  });

  function handlePointerOver() {
    console.log('hovering')
    setHover(true)
  }

  function handlePointerOut() {
    setHover(false);
  }

  return (
    <>
      <MarchingLights blobRef={ref} />
      <a.mesh
        ref={ref}
        scale={scale}
        position={position}
        receiveShadow
        onPointerOver={() => handlePointerOver()}
        onPointerOut={() => handlePointerOut()}
      >
        <sphereGeometry
          attach="geometry"
          args={[2, VERTICES_NUM, VERTICES_NUM]}
        />
        <meshPhysicalMaterial
          attach="material"
          side={THREE.FrontSide}
          clippingPlanes={clippingPlanes}
          clipShadows
          metalness={2}
          roughness={0.1}
          color={new THREE.Color(BACK)}
          specular={new THREE.Color(BACK)}
          emissive={new THREE.Color(BACK)}
          emissiveIntensity={0.9}
          map={base}
        />
      </a.mesh>
    </>
  );
}
