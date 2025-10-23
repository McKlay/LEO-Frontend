# User Feedback System Testing Guide

**Features:** Star Rating & Flag Incorrect Information  
**Date:** October 23, 2025

---

## Quick Start Testing

### Prerequisites
1. Build the project: `npm run build` (✅ Verified working)
2. Start dev server: `npm run dev`
3. Open browser and navigate to the app

---

## Test Scenario 1: Star Rating System

### Steps:
1. **Start a new conversation**
   - Click "New Conversation" in sidebar
   - Type a question: "What are my rights if terminated?"
   - Press Send

2. **Locate the feedback section**
   - Scroll to the bot's response
   - Look below the timestamp for "Rate this answer:"
   - You should see 5 empty star icons

3. **Test hover interaction**
   - Hover over the 3rd star
   - Stars 1, 2, and 3 should fill with yellow color
   - Move mouse away - stars should return to empty

4. **Submit a rating**
   - Click the 4th star
   - "Thank you for your feedback!" message should appear
   - Message should disappear after 2 seconds
   - Stars should remain filled at 4 stars

5. **Verify persistence**
   - Refresh the page (F5)
   - Navigate to the same conversation
   - The 4-star rating should still be displayed

6. **Test in other languages**
   - Switch to Filipino using language toggle
   - Text should change to "I-rate ang sagot na ito:"
   - Switch to Cebuano
   - Text should change to "I-rate kining tubag:"

### Expected Results:
- ✅ Stars fill on hover
- ✅ Click submits rating
- ✅ Thank you message appears briefly
- ✅ Rating persists after refresh
- ✅ Works in all 3 languages

---

## Test Scenario 2: Flag Incorrect Information

### Steps:
1. **Locate the flag button**
   - Below the star rating, find "Flag as incorrect" button
   - Button should have a flag icon

2. **Open the flag modal**
   - Click "Flag as incorrect"
   - Modal should appear with:
     - Title: "Flag as incorrect"
     - 4 radio button options
     - Text area for additional details
     - Cancel and Submit buttons

3. **Test reason selection**
   - Click "Incorrect law or citation" radio button
   - Radio should be selected
   - Click "Misleading or incomplete information"
   - Previous selection should deselect, new one selected

4. **Add additional details** (optional)
   - Type in the text area: "The article number seems wrong"
   - Text should appear as you type

5. **Test modal interactions**
   - Click outside the modal → Modal should close
   - Click flag button again to reopen
   - Press ESC key → Modal should close
   - Click flag button again to reopen
   - Click "Cancel" → Modal should close

6. **Submit a flag**
   - Reopen modal
   - Select "Not clear or hard to understand"
   - Add detail: "Too much legal jargon"
   - Click "Submit Report"
   - Modal should close
   - Flag button should change to "Flagged" with filled flag icon

7. **Verify persistence**
   - Refresh page
   - Navigate to same conversation
   - Message should still show "Flagged" indicator
   - Flag button should not be clickable

8. **Test in other languages**
   - Start new conversation in Filipino
   - Flag button should say "I-flag bilang mali"
   - Open modal - all text should be in Filipino
   - Test same in Cebuano: "I-flag isip sayop"

### Expected Results:
- ✅ Modal opens/closes correctly
- ✅ Radio buttons work properly
- ✅ Text area accepts input
- ✅ ESC and click-outside close modal
- ✅ Submit saves flag
- ✅ Flagged state persists
- ✅ Works in all 3 languages

---

## Test Scenario 3: Combined Feedback

### Steps:
1. **Rate and flag same message**
   - Rate a message 2 stars
   - Then flag it as "Misleading"
   - Both should be recorded

2. **Verify localStorage**
   - Open Browser DevTools (F12)
   - Go to Application → Local Storage
   - Find key: `labor-law-chatbot-feedback`
   - Should see JSON array with your feedback

3. **Test multiple messages**
   - Continue conversation with 3-4 more exchanges
   - Rate each bot response differently (1-5 stars)
   - Flag one of them
   - All feedback should persist independently

### Expected Results:
- ✅ Multiple feedbacks stored correctly
- ✅ Each message maintains its own feedback
- ✅ localStorage contains all data
- ✅ No conflicts between rating and flagging

---

## Test Scenario 4: Accessibility

