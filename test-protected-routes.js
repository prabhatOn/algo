/**
 * Simple test script to verify protected routes and token refresh flow
 * Run this in the browser console after logging in
 */

const testProtectedRoutes = async () => {
  console.log('🧪 Testing Protected Routes and Token Refresh...');

  // Test 1: Check if user is authenticated
  const token = localStorage.getItem('authToken');
  const refreshToken = localStorage.getItem('refreshToken');

  console.log('✅ Auth tokens present:', {
    accessToken: !!token,
    refreshToken: !!refreshToken
  });

  // Test 2: Try accessing protected route
  try {
    console.log('🔄 Testing dashboard access...');
    const response = await fetch('http://localhost:5000/api/dashboard/user', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      console.log('✅ Dashboard access successful');
    } else if (response.status === 401) {
      console.log('⚠️  Access denied - token might be expired');
    } else {
      console.log('❌ Dashboard access failed:', response.status);
    }
  } catch (error) {
    console.log('❌ Network error accessing dashboard:', error.message);
  }

  // Test 3: Try accessing admin route (should fail for regular users)
  try {
    console.log('🔄 Testing admin route access...');
    const response = await fetch('http://localhost:5000/api/dashboard/admin', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (response.status === 403) {
      console.log('✅ Admin route properly protected (403 Forbidden)');
    } else if (response.ok) {
      console.log('⚠️  Admin route accessible - user might be admin');
    } else {
      console.log('❌ Admin route test failed:', response.status);
    }
  } catch (error) {
    console.log('❌ Network error accessing admin route:', error.message);
  }

  // Test 4: Test token refresh by making a request that might trigger refresh
  try {
    console.log('🔄 Testing token refresh flow...');
    // Make multiple requests to potentially trigger token refresh
    for (let i = 0; i < 3; i++) {
      const response = await fetch('http://localhost:5000/api/dashboard/user', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 401) {
        console.log(`⚠️  Request ${i + 1} failed with 401 - token refresh should trigger`);
        break;
      } else if (response.ok) {
        console.log(`✅ Request ${i + 1} successful`);
      }
      await new Promise(resolve => setTimeout(resolve, 500)); // Small delay
    }
  } catch (error) {
    console.log('❌ Error during token refresh test:', error.message);
  }

  console.log('🎯 Protected Routes Test Complete');
};

// Auto-run if in browser environment
if (typeof window !== 'undefined') {
  testProtectedRoutes();
}

export { testProtectedRoutes };