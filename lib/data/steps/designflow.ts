import type { Step } from "../types";

export const DESIGN_FLOW_STEPS: Step[] = [
  {
    title: "Start with fast thinking, not polished screens",
    body: `<p>Begin with rough ideas so you move quickly and avoid perfectionism early.</p>
<p>Use paper + pencil for 5-minute sketches before opening any software.</p>
<div class="tip-box">Goal: decide layout and user journey first, visuals second.</div>`,
  },
  {
    title: "Map user flow in a whiteboard tool",
    body: `<p>Create the path users follow: entry -> action -> result.</p>
<p>Recommended tools:</p>
<p><a href="https://excalidraw.com" target="_blank" class="ext-link">Excalidraw</a> (quick hand-drawn style), <a href="https://miro.com" target="_blank" class="ext-link">Miro</a> (team workshops), <a href="https://whimsical.com" target="_blank" class="ext-link">Whimsical</a> (clean flowcharts).</p>`,
  },
  {
    title: "Create low-fidelity wireframes",
    body: `<p>Turn the flow into simple screens with boxes and labels only.</p>
<p>Good options: <a href="https://pencil.evolus.vn" target="_blank" class="ext-link">Pencil Project</a> (free desktop), <a href="https://balsamiq.com" target="_blank" class="ext-link">Balsamiq</a> (classic wireframing), or Excalidraw for quick drafts.</p>`,
  },
  {
    title: "Move to high-fidelity in a design system",
    body: `<p>When structure is clear, build polished UI with components, spacing, and typography.</p>
<p>Use <a href="https://figma.com" target="_blank" class="ext-link">Figma</a> for production-ready design workflows. Alternatives: <a href="https://penpot.app" target="_blank" class="ext-link">Penpot</a> (open source).</p>`,
  },
  {
    title: "Prototype interactions before coding",
    body: `<p>Test navigation and key actions as a clickable prototype.</p>
<p>In Figma, connect frames and run simple user tests to catch confusing flows before implementation.</p>`,
  },
  {
    title: "Prepare handoff for developers",
    body: `<p>Handoff should include:</p>
<p>- final screens<br>- spacing and typography rules<br>- component states<br>- empty/loading/error states</p>
<p>Keep everything in one source of truth (Figma file + short docs).</p>`,
  },
  {
    title: "Design -> build loop",
    body: `<p>After implementation, validate in-browser and iterate quickly:</p>
<div class="code-block"><button class="copy-btn" onclick="copyCode(this)">Copy</button>1) Build screen\n2) Compare against design\n3) Fix spacing/contrast/accessibility\n4) Re-test with users</div>
<div class="success-box">Use short iterations: small changes, frequent checks, clear decisions.</div>`,
  },
];

