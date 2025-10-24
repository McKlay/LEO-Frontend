# Developer Quick Reference: User Feedback System

**Quick access guide for developers working with the feedback system**

---

## 🎯 Quick Links

| What | Where |
|------|-------|
| **Rating Component** | `src/components/Common/FeedbackRating.tsx` |
| **Flag Modal** | `src/components/Common/FlagModal.tsx` |
| **Feedback API** | `src/services/api/feedbackApi.ts` |
| **Types** | `src/types/chat.ts` - `MessageFeedback`, `FeedbackData` |
| **Context** | `src/context/ChatContext.tsx` - `rateMessage()`, `flagMessage()` |
| **Translations** | `src/utils/i18n.ts` - 14 new keys |

---

## 📝 Usage Examples

### Using Feedback Rating Component

```tsx
import FeedbackRating from './Common/FeedbackRating';

<FeedbackRating
  messageId={message.id}
  currentRating={message.feedback?.rating}
  language={language}
  onRate={(messageId, rating) => {
    // Handle rating submission
    rateMessage(messageId, rating);
  }}
/>
```

### Using Flag Modal Component

```tsx
import FlagModal from './Common/FlagModal';

const [showFlagModal, setShowFlagModal] = useState(false);

<FlagModal
  isOpen={showFlagModal}
  onClose={() => setShowFlagModal(false)}
  onSubmit={(reason, details) => {
    // Handle flag submission
    flagMessage(messageId, reason, details);
  }}
  language={language}
/>
```

### Accessing Feedback in Context

```tsx
import { useChat } from '../hooks/useChat';

function MyComponent() {
  const { rateMessage, flagMessage } = useChat();
  
  // Rate a message
  rateMessage('msg_123', 4);
  
  // Flag a message
  flagMessage('msg_123', 'Incorrect citation', 'Article number is wrong');
}
```

### Using Feedback API Service

```typescript
import { 
  saveFeedback, 
  getFeedbackForMessage,
  getFeedbackStats 
} from '../services/api/feedbackApi';

// Save feedback manually
saveFeedback({
  messageId: 'msg_123',
  conversationId: 'conv_456',
  rating: 5,
  timestamp: new Date(),
  language: 'en'
});

// Get feedback for a message
const feedback = getFeedbackForMessage('msg_123');
console.log(feedback?.rating); // 5

// Get statistics
const stats = getFeedbackStats('conv_456');
console.log(`Average: ${stats.averageRating}`); // Average: 4.2
console.log(`Total flagged: ${stats.totalFlagged}`); // Total flagged: 2
```

---

## 🔑 Key Types

```typescript
// Message with feedback
interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  feedback?: MessageFeedback;  // ← NEW
}

// Feedback stored in message
interface MessageFeedback {
  rating?: 1 | 2 | 3 | 4 | 5;
  flagged?: boolean;
  flagReason?: string;
  timestamp: Date;
}

// Feedback stored in localStorage
interface FeedbackData {
  messageId: string;
  conversationId: string;
  rating?: 1 | 2 | 3 | 4 | 5;
  flagged?: boolean;
  flagReason?: string;
  timestamp: Date;
  language: Language;
}
```

---

## 🌐 Translation Keys

All keys support English, Filipino, and Cebuano:

```typescript
// Accessing translations
import { getTranslation } from '../utils/i18n';

getTranslation(language, 'rateThisAnswer');        // "Rate this answer"
getTranslation(language, 'flagIncorrect');         // "Flag as incorrect"
getTranslation(language, 'feedbackThankYou');      // "Thank you..."
getTranslation(language, 'flagReason');            // "What's wrong..."
getTranslation(language, 'flagReasonIncorrectLaw');// "Incorrect law..."
getTranslation(language, 'flagReasonMisleading');  // "Misleading..."
getTranslation(language, 'flagReasonNotClear');    // "Not clear..."
getTranslation(language, 'flagReasonOther');       // "Other..."
getTranslation(language, 'submitFlag');            // "Submit Report"
getTranslation(language, 'cancelFlag');            // "Cancel"
getTranslation(language, 'flagged');               // "Flagged"
getTranslation(language, 'additionalDetails');     // "Additional details..."
```

---

## 🎨 Styling Classes

### Star Rating Styles
```css
/* Empty star */
.text-slate-300

/* Hovered/Selected star */
.fill-yellow-400 .text-yellow-400

/* Thank you message */
.text-green-600

/* Container */
.flex .items-center .gap-2
```

### Flag Modal Styles
```css
/* Modal backdrop */
.fixed .inset-0 .bg-black/50 .z-50

/* Modal container */
.bg-white .rounded-2xl .shadow-2xl .max-w-md

/* Warning colors */
.text-amber-600        /* Icon/accent */
.border-amber-500      /* Selected option */
.bg-amber-50          /* Selected background */
.bg-amber-600         /* Submit button */
```

---

## 🔌 API Functions Reference

### feedbackApi.ts

| Function | Purpose | Returns |
|----------|---------|---------|
| `saveFeedback(feedback)` | Save/update feedback | `void` |
| `getAllFeedback()` | Get all feedback | `FeedbackData[]` |
| `getFeedbackForMessage(messageId)` | Get message feedback | `FeedbackData \| null` |
| `getFeedbackForConversation(convId)` | Get conversation feedback | `FeedbackData[]` |
| `deleteFeedback(messageId)` | Remove feedback | `void` |
| `getFeedbackStats(convId)` | Calculate statistics | `Stats` object |
| `exportFeedbackData()` | Export as JSON | `string` |
| `clearAllFeedback()` | Clear all data | `void` |

