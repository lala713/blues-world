import { useAudioPlayer } from "../../contexts/AudioPlayerContext";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { cx } from "../../utils/classNames";
import { ImageWithFallback } from "../ui/ImageWithFallback";
import { PixelButton } from "../ui/PixelButton";

export const TrackList = () => {
  const { tracks, currentIndex, isPlaying, playTrack, togglePlay } = useAudioPlayer();
  const [favoriteTracks, setFavoriteTracks] = useLocalStorage<string[]>("blues-world-favorite-tracks", []);

  return (
    <div className="track-list" role="list" aria-label="Playlist queue">
      {tracks.map((track, index) => (
        <article className={cx("track-item", index === currentIndex && "track-item--active")} role="listitem" key={track.id}>
          <ImageWithFallback src={track.coverImage} alt={`${track.title} cover`} label={track.title} variant="square" />
          <div className="track-item__body">
            <h3>{track.title}</h3>
            <p>{track.artist}</p>
            <p className="track-item__note">{track.note}</p>
            <span>Added by {track.addedBy}</span>
            <span>{track.category} • {track.flowerAssociation}</span>
          </div>
          <PixelButton
            icon="heart"
            variant={favoriteTracks.includes(track.id) ? "primary" : "quiet"}
            onClick={() =>
              setFavoriteTracks((current) =>
                current.includes(track.id) ? current.filter((id) => id !== track.id) : [...current, track.id]
              )
            }
          />
          <PixelButton
            icon={index === currentIndex && isPlaying ? "pause" : "play"}
            variant={index === currentIndex ? "primary" : "secondary"}
            onClick={() => (index === currentIndex ? togglePlay() : playTrack(index))}
          >
            {index === currentIndex && isPlaying ? "Pause" : "Play"}
          </PixelButton>
        </article>
      ))}
    </div>
  );
};
