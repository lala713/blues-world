import { ReactNode } from "react";
import { IconKind, IllustratedIcon } from "./IllustratedIcon";

interface SidebarPanelProps {
  title: string;
  icon?: IconKind;
  children: ReactNode;
}

export const SidebarPanel = ({ title, icon, children }: SidebarPanelProps) => (
  <section className="sidebar-panel">
    <h2>
      {icon ? <IllustratedIcon kind={icon} /> : null}
      <span>{title}</span>
    </h2>
    <div className="sidebar-panel__content">{children}</div>
  </section>
);
