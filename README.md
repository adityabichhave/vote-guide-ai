# VoteGuide AI 🗳️

VoteGuide AI is a production-ready, highly interactive web-based assistant designed to help Indian citizens navigate the election process with ease. Built with React and Vite, it serves as a lightweight, smart conversation agent that walks users through checking eligibility, voter registration, managing Voter ID issues, and finding polling booths.

This project was recently refactored to prioritize high-level **Code Quality, Security, Accessibility, and Testing**.

## Problem Statement
The Indian electoral process involves complex multi-step rules spanning age limits, residency checks, and physical documentation. Navigating portals for forms (Form 6, Form 8) or finding a polling booth often confuses new voters. VoteGuide AI solves this by condensing the rules into an adaptive, conversational "decision engine" that holds the user's hand through exactly what they need based on dynamic questions.

## Features ✨

- **Smart Decision Engine**: An extensible state machine dictating conversational flows dynamically based on real-time user input.
- **Google Maps API Integration**: Renders real map instances using `@vis.gl/react-google-maps` to help users locate polling booths visually.
- **Firebase Session Sync**: Background structured syncing of user conversation steps into Firebase Firestore.
- **Bilingual Support**: Instant toggling between English and Hindi.
- **Performance Optimized**: Achieved using `React.memo`, `useCallback`, and dynamic lazy loading (`React.lazy`) of heavy map components.
- **Top-Tier Accessibility (A11y)**: Complete with `aria-live` polite regions, `aria-labels`, `role` assignments, and full keyboard tabbability for screen readers.
- **Security Sanitization**: Implementation of DOMPurify to aggressively strip any unexpected HTML tags from input vectors.

## Project Architecture 📁

```text
vote-guide-ai/
├── src/
│   ├── components/         # Reusable, memoized UI Components
│   │   ├── ChatWindow.jsx  # Primary conversation log with aria-live bounds
│   │   ├── MapComponent.jsx# Lazy-loaded Google Maps provider
│   │   └── ...
│   ├── hooks/              # Custom React hooks
│   │   └── useChatFlow.js  # Manages messages, typing states, user context
│   ├── services/           # External API integration
│   │   └── firebase.js     # Firebase app initialization and Firestore wrappers
│   ├── utils/              # Pure Logic 
│   │   ├── decisionEngine.js # Evaluates user input against the FSM
│   │   └── sanitization.js # Input sanitization and validators
│   ├── __tests__/          # Vitest suites
│   ├── App.jsx             # Main container
│   ├── index.css           # Vanilla CSS Design System
│   └── main.jsx
├── .env                    # Environment variables
├── vercel.json             # Vercel deployment rewrite rules
└── vitest.config.js        # Test runner setup
```

## Setup Instructions 🚀

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed.

### 2. Environment Variables
Create a `.env.local` file in the root directory by copying the `.env` template:
```env
VITE_GOOGLE_MAPS_API_KEY=your_actual_key
VITE_FIREBASE_API_KEY=your_actual_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_id
VITE_FIREBASE_STORAGE_BUCKET=your_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 3. Installation
```bash
git clone https://github.com/adityabichhave/vote-guide-ai.git
cd vote-guide-ai
npm install
```

### 4. Running Locally
```bash
npm run dev
```

## Testing Instructions 🧪

The project uses `vitest` and `@testing-library/react` for robust unit testing of the pure logic engines (Sanitization and Decision Engine).
To run the test suites:
```bash
npm run test
```

## Deployment
This project is configured out-of-the-box for [Vercel](https://vercel.com).
The `vercel.json` ensures that client-side routing works flawlessly.
You can deploy it directly via the Vercel CLI:
```bash
npm i -g vercel
vercel
```

## License 📄
This project is open-source and available under the [MIT License](LICENSE).
