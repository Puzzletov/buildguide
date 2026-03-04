"use client";

import { useEffect, useRef, useState } from "react";

import { Icon } from "@/components/ui/Icon";

interface CyclingItem {
  word: string;
  icon: string;
  color: string;
}

const CYCLING_ITEMS: CyclingItem[] = [
  { word: "website", icon: "Globe", color: "#2563eb" },
  { word: "web app", icon: "Layers", color: "#7c3aed" },
  { word: "AI agent", icon: "Bot", color: "#06b6d4" },
  { word: "chatbot", icon: "MessageSquare", color: "#10b981" },
  { word: "mobile app", icon: "Smartphone", color: "#f59e0b" },
  { word: "automation", icon: "Zap", color: "#ec4899" },
  { word: "database", icon: "Database", color: "#14b8a6" },
];

const CYCLE_INTERVAL = 2600;
const TRANSITION_MS = 400;

export function CyclingHero() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [containerW, setContainerW] = useState<number | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const measureRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();

    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!measureRef.current) {
      return;
    }
    setContainerW(measureRef.current.scrollWidth);
  }, [index]);

  useEffect(() => {
    if (reducedMotion) {
      return;
    }

    let phaseTimer: ReturnType<typeof setTimeout> | null = null;
    const timer = setInterval(() => {
      setVisible(false);
      phaseTimer = setTimeout(() => {
        setIndex((i) => (i + 1) % CYCLING_ITEMS.length);
        setTimeout(() => setVisible(true), 50);
      }, TRANSITION_MS);
    }, CYCLE_INTERVAL);

    return () => {
      clearInterval(timer);
      if (phaseTimer) {
        clearTimeout(phaseTimer);
      }
    };
  }, [reducedMotion]);

  const current = CYCLING_ITEMS[index];
  const displayItem = reducedMotion ? CYCLING_ITEMS[0] : current;

  return (
    <h1 className="hero-cycling-title">
      The fastest way
      <br />
      to ship your{" "}
      <span
        className="hero-cycling-container"
        style={{
          width: containerW != null ? `${containerW}px` : undefined,
          transitionDuration: `${TRANSITION_MS}ms`,
        }}
      >
        <span
          className={`hero-cycling-word ${visible || reducedMotion ? "is-visible" : "is-hidden"}`}
          style={{ color: displayItem.color }}
        >
          <Icon name={displayItem.icon} size={26} />
          <span>{displayItem.word}</span>
        </span>
        <span aria-hidden className="hero-cycling-word hero-cycling-measure" ref={measureRef}>
          <Icon name={displayItem.icon} size={26} />
          <span>{displayItem.word}</span>
        </span>
      </span>
      <br />
      <span className="hero-cycling-subline">with the right tools</span>
    </h1>
  );
}
