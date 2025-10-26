# LEO-Frontend: Labor Law Chatbot

AI-powered legal guidance application for Philippine labor law, built with React, TypeScript, Vite, and Tailwind CSS. Designed for multilingual support (Filipino, English, Cebuano) and accessible, actionable legal information for workers.

---

## 📋 Table of Contents
- [Features](#features)
- [Project Structure](#project-structure)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [Development](#development)
- [Architecture](#architecture)
- [Multilingual Support](#multilingual-support)
- [Accessibility & UX](#accessibility--ux)
- [Performance Targets](#performance-targets)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Disclaimer](#disclaimer)

---

## ✨ Features

### Core Functionality
- **Multilingual Chatbot:** Filipino (Tagalog), English, Cebuano with code-switching support (Taglish, Bisaya-English mix)
- **Legal Citations:** Every answer includes specific law references (e.g., "Article 297 of the Labor Code"), collapsible citation sections, and "View Source" links
- **Suggested Actions:** Actionable next steps with clickable buttons (Contact DOLE, File Complaint, Find Lawyer)
- **Conversation History:** Multi-turn, context-aware chat with sidebar navigation
- **Auto-Scroll:** Intelligent scrolling that respects user intent and provides visual indicators

### Advanced Features
- **Language Detection:** Auto-detects user's language preference on first visit
- **Code-Switching:** Supports natural mixing of languages within messages
- **Accessibility Settings:** Font size adjustment, high contrast mode, keyboard navigation
- **User Preferences:** Persistent language, accessibility, and UI settings via localStorage
- **Responsive Design:** Mobile-friendly with semantic HTML and ARIA attributes
- **Error Handling:** Comprehensive error boundaries and user-friendly error messages

### UI Components
- **Welcome Screen:** Interactive sample questions as clickable buttons
- **Chat Interface:** Distinct message bubbles (user: right-aligned blue, bot: left-aligned white)
- **Sidebar:** Conversation history with search and management features
- **Modals:** Contact forms, settings, feedback, and accessibility options
- **Common Components:** Reusable Button, Modal, LoadingSpinner, Badge, etc.

---

## 🏗️ Project Structure

```
src/
├── components/              # Modular UI components
│   ├── Header/             # Header with language toggle and accessibility settings
│   ├── Sidebar/            # Conversation list, search, and management
│   ├── ChatArea/           # Chat display with messages, citations, and actions
│   ├── ChatInput/          # Input field with attachment support and send controls
│   ├── WelcomeScreen/      # Initial screen with quick questions
│   └── Common/             # Shared components (Button, Modal, LoadingSpinner, etc.)
│
├── hooks/                  # Custom React hooks
│   ├── useLanguage.ts      # Language preference & switching
│   ├── useChat.ts          # Chat logic (send, receive, history)
│   ├── useConversation.ts  # Conversation management
│   ├── useLocalStorage.ts  # Persistent user preferences
│   ├── useAutoScroll.ts    # Intelligent auto-scrolling
│   ├── useKeyboardShortcuts.ts # Keyboard navigation
│   └── useUI.ts            # UI state management
│
├── context/                # React Context for global state
│   ├── LanguageContext.tsx # Language provider
│   ├── ChatContext.tsx     # Chat state provider
│   ├── UIContext.tsx       # UI state (sidebar, modals)
│   └── AccessibilityContext.tsx # Accessibility settings
│
├── services/               # Business logic & API calls
│   ├── api/                # API integration
│   │   ├── chatApi.ts      # Chat API with Supabase
│   │   ├── conversationApi.ts # Conversation management
│   │   └── feedbackApi.ts  # User feedback
│   ├── llm/                # LLM service and response parsing
│   │   └── llmService.ts   # LLM integration
│   ├── language/           # Language detection and code-switching
│   │   ├── languageDetection.ts
│   │   └── cebuanoLegalTerms.ts
│   └── utils/              # Utilities
│       ├── citationUtils.ts
│       └── errorHandler.ts
│
├── types/                  # TypeScript definitions
│   ├── chat.ts            # Message, Conversation, Citation types
│   ├── language.ts        # Language enum & types
│   ├── api.ts             # API response types
│   └── actions.ts         # Action types
│
├── utils/                 # Pure utility functions
│   ├── i18n.ts            # Internationalization configuration
│   └── constants.ts       # App constants
│
├── styles/               # Global styles
│   ├── index.css         # Tailwind imports
│   └── variables.css     # CSS variables
│
├── App.tsx               # Root component
└── main.tsx              # Entry point
```

---

## 🛠️ Technology Stack

### Core Technologies
- **React 18+** (Functional components with Hooks only)
- **TypeScript** (Strict type safety, no `any` types)
- **Vite** (Build tool for fast development)
- **Tailwind CSS** (Utility-first styling)
- **Supabase** (Backend for conversation storage and API)

### Development Tools
- **ESLint** (Code linting)
- **PostCSS** (CSS processing)
- **TypeScript Compiler** (Type checking)

### Key Libraries
- **React Router** (Client-side routing, if needed)
- **React Context API** (Global state management)
- **Custom Hooks** (Reusable logic extraction)
- **ARIA attributes** (Accessibility)

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18+ recommended)
- **npm** or **yarn**
- **Git** (for version control)

### Installation
```bash
# Clone the repository
git clone https://github.com/McKlay/LEO-Frontend.git
cd LEO-Frontend

# Install dependencies
npm install
```

### Development Server
```bash
npm run dev
```
Opens at `http://localhost:5173`

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Type Checking
```bash
npm run type-check
```

---

## 🏛️ Architecture

### Design Principles
- **Single Responsibility:** Each component/hook/service has one primary purpose
- **Separation of Concerns:** UI logic separate from business logic and API calls
- **Component Composition:** Build complex UIs from small, focused components
- **Custom Hooks:** Extract reusable logic into hooks
- **Service Layer:** All API calls and business logic in services, not components
- **Functional Components Only:** No class components
- **Memoization:** React.memo, useCallback, useMemo for performance
- **Lazy Loading:** For large content and routes

### State Management
- **Context API:** For global state (language, chat, UI, accessibility)
- **Local Component State:** useState for local UI state
- **Persistent State:** localStorage via useLocalStorage hook

### API Integration
- **Supabase:** For conversation storage and real-time features
- **RESTful APIs:** For chat and feedback services
- **Error Handling:** Comprehensive error boundaries and user feedback

---

## 🌐 Multilingual Support

### Supported Languages
1. **Filipino (Tagalog)** - Primary accessibility language
2. **English** - Professional and technical language
3. **Cebuano (Bisaya)** - Regional accessibility for Visayan speakers

### Key Features
- **Auto-Detection:** Detects user's language on first visit
- **Code-Switching:** Supports Taglish (Filipino-English) and Bisaya-English mixes
- **Persistent Preferences:** Language choice saved in localStorage
- **Dynamic Loading:** Language resources loaded on-demand
- **Regional Adaptation:** Wage rates, DOLE office locations, regional labor practices

### Language-Specific Guidelines
- **Filipino:** Plain language, explain legal terms in parentheses, use contemporary phrasing
- **English:** Professional but accessible, direct and clear
- **Cebuano:** Common Bisaya terms, avoid formal Spanish-influenced terminology

### Future Scalability
Built to easily add more Philippine languages (Ilonggo, Kapampangan, etc.) with localization keys.

---

## ♿ Accessibility & UX

### Accessibility Standards
- **WCAG AAA Compliance:** 7:1 contrast ratios, keyboard navigation, screen reader support
- **Semantic HTML:** Proper heading hierarchy, landmarks, and ARIA attributes
- **Keyboard Navigation:** Full keyboard support with shortcuts
- **Screen Reader:** Compatible with NVDA, JAWS, VoiceOver

### UX Design Requirements
- **Clarity:** 4.7/5 target rating for answer clarity (plain language for non-lawyers)
- **Usefulness:** 4.8/5 for "helped me understand what I can do"
- **Trust:** 5/5 average trust rating with transparent limitations
- **Interactivity:** Multi-turn conversations with clarifying questions

### UI Components
- **Message Bubbles:** User (right, blue), Bot (left, white)
- **Citation Sections:** Collapsible with full legal references
- **Action Buttons:** Clickable next steps (DOLE Hotline: 1349)
- **Visual Indicators:** Loading spinners, typing indicators, scroll buttons

---

## 📊 Performance Targets

| Metric | Target | Current Status |
|--------|--------|----------------|
| Ease of Use | 4.5/5 | ✅ Implemented |
| Answer Clarity | 4.5/5 | ✅ Implemented |
| Helpfulness | 4.5/5 | ✅ Implemented |
| Trust | 4.0/5 | ✅ Implemented |
| Would Use Again | 4.5/5 | ✅ Implemented |
| Response Time | < 5 seconds | 🔄 Backend-dependent |
| Page Load | < 2 seconds | ✅ Optimized |

---

## 🧪 Testing

### Testing Strategy
- **Unit Tests:** Component and hook testing with React Testing Library
- **Integration Tests:** API service testing
- **E2E Tests:** User flow testing with Playwright/Cypress
- **Accessibility Tests:** axe-core for automated WCAG compliance
- **Performance Tests:** Lighthouse for Core Web Vitals

### Quality Assurance
- **Multilingual Testing:** Native speakers review translations
- **Mobile Responsiveness:** iOS/Android tablet testing
- **Citation Accuracy:** Legal reference verification
- **Code Quality:** ESLint, TypeScript strict mode

### Running Tests
```bash
# Unit tests
npm run test

# E2E tests (if configured)
npm run test:e2e

# Accessibility audit
npm run audit:a11y
```

---

## 🤝 Contributing

### Development Workflow
1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/your-feature`
3. **Follow** code style and architecture guidelines
4. **Test** thoroughly (unit, integration, accessibility)
5. **Submit** a pull request

### Code Style Guidelines
- **Components:** PascalCase, functional only, max 200-300 lines
- **Hooks:** camelCase with 'use' prefix
- **Services:** camelCase
- **Constants:** UPPER_SNAKE_CASE
- **CSS:** kebab-case or Tailwind utilities
- **Imports:** React first, then third-party, then local (components, hooks, services)

### Commit Conventions
- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Testing
- `chore:` Maintenance

### Before Committing
- ✅ Run type check: `npm run type-check`
- ✅ Run linter: `npm run lint`
- ✅ Test build: `npm run build`
- ✅ Verify responsive design
- ✅ Test multilingual content
- ✅ Check accessibility (keyboard nav, screen reader)

---

## 📄 Documentation

Detailed documentation is available in the `docs/` directory:

- `IMPLEMENTATION_ROADMAP.md` - Development roadmap and status
- `UI-UX_DESIGN_REQUIREMENTS.md` - Design specifications
- `CHECKLIST.md` - Feature implementation checklist
- `PHASE*_COMPLETION_SUMMARY.md` - Phase-by-phase summaries
- `TESTING_GUIDE.md` - Testing procedures
- `ACCESSIBILITY_IMPLEMENTATION.md` - Accessibility details

---

## 📦 Deployment

### Environment Variables
Create a `.env` file with:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_API_BASE_URL=your_api_base_url
```

### Build Commands
```bash
# Production build
npm run build

# Preview build locally
npm run preview
```

### Deployment Platforms
- **Vercel:** Recommended for React apps
- **Netlify:** Alternative with good SPA support
- **GitHub Pages:** For static hosting

---

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

---

## 📞 Contact

- **DOLE Hotline:** 1349
- **Project Issues:** [GitHub Issues](https://github.com/McKlay/LEO-Frontend/issues)
- **Maintainers:** Contact via GitHub

### Support Resources
- [DOLE Website](https://www.dole.gov.ph)
- [Labor Code of the Philippines](https://www.officialgazette.gov.ph/labor-code/)
- [DOLE Office Locator](https://www.dole.gov.ph/regional-offices/)

---

## ⚠️ Disclaimer

**This chatbot provides AI-generated information based on Philippine labor law, not legal advice.** Always consult a qualified lawyer or the Department of Labor and Employment (DOLE) for complex cases. The information is for educational purposes only and may not cover all circumstances.

**Paalala:** Hindi ako abogado – nagbibigay lang ako ng impormasyon ayon sa batas. Para sa kumplikadong kaso, kumonsulta sa abogado o sa DOLE.

---

**Last Updated:** October 25, 2025
