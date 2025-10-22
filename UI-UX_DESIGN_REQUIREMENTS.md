# Labor Law Chatbot: UI/UX Design Requirements & Evaluation Criteria

## Executive Summary
Based on the research paper's evaluation findings and user feedback, this document outlines the critical UI/UX design requirements and evaluation criteria for the Labor Law Chatbot frontend. The criteria are derived from actual user testing, language considerations, and access-to-justice objectives.

---

## Part 1: Core UI/UX Evaluation Criteria

### 1. **Clarity & Comprehensibility**
**Target Metric:** 4.7/5 average user rating for answer clarity

#### Design Requirements:
- **Readability for Non-Lawyers:**
  - Use plain language, avoid excessive legal jargon
  - If legal terms are necessary, explain them in parentheses
  - Example: "just cause (makatarungang dahilan)"
  - Font size should be legible on mobile and desktop
  - Line spacing should be comfortable for extended reading

- **Visual Hierarchy:**
  - Key information should be emphasized (bold, larger font)
  - Step-by-step guidance should use numbered lists
  - Legal citations should be visually distinct from explanations
  - Use indentation and spacing to separate concepts

**User Feedback Comment:** *"Na-explain nung chatbot sa Tagalog yung batas na English – mas naintindihan ko tuloy." ("The chatbot explained the law in Tagalog – I understood it better because of that.")*

---

### 2. **Multilingual Support (Filipino, English, & Cebuano)**
**Target Metric:** Equal accuracy in all languages; 4.6/5 clarity for each language

#### Design Requirements:
- **Language Detection:**
  - Automatically detect user's language preference (Filipino, English, Cebuano, or mixed)
  - Seamlessly switch between languages based on user input
  - Remember user's language preference for future interactions
  - Support code-switching within messages (e.g., mixing Cebuano and English)

- **Supported Languages:**
  - **Filipino (Tagalog):** Primary accessibility language
  - **English:** Professional and technical information
  - **Cebuano (Bisaya):** Regional accessibility for Visayan speakers
  
- **Code-Switching Support:**
  - Support natural mixing of any supported languages (Taglish, Bisaya-English mix, etc.)
  - Example user queries:
    - Filipino: "Yung 13th month ko po hindi pa binibigay – what can I do?"
    - Cebuano: "Ang akong 13th month pay wala pa – unsay akong magbuhat?"
  - Bot should respond in kind, code-switching appropriately

- **Formatting for Mixed Language:**
  - Use **italic or quotes** when injecting English legal terms into local language sentences
  - This helps avoid confusion in multilingual responses
  - User feedback: "use italic or quotes when injecting an English term in a Filipino sentence to avoid confusion"

- **Grammar & Tone:**
  - Avoid overly legalistic terms in local languages
  - Use contemporary, accessible phrasing
  - Match the formal but friendly tone across all languages
  - Example for Cebuano: Use common Bisaya terms rather than formal Spanish-influenced terminology

#### Future Language Support Architecture:
- **Scalable Design:** Current system built to easily add more Philippine languages (Ilonggo, Kapampangan, etc.)
- **Localization Keys:** All UI text and responses should use localization keys for easy translation
- **Regional Considerations:** Wage rates, DOLE office locations, and regional labor practices should be language-adaptable
- **Future Candidates:** Ilonggo, Kapampangan, Pangasinan, and other major Philippine languages

---

### 3. **Citations & Credibility**
**Target Metric:** Citations increased user confidence and trust significantly

#### Design Requirements:
- **Visible Legal References:**
  - Always cite the specific law or regulation
  - Format: "Article 297 of the Labor Code" (not just "Art. 297")
  - Include the full context: law name, article/section, year if relevant

- **Citation Placement:**
  - Place citations directly in the answer where relevant
  - Example: When explaining just cause, cite: "Artikulo 297 ng Labor Code"
  - Make citations clickable when possible (link to full law text)

- **Source Transparency:**
  - Users should be able to verify information independently
  - Provide links to:
    - Labor Code provisions
    - DOLE resources and forms
    - NLRC procedures
    - SEnA request forms
    - Government websites

