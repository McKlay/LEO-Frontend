# Copilot Instructions - Labor Law Chatbot

## Project Overview

AI-powered legal guidance application providing accessible labor law information for Philippine workers. Built with React, TypeScript, Vite, and Tailwind CSS, focusing on multilingual support (Filipino, English, Cebuano) and user-centric design.

---

## Technology Stack & Best Practices

### Core Technologies
- React (functional components with Hooks only)
- TypeScript (strict type safety, avoid `any`)
- Vite (build tool)
- Tailwind CSS (styling)
- Supabase (backend/conversation storage)

### Development Principles
- Functional components only, max 200-300 lines per component
- Custom hooks for shared logic
- Context API for global state (language, user settings)
- Memoization for performance (React.memo, useCallback, useMemo)
- Lazy loading for large content
- Semantic HTML with ARIA attributes
- Full keyboard navigation support

---

## Project Architecture - Modular Design

### Directory Structure

```
src/
├── components/              # Modular UI components
│   ├── Header/             # Header with language toggle
│   ├── Sidebar/            # Conversation list and sidebar
│   ├── ChatArea/           # Chat display, messages, citations, suggested actions
│   ├── ChatInput/          # Input field and controls
│   ├── WelcomeScreen/      # Initial screen with quick questions
│   └── Common/             # Shared components (Button, Badge, Modal, LoadingSpinner)
│
├── hooks/                  # Custom React hooks
│   ├── useLanguage.ts      # Language preference & switching
│   ├── useChat.ts          # Chat logic (send, receive, history)
│   ├── useConversation.ts  # Conversation management
│   ├── useLocalStorage.ts  # Persistent user preferences
│   └── useCodeSwitch.ts    # Multilingual code-switching logic
│
├── context/                # React Context for global state
│   ├── LanguageContext.tsx # Language provider
│   ├── ChatContext.tsx     # Chat state provider
│   └── UIContext.tsx       # UI state (sidebar, modals)
│
├── services/               # Business logic & API calls
│   ├── api/                # API integration (chat, conversation, Supabase)
│   ├── llm/                # LLM service and response parsing
│   ├── language/           # Language detection, code-switching, translations
│   └── utils/              # Message formatting, validation
│
├── types/                  # TypeScript definitions
│   ├── chat.ts            # Message, Conversation, Citation types
│   ├── language.ts        # Language enum & types
│   └── api.ts             # API response types
│
├── utils/                 # Pure utility functions
│   ├── i18n.ts            # i18n configuration
│   └── constants.ts       # App constants
│
├── styles/               # Global styles
│   ├── index.css         # Tailwind imports
│   └── variables.css     # CSS variables
│
├── App.tsx               # Root component
└── main.tsx              # Entry point
```

### Architecture Principles
- **Single Responsibility**: Each component/hook/service has one primary purpose
- **Separation of Concerns**: UI logic separate from business logic and API calls
- **Component Composition**: Build complex UIs from small, focused components
- **Custom Hooks**: Extract reusable logic into hooks
- **Service Layer**: All API calls and business logic in services, not components

---

## Critical Requirements

### 1. Multilingual Support
**Supported Languages:** Filipino (Tagalog), English, Cebuano (Bisaya)

**Implementation:**
- Auto-detect user's language on first visit
- Persist language preference in localStorage
- Support code-switching (e.g., Taglish, Bisaya-English mix)
- Language toggle in header
- All UI text uses localization keys for easy translation
- Future-ready for additional Philippine languages (Ilonggo, Kapampangan, etc.)

**Language-Specific Guidelines:**
- Use plain language, avoid excessive legal jargon
- Explain legal terms in parentheses
- Use italics/quotes when mixing English terms in local languages
- Match formal but friendly tone across all languages
- Contemporary, accessible phrasing for Filipino/Cebuano

### 2. Citations & Credibility
- Always cite specific law/regulation (e.g., "Article 297 of the Labor Code")
- Display citations in collapsible section within bot responses
- Include "View Source" links to legal documents
- Format: Full law name + article/section + context
- Clear disclaimer: "This is AI, not legal advice"