### ChatContext Functions

```typescript
// From ChatContext
rateMessage(messageId: string, rating: 1 | 2 | 3 | 4 | 5): void
flagMessage(messageId: string, reason: string, details: string): void
```

---

## 🧪 Testing Utilities

### Check if message has feedback
```typescript
const hasFeedback = (message: Message): boolean => {
  return !!message.feedback;
};

const hasRating = (message: Message): boolean => {
  return !!message.feedback?.rating;
};

const isFlagged = (message: Message): boolean => {
  return !!message.feedback?.flagged;
};
```

### Mock feedback data
```typescript
const mockFeedback: MessageFeedback = {
  rating: 4,
  timestamp: new Date()
};

const mockFlaggedFeedback: MessageFeedback = {
  flagged: true,
  flagReason: 'Test reason',
  timestamp: new Date()
};
```

---

## 🐛 Debugging Tips

### Check localStorage
```javascript
// In browser console
localStorage.getItem('labor-law-chatbot-feedback');

// Pretty print
console.log(
  JSON.parse(localStorage.getItem('labor-law-chatbot-feedback'))
);
```

### Clear feedback data
```javascript
// In browser console
localStorage.removeItem('labor-law-chatbot-feedback');

// Or use API
import { clearAllFeedback } from './services/api/feedbackApi';
clearAllFeedback();
```

### Watch for feedback updates
```typescript
useEffect(() => {
  console.log('Message feedback updated:', message.feedback);
}, [message.feedback]);
```

---

## 📊 Analytics Queries

### Get average rating for conversation
```typescript
const stats = getFeedbackStats(conversationId);
console.log(`Avg rating: ${stats.averageRating}/5`);
```

### Get all flagged messages
```typescript
const allFeedback = getAllFeedback();
const flagged = allFeedback.filter(f => f.flagged);
console.log(`Total flagged: ${flagged.length}`);
```

### Get rating distribution
```typescript
const stats = getFeedbackStats(conversationId);
console.log('Distribution:', stats.ratingDistribution);
// { 1: 0, 2: 1, 3: 3, 4: 6, 5: 5 }
```

---

## 🚀 Performance Considerations

### Optimizations Already Implemented
- ✅ Feedback state managed efficiently
- ✅ localStorage writes batched
- ✅ No unnecessary re-renders
- ✅ Modal lazy rendered

### Best Practices
- Don't call `saveFeedback()` in render functions
- Use `useCallback` for feedback handlers in loops
- Memoize feedback statistics calculations
- Consider pagination for large feedback datasets

---

## 🔐 Security Notes

### Data Privacy
- Feedback stored locally (no backend yet)
- No PII collected in feedback
- User controls their own data
- Can clear at any time

### Input Validation
- Rating type-checked (1-5 only)
- Text inputs sanitized
- XSS protection via React
- No eval() or dangerous operations

---

## 🔄 Future Integration Points

### Backend Integration (Planned)
```typescript
// Future API endpoint
async function submitFeedbackToBackend(feedback: FeedbackData) {
  const response = await fetch('/api/feedback', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(feedback)
  });
  return response.json();
}
```

### Analytics Integration (Planned)
```typescript
// Future analytics tracking
function trackFeedbackEvent(type: 'rating' | 'flag', data: any) {
  analytics.track('feedback_submitted', {
    type,
    messageId: data.messageId,
    value: data.rating || 'flagged'
  });
}
```

---

## 📚 Additional Resources

- **Full Documentation:** `docs/PHASE4_FEEDBACK_SUMMARY.md`
- **Testing Guide:** `docs/TESTING_GUIDE_FEEDBACK.md`
- **Architecture Diagram:** `docs/FEEDBACK_ARCHITECTURE_DIAGRAM.md`
- **Checklist:** `docs/CHECKLIST.md` (lines 133-134 marked complete)

---

## 🆘 Common Issues & Solutions

### Issue: Stars not filling
**Solution:** Check that `currentRating` prop is passed correctly

### Issue: Modal not closing
**Solution:** Verify `isOpen` state is updated in parent component

### Issue: Feedback not persisting
**Solution:** Check localStorage quota, clear space if needed

### Issue: Translation missing
**Solution:** Ensure all 14 keys added to all 3 languages in i18n.ts

---

## 💡 Tips for Contributors

1. **Keep components small** - Both components under 200 lines
2. **Follow naming conventions** - camelCase for props, PascalCase for components
3. **Add ARIA labels** - Maintain accessibility
4. **Test in all languages** - Switch between EN, FIL, CEB
5. **Update types first** - TypeScript helps catch errors
6. **Document new features** - Update this guide

---

## ✅ PR Checklist

Before submitting changes:
- [ ] TypeScript compiles without errors
- [ ] Build succeeds (`npm run build`)
- [ ] Tested in all 3 languages
- [ ] Accessibility checked (keyboard nav)
- [ ] No console errors/warnings
- [ ] Documentation updated
- [ ] Translation keys added to all languages

---

**Last Updated:** October 23, 2025  
**Maintainer:** Development Team  
**Status:** ✅ Production Ready