- **Disclaimer Visibility:**
  - Include clear disclaimer: "Paalala: hindi ako abogado – nagbibigay lang ako ng impormasyon ayon sa batas"
  - Translation: "Reminder: I am not a lawyer – I only provide information according to the law"
  - Display at end of conversation or in footer

**User Feedback Comment:** *"The presence of citations boosted credibility: users liked seeing references like 'Artikulo 297 ng Labor Code' in the answers and said it made the advice feel legitimate"*

---

### 4. **Usefulness & Actionability**
**Target Metric:** 4.8/5 for "helped me understand what I can do"

#### Design Requirements:
- **Step-by-Step Guidance:**
  - Present actions in sequential order
  - Example structure:
    1. Talk to employer or HR
    2. File a SEnA request at DOLE
    3. If not resolved, file a formal complaint
  - Use numbered lists for multi-step procedures

- **Practical Next Steps:**
  - Always end with concrete action recommendations
  - Specify which office/agency to contact
  - Provide DOLE contact info: DOLE Hotline 1349
  - Include contact information for relevant authorities

- **Contextual Help:**
  - Provide links to:
    - SEnA request forms
    - DOLE regional office locator
    - NLRC procedures
    - Complaint templates if available
  - Make resources easily accessible without leaving chat

- **Empowerment Language:**
  - Use encouraging but neutral tone
  - Phrase options clearly: "You may..." or "You can..."
  - Avoid either/or framing; present all legitimate options

---

### 5. **Interactivity & Multi-Turn Conversation**
**Target Metric:** Users appreciated interactive dialogue for clarification

#### Design Requirements:
- **Follow-up Questions:**
  - Bot should ask clarifying questions when needed
  - Example: "Regular ka na bang empleyado or contractual? Sapagkat maaapektuhan nito ang payo sa iyo."
  - Translation: "Are you a regular employee or contractual? Because this will affect the advice to you."

- **Context Preservation:**
  - Maintain conversation history for multi-turn interactions
  - Reference previous answers in follow-ups
  - Allow users to ask related questions without re-explaining context

- **Personalization:**
  - Tailor advice based on specific details (salary, region, length of service, etc.)
  - Calculate specific examples when provided with numbers
  - Example: If user provides salary info, calculate 13th-month payment due

- **Conversation Flow:**
  - Natural dialogue feel, not robotic Q&A
  - Empathize with user concerns
  - Close conversation with supportive message

**User Feedback Comment:** *"Wanted even more interactivity – 'It should ask me more questions about my situation to give a more tailored answer'"*

---

### 6. **Trust & Safety**
**Target Metric:** 5/5 average trust rating

#### Design Requirements:
- **Transparency About Limitations:**
  - Clearly state when issues are outside expertise
  - Suggest professional consultation for:
    - Complex cases
    - Large financial claims
    - Sensitive matters (sexual harassment, discrimination)
  - Referral to: Union, PAO lawyer (if indigent), DOLE Hotline

- **Privacy Assurance:**
  - Display privacy policy clearly
  - Warn users not to share personal/confidential information
  - Show privacy icon or notice in UI
  - Example: "Paalala: Huwag ibahagi ang mga personal na detalye"
  - Translation: "Reminder: Do not share personal details"

- **Boundary Setting:**
  - Refuse inappropriate requests politely
  - Explain scope limitations
  - Redirect off-topic questions professionally

- **Ethical Guardrails Messaging:**
  - Show that system maintains neutrality
  - Display that system is for information, not advocacy
  - Make clear that users should verify with professionals

---

## Part 2: Language-Specific UI Design Considerations

### A. Filipino Language Design Requirements

#### Vocabulary & Terminology:
- Use common Filipino terms, not formal "bookish" language
- When using legal terms (often English), explain in simple Filipino
- Maintain list of labor-specific terms with Filipino equivalents:
  - **Just cause** → **makatarungang dahilan**
  - **Due process** → **tamang pamamaraan**
  - **Regular employee** → **regular na empleyado**
  - **Probationary period** → **panahon ng pagsubok**
  - **Dismissal/Termination** → **tinanggal/pagtatanggal**
  - **Floating status** → **panahon ng suspensyon**
  - **Constructive dismissal** → **walang dahilan na pagtayo**
  - **13th-month pay** → **13th month pay** (commonly used as-is)

