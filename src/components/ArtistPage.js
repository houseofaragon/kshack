import { Suspense, useRef, useState } from 'react'
import { Link, useRouteMatch, useParams } from 'react-router-dom'
import { ARTISTS } from './Artists'
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
export function ArtistPage() {
  const animate = useRef(false);

  const [ready, setReady] = useState(false)
  let { name } = useParams()
  
  const currentArtist = ARTISTS.find(artist => artist.name === name)
  const nextArtist = currentArtist.id < ARTISTS.length ? ARTISTS.find(artist => artist.id === currentArtist.id + 1) : ARTISTS[0]
  const artistImgSrc = `../../${currentArtist.name} copy.png`

  return (
    <>
      <div className="main-content bg-green">
          <div className="item__album">
            {currentArtist.album}
            <div>
              <p>Listen to {currentArtist.song}</p>
              <button onClick={(e) => {
              e.preventDefault()
              setReady(!ready)}
              }>{ready ? '||' : '▶'}</button>
            </div>
          </div>
          <h2 className="item__artist"><em>by</em> {currentArtist.niceName}</h2>
          <LeftMiddle>
            <span className="">KSCHK{currentArtist.id < 10 ? `00${currentArtist.id} ` : currentArtist.id}</span>
          </LeftMiddle>
          <Bar />
          <Bar vertical />
        <BottomLeft>
          <a href={`/artists/${nextArtist.name}`}>
            Bandcamp
          </a>
          <a href={`/artists/${nextArtist.name}`}>
            Soundcloud
          </a>
        </BottomLeft>
        <RightLink>
          <a href={`/artists/${nextArtist.name}`}>
            <span className="mr-3">&darr;</span> 
            <span>{nextArtist.album} by {nextArtist.niceName} </span>
          </a>
        </RightLink>
        <BottomRight>
          <p> {currentArtist.album} was produced by {currentArtist.producedBy}.</p>
          <p> Mastered by {currentArtist.masteredBy}. Album Art by {currentArtist.art}.</p> 
          <p>Released on {currentArtist.released}.</p>
          <p>Album Art by {currentArtist.art}.</p>
        </BottomRight>
      </div>
      <div className='sound-visualizer'>
        <Suspense fallback={
          <div>
            <img className="item__img" src={`/public/${artistImgSrc}`} alt="artist image" />
          </div>}
        >
          <Spectrogram animate={ready} artistImgSrc={`/public/${artistImgSrc}`} random={false} />
        </Suspense>
      </div>
    </>
  )
}
