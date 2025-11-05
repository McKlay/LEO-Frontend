# Backend API Integration Guide

## Overview
Frontend is configured to use backend API **for chat messages only**. Multi-turn conversation support is fully implemented.

**Backend URL:** `http://127.0.0.1:8000` (FastAPI/Uvicorn)  
**API Version:** `v1`

### What's Integrated
✅ **Chat Message API** - Fully functional with multi-turn support  
✅ **Session Management** - Automatic anonymous session creation  
📌 **Citations** - Hardcoded (placeholder)  
📌 **Suggestions** - Hardcoded (placeholder)  
⏳ **Feedback** - Not yet integrated (frontend only)  
⏳ **Conversation Management** - Local storage only (not using backend)

## Quick Start

### 1. Verify Backend is Running
Your FastAPI backend should be running on:
```
http://127.0.0.1:8000
```

Test it:
```bash
# Open in browser or use curl
curl http://127.0.0.1:8000/docs
```

You should see FastAPI's automatic documentation with `/api/v1/auth/session` and `/api/v1/chat/message` endpoints.

### 2. Environment Configuration
The `.env.development` file is already configured:
```
VITE_API_BASE_URL=http://127.0.0.1:8000/api/v1
VITE_API_TIMEOUT=30000
```

**Note:** Timeout is set to 30 seconds to accommodate LLM processing time (typically 15-20 seconds for complex queries).

### 3. Start Frontend
```bash
npm run dev
```

### 4. Test the Integration
1. Open `http://localhost:5173` in browser
2. Click "New Conversation" button - should clear chat and show welcome screen
3. Send a message - should create session and call backend API
4. Send another message - should send with previous messages as context

## How It Works

### Session Management (Automatic)
On first message, frontend:
1. Calls `POST /api/v1/auth/session` to create anonymous session
2. Receives `sessionId`, `token`, and `expiresAt`
3. Stores session in localStorage for 7 days
4. Reuses token for all subsequent requests

### Chat Message Flow
```
User sends message
    ↓
Frontend creates session (if needed)
    ↓
POST /api/v1/chat/message with:
  - conversationId (generated locally)
  - message (user input)
  - language (en/fil/ceb)
  - context.previousMessageIds (for multi-turn)
  - Authorization: Bearer {token}
    ↓
Backend processes and responds
    ↓
Frontend displays response with hardcoded citations/suggestions
```

### Multi-Turn Conversation

**First Message:**
```json
{
  "conversationId": "conv_1730812345678",
  "message": "What are my overtime rights?",
  "language": "en",
  "context": {
    "previousMessageIds": [],
    "userMetadata": {
      "employmentType": "regular",
      "industry": "general"
    }
  }
}
```

**Follow-up Message:**
```json
{
  "conversationId": "conv_1730812345678",
  "message": "How much should I be paid?",
  "language": "en",
  "context": {
    "previousMessageIds": ["msg-0", "msg-1"],
    "userMetadata": {
      "employmentType": "regular",
      "industry": "general"
    }
  }
}
```

Backend receives full conversation history via `previousMessageIds` array.

## Testing Checklist

### ✅ Session Creation
1. Open DevTools → Application → Local Storage
2. Send first message
3. Check for `leo_session` key with `sessionId`, `token`, `expiresAt`

### ✅ Chat Message API
1. Open DevTools → Network tab
2. Send a message
3. Look for POST to `http://127.0.0.1:8000/api/v1/chat/message`
4. Check request body has correct format
5. Verify response status is 200

### ✅ Multi-Turn Context
1. Send first message: "What are my termination rights?"
2. Check Network tab request has `previousMessageIds: []`
3. Send second message: "Can I appeal?"
4. Check Network tab request has `previousMessageIds: ["msg-0", "msg-1"]`
5. Backend should see conversation history

### ✅ New Conversation Button
1. Send some messages
2. Click "New Conversation" button
3. Chat should clear and show welcome screen
4. Sidebar should close (mobile)
5. Next message starts fresh conversation with new ID

