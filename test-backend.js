// Test Backend Connection
// Run: node test-backend.js

const API_BASE_URL = 'http://127.0.0.1:8000/api/v1';

async function testBackend() {
  console.log('🧪 Testing Backend Connection...\n');
  
  // Test 1: Create Session
  console.log('1️⃣ Testing session creation...');
  try {
    const sessionResponse = await fetch(`${API_BASE_URL}/auth/session`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        language: 'en',
        metadata: {
          userAgent: 'Test Script',
          timezone: 'Asia/Manila'
        }
      })
    });

    if (!sessionResponse.ok) {
      throw new Error(`HTTP ${sessionResponse.status}: ${sessionResponse.statusText}`);
    }

    const session = await sessionResponse.json();
    console.log('✅ Session created successfully');
    console.log(`   Session ID: ${session.sessionId}`);
    console.log(`   Token: ${session.token.substring(0, 20)}...`);
    console.log(`   Expires: ${session.expiresAt}\n`);

    // Test 2: Send Chat Message
    console.log('2️⃣ Testing chat message...');
    const chatResponse = await fetch(`${API_BASE_URL}/chat/message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept-Language': 'en',
        'Authorization': `Bearer ${session.token}`
      },
      body: JSON.stringify({
        conversationId: 'test-conv-001',
        message: 'What are my overtime rights?',
        language: 'en',
        context: {
          previousMessageIds: [],
          userMetadata: {
            employmentType: 'regular',
            industry: 'general'
          }
        }
      })
    });

    if (!chatResponse.ok) {
      const error = await chatResponse.json();
      throw new Error(`HTTP ${chatResponse.status}: ${JSON.stringify(error)}`);
    }

    const chatData = await chatResponse.json();
    console.log('✅ Chat message sent successfully');
    console.log(`   Message ID: ${chatData.messageId}`);
    console.log(`   Response: ${chatData.content.substring(0, 100)}...`);
    console.log(`   Citations: ${chatData.citations?.length || 0}`);
    console.log(`   Suggestions: ${chatData.suggestions?.length || 0}\n`);

    console.log('🎉 All tests passed! Backend is working correctly.');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error('\n📋 Troubleshooting:');
    console.error('   - Is backend running on http://127.0.0.1:8000?');
    console.error('   - Check backend console for errors');
    console.error('   - Verify CORS is enabled for all origins');
  }
}

testBackend();
