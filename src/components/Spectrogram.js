import * as THREE from 'three'
import { useEffect, useRef, useMemo } from 'react'
import { Canvas, useFrame, useLoader } from 'react-three-fiber'
import { useAsset } from 'use-asset'
import { colorMatrix } from '../util/utils'
import { fragmentShader, vertexShader}  from '../assets/spectrogramShader'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import glsl from 'glslify';

const frequency_samples = 512;
const frequenceData = new Uint8Array(frequency_samples);

export function Spectrogram({animate, artistImgSrc, random = true}) {
  return (
    <Canvas shadows dpr={[1, 2]} camera={{ position: [-1, 1.5, 100], fov: 25 }}>
      <spotLight position={[-4, 4, -4]} angle={0.06} penumbra={1} castShadow shadow-mapSize={[2048, 2048]} />
      <SpectrogramViz url="/sleep.wav" animate={animate} artistImgSrc={artistImgSrc} random={random}/>
    </Canvas>
  )
}

function SpectrogramViz({ url, y = 2500, space = 3, width = 0.01, height = 0.05, obj = new THREE.Object3D(), animate, artistImgSrc, random = false, ...props }) {
  const ref = useRef()
  const { gain, context, update, data, analyser } = useAsset(() => createAudio(url), url)

  // https://calebgannon.com/2021/01/09/spectrogram-with-three-js-and-glsl-shaders/
  // https://codepen.io/raybradbury/pen/jOadgpd?editors=1010
  // https://github.com/jwtea/three-viewer/blob/20744c53faf7ece7ee1bd19bc593a6322f39d002/components/Shapes/Points.jsx#L7

  const time_samples = 450; // X resolution
  const n_vertices = (frequency_samples + 1) * (time_samples + 1);
  const xsize = 35;  
  const ysize = 20;
  const xsegments = time_samples;
  const ysegments = frequency_samples;
  const xhalfSize = xsize / 2;
  const yhalfSize = ysize / 2;
  const xsegmentSize = xsize / xsegments;
  const ysegmentSize = ysize / ysegments;

  let [heights] = useMemo(() => {
    let heights = [];
    // generate vertices and color data for a simple grid geometry
    for (let i = 0; i <= xsegments; i ++ ) {
      let x = ( i * xsegmentSize ) - xhalfSize;

      for ( let j = 0; j <= ysegments; j ++ ) {
        let y = (j * ysegmentSize) - yhalfSize;
        heights.push(0)
      }
    }

    return [heights]
  });

  const [indices, positions, lookUpTable] = useMemo(() => {
    let indices = [];
    let positions = [];

    // generate vertices and color data for a simple grid geometry
    for (let i = 0; i <= xsegments; i ++ ) {
      let x = ( i * xsegmentSize ) - xhalfSize;

      for ( let j = 0; j <= ysegments; j ++ ) {
        let y = (j * ysegmentSize) - yhalfSize;
        positions.push( x, y, 0);
      }
    }

    // generate indices (data for element array buffer)
    for (let i = 0; i < xsegments; i ++ ) {
      for ( let j = 0; j < ysegments; j ++ ) {
        let a = i * ( ysegments + 1 ) + ( j + 1 );
        let b = i * ( ysegments + 1 ) + j;
        let c = ( i + 1 ) * ( ysegments + 1 ) + j;
        let d = ( i + 1 ) * ( ysegments + 1 ) + ( j + 1 );

        // generate two faces (triangles) per iteration
        indices.push( a, b, d ); // face one
        indices.push( b, c, d ); // face two
      }
    }

    let lookUpTable = [];
    for (let n=0;n<256;n++) {
      lookUpTable.push(new THREE.Vector3(
        (colorMatrix[n][1]), 
        (colorMatrix[n][1]),
        (colorMatrix[n][2]*255))
      );
    } 

    return [
      indices,
      positions,
      lookUpTable
    ]
  })

  const texture = useMemo(() => useLoader(TextureLoader, artistImgSrc))
  // texture.minFilter = THREE.LinearFilter;
  // texture.generateMipmaps = false;
  texture.minFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;

  const shaderMaterialData = useMemo(
    () => ({
        uniforms: {
          uTexture: { value: texture},
          uTime: { value: 0 },
          uProg: { value: 0 },
          uIndex: { value: 3 },
          vLut: {type: "v3v", value: lookUpTable}
      },
      fragmentShader,
      vertexShader
    }),
    []
  )

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
    if (animate && ref && ref.current) {
      // update audio
      let heightsValue = []
      if (random) {
        crypto.getRandomValues(frequenceData);
        heightsValue = frequenceData
      } else {
        update()
        heightsValue = data
      }

      let start_val = frequency_samples + 1;
      let end_val = n_vertices - start_val;

      heights = new Uint8Array(heights);
      heights.copyWithin(0, start_val, n_vertices + 1);
      heights.set(heightsValue, end_val - start_val);

      ref.current.geometry.setAttribute('displacement', new THREE.Uint8BufferAttribute(heights, 1));

      ref.current.geometry.attributes.displacement.needsUpdate = true;
    }
  })

  return (
    <mesh ref={ref} rotation={[15,0,15]} position={[0, 3, 0]}>
    {/* <mesh ref={ref} rotation={[-Math.PI/4 , -Math.PI, -Math.PI/6]} position={[5, 15, 0]}> */}
        <bufferGeometry attach="geometry" onUpdate={self => {
          self.computeVertexNormals()
        }}>
          <bufferAttribute
            array={new Uint32Array(indices)}
            attach="index"
            count={indices.length}
            itemSize={1}
          />
          <bufferAttribute
            attachObject={["attributes", "position"]}
            count={positions.length / 3}
            array={new Float32Array(positions)}
            itemSize={3}
          />
          <bufferAttribute
            attachObject={["attributes", "displacement"]}
            count={heights.length}
            array={new Uint8Array(heights)}
            itemSize={1}
          />
        </bufferGeometry>
      {/* <planeGeometry args={[width, height]} /> */}
      <shaderMaterial attach="material" args={[{
        uniforms: shaderMaterialData.uniforms,
        uniformsNeedUpdate: true,
        vertexShader: glsl(shaderMaterialData.vertexShader),
        fragmentShader: glsl(shaderMaterialData.fragmentShader),
      }]} />
    </mesh>
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
  // This is why it doesn't run in Safari 🍏🐛. Start has to be called in an onClick event - need to load the async data first
  source.start(0)

  // Create gain node and an analyser
  const gain = context.createGain()
  const analyser = context.createAnalyser()
  analyser.fftSize = 4 * frequency_samples;  
  source.connect(analyser)
  analyser.connect(gain)

  // The data array receive the audio frequencies
  const data = new Uint8Array(analyser.frequencyBinCount)

  return {
    context,
    source,
    gain,
    data,
    analyser,
    // This function gets called every frame per audio source
    update: () => {
      analyser.getByteFrequencyData(data)
      // Calculate a frequency average
      return (data.avg = data.reduce((prev, cur) => (prev + cur) / data.length , 0))
      // return data
    },
  }
}
