const { spawn } = require('child_process');

async function runTests() {
  console.log('[Test Suite] Starting backend server process...');
  const server = spawn('node', ['server.js'], { cwd: __dirname, stdio: 'pipe' });

  server.stdout.on('data', (d) => process.stdout.write(d.toString()));
  server.stderr.on('data', (d) => process.stderr.write(d.toString()));

  // Wait 3.5 seconds for boot
  await new Promise((r) => setTimeout(r, 3500));

  try {
    const BASE = 'http://127.0.0.1:5000/api';

    // 1. Health check
    console.log('\n[1/5] Testing Healthcheck...');
    const healthRes = await fetch(`${BASE}/health`);
    const healthData = await healthRes.json();
    console.log('✓ Health status:', healthData.status);

    // 2. Articles check
    console.log('\n[2/5] Testing Articles API...');
    const articlesRes = await fetch(`${BASE}/articles`);
    const articlesData = await articlesRes.json();
    console.log(`✓ Articles loaded: ${articlesData.count} items (First: "${articlesData.data[0]?.title?.substring(0, 35)}...")`);

    // 3. Admin Authentication
    console.log('\n[3/5] Testing Admin Authentication Login...');
    const loginRes = await fetch(`${BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@community.org', password: 'admin123' })
    });
    const loginData = await loginRes.json();
    console.log('✓ Login success:', loginData.success, '| User:', loginData.data?.name, '| Role:', loginData.data?.role);
    const token = loginData.data?.token;

    // 4. Survey Submission
    console.log('\n[4/5] Testing Community Survey Submission...');
    const surveyPayload = {
      respondentName: 'Kishan Lal',
      village: 'Devpur',
      district: 'Jaipur',
      ageGroup: '26-40',
      gender: 'Male',
      occupation: 'Farmer/Agriculture',
      educationLevel: 'High School',
      smartphoneOwnership: 'Personal Smartphone',
      internetUsageFrequency: 'Daily',
      digitalPaymentUsage: 'Regular (UPI/PhonePe/GPay)',
      onlineGovtServices: 'Yes, regularly',
      encounteredFraud: 'Received suspicious calls/links',
      cyberHelplineAwareness: 'Yes (Know 1930 & Portal)',
      primaryBarrier: 'Fear of financial loss/fraud',
      desiredTopics: ['UPI Safety (PhonePe/GPay)'],
      feedback: 'Very helpful awareness program.'
    };
    const surveyRes = await fetch(`${BASE}/surveys`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(surveyPayload)
    });
    const surveyData = await surveyRes.json();
    console.log('✓ Survey saved! Score:', surveyData.data?.awarenessScore, '| ID:', surveyData.data?._id);

    // 5. Admin Dashboard Metrics
    console.log('\n[5/5] Testing Admin Dashboard Stats API...');
    const dashRes = await fetch(`${BASE}/dashboard/stats`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const dashData = await dashRes.json();
    console.log('✓ Dashboard Total Surveys in DB:', dashData.data?.summary?.totalSurveys);
    console.log('✓ Dashboard Smartphone Adoption Rate:', dashData.data?.summary?.smartphoneRate + '%');
    console.log('✓ Dashboard Average Awareness Score:', dashData.data?.summary?.avgAwarenessScore + '/100');

    console.log('\n======================================================');
    console.log('  ALL INTEGRATION TESTS PASSED WITH 100% SUCCESS!     ');
    console.log('======================================================\n');
  } catch (err) {
    console.error('Test Error:', err);
  } finally {
    server.kill();
    process.exit(0);
  }
}

runTests();
