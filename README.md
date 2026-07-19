# Blue's World

A simplified birthday website for Blue made by Twitter/X friends. The site now focuses only on:

- Home and birthday countdown
- Dynamic friend profiles
- Letters in text form and optional picture form
- Reasons We Love You
- Playlist songs from each friend
- Final Gift messages

## Run Locally

```bash
npm install
npm run dev
```

Open the local URL shown by Vite.

## Build

```bash
npm run build
```

The production files are created in `dist/`.

## GitHub Pages

This project uses Vite and `HashRouter`, so routes work on GitHub Pages.

1. Push the project to GitHub.
2. Go to the repository settings.
3. Open Pages.
4. Set the source to GitHub Actions.
5. Push to `main`.

The workflow in `.github/workflows/deploy.yml` builds and deploys `dist/`.

## Main Data File

Edit the submitted friend profiles in:

```text
src/data/friends.ts
```

Each friend has:

- Display name
- Username
- Twitter/X URL
- Profile image
- Friendship date
- Letter text
- Optional letter image
- Reasons
- Playlist song or songs
- Optional profile notes
- Optional little things note list
- Final message

## Friendship Dates

If you know the exact date:

```ts
friendsSince: "2024-03-12",
```

If you only know the year:

```ts
friendsSince: "2024",
```

Year-only entries show as `Friends since 2024` instead of a live timer.

## Add Letter Text

In each friend object:

```ts
letter: {
  title: "A birthday letter from Oomf 01",
  body: [
    "First paragraph.",
    "Second paragraph."
  ],
  signature: "Oomf 01"
}
```

## Add a Letter Picture

Put the image somewhere in `public/`, for example:

```text
public/images/friends/friend-01/letter.jpg
```

Then add:

```ts
letter: {
  image: "/images/friends/friend-01/letter.jpg",
  imageAlt: "Handwritten letter from Oomf 01"
}
```

If no image is added, the Letters page only shows the text version and a small note that the picture version is not added yet.

## Add Songs

Each person has one or more songs:

```ts
playlistSongs: [
  {
    title: "Song title",
    artist: "Artist",
    reason: "Why this song reminds me of Blue",
    spotifyUrl: "https://open.spotify.com/...",
    youtubeUrl: "https://youtube.com/..."
  }
]
```

The Playlist page shows all submitted songs in one illustrated player.

## BTS and SUGA Photos

BTS/SUGA photos live in:

```text
public/bts-pics/
```

Configure them in:

```text
src/data/btsPictures.ts
```

Only list real files that exist. The site uses selected BTS/SUGA photos as small decorations across pages, not as a separate BTS or SUGA room.

Do not upload images, lyrics, music files, concert footage, screenshots, or private content unless you have permission to use them.

## Final Messages

Final messages come from:

```text
src/data/secretMessages.ts
```

They are generated from each friend's `secretMessage` in `src/data/friends.ts`.

## Change the Birthday Date

Edit:

```text
src/data/siteConfig.ts
```

Use:

```ts
birthdayMonth: 7,
birthdayDay: 20,
```

## Privacy

Public GitHub repositories can be viewed by anyone. Review all usernames, profile pictures, letters, song links, screenshots, and final messages before publishing.

Get consent from everyone whose contribution is included. Crop or blur anything private.
