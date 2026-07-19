import { friends } from "./friends";

export interface PlaylistTrack {
  id: string;
  friendId: string;
  title: string;
  artist: string;
  addedBy: string;
  username: string;
  note: string;
  reason: string;
  localAudio: string;
  coverImage: string;
  externalLink: string;
  spotifyUrl?: string;
  youtubeUrl?: string;
  albumName?: string;
  duration?: string;
  mood?: string;
  flowerAssociation?: string;
  category?:
    | "Songs for Blue"
    | "BTS Favorites"
    | "SUGA Favorites"
    | "Songs That Feel Like Her"
    | "Late-Night Songs"
    | "Comfort Songs"
    | "Birthday Songs"
    | "Happy Songs"
    | "Emotional Songs"
    | "Songs From Our Memories"
    | "Quiet Piano Songs"
    | "Piano Songs";
  friendPhoto?: string;
}

const categories: NonNullable<PlaylistTrack["category"]>[] = [
  "Songs for Blue",
  "BTS Favorites",
  "SUGA Favorites",
  "Songs That Feel Like Her",
  "Late-Night Songs",
  "Comfort Songs",
  "Birthday Songs",
  "Happy Songs",
  "Emotional Songs",
  "Songs From Our Memories"
];

export const playlistTracks: PlaylistTrack[] = friends.flatMap((friend, friendIndex) =>
  friend.playlistSongs
  .filter((song) => song.title.trim() && song.artist.trim())
  .map((song, songIndex) => {
    const category = categories[(friendIndex + songIndex) % categories.length];
    const externalLink = song.spotifyUrl?.trim() || song.youtubeUrl?.trim() || "";

    return {
      id: `${friend.id}-song-${songIndex + 1}`,
      friendId: friend.id,
      title: song.title,
      artist: song.artist,
      addedBy: friend.displayName,
      username: friend.username,
      note: song.reason?.trim() || "",
      reason: song.reason?.trim() || "",
      localAudio: song.audioPreview?.trim() || "",
      coverImage: song.coverImage?.trim() || "",
      externalLink,
      spotifyUrl: song.spotifyUrl,
      youtubeUrl: song.youtubeUrl,
      albumName: "Blue's World",
      mood: category,
      flowerAssociation: friend.chosenFlower,
      category,
      friendPhoto: friend.profileImage
    };
  })
);

// Add owner-provided previews in public/audio/previews or use Spotify/YouTube links.
