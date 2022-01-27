import styled from 'styled-components'
import { useMemo, Suspense } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'

import { ArtistImage } from './ArtistImage'

export const ARTISTS = [
  { id: 1,
    name: "ronnie-makebelieve",
    niceName: "Ronnie Makebelieve",
    album: "Muon",
    song: "sleep.wav",
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
    song: "sleep.wav",
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
    song: "sleep.wav",
    released: "October 1, 2021",
    art: "Selwa Abd",
    masteredBy: "Stephan Mathieu",
    producedBy: "Mike Sheffield and Jeremy Krinsley",
    bandcampLink: "https://kshack.bandcamp.com/album/muon-kschk001"
  },
];

export function Artists() {
  return (
    <div className='main-content'>
        {ARTISTS.map((artist, index) => {
            return <Artist artist={artist} index={index} key={index} />
        })}
    </div>
  )
}

function Artist({artist, index}) {
    const imgSrc = `${artist.name}.png` 
    return (
      <a href={`/artists/${artist.name}`}>
        <div className="item">
          <span className="item__album">{artist.album}</span>
          <h2 className="item__artist">{artist.niceName}</h2>
          <section className="item__canvas">
          <Suspense fallback={<div><img className="item__img" src={imgSrc} alt={`${artist.name} image`} /></div>}>
                <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 10], fov: 45 }}>
                <ArtistImage src={imgSrc} index={index} />
                </Canvas>
            </Suspense>
          </section>
          <span className="item__counter">kshck{artist.id < 10 ? `00${artist.id}` : artist.id}</span>
        </div>
      </a>
    )
}
