import type { Step } from "../types";

export function testingSteps(tool: "vitest" | "jest" | "playwright" | "testing-library" | "msw"): Step[] {
  if (tool === "vitest") {
    return [
      {
        title: "What tests are for",
        body: `<p>A test is like an automated checklist. Instead of manually clicking through your app every time you change something, tests do it for you in seconds.</p>`,
      },
      {
        title: "Install Vitest",
        body: `<div class="code-block"><button class="copy-btn" onclick="copyCode(this)">Copy</button>npm install -D vitest @testing-library/react @testing-library/jest-dom</div>`,
      },
      {
        title: "Write your first unit test",
        body: `<p>Start with a pure function like a formatter. Keep inputs and outputs explicit.</p>`,
      },
      {
        title: "Write your first component test",
        body: `<p>Use Testing Library to render a component and assert visible behavior.</p>`,
      },
      {
        title: "Run tests and read output",
        body: `<div class="code-block"><button class="copy-btn" onclick="copyCode(this)">Copy</button>npm run test:unit</div><p>Fix failing tests before merging.</p>`,
      },
      {
        title: "Run tests in CI on every PR",
        body: `<p>Add GitHub Actions so pull requests must pass tests before merge.</p>`,
      },
    ];
  }

  if (tool === "jest") {
    return [
      { title: "Install Jest", body: "<p>Add Jest with ts-jest or Babel, then configure scripts.</p>" },
      { title: "Configure environment", body: "<p>Use jsdom for component tests and node for server tests.</p>" },
      { title: "Write first unit test", body: "<p>Cover one utility function with clear assertions.</p>" },
      { title: "Add component tests", body: "<p>Pair with Testing Library for React behavior tests.</p>" },
      { title: "Add coverage", body: "<p>Track coverage but focus on meaningful assertions.</p>" },
      { title: "Enforce in CI", body: "<p>Make PR merge dependent on passing Jest suite.</p>" },
    ];
  }

  if (tool === "playwright") {
    return [
      {
        title: "Install Playwright",
        body: "<div class='code-block'><button class='copy-btn' onclick='copyCode(this)'>Copy</button>npm install -D @playwright/test\\nnpx playwright install</div>",
      },
      { title: "Create your first E2E test", body: "<p>Automate the primary user path from home to completion.</p>" },
      { title: "Use test IDs", body: "<p>Add stable <code>data-testid</code> selectors to all interactive UI.</p>" },
      { title: "Run locally", body: "<div class='code-block'><button class='copy-btn' onclick='copyCode(this)'>Copy</button>npm run test:e2e</div>" },
      { title: "Add retry + traces", body: "<p>Enable traces for debugging flaky tests in CI.</p>" },
      { title: "Gate production with E2E", body: "<p>Require E2E pass before production promotions.</p>" },
    ];
  }

  if (tool === "testing-library") {
    return [
      { title: "Render like a user", body: "<p>Test what users see and do, not implementation details.</p>" },
      { title: "Use role/text queries", body: "<p>Prefer <code>getByRole</code> and accessible labels.</p>" },
      { title: "Simulate interactions", body: "<p>Use user-event to click/type realistically.</p>" },
      { title: "Assert outcomes", body: "<p>Verify visible text, ARIA state, or side effects.</p>" },
      { title: "Avoid brittle selectors", body: "<p>Do not couple tests to CSS classes or component internals.</p>" },
      { title: "Run in CI", body: "<p>Keep tests fast and deterministic for pull requests.</p>" },
    ];
  }

  return [
    { title: "Install MSW", body: "<p>Install Mock Service Worker to intercept network calls in tests.</p>" },
    { title: "Define handlers", body: "<p>Create realistic API responses for success and error cases.</p>" },
    { title: "Wire into test setup", body: "<p>Start server before tests and reset handlers between tests.</p>" },
    { title: "Test loading/error states", body: "<p>Mock slow, failed, and malformed responses.</p>" },
    { title: "Reuse handlers", body: "<p>Share handler modules across unit/integration tests.</p>" },
    { title: "Keep mocks honest", body: "<p>Review mocks whenever real API contracts change.</p>" },
  ];
}


