import { Suspense, useRef, useState, useEffect } from 'react'
import { Spectrogram } from './Spectrogram'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

export function ArtistPage({artistData}) {
  const animate = useRef(false);
  const [ready, setReady] = useState(false)
  const [songBuffer, setSongBuffer] = useState(null)

  const { id, albumName, featuredSongName, niceName, nextArtistSlug, nextArtistLinkText, prevArtistLinkText, prevArtistSlug, bandcampUrl, soundcloudUrl } = artistData
  console.log(artistData)
  useEffect(() => {
    const fetchSong = async () => {
      const data = await fetch(artistData.featuredSongUrl)
      const buffer = await data.arrayBuffer()
      setSongBuffer(buffer)
    }

    fetchSong()
  }, [])

  return (
    <>
      <div className="main-content z-1 flex flex-col justify-start md:justify-between md:h-full-screen mt-[50px] md:mt-[130px] md:px-28 lg:px-60">
        <div className='bar-horizontal-thin' />
        <div className='bar-horizontal' />
        <div className='bar-vertical' />
        <div className='z-10 left-middle-link hover:underline'>
          <a href={`/artists/sleep-300-reduction`}>
            <p><span className='text-lg'>↓</span> {prevArtistLinkText} </p>
          </a>
        </div>
        <div className='right-middle z-10 hover:underline'>
          <a href={`/artists/${nextArtistSlug}`}>
            <p><span className='text-lg'>↓</span> {nextArtistLinkText} </p>
          </a>
        </div>
        <div className='left-middle bar-vertical'>
          <h2 className="">KSCHK{id < 10 ? `00${id} ` : id}</h2>
        </div>
        <div className='flex flex-col justify-start md:flex-row md:justify-between items-top h-[400px]'>
          <div className="item__album z-10">
            <h3>{albumName}</h3>
            <div>
              <p>Listen to {featuredSongName}</p>
              {songBuffer ? <button onClick={(e) => {
              e.preventDefault()
              setReady(!ready)}
              }>{ready ? '||' : '▶'}</button> : <p>Loading...</p>}
            </div>
          </div>
          <div>
            <h2 className="item__artist"><em>by</em> {niceName}</h2>
          </div>
        </div>
        <div className='flex flex-col justify-start items-start md:flex-row justify-between md:items-end'>
          <div className="flex flex-col z-10">
            <p><a href={bandcampUrl} target="_blank" rel="noreferrer">
              Bandcamp
            </a></p>
            <p><a href={soundcloudUrl} target="_blank" rel="noreferrer">
              Soundcloud
            </a></p>
          </div>
          <div className="meta text-left md:text-right">
            <p> {artistData.albumName} was produced by {artistData.producer}.</p>
            <p> Mastered by {artistData.masteredBy}. Album Art by {artistData.coverArtist}.</p> 
            <p>Released on {artistData.releaseDate}.</p>
          </div>
        </div>
      </div>

      {songBuffer && <div className='sound-visualizer -ml-5'>
        <Canvas shadows dpr={[1, 2]} camera={{ position: [-0.5, 1.5, 100], fov: 25 }}>
          <OrbitControls />
          <spotLight position={[-4, 4, -4]} angle={0.06} penumbra={1} castShadow shadow-mapSize={[2048, 2048]} />
          <Suspense fallback={null}
          >
            <Spectrogram
              animate={ready}
              songBuffer={songBuffer}
              random={false} />
          </Suspense>
        </Canvas>
      </div>}
    </>
  )
}
