// Mock Backend Server for Testing
// File: mock-backend.js
// Usage: node mock-backend.js
// This creates a local test server matching BACKEND_API_SPECIFICATIONS.md v1.0.0

import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Store sessions and conversations in memory for testing
const sessions = {};
const conversations = {};
const messages = {};

// ============================================================================
// AUTH ENDPOINTS
// ============================================================================

app.post('/api/v1/auth/session', (req, res) => {
  try {
    const { language, metadata } = req.body;

    const sessionId = `session-${Date.now()}`;
    const token = `jwt-token-${Date.now()}`;
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

    const session = {
      sessionId,
      token,
      expiresAt: expiresAt.toISOString(),
      expiresIn: 604800,
      language: language || 'en',
      createdAt: new Date().toISOString()
    };

    sessions[sessionId] = session;

    console.log(`✅ Created session: ${sessionId}`);

    res.status(201).json(session);
  } catch (error) {
    console.error('❌ Session creation error:', error);
    res.status(500).json({
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: error.message,
        timestamp: new Date().toISOString()
      }
    });
  }
});

// ============================================================================
// CHAT MESSAGE ENDPOINT - POST /api/v1/chat/message
// ============================================================================

app.post('/api/v1/chat/message', (req, res) => {
  try {
    const { conversationId, message, language, context } = req.body;

    // Validate request
    if (!conversationId || !message) {
      return res.status(400).json({
        error: {
          code: 'VALIDATION_ERROR',
          message: 'conversationId and message are required',
          timestamp: new Date().toISOString()
        }
      });
    }

    console.log(`\n📩 Received message in ${language}:`);
    console.log(`   Conversation: ${conversationId}`);
    console.log(`   Message: ${message}`);
    console.log(`   Previous messages: ${context?.previousMessageIds?.length || 0}`);

    // Generate mock response based on message
    const mockResponse = generateMockResponse(message, language, context);

    // Simulate processing time
    const processingTime = 0.5 + Math.random() * 1.5;

    // Build response matching BACKEND_API_SPECIFICATIONS.md
    const response = {
      messageId: `msg-${Date.now()}`,
      role: 'assistant',
      content: mockResponse.content,
      timestamp: new Date().toISOString(),
      citations: mockResponse.citations,
      suggestions: mockResponse.suggestions,
      metadata: {
        processingTime: Math.round(processingTime * 100) / 100,
        model: 'mock-gpt-4',
        confidence: 0.92
      }
    };

    console.log(`✅ Sending response (${Math.round(processingTime * 1000)}ms)`);

    // Simulate network delay
    setTimeout(() => {
      res.json(response);
    }, processingTime * 1000);

  } catch (error) {
    console.error('❌ Error:', error);
    res.status(500).json({
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: error.message,
        timestamp: new Date().toISOString()
      }
    });
  }
});

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function generateMockResponse(userMessage, language, context) {
  const lowerMessage = userMessage.toLowerCase();
  
  // Multi-turn awareness
  const hasContext = context?.previousMessageIds?.length > 0;
  
  let content = '';
  let citations = [];
  let suggestions = [];

  // ---- TERMINATION-RELATED QUESTIONS ----
  if (lowerMessage.includes('terminat')) {
    if (hasContext && lowerMessage.includes('appeal')) {
      content = `Based on your previous question about termination rights, yes, you can appeal an illegal termination. 

Under Article 288 of the Labor Code, if your termination was without just cause or without proper notice, you have the right to:

1. File a complaint with the DOLE
2. Request reinstatement or separation pay
3. Recover unpaid wages and benefits

You have 4 years from the date of termination to file. The appeals process typically takes 3-6 months.`;

      citations = [
        {
          id: 'cite-1',
          text: 'An employer may terminate an employee only for a just cause...',
          source: 'Labor Code of the Philippines',
          article: 'Article 288',
          url: 'https://www.dole.gov.ph/labor-code/',
          confidence: 0.95
        }
      ];
    } else {
      content = `Under Article 279 of the Labor Code of the Philippines, regular employees are entitled to security of tenure.

Your employer can only terminate you for:
- Just cause (serious misconduct, habitual violation, etc.)
- Authorized cause (redundancy, business closure, etc.)

If terminated without just cause or without proper notice period, you are entitled to:
1. Full backpay and benefits
2. Reinstatement (or separation pay if reinstatement is not possible)
3. Damages

The termination must follow proper procedures:
- Written notice at least 30 days in advance (except in cases of serious misconduct)
- Opportunity to present your side
- Proper documentation`;

      citations = [
        {
          id: 'cite-1',
          text: 'Regular employees are entitled to security of tenure...',
          source: 'Labor Code of the Philippines',
          article: 'Article 279',
          url: 'https://www.dole.gov.ph/labor-code/',
          confidence: 0.95
        },
        {
          id: 'cite-2',
          text: 'Just causes for termination include...',
          source: 'Labor Code of the Philippines',
          article: 'Article 282',
          url: 'https://www.dole.gov.ph/labor-code/',
          confidence: 0.93
        }
      ];
    }
  }
  
  // ---- OVERTIME-RELATED QUESTIONS ----
  else if (lowerMessage.includes('overtime')) {
    if (hasContext && lowerMessage.includes('rate')) {
      content = `Continuing on overtime pay, the rate varies by day:

**Overtime Rate (Monday-Saturday, 6+ hours):
- Regular days: 130% of daily wage
- Saturday (if already worked 5 days): 130% of daily wage
- Sunday or Holiday: 130% of daily wage plus holiday bonus (50-100%)

Example: If your daily wage is PHP 1,000:
- Overtime on regular day: PHP 1,300 per hour
- Sunday overtime: PHP 1,300 + (50-100%) = PHP 1,950-2,300 per hour

Premium for work during rest days:
- First 4 hours: 130% of daily rate
- Additional hours: 169% of daily rate`;

      citations = [
        {
          id: 'cite-1',
          text: 'Overtime compensation shall be paid at the rate of not less than one and one-third times the regular wage...',
          source: 'Labor Code of the Philippines',
          article: 'Article 87',
          url: 'https://www.dole.gov.ph/labor-code/',
          confidence: 0.94
        }
      ];
    } else {
      content = `According to Article 87 of the Labor Code, employees are entitled to overtime pay for work performed beyond 8 hours a day or 40 hours a week.

**Your Overtime Rights:**
- Overtime rate: 130% of your hourly wage (1.3x multiplier)
- Must be paid within 30 days after the end of the pay period
- Cannot be compensated with time-off unless agreed in writing
- Work on Sundays and holidays gets additional premium

**Requirements for Overtime:**
- Must be authorized by your employer
- Must be necessary and urgent
- Cannot exceed 4 hours per day
- Cannot exceed 16 hours per week

**How to Calculate:**
1. Divide your daily wage by 8 hours = hourly rate
2. Multiply hourly rate by 1.3
3. Multiply by number of overtime hours`;

      citations = [
        {
          id: 'cite-1',
          text: 'Work performed beyond eight hours a day shall be compensated at the rate of not less than one and one-third times the regular wage of the employee...',
          source: 'Labor Code of the Philippines',
          article: 'Article 87',
          url: 'https://www.dole.gov.ph/labor-code/',
          confidence: 0.96
        }
      ];
    }
  }

  // ---- LEAVES-RELATED QUESTIONS ----
  else if (lowerMessage.includes('leave') || lowerMessage.includes('sick') || lowerMessage.includes('vacation')) {
    if (hasContext && lowerMessage.includes('emergency')) {
      content = `For emergency situations not covered by regular leave types:

You can file:
1. **Bereavement Leave** - 3-5 days if immediate family member dies
2. **Emergency Leave** - Can be negotiated with your employer
3. **VAWC Leave** - 10 days if victim of violence
4. **Solo Parent Leave** - 7 days if you are a solo parent
5. **Magna Carta for PWD Leave** - Various benefits for persons with disability

Always notify your employer as soon as possible and provide documentation.`;

      citations = [
        {
          id: 'cite-1',
          text: 'Employees are entitled to leave benefits...',
          source: 'Labor Code of the Philippines',
          article: 'Article 282',
          url: 'https://www.dole.gov.ph/labor-code/',
          confidence: 0.88
        }
      ];
    } else {
      content = `Under the Labor Code, you are entitled to the following leaves:

**Service Incentive Leave (SIL):**
- 5 days per year for employees with at least 1 year of service
- With pay
- Can be converted to cash if not used

**Vacation Leave (VL):**
- Depends on company policy (usually 10-15 days per year)
- Check your employment contract

**Sick Leave (SL):**
- Usually 10 days per year with pay
- Check your company policy and collective bargaining agreement

**Paternity Leave:**
- 7 days for employed fathers

**Maternity Leave:**
- 60 days for normal delivery
- 78 days for caesarean section

**Special Leaves:**
- Bereavement, emergency, study leave (as per CBA or company policy)`;

      citations = [
        {
          id: 'cite-1',
          text: 'Employees shall be entitled to service incentive leave of five days with pay...',
          source: 'Labor Code of the Philippines',
          article: 'Article 95',
          url: 'https://www.dole.gov.ph/labor-code/',
          confidence: 0.94
        },
        {
          id: 'cite-2',
          text: 'Maternity leave shall be paid for four months...',
          source: 'Labor Code of the Philippines',
          article: 'Article 133',
          url: 'https://www.dole.gov.ph/labor-code/',
          confidence: 0.92
        }
      ];
    }
  }

  // ---- DEFAULT RESPONSE ----
  else {
    content = `I understand you're asking about: "${userMessage}"

This is an important labor rights question. Based on Philippine Labor Law, I'm here to help you understand your rights.

To provide you with the most accurate information, could you please clarify:
1. What is your employment status? (Regular, Contractual, Casual, Probationary)
2. How long have you been with your current employer?
3. Is this related to a specific incident or ongoing situation?

Common labor rights topics I can help with:
- Termination and severance
- Overtime and compensation
- Leave entitlements
- Benefits and deductions
- Workplace safety
- Discrimination and harassment`;

    citations = [
      {
        id: 'cite-1',
        text: 'The State recognizes the rights of workers and promotes their welfare through the Labor Code...',
        source: 'Labor Code of the Philippines',
        article: 'Article 1',
        url: 'https://www.dole.gov.ph/labor-code/',
        confidence: 0.90
      }
    ];
  }

  // Build suggestions
  suggestions = [
    {
      id: 'action-1',
      type: 'contact',
      label: 'Contact DOLE',
      data: {
        name: 'Department of Labor and Employment',
        hotline: '1349',
        email: 'dolero4a@gmail.com',
        website: 'https://www.dole.gov.ph'
      }
    },
    {
      id: 'action-2',
      type: 'form',
      label: 'File SEnA Request',
      data: {
        formName: 'Single Entry Approach (SEnA)',
        instructions: [
          'Go to nearest DOLE office',
          'Fill out SEnA Request Form',
          'Submit with supporting documents'
        ],
        downloadUrl: 'https://www.dole.gov.ph/sena-request-form/'
      }
    },
    {
      id: 'action-3',
      type: 'link',
      label: 'Find a Lawyer',
      data: {
        url: 'https://www.pao.gov.ph',
        external: true,
        description: 'Public Attorney\'s Office (Free legal services)'
      }
    }
  ];

  return { content, citations, suggestions };
}

// ============================================================================
// SERVER STARTUP
// ============================================================================

app.listen(PORT, () => {
  console.log('🚀 Mock Backend Server Running');
  console.log(`📍 URL: http://127.0.0.1:${PORT}`);
  console.log(`📨 POST /api/v1/auth/session - Session creation`);
  console.log(`📨 POST /api/v1/chat/message - Ready for testing`);
  console.log('\nWaiting for requests...\n');
});
