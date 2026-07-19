import { HTMLAttributes, ReactNode } from "react";
import { cx } from "../../utils/classNames";

interface PaperCardProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  as?: "article" | "section" | "div";
  tone?: "blue" | "cream" | "sage" | "pink" | "gold" | "lavender";
}

export const PaperCard = ({ children, as: Tag = "article", tone = "cream", className, ...props }: PaperCardProps) => (
  <Tag className={cx("paper-card", `paper-card--${tone}`, className)} {...props}>
    {children}
  </Tag>
);
