"use client";

import { useEffect } from "react";

import type { Tool } from "@/lib/data/types";
import { ToolCard } from "./ToolCard";

interface ToolCarouselProps {
  tools: Tool[];
  index: number;
  onChoose: () => void;
  onSkip: () => void;
  onPrev: () => void;
  onSummary: () => void;
  onJumpTo: (index: number) => void;
}

export function ToolCarousel({ tools, index, onChoose, onSkip, onPrev, onSummary, onJumpTo }: ToolCarouselProps) {
  const tool = tools[index];

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        onSkip();
      }
      if (event.key === "ArrowLeft" && index > 0) {
        event.preventDefault();
        onPrev();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [index, onPrev, onSkip]);

  if (!tool) {
    return null;
  }

  return (
    <section className="carousel-shell">
      <div className="carousel-head">
        <div className="carousel-count">Option {index + 1} of {tools.length}</div>
        <button className="carousel-summary-link" data-testid="car-summary" onClick={onSummary} type="button">
          See all options
        </button>
      </div>

      <div aria-label="Tool options" className="carousel-dot-track" role="tablist">
        {tools.map((option, dotIndex) => {
          const active = dotIndex === index;
          return (
            <button
              aria-label={`Jump to option ${dotIndex + 1}: ${option.name}`}
              className={`carousel-dot ${active ? "active" : ""}`}
              key={option.id}
              onClick={() => onJumpTo(dotIndex)}
              role="tab"
              type="button"
            />
          );
        })}
      </div>

      <ToolCard
        canGoPrev={index > 0}
        canSkipToAnother={index < tools.length - 1}
        onChoose={onChoose}
        onPrev={onPrev}
        onSkip={onSkip}
        tool={tool}
      />
    </section>
  );
}

