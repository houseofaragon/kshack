import styled from 'styled-components'
import Link from 'next/link'

export function Header() {
  return (
    <div className="header menu">
      <div>
        <Link href="/"><div className='logo' /></Link>
      </div>
      <div>
        <span className="pr-5"><Link href="/artists">Artists</Link></span>
        <Link href="/about">About</Link>
      </div>
    </div>
  )
}
