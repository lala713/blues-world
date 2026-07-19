import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import { PlaylistTrack, playlistTracks } from "../data/playlist";
import { siteConfig } from "../data/siteConfig";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface AudioPlayerContextValue {
  tracks: PlaylistTrack[];
  currentTrack: PlaylistTrack;
  currentIndex: number;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  musicMuted: boolean;
  interfaceSoundsEnabled: boolean;
  repeat: boolean;
  shuffle: boolean;
  playbackMessage: string;
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  playTrack: (index: number) => void;
  next: () => void;
  previous: () => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
  toggleMusicMute: () => void;
  toggleInterfaceSounds: () => void;
  toggleRepeat: () => void;
  toggleShuffle: () => void;
  playInterfaceSound: (kind?: "click" | "open" | "unlock" | "sparkle") => void;
}

const AudioPlayerContext = createContext<AudioPlayerContextValue | null>(null);

const soundMap = {
  click: "/audio/ui-click.wav",
  open: "/audio/ui-open.wav",
  unlock: "/audio/secret-unlock.wav",
  sparkle: "/audio/sparkle-discovery.wav"
};

export const AudioPlayerProvider = ({ children }: PropsWithChildren) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const pendingPlayRef = useRef(false);
  const [currentIndex, setCurrentIndex] = useLocalStorage("blues-world-track-index", 0);
  const [volume, setStoredVolume] = useLocalStorage("blues-world-volume", siteConfig.soundDefaults.musicVolume);
  const [musicMuted, setMusicMuted] = useLocalStorage("blues-world-music-muted", siteConfig.soundDefaults.musicMuted);
  const [interfaceSoundsEnabled, setInterfaceSoundsEnabled] = useLocalStorage(
    "blues-world-interface-sounds",
    siteConfig.soundDefaults.interfaceSounds
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [playbackMessage, setPlaybackMessage] = useState("");

  const safeIndex = Math.min(Math.max(currentIndex, 0), playlistTracks.length - 1);
  const currentTrack = playlistTracks[safeIndex];

  const play = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    setPlaybackMessage("");
    const attempt = audio.play();
    if (attempt) {
      attempt
        .then(() => setIsPlaying(true))
        .catch(() => {
          setIsPlaying(false);
          setPlaybackMessage(
            `Audio is not available yet. Add ${currentTrack.localAudio} or replace the path in src/data/playlist.ts.`
          );
        });
    }
  }, [currentTrack.localAudio]);

  const pause = useCallback(() => {
    audioRef.current?.pause();
    setIsPlaying(false);
  }, []);

  const playTrack = useCallback(
    (index: number) => {
      const bounded = Math.min(Math.max(index, 0), playlistTracks.length - 1);
      if (bounded === safeIndex) {
        play();
        return;
      }
      pendingPlayRef.current = true;
      setCurrentIndex(bounded);
    },
    [play, safeIndex, setCurrentIndex]
  );

  const next = useCallback(() => {
    pendingPlayRef.current = isPlaying;
    setCurrentIndex((current) => {
      if (shuffle && playlistTracks.length > 1) {
        const nextRandom = Math.floor(Math.random() * playlistTracks.length);
        return nextRandom === current ? (nextRandom + 1) % playlistTracks.length : nextRandom;
      }
      return (current + 1) % playlistTracks.length;
    });
  }, [isPlaying, setCurrentIndex, shuffle]);

  const previous = useCallback(() => {
    pendingPlayRef.current = isPlaying;
    setCurrentIndex((current) => (current - 1 + playlistTracks.length) % playlistTracks.length);
  }, [isPlaying, setCurrentIndex]);

  useEffect(() => {
    const audio = new Audio();
    audio.preload = "metadata";
    audioRef.current = audio;
    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
    audio.muted = musicMuted;
  }, [musicMuted, volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.src = currentTrack.localAudio;
    audio.load();
    setCurrentTime(0);
    setDuration(0);
    setPlaybackMessage("");
    if (pendingPlayRef.current) {
      pendingPlayRef.current = false;
      window.setTimeout(play, 0);
    }
  }, [currentTrack.localAudio, play]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return undefined;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onDurationChange = () => setDuration(Number.isFinite(audio.duration) ? audio.duration : 0);
    const onError = () => {
      setIsPlaying(false);
      setPlaybackMessage(
        `Audio is not available yet. Add ${currentTrack.localAudio} or replace the path in src/data/playlist.ts.`
      );
    };
    const onEnded = () => {
      if (repeat) {
        audio.currentTime = 0;
        pendingPlayRef.current = true;
        play();
        return;
      }
      pendingPlayRef.current = true;
      setCurrentIndex((current) => {
        if (shuffle && playlistTracks.length > 1) {
          const nextRandom = Math.floor(Math.random() * playlistTracks.length);
          return nextRandom === current ? (nextRandom + 1) % playlistTracks.length : nextRandom;
        }
        return (current + 1) % playlistTracks.length;
      });
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("durationchange", onDurationChange);
    audio.addEventListener("loadedmetadata", onDurationChange);
    audio.addEventListener("error", onError);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("durationchange", onDurationChange);
      audio.removeEventListener("loadedmetadata", onDurationChange);
      audio.removeEventListener("error", onError);
      audio.removeEventListener("ended", onEnded);
    };
  }, [currentTrack.localAudio, play, repeat, setCurrentIndex, shuffle]);

  const value = useMemo<AudioPlayerContextValue>(
    () => ({
      tracks: playlistTracks,
      currentTrack,
      currentIndex: safeIndex,
      isPlaying,
      currentTime,
      duration,
      volume,
      musicMuted,
      interfaceSoundsEnabled,
      repeat,
      shuffle,
      playbackMessage,
      play,
      pause,
      togglePlay: () => (isPlaying ? pause() : play()),
      playTrack,
      next,
      previous,
      seek: (time: number) => {
        const audio = audioRef.current;
        if (!audio) return;
        audio.currentTime = time;
        setCurrentTime(time);
      },
      setVolume: (newVolume: number) => setStoredVolume(Math.min(1, Math.max(0, newVolume))),
      toggleMusicMute: () => setMusicMuted((current) => !current),
      toggleInterfaceSounds: () => setInterfaceSoundsEnabled((current) => !current),
      toggleRepeat: () => setRepeat((current) => !current),
      toggleShuffle: () => setShuffle((current) => !current),
      playInterfaceSound: (kind = "click") => {
        if (!interfaceSoundsEnabled) return;
        const sound = new Audio(soundMap[kind]);
        sound.volume = 0.16;
        void sound.play().catch(() => undefined);
      }
    }),
    [
      currentIndex,
      currentTime,
      currentTrack,
      duration,
      interfaceSoundsEnabled,
      isPlaying,
      musicMuted,
      next,
      pause,
      play,
      playTrack,
      playbackMessage,
      previous,
      repeat,
      safeIndex,
      setInterfaceSoundsEnabled,
      setMusicMuted,
      setStoredVolume,
      shuffle,
      volume
    ]
  );

  return <AudioPlayerContext.Provider value={value}>{children}</AudioPlayerContext.Provider>;
};

export const useAudioPlayer = () => {
  const context = useContext(AudioPlayerContext);
  if (!context) throw new Error("useAudioPlayer must be used inside AudioPlayerProvider");
  return context;
};