## Troubleshooting

| Issue | Cause | Solution |
|-------|-------|----------|
| **ERR_CONNECTION_REFUSED** | Backend not running | Start backend on http://127.0.0.1:8000 |
| **CORS Error** | Backend CORS not configured | Add frontend origin to CORS allowed origins |
| **401 Unauthorized** | Invalid/expired token | Clear localStorage `leo_session`, refresh page |
| **Network Timeout** | Backend taking >10 seconds | Check backend logs for errors |
| **New Conversation doesn't work** | State not clearing | Check console for errors, refresh page |

### Enable Verbose Logging
Open browser console (F12) and check for:
- `Session creation error:` - Session API failed
- `Chat API error:` - Message API failed
- Network requests to `/api/v1/auth/session` and `/api/v1/chat/message`

## Hardcoded Data (Temporary)

### Citations
**File:** `src/services/api/chatApi.ts` (lines 90-98)

```typescript
const HARDCODED_CITATIONS = [
  {
    id: 'cite-temp-1',
    text: 'Regular employees are entitled to security of tenure...',
    source: 'Labor Code of the Philippines',
    article: 'Article 279',
    url: 'https://www.dole.gov.ph/labor-code-of-the-philippines/'
  }
];
```

### Suggestions  
**File:** `src/services/api/chatApi.ts` (lines 103-107)

```typescript
const HARDCODED_SUGGESTIONS = [
  'Contact DOLE at 1349',
  'Consult with a labor lawyer',
  'Visit your nearest DOLE office'
];
```

### To Integrate Backend Data Later
Replace in `chatApi.ts` sendMessage function:
```typescript
// Current (lines 165-170):
return {
  content: backendResponse.content,
  citations: HARDCODED_CITATIONS,
  suggestions: HARDCODED_SUGGESTIONS
};

// Future:
return {
  content: backendResponse.content,
  citations: backendResponse.citations,
  suggestions: backendResponse.suggestions.map(s => s.label)
};
```

## API Endpoints Currently Used

### 1. Create Anonymous Session
```
POST http://127.0.0.1:8000/api/v1/auth/session
```

**Request:**
```json
{
  "language": "en",
  "metadata": {
    "userAgent": "Mozilla/5.0...",
    "timezone": "Asia/Manila"
  }
}
```

**Response (201 Created):**
```json
{
  "sessionId": "session-uuid",
  "token": "jwt-token-string",
  "expiresAt": "2025-11-12T10:30:00Z",
  "expiresIn": 604800,
  "language": "en",
  "createdAt": "2025-11-05T10:30:00Z"
}
```

### 2. Send Chat Message
```
POST http://127.0.0.1:8000/api/v1/chat/message
```

**Headers:**
```
Content-Type: application/json
Accept-Language: en
Authorization: Bearer {token}
```

**Request:**
```json
{
  "conversationId": "conv_1730812345678",
  "message": "What are my overtime rights?",
  "language": "en",
  "context": {
    "previousMessageIds": ["msg-0", "msg-1"],
    "userMetadata": {
      "employmentType": "regular",
      "industry": "general"
    }
  }
}
```

**Response (200 OK):**
```json
{
  "messageId": "msg-uuid",
  "role": "assistant",
  "content": "Under Article 87 of the Labor Code...",
  "timestamp": "2025-11-05T10:30:00Z",
  "citations": [...],
  "suggestions": [...],
  "metadata": {
    "processingTime": 1.2,
    "model": "gpt-4.1",
    "confidence": 0.92
  }
}
```

## Local Storage vs Backend Storage

**Conversations:** Stored locally in browser (localStorage)  
**Messages:** Stored locally in browser (localStorage)  
**Session:** Created by backend, token stored locally  
**Chat Messages:** Sent to and received from backend

