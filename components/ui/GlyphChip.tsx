import type { GlyphTone } from "@/lib/design/glyphs";

interface GlyphChipProps {
  label: string;
  tone: GlyphTone;
  size?: "sm" | "md" | "lg";
}

export function GlyphChip({ label, tone, size = "md" }: GlyphChipProps) {
  return <span className={`glyph-chip glyph-${tone} glyph-${size}`}>{label}</span>;
}
