import releasesData from '@/data/releases.json'

function getReleases() {
  return Array.isArray(releasesData?.releases) ? releasesData.releases : []
}

export async function getAllArtists() {
  const releases = getReleases()
  const sorted = releases
    .slice()
    .sort((a, b) => (b.catalogNumber || 0) - (a.catalogNumber || 0))

  return sorted.map(release => ({
    catalogNumber: release.catalogNumber ?? null,
    name: release.artist ?? release.niceName ?? null,
    niceName: release.artist ?? release.niceName ?? null,
    albumName: release.release ?? release.albumName ?? null,
    releaseDate: release.releaseDate ?? null,
    slug: release.slug ?? null,
  }))
}

export async function getAllArtistSlugs() {
  const releases = getReleases()
  return releases.map(release => ({ slug: release.slug ?? null }))
}

export async function getArtistBySlug(slug) {
  const release = getReleases().find(r => r.slug === slug)
  if (!release) return []

  return [
    {
      slug: release.slug ?? null,
      niceName: release.artist ?? release.niceName ?? null,
      catalogNumber: release.catalogNumber ?? null,
      featuredSongName: release.featuredSongName ?? null,
      featuredSongUrl: release.featuredSongUrl ?? null,
      releaseDate: release.releaseDate ?? null,
      coverArtist: release.coverArtist ?? null,
      masteredBy: release.masteredBy ?? null,
      producer: release.producer ?? null,
      bandcampUrl: release.bandcampUrl ?? null,
      soundcloudUrl: release.soundcloudUrl ?? null,
      soundcloudPlaylistId: release.soundcloudPlaylistId ?? null,
      prevArtistSlug: release.prevArtistSlug ?? null,
      prevArtistLinkText: release.prevArtistLinkText ?? null,
      nextArtistSlug: release.nextArtistSlug ?? null,
      nextArtistLinkText: release.nextArtistLinkText ?? null,
      description: release.description ?? null,
      albumName: release.release ?? release.albumName ?? null,
    }
  ]
}