#### Grammar & Tone:
- Use active voice and direct address
- Friendly but professional
- Use "po" and "ko" appropriately for politeness in Tagalog
- Keep sentences moderately short (15-20 words)
- Avoid complex subordinate clauses

#### Formatting:
- Break long paragraphs into shorter segments
- Use bullet points extensively
- Italicize English terms when first introduced
- Use bold for key information

---

### B. English Language Design Requirements

#### Tone:
- Professional but accessible
- Direct and clear
- Empathetic but objective
- Avoid overly technical language

#### Structure:
- Topic sentences first
- Supporting details follow
- Concrete examples provided
- Links embedded for reference

---

### C. Cebuano Language Design Requirements

#### Vocabulary & Terminology:
- Use common Cebuano (Bisaya) terms, avoiding overly formal Spanish-influenced words
- Explain technical legal terms in simple Cebuano
- Maintain list of labor-specific terms with Cebuano equivalents:
  - **Just cause** → **makatarungang dahilan / tamang dahilan**
  - **Due process** → **tamang pamamaraan**
  - **Regular employee** → **regular na magtrabaho**
  - **Probationary period** → **panahon sa pagsubok / probation period** (commonly used)
  - **Dismissal/Termination** → **pagtanggal / tinanggal sa trabaho**
  - **Floating status** → **suspended status / walang trabaho karon**
  - **13th-month pay** → **13th month pay / dagdag bayad sa ikatlong bwan**

#### Grammar & Tone:
- Use active voice and conversational tone
- Friendly and accessible to general Cebuano speakers
- Use appropriate Cebuano particles and markers
- Keep sentences clear and direct (15-20 words preferred)
- Avoid Spanish legal terminology when Cebuano alternatives exist

#### Formatting:
- Break long paragraphs into shorter, digestible segments
- Use bullet points for lists and procedures
- Italicize English terms when first introduced
- Use bold for critical information and key dates

#### Common Cebuano Phrases for UI:
- "Salamat sa inyong pangutana" → Thank you for your question
- "Ito ang aming suhestiyon" → Here is our suggestion
- "Kung ang problema manabot..." → If the problem reaches...
- "Makipag-ugnayan sa DOLE" → Contact DOLE

---

## Part 3: Content Organization & UI Layout

### 3.1 Chat Interface Layout

**✓ Currently Implemented:**

#### Message Bubbles:
- **User messages:** Right-aligned, distinct background color (blue)
- **Bot messages:** Left-aligned with clear visual distinction (white/light background)
- **Conversation sidebar:** Left navigation showing conversation history
- **Attachment support:** Attachment button available in input area

#### Response Structure:
Current bot responses include:
1. Main explanation/answer text
2. **Legal References section** (collapsible/expandable)
   - Numbered citations with full law references
   - View Source links
3. **Suggested Actions section** (when applicable)
   - Clickable action buttons
4. Polite closing

#### Visual Elements:
**✓ Currently Implemented:**
- Scale/Justice icon in header
- Language toggle button
- Send button with input field
- Attachment button

**🔄 Enhancement Planned:**
- Additional icons:
  - Gavel icon for legal information
  - Link icon for references
  - Warning icon for disclaimers
  - Save icon for conversation saving
  - Email icon for sharing conversation

---

### 3.2 Conversation Features

**✓ Currently Implemented:**
- **Conversation History:** Left sidebar showing list of previous conversations
- **New Conversation Button:** Top of sidebar for starting fresh chats
- **Language Toggle:** Top right language selector
- **Multi-turn Conversation:** Maintains context across multiple exchanges

**🔄 Enhancement Planned (User Feedback Requests):**
- **Save & Export:**
  - Allow users to save important conversations
  - Provide option to email conversation to themselves
  - Generate printable summary of advice given
- **Advanced Navigation:**
  - Search within conversation history
  - Conversation naming/titling
  - Archiving old conversations
- **Accessibility:**
  - Font size adjustment option
  - High contrast mode option
  - Screen reader compatible
  - Mobile-responsive design (currently responsive)
  - Touch-friendly buttons for mobile

