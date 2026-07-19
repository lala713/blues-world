import { friends } from "./friends";

export interface SecretMessage {
  id: string;
  friendId: string;
  displayName: string;
  username: string;
  profileImage: string;
  message: string;
}

export const secretMessages: SecretMessage[] = friends
  .filter((friend) => Boolean(friend.secretMessage?.trim()))
  .map((friend) => ({
    id: `${friend.id}-secret`,
    friendId: friend.id,
    displayName: friend.displayName,
    username: friend.username,
    profileImage: friend.profileImage,
    message: friend.secretMessage || ""
  }));
