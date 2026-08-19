# CyberSecure Lab — Design Exploration

## Three directions considered

### 1. Signal Ledger
**Very Brief Intro:** An editorial security operations workspace built around a deep ink foundation, sharply organized telemetry, and restrained amber emphasis. It should feel calm, capable, and study-focused rather than theatrical.

**Probability:** 0.067

### 2. Field Manual
**Very Brief Intro:** A tactile, paper-inspired training console that blends technical annotation with practical classroom clarity. The interface would feel like a contemporary security workbook with physical utility.

**Probability:** 0.041

### 3. Transit Control
**Very Brief Intro:** A bright, modular system inspired by public-infrastructure command rooms, using clear color-coded lanes and generous space. It would make four discrete learning tools feel distinctly navigable and dependable.

**Probability:** 0.083

---

## Chosen approach: Signal Ledger

### Design Movement
Contemporary **editorial systems design** informed by SOC dashboards and technical field notes. It avoids cinematic cyberpunk in favor of a measured, high-trust command environment.

### Core Principles
1. **Isolation is visible:** Each task lives in its own named workstation, with contextual navigation and no cross-tool controls inside the working canvas.
2. **Telemetry earns attention:** Values, status markers, and concise narrative guidance form the visual hierarchy.
3. **Calm authority:** Generous space, off-black surfaces, fine rules, and limited colour prevent security learning from feeling alarming or chaotic.
4. **Progress through evidence:** Learners receive concrete analysis summaries, not decorative success states.

### Color Philosophy
The foundation is **ink blue-black**—quiet enough for sustained concentration and distinct from generic pure black interfaces. A singular **signal amber** represents attention, guided action, and active learning; moss green, sky blue, and rose are reserved for semantic results only. Soft bone and fog tints provide readability without the glare of pure white.

### Layout Paradigm
An asymmetric **operations rail** anchors the left side on larger screens, while the main workspace has a top context strip and a fluid content canvas. Landing content uses an offset portfolio of tools rather than a conventional centered hero. Each task screen has its own spatial grammar and controls, but preserves the same rail and context framing.

### Signature Elements
1. **Signal pin:** a small amber diamond/square marker beside active labels, scan stages, and selected tools.
2. **Ledger rules:** thin, low-contrast horizontal separators that organize information like a field notebook.
3. **Evidence capsules:** compact status pills with a leading semantic dot, used sparingly for state and risk.

### Interaction Philosophy
Interactions should make analysis feel deliberate: primary actions clearly change local task state, reveal structured evidence, and acknowledge constraints. Hover motion is subtle; user-initiated analysis updates are more visible but never showy. Each control is keyboard reachable and labelled.

### Animation
Use 140–220ms opacity and transform transitions with a firm ease-out. Tool cards elevate by a few pixels on hover; stage changes use a short horizontal fade-in. Analysis indicators use a restrained scan-line drift only while processing. Respect reduced-motion preferences by disabling non-essential movement.

### Typography System
**Space Grotesk** handles product name, dashboard headings, numerical readouts, and action labels; **Source Serif 4** supports explanatory prose and security guidance. Large headings are compact and slightly tracked; body copy is relaxed with a 1.55 line-height. Monospace is reserved for URLs, scan targets, and technical evidence.

### Brand Essence
**CyberSecure Lab is a focused, safe training workspace for new defenders who learn by inspecting evidence, applying controls, and understanding why the result matters.**

**Personality:** precise, reassuring, investigative.

### Brand Voice
Headlines are direct and evidence-led; CTAs describe the actual action; microcopy names the safety boundary when relevant.

> “Inspect the exposure before you reduce it.”

> “Analyse this sample locally — no external target is contacted.”

### Wordmark & Logo
The mark is a bold **segmented shield aperture**: four offset facets create a protected central signal, rendered without text. The wordmark uses tight, custom-spaced Space Grotesk capitals with a small amber signal pin.

### Signature Brand Color
**Signal Amber — `#F5B544`**. It is used for focus, action, and active evidence—not decorative gradients.

## Style Decisions

- Every large-screen route retains the persistent left operations rail with the aperture mark, CyberSecure Lab wordmark, all task workstations, and an amber signal pin on the active dashboard.
- **Signal Amber `#F5B544`** is reserved for primary actions, active navigation, selected stages, and guided attention. Moss, sky, and rose are semantic states only.
- Individual workstations vary by task mental model—configuration/evidence ledger, composition meter, defensive control ledger, and trace review—while sharing the same rail, context strip, ledger rules, evidence capsules, and ink-bone-amber material system.
