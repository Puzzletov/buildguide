import { RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import type { Tool } from "@/lib/data/types";

interface CompletionScreenProps {
  tool: Tool;
  onRestart: () => void;
}

export function CompletionScreen({ tool, onRestart }: CompletionScreenProps) {
  return (
    <section className="completion-shell">
      <div className="completion-confetti" aria-hidden>
        {Array.from({ length: 22 }, (_, index) => (
          <span key={`confetti-${index}`} />
        ))}
      </div>

      <article className="complete-card">
        <div className="complete-icon" aria-hidden>
          <Icon name={tool.icon} size={28} />
        </div>
        <p className="complete-kicker">You&apos;re set up with</p>
        <h2 data-testid="done-title">{tool.name}</h2>

        <div className="complete-divider" />

        <div className="next-steps" id="done-nextsteps">
          <h4>Next actions</h4>
          {tool.nextSteps.map((text, i) => (
            <div className="ns-item" key={`${tool.id}-next-${i}`}>
              <div className="ns-num">{String(i + 1).padStart(2, "0")}</div>
              <span>{text}</span>
            </div>
          ))}
        </div>

        <div className="btn-row center">
          <Button data-testid="done-restart" onClick={onRestart} type="button">
            <RotateCcw size={14} />
            <span>Start a new guide</span>
          </Button>
          <Button onClick={() => window.print()} type="button" variant="secondary">
            Save / Print
          </Button>
        </div>
      </article>
    </section>
  );
}
