import type { ReactNode } from "react";

type SectionHeaderProps = {
  label: string;
  children: ReactNode;
  compact?: boolean;
};

export function SectionHeader({ label, children, compact = false }: SectionHeaderProps) {
  return (
    <div className={`section-head${compact ? " section-head-compact" : ""}`}>
      <span className="label">{label}</span>
      <h2>{children}</h2>
    </div>
  );
}
