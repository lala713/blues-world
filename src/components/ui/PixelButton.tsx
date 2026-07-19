import { ButtonHTMLAttributes, forwardRef, MouseEvent, ReactNode } from "react";
import { useAudioPlayer } from "../../contexts/AudioPlayerContext";
import { cx } from "../../utils/classNames";
import { IconKind, IllustratedIcon } from "./IllustratedIcon";

interface PixelButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: IconKind;
  variant?: "primary" | "secondary" | "quiet" | "danger";
  children?: ReactNode;
}

export const PixelButton = forwardRef<HTMLButtonElement, PixelButtonProps>(function PixelButton(
  { icon, variant = "secondary", className, children, onClick, ...props },
  ref
) {
  const { playInterfaceSound } = useAudioPlayer();

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    playInterfaceSound("click");
    onClick?.(event);
  };

  return (
    <button
      ref={ref}
      className={cx("pixel-button", `pixel-button--${variant}`, className)}
      onClick={handleClick}
      {...props}
    >
      {icon ? <IllustratedIcon kind={icon} /> : null}
      {children ? <span>{children}</span> : null}
    </button>
  );
});
