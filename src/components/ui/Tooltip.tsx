import { ReactNode } from "react";

interface TooltipProps {
  label: string;
  children: ReactNode;
}

export const Tooltip = ({ label, children }: TooltipProps) => (
  <span className="tooltip" data-tooltip={label}>
    {children}
  </span>
);
