import { Suspense, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { ARTISTS } from './Artists'
import styled from 'styled-components'
import { Spectrogram } from './Spectrogram'
import { Canvas } from '@react-three/fiber'

export const RightLink = styled.div`
  position: absolute;
  bottom: 50%;
  right: 6vw;
  font-family: 'Inter, sans-serif';
  font-weight: 400;
  line-height: 1em;
  letter-spacing: -0.01em;
  font-size: 12px;
  transform: rotate(-90deg) translate3d(50%, 0, 0);
  transform-origin: 100% 50%;
`
export const LeftMiddle = styled.div`
  position: absolute;
  bottom: 58%;
  left: 42.7%;
  background-color: white;
  padding: 5px;
  font-weight: 400;
  letter-spacing: 0.2em;
  font-size: 14px;
  transform: rotate(-90deg) translate3d(50%, 0, 0);
  transform-origin: 100% 50%;
  z-index: -1;
`
const BottomLeft = styled.div`
  position: absolute;
  bottom: 6vw;
  left: 23vw;
  font-size: 12px;
`
export const Bar = styled.div`
  z-index: -1;
  position: absolute;
  top: ${(props) => (props.vertical ? '40%' : '29%')};
  left: ${(props) => (props.vertical ? '50%' : '0px')};
  width: ${(props) => (props.vertical ? '2px' : '150px')};
  height: ${(props) => (props.vertical ? '150px' : '2px')};
  background: #252525;
`
export const BottomRight = styled.div`
  position: absolute;
  bottom: 6vw;
  right: 20vw;
  font-weight: 400;
  letter-spacing: -0.01em;
  font-size: 12px;
  text-align: right;
`
export function ArtistPage({artistData}) {
  const animate = useRef(false);
  const [ready, setReady] = useState(false)
  
  const { id, albumName, featuredSongName, niceName, nextArtistSlug, nextArtistLinkText } = artistData

  return (
    <>
      <div className="main-content">
          <div className="item__album">
            {albumName}
            <div>
              <p>Listen to {featuredSongName}</p>
              <button onClick={(e) => {
              e.preventDefault()
              setReady(!ready)}
              }>{ready ? '||' : '▶'}</button>
            </div>
          </div>
          <h2 className="item__artist"><em>by</em> {niceName}</h2>
          <LeftMiddle>
            <span className="">KSCHK{id < 10 ? `00${id} ` : id}</span>
          </LeftMiddle>
          <Bar />
          <Bar vertical />
        <BottomLeft>
          <a href={``}>
            Bandcamp
          </a>
          <a href={``}>
            Soundcloud
          </a>
        </BottomLeft>
        <RightLink>
          <a href={`/artists/${nextArtistSlug}`}>
            <span className="mr-3">&darr;</span> 
            <span>{nextArtistLinkText}</span>
          </a>
        </RightLink>
        <BottomRight>
          <p> {artistData.albumName} was produced by {artistData.producer}.</p>
          <p> Mastered by {artistData.masteredBy}. Album Art by {artistData.coverArtist}.</p> 
          <p>Released on {artistData.releaseDate}.</p>
        </BottomRight>
      </div>
      <div className='sound-visualizer'>
        <Canvas shadows dpr={[1, 2]} camera={{ position: [-1, 1.5, 100], fov: 25 }}>
          <spotLight position={[-4, 4, -4]} angle={0.06} penumbra={1} castShadow shadow-mapSize={[2048, 2048]} />
          <Suspense fallback={null}
          >
            <Spectrogram
              animate={ready}
              song={artistData.featuredSongUrl}
              random={false} />
          </Suspense>
        </Canvas>
      </div>
    </>
  )
}
