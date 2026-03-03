import { Button } from "@/components/ui/Button";
import type { Tool } from "@/lib/data/types";
import { ToolCard } from "./ToolCard";

interface ToolCarouselProps {
  tools: Tool[];
  index: number;
  onChoose: () => void;
  onSkip: () => void;
  onPrev: () => void;
  onSummary: () => void;
}

export function ToolCarousel({ tools, index, onChoose, onSkip, onPrev, onSummary }: ToolCarouselProps) {
  const tool = tools[index];

  if (!tool) {
    return null;
  }

  return (
    <>
      <div className="carousel-meta">
        <div className="step-badge badge-blue" id="car-badge" style={{ marginBottom: 0 }}>
          Option {index + 1} of {tools.length}
        </div>
        <div className="carousel-pos">
          Option <strong id="car-pos">{index + 1}</strong> of <strong id="car-total">{tools.length}</strong>
        </div>
      </div>

      <ToolCard tool={tool} />

      <div className="carousel-nav">
        <Button data-testid="car-choose" onClick={onChoose} type="button">
          {`Choose this one \u2192`}
        </Button>
        <Button data-testid="car-skip" onClick={onSkip} type="button" variant="secondary">
          {index < tools.length - 1 ? "Skip - show me another option \u2192" : "Skip - see all options \u2192"}
        </Button>
        {index > 0 ? (
          <Button data-testid="car-prev" onClick={onPrev} type="button" variant="ghost">
            {"\u2190 Previous option"}
          </Button>
        ) : null}
      </div>

      <div style={{ marginTop: 16 }}>
        <Button data-testid="car-summary" onClick={onSummary} type="button" variant="ghost">
          See all options at once
        </Button>
      </div>
    </>
  );
}
