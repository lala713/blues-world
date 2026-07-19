import { useState } from "react";
import { useAudioPlayer } from "../../contexts/AudioPlayerContext";
import { useSiteProgress } from "../../contexts/SiteProgressContext";
import { siteConfig } from "../../data/siteConfig";
import { useInterval } from "../../hooks/useInterval";
import { formatClock } from "../../utils/time";
import { PixelButton } from "../ui/PixelButton";

export const BottomBar = () => {
  const [now, setNow] = useState(new Date());
  const {
    isPlaying,
    musicMuted,
    interfaceSoundsEnabled,
    toggleMusicMute,
    toggleInterfaceSounds,
    currentTrack
  } = useAudioPlayer();
  const { dayMode, toggleDayMode, flowerCount, starCount, flowerCoins } = useSiteProgress();

  useInterval(() => setNow(new Date()), 1000);
  const midnight = now.getHours() === 0 && now.getMinutes() === 0;

  return (
    <footer className="bottom-bar">
      <span>{siteConfig.footerText.left}</span>
      <strong>{midnight ? "A new day exists, and we are still grateful you are here." : siteConfig.footerText.center}</strong>
      <div className="bottom-bar__right">
        <time dateTime={now.toISOString()}>{formatClock(now)}</time>
        <PixelButton
          icon={musicMuted ? "mute" : "sound"}
          variant="quiet"
          aria-label={musicMuted ? "Unmute music" : "Mute music"}
          onClick={toggleMusicMute}
        />
        <PixelButton
          icon={interfaceSoundsEnabled ? "sparkle" : "volume"}
          variant="quiet"
          aria-label={interfaceSoundsEnabled ? "Disable interface sounds" : "Enable interface sounds"}
          onClick={toggleInterfaceSounds}
        />
        <PixelButton
          icon={dayMode === "day" ? "moon" : "sunflower"}
          variant="quiet"
          aria-label={dayMode === "day" ? "Switch to night mode" : "Switch to day mode"}
          onClick={toggleDayMode}
        />
        <span className="bottom-bar__count">flowers {flowerCount}</span>
        <span className="bottom-bar__count">stars {starCount}/7</span>
        <span className="bottom-bar__count">coins {flowerCoins}</span>
        <span className="bottom-bar__music" aria-label={`Now playing indicator: ${currentTrack.title}`}>
          <span className={isPlaying && !musicMuted ? "music-bars music-bars--active" : "music-bars"}>
            <i />
            <i />
            <i />
          </span>
        </span>
      </div>
    </footer>
  );
};
