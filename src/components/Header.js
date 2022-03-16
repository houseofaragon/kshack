import styled from 'styled-components'
import Link from 'next/link'

export function Header() {
  return (
    <div className="header">
      <div className='menu'>
        <Link href="/"><div className='logo' /></Link>
        <Link href="/artists">Artists</Link>
      </div>
    </div>
  )
}
