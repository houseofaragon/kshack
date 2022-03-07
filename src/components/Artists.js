import styled from 'styled-components'
import { useMemo, Suspense } from 'react'
import { Canvas, useFrame, useLoader } from 'react-three-fiber'

import { ArtistImage } from './ArtistImage'
import { useNavigate, Link } from 'react-router-dom'

export const ARTISTS = [
  { id: 1,
    name: "ronnie-makebelieve",
    niceName: "Ronnie Makebelieve",
    album: "Muon",
    song: "synth.mp3",
    released: "October 1, 2021",
    art: "Selwa Abd",
    masteredBy: "Stephan Mathieu",
    producedBy: "Mike Sheffield and Jeremy Krinsley",
    bandcampLink: "https://kshack.bandcamp.com/album/muon-kschk001"
  },
  { id: 2,
    name: "sleep-300",
    niceName: "Sleep 300",
    album: "Reduction",
    song: "snare.mp3",
    released: "October 1, 2021",
    art: "Selwa Abd",
    masteredBy: "Stephan Mathieu",
    producedBy: "Mike Sheffield and Jeremy Krinsley",
    bandcampLink: "https://kshack.bandcamp.com/album/muon-kschk001"
  },
  { id: 3,
    name: "504-aquatic",
    niceName: "504 Aquatic",
    album: "LoE3",
    song: "drums.mp3",
    released: "October 1, 2021",
    art: "Selwa Abd",
    masteredBy: "Stephan Mathieu",
    producedBy: "Mike Sheffield and Jeremy Krinsley",
    bandcampLink: "https://kshack.bandcamp.com/album/muon-kschk001"
  },
];

export const LeftMiddle = styled.div`
  position: absolute;
  bottom: 35px;
  right: 0vw;
  left: -10px;
  font-family: 'Inter, sans-serif';
  font-weight: 400;
  line-height: 1em;
  letter-spacing: -0.01em;
  font-size: 12px;
  transform: rotate(270deg) translate3d(100%, 0, 0);
  transform-origin: 100% 50%;
`

export function Artists() {
  return (
    <div className='grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-40 content-center'>
      {ARTISTS.map((artist, index) => {
          return <Artist artist={artist} index={index} key={index} />
      })}
    </div>
  )
}

const Bar = styled.div`
  position: absolute;
  top: ${(props) => (props.vertical ? '350px' : '11.6%')};
  left: ${(props) => (props.vertical ? '50%' : '0px')};
  width: ${(props) => (props.vertical ? '2px' : '150px')};
  height: ${(props) => (props.vertical ? '150px' : '2px')};
  background: #252525;
`

function Artist({artist, index}) {
    const imgSrc = `${artist.name} copy.png` 
    const artistPagePath = `/artists/${artist.name}`;

    return (
      <Link to={artistPagePath}>
        <div className="item move">
          <span className="item__album">{artist.album}</span>
          <h2 className="item__artist"><em>by</em> {artist.niceName}</h2>
          <section className="item__canvas">
            <Suspense fallback={
              <div>
                <img className="item__img" src={`/public/${imgSrc}`} alt={`${artist.name} image`} />
              </div>}>
              <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 10], fov: 45 }}>
                <ArtistImage src={imgSrc} index={index} />
              </Canvas>
            </Suspense>
          </section>
          <LeftMiddle>
            <span className="item__counter">KSCHK{artist.id < 10 ? `00${artist.id} ` : artist.id}</span>
          </LeftMiddle>
          <Bar />
          <Bar vertical />
        </div>
      </Link>
    )
}