---

### 3.3 Citation & Reference Display

**✓ Currently Implemented:**
- **Collapsible "Legal References" section** in bot responses
- Numbered citations with full legal references (e.g., "Labor Code of the Philippines - Article 83")
- Citation text with visual indicators
- Links to source documents (marked with link icon "View Source")
- Legal references grouped together for clarity

**Citation Formatting:**
- Full reference: "Labor Code of the Philippines"
- Article/Section clearly stated: "Article 83"
- Related context provided: "Regular working hours shall not exceed eight (8) hours a day"

**🔄 Enhancement Planned:**
- Make citations clickable links to full law text
- Additional related resources section
- Expand reference section with more supporting materials

---

### 3.4 Referral & Support Features

**✓ Currently Implemented:**
- **"Suggested Actions" section** in bot responses
- Clickable action buttons:
  - "Contact DOLE"
  - "File SEnA Request"
  - "Find a Lawyer"
- Action buttons positioned prominently below main response

**When to Suggest Professional Help:**
- Complex legal scenarios
- Large financial claims
- Emotional or sensitive matters
- When user is unsure about advice

**🔄 Enhancement Planned:**
- Expand referral display with more options:
  - DOLE Hotline: 1349
  - DOLE Regional Office Locator
  - PAO (Free legal aid)
  - Union Representative contact info
- Deeper integration with these services
- Direct scheduling or callback features

---

## Part 4: User Interface Mockup Elements

### 4.1 Initial Chat Screen
**✓ Currently Implemented:**
- Welcoming header in user's language ("Legal Assistant")
- Brief explanation of chatbot's purpose ("AI-Powered Labor Law Guidance")
- Language selection button (top right - Filipino/English toggle)
- Sample questions displayed as interactive buttons
- Left sidebar with "New Conversation" button and conversation history tracking
- Clean, centered layout with scale/justice icon

**🔄 Enhancement Planned:**
- Privacy notice link in footer
- Additional context text explaining chatbot scope

### 4.2 Suggested Questions
**✓ Currently Implemented:**
Display common queries to help first-time users as clickable button cards:
- "What are my rights if I'm terminated?"
- "Am I entitled to overtime pay?"
- "What is the minimum wage in my region?"
- "How do I file a complaint at DOLE?"

### 4.3 Conversation Interface
**✓ Currently Implemented:**
- Clear message separation with distinct visual bubbles
- User messages: Right-aligned with different background color
- Bot messages: Left-aligned with clear visual distinction
- Conversation history sidebar for easy navigation
- Chat input at bottom with attachment button and send functionality

**🔄 Enhancement Planned:**
- Timestamp on individual messages
- Typing indicator when bot is processing
- Response loading animation

### 4.4 Footer/Always-Visible Elements
**✓ Currently Implemented:**
- Language toggle (top right corner)
- Chat input with send button

**🔄 Enhancement Planned:**
- Help/FAQ link
- Privacy policy link
- Terms of service link
- Disclaimer footer: "This is an AI tool, not a substitute for legal advice"

---

## Part 5: Quality Assurance & Testing Criteria

### 5.1 Readability Testing
- **Flesch Reading Ease:** Target 60-70 (accessible to general public)
- **Flesch-Kincaid Grade Level:** Target 7-9 (high school reading level)
- **Test with non-lawyers:** Verify comprehension of complex legal concepts

### 5.2 Multilingual Testing
- Native speakers review translations for Filipino, English, and Cebuano
- Test code-switching scenarios across all language combinations
- Verify tone consistency across all three languages
- Check for grammatical errors in each language
- Validate that labor law terms are accurately translated while remaining accessible
- Test regional language preferences and switching

### 5.3 Mobile Responsiveness
- Test on phones (iOS and Android)
- Test on tablets
- Verify touch interactions work smoothly
- Check text wrapping at different screen sizes

### 5.4 Accessibility Testing
- Screen reader compatibility
- Keyboard navigation
- Color contrast ratios (WCAG AAA standard: 7:1)
- Font readability at different sizes

### 5.5 Citation Accuracy
- Verify all citations are correct and up-to-date
- Test that links work
- Check that legal references are complete

---

