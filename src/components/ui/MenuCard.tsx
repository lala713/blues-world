import { Link } from "react-router-dom";
import { cx } from "../../utils/classNames";
import { IconKind, IllustratedIcon } from "./IllustratedIcon";

interface MenuCardProps {
  to: string;
  icon: IconKind;
  title: string;
  description: string;
  wide?: boolean;
  badge?: string;
}

export const MenuCard = ({ to, icon, title, description, wide, badge }: MenuCardProps) => (
  <Link className={cx("menu-card", wide && "menu-card--wide")} to={to}>
    <span className="menu-card__sparkle" aria-hidden="true" />
    <IllustratedIcon kind={icon} className="menu-card__icon" />
    <span className="menu-card__body">
      <strong>{title}</strong>
      <span>{description}</span>
    </span>
    {badge ? <span className="menu-card__badge">{badge}</span> : null}
  </Link>
);
