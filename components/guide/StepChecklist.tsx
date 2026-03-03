"use client";

import { useEffect, useMemo, useState } from "react";

import { buildStepChecklist } from "@/lib/utils/stepChecklist";

interface StepChecklistProps {
  stepBodyHtml: string;
  stepTitle: string;
  storageKey: string;
}

export function StepChecklist({ stepBodyHtml, stepTitle, storageKey }: StepChecklistProps) {
  const items = useMemo(() => buildStepChecklist(stepTitle, stepBodyHtml), [stepBodyHtml, stepTitle]);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(() => {
    const defaults = Object.fromEntries(items.map((item) => [item.id, false]));
    if (typeof window === "undefined") {
      return defaults;
    }

    try {
      const raw = localStorage.getItem(storageKey);
      if (!raw) {
        return defaults;
      }
      const parsed = JSON.parse(raw) as Record<string, boolean>;
      return Object.fromEntries(items.map((item) => [item.id, Boolean(parsed[item.id])]));
    } catch {
      return defaults;
    }
  });
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(checkedItems));
    } catch {
      // no-op
    }
  }, [checkedItems, storageKey]);

  const completed = items.filter((item) => checkedItems[item.id]).length;
  const percent = items.length > 0 ? Math.round((completed / items.length) * 100) : 0;

  return (
    <section className="step-checklist" data-testid="step-checklist">
      <div className="step-checklist-head">
        <div>
          <div className="step-checklist-kicker">Step checklist</div>
          <h3>
            {completed}/{items.length} tasks complete
          </h3>
        </div>
        <div className="step-checklist-percent">{percent}%</div>
      </div>

      <div className="step-checklist-progress">
        <div className="step-checklist-progress-fill" style={{ width: `${percent}%` }} />
      </div>

      <div className="step-checklist-items">
        {items.map((item) => {
          const checked = Boolean(checkedItems[item.id]);
          const expanded = expandedId === item.id;

          return (
            <article className={`step-checklist-item ${checked ? "done" : ""}`} key={item.id}>
              <div className="step-checklist-row">
                <label className="step-checklist-label">
                  <input
                    checked={checked}
                    onChange={(event) =>
                      setCheckedItems((prev) => ({
                        ...prev,
                        [item.id]: event.target.checked,
                      }))
                    }
                    type="checkbox"
                  />
                  <span>{item.title}</span>
                </label>
                <button
                  aria-expanded={expanded}
                  className="step-checklist-expand"
                  onClick={() => setExpandedId((prev) => (prev === item.id ? null : item.id))}
                  type="button"
                >
                  {expanded ? "Hide details" : "Show details"}
                </button>
              </div>

              {expanded ? <div className="step-checklist-detail">{item.details}</div> : null}
            </article>
          );
        })}
      </div>
    </section>
  );
}
