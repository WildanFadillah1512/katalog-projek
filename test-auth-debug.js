// Test script for authentication
async function testAuth() {
    try {
        // Test 1: Login
        console.log('1. Testing login...');
        const loginRes = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'john@example.com', password: 'user123' })
        });

        const loginData = await loginRes.json();
        console.log('Login response:', loginData);

        if (loginData.token) {
            // Test 2: Validate coupon with token
            console.log('\n2. Testing coupon validation...');
            const couponRes = await fetch('http://localhost:3000/api/coupons/validate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${loginData.token}`
                },
                body: JSON.stringify({ code: 'WELCOME10', totalAmount: 50 })
            });

            const couponData = await couponRes.json();
            console.log('Coupon validation response:', couponData);
            console.log('Status:', couponRes.status);
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}

testAuth();