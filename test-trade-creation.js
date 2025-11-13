/**
 * Simple test script to verify trade creation functionality
 * Run this in the browser console after logging in
 */

const testTradeCreation = async () => {
  console.log('🧪 Testing Trade Creation...');

  const token = localStorage.getItem('authToken');
  if (!token) {
    console.log('❌ No auth token found - please login first');
    return;
  }

  // Test data for trade creation
  const testTradeData = {
    orderId: `TEST${Date.now()}`,
    market: 'Indian',
    symbol: 'RELIANCE',
    type: 'Buy',
    amount: 10,
    price: 2300.50,
    broker: 'Test Broker',
    brokerType: 'Indian',
    date: new Date().toISOString().split('T')[0]
  };

  console.log('📤 Sending trade data:', testTradeData);

  try {
    const response = await fetch('http://localhost:5000/api/trades', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testTradeData)
    });

    const result = await response.json();

    if (response.ok && result.success) {
      console.log('✅ Trade creation successful:', result.data);
    } else {
      console.log('❌ Trade creation failed:', {
        status: response.status,
        error: result.error || result.message
      });
    }
  } catch (error) {
    console.log('❌ Network error during trade creation:', error.message);
  }

  // Test 2: Try creating trade with missing required fields
  console.log('🔄 Testing validation with missing fields...');
  const invalidTradeData = {
    symbol: 'TCS',
    type: 'Buy'
    // Missing required fields: market, amount, price, broker
  };

  try {
    const response = await fetch('http://localhost:5000/api/trades', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(invalidTradeData)
    });

    const result = await response.json();

    if (response.status === 400) {
      console.log('✅ Validation working - properly rejected invalid data:', result.error);
    } else {
      console.log('⚠️  Validation might not be working:', {
        status: response.status,
        result
      });
    }
  } catch (error) {
    console.log('❌ Network error during validation test:', error.message);
  }

  console.log('🎯 Trade Creation Test Complete');
};

// Auto-run if in browser environment
if (typeof window !== 'undefined') {
  testTradeCreation();
}

export { testTradeCreation };