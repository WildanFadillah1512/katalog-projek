
import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:3000/api/auth';

async function testAuth() {
    try {
        // 1. Register
        console.log('Testing Registration...');
        const regRes = await fetch(`${BASE_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: 'Test Setup User',
                email: 'setup@test.com',
                password: 'password123'
            })
        });

        const regData = await regRes.json();
        console.log('Register Status:', regRes.status);
        console.log('Register Response:', regData);

        if (!regRes.ok && regData.error !== 'SQLITE_CONSTRAINT: UNIQUE constraint failed: users.email') {
            throw new Error('Registration failed');
        }

        // 2. Login
        console.log('\nTesting Login...');
        const loginRes = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: 'setup@test.com',
                password: 'password123'
            })
        });

        const loginData = await loginRes.json();
        console.log('Login Status:', loginRes.status);
        console.log('Login Response:', loginData);

        if (loginData.token) {
            console.log('\nToken received:', loginData.token);

            // 3. Check Me
            console.log('\nTesting /me Endpoint...');
            const meRes = await fetch(`${BASE_URL}/me`, {
                headers: { 'Authorization': `Bearer ${loginData.token}` }
            });
            const meData = await meRes.json();
            console.log('Me Status:', meRes.status);
            console.log('Me Response:', meData);
        }

    } catch (error) {
        console.error('Test Failed:', error);
    }
}

testAuth();
