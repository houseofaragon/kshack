import { Suspense, useRef, useState } from 'react'
import { Link, useRouteMatch, useParams } from 'react-router-dom'
import { StaticTrack, SoundVisualizer } from './SoundVisualizer'
import { ARTISTS } from './Artists'
import { LeftMiddle } from './Home'
import styled from 'styled-components'
import { Spectrogram } from './Spectrogram'

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

export function ArtistPage() {
  const animate = useRef(false);

  const [ready, setReady] = useState(false)
  let { name } = useParams()
  
  const currentArtist = ARTISTS.find(artist => artist.name === name)
  const nextArtist = currentArtist.id < ARTISTS.length ? ARTISTS.find(artist => artist.id === currentArtist.id + 1) : ARTISTS[0]
  const artistImgSrc = `../../${currentArtist.name} copy.png`

  return (
    <>
      <div className='main-content artist-info'>
        <div className="item">
          {/* <img
            className="item__img_small"
            src={artistImgSrc}
            alt={`${currentArtist.name} image`} /> */}
          <span className="item__album">{currentArtist.album} </span>
          <h2 className="item__artist">by {currentArtist.niceName}</h2>
          <br/>
          <p>{currentArtist.album} was mastered by {currentArtist.masteredBy}</p>
          <p>produced by {currentArtist.producedBy}</p>
          <p>released on {currentArtist.released}</p>
          <p>art by {currentArtist.art}</p>
          <p>kshck{currentArtist.id < 10 ? `00${currentArtist.id}` : currentArtist.id}</p>
          <br/>
          <p>Listen to {currentArtist.song}</p>
          <button onClick={() => {
            setReady(!ready)}
          }>{ready ? 'Pause' : 'Play'}</button>
        </div>
      </div>
      <div className='sound-visualizer'>
      <Suspense fallback={
        <div>
          <img className="item__img" src={`/public/${artistImgSrc}`} alt="artist image" />
        </div>}
      >
        <Spectrogram animate={ready} artistImgSrc={`/public/${artistImgSrc}`} />
        </Suspense>

      </div>
      <RightLink>
        <a href={`/artists/${nextArtist.name}`}>
          <span>&darr;</span> 
          {nextArtist.album} by {nextArtist.niceName}
        </a> 
      </RightLink>
    </>
  )
}
