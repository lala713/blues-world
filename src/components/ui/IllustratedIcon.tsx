import { cx } from "../../utils/classNames";

export type IconKind =
  | "sunflower"
  | "lily"
  | "envelope"
  | "folder"
  | "note"
  | "cassette"
  | "camera"
  | "friends"
  | "lock"
  | "cat"
  | "moon"
  | "music"
  | "star"
  | "heart"
  | "bee"
  | "book"
  | "photo"
  | "piano"
  | "sparkle"
  | "arrow-left"
  | "sound"
  | "mute"
  | "play"
  | "pause"
  | "next"
  | "previous"
  | "shuffle"
  | "repeat"
  | "volume"
  | "minimize"
  | "maximize"
  | "close";

interface IllustratedIconProps {
  kind: IconKind;
  className?: string;
  label?: string;
}

export const IllustratedIcon = ({ kind, className, label }: IllustratedIconProps) => (
  <span
    className={cx("art-icon", `art-icon--${kind}`, className)}
    aria-label={label}
    aria-hidden={label ? undefined : true}
    role={label ? "img" : undefined}
  >
    <span className="art-icon__mark" />
  </span>
);