### 3. Usefulness & Actionability
- End responses with 3-4 concrete suggested actions (buttons)
- Examples: "Contact DOLE", "File SEnA Request", "Find a Lawyer"
- Provide step-by-step guidance using numbered lists
- Include DOLE Hotline: 1349
- Links to forms, office locators, procedures

### 4. Clarity & Comprehensibility
**Target: 5/5 user rating for clarity**
- Plain language for non-lawyers
- Visual hierarchy (bold for key info, numbered lists)
- Legal citations visually distinct from explanations
- Minimum 16px font size, 1.6 line-height
- Break long paragraphs into digestible segments

### 5. Interactive Multi-Turn Conversation
- Maintain conversation history for context
- Ask clarifying questions when needed
- Personalize advice based on user details
- Reference previous answers in follow-ups
- Natural dialogue feel, empathetic tone

### 6. Trust & Safety
- State limitations clearly
- Suggest professional consultation for complex cases
- Display privacy policy/disclaimer prominently
- Refuse inappropriate requests politely
- Redirect off-topic questions professionally

---

## UI/UX Design Requirements

### Chat Interface
**Currently Implemented:**
- User messages: right-aligned, blue background
- Bot messages: left-aligned, white/light background
- Conversation sidebar with history
- Language toggle (top right)
- Attachment button in input area
- Legal References section (collapsible)
- Suggested Actions section (clickable buttons)
- Send button with input field

**Planned Enhancements:**
- Save/export conversations
- Email transcript option
- Font size adjustment
- High contrast mode
- Typing indicator
- Message timestamps

### Welcome Screen
- Welcoming header in user's language
- Brief purpose explanation
- Sample questions as clickable buttons
- Examples: "What are my rights if I'm terminated?", "Am I entitled to overtime pay?"

### Response Structure
1. Main explanation/answer
2. Legal References section (collapsible with citations)
3. Suggested Actions (clickable buttons)
4. Polite closing

### Accessibility
- Semantic HTML elements
- ARIA attributes for interactive elements
- Keyboard navigation support
- Screen reader compatible
- Mobile-responsive design
- WCAG AAA contrast ratios (7:1)

---

## Performance Targets

| Metric | Target |
|--------|--------|
| Ease of Use | 4.5/5 |
| Answer Clarity | 4.5/5 |
| Helpfulness | 4.5/5 |
| Trust | 4.0/5 |
| Would Use Again | 4.5/5 |
| Response Time | < 5 seconds |
| Page Load | < 2 seconds |

---

## Development Guidelines

### Code Style
- Components: PascalCase
- Hooks: camelCase with 'use' prefix
- Services: camelCase
- Constants: UPPER_SNAKE_CASE
- CSS: kebab-case or Tailwind utilities

### File Organization
```typescript
// Import order:
// 1. React imports
// 2. Third-party imports
// 3. Local imports (components, hooks, services)
// 4. Styles
```

### Type Safety
- Explicit TypeScript interfaces for all props
- Avoid `any`, use `unknown` with type guards
- Discriminated unions for complex states
- Export types for reusability

### Before Committing
- Run type check
- Run linter
- Test build
- Verify responsive design
- Test multilingual content
- Check accessibility (keyboard nav, screen reader)

---

## Common Patterns

### ✅ Do:
- Extract reusable logic into custom hooks
- Use Context API to avoid prop drilling
- Separate API calls into service layer
- Keep components small and focused
- Memoize expensive operations
- Use proper error boundaries

### ❌ Don't:
- Mix business logic with UI components
- Create monolithic 500+ line components
- Pass props through many levels
- Use `any` type
- Make API calls directly in components
- Ignore accessibility requirements

---

## Key Success Factors

1. **Modular Architecture**: Each file has single responsibility
2. **Multilingual by Design**: Not translated, but natively multilingual
3. **Citation-Driven**: Every legal claim has reference
4. **Action-Oriented**: Clear next steps for users
5. **Trust Through Transparency**: Honest about AI limitations
6. **Accessible to All**: Non-lawyers, mobile users, screen readers

---

**Last Updated:** October 21, 2025
