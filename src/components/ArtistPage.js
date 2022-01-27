import { useEffect, useState } from 'react'
import { Link, useRouteMatch, useParams } from 'react-router-dom'
import { SoundVisualizer } from './SoundVisualizer'
import { ARTISTS } from './Artists'

export function ArtistPage() {
  const [ready, set] = useState(false)
  let { name } = useParams()
  
  const currentArtist = ARTISTS.find(artist => artist.name === name)
  return (
    <>
      <div className='main-content'>
        <h1>{ name }</h1>
        <p>{ currentArtist.song }</p>
        <p>{ currentArtist.description }</p>
      </div>
      <div className={`fullscreen bg ${ready ? 'ready' : 'notready'} ${ready && 'clicked'}`}>
        <div className="stack">
          <button onClick={() => set(true)}>▶️</button>
        </div>
      </div>
      {ready && <SoundVisualizer />}
    </>
  )
}
