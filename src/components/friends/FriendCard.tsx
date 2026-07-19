import { Link } from "react-router-dom";
import type { FriendProfile as Friend } from "../../data/friends";
import { ImageWithFallback } from "../ui/ImageWithFallback";

interface FriendCardProps {
  friend: Friend;
}

const hasText = (value?: string) => Boolean(value?.trim());

export const FriendCard = ({ friend }: FriendCardProps) => (
  <article className="friend-card">
    <ImageWithFallback src={friend.profileImage} alt={`${friend.displayName} profile`} label={friend.displayName} variant="portrait" />
    <div>
      <p className="eyebrow">{friend.friendsSinceLabel || friend.friendsSince || "Friendship date will be added soon."}</p>
      <h2>{friend.displayName}</h2>
      {hasText(friend.username) ? <p className="friend-card__nickname">{friend.username}</p> : null}
      {hasText(friend.metAt) ? <p>{friend.metAt}</p> : null}
    </div>
    <footer>
      <Link className="pixel-link-button" to={`/oomfs/${friend.id}`}>
        Open profile
      </Link>
    </footer>
  </article>
);
