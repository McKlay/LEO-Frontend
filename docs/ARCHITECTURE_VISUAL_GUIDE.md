# Visual Architecture Guide

**Purpose:** Visual representation of current vs. target architecture

---

## 🏗️ Current Architecture (Problematic)

```
┌─────────────────────────────────────────────────────────┐
│                        App.tsx                          │
│                      (232 lines)                        │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │ • State Management (useState x7)                 │  │
│  │ • Language switching logic                       │  │
│  │ • Conversation management                        │  │
│  │ • Message handling                               │  │
│  │ • Mock response generation                       │  │
│  │ • UI rendering                                   │  │
│  │ • Scroll behavior                                │  │
│  │ • Typing indicator                               │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
│         ↓              ↓              ↓                 │
│   Components     Components     Components              │
│   (Header)       (Sidebar)      (ChatArea)             │
└─────────────────────────────────────────────────────────┘

❌ PROBLEMS:
- Single Responsibility Principle violated
- Hard to test
- Hard to maintain
- State scattered everywhere
- Business logic mixed with UI
- No reusability
```

---

## ✅ Target Architecture (Modular)

```
┌─────────────────────────────────────────────────────────────────┐
│                          App.tsx                                │
│                      (<100 lines - Orchestrator)                │
│                                                                 │
│  ┌────────────────────────────────────────────────────────┐    │
│  │  • Renders layout structure                           │    │
│  │  • Wraps app in Context Providers                     │    │
│  │  • Minimal logic (just composition)                   │    │
│  └────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                     Context Providers                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │ Language     │  │ Chat         │  │ UI           │         │
│  │ Context      │  │ Context      │  │ Context      │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                       Custom Hooks                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │ useLanguage  │  │ useChat      │  │ useConver-   │         │
│  │              │  │              │  │ sation       │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐                           │
│  │ useLocal-    │  │ useCode-     │                           │
│  │ Storage      │  │ Switch       │                           │
│  └──────────────┘  └──────────────┘                           │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                       Service Layer                             │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    API Services                         │   │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐       │   │
│  │  │ chatApi    │  │ conversa-  │  │ userApi    │       │   │
│  │  │            │  │ tionApi    │  │ (future)   │       │   │
│  │  └────────────┘  └────────────┘  └────────────┘       │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                  LLM Services                           │   │
│  │  ┌────────────┐  ┌────────────┐                        │   │
│  │  │ llmService │  │ response   │                        │   │
│  │  │            │  │ Parser     │                        │   │
│  │  └────────────┘  └────────────┘                        │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │               Language Services                         │   │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐       │   │
│  │  │ language   │  │ code-      │  │ transla-   │       │   │
│  │  │ Detection  │  │ switching  │  │ tion       │       │   │
│  │  └────────────┘  └────────────┘  └────────────┘       │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                  Utility Services                       │   │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐       │   │
│  │  │ message    │  │ citation   │  │ validation │       │   │
│  │  │ Formatter  │  │ Validator  │  │            │       │   │
│  │  └────────────┘  └────────────┘  └────────────┘       │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                         Components                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │ Header       │  │ Sidebar      │  │ ChatArea     │         │
│  │ (<100 lines) │  │ (<150 lines) │  │ (<200 lines) │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐                           │
│  │ ChatInput    │  │ Welcome      │                           │
│  │ (<100 lines) │  │ Screen       │                           │
│  └──────────────┘  └──────────────┘                           │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                 Common Components                       │   │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐       │   │
│  │  │ Button     │  │ Modal      │  │ Loading    │       │   │
│  │  │            │  │            │  │ Spinner    │       │   │
│  │  └────────────┘  └────────────┘  └────────────┘       │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘

✅ BENEFITS:
- Single Responsibility Principle followed
- Easy to test (unit test hooks/services independently)
- Easy to maintain (find code quickly)
- Reusable logic (hooks used across components)
- Clear separation: UI vs Logic vs API
- Scalable (add features without touching existing code)
```

---

## 📁 File Structure Comparison

### Current (Flat & Incomplete)

```
src/
├── components/
│   ├── ChatInput.tsx          (90 lines - OK)
│   ├── ChatMessage.tsx         (110 lines - OK)
│   ├── Header.tsx              (55 lines - OK)
│   ├── Sidebar.tsx             (95 lines - OK)
│   └── WelcomeScreen.tsx       (60 lines - OK)
├── types/
│   └── chat.ts                 (22 lines - OK)
├── utils/
│   └── i18n.ts                 (68 lines - OK)
├── App.tsx                     (232 lines - ❌ TOO BIG)
├── main.tsx
└── index.css
```

