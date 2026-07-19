import { useState } from "react";
import { useAudioPlayer } from "../../contexts/AudioPlayerContext";
import { cx } from "../../utils/classNames";

interface SleepingCatProps {
  className?: string;
}

export const SleepingCat = ({ className }: SleepingCatProps) => {
  const [purring, setPurring] = useState(false);
  const { playInterfaceSound } = useAudioPlayer();

  const wakeSoftly = () => {
    setPurring(true);
    playInterfaceSound("sparkle");
    window.setTimeout(() => setPurring(false), 1800);
  };

  return (
    <button className={cx("sleeping-cat", purring && "sleeping-cat--purring", className)} onClick={wakeSoftly} aria-label="Pet the sleeping cat">
      <span className="sleeping-cat__body" />
      <span className="sleeping-cat__head">
        <span className="sleeping-cat__ear sleeping-cat__ear--left" />
        <span className="sleeping-cat__ear sleeping-cat__ear--right" />
        <span className="sleeping-cat__eye sleeping-cat__eye--left" />
        <span className="sleeping-cat__eye sleeping-cat__eye--right" />
        <span className="sleeping-cat__nose" />
      </span>
      <span className="sleeping-cat__tail" />
      <span className="sleeping-cat__zzz sleeping-cat__zzz--one">Z</span>
      <span className="sleeping-cat__zzz sleeping-cat__zzz--two">z</span>
      <span className="sleeping-cat__zzz sleeping-cat__zzz--three">z</span>
      {purring ? <span className="sleeping-cat__heart" aria-hidden="true" /> : null}
    </button>
  );
};
