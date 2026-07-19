import { friends } from "./friends";

export interface Reason {
  id: string;
  friendId: string;
  friendName: string;
  username: string;
  profileImage?: string;
  profileIcon: "sunflower" | "lily" | "moon" | "cat" | "music" | "star";
  admire?: string;
  funnyThing?: string;
  favoriteMemory?: string;
  wishForThisYear?: string;
  helpedThrough?: string;
  unforgettableMemory?: string;
  futureHope?: string;
  remindsMe?: string;
  wish?: string;
  matchingSong: string;
  chosenFlower: string;
  color: "blue" | "cream" | "sage" | "pink" | "gold" | "lavender";
}

const icons: Reason["profileIcon"][] = ["sunflower", "lily", "moon", "cat", "music", "star"];
const colors: Reason["color"][] = ["blue", "cream", "sage", "pink", "gold", "lavender"];

export const reasons: Reason[] = friends
  .filter((friend) =>
    Boolean(
      friend.reasons.admire?.trim() ||
        friend.reasons.funnyThing?.trim() ||
        friend.reasons.favoriteMemory?.trim() ||
        friend.reasons.wishForThisYear?.trim()
    )
  )
  .map((friend, index) => ({
    id: `${friend.id}-reason`,
    friendId: friend.id,
    friendName: friend.displayName,
    username: friend.username,
    profileImage: friend.profileImage,
    profileIcon: icons[index % icons.length],
    admire: friend.reasons.admire,
    funnyThing: friend.reasons.funnyThing,
    favoriteMemory: friend.reasons.favoriteMemory,
    wishForThisYear: friend.reasons.wishForThisYear,
    helpedThrough: friend.reasons.favoriteMemory,
    unforgettableMemory: friend.reasons.favoriteMemory,
    futureHope: friend.reasons.wishForThisYear,
    remindsMe: friend.reasons.admire,
    wish: friend.reasons.wishForThisYear,
    matchingSong: friend.playlistSongs[0]?.title || "",
    chosenFlower: friend.chosenFlower || "Sunflower",
    color: colors[index % colors.length]
  }));

// Edit reasons through each friend object in src/data/friends.ts.
