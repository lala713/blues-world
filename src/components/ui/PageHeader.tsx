import { ReactNode } from "react";
import { IconKind, IllustratedIcon } from "./IllustratedIcon";
import { BackButton } from "./BackButton";

interface PageHeaderProps {
  title: string;
  eyebrow?: string;
  description?: string;
  icon?: IconKind;
  actions?: ReactNode;
}

export const PageHeader = ({ title, eyebrow, description, icon, actions }: PageHeaderProps) => (
  <header className="page-header">
    <BackButton />
    <div className="page-header__text">
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h1>
        {icon ? <IllustratedIcon kind={icon} /> : null}
        <span>{title}</span>
      </h1>
      {description ? <p>{description}</p> : null}
    </div>
    {actions ? <div className="page-header__actions">{actions}</div> : null}
  </header>
);
