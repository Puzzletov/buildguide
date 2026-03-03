import type { ReactNode } from "react";

interface TipBoxProps {
  icon?: string;
  className?: string;
  children: ReactNode;
}

export function TipBox({ icon = "TIP", className = "tip-box", children }: TipBoxProps) {
  return (
    <div className={className}>
      <span>{icon}</span>
      <span>{children}</span>
    </div>
  );
}
