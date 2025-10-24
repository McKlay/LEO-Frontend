# useAutoScroll Hook - Quick Reference

## Import

```typescript
import { useAutoScroll } from '../hooks/useAutoScroll';
```

## Basic Usage

```typescript
const {
  scrollContainerRef,  // Attach to scrollable element
  scrollAnchorRef,     // Attach to bottom marker
  scrollToBottom,      // Manual scroll function
  handleScroll,        // Scroll event handler
  performAutoScroll,   // Trigger auto-scroll
  isScrolledUp         // Boolean: user scrolled away from bottom
} = useAutoScroll({
  enabled: true,       // Optional, default: true
  behavior: 'smooth',  // Optional, default: 'smooth'
  threshold: 100       // Optional, default: 100px
});
```

## Complete Example

```tsx
function ChatComponent() {
  const [messages, setMessages] = useState<Message[]>([]);
  
  // Initialize hook
  const {
    scrollContainerRef,
    scrollAnchorRef,
    scrollToBottom,
    handleScroll,
    performAutoScroll,
    isScrolledUp
  } = useAutoScroll({
    behavior: 'smooth',
    threshold: 100
  });

  // Auto-scroll when messages change
  useEffect(() => {
    if (messages.length > 0) {
      performAutoScroll();
    }
  }, [messages, performAutoScroll]);

  return (
    <div 
      ref={scrollContainerRef}
      onScroll={handleScroll}
      className="overflow-y-auto h-full"
    >
      {messages.map(msg => (
        <div key={msg.id}>{msg.content}</div>
      ))}
      
      {/* Anchor at bottom */}
      <div ref={scrollAnchorRef} />
      
      {/* Optional: Scroll button */}
      {isScrolledUp && (
        <button onClick={() => scrollToBottom('smooth')}>
          Scroll to Bottom
        </button>
      )}
    </div>
  );
}
```

## API Reference

### Options

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `enabled` | `boolean` | `true` | Enable/disable auto-scroll |
| `behavior` | `'smooth' \| 'instant' \| 'auto'` | `'smooth'` | Scroll animation type |
| `threshold` | `number` | `100` | Distance from bottom (px) to consider "at bottom" |

### Return Values

| Property | Type | Description |
|----------|------|-------------|
| `scrollContainerRef` | `RefObject<HTMLElement>` | Ref for scrollable container |
| `scrollAnchorRef` | `RefObject<HTMLDivElement>` | Ref for bottom marker element |
| `isAtBottom` | `() => boolean` | Function to check if at bottom |
| `scrollToBottom` | `(behavior?: ScrollBehavior) => void` | Manual scroll to bottom |
| `handleScroll` | `() => void` | Scroll event handler |
| `performAutoScroll` | `() => void` | Trigger auto-scroll |
| `isScrolledUp` | `boolean` | Whether user is scrolled away from bottom |

## Common Patterns

### Pattern 1: Auto-scroll on data changes
```typescript
useEffect(() => {
  performAutoScroll();
}, [data, performAutoScroll]);
```

### Pattern 2: Different behaviors for different scenarios
```typescript
// Smooth for updates
useEffect(() => {
  if (items.length > 0) {
    performAutoScroll(); // Uses configured behavior
  }
}, [items]);

// Instant for new sessions
useEffect(() => {
  if (isNewSession) {
    scrollToBottom('instant');
  }
}, [isNewSession]);
```

### Pattern 3: Conditional auto-scroll
```typescript
useEffect(() => {
  // Only auto-scroll if there are new messages
  if (hasNewMessages && !isUserReadingHistory) {
    performAutoScroll();
  }
}, [hasNewMessages, isUserReadingHistory]);
```

### Pattern 4: Show scroll indicator
```tsx
{isScrolledUp && itemCount > 0 && (
  <FloatingButton onClick={() => scrollToBottom('smooth')}>
    New Items Available
  </FloatingButton>
)}
```

