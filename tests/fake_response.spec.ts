import { test, expect } from './fixtures/userGarage.fixture';

test('Fake profile data', async ({ userGaragePage }) => {
  await userGaragePage.route('**/api/users/profile', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        status: 'ok',
        data: {
          userId: 214607,
          photoFilename: 'default-user.png',
          name: 'Fake FName',
          lastName: 'Fake LName',
        },
      }),
    });
  });

  await userGaragePage.goto('/panel/profile');

  // Check that the fake value is diapleyd
  await expect(userGaragePage.getByText('Fake FName Fake LName')).toBeVisible();
});

