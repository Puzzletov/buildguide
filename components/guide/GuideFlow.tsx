"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ExternalLink, RotateCcw } from "lucide-react";

import { CompletionScreen } from "@/components/guide/CompletionScreen";
import { GoalGrid } from "@/components/guide/GoalGrid";
import { PriorityKnobs } from "@/components/guide/PriorityKnobs";
import { StepGuide } from "@/components/guide/StepGuide";
import { SummaryGrid } from "@/components/guide/SummaryGrid";
import { ToolCarousel } from "@/components/guide/ToolCarousel";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { GOAL_PATHS } from "@/lib/data/goals";
import {
  AI_AGENTS,
  IDES,
  IDE_COMPATIBLE_GOALS,
  WINDSURF_CASCADE_ID,
  buildIdeGuideTool,
  getCompatibleAgents,
} from "@/lib/data/ide";
import { PATH_TOOLS } from "@/lib/data/paths";
import { TOOL_LIBRARY } from "@/lib/data/tools";
import type { Priorities, Tool } from "@/lib/data/types";
import { useGuideStore } from "@/lib/store/guideStore";
import { getOrCreateSessionId, loadProgress, saveProgress } from "@/lib/utils/progress";
import { sortToolsByPriority } from "@/lib/utils/sort";

interface GuideFlowProps {
  path: string;
}

const STANDARD_SCREENS = new Set(["s-priorities", "s-carousel", "s-summary", "s-steps", "s-done"]);
const IDE_SCREENS = new Set(["s-ide-editor", "s-ide-agent", "s-ide-goal", "s-steps", "s-done"]);

const MILESTONES_STANDARD = ["Goal", "Priorities", "Options", "Setup", "Done"];
const SCREEN_TO_MILESTONE_STANDARD: Record<string, number> = {
  "s-priorities": 1,
  "s-carousel": 2,
  "s-summary": 2,
  "s-steps": 3,
  "s-done": 4,
};

const MILESTONES_IDE = ["Goal", "IDE", "Agent", "Build", "Setup", "Done"];
const SCREEN_TO_MILESTONE_IDE: Record<string, number> = {
  "s-ide-editor": 1,
  "s-ide-agent": 2,
  "s-ide-goal": 3,
  "s-steps": 4,
  "s-done": 5,
};

function isIdeId(value: string | null): value is (typeof IDES)[number]["id"] {
  return Boolean(value && IDES.some((item) => item.id === value));
}

function isCompatibleGoal(value: string | null): value is (typeof IDE_COMPATIBLE_GOALS)[number] {
  return Boolean(value && IDE_COMPATIBLE_GOALS.includes(value as (typeof IDE_COMPATIBLE_GOALS)[number]));
}

function isIdeAgentId(value: string | null): value is (typeof AI_AGENTS)[number]["id"] {
  return Boolean(value && AI_AGENTS.some((item) => item.id === value));
}