## Tips & Best Practices

### ✅ Do
- Use `performAutoScroll()` in useEffect for data changes
- Use `scrollToBottom()` for user-triggered actions
- Set appropriate threshold (100-150px recommended)
- Show visual indicator when `isScrolledUp` is true
- Use 'smooth' for regular scrolling, 'instant' for resets

### ❌ Don't
- Don't call `scrollToBottom()` on every render
- Don't use both auto-scroll and manual scroll simultaneously
- Don't set threshold too high (>200px) or too low (<50px)
- Don't forget to attach both refs (container and anchor)
- Don't call `performAutoScroll()` outside useEffect

## Troubleshooting

### Auto-scroll not working
1. Check that `scrollContainerRef` is attached to scrollable element
2. Verify `scrollAnchorRef` is at the bottom of content
3. Ensure `handleScroll` is attached to scroll event
4. Check `enabled` option is not `false`
5. Verify element has `overflow-y-auto` or similar

### Scroll interrupts user reading
1. Increase threshold value
2. Check that `handleScroll` is properly attached
3. Verify scroll detection logic is running
4. Test if `isAtBottom()` returns correct values

### Performance issues
1. Ensure refs are used (not state)
2. Check that callbacks are memoized
3. Verify no unnecessary re-renders
4. Consider increasing debounce delay

## Migration from Old Implementation

### Before (Direct scrollIntoView)
```typescript
const messagesEndRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
}, [messages]);

// In JSX
<div ref={messagesEndRef} />
```

### After (useAutoScroll hook)
```typescript
const { scrollContainerRef, scrollAnchorRef, performAutoScroll } = useAutoScroll();

useEffect(() => {
  performAutoScroll();
}, [messages, performAutoScroll]);

// In JSX
<div ref={scrollContainerRef} onScroll={handleScroll}>
  {/* content */}
  <div ref={scrollAnchorRef} />
</div>
```

## TypeScript Types

```typescript
interface UseAutoScrollOptions {
  enabled?: boolean;
  behavior?: ScrollBehavior;
  threshold?: number;
}

interface UseAutoScrollReturn {
  scrollContainerRef: React.RefObject<HTMLElement>;
  scrollAnchorRef: React.RefObject<HTMLDivElement>;
  isAtBottom: () => boolean;
  scrollToBottom: (behavior?: ScrollBehavior) => void;
  handleScroll: () => void;
  performAutoScroll: () => void;
  isScrolledUp: boolean;
}
```

## Example: Complex Chat Application

```tsx
function AdvancedChat() {
  const { messages, isTyping, hasNewMessages } = useChat();
  const { 
    scrollContainerRef, 
    scrollAnchorRef, 
    scrollToBottom,
    handleScroll,
    performAutoScroll,
    isScrolledUp 
  } = useAutoScroll({
    behavior: 'smooth',
    threshold: 120
  });

  // Auto-scroll on messages or typing
  useEffect(() => {
    if (messages.length > 0 || isTyping) {
      performAutoScroll();
    }
  }, [messages, isTyping, performAutoScroll]);

  // Instant scroll for new conversations
  useEffect(() => {
    if (messages.length === 0) {
      scrollToBottom('instant');
    }
  }, [messages.length, scrollToBottom]);

  return (
    <main 
      ref={scrollContainerRef} 
      onScroll={handleScroll}
      className="flex-1 overflow-y-auto"
    >
      <div className="max-w-4xl mx-auto px-4 py-8">
        {messages.map(msg => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
        
        {isTyping && <TypingIndicator />}
        
        <div ref={scrollAnchorRef} aria-hidden="true" />
      </div>

      {isScrolledUp && (
        <ScrollButton 
          onClick={() => scrollToBottom('smooth')}
          badge={hasNewMessages ? 'New' : undefined}
        />
      )}
    </main>
  );
}
```

---

**For more details**, see `AUTO_SCROLL_IMPLEMENTATION.md`
