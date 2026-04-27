# 1. PROJECT TITLE
**VoteGuide AI**  
"An intelligent assistant that guides users through the election process in India."

---

# 2. PROBLEM STATEMENT
Many users, especially first-time voters, don't fully understand the steps required to participate in an election. The lack of clarity around eligibility, registration forms (like Form 6 or Form 8), and locating polling booths causes confusion and ultimately leads to low democratic participation.

---

# 3. SOLUTION OVERVIEW
VoteGuide AI is an **AI-powered assistant** designed to solve this problem. It provides **interactive, step-by-step guidance** through the complex electoral process. By asking targeted questions, it personalizes the guidance based on the user's age, state, and registration status, ensuring every citizen knows exactly what to do.

---

# 4. KEY FEATURES
- **Context-aware decision engine**: Dynamically branches logic based on your inputs.
- **Step-by-step election guidance**: A clear path from checking eligibility to election day.
- **Issue resolution**: Specific workflows for a lost Voter ID or missing name.
- **Firebase session persistence**: Never lose your chat progress, even if you refresh the page.
- **Google Maps polling booth simulation**: Interactive pin-dropping to simulate locating a booth.
- **Accessible chat interface**: Full ARIA support for screen readers.
- **Responsive design**: Beautiful glassmorphism UI optimized for desktop and mobile.

---

# 5. SYSTEM ARCHITECTURE
The project follows a strict modular architecture to separate concerns and ensure high code quality:

- `/core` & `/utils` → **decision engine**: Houses the core state machine and sanitization logic.
- `/components` → **UI**: React components isolated for reusability (ChatWindow, InputBar, etc.).
- `/services` → **APIs**: Firebase initialization and Google Maps handling.
- `/hooks` → **state management**: Custom React hooks (`useChatFlow.ts`) bridging UI and logic.
- `/types` → **interfaces**: Strict TypeScript definitions for all data structures.

This structure allows the **State-based flow system** to remain independent from the UI, ensuring smooth testing and scalability.

---

# 6. DECISION FLOW
The assistant follows a formal state machine architecture:
`START` → `CHECK ELIGIBILITY` → `REGISTER` → `VERIFY` → `VOTE` → `COMPLETE`

The assistant adapts based on user input. For example:
- If a user inputs an age `<18`, the flow terminates with educational information.
- If a user is `Already Registered`, the system skips the registration forms and moves directly to Voter ID verification and polling booth simulation.

---

# 7. GOOGLE SERVICES INTEGRATION
VoteGuide AI uses Google Cloud services securely to power the experience:

- **Google Maps API**:  
  Used to simulate a polling booth location. The `@vis.gl/react-google-maps` library provides an interactive map where users can drag a pin, demonstrating how they will find their actual booth on election day.
  
- **Firebase (Firestore)**:  
  Used to store user sessions and progress. As you chat, your progress is synced in the background. If you reload the tab, the system fetches your session and seamlessly resumes the conversation.

*Note: All API keys are used securely via environment variables (`import.meta.env`) and are never exposed in the source code.*

---

# 8. SECURITY PRACTICES
Security is a top priority for this application:
- **Input validation**: Handled strictly via **Zod** schemas to prevent malformed data from breaking the state machine.
- **XSS prevention**: All inputs are aggressively sanitized using **DOMPurify** before rendering.
- **Environment variables (`.env`)**: Sensitive credentials are kept out of version control.
- **No hardcoded secrets**: The app gracefully degrades (e.g., showing mock UI) if API keys are missing.

---

# 9. PERFORMANCE OPTIMIZATION
- **Lazy loading**: Heavy components like the interactive Google Map are loaded asynchronously via `React.lazy()` to shrink the initial bundle size.
- **Memoization**: All components use `React.memo`, and functions use `useCallback` to prevent unnecessary React re-renders during chat typing.
- **Efficient state updates**: Debounced inputs prevent spam-clicking and excessive state mutations.

---

# 10. TESTING STRATEGY
The project utilizes `Vitest` and `React Testing Library` for deep confidence:
- **Unit tests**: Targeting the `decisionEngine` and `sanitization` utilities.
- **Integration tests**: E2E simulation using `jsdom` where a virtual user navigates the entire flow from start to finish.
- **Edge cases tested**: 
  - Underage user (blocked flow)
  - Already registered user (skipped registration)
  - Missing voter ID (issue resolution flow)

**To run the test suite with coverage:**
```bash
npm run test -- --coverage
```

---

# 11. ACCESSIBILITY
This application was built with true WCAG compliance in mind:
- **ARIA labels**: Applied to all interactive elements, buttons, and forms.
- **Keyboard navigation**: The entire chat can be navigated and operated using only the `Tab` and `Enter` keys.
- **Screen reader support**: Uses `aria-live="polite"` and `role="log"` to dynamically read out the assistant's typing indicator and responses.
- **Focus management**: Programmatically returns focus to the input box after a message is sent.

---

# 12. SETUP INSTRUCTIONS

```bash
git clone https://github.com/adityabichhave/vote-guide-ai.git
cd vote-guide-ai
npm install

# Create a .env.local file and add your VITE_GOOGLE_MAPS_API_KEY and VITE_FIREBASE_* keys.

npm run dev
```

---

# 13. DEPLOYMENT
- Deployed securely and globally using **Vercel**.
- The `vercel.json` rewrite rules ensure client-side routing is optimized for fast loading and stability.

---

# 14. ASSUMPTIONS
- The user is based in India and is inquiring about the Indian Electoral Process.
- The user has basic internet access to load the interactive components.

---

# 15. FUTURE IMPROVEMENTS
- **Real election data APIs**: Connecting to live ECI endpoints for real-time booth fetching.
- **Multi-language support**: Expanding beyond English/Hindi to regional languages (Marathi, Tamil, Bengali).
- **Voice assistant**: Adding Speech-to-Text for an even more accessible experience.

---

# 16. LIVE DEMO + GITHUB
- **Live Link**: [https://vote-guide-ai-six.vercel.app](https://vote-guide-ai-six.vercel.app)
- **GitHub**: [https://github.com/adityabichhave/vote-guide-ai](https://github.com/adityabichhave/vote-guide-ai)