export function GuideFlow({ path }: GuideFlowProps) {
  const router = useRouter();
  const sessionIdRef = useRef<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  const {
    priorities,
    carouselIndex,
    chosenTool,
    selectedIde,
    selectedAgent,
    ideGoal,
    stepIndex,
    history,
    activeScreen,
    setPath,
    setPriority,
    setCarouselIndex,
    setChosenTool,
    setSelectedIde,
    setSelectedAgent,
    setIdeGoal,
    setStepIndex,
    setHistory,
    setActiveScreen,
    pushScreen,
    goBack,
    restart,
    resetPriorities,
  } = useGuideStore();

  const isIdePath = path === "ide";
  const goal = GOAL_PATHS.find((item) => item.path === path);

  const activeIde = isIdeId(selectedIde) ? IDES.find((item) => item.id === selectedIde) ?? null : null;
  const activeGoal = isCompatibleGoal(ideGoal) ? GOAL_PATHS.find((item) => item.path === ideGoal) ?? null : null;

  const compatibleAgents = useMemo(() => (activeIde ? getCompatibleAgents(activeIde.id) : []), [activeIde]);
  const activeAgent = useMemo(() => {
    if (selectedAgent === WINDSURF_CASCADE_ID) {
      return {
        id: WINDSURF_CASCADE_ID,
        name: "Windsurf Cascade",
        icon: "Workflow",
        tagline: "Built-in Windsurf AI assistant",
        badges: ["Built in", "No extension needed"],
        bestFor: "Windsurf-native coding sessions",
        cost: "Included with Windsurf",
      };
    }
    if (!isIdeAgentId(selectedAgent)) {
      return null;
    }
    return AI_AGENTS.find((item) => item.id === selectedAgent) ?? null;
  }, [selectedAgent]);

  const ideGuideTool = useMemo<Tool | null>(() => {
    if (!activeIde || !activeGoal || !selectedAgent) {
      return null;
    }

    if (selectedAgent !== WINDSURF_CASCADE_ID && !isIdeAgentId(selectedAgent)) {
      return null;
    }

    return buildIdeGuideTool(activeIde.id, selectedAgent as (typeof AI_AGENTS)[number]["id"] | typeof WINDSURF_CASCADE_ID, activeGoal.path as (typeof IDE_COMPATIBLE_GOALS)[number]);
  }, [activeGoal, activeIde, selectedAgent]);

  const sortedToolIds = useMemo(() => {
    if (isIdePath) {
      return [];
    }
    const raw = PATH_TOOLS[path] ?? PATH_TOOLS.website;
    return sortToolsByPriority(raw, priorities).filter((id) => Boolean(TOOL_LIBRARY[id]));
  }, [isIdePath, path, priorities]);

  const sortedTools = sortedToolIds.map((id) => TOOL_LIBRARY[id]).filter(Boolean);
  const currentCarouselTool = sortedTools[carouselIndex];
  const currentTool = isIdePath ? ideGuideTool : chosenTool ? TOOL_LIBRARY[chosenTool] : currentCarouselTool;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!goal) {
      router.push("/");
      return;
    }

    setPath(path);
    setCarouselIndex(0);
    setChosenTool(null);
    setStepIndex(0);
    setSelectedIde(null);
    setSelectedAgent(null);
    setIdeGoal(null);
    resetPriorities();

    const restoreFromStorage = () => {
      try {
        const key = `buildguide-progress-${path}`;
        const raw = localStorage.getItem(key);
        if (!raw) {
          return false;
        }

        const parsed = JSON.parse(raw) as {
          priorities?: Priorities;
          toolId?: string;
          stepIndex?: number;
          screen?: string;
          selectedIde?: string;
          selectedAgent?: string;
          ideGoal?: string;
        };

        const validScreens = isIdePath ? IDE_SCREENS : STANDARD_SCREENS;
        if (!parsed.screen || !validScreens.has(parsed.screen)) {
          localStorage.removeItem(key);
          return false;
        }

        if (!isIdePath) {
          if (parsed.priorities?.cost) setPriority("cost", parsed.priorities.cost);
          if (parsed.priorities?.speed) setPriority("speed", parsed.priorities.speed);
          if (parsed.priorities?.quality) setPriority("quality", parsed.priorities.quality);
          if (parsed.toolId && TOOL_LIBRARY[parsed.toolId]) setChosenTool(parsed.toolId);
        } else {
          if (parsed.selectedIde && isIdeId(parsed.selectedIde)) setSelectedIde(parsed.selectedIde);
          if (parsed.selectedAgent && (isIdeAgentId(parsed.selectedAgent) || parsed.selectedAgent === WINDSURF_CASCADE_ID)) {
            setSelectedAgent(parsed.selectedAgent);
          }
          if (parsed.ideGoal && isCompatibleGoal(parsed.ideGoal)) setIdeGoal(parsed.ideGoal);
        }

        if (typeof parsed.stepIndex === "number" && parsed.stepIndex >= 0) setStepIndex(parsed.stepIndex);

        setHistory(["s0"]);
        setActiveScreen(
          parsed.screen as
            | "s-priorities"
            | "s-carousel"
            | "s-summary"
            | "s-steps"
            | "s-done"
            | "s-ide-editor"
            | "s-ide-agent"
            | "s-ide-goal",
        );

        return true;
      } catch {
        return false;
      }
    };

    const initializeDefaultFlow = () => {
      setHistory(["s0"]);

      if (isIdePath) {
        setActiveScreen("s-ide-editor");
        return;
      }

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

    const navType =
      typeof window !== "undefined"
        ? (performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined)?.type
        : undefined;
    const forceResume = typeof window !== "undefined" && window.location.search.includes("resume=1");
    const shouldResume = forceResume || navType === "reload";

    const restored = shouldResume ? restoreFromStorage() : false;
    if (!restored) {
      initializeDefaultFlow();
    }

    const sid = getOrCreateSessionId();
    sessionIdRef.current = sid;

    if (!isIdePath) {
      loadProgress(path, sid)
        .then((result) => {
          if (!shouldResume) {
            return;
          }

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
    }
  }, [
    goal,
    isIdePath,
    path,
    resetPriorities,
    router,
    setActiveScreen,
    setCarouselIndex,
    setChosenTool,
    setHistory,
    setIdeGoal,
    setPath,
    setPriority,
    setSelectedAgent,
    setSelectedIde,
    setStepIndex,
  ]);

  useEffect(() => {
    if (isIdePath) {
      return;
    }

    if (sortedTools.length === 0) {
      if (activeScreen !== "s-priorities") {
        setHistory(["s0"]);
        setActiveScreen("s-priorities");
      }
      if (carouselIndex !== 0) {
        setCarouselIndex(0);
      }
      if (chosenTool !== null) {
        setChosenTool(null);
      }
      return;
    }

    if (carouselIndex >= sortedTools.length) {
      setCarouselIndex(0);
    }

    if (activeScreen === "s-steps" && !currentTool) {
      setStepIndex(0);
      setChosenTool(sortedTools[0].id);
    }
  }, [
    activeScreen,
    carouselIndex,
    chosenTool,
    currentTool,
    isIdePath,
    setActiveScreen,
    setCarouselIndex,
    setChosenTool,
    setHistory,
    setStepIndex,
    sortedTools,
  ]);

  useEffect(() => {
    if (!path) {
      return;
    }

    const payload = {
      path,
      toolId: chosenTool ?? currentTool?.id ?? null,
      stepIndex,
      priorities,
      screen: activeScreen,
      selectedIde,
      selectedAgent,
      ideGoal,
    };

    localStorage.setItem(`buildguide-progress-${path}`, JSON.stringify(payload));

    if (!sessionIdRef.current || !priorities.cost || !priorities.speed || !priorities.quality || isIdePath) {
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
  }, [activeScreen, chosenTool, currentTool?.id, ideGoal, isIdePath, path, priorities, selectedAgent, selectedIde, stepIndex]);

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
    if (sortedTools.length === 0) {
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

  const headingByScreen: Record<string, string> = {
    "s-priorities": "Priorities",
    "s-carousel": "Options",
    "s-summary": "Compare",
    "s-steps": "Setup",
    "s-done": "Completed",
    "s-ide-editor": "Choose your editor",
    "s-ide-agent": "Choose your AI agent",
    "s-ide-goal": "Choose what to build",
  };

  const milestones = isIdePath ? MILESTONES_IDE : MILESTONES_STANDARD;
  const activeMilestone = isIdePath
    ? SCREEN_TO_MILESTONE_IDE[activeScreen] ?? 0
    : SCREEN_TO_MILESTONE_STANDARD[activeScreen] ?? 0;

  const ideGoals = useMemo(
    () => GOAL_PATHS.filter((item) => IDE_COMPATIBLE_GOALS.includes(item.path as (typeof IDE_COMPATIBLE_GOALS)[number])),
    [],
  );

  return (
    <>
      <header className={`topbar flow-topbar ${scrolled ? "topbar-scrolled" : ""}`}>
        <Link aria-label="BuildGuide home" className="brand-mark" href="/">
          <span>Build</span>
          <span>Guide</span>
        </Link>

        <nav aria-label="Guide progress" className="milestone-track">
          {milestones.map((milestone, index) => {
            const state = index < activeMilestone ? "done" : index === activeMilestone ? "active" : "pending";
            return (
              <div className={`milestone-item ${state}`} key={milestone}>
                <span className="milestone-dot" />
                <span className="milestone-label">{milestone}</span>
                {index < milestones.length - 1 ? <span className="milestone-line" aria-hidden /> : null}
              </div>
            );
          })}
        </nav>

        <button aria-label="Start a new guide" className="restart-icon-btn" data-testid="restart-btn" onClick={onStartOver} type="button">
          <RotateCcw size={15} />
        </button>
      </header>

      <main className="stage stage-flow">
        <section className="screen active guide-screen">
          <div className="guide-context-row">
            {activeScreen !== "s-done" ? (
              <button className="back-link" data-testid="back-link" onClick={onBack} type="button">
                <ArrowLeft size={14} />
                <span>Back</span>
              </button>
            ) : (
              <span />
            )}

            <div className="guide-context">
              <h1>{goal?.title ?? "Guide flow"}</h1>
              <p>{headingByScreen[activeScreen]}</p>
            </div>
          </div>

          {!isIdePath && sortedTools.length === 0 ? (
            <section className="empty-state-card">
              <h2>No options loaded for this path yet</h2>
              <p>The flow will work again once tools are connected for this path. Choose another path for now.</p>
              <Button onClick={onStartOver} type="button">
                Go back to all paths
              </Button>
            </section>
          ) : null}

          {!isIdePath && sortedTools.length > 0 && activeScreen === "s-priorities" ? (
            <section className="guide-screen-block">
              <h2>What matters most for this build?</h2>
              <p>Choose your budget, speed, and quality priorities first. This ranking shapes tool recommendations.</p>
              <PriorityKnobs onContinue={onContinueFromPriorities} onSetPriority={setPriority} priorities={priorities} />
            </section>
          ) : null}

          {!isIdePath && sortedTools.length > 0 && activeScreen === "s-carousel" ? (
            <section className="guide-screen-block">
              <ToolCarousel
                index={carouselIndex}
                onChoose={onCarouselChoose}
                onJumpTo={setCarouselIndex}
                onPrev={() => setCarouselIndex(Math.max(carouselIndex - 1, 0))}
                onSkip={onCarouselSkip}
                onSummary={() => pushScreen("s-summary")}
                tools={sortedTools}
              />
            </section>
          ) : null}

          {!isIdePath && sortedTools.length > 0 && activeScreen === "s-summary" ? (
            <section className="guide-screen-block">
              <h2>Comparison view</h2>
              <p>Pick the option that best matches your constraints, then follow the full setup guide.</p>
              <SummaryGrid onChoose={onSummaryChoose} priorities={priorities} tools={sortedTools} />
            </section>
          ) : null}

          {isIdePath && activeScreen === "s-ide-editor" ? (
            <section className="guide-screen-block ide-screen">
              <h2>Which editor do you use?</h2>
              <p>Don&apos;t have one yet? Cursor is the easiest starting point.</p>

              <div className="ide-grid">
                {IDES.map((ide) => (
                  <button
                    aria-pressed={selectedIde === ide.id}
                    className={`ide-card ${selectedIde === ide.id ? "selected" : ""}`}
                    key={ide.id}
                    onClick={() => setSelectedIde(ide.id)}
                    type="button"
                  >
                    <div className="ide-card-head">
                      <div className="ide-card-icon">
                        <Icon name={ide.icon} size={20} />
                      </div>
                      <span className={`ide-badge ide-badge-${ide.badgeStyle}`}>{ide.badge}</span>
                    </div>
                    <h3>{ide.name}</h3>
                    <p>{ide.tagline}</p>
                    <div className="ide-card-detail">{ide.detail}</div>
                    <span className="ide-card-link">
                      <span>{ide.url.replace("https://", "")}</span>
                      <ExternalLink size={12} />
                    </span>
                  </button>
                ))}
              </div>

              <div className="ide-inline-note">
                <Icon name="Lightbulb" size={14} />
                <p>
                  Windsurf and Cursor include built-in AI. You can still connect external agents for additional control
                  and longer autonomous workflows.
                </p>
              </div>

              <div className="ide-action-row">
                <Button onClick={() => pushScreen("s-ide-agent")} type="button" disabled={!activeIde}>
                  Continue
                  <ArrowRight size={14} />
                </Button>
              </div>
            </section>
          ) : null}

          {isIdePath && activeScreen === "s-ide-agent" ? (
            <section className="guide-screen-block ide-screen">
              <h2>Which AI agent do you want to use?</h2>
              <p>This is the AI brain you&apos;ll direct to write code. You can always change it later.</p>

              {activeIde?.id === "windsurf" ? (
                <div className="ide-inline-note">
                  <Icon name="Info" size={14} />
                  <p>
                    Windsurf includes Cascade AI built in. You can use Cascade directly or pair Windsurf with an
                    external terminal agent.
                  </p>
                </div>
              ) : null}

              {activeIde?.id === "antigravity" ? (
                <div className="ide-inline-note">
                  <Icon name="Info" size={14} />
                  <p>
                    Antigravity works alongside terminal agents. Cline and Copilot are extension-first and do not run
                    inside Antigravity directly.
                  </p>
                </div>
              ) : null}

              <div className="agent-grid">
                {compatibleAgents.map((agent) => (
                  <button
                    aria-pressed={selectedAgent === agent.id}
                    className={`agent-card ${selectedAgent === agent.id ? "selected" : ""}`}
                    key={agent.id}
                    onClick={() => setSelectedAgent(agent.id)}
                    type="button"
                  >
                    <div className="agent-card-head">
                      <div className="agent-card-icon">
                        <Icon name={agent.icon} size={20} />
                      </div>
                      <h3>{agent.name}</h3>
                    </div>
                    <p className="agent-card-tagline">{agent.tagline}</p>
                    <div className="agent-meta-list">
                      {agent.badges.map((badge) => (
                        <span className="agent-meta-badge" key={`${agent.id}-${badge}`}>
                          {badge}
                        </span>
                      ))}
                    </div>
                    <p className="agent-meta-line">
                      <strong>Best for:</strong> {agent.bestFor}
                    </p>
                    <p className="agent-meta-line">
                      <strong>Cost:</strong> {agent.cost}
                    </p>
                  </button>
                ))}
              </div>

              <div className="ide-action-row">
                {activeIde?.id === "windsurf" ? (
                  <Button
                    onClick={() => {
                      setSelectedAgent(WINDSURF_CASCADE_ID);
                      pushScreen("s-ide-goal");
                    }}
                    type="button"
                    variant="secondary"
                  >
                    Use Windsurf Cascade instead
                    <ArrowRight size={14} />
                  </Button>
                ) : null}

                <Button onClick={() => pushScreen("s-ide-goal")} type="button" disabled={!selectedAgent}>
                  Continue
                  <ArrowRight size={14} />
                </Button>
              </div>
            </section>
          ) : null}

          {isIdePath && activeScreen === "s-ide-goal" ? (
            <section className="guide-screen-block ide-screen">
              <h2>What do you want to build?</h2>
              <p>
                We&apos;ll show you how to do this with <strong>{activeIde?.name ?? "your editor"}</strong> +{" "}
                <strong>{activeAgent?.name ?? "your agent"}</strong>.
              </p>
              <GoalGrid
                goals={ideGoals}
                onSelect={(selected) => {
                  setIdeGoal(selected.path);
                  setStepIndex(0);
                  pushScreen("s-steps");
                }}
              />
            </section>
          ) : null}

          {activeScreen === "s-steps" && currentTool ? (
            <section className="guide-screen-block">
              <StepGuide
                onJump={(index) => setStepIndex(index)}
                onNext={onStepNext}
                onPrev={() => setStepIndex(Math.max(stepIndex - 1, 0))}
                stepIndex={stepIndex}
                tool={currentTool}
              />
            </section>
          ) : null}

          {activeScreen === "s-done" && currentTool ? (
            <section className="guide-screen-block">
              <CompletionScreen onRestart={onStartOver} tool={currentTool} />
            </section>
          ) : null}
        </section>
      </main>
    </>
  );
}
