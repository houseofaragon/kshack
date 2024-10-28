import styled from 'styled-components'
import { Suspense, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'

import { ArtistImage } from '@/components/ReleaseImage'
import Link from 'next/link'

export const Bar = styled.div`
  position: absolute;
  top: ${(props) => (props.vertical ? '323px' : '11.6%')};
  right: ${(props) => (props.vertical ? '50%' : '0px')};
  width: ${(props) => (props.vertical ? '2px' : '100px')};
  height: ${(props) => (props.vertical ? '100px' : '2px')};
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
    <div className='lg:mt-20 mt-10 content-center grid lg:grid-cols-4 lg:gap-8 md:grid-cols-3 md:gap-6 sm:grid-cols-1'>
      {artists.map((artist, index) => {
        const { niceName, albumName, slug, releaseDate } = artist.attributes
        const imgSrc = `https://kshack-assets.s3.amazonaws.com/${slug}.png`
        const artistPagePath = `/releases/${slug}`;

        return (
          <Link href={artistPagePath} key={index} passHref>
            <div className="item">
              <div className='z-10'>
                <LeftMiddle>
                  <span className="item__counter">KSCHK{artist.id < 100 ? `00${artist.id} ` : artist.id}</span>
                </LeftMiddle>
                <Bar className='md:block lg:block hidden'/>
                <Bar vertical className='md:block lg:block hidden' />
                <span className="item__album">{albumName}</span>
                <h2 className="item__artist"><em>by</em> {niceName}</h2>
                <p className='absolute bottom-5 sm:hidden'>{releaseDate}</p>
              </div>
              <div className='lg:m-10 m-1 lg:block md:block'>
                  <ArtistImage src={imgSrc} index={index} />
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
