import * as LucideIcons from "lucide-react";
import type { LucideProps } from "lucide-react";
import type { ComponentType } from "react";

interface IconProps extends LucideProps {
  name: string;
}

export function Icon({ name, size = 18, strokeWidth = 1.75, ...props }: IconProps) {
  const Component = (LucideIcons as unknown as Record<string, ComponentType<LucideProps>>)[name];

  if (!Component) {
    return null;
  }

  return <Component size={size} strokeWidth={strokeWidth} {...props} />;
}
