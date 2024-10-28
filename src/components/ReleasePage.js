export function ArtistPage({artistData}) {
   const { id, albumName, niceName, nextArtistSlug, nextArtistLinkText, prevArtistLinkText, prevArtistSlug, bandcampUrl, soundcloudUrl, soundcloudPlaylistId, description } = artistData
  
  const iframeSrc = `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/${soundcloudPlaylistId}&color=%230a0a0a&auto_play=false&hide_related=false&show_comments=false&show_user=false&show_reposts=false&show_teaser=false`

  return (
    <>
      <div className='min-w-4rem left-right-link-holder'>
        <div className='z-10 left-middle-link hover:underline'>
            <a className="ml-0" href={`/releases/${prevArtistSlug}`}>
              <span className='lg:hidden md:hidden inline-block'>←</span> <span className='lg:inline-block md:inline-block hidden m-2'>↓</span>{prevArtistLinkText} 
              
            </a>
        </div>
        <div className='right-middle-link z-10 hover:underline'>
          <a href={`/releases/${nextArtistSlug}`}>
            {nextArtistLinkText}  <span className='lg:hidden md:hidden inline-block'> → </span> <span className='lg:inline-block md:inline-block hidden ml-1'> ↓ </span>
          </a>
        </div>
      </div>
      <div className="main-content z-1 flex flex-col justify-start md:justify-between md:h-full-screen mt-[50px] md:mt-[130px] md:px-28 lg:px-60">
        <div className='bar-horizontal-thin' />
        <div className='bar-horizontal' />
        <div className='bar-vertical' /> 
        
        <div className='left-middle-link bar-vertical'>
          <h2 className="">KSCHK{id < 100 ? `        00${id} ` : id}</h2>
        </div>

        <div className='flex flex-col justify-start md:flex-row align-center md:justify-between items-top mt-5'>
          <div className="item__album z-10">
            <h3>{albumName}</h3>
          </div>
          <div>
            <h2 className="item__artist"><em>by</em> {niceName}</h2>
          </div>
        </div>
        
        <div className='flex flex-row justify-start items-start md:flex-row justify-between md:items-end pb-5'>
          <div className="flex flex-col z-10">
            <p className='text-xl'>☺</p>
            <p><a href={bandcampUrl} target="_blank" rel="noreferrer">
              Bandcamp
            </a></p>
            <p><a href={soundcloudUrl} target="_blank" rel="noreferrer">
              Soundcloud
            </a></p>
          </div>
          <div className="meta text-left md:text-right">
            {artistData.producer && <p> Produced by {artistData.producer}</p>}
            {artistData.masteredBy && <p> Mastered by {artistData.masteredBy} </p>}
            {artistData.coverArtist && <p> Album Art by {artistData.coverArtist}</p>} 
            {artistData.releaseDate && <p> Released on {artistData.releaseDate}</p>}
          </div>
        </div>
        <div>
          <iframe width="100%" height="400" scrolling="no" frameBorder="no" allow="autoplay" src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/${soundcloudPlaylistId}&color=%23000000&auto_play=false&hide_related=false&show_comments=truee&show_user=false&show_reposts=false&show_teaser=false`}></iframe>
        </div>
       
        <div className='pt-5'>
          <p>{description}</p>
        </div>
      </div>
    </>
  )
}
