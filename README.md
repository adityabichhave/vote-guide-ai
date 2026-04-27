# VoteGuide AI 🗳️

VoteGuide AI is an **elite production-grade** web assistant designed to help Indian citizens navigate the election process with ease. Built with React, Vite, and strict **TypeScript**, it serves as a lightweight, secure conversation agent that walks users through checking eligibility, voter registration, managing Voter ID issues, and finding polling booths.

## Core Features ✨

- **Strict Type Safety**: The entire codebase is written in robust TypeScript with strongly typed state nodes and user sessions.
- **Zod Security Validation**: Runtime validation blocks any malformed inputs or XSS vectors, combined with DOMPurify sanitization.
- **Smart Session Resumption**: Utilizes `localStorage` combined with Firebase Firestore to instantly restore your chat session if you accidentally refresh the page!
- **Interactive Maps**: Real-time mock interactive maps (`@vis.gl/react-google-maps`) that allow users to drag pins and simulate finding booths.
- **Perfect Accessibility (A11y)**: Deeply embedded WCAG compliance. Includes `role="log"`, `aria-live="polite"` for dynamic bot typing, programmatic focus management for inputs, and keyboard-only navigation.
- **End-to-End Test Coverage**: The `decisionEngine` state machine and full React flow are heavily tested via `vitest` and `@testing-library`.

## Architecture Diagram 🏗️

```text
User Input 
   │
   ▼ (Debounced & Sanitized)
[ InputBar ] ──────► Zod Validation & DOMPurify
                          │
                          ▼ (Valid payload)
                  [ decisionEngine.ts ] (State Machine)
                          │  - Evaluates current StateNode
                          │  - Determines branch (START -> ELIGIBILITY -> VOTE)
                          ▼
[ useChatFlow.ts ] ◄───── State Update
   │   │
   │   └─────► [ firebase.ts ] (Background Sync / Session Resume)
   ▼
[ ChatWindow ] (UI Render)
   │
   └──► [ MessageBubble ]
   └──► [ OptionsSelector ]
   └──► [ MapComponent ] (Lazy Loaded API)
```

## State Machine Flow
The assistant operates on a strict directed graph:
`START` → `AGE_CHECK` → `STATE_CHECK` → `REGISTERED_CHECK` → `VERIFY (Issues)` / `REGISTER (Form 6)` → `POLLING_BOOTH` → `ELECTION_TIMELINE` → `END`

Any deviation is caught and safely handled by the Decision Engine.

## Testing Strategy 🧪
We employ a multi-layered testing strategy:
1. **Unit Tests (`sanitization.test.ts`)**: Ensuring Zod bounds and malicious strings are caught.
2. **Logic Tests (`decisionEngine.test.ts`)**: Guaranteeing the FSM transitions are deterministic.
3. **Integration Tests (`ChatFlow.integration.test.tsx`)**: An E2E simulation using `jsdom` and `@testing-library/user-event` to simulate a user completing the entire flow.

Run tests:
```bash
npm run test -- --coverage
```

## Security & Reliability 🔐
- **Error Boundaries**: A global `ErrorBoundary` wraps the app to catch any unforeseen React rendering errors, preventing white screens of death.
- **Env Separation**: No secrets are exposed. Google Maps and Firebase keys are strictly injected via Vite's `import.meta.env`.

## Setup & Run Local
1. Create a `.env.local`:
```env
VITE_GOOGLE_MAPS_API_KEY=your_key
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_PROJECT_ID=your_id
# ... (see .env for full list)
```
2. Install & Start:
```bash
npm install
npm run dev
```
