// scripts/test-integration.mjs
import http from 'http';

const BASE_URL = 'http://localhost:666';

async function request(method, path, body = null) {
  const options = {
    method,
    headers: {},
  };
  if (body) {
    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(body);
  }
  const res = await fetch(`${BASE_URL}${path}`, options);
  let data;
  try {
    data = await res.json();
  } catch {
    data = await res.text();
  }
  return { status: res.status, data };
}

async function runTests() {
  console.log('🧪 Starting Integration & Regression Tests...\n');
  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`  ✅ PASS: ${message}`);
      passed++;
    } else {
      console.error(`  ❌ FAIL: ${message}`);
      failed++;
    }
  }

  try {
    // 1. Root route
    console.log('--- 1. Testing Root Route ---');
    const rootRes = await fetch(`${BASE_URL}/`);
    assert(rootRes.status === 200, 'GET / returns 200');

    // 2. Regression: v1 FakeDB
    console.log('\n--- 2. Regression: v1 FakeDB ---');
    const v1Res = await request('GET', '/api/v1/users');
    assert(v1Res.status === 200 && Array.isArray(v1Res.data), 'GET /api/v1/users returns array of users');

    // 3. Regression: v2 MongoDB
    console.log('\n--- 3. Regression: v2 MongoDB ---');
    const v2Res = await request('GET', '/api/v2/users');
    assert(v2Res.status === 200 && Array.isArray(v2Res.data), 'GET /api/v2/users returns array of users');

    // 4. Regression: v2 Supabase PostgreSQL
    console.log('\n--- 4. Regression: v2 Supabase ---');
    const pgRes = await request('GET', '/api/v2/users/pg');
    assert(pgRes.status === 200 && pgRes.data.success === true, 'GET /api/v2/users/pg returns success');

    // 5. Week 11 Bcrypt: Register
    console.log('\n--- 5. Week 11 Bcrypt: POST /register ---');
    const testUsername = `test_user_${Date.now()}`;
    const testEmail = `${testUsername}@example.com`;
    const testPassword = 'Password123!';

    const regRes = await request('POST', '/register', {
      username: testUsername,
      email: testEmail,
      password: testPassword,
    });
    assert(regRes.status === 201 && regRes.data.insertedId, 'POST /register returns 201 and insertedId');
    const testUserId = regRes.data.insertedId;

    // 6. Week 11 Bcrypt: Login Successful
    console.log('\n--- 6. Week 11 Bcrypt: POST /login (Valid) ---');
    const loginRes = await request('POST', '/login', {
      username: testUsername,
      password: testPassword,
    });
    assert(loginRes.status === 200 && loginRes.data.message === 'You are Login !', 'POST /login with correct credentials succeeds');

    // 7. Week 11 Bcrypt: Login Wrong Password
    console.log('\n--- 7. Week 11 Bcrypt: POST /login (Wrong Password) ---');
    const wrongPassRes = await request('POST', '/login', {
      username: testUsername,
      password: 'wrong_password_here',
    });
    assert(wrongPassRes.status === 401 && wrongPassRes.data.message === 'Password is not correct', 'POST /login with wrong password returns 401');

    // 8. Week 11 Bcrypt: Login Nonexistent User
    console.log('\n--- 8. Week 11 Bcrypt: POST /login (Nonexistent User) ---');
    const nonUserRes = await request('POST', '/login', {
      username: 'non_existent_user_99999',
      password: testPassword,
    });
    assert(nonUserRes.status === 401 && nonUserRes.data.message.includes('invalid username'), 'POST /login with unknown user returns 401');

    // 9. Week 11 Bcrypt: PUT /users/by-param/:id
    console.log('\n--- 9. Week 11 Bcrypt: PUT /users/by-param/:id ---');
    const newPassword1 = 'UpdatedPassword1!';
    const putParamRes = await request('PUT', `/users/by-param/${testUserId}`, {
      password: newPassword1,
    });
    assert(putParamRes.status === 200 && putParamRes.data.message === 'Update via Param successful', 'PUT /users/by-param/:id succeeds');

    // Login with new password from param
    const loginAfterParam = await request('POST', '/login', {
      username: testUsername,
      password: newPassword1,
    });
    assert(loginAfterParam.status === 200 && loginAfterParam.data.message === 'You are Login !', 'Login with updated password via Param succeeds');

    // 10. Week 11 Bcrypt: PUT /users/by-body
    console.log('\n--- 10. Week 11 Bcrypt: PUT /users/by-body ---');
    const newPassword2 = 'UpdatedPassword2!';
    const putBodyRes = await request('PUT', '/users/by-body', {
      id: testUserId,
      password: newPassword2,
    });
    assert(putBodyRes.status === 200 && putBodyRes.data.message === 'Update via Body successful', 'PUT /users/by-body succeeds');

    // Login with new password from body
    const loginAfterBody = await request('POST', '/login', {
      username: testUsername,
      password: newPassword2,
    });
    assert(loginAfterBody.status === 200 && loginAfterBody.data.message === 'You are Login !', 'Login with updated password via Body succeeds');

    // 11. Structured REST: /api/v2/auth/register & /api/v2/auth/login
    console.log('\n--- 11. Structured Route: /api/v2/auth ---');
    const testUsername2 = `test_v2_${Date.now()}`;
    const v2AuthReg = await request('POST', '/api/v2/auth/register', {
      username: testUsername2,
      email: `${testUsername2}@example.com`,
      password: 'AuthPassword123',
    });
    assert(v2AuthReg.status === 201 && v2AuthReg.data.insertedId, 'POST /api/v2/auth/register returns 201');

    const v2AuthLogin = await request('POST', '/api/v2/auth/login', {
      username: testUsername2,
      password: 'AuthPassword123',
    });
    assert(v2AuthLogin.status === 200 && v2AuthLogin.data.message === 'You are Login !', 'POST /api/v2/auth/login returns 200');

    // 12. Password hashing in POST /api/v2/users
    console.log('\n--- 12. POST /api/v2/users (Mongoose route with bcrypt) ---');
    const testUsername3 = `test_v2users_${Date.now()}`;
    const v2UsersRes = await request('POST', '/api/v2/users', {
      username: testUsername3,
      email: `${testUsername3}@example.com`,
      password: 'V2UsersPassword123',
    });
    assert(v2UsersRes.status === 201 && v2UsersRes.data._id, 'POST /api/v2/users creates user');
    // Ensure password wasn't returned in response
    assert(!v2UsersRes.data.password && !v2UsersRes.data.passwordHash, 'Response does not leak password hash');

    // Can login with that user
    const loginV2User = await request('POST', '/api/v2/auth/login', {
      username: testUsername3,
      password: 'V2UsersPassword123',
    });
    assert(loginV2User.status === 200, 'User created via /api/v2/users can login with bcrypt comparison');

    // 13. DELETE /users/:username (Week 11 test)
    console.log('\n--- 13. DELETE /users/:username ---');
    const del1 = await request('DELETE', `/users/${testUsername}`);
    assert(del1.status === 200 && del1.data.deletedCount === 1, 'DELETE /users/:username deletes user');

    const del2 = await request('DELETE', `/users/${testUsername2}`);
    assert(del2.status === 200 && del2.data.deletedCount === 1, 'DELETE /users/:username deletes second test user');

    const del3 = await request('DELETE', `/api/v2/users/${v2UsersRes.data._id}`);
    assert(del3.status === 200, 'DELETE /api/v2/users/:id deletes third test user');

    console.log(`\n================================`);
    console.log(`Total tests: ${passed + failed}`);
    console.log(`Passed: ${passed}`);
    console.log(`Failed: ${failed}`);
    console.log(`================================`);

    if (failed > 0) {
      process.exit(1);
    }
  } catch (err) {
    console.error('Error during testing:', err);
    process.exit(1);
  }
}

runTests();
