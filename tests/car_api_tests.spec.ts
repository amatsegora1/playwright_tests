import { test, expect, request, APIRequestContext } from '@playwright/test';

let apiContext: APIRequestContext;

// Create authenticated context using saved storageState
test.beforeAll(async () => {
  apiContext = await request.newContext({
    baseURL: process.env.BASE_URL,
    storageState: 'storage/user.json',
  });
});

// Positive test
test('Positive: Create car with valid data', async () => {
  const response = await apiContext.post('/api/cars', {
    data: {
      carBrandId: 1,
      carModelId: 1,
      mileage: 123,
    },
  });

  const responseBody = await response.json();
  console.log('STATUS:', response.status());
  console.log('RESPONSE:', responseBody);

  expect(response.ok()).toBeTruthy();
  expect(responseBody.status).toBe('ok');
});

// Negative test: Not authenticated
test('Negative: should return 401 without auth', async () => {
  const unauthContext = await request.newContext({ baseURL: process.env.BASE_URL });

  const response = await unauthContext.post('/api/cars', {
    data: {
      carBrandId: 1,
      carModelId: 1,
      mileage: 123,
    },
  });

  const body = await response.json();
  console.log('STATUS (unauth):', response.status());
  console.log('RESPONSE (unauth):', body);

  expect(response.status()).toBe(401);
  expect(body.message).toContain('Not authenticated');
});

// Negative test: Invalid request body
test('Negative: should return 400 with invalid payload', async () => {
  const response = await apiContext.post('/api/cars', {
    data: {
      carBrandId: null,
      carModelId: 1,
      mileage: 'wrong-type',
    },
  });

  const body = await response.json();
  console.log('STATUS (bad request):', response.status());
  console.log('RESPONSE (bad request):', body);

  expect(response.status()).toBe(400);
  expect(body.status).toBe('error');
});
