import Link from 'next/link'

export function Header() {
  return (
    <div className="header menu z-10">
      <div>
        <Link href="/" passHref><div className='logo' /></Link>
      </div>
      <div className='text-right'>
        <span className="pr-7"><Link href="/releases">Releases</Link></span>
        <Link href="/about">Contact</Link>
      </div>
    </div>
  )
}
