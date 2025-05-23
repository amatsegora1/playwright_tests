import { RegistrationForm } from '../pages/RegistrationForm';
import * as dotenv from 'dotenv';
import { test, expect } from './fixtures/userGarage.fixture';
dotenv.config();

test.describe('Login', () => {

    test('Login and save storage state', async ({ page }) => {
        const form = new RegistrationForm(page);

        await page.goto('/');
        await form.signInButton.click();

        await form.signIneEmailField.fill(process.env.TEST_USER_EMAIL!);
        await form.signInPasswordField.fill(process.env.TEST_USER_PASSWORD!);
        await form.loginButton.click();

        await expect(page.getByText('You have been successfully logged in')).toBeVisible();

        await page.context().storageState({ path: 'storage/user.json' });
    });

    test('Garage page loads for logged-in user', async ({ userGaragePage }) => {
        await userGaragePage.goto('panel/garage');
        await expect(userGaragePage.getByRole('link', { name: 'Garage', exact: true })).toBeVisible();
    });

})