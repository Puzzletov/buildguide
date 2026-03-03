import clsx from "clsx";
import type { HTMLAttributes, ReactNode } from "react";

interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
}

export function Badge({ className, children, ...props }: BadgeProps) {
  return (
    <div className={clsx("step-badge", className)} {...props}>
      {children}
    </div>
  );
}


