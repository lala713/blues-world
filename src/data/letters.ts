import { friends } from "./friends";

export interface Letter {
  id: string;
  number: number;
  sender: string;
  username: string;
  title?: string;
  date?: string;
  body: string[];
  signature?: string;
  friendPhoto?: string;
  image?: string;
  imageAlt?: string;
  chosenFlower?: string;
  chosenSong?: string;
  highlightedSentence?: string;
  decoration?: "sunflower" | "lily" | "moon" | "cat" | "music";
  friendId: string;
}

const decorations: Letter["decoration"][] = ["sunflower", "lily", "moon", "cat", "music"];

export const letters: Letter[] = friends.map((friend, index) => ({
  id: `${friend.id}-letter`,
  number: index + 1,
  sender: friend.displayName,
  username: friend.username,
  title: friend.letter.title,
  date: friend.friendsSince,
  body: friend.letter.body,
  signature: friend.letter.signature,
  friendPhoto: friend.profileImage,
  image: friend.letter.image,
  imageAlt: friend.letter.imageAlt,
  chosenFlower: friend.chosenFlower,
  chosenSong: friend.playlistSongs[0]?.title || "",
  highlightedSentence: friend.reasons.admire,
  decoration: decorations[index % decorations.length],
  friendId: friend.id
})).filter((letter) => Boolean(letter.image?.trim()) || letter.body.some((paragraph) => paragraph.trim()));

// Edit letters through each friend object in src/data/friends.ts.
// Set friend.letter.image to a real file path when you have a picture version.