### Target (Modular & Complete)

```
src/
├── components/
│   ├── Header/
│   │   ├── Header.tsx
│   │   └── LanguageToggle.tsx     [NEW]
│   ├── Sidebar/
│   │   ├── Sidebar.tsx
│   │   ├── ConversationList.tsx   [NEW]
│   │   └── ConversationItem.tsx   [NEW]
│   ├── ChatArea/
│   │   ├── ChatArea.tsx           [NEW]
│   │   ├── MessageList.tsx        [NEW]
│   │   └── TypingIndicator.tsx    [NEW]
│   ├── ChatInput/
│   │   ├── ChatInput.tsx
│   │   ├── InputField.tsx         [NEW]
│   │   └── ActionButtons.tsx      [NEW]
│   ├── ChatMessage/
│   │   ├── ChatMessage.tsx
│   │   ├── CitationSection.tsx    [NEW]
│   │   └── SuggestionSection.tsx  [NEW]
│   ├── WelcomeScreen/
│   │   ├── WelcomeScreen.tsx
│   │   └── QuickQuestions.tsx     [NEW]
│   └── Common/                     [NEW]
│       ├── Button.tsx
│       ├── Badge.tsx
│       ├── Modal.tsx
│       ├── LoadingSpinner.tsx
│       ├── Tooltip.tsx
│       └── ErrorBoundary.tsx
│
├── hooks/                          [NEW]
│   ├── useLanguage.ts
│   ├── useChat.ts
│   ├── useConversation.ts
│   ├── useLocalStorage.ts
│   └── useCodeSwitch.ts
│
├── context/                        [NEW]
│   ├── LanguageContext.tsx
│   ├── ChatContext.tsx
│   └── UIContext.tsx
│
├── services/                       [NEW]
│   ├── api/
│   │   ├── chatApi.ts
│   │   ├── conversationApi.ts
│   │   └── supabaseClient.ts
│   ├── llm/
│   │   ├── llmService.ts
│   │   └── responseParser.ts
│   ├── language/
│   │   ├── languageDetection.ts
│   │   ├── codeSwitching.ts
│   │   └── translation.ts
│   └── utils/
│       ├── messageFormatter.ts
│       ├── citationValidator.ts
│       └── errorHandler.ts
│
├── types/
│   ├── chat.ts
│   ├── language.ts                 [NEW]
│   ├── api.ts                      [NEW]
│   └── service.ts                  [NEW]
│
├── utils/
│   ├── i18n.ts
│   ├── constants.ts                [NEW]
│   └── helpers.ts                  [NEW]
│
├── styles/                         [NEW]
│   ├── index.css
│   └── variables.css
│
├── App.tsx                         (Refactored to <100 lines)
├── main.tsx
└── vite-env.d.ts
```

---

## 🔄 Data Flow Diagram

### Current Data Flow (Tangled)

```
User Action
     ↓
Component (onClick)
     ↓
App.tsx (handles everything)
     ↓
setState (scattered)
     ↓
Re-render (entire tree)
```

### Target Data Flow (Clean)

```
User Action
     ↓
Component (onClick)
     ↓
Custom Hook (e.g., useChat.sendMessage)
     ↓
Service Layer (e.g., chatApi.sendMessage)
     ↓
Backend API (or mock)
     ↓
Response → Hook → Context → Component
     ↓
Re-render (only affected components)
```

---

## 🎯 Example: How to Refactor Message Sending

### Before (Current - In App.tsx)

```typescript
const handleSendMessage = async (content: string) => {
  const userMessage: Message = {
    id: Date.now().toString(),
    role: 'user',
    content,
    timestamp: new Date()
  };

  setMessages((prev) => [...prev, userMessage]);
  setIsTyping(true);

  setTimeout(() => {
    const responseContent = simulateAssistantResponse(content);
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: responseContent,
      timestamp: new Date(),
      citations: [...],
      suggestions: [...]
    };

    setMessages((prev) => [...prev, assistantMessage]);
    setIsTyping(false);

    // Conversation logic...
  }, 1500);
};
```

**Problems:**
- Mixed concerns (state, timing, response generation)
- Hard to test
- Hard to reuse
- Tightly coupled

---

### After (Target - Modular)

#### 1. Component (ChatInput.tsx)
```typescript
import { useChat } from '../hooks/useChat';

const ChatInput = () => {
  const { sendMessage, isTyping } = useChat();

  const handleSend = (content: string) => {
    sendMessage(content); // That's it!
  };

  // ... rest of component
};
```

