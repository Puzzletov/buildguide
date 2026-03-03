"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

import { StepChecklist } from "@/components/guide/StepChecklist";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import type { Tool } from "@/lib/data/types";
import { repairText } from "@/lib/utils/text";

interface StepGuideProps {
  tool: Tool;
  stepIndex: number;
  onNext: () => void;
  onPrev: () => void;
}

const DEBUG_CHECKLIST = [
  "Reproduce the issue in the smallest possible case.",
  "Check logs, browser console, and network errors first.",
  "Validate inputs/config values (env vars, keys, URLs, versions).",
  "Change one variable at a time and re-test.",
  "After fixing, confirm with the same reproduction steps.",
];

export function StepGuide({ tool, stepIndex, onNext, onPrev }: StepGuideProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [showHelper, setShowHelper] = useState(false);
  const step = tool.steps[stepIndex];
  const isLast = stepIndex === tool.steps.length - 1;
  const checklistStorageKey = useMemo(() => `buildguide-checklist-${tool.id}-${stepIndex}`, [stepIndex, tool.id]);

  const promptTemplate = useMemo(
    () =>
      `You are a technical assistant helping me complete a setup step.\nTool: ${tool.name}\nCurrent step: ${repairText(
        step.title,
      )}\n\nContext:\n- My goal: [describe your goal]\n- What I already tried: [paste attempts]\n- Error/log output: [paste exact output]\n\nPlease respond with:\n1) likely root causes (ordered)\n2) exact next actions\n3) copy-paste commands/code\n4) how to verify success`,
    [step.title, tool.name],
  );

  const stepBodyHtml = useMemo(
    () => repairText(step.body).replace(/\s*onclick=["']copyCode\(this\)["']/g, ""),
    [step.body],
  );

  useEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }

    const onClick = async (event: Event) => {
      const target = event.target as HTMLElement | null;
      if (!target || !target.classList.contains("copy-btn")) {
        return;
      }

      const block = target.closest(".code-block");
      if (!block) {
        return;
      }

      const text = block.textContent?.replace("Copy", "").replace("Copied!", "").trim();
      if (!text) {
        return;
      }

      try {
        await navigator.clipboard.writeText(text);
        target.textContent = "Copied!";
      } catch {
        target.textContent = "Copy failed";
      }

      setTimeout(() => {
        target.textContent = "Copy";
      }, 2000);
    };

    root.addEventListener("click", onClick);
    return () => root.removeEventListener("click", onClick);
  }, []);

  return (
    <div className="step-flow-shell" ref={rootRef}>
      <div className="step-badge badge-green" id="steps-badge">
        Step {stepIndex + 1} of {tool.steps.length}
      </div>
      <div className="screen-title" id="steps-title">
        {repairText(step.title)}
      </div>
      <div className="screen-sub" id="steps-sub">
        {tool.name} - {tool.tagline}
      </div>

      <ProgressBar currentIndex={stepIndex} total={tool.steps.length} />

      <div className="step-guide-card">
        <div className="step-number" id="steps-num">
          {stepIndex + 1}
        </div>
        <div id="steps-content">
          <h2>Your next action</h2>
          <div dangerouslySetInnerHTML={{ __html: stepBodyHtml }} />
        </div>
      </div>

      <StepChecklist
        key={checklistStorageKey}
        stepBodyHtml={stepBodyHtml}
        stepTitle={repairText(step.title)}
        storageKey={checklistStorageKey}
      />

      {showHelper ? (
        <div className="helper-grid">
          <div className="debug-panel" data-testid="debug-panel">
            <h3>Stuck? Try this quick debug flow</h3>
            <ol>
              {DEBUG_CHECKLIST.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </div>

          <div className="prompt-panel" data-testid="prompt-panel">
            <h3>Ask AI with this prompt</h3>
            <p>Paste this template and fill in your exact context.</p>
            <div className="code-block">
              <button className="copy-btn" type="button">
                Copy
              </button>
              {promptTemplate}
            </div>
            <p>
              Need prompt fundamentals?{" "}
              <Link className="ext-link" href="/guide/prompting">
                Open the prompt engineering guide
              </Link>
              .
            </p>
          </div>
        </div>
      ) : null}

      <div className="btn-row">
        {stepIndex > 0 ? (
          <Button data-testid="steps-prev-btn" onClick={onPrev} type="button" variant="secondary">
            {"\u2190 Previous step"}
          </Button>
        ) : null}
        <Button data-testid="steps-next-btn" onClick={onNext} type="button">
          {isLast ? "I have completed this setup" : `I\'ve done this - step ${stepIndex + 2} of ${tool.steps.length} \u2192`}
        </Button>
        <Button onClick={() => setShowHelper((prev) => !prev)} type="button" variant="ghost">
          {showHelper ? "Hide help" : "I am stuck - show help"}
        </Button>
      </div>
    </div>
  );
}
