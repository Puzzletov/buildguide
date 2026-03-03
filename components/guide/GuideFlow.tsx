"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef } from "react";

import { CompletionScreen } from "@/components/guide/CompletionScreen";
import { PriorityKnobs } from "@/components/guide/PriorityKnobs";
import { StepGuide } from "@/components/guide/StepGuide";
import { SummaryGrid } from "@/components/guide/SummaryGrid";
import { ToolCarousel } from "@/components/guide/ToolCarousel";
import { Badge } from "@/components/ui/Badge";
import { GOAL_PATHS, PATH_BADGES } from "@/lib/data/goals";
import { PATH_TOOLS } from "@/lib/data/paths";
import { TOOL_LIBRARY } from "@/lib/data/tools";
import type { Priorities } from "@/lib/data/types";
import { useGuideStore } from "@/lib/store/guideStore";
import { getOrCreateSessionId, loadProgress, saveProgress } from "@/lib/utils/progress";
import { sortToolsByPriority } from "@/lib/utils/sort";

interface GuideFlowProps {
  path: string;
}

const validScreens = new Set(["s-priorities", "s-carousel", "s-summary", "s-steps", "s-done"]);

export function GuideFlow({ path }: GuideFlowProps) {
  const router = useRouter();
  const sessionIdRef = useRef<string | null>(null);

  const {
    priorities,
    carouselIndex,
    chosenTool,
    stepIndex,
    history,
    activeScreen,
    setPath,
    setPriority,
    setCarouselIndex,
    setChosenTool,
    setStepIndex,
    setHistory,
    setActiveScreen,
    pushScreen,
    goBack,
    restart,
    resetPriorities,
  } = useGuideStore();

  const goal = GOAL_PATHS.find((item) => item.path === path);

  useEffect(() => {
    if (!goal) {
      router.push("/");
      return;
    }

    setPath(path);
    setCarouselIndex(0);
    setChosenTool(null);
    setStepIndex(0);
    resetPriorities();

    const restoreFromStorage = () => {
      try {
        const raw = localStorage.getItem(`buildguide-progress-${path}`);
        if (!raw) {
          return false;
        }

        const parsed = JSON.parse(raw) as {
          priorities?: Priorities;
          toolId?: string;
          stepIndex?: number;
          screen?: string;
        };

        if (parsed.priorities?.cost) setPriority("cost", parsed.priorities.cost);
        if (parsed.priorities?.speed) setPriority("speed", parsed.priorities.speed);
        if (parsed.priorities?.quality) setPriority("quality", parsed.priorities.quality);
        if (parsed.toolId && TOOL_LIBRARY[parsed.toolId]) setChosenTool(parsed.toolId);
        if (typeof parsed.stepIndex === "number" && parsed.stepIndex >= 0) setStepIndex(parsed.stepIndex);

        if (parsed.screen && validScreens.has(parsed.screen)) {
          setHistory(["s0"]);
          setActiveScreen(parsed.screen as "s-priorities" | "s-carousel" | "s-summary" | "s-steps" | "s-done");
        }

        return true;
      } catch {
        return false;
      }
    };

    const initializeDefaultFlow = () => {
      setHistory(["s0"]);

      if (path === "notsure") {
        setPriority("cost", "low");
        setPriority("speed", "medium");
        setPriority("quality", "medium");
        setActiveScreen("s-carousel");
        return;
      }

      if (goal.directToolId) {
        setChosenTool(goal.directToolId);
        setActiveScreen("s-steps");
        return;
      }

      setActiveScreen("s-priorities");
    };

    const restored = restoreFromStorage();
    if (!restored) {
      initializeDefaultFlow();
    }

    const sid = getOrCreateSessionId();
    sessionIdRef.current = sid;

    loadProgress(path, sid)
      .then((result) => {
        const progress = result as
          | {
              tool_id?: string;
              step_index?: number;
              priorities?: Priorities;
              completed?: boolean;
            }
          | null;

        if (!progress) {
          return;
        }

        if (progress.priorities?.cost) setPriority("cost", progress.priorities.cost);
        if (progress.priorities?.speed) setPriority("speed", progress.priorities.speed);
        if (progress.priorities?.quality) setPriority("quality", progress.priorities.quality);
        if (progress.tool_id && TOOL_LIBRARY[progress.tool_id]) setChosenTool(progress.tool_id);
        if (typeof progress.step_index === "number" && progress.step_index >= 0) setStepIndex(progress.step_index);
        if (progress.completed) {
          setHistory(["s0", "s-steps"]);
          setActiveScreen("s-done");
        }
      })
      .catch(() => {
        // no-op: local persistence still works without API
      });
  }, [
    goal,
    path,
    resetPriorities,
    router,
    setActiveScreen,
    setCarouselIndex,
    setChosenTool,
    setHistory,
    setPath,
    setPriority,
    setStepIndex,
  ]);

  const sortedToolIds = useMemo(() => {
    const raw = PATH_TOOLS[path] ?? PATH_TOOLS.website;
    return sortToolsByPriority(raw, priorities).filter((id) => Boolean(TOOL_LIBRARY[id]));
  }, [path, priorities]);

  const sortedTools = sortedToolIds.map((id) => TOOL_LIBRARY[id]).filter(Boolean);
  const currentCarouselTool = sortedTools[carouselIndex];
  const currentTool = chosenTool ? TOOL_LIBRARY[chosenTool] : currentCarouselTool;

  useEffect(() => {
    if (!path) {
      return;
    }

    const payload = {
      path,
      toolId: chosenTool,
      stepIndex,
      priorities,
      screen: activeScreen,
    };

    localStorage.setItem(`buildguide-progress-${path}`, JSON.stringify(payload));

    if (!sessionIdRef.current || !priorities.cost || !priorities.speed || !priorities.quality) {
      return;
    }

    saveProgress({
      path,
      tool_id: chosenTool ?? undefined,
      step_index: stepIndex,
      priorities: {
        cost: priorities.cost,
        speed: priorities.speed,
        quality: priorities.quality,
      },
      completed: activeScreen === "s-done",
      session_id: sessionIdRef.current,
    }).catch(() => {
      // no-op
    });
  }, [activeScreen, chosenTool, path, priorities, stepIndex]);

  const onBack = () => {
    if (history.length <= 1) {
      restart();
      router.push("/");
      return;
    }

    goBack();
  };

  const onStartOver = () => {
    restart();
    router.push("/");
  };

  const onContinueFromPriorities = () => {
    if (!priorities.cost || !priorities.speed || !priorities.quality) {
      return;
    }

    setCarouselIndex(0);
    pushScreen("s-carousel");
  };

  const onCarouselSkip = () => {
    if (carouselIndex < sortedTools.length - 1) {
      setCarouselIndex(carouselIndex + 1);
      return;
    }
    pushScreen("s-summary");
  };

  const onCarouselChoose = () => {
    if (!currentCarouselTool) {
      return;
    }
    setChosenTool(currentCarouselTool.id);
    setStepIndex(0);
    pushScreen("s-steps");
  };

  const onSummaryChoose = (id: string) => {
    setChosenTool(id);
    setStepIndex(0);
    pushScreen("s-steps");
  };

  const onStepNext = () => {
    if (!currentTool) {
      return;
    }

    if (stepIndex < currentTool.steps.length - 1) {
      setStepIndex(stepIndex + 1);
      return;
    }

    pushScreen("s-done");
  };

  const totalDots = Math.min(history.length + 2, 8);

  const headingByScreen: Record<string, string> = {
    "s-priorities": "What matters most to you?",
    "s-carousel": "One option at a time",
    "s-summary": "Every option, side by side",
    "s-steps": "Let's get started",
    "s-done": "Completed",
  };

  return (
    <>
      <header>
        <Link className="logo" href="/">
          Build<span>Guide</span>
        </Link>
        <div className="header-right">
          <div className="progress-dots" id="progressDots">
            {Array.from({ length: totalDots }, (_, i) => {
              const cls = i < history.length ? "dot done" : i === history.length ? "dot active" : "dot";
              return <div className={cls} key={i} />;
            })}
          </div>
          <button className="restart-btn" data-testid="restart-btn" onClick={onStartOver} type="button">
            {"\u21BB Start over"}
          </button>
        </div>
      </header>

      <div className="stage">
        <div className="flow-header">
          <div className="flow-path">{goal?.title ?? "Guide Flow"}</div>
          <div className="flow-stage">{headingByScreen[activeScreen]}</div>
        </div>

        {activeScreen !== "s-done" ? (
          <button className="back-link" data-testid="back-link" onClick={onBack} type="button">
            {"\u2190 Back"}
          </button>
        ) : null}

        {activeScreen === "s-priorities" ? (
          <div className="screen active">
            <Badge className="badge-amber" id="pri-badge">
              {PATH_BADGES[path] ?? "Preferences"}
            </Badge>
            <div className="screen-title">{headingByScreen[activeScreen]}</div>
            <div className="screen-sub">
              There&apos;s always a trade-off. Pick what fits your situation - this shapes which tools we show you first.
            </div>
            <PriorityKnobs onContinue={onContinueFromPriorities} onSetPriority={setPriority} priorities={priorities} />
          </div>
        ) : null}

        {activeScreen === "s-carousel" ? (
          <div className="screen active">
            <ToolCarousel
              index={carouselIndex}
              onChoose={onCarouselChoose}
              onPrev={() => setCarouselIndex(Math.max(carouselIndex - 1, 0))}
              onSkip={onCarouselSkip}
              onSummary={() => pushScreen("s-summary")}
              tools={sortedTools}
            />
          </div>
        ) : null}

        {activeScreen === "s-summary" ? (
          <div className="screen active">
            <Badge className="badge-purple">All options</Badge>
            <div className="screen-title">Every option, side by side</div>
            <SummaryGrid onChoose={onSummaryChoose} priorities={priorities} tools={sortedTools} />
            <div className="tip-box" style={{ marginTop: 20 }}>
              <span>TIP</span>
              <span>
                Not sure? Look at the coloured bars - <strong>Free Budget</strong> = no cost, <strong>Speed</strong> =
                how fast you&apos;ll be live, <strong>Quality</strong> = how polished the result is.
              </span>
            </div>
          </div>
        ) : null}

        {activeScreen === "s-steps" && currentTool ? (
          <div className="screen active">
            <StepGuide onNext={onStepNext} onPrev={() => setStepIndex(Math.max(stepIndex - 1, 0))} stepIndex={stepIndex} tool={currentTool} />
          </div>
        ) : null}

        {activeScreen === "s-done" && currentTool ? (
          <div className="screen active">
            <CompletionScreen onRestart={onStartOver} tool={currentTool} />
          </div>
        ) : null}
      </div>
    </>
  );
}
