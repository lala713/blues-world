import { ImgHTMLAttributes, useState } from "react";
import { cx } from "../../utils/classNames";

interface ImageWithFallbackProps extends ImgHTMLAttributes<HTMLImageElement> {
  label: string;
  variant?: "cover" | "portrait" | "wide" | "square";
}

export const ImageWithFallback = ({
  label,
  variant = "cover",
  className,
  alt,
  src,
  ...props
}: ImageWithFallbackProps) => {
  const [failed, setFailed] = useState(!src);

  if (failed) {
    return (
      <div className={cx("image-fallback", `image-fallback--${variant}`, className)} role="img" aria-label={alt || label}>
        <span className="image-fallback__sparkle" aria-hidden="true" />
        <span>{label}</span>
      </div>
    );
  }

  return (
    <img
      className={cx("image-real", `image-real--${variant}`, className)}
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      {...props}
    />
  );
};
