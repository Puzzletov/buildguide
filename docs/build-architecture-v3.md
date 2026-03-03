# BuildGuide Architecture V3

## Problem with the previous build
- Tool guidance was present, but users could still enter paths without understanding the full delivery sequence.
- Flow strength was local (per card/step) rather than systemic (foundation -> build -> ship).
- Recommendations favored immediate tool selection over architecture and rollout discipline.

## V3 product architecture
### 1) Foundation layer
- Set up AI workflow, prompting quality, security, and engineering guardrails first.
- Paths: `aitools`, `prompting`, `security`, `bestpractices`.

### 2) Build layer
- Pick stack components only after foundation is stable.
- Paths: `website`, `webapp`, `chatbot`, `database`.

### 3) Ship layer
- Enforce testing and deployment discipline before production rollout.
- Paths: `testing`, `deployment`, `agentdev`.

## UX implementation goals
- Show users a clear global roadmap on the home screen.
- Show users a path-specific blueprint on each guide route.
- Keep each blueprint actionable with direct links to prerequisite guides.
- Preserve one-task-at-a-time step guidance and comparison workflow.

## Recommendation logic changes
- Ranking now uses weighted priority scoring across all selected knobs:
  - `cost`: free, low, any
  - `speed`: fast, medium, slow
  - `quality`: high, medium, basic
- Tie-breakers prefer stronger quality for equal scores.

## Expected outcomes
- Less rework from missing setup.
- Better tool selection quality for user constraints.
- More reliable transition from setup to production-ready delivery.
