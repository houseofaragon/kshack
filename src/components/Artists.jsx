import styled from 'styled-components'
import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'

import { ArtistImage } from '@/components/ArtistImage'
import Link from 'next/link'

export const Bar = styled.div`
  position: absolute;
  top: ${(props) => (props.vertical ? '350px' : '11.6%')};
  left: ${(props) => (props.vertical ? '50%' : '0px')};
  width: ${(props) => (props.vertical ? '2px' : '150px')};
  height: ${(props) => (props.vertical ? '150px' : '2px')};
  background: #252525;
`
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

export function Artists({ artists }) {
  return (
    <div className='grid gap-10 grid-cols-1 md:grid-cols-2 md:mt-20 lg:grid-cols-3 mt-10 content-center'>
      {artists.map((artist, index) => {
        const { niceName, albumName, albumImage, slug } = artist.attributes
        const imgSrc = `http://localhost:1337${albumImage.data.attributes.url}`

        const artistPagePath = `/artists/${slug}`;

        return (
          <Link href={artistPagePath} key={index} passHref>
            <div className="item">
              <span className="item__album">{albumName}</span>
              <h2 className="item__artist"><em>by</em> {niceName}</h2>
              <section className="item__canvas">
                <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 10], fov: 45 }}>
                  <Suspense fallback={null}>
                    <ArtistImage src={imgSrc} index={index} />
                  </Suspense>
                </Canvas>
              </section>
              <LeftMiddle>
                <span className="item__counter">KSCHK{artist.id < 10 ? `00${artist.id} ` : artist.id}</span>
              </LeftMiddle>
              <Bar />
              <Bar vertical />
            </div>
          </Link>
        )
      })}
    </div>
  )
}
