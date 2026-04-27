# VoteGuide AI 🗳️

VoteGuide AI is a smart, interactive web-based assistant designed to help Indian citizens navigate the election process with ease. Built with React and Vite, the application features a modern, clean chat interface that guides users step-by-step through checking eligibility, voter registration, resolving Voter ID issues, and finding polling booths.

## Features ✨

- **Interactive Chat Interface**: A dynamic, conversational UI that feels natural and intuitive.
- **Bilingual Support (English & Hindi)**: Seamlessly toggle between English and Hindi to make the guide accessible to a wider audience.
- **Smart Progress Tracking**: A visual tracker that highlights the user's progress through the various stages of the election process (Eligibility, Details, Registration, Polling, Timeline).
- **Context-Aware Guidance**: The assistant adapts its responses based on user inputs like age and registration status.
- **Modern UI/UX**: Developed using vanilla CSS with premium styling, including glassmorphism, fluid animations, and a sleek dark-mode aesthetic.
- **Lightweight Architecture**: No bulky component libraries. The app is highly optimized and loads blazing fast.

## Technologies Used 🛠️

- **React.js**: Core frontend library for building the UI and managing state.
- **Vite**: Next-generation frontend tooling for rapid development and optimized builds.
- **Vanilla CSS**: Custom styling leveraging CSS variables, Flexbox, and modern layout techniques without external CSS frameworks.

## Project Structure 📁

```
vote-guide-ai/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable React components
│   │   ├── ChatWindow.jsx
│   │   ├── InputBar.jsx
│   │   ├── LanguageToggle.jsx
│   │   ├── MessageBubble.jsx
│   │   ├── OptionsSelector.jsx
│   │   └── ProgressTracker.jsx
│   ├── hooks/              # Custom React hooks
│   │   └── useChatFlow.js  # Chat logic and state machine
│   ├── utils/              # Helper functions and constants
│   │   └── constants.js    # Chat templates and multilingual strings
│   ├── App.jsx             # Main application container
│   ├── index.css           # Global styles and theme tokens
│   └── main.jsx            # Application entry point
├── index.html
├── package.json
└── vite.config.js
```

## Running the Project Locally 🚀

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Clone the repository** (if you haven't already):
   ```bash
   git clone https://github.com/adityabichhave/vote-guide-ai.git
   cd vote-guide-ai
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **View the app**:
   Open your browser and navigate to the local URL provided in the terminal (usually `http://localhost:5173`).

## Future Roadmap 🗺️
- **Google Maps API Integration**: Replace the placeholder visual with a live Google Map to help users locate their exact polling booths.
- **Firebase Backend Setup**: Add a backend to store user sessions and save chat history securely.
- **State-Specific Guidelines**: Incorporate APIs to fetch state-specific election dates and localized guidelines dynamically.

## License 📄
This project is open-source and available under the [MIT License](LICENSE).
