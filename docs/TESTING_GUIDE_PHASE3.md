# Phase 3 Conversation Management - Testing Guide

## 🧪 Manual Testing Instructions

### Prerequisites
1. Start the dev server: `npm run dev`
2. Open http://localhost:5173 in your browser
3. Create 3-4 test conversations by asking different questions

---

## Test Case 1: Search Conversations ✅

**Steps:**
1. Type in the search bar at the top of the sidebar
2. Watch the conversation list filter in real-time
3. Try searching for a word in a conversation title
4. Try searching for a word in a message (searches full content)
5. Press Escape or click X to clear search

**Expected Results:**
- ✅ Search filters immediately as you type
- ✅ Finds matches in titles and message content
- ✅ Shows "No conversations found" when no matches
- ✅ Escape key clears the search
- ✅ X button appears when typing and clears search when clicked

---

## Test Case 2: Rename Conversation ✏️

**Steps:**
1. Hover over a conversation in the sidebar
2. Click the three-dot menu (⋮) that appears
3. Click "Rename" (or translated equivalent)
4. Type a new conversation title
5. Press Enter to save (or click outside the input)
6. Try pressing Escape to cancel

**Expected Results:**
- ✅ Menu appears on hover
- ✅ Input field appears with current title selected
- ✅ Can type new title (max 100 characters)
- ✅ Enter key saves the new title
- ✅ Clicking outside saves the new title
- ✅ Escape key cancels and restores original title
- ✅ Conversation list updates immediately

---

## Test Case 3: Archive Conversation 📦

**Steps:**
1. Click three-dot menu on a conversation
2. Click "Archive"
3. Verify conversation disappears from main list
4. Click "Show Archived" button (below search bar)
5. Verify archived conversation appears with (Archived) label
6. Click three-dot menu on archived conversation
7. Click "Unarchive"
8. Verify conversation returns to main list

**Expected Results:**
- ✅ Archive removes conversation from main view
- ✅ "Show Archived" toggle appears correctly
- ✅ Archived conversations shown in gray with label
- ✅ Can unarchive to restore to main list
- ✅ Menu icon changes to "Unarchive" for archived items
- ✅ Current conversation cleared if archived while open

---

## Test Case 4: Delete Conversation 🗑️

**Steps:**
1. Click three-dot menu on a conversation
2. Click "Delete" (appears in red at bottom)
3. Verify confirmation dialog appears
4. Click Cancel to verify nothing happens
5. Click Delete again and confirm
6. Verify conversation is permanently removed

**Expected Results:**
- ✅ Delete option appears in red
- ✅ Confirmation dialog appears in appropriate language
- ✅ Cancel prevents deletion
- ✅ Confirm permanently removes conversation
- ✅ Current conversation cleared if deleted while open
- ✅ Message data also deleted from localStorage

---

## Test Case 5: Export Conversation 💾

**Steps:**
1. Create a conversation with multiple messages
2. Click three-dot menu on that conversation
3. Click "Export"
4. Verify TXT file downloads automatically
5. Open the downloaded file

**Expected Results:**
- ✅ File downloads immediately
- ✅ Filename format: `{title}_{date}.txt`
- ✅ File contains:
  - Conversation title
  - Date and language
  - All messages with timestamps
  - "You:" and "Labor Law Assistant:" labels
  - Citations if present
  - Export metadata at bottom

---

## Test Case 6: Multilingual Support 🌐

**Steps:**
1. Change language to Filipino using language toggle
2. Verify all menu items translate correctly:
   - "Palitan ang Pangalan" (Rename)
   - "I-archive" (Archive)
   - "Tanggalin" (Delete)
   - "I-export" (Export)
3. Change language to Cebuano
4. Verify translations:
   - "Usba ang Ngalan" (Rename)
   - "I-archive" (Archive)
   - "Tangtangon" (Delete)
   - "I-export" (Export)
5. Test search placeholder text in each language
6. Test delete confirmation dialog in each language

**Expected Results:**
- ✅ All UI elements translate correctly
- ✅ Menu items in correct language
- ✅ Search placeholder translated
- ✅ Delete confirmation in correct language
- ✅ No English text leaking in Filipino/Cebuano

---

## Test Case 7: Edge Cases 🔧

**Steps:**
1. **Empty title rename:** Try to save an empty conversation title
2. **Long title:** Type a 100+ character title
3. **Special characters:** Use emojis, symbols in title
4. **Search with no conversations:** Search when sidebar is empty
5. **Delete current conversation:** Delete the conversation you're viewing
6. **Archive current conversation:** Archive the conversation you're viewing
7. **Rapid actions:** Click menu items very quickly

**Expected Results:**
- ✅ Empty title reverts to original
- ✅ Title truncates at 100 characters
- ✅ Special characters handled correctly
- ✅ Empty state message when no conversations
- ✅ Current view clears when deleting active conversation
- ✅ Current view clears when archiving active conversation
- ✅ No race conditions or errors with rapid clicks

---

## Test Case 8: Persistence 💾

**Steps:**
1. Rename a conversation
2. Refresh the page (F5)
3. Verify new title persists
4. Archive a conversation
5. Refresh the page
6. Verify archive status persists
7. Delete a conversation
8. Refresh the page
9. Verify deletion persists

**Expected Results:**
- ✅ All changes persist after page refresh
- ✅ Conversation metadata saved to localStorage
- ✅ Archive status remembered
- ✅ Deleted conversations stay deleted

---

## Browser Console Checks 🔍

**While Testing, Check Console For:**
- ❌ No TypeScript errors
- ❌ No React warnings
- ❌ No 404 errors
- ❌ No uncaught exceptions
- ✅ Clean console output

---

## Accessibility Quick Check ♿

**Steps:**
1. Tab through the conversation list
2. Verify you can focus on menu button
3. Press Enter to open menu
4. Use arrow keys to navigate menu (if supported)
5. Press Escape to close menu

**Expected Results:**
- ✅ Can navigate with keyboard
- ✅ Focus indicators visible
- ✅ ARIA labels present (check with dev tools)
- ⚠️ Full keyboard nav might need more work (Phase 3 - Accessibility)

---

## Performance Check ⚡

**Steps:**
1. Create 10+ conversations
2. Test search performance
3. Test scrolling in sidebar
4. Check browser memory usage

**Expected Results:**
- ✅ Search feels instant (< 100ms)
- ✅ Smooth scrolling with many conversations
- ✅ No memory leaks with repeated actions
- ⚠️ May need optimization with 100+ conversations

---

## Known Limitations ⚠️

1. **PDF Export:** Not implemented (requires library)
2. **Email Transcript:** Not implemented (requires backend)
3. **Bulk Operations:** Can't select multiple conversations
4. **Undo Delete:** No undo once confirmed
5. **Search History:** Doesn't remember previous searches

---

## If You Find Bugs 🐛

1. Check browser console for errors
2. Try in incognito mode (fresh localStorage)
3. Clear localStorage: `localStorage.clear()` in console
4. Check if issue persists after refresh
5. Document steps to reproduce

---

## Quick Smoke Test (2 Minutes) 🚀

1. ✅ Create conversation
2. ✅ Search for it
3. ✅ Rename it
4. ✅ Archive it
5. ✅ Show archived
6. ✅ Unarchive it
7. ✅ Export it
8. ✅ Delete it
9. ✅ Change language
10. ✅ Refresh page

**All 10 steps work = Features ready! ✅**

---

**Happy Testing! 🎉**

For issues or questions, document them in GitHub Issues or discuss with the team.