### Keyboard Navigation:
1. **Tab through feedback elements**
   - Press Tab until you reach star ratings
   - Press Tab 5 times to go through each star
   - Press Tab to reach flag button
   - Press Enter to open modal

2. **Navigate flag modal**
   - Tab through radio buttons
   - Use arrow keys to select options
   - Tab to text area and type
   - Tab to buttons
   - Press ESC to close

### Screen Reader (if available):
1. **Enable screen reader** (NVDA, JAWS, VoiceOver)
2. Navigate to star rating
3. Should announce: "Rate this answer: Rate X stars"
4. Navigate to flag button
5. Should announce purpose clearly

### Expected Results:
- ✅ All elements reachable by keyboard
- ✅ Tab order is logical
- ✅ Enter/Space activate buttons
- ✅ ESC closes modal
- ✅ ARIA labels properly announced

---

## Test Scenario 5: Edge Cases

### Test Empty State:
1. Try to submit flag without selecting reason
2. Submit button should be disabled

### Test Long Text:
1. Type 500+ characters in additional details
2. Should accept long text without issues

### Test Rapid Clicking:
1. Rapidly click different star ratings
2. Should handle gracefully, show last selection

### Test Multiple Tabs:
1. Open app in two browser tabs
2. Rate message in Tab 1
3. Refresh Tab 2
4. Rating should appear in Tab 2

### Expected Results:
- ✅ Form validation works
- ✅ Long text handled properly
- ✅ No race conditions
- ✅ Data synced across tabs

---

## Visual Inspection Checklist

### Star Rating Component:
- [ ] Stars aligned horizontally
- [ ] Hover changes color to yellow
- [ ] Selected stars filled, others empty
- [ ] Thank you message positioned well
- [ ] Proper spacing around elements

### Flag Modal:
- [ ] Modal centered on screen
- [ ] Backdrop dims background
- [ ] Radio buttons aligned properly
- [ ] Text area sized appropriately
- [ ] Buttons have consistent styling
- [ ] Amber warning color scheme used

### Responsive Design:
- [ ] Test on mobile size (375px width)
- [ ] Test on tablet size (768px width)
- [ ] Test on desktop (1920px width)
- [ ] Modal adapts to screen size
- [ ] Touch targets large enough on mobile

---

## Bug Reporting Template

If you find issues, report using this format:

```
**Issue Title:** [Brief description]

**Steps to Reproduce:**
1. Step one
2. Step two
3. Step three

**Expected Behavior:**
What should happen

**Actual Behavior:**
What actually happened

**Environment:**
- Browser: [Chrome 120 / Firefox 121 / Safari 17]
- OS: [Windows 11 / macOS 14 / Ubuntu 22.04]
- Language: [English / Filipino / Cebuano]

**Screenshots:**
[Attach if applicable]
```

---

## Performance Testing

### Load Testing:
1. Create conversation with 50+ messages
2. Rate multiple messages
3. Flag multiple messages
4. Check for performance degradation

### localStorage Size:
1. Generate lots of feedback
2. Check localStorage size in DevTools
3. Ensure within browser limits (5-10MB typical)

---

## Success Criteria

### Feature Completeness:
- ✅ Star rating works in all languages
- ✅ Flag modal works in all languages
- ✅ Feedback persists across sessions
- ✅ No console errors
- ✅ Build successful (verified)

### User Experience:
- ✅ Intuitive interface
- ✅ Clear visual feedback
- ✅ Non-intrusive placement
- ✅ Smooth interactions
- ✅ Helpful confirmation messages

### Accessibility:
- ✅ Keyboard accessible
- ✅ Screen reader friendly
- ✅ ARIA labels present
- ✅ Color contrast sufficient
- ✅ Focus indicators visible

---

## Known Issues / Limitations

1. **No Rating Update:** Once rated, cannot change rating
2. **No Unflag:** Once flagged, cannot remove flag
3. **Local Only:** Feedback not sent to backend yet
4. **Storage Limit:** Subject to browser localStorage quota

These are by design for current phase. Will be addressed in backend integration.

---

## Next Steps After Testing

1. ✅ Verify all test scenarios pass
2. Document any bugs found
3. Test with screen readers thoroughly
4. Get user feedback on UI/UX
5. Plan backend integration
6. Design admin review dashboard

---

**Testing Status:** Ready for manual QA  
**Build Status:** ✅ Passing  
**Documentation:** Complete
