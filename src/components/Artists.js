import styled from 'styled-components'
import { useMemo, Suspense } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'

import { ArtistImage } from './ArtistImage'

const ArtistsWrapper = styled.div`
  position: absolute;
  top: 20vw;
  left: 5vw;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

const ArtistWrapper = styled.div`
display: grid;
--column-gap: 2rem;
--row-gap: 10vh;
--mwidth: 400px;
--columns: 3;
max-width: calc(var(--mwidth) * var(--columns) + (var(--columns) - 1) * var(--column-gap));
width: 100%;
margin: 0 auto;
grid-template-columns: repeat(auto-fill, minmax(calc(var(--mwidth)/2), var(--mwidth)));
grid-column-gap: var(--column-gap);
grid-row-gap: var(--row-gap);
justify-content: center;
padding: 4rem 0 20rem;
margin-top: 13rem;
`
const Number = styled.div`
    position: absolute;
`

export const ARTISTS = [
  { id: 1, name: "ronnie-makebelieve", album: "poop bum", song: "sleep.wav", description: "chill ronnies" },
//   { id: 2, name: "sleep-300", album: "poop bum", song: "sleep.wav", description: "chill dudes" },
//   { id: 3, name: "sleep-300", album: "poop bum",  song: "sleep.wav", description: "chill dudes" },
];

export function Artists() {
  return (
    <ArtistsWrapper>
        {ARTISTS.map((artist, index) => {
            return <Artist artist={artist} index={index} key={index} />
        })}
    </ArtistsWrapper>
  )
}

function Artist({artist, index}) {
    const imgSrc = `${artist.name}.png` 
    return (
      <div className="item">
            <Suspense fallback={<div>loading...</div>}>
                <Canvas>
                <ArtistImage src={imgSrc} index={index} />

                </Canvas>
            </Suspense>
          <figure className="item__fig js-plane">
            <div className="aspect" style={{aspect: "151.75%"}}></div>
            <img className="item__img" src={imgSrc} alt={`${artist.name} image`} />
          </figure>
          <span className="item__pretitle">{artist.name}</span>
          <h2 className="item__title">{artist.album}</h2>
          <span className="item__counter">{artist.id < 10 ? `0${artist.id}` : artist.id}</span>
          <p className="item__description">{artist.description}</p>
        </div>
    )
}
