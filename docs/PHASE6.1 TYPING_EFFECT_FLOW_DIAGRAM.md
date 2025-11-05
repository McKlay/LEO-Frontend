# Typing Effect - Visual Flow Diagram

## Before Fix (Broken) ❌

```
User Message Sent
       ↓
Assistant Response Received
       ↓
┌─────────────────────────────────────┐
│  ChatMessage Component Renders      │
│                                     │
│  messageAge = now - timestamp       │ ← PROBLEM: Race condition
│  isNewMessage = (messageAge < 1000) │    May already be > 1000ms
│  shouldAnimate = false              │ ← Animation disabled!
└─────────────────────────────────────┘
       ↓
┌─────────────────────────────────────┐
│  useTypingEffect                    │
│  enabled = false                    │ ← No animation
│  displayedText = full text          │
└─────────────────────────────────────┘
       ↓
┌─────────────────────────────────────┐
│  UI Renders                         │
│  ┌──────────────────────────┐      │
│  │ [Full text shown at once]│      │ ← Step 2: Sudden appearance
│  └──────────────────────────┘      │
│                                     │
│  showActions = true                 │
│  [No citations visible]             │ ← Step 3: Missing until refresh
│  [No suggestions visible]           │
└─────────────────────────────────────┘
```

---

## After Fix (Working) ✅

```
User Message Sent
       ↓
Assistant Response Received
       ↓
┌─────────────────────────────────────┐
│  ChatContext.sendMessage()          │
│                                     │
│  assistantMessage = {               │
│    ...                              │
│    isNew: true  ←────────────────┐  │ ✅ FIX 1: Explicit flag
│  }                                │  │
└───────────────────────────────────┼──┘
                                    │
       ↓                            │
┌─────────────────────────────────┼──┐
│  ChatMessage Component          │  │
│                                 │  │
│  shouldAnimate = message.isNew──┘  │ ✅ Reliable detection
│  showActions = false               │
└─────────────────────────────────────┘
       ↓
┌─────────────────────────────────────┐
│  useTypingEffect                    │
│  enabled = true                     │
│                                     │
│  // Initial state                   │
│  initialChars = min(3, text.length) │ ✅ FIX 2: Start with chars
│  displayedText = "If " (3 chars)    │
│  indexRef.current = 3               │
│  isTyping = true                    │
└─────────────────────────────────────┘
       ↓
┌─────────────────────────────────────┐
│  UI Renders Frame 1 (T=0ms)         │
│  ┌──────────────────────────┐      │
│  │ If▌                      │      │ ← Immediate text visible
│  └──────────────────────────┘      │    (cursor blinking)
│                                     │
│  [Citations: hidden]                │
│  [Suggestions: hidden]              │
└─────────────────────────────────────┘
       ↓
┌─────────────────────────────────────┐
│  Interval Tick (T=16ms)             │
│                                     │
│  indexRef.current = 6               │
│  displayedText = "If you"           │
└─────────────────────────────────────┘
       ↓
┌─────────────────────────────────────┐
│  UI Renders Frame 2 (T=16ms)        │
│  ┌──────────────────────────┐      │
│  │ If you▌                  │      │ ← Typing animation
│  └──────────────────────────┘      │
└─────────────────────────────────────┘
       ↓
      ...  (typing continues)
       ↓
┌─────────────────────────────────────┐
│  Interval Complete (T=Xms)          │
│                                     │
│  indexRef.current = text.length     │
│  displayedText = full text          │
│  isTyping = false                   │
│                                     │
│  onCompleteRef.current() ────────┐  │ ✅ FIX 3: Stable callback
└───────────────────────────────────┼──┘
                                    │
       ↓                            │
┌─────────────────────────────────┼──┐
│  Callback Fires                 │  │
│                                 │  │
│  setShowActions(true) ──────────┘  │
└─────────────────────────────────────┘
       ↓
┌─────────────────────────────────────┐
│  UI Renders Final State             │
│  ┌──────────────────────────┐      │
│  │ If you are terminated... │      │ ← Complete text
│  └──────────────────────────┘      │
│                                     │
│  ┌─ Legal References ──────┐       │
│  │ [1] Labor Code Art. 297  │ ✅    │ ← Citations visible
│  │ [2] Labor Code Art. 298  │      │
│  └──────────────────────────┘      │
│                                     │
│  [Contact DOLE] [File SEnA]   ✅    │ ← Suggestions visible
└─────────────────────────────────────┘
       ↓
┌─────────────────────────────────────┐
│  Message Saved to Storage           │
│                                     │
│  messagesToSave = messages.map(msg  │
│    const { isNew, ...rest } = msg   │ ✅ FIX 4: Strip flag
│    return rest                      │
│  )                                  │
└─────────────────────────────────────┘
       ↓
┌─────────────────────────────────────┐
│  localStorage                       │
│  {                                  │
│    id: "123",                       │
│    content: "...",                  │
│    citations: [...],                │
│    // NO isNew flag ✅               │
│  }                                  │
└─────────────────────────────────────┘
```

---

## Historical Message Load (No Animation) ✅

