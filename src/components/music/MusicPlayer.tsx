import { siteConfig } from "../../data/siteConfig";
import { useAudioPlayer } from "../../contexts/AudioPlayerContext";
import { formatAudioTime } from "../../utils/time";
import { ImageWithFallback } from "../ui/ImageWithFallback";
import { PixelButton } from "../ui/PixelButton";

export const MusicPlayer = () => {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    musicMuted,
    repeat,
    shuffle,
    playbackMessage,
    togglePlay,
    next,
    previous,
    seek,
    setVolume,
    toggleMusicMute,
    toggleRepeat,
    toggleShuffle
  } = useAudioPlayer();

  return (
    <section className="music-player" aria-label="Music player">
      <div className="music-player__cover">
        <ImageWithFallback src={currentTrack.coverImage} alt={`${currentTrack.title} cover`} label={currentTrack.title} variant="square" />
        <span className={isPlaying && !musicMuted ? "visualizer visualizer--active" : "visualizer"} aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </span>
      </div>
      <div className="music-player__body">
        <p className="eyebrow">Now playing</p>
        <h2>{currentTrack.title}</h2>
        <p>{currentTrack.artist}</p>
        <p className="music-player__note">{currentTrack.note}</p>
        {playbackMessage ? <p className="friendly-warning" role="status">{playbackMessage}</p> : null}
        <label className="progress-control">
          <span className="sr-only">Seek through current song</span>
          <input
            type="range"
            min={0}
            max={duration || 0}
            value={Math.min(currentTime, duration || currentTime)}
            onChange={(event) => seek(Number(event.target.value))}
          />
        </label>
        <div className="music-player__time">
          <span>{formatAudioTime(currentTime)}</span>
          <span>{formatAudioTime(duration)}</span>
        </div>
        <div className="music-player__controls">
          <PixelButton icon="shuffle" variant={shuffle ? "primary" : "quiet"} aria-pressed={shuffle} onClick={toggleShuffle} />
          <PixelButton icon="previous" variant="secondary" onClick={previous}>Prev</PixelButton>
          <PixelButton icon={isPlaying ? "pause" : "play"} variant="primary" onClick={togglePlay}>
            {isPlaying ? "Pause" : "Play"}
          </PixelButton>
          <PixelButton icon="next" variant="secondary" onClick={next}>Next</PixelButton>
          <PixelButton icon="repeat" variant={repeat ? "primary" : "quiet"} aria-pressed={repeat} onClick={toggleRepeat} />
        </div>
        <div className="volume-row">
          <PixelButton icon={musicMuted ? "mute" : "sound"} variant="quiet" onClick={toggleMusicMute}>
            {musicMuted ? "Muted" : "Sound"}
          </PixelButton>
          <label>
            <span>Volume</span>
            <input type="range" min={0} max={1} step={0.01} value={volume} onChange={(event) => setVolume(Number(event.target.value))} />
          </label>
        </div>
        <a className="pixel-link-button" href={siteConfig.playlistUrl} target="_blank" rel="noopener noreferrer">
          Open Full Playlist
        </a>
      </div>
    </section>
  );
};
