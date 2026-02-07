# KShack Context

## Purpose
This repo hosts the KShack label site. It renders a home page, releases index, and release detail pages.

## Releases Data Source
Releases are now driven by a committed JSON config:
- `src/data/releases.json`

The frontend reads it via `src/lib/api.js` (replacing Strapi GraphQL).

### Required fields per release
- `slug` (string, used for URL and S3 image)
- `artist` (string, display name)
- `release` (string, album title)
- `catalogNumber` (number, KSCHK###)
- `releaseDate` (string)
- `bandcampUrl` (string)
- `soundcloudUrl` (string)
- `soundcloudPlaylistId` (string; can be numeric ID or SoundCloud playlist URN)
- `description` (string; supports line breaks)

Optional fields:
- `producer`
- `masteredBy`
- `coverArtist`

### Latest release
`latestReleaseSlug` in `src/data/releases.json` controls the default "latest" marker. The homepage link is in `src/components/Home.jsx` and should be kept in sync when a new release goes live.

## Images
Release cover images are pulled from S3 using the slug:
`https://kshack-assets.s3.amazonaws.com/<slug>.png`

If a new release is added, a matching PNG should be uploaded to S3 with the same slug.

## Prev/Next Navigation
Release detail pages compute prev/next by `catalogNumber` in `src/pages/releases/[slug].jsx`.

## Dev Commands
- Install: `yarn install`
- Dev: `yarn dev`
- Build: `yarn build`

## Notes
- This repo uses Next.js (pages router).
- Strapi is no longer required for frontend data.