This hybrid approach allows:
- ✅ Backend to handle AI responses and multi-turn context
- ✅ Frontend to manage conversation history locally
- ✅ No backend dependency for conversation CRUD operations (Phase 2)

## Next Steps

1. ✅ **Backend running** - Verify at http://127.0.0.1:8000/docs
2. ✅ **Frontend configured** - Using correct API URL
3. 🔄 **Test multi-turn** - Send multiple messages in same conversation
4. ⏳ **Replace hardcoded citations** - When backend provides them
5. ⏳ **Replace hardcoded suggestions** - When backend provides them

---

**Last Updated**: November 5, 2025  
**Backend Spec**: v1.0.0  
**Integration Status**: Chat Messages API Only (Multi-turn Ready)  
**Focus**: Testing multi-turn conversation capability

## Multi-Turn Conversation

### How It Works
The frontend automatically manages conversation context:

1. **First message**: Empty previous messages
2. **Follow-up messages**: Full conversation history sent to backend
3. **Backend** receives context and provides contextual responses

### Example Flow
```
User: "What are my overtime rights?"
→ Backend sees: previousMessageIds = []

User: "How much should I be paid?"
→ Backend sees: previousMessageIds = ["msg-0", "msg-1"]
   Full context available for contextual response
```

## Testing

### Verify Connection
1. Start frontend: `npm run dev`
2. Open browser DevTools (F12) → Console tab
3. Send a message
4. Check for successful session creation and message sending

### Verify Multi-Turn Works
1. Open DevTools → Network tab
2. Send first message: "What are my rights if I'm terminated?"
   - Check request to `/api/v1/chat/message`
   - Verify `previousMessageIds: []`
3. Send follow-up: "Can I appeal?"
   - Verify `previousMessageIds: ["msg-0", "msg-1"]`
4. Backend receives conversation history

### Common Issues
| Issue | Solution |
|-------|----------|
| **ERR_CONNECTION_REFUSED** | Backend not running on 127.0.0.1:8000 |
| **CORS Error** | Backend needs CORS enabled for http://localhost:5173 |
| **401 Unauthorized** | Session token expired or invalid |
| **Network Timeout** | Backend taking >10 seconds to respond |

### Check Session Creation
Open DevTools → Application → Local Storage → `http://localhost:5173`
- Look for `leo_session` key
- Should contain: `sessionId`, `token`, `expiresAt`

## Hardcoded Data (Currently)

### Citations
File: `src/services/api/chatApi.ts` (lines ~80-88)
- Using placeholder data
- Will replace with `backendResponse.citations` when ready

### Suggestions  
File: `src/services/api/chatApi.ts` (lines ~90-95)
- Using placeholder data
- Will replace with `backendResponse.suggestions` when ready

**To integrate backend data:**
```typescript
// Current (hardcoded):
return {
  content: backendResponse.content,
  citations: HARDCODED_CITATIONS,
  suggestions: HARDCODED_SUGGESTIONS
};

// Future (backend data):
return {
  content: backendResponse.content,
  citations: backendResponse.citations,
  suggestions: backendResponse.suggestions.map(s => s.label)
};
```

## Configuration Reference

| Variable | Value | Description |
|----------|-------|-------------|
| `VITE_API_BASE_URL` | `http://127.0.0.1:8000/api/v1` | Backend API base URL |
| `VITE_API_TIMEOUT` | `10000` | Request timeout (10 seconds) |

## Next Steps

1. ✅ **Backend running** - Verify at http://127.0.0.1:8000
2. ✅ **Session creation** - Frontend creates session automatically
3. 🔄 **Test multi-turn** - Send multiple messages in conversation
4. ⏳ **Integrate citations** - Replace hardcoded with backend data
5. ⏳ **Integrate suggestions** - Replace hardcoded with backend data

---

**Last Updated**: November 5, 2025  
**Backend Spec Version**: 1.0.0  
**Status**: Ready for testing with backend at http://127.0.0.1:8000