```
Page Refresh / Conversation Switch
       ↓
┌─────────────────────────────────────┐
│  conversationApi.loadConversation() │
│                                     │
│  messages = JSON.parse(data)        │
│  // Messages have NO isNew flag ✅   │
└─────────────────────────────────────┘
       ↓
┌─────────────────────────────────────┐
│  ChatMessage Component              │
│                                     │
│  shouldAnimate = message.isNew      │
│               = undefined           │ ← No flag = no animation
│               = false               │
│  showActions = true                 │ ← Immediate display
└─────────────────────────────────────┘
       ↓
┌─────────────────────────────────────┐
│  useTypingEffect                    │
│  enabled = false                    │
│  displayedText = full text          │ ← Immediate full text
└─────────────────────────────────────┘
       ↓
┌─────────────────────────────────────┐
│  UI Renders (Instant)               │
│  ┌──────────────────────────┐      │
│  │ If you are terminated... │      │ ← Full text immediate
│  └──────────────────────────┘      │
│                                     │
│  ┌─ Legal References ──────┐       │
│  │ [1] Labor Code Art. 297  │      │ ← Citations immediate
│  │ [2] Labor Code Art. 298  │      │
│  └──────────────────────────┘      │
│                                     │
│  [Contact DOLE] [File SEnA]        │ ← Suggestions immediate
└─────────────────────────────────────┘
```

---

## Key Timing Comparison

### Before Fix
```
T=0ms:     Message arrives
T=???:     Blank white space appears        ← PROBLEM
T=???:     Full text suddenly appears       ← PROBLEM
T=refresh: Citations/suggestions appear     ← PROBLEM
```

### After Fix
```
T=0ms:     Message arrives
T=0ms:     First 3 chars visible            ← FIXED
T=16ms:    +3 chars (typing...)
T=32ms:    +3 chars (typing...)
...
T=Xms:     Full text complete
T=Xms:     Citations fade in                ← FIXED
T=Xms:     Suggestions fade in              ← FIXED
```

### Historical Messages
```
T=0ms:     Page loads
T=0ms:     All content visible              ← FIXED
           (No animation needed)
```

---

## State Flow Diagram

```
                    ┌──────────────────┐
                    │  New Message     │
                    │  isNew: true     │
                    └────────┬─────────┘
                             │
                    ┌────────▼─────────┐
                    │  shouldAnimate   │
                    │  = true          │
                    └────────┬─────────┘
                             │
                    ┌────────▼─────────┐
                    │  showActions     │
                    │  = false         │
                    └────────┬─────────┘
                             │
                    ┌────────▼─────────┐
                    │  Typing Effect   │
                    │  displayedText   │
                    │  grows...        │
                    └────────┬─────────┘
                             │
                    ┌────────▼─────────┐
                    │  onComplete()    │
                    │  fires           │
                    └────────┬─────────┘
                             │
                    ┌────────▼─────────┐
                    │  showActions     │
                    │  = true          │
                    └────────┬─────────┘
                             │
           ┌─────────────────▼──────────────────┐
           │                                    │
    ┌──────▼─────┐                    ┌────────▼────────┐
    │ Citations  │                    │  Suggestions    │
    │ visible    │                    │  visible        │
    └──────┬─────┘                    └────────┬────────┘
           │                                    │
           └─────────────────┬──────────────────┘
                             │
                    ┌────────▼─────────┐
                    │  Save to Storage │
                    │  (isNew removed) │
                    └──────────────────┘
```

---

## Component Interaction

```
┌─────────────────────────────────────────────────────┐
│                    ChatContext                      │
│                                                     │
│  sendMessage() {                                    │
│    assistantMessage.isNew = true ───────────┐      │
│    setMessages([...prev, assistantMessage])  │      │
│  }                                           │      │
└──────────────────────────────────────────────┼──────┘
                                               │
                                               │
┌──────────────────────────────────────────────▼──────┐
│                    ChatMessage                      │
│                                                     │
│  useEffect(() => {                                  │
│    shouldAnimate = message.isNew ───────────┐      │
│  }, [message])                               │      │
│                                              │      │
│  useTypingEffect({                           │      │
│    enabled: shouldAnimate ◄──────────────────┘      │
│    onComplete: () => setShowActions(true) ──┐      │
│  })                                          │      │
│                                              │      │
│  {showActions && citations} ◄────────────────┤      │
│  {showActions && suggestions} ◄──────────────┘      │
└─────────────────────────────────────────────────────┘
                       │
                       │
┌──────────────────────▼──────────────────────────────┐
│                 useTypingEffect                     │
│                                                     │
│  useEffect(() => {                                  │
│    if (enabled) {                                   │
│      displayedText = first 3 chars ──────────┐     │
│      setInterval(() => {                      │     │
│        displayedText += more chars            │     │
│        if (done) onCompleteRef.current() ─────┼──┐  │
│      })                                       │  │  │
│    }                                          │  │  │
│  }, [text, speed, enabled])                  │  │  │
└───────────────────────────────────────────────┼──┼──┘
                                                │  │
                                                │  │
                                                ▼  ▼
                                        ┌──────────────┐
                                        │  UI Updates  │
                                        │  Smooth!     │
                                        └──────────────┘
```
