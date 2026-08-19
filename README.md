# CyberSecure Lab

> **A controlled, browser-first learning workspace for practicing foundational defensive cybersecurity workflows.**

CyberSecure Lab presents four focused cybersecurity exercises in separate dashboards. The application is intentionally designed as a **learning environment**, not a production scanner, credential service, or phishing-verification authority. Each task keeps its own workflow and controls within a dedicated route, helping learners focus on one defensive concept at a time.

## Overview

The interface uses the **Signal Ledger** design system: an ink-blue operations rail, compact evidence capsules, thin ledger rules, and Signal Amber guidance states. On large screens, the persistent operations rail exposes the four workstations while the active task remains clearly identified.

| Task | Dashboard route | Learning objective | Local safety boundary |
|---|---|---|---|
| **01 — Basic Vulnerability Scan** | `/vulnerability-scan` | Interpret common exposure signals, including open-service hints, missing headers, and version disclosure. | Runs a deterministic report for supplied training fixtures; it does **not** probe an external website or system. |
| **02 — Password Strength Checker** | `/password-checker` | Evaluate length, letter case, numbers, symbols, and common password patterns. | The typed practice password is assessed in temporary browser memory and is not sent or retained by the app. |
| **03 — Secure Login Defense** | `/secure-login` | Observe one-way credential hashing and temporary lockout after repeated failed attempts. | The training identity exists only for the active browser session and is cleared when the page is refreshed or left. |
| **04 — Phishing Detection** | `/phishing-detection` | Review visible URL and email-text indicators associated with deception. | The submitted URL is not opened or fetched; the browser performs local text-pattern analysis only. |

## Product Boundaries

CyberSecure Lab is deliberately constrained so that learners can safely examine defensive concepts. The vulnerability workflow uses known local fixtures rather than network scanning. The phishing workflow only interprets text already supplied by the learner. The credential-related flows are browser demonstrations and should not be used to authenticate users in a real application.

> **Important:** A positive or negative result in this project is an educational signal, not a final security assessment. Real-world security decisions require authorized testing, secure server-side controls, and context-specific review.

## Technology

| Area | Implementation |
|---|---|
| User interface | React 19 and TypeScript |
| Styling | Tailwind CSS 4 with custom Signal Ledger tokens |
| Routing | Wouter client-side routes |
| Icons and interactions | Lucide React and native browser APIs |
| Bundler and development server | Vite |
| Demo credential hashing | Browser Web Crypto API using SHA-256 |

## Run Locally

Use a recent Node.js LTS release and pnpm. The project currently uses the scripts below.

```bash
git clone https://github.com/SOMAIAH07/CyberSecure.git
cd CyberSecure
pnpm install
pnpm dev
```

Once the development server starts, open the local URL printed by Vite. The main workspace is available at `/`, with direct routes for each isolated dashboard.

| Command | Purpose |
|---|---|
| `pnpm dev` | Start the Vite development server. |
| `pnpm check` | Run TypeScript type checking without emitting output. |
| `pnpm build` | Create the production client bundle and server entrypoint. |
| `pnpm start` | Run the production build. |
| `pnpm preview` | Preview the Vite production client bundle locally. |
| `pnpm format` | Apply the project Prettier configuration. |

## Project Structure

```text
CyberSecure/
├── client/
│   ├── src/
│   │   ├── components/       # Shared dashboard layout and UI primitives
│   │   ├── contexts/         # Theme support
│   │   ├── pages/            # Home and the four task dashboards
│   │   ├── App.tsx           # Isolated task routes
│   │   └── index.css         # Global Signal Ledger visual tokens
│   └── index.html            # Browser entry document and font loading
├── server/                   # Static-production compatibility entrypoint
├── shared/                   # Template compatibility types/constants
├── ideas.md                  # Product and visual-direction decisions
└── package.json              # Scripts and dependencies
```

## Implementation Notes

The application is frontend-only. Its learning workflows are intentionally transparent and deterministic:

| Workflow | What it demonstrates | What it intentionally does not do |
|---|---|---|
| Vulnerability Scan | Security-header, service-exposure, and version-disclosure thinking. | Port scanning, crawling, packet inspection, or external target probing. |
| Password Checker | Composition checks and clear improvement prompts. | Password storage, transmission, or account identity verification. |
| Secure Login Defense | One-way hashing, failed-attempt tracking, and a temporary 30-second lockout. | Persistent accounts, server-side authentication, salted password storage, MFA, recovery, or audit persistence. |
| Phishing Detection | Passive inspection of visible URL and message indicators. | Opening URLs, sending requests, reputation lookups, attachment analysis, or definitive fraud classification. |

## Development Guidance

When extending the project, preserve the separation between task workspaces. A control belonging to one task should not appear inside another task’s operating canvas. New features should maintain the local-first safety boundary unless an authorized backend, explicit consent, and appropriate security controls are added.

For a real authentication system, move credentials and rate limiting to a server, use a purpose-built password hashing algorithm with unique salts, protect sessions, add CSRF and abuse defenses, and establish monitoring and recovery procedures. The current login dashboard is deliberately a lightweight visual teaching exercise.

## Quality Checks

Before committing changes, run:

```bash
pnpm check
pnpm build
```

The completed initial implementation passes both checks.

## License

The package metadata currently declares the **MIT** license. Add a repository-level `LICENSE` file before distributing the project more broadly.

## References

[1]: https://react.dev/ "React documentation"
[2]: https://vite.dev/guide/ "Vite guide"
[3]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API "MDN Web Crypto API documentation"
[4]: https://tailwindcss.com/docs "Tailwind CSS documentation"
