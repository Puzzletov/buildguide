import type { Step } from "../types";

export function testingSteps(tool: "vitest" | "jest" | "playwright" | "testing-library" | "msw"): Step[] {
  if (tool === "vitest") {
    return [
      {
        title: "Understand why tests matter",
        body: `<p>A test is an automated checklist. It verifies behavior every time you change code so regressions are caught early.</p>
<p>Start with business-critical logic first, not exhaustive coverage on day one.</p>`,
      },
      {
        title: "Install Vitest and test utilities",
        body: `<div class="code-block"><button class="copy-btn">Copy</button>npm install -D vitest @testing-library/react @testing-library/jest-dom</div>
<p>Add scripts in <code>package.json</code> for repeatable local and CI execution.</p>`,
      },
      {
        title: "Write first unit test for a pure function",
        body: `<p>Create one deterministic test for a utility function (for example formatters, validators, pricing logic).</p>
<p>Assert exact expected output for multiple edge cases.</p>`,
      },
      {
        title: "Add first component behavior test",
        body: `<p>Use Testing Library to verify visible behavior: rendering, interactions, and state transitions.</p>
<p>Avoid asserting internal implementation details.</p>`,
      },
      {
        title: "Run and debug failing tests",
        body: `<div class="code-block"><button class="copy-btn">Copy</button>npm run test:unit</div>
<p>Fix one failure at a time. If flaky, remove time-dependent assumptions and random inputs.</p>`,
      },
      {
        title: "Gate pull requests with test checks",
        body: `<p>Run Vitest in CI for every PR and block merges when tests fail.</p>
<div class="success-box">Vitest baseline complete with local and CI validation flow.</div>`,
      },
    ];
  }

  if (tool === "jest") {
    return [
      {
        title: "Install Jest and environment adapters",
        body: `<p>Install Jest plus TypeScript/Babel adapters based on your stack.</p>
<p>Keep config explicit for Node vs browser-like test environments.</p>`,
      },
      {
        title: "Create Jest config and scripts",
        body: `<p>Set up <code>jest.config</code> and add scripts:</p>
<div class="code-block"><button class="copy-btn">Copy</button>"test": "jest",
"test:watch": "jest --watch"</div>`,
      },
      {
        title: "Write first unit and component tests",
        body: `<p>Start with utility logic, then add component tests using Testing Library.</p>
<p>Prefer user-facing assertions over internal state inspection.</p>`,
      },
      {
        title: "Add coverage rules for critical modules",
        body: `<p>Set minimum coverage thresholds for key paths only. Do not chase high coverage with low-value assertions.</p>`,
      },
      {
        title: "Stabilize mocks and snapshots",
        body: `<p>Use targeted mocks and review snapshot updates carefully to avoid masking regressions.</p>`,
      },
      {
        title: "Integrate Jest in CI",
        body: `<p>Run Jest on each PR and fail builds on test failures.</p>
<div class="success-box">Jest setup complete with stable test and CI workflow.</div>`,
      },
    ];
  }

  if (tool === "playwright") {
    return [
      {
        title: "Install Playwright test runner",
        body: `<div class="code-block"><button class="copy-btn">Copy</button>npm install -D @playwright/test
npx playwright install</div>`,
      },
      {
        title: "Identify critical user journeys",
        body: `<p>Pick 3 to 5 revenue-critical or mission-critical flows first (signup, checkout, dashboard load, etc.).</p>
<p>Automate those before edge flows.</p>`,
      },
      {
        title: "Write first end-to-end test",
        body: `<p>Create one full-path scenario from landing to successful completion.</p>
<p>Use stable selectors (<code>data-testid</code>) for reliability.</p>`,
      },
      {
        title: "Capture traces and screenshots on failure",
        body: `<p>Enable Playwright traces/video for failed tests to speed up debugging in CI.</p>`,
      },
      {
        title: "Run tests against staging",
        body: `<div class="code-block"><button class="copy-btn">Copy</button>npm run test:e2e</div>
<p>Use staging environment URLs to validate release candidates before production deploy.</p>`,
      },
      {
        title: "Make E2E a release gate",
        body: `<p>Require critical Playwright suites to pass before production promotion.</p>
<div class="success-box">Playwright is now protecting real user workflows from regressions.</div>`,
      },
    ];
  }

  if (tool === "testing-library") {
    return [
      {
        title: "Adopt user-centric testing model",
        body: `<p>Testing Library focuses on what users can see and do.</p>
<p>This avoids brittle tests tied to component internals.</p>`,
      },
      {
        title: "Set up render utilities and matchers",
        body: `<p>Install and configure <code>@testing-library/react</code> and <code>@testing-library/jest-dom</code> in your test setup file.</p>`,
      },
      {
        title: "Use accessibility-first queries",
        body: `<p>Prefer <code>getByRole</code>, <code>getByLabelText</code>, and visible text queries over CSS selectors.</p>
<p>This also improves accessibility alignment.</p>`,
      },
      {
        title: "Simulate realistic interactions",
        body: `<p>Use user-event for typing/clicking behavior and assert outcome changes, not implementation details.</p>`,
      },
      {
        title: "Cover loading, error, and success states",
        body: `<p>For each component flow, verify all three states so regressions are caught early.</p>`,
      },
      {
        title: "Integrate with Vitest or Jest",
        body: `<p>Run component suites in your main unit test runner and enforce pass in CI.</p>
<div class="success-box">Testing Library is integrated with maintainable user-focused component tests.</div>`,
      },
    ];
  }

  return [
    {
      title: "Install and initialize MSW",
      body: `<p>Install Mock Service Worker and create base handlers for your app APIs.</p>
<p>MSW lets tests run without real network dependency.</p>`,
    },
    {
      title: "Define realistic success and failure handlers",
      body: `<p>Mock not only success responses, but also timeouts, 4xx, 5xx, and malformed payloads.</p>`,
    },
    {
      title: "Wire MSW into test lifecycle",
      body: `<p>Start mock server before tests, reset handlers after each test, and close server after suite completion.</p>`,
    },
    {
      title: "Validate UI states with mocked responses",
      body: `<p>Assert loading spinners, retry messaging, and fallback UIs for different API outcomes.</p>`,
    },
    {
      title: "Share handler modules across suites",
      body: `<p>Keep handler definitions centralized so unit and integration tests use consistent API contracts.</p>`,
    },
    {
      title: "Keep mocks aligned with backend contracts",
      body: `<p>Review and update MSW handlers whenever backend response schema changes.</p>
<div class="success-box">MSW setup complete with reliable, contract-aware API mocking.</div>`,
    },
  ];
}