#### 2. Custom Hook (hooks/useChat.ts)
```typescript
import { useContext } from 'react';
import { ChatContext } from '../context/ChatContext';

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) throw new Error('useChat must be used within ChatProvider');
  return context;
};
```

#### 3. Context Provider (context/ChatContext.tsx)
```typescript
import { chatApi } from '../services/api/chatApi';
import { messageFormatter } from '../services/utils/messageFormatter';

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async (content: string) => {
    const userMessage = messageFormatter.createUserMessage(content);
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    try {
      const response = await chatApi.sendMessage(content);
      const assistantMessage = messageFormatter.createAssistantMessage(response);
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      // Error handling
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <ChatContext.Provider value={{ messages, sendMessage, isTyping }}>
      {children}
    </ChatContext.Provider>
  );
};
```

#### 4. Service (services/api/chatApi.ts)
```typescript
import { llmService } from '../llm/llmService';

export const chatApi = {
  sendMessage: async (content: string) => {
    // In production: call backend API
    // For now: use mock
    const mockResponse = await llmService.generateMockResponse(content);
    return mockResponse;
  }
};
```

#### 5. LLM Service (services/llm/llmService.ts)
```typescript
export const llmService = {
  generateMockResponse: async (content: string) => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return {
      content: 'Mock response...',
      citations: [...],
      suggestions: [...]
    };
  }
};
```

**Benefits:**
- ✅ Each file has one purpose
- ✅ Easy to test each piece independently
- ✅ Easy to swap mock with real API
- ✅ Reusable across components
- ✅ Clear data flow

---

## 📊 Complexity Comparison

### Current Architecture

```
Complexity Score: 8/10 (Hard to Understand)

┌──────────────────────────────────────┐
│  App.tsx: 232 lines                  │
│  - 7 useState hooks                  │
│  - 5 functions (mixed concerns)      │
│  - Direct DOM manipulation           │
│  - Hardcoded logic                   │
│  - Props drilling                    │
└──────────────────────────────────────┘

Time to understand: ~30 minutes
Time to add feature: ~2 hours (risk breaking existing)
```

### Target Architecture

```
Complexity Score: 3/10 (Easy to Understand)

┌──────────────────────────────────────┐
│  App.tsx: <100 lines                 │
│  - Just renders layout + providers   │
│                                      │
│  useChat: 80 lines                   │
│  - Only chat logic                   │
│                                      │
│  ChatContext: 120 lines              │
│  - Only state management             │
│                                      │
│  chatApi: 50 lines                   │
│  - Only API calls                    │
└──────────────────────────────────────┘

Time to understand: ~10 minutes
Time to add feature: ~30 minutes (no risk)
```

---

## 🚀 Migration Path

### Step-by-Step Refactoring

```
Phase 1: Setup (30 min)
├─ Create directory structure
├─ Create empty files
└─ Update imports

Phase 2: Extract Hooks (2 hours)
├─ Create useLanguage
├─ Create useChat
├─ Create useConversation
└─ Create useLocalStorage

Phase 3: Create Contexts (1 hour)
├─ LanguageContext
├─ ChatContext
└─ UIContext

Phase 4: Build Services (2 hours)
├─ chatApi (mock)
├─ conversationApi (localStorage)
├─ llmService (mock)
└─ messageFormatter

Phase 5: Refactor App.tsx (1 hour)
├─ Remove all logic
├─ Add Context providers
├─ Simplify to < 100 lines
└─ Test everything

Phase 6: Create Common Components (2 hours)
├─ Button
├─ Modal
├─ LoadingSpinner
└─ Others as needed

Total Time: ~9 hours for full refactor
```

---

## ✅ Validation Checklist

After refactoring, verify:

- [ ] App.tsx is < 100 lines
- [ ] No business logic in components
- [ ] All API calls in service layer
- [ ] All state in Context
- [ ] All reusable logic in hooks
- [ ] Each file has single responsibility
- [ ] Easy to find where code lives
- [ ] Easy to test each piece
- [ ] Easy to add new features

---

## 📚 Further Reading

- **IMPLEMENTATION_ROADMAP.md** - Detailed feature list
- **ARCHITECTURE_EVALUATION.md** - Current state analysis
- **CHECKLIST.md** - Quick reference checklist

---

**Remember:** The goal is not perfection, but maintainability. 

**Good architecture enables fast feature development with low risk.**
