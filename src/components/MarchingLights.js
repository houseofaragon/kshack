import React, { useRef, useEffect, useCallback } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import lerp from "lerp";
import { MarchingCubes } from "three/examples/jsm/objects/MarchingCubes";

import { CUBES, BACK, LIGHTS } from "../util/utils";

function MarchingLights(props) {
  const { blobRef } = props;

  const { scene } = useThree();

  const ref = useRef();
  const lightsRef = useRef();

  const numblobs = 1;
  const subtract = 1;
  const strength = 4 / ((Math.sqrt(numblobs) - 1) / 4 + 1);

  const init = useCallback(
    function init() {
      ref.current = new MarchingCubes(
        64,
        new THREE.MeshPhysicalMaterial({
          color: new THREE.Color(CUBES),
          emissive: new THREE.Color(BACK),
          emissiveIntensity: 0.1,

          metalness: 0,
          roughness: 0.5,

          side: THREE.DoubleSide
        }),
        false,
        false
      );

      scene.add(ref.current);

      return () => scene.remove(ref.current);
    },
    [ref, scene]
  );

  const onFrame = useCallback(
    function onFrame({ clock }) {
      const time = clock.getElapsedTime() /25;

      ref.current.rotation.x = lerp(ref.current.rotation.x, time / 10, 0.2);
      ref.current.rotation.y = lerp(ref.current.rotation.y, time / 10, 0.2);
      ref.current.rotation.z = lerp(ref.current.rotation.z, time / 10, 0.2);

      if (ref.current) {
        ref.current.reset();

        ref.current.scale.copy(blobRef.current.scale).addScalar(1);
        ref.current.position.copy(blobRef.current.position);

        lightsRef.current.position.set(
          ref.current.position.x,
          ref.current.position.y,
          ref.current.position.z
        );
        lightsRef.current.rotation.set(
          ref.current.rotation.x,
          ref.current.rotation.y,
          ref.current.rotation.z
        );

        for (let i = 0; i < numblobs; i++) {
          const x = Math.sin(
            i + time * (1 + 0.5 * Math.cos(((2 * Math.PI) / 3) * i))
          );
          const z = Math.cos(
            i + time * (1 + 0.5 * Math.cos(((2 * Math.PI) / 3) * i))
          );
          const y = Math.sin(
            i + time * (1 + 0.5 * Math.cos(((2 * Math.PI) / 3) * i))
          );

          // const ballx = x * 0.3 + 0.9;
          // const ballz = z * 0.3 + 0.9;
          // const bally = y * 0.3 + 0.9;
          // ref.current.addBall(ballx, bally, ballz, strength, subtract);

          const lightx = x * 104 + 1.5;
          const lightz = z * 104 + 1.5;
          const lighty = y * 104 + 1.5;
          lightsRef.current.children[i].position.set(lightx, lighty, lightz);
        }
      }
    },
    [ref, lightsRef, blobRef, numblobs, strength]
  );

  useEffect(() => {
    init();
  }, [init]);

  useFrame(onFrame);

  return (
    <group ref={lightsRef}>
      {LIGHTS.map(({ id, color }) => (
        <pointLight
          key={id}
          intensity={1}
          color={new THREE.Color(color)}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
      ))}
    </group>
  );
}

export default MarchingLights;
