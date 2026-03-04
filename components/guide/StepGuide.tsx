"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { Check, ChevronDown, ChevronUp, LifeBuoy } from "lucide-react";

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
  onJump: (index: number) => void;
}

const DEBUG_CHECKLIST = [
  "Reproduce the issue in the smallest possible case.",
  "Check logs, browser console, and network errors first.",
  "Validate inputs and config values (env vars, keys, URLs, versions).",
  "Change one variable at a time and retest.",
  "After fixing, confirm with the same reproduction steps.",
];

function sectionHeaderFor(tool: Tool, index: number): { id: string; label: string } | null {
  const current = tool.steps[index];
  if (!current?.sectionId || !current.sectionLabel) {
    return null;
  }

  const previous = tool.steps[index - 1];
  if (previous?.sectionId === current.sectionId) {
    return null;
  }

  return { id: current.sectionId, label: current.sectionLabel };
}

export function StepGuide({ tool, stepIndex, onNext, onPrev, onJump }: StepGuideProps) {
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

  const progress = ((stepIndex + 1) / tool.steps.length) * 100;

  return (
    <div className="step-guide-shell" ref={rootRef}>
      <aside className="step-sidebar" aria-label="Step navigation">
        <div className="step-sidebar-head">
          <div>Setup guide</div>
          <span>
            {stepIndex + 1}/{tool.steps.length}
          </span>
        </div>

        <div className="step-sidebar-list" role="list">
          {tool.steps.map((item, index) => {
            const stateClass = index === stepIndex ? "active" : index < stepIndex ? "done" : "";
            const sectionHeader = sectionHeaderFor(tool, index);

            return (
              <div key={`${tool.id}-step-wrap-${index}`}>
                {sectionHeader ? (
                  <div className="step-section-header">
                    <span>{sectionHeader.id}</span>
                    <p>{sectionHeader.label}</p>
                  </div>
                ) : null}

                <button
                  aria-current={index === stepIndex ? "step" : undefined}
                  className={`sidebar-step ${stateClass}`}
                  key={`${tool.id}-step-nav-${index}`}
                  onClick={() => onJump(index)}
                  type="button"
                >
                  <span className="step-num">
                    {index < stepIndex ? <Check size={13} /> : String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="step-text">{repairText(item.title)}</span>
                </button>
              </div>
            );
          })}
        </div>
      </aside>

      <section className="step-main">
        <div className="step-main-progress" aria-hidden>
          <span style={{ width: `${progress}%` }} />
        </div>

        <div className="step-main-head">
          <div className="step-main-kicker">{tool.name}</div>
          <h2>{repairText(step.title)}</h2>
          <p>{tool.tagline}</p>
        </div>

        <div className="step-mobile-progress">
          <ProgressBar currentIndex={stepIndex} total={tool.steps.length} />
        </div>

        <article className="step-guide-card" id="steps-content">
          <div dangerouslySetInnerHTML={{ __html: stepBodyHtml }} />
        </article>

        <StepChecklist
          key={checklistStorageKey}
          stepBodyHtml={stepBodyHtml}
          stepTitle={repairText(step.title)}
          storageKey={checklistStorageKey}
        />

        {showHelper ? (
          <div className="helper-grid">
            <section className="debug-panel" data-testid="debug-panel">
              <h3>Debug flow</h3>
              <ol>
                {DEBUG_CHECKLIST.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </section>

            <section className="prompt-panel" data-testid="prompt-panel">
              <h3>Prompt template</h3>
              <p>Paste this into your AI tool and fill in the exact error context.</p>
              <div className="code-block" data-lang="text">
                <button className="copy-btn" type="button">
                  Copy
                </button>
                {promptTemplate}
              </div>
              <p>
                Need prompting fundamentals?{" "}
                <Link className="ext-link" href="/guide/prompting">
                  Open the prompt engineering guide
                </Link>
                .
              </p>
            </section>
          </div>
        ) : null}

        <div className="step-actions">
          {stepIndex > 0 ? (
            <Button data-testid="steps-prev-btn" onClick={onPrev} type="button" variant="secondary">
              ← Previous step
            </Button>
          ) : null}

          <div className="step-counter">
            Step {stepIndex + 1} of {tool.steps.length}
          </div>

          <Button data-testid="steps-next-btn" onClick={onNext} type="button">
            {isLast ? "I have completed this setup" : "I've done this →"}
          </Button>
        </div>

        <div className="step-help-row">
          <Button onClick={() => setShowHelper((prev) => !prev)} type="button" variant="ghost">
            <LifeBuoy size={14} />
            <span>{showHelper ? "Hide support" : "Need help with this step?"}</span>
            {showHelper ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </Button>
        </div>
      </section>
    </div>
  );
}
