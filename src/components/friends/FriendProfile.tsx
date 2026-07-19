import type { FriendProfile as Friend } from "../../data/friends";
import { ImageWithFallback } from "../ui/ImageWithFallback";
import { PaperCard } from "../ui/PaperCard";
import { FriendshipTimer } from "./FriendshipTimer";

interface FriendProfileProps {
  friend: Friend;
}

const hasText = (value?: string) => Boolean(value?.trim());

export const FriendProfile = ({ friend }: FriendProfileProps) => {
  const letterParagraphs = friend.letter.body.filter(hasText);
  const visibleSongs = friend.playlistSongs.filter((song) => hasText(song.title) && hasText(song.artist));
  const hasReasons = hasText(friend.reasons.admire);
  const profileNotes = [
    ["Met at", friend.metAt],
    ["Chosen flower", friend.chosenFlower],
    ["When we met", friend.friendship?.whenWeMet],
    ["First impression", friend.friendship?.firstImpression],
    ["Now", friend.friendship?.impressionNow]
  ].filter((entry): entry is [string, string] => hasText(entry[1]));

  return (
    <section className="friend-profile">
      <ImageWithFallback src={friend.profileImage} alt={`${friend.displayName} profile`} label={friend.displayName} variant="portrait" />
      <div className="friend-profile__main">
        <p className="eyebrow">Friend profile</p>
        <h1>{friend.displayName}</h1>
        {hasText(friend.username) ? <p className="friend-profile__nickname">{friend.username}</p> : null}
        <FriendshipTimer startDate={friend.friendsSince} />
        {hasText(friend.twitterUrl) ? (
          <a className="text-link" href={friend.twitterUrl} target="_blank" rel="noopener noreferrer">
            Twitter/X profile
          </a>
        ) : null}
        {profileNotes.length ? (
          <div className="profile-context-notes">
            {profileNotes.map(([label, value]) => (
              <p key={label}>
                <strong>{label}:</strong> {value}
              </p>
            ))}
          </div>
        ) : null}
        <div className="friend-profile__notes">
          {letterParagraphs.length ? (
            <PaperCard>
              <h2>Letter</h2>
              <div className="letter-body">
                {letterParagraphs.map((paragraph, index) => <p key={`${index}-${paragraph}`}>{paragraph}</p>)}
              </div>
            </PaperCard>
          ) : null}
          {hasReasons ? (
            <PaperCard tone="blue">
              <h2>Reasons We Love You</h2>
              <p className="preserve-lines">{friend.reasons.admire}</p>
            </PaperCard>
          ) : null}
          {visibleSongs.length ? (
            <PaperCard tone="gold">
              <h2>Playlist</h2>
              <p>{visibleSongs.map((song) => `${song.title} by ${song.artist}`).join(", ")}</p>
            </PaperCard>
          ) : null}
        </div>
        <div className="memory-badges" aria-label="Profile badges">
          <span>first hello</span>
          <span>birthday wish</span>
          <span>final message</span>
        </div>
      </div>
    </section>
  );
};
