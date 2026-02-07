# KShack

## Description
Welcome! This is the repo for NYC based record label KShack.

## Installation
```bash
# Install dependencies (preferred)
yarn install
```

## Usage
```bash
# Run the project
yarn dev
```

## Build

```bash
# Build the project
yarn build
```

## Deploy
Commit and push all changes to a Github branch to kick off a deploy on Netlify:

```
https://app.netlify.com/sites/kshack/deploys
```

## Releases Data
Releases are now stored in a committed JSON config:

- `src/data/releases.json`

When updating releases, edit this file directly and ensure each release has:
`slug`, `artist`, `release`, `catalogNumber`, `releaseDate`, `bandcampUrl`,
`soundcloudUrl`, `soundcloudPlaylistId`, and `description` as needed.

Cover images are loaded from S3 by slug:
`https://kshack-assets.s3.amazonaws.com/<slug>.png`

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Technologies Used
- React
- React-Three-Fiber
- NextJS
