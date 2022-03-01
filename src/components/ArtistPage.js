import { useRef, useState } from 'react'
import { Link, useRouteMatch, useParams } from 'react-router-dom'
import { StaticTrack, SoundVisualizer } from './SoundVisualizer'
import { ARTISTS } from './Artists'
import { LeftMiddle } from './Home'
import styled from 'styled-components'

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
  const nextArtist = ARTISTS.find(artist => artist.id === currentArtist.id + 1)

  return (
    <>
      <div className='main-content artist-info'>
        <div className="item">
          <img className="item__img_small" src={`../../${currentArtist.name}.png`} alt={`${currentArtist.name} image`} />
          <span className="item__album">{currentArtist.album}</span>
          <h2 className="item__artist">{currentArtist.niceName}</h2>
          <p>{currentArtist.album} was mastered by {currentArtist.masteredBy}</p>
          <p>produced by {currentArtist.producedBy}</p>
          <p>released on {currentArtist.released}</p>
          <p>art by {currentArtist.art}</p>
          <p>kshck{currentArtist.id < 10 ? `00${currentArtist.id}` : currentArtist.id}</p>

          <p>Listen to {currentArtist.song}</p>
          <button onClick={() => {
            setReady(!ready)}
          }>▶️</button>
            
        </div>
      </div>
      <div className='sound-visualizer'>
        <SoundVisualizer animate={ready} />
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