## Part 6: Performance Metrics

## Part 6A: Language Support Architecture & Scalability

### Current Language Support:
1. **Filipino (Tagalog)** - Primary accessibility language
2. **English** - Professional and international access
3. **Cebuano (Bisaya)** - Regional accessibility for Visayan speakers

### Future Language Support Roadmap:
**Phase 2 Candidates:**
- **Ilonggo (Hiligaynon)** - Western Visayas region
- **Kapampangan** - Central Luzon region
- **Pangasinan** - Northern region

**Phase 3+ Candidates:**
- **Ilocano** - Northern Luzon
- **Bicolano** - Bicol region
- **Chavacano** - Mindanao region

### Technical Implementation for Scalability:
1. **Localization Architecture:**
   - All UI strings should use localization keys (not hardcoded text)
   - Translation management system (TMS) for easy language addition
   - Language-specific content files separated by locale code (e.g., `en.json`, `fil.json`, `ceb.json`)

2. **Regional Customization:**
   - Wage rates by region should be language-accessible
   - DOLE office locations with regional office names in local language
   - Contact information in region-specific languages
   - Industry-specific guidance in local languages

3. **Quality Assurance for New Languages:**
   - Native speaker review mandatory for all new language additions
   - Legal accuracy verification in each language
   - Accessibility compliance in each language script
   - Regional dialect/variation testing

4. **User Experience for Multi-Language Users:**
   - Seamless code-switching support across all language pairs
   - Language preference persistence
   - Family of languages grouping (e.g., suggesting Filipino to Cebuano users)

---

## Part 7: Common UI Issues to Avoid

### Based on Error Analysis:

1. **Multi-Issue Handling**
   - ❌ Don't address only one issue when multiple are asked
   - ✅ Do: Detect multiple issues and address each systematically
   - UI Solution: Show checklist of detected issues, address each clearly

2. **Citation Formatting**
   - ❌ Don't write: "Art. 282"
   - ✅ Do write: "Article 297 of the Labor Code"
   - UI Solution: Use template system for consistent citation format

3. **Confidence Gaps**
   - ❌ Don't speculate when you're uncertain
   - ✅ Do: Say "I'm not sure" and suggest human consultation
   - UI Solution: Display uncertainty warning clearly

4. **Formatting Consistency**
   - ❌ Don't mix formatting styles
   - ✅ Do: Use consistent formatting for citations, lists, headers
   - UI Solution: Design style guide for all UI elements

5. **Bilingual Mixing**
   - ❌ Don't randomly switch languages
   - ✅ Do: Switch intentionally and clearly mark language changes
   - UI Solution: Use visual markers (italics, quotes) for language transitions

---

## Part 8: Future Enhancement Suggestions

### From User Feedback:
1. **Enhanced Interactivity**
   - More personalized questions to gather specific details
   - Real-time calculations (e.g., wage calculations)
   - Interactive forms for complaints

2. **Human Integration**
   - Direct referral to DOLE persons
   - Lawyer availability indicator
   - Callback scheduling feature

3. **Conversation Management**
   - Save conversations to account
   - Email transcript option
   - Share with lawyer/advocate
   - Print-friendly format

4. **Expanded Language Coverage** ✓ **Partially Implemented**
   - Filipino, English, and Cebuano support now available
   - Support for other major Philippine languages (Ilonggo, Kapampangan, etc.) - planned for Phase 2
   - Regional-specific information (wage rates by region in local language)
   - Industry-specific guidance in local languages

---

## Summary of Design Principles

| Principle | Description |
|-----------|-------------|
| **Clarity First** | Always prioritize understanding over legal precision |
| **Bilingual Native** | Design for both languages equally, not as translation |
| **Cite Everything** | Every claim should have legal reference |
| **Step by Step** | Break procedures into clear, numbered actions |
| **Trust Through Transparency** | Be honest about limitations and uncertainties |
| **Accessible to All** | Design for non-lawyers, mobile users, and low literacy |
| **Respectful of Rights** | Empower users without overstepping into legal practice |
| **Help When Stuck** | Referral pathways to human help should be visible |

---

*This document should be used as the foundation for UI/UX design mockups and development specifications.*
