import { Button } from "@/components/ui/Button";
import { GlyphChip } from "@/components/ui/GlyphChip";
import type { Tool } from "@/lib/data/types";

interface CompletionScreenProps {
  tool: Tool;
  onRestart: () => void;
}

export function CompletionScreen({ tool, onRestart }: CompletionScreenProps) {
  return (
    <div className="complete-card">
      <div className="complete-icon">
        <GlyphChip label="DONE" size="lg" tone="green" />
      </div>
      <h2 data-testid="done-title">You&apos;re set up with {tool.name}</h2>
      <p id="done-sub">You&apos;ve completed the setup guide. Here&apos;s what to focus on next.</p>
      <div className="next-steps" id="done-nextsteps">
        <h4>What to do next</h4>
        {tool.nextSteps.map((text, i) => (
          <div className="ns-item" key={`${tool.id}-next-${i}`}>
            <div className="ns-num">{i + 1}</div>
            <span>{text}</span>
          </div>
        ))}
      </div>
      <div className="btn-row center">
        <Button data-testid="done-restart" onClick={onRestart} type="button">
          {"Start a new guide \u2192"}
        </Button>
        <Button onClick={() => window.print()} type="button" variant="secondary">
          Save / Print
        </Button>
      </div>
    </div>
  );
}
