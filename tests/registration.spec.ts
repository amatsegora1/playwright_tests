import { test, expect } from '@playwright/test';
import { RegistrationForm } from '../pages/RegistrationForm';

test.describe('Registration form validation', () => {
    let form: RegistrationForm;

    test.beforeEach(async ({page}) => {
        form = new RegistrationForm(page);
        await page.goto ('https://guest:welcome2qauto@qauto.forstudy.space');
        await form.signUpButton.click();
    })

    test ('Name field validations', async ({page}) =>{
        //Registation button should be disabled 
        await expect(form.registerButton).toBeDisabled();

        //Empty name field verification
        await form.nameField.focus();
        await form.clickAway.click();
        await form.expectErrorBorder(form.nameField);
        await expect(page.getByText('Name required')).toBeVisible();

        //Invalid name field verification
        await form.nameField.fill('123');
        await form.clickAway.click();
        await form.expectErrorBorder(form.nameField);
        await expect(page.getByText('Name is invalid')).toBeVisible();

        //Long name field verification
        await form.nameField.fill('');
        await form.nameField.fill('Uncharacteristicallyy');
        await form.clickAway.click();
        await form.expectErrorBorder(form.nameField);
        await expect(page.getByText('Name has to be from 2 to 20 characters long')).toBeVisible();

        //Short name field verification
        await form.nameField.fill('');
        await form.nameField.fill('U');
        await form.clickAway.click();
        await form.expectErrorBorder(form.nameField);
        await expect(page.getByText('Name has to be from 2 to 20 characters long')).toBeVisible();
    })

    test ('LastName field validations', async ({page}) =>{
        //Empty last name field verification
        await form.lastNameField.focus();
        await form.clickAway.click();
        await form.expectErrorBorder(form.lastNameField);
        await expect(page.getByText('Last name required')).toBeVisible();

        //Invalid L name field verification
        await form.lastNameField.fill('123');
        await form.clickAway.click();
        await form.expectErrorBorder(form.lastNameField);
        await expect(page.getByText('Last name is invalid')).toBeVisible();
        
        //Empty L name field verification
        await form.lastNameField.fill('');
        await form.lastNameField.fill('Uncharacteristicallyy');
        await form.clickAway.click();
        await form.expectErrorBorder(form.lastNameField);
        await expect(page.getByText('Last name has to be from 2 to 20 characters long')).toBeVisible();

        //Sort L name field verification
        await form.lastNameField.fill('');
        await form.lastNameField.fill('U');
        await form.clickAway.click();
        await form.expectErrorBorder(form.lastNameField);
        await expect(page.getByText('Last name has to be from 2 to 20 characters long')).toBeVisible();
    })

    test ('Email field validations', async ({page}) =>{
        //Empty email verification
        await form.emailField.focus();
        await form.clickAway.click();
        await form.expectErrorBorder(form.emailField);
        await expect(page.getByText('Email required')).toBeVisible();

        //Invalid email verification
        await form.emailField.fill('123');
        await form.clickAway.click();
        await form.expectErrorBorder(form.emailField);
        await expect(page.getByText('Email is incorrect')).toBeVisible();
    })

    test ('Password and Re-enter password fields validations', async ({page}) =>{
        //Empty password verification
        await form.passwordField.focus();
        await form.clickAway.click();
        await form.expectErrorBorder(form.passwordField);
        await expect(page.getByText('Password required')).toBeVisible();

        //Empty Re-enter password verification
        await form.reEnterPasswordField.focus();
        await form.clickAway.click();
        await form.expectErrorBorder(form.reEnterPasswordField);
        await expect(page.getByText('Re-enter password required')).toBeVisible();

        //Invalid password verification
        await form.passwordField.fill('123');
        await form.clickAway.click();
        await form.expectErrorBorder(form.passwordField);
        await expect(page.getByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')).toBeVisible();
        await form.passwordField.fill('');

        //Invalid Re-enter password verification
        await form.reEnterPasswordField.fill('123');
        await form.clickAway.click();
        await form.expectErrorBorder(form.reEnterPasswordField);
        await expect(page.getByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')).toBeVisible();
        await form.reEnterPasswordField.fill('');

        //Password do not match verification
        await form.passwordField.fill('12345678Aa');
        await form.reEnterPasswordField.fill('12345678AaA');
        await form.expectErrorBorder(form.reEnterPasswordField);
        await expect(page.getByText('Passwords do not match')).toBeVisible();

    })

    test ('Success sign-up and login', async ({page}) =>{
        //Passowrd and email 
        const email: string = form.generateUniqueEmail();
        const password: string = '12345678Aa';

        //Title check
        await expect(page.locator('h4', { hasText: 'Registration' })).toBeVisible();

        //Add F name
        await form.nameField.fill('AlexTestFname');
        await form.clickAway.click();
        await expect(page.getByText('Name is invalid')).not.toBeVisible();

        //Add L name 
        await form.lastNameField.fill('AlexTestLname');
        await form.clickAway.click();
        await expect(page.getByText('Last Name is invalid')).not.toBeVisible();

        //Add email
        await form.emailField.fill(email);
        await form.clickAway.click();
        await expect(page.getByText('Email is incorrect')).not.toBeVisible();
        
        //Add password
        await form.passwordField.fill(password);
        await form.reEnterPasswordField.fill(password);
        await form.clickAway.click();
        await expect(page.getByText('Passwords do not match')).not.toBeVisible();

        //Finish registration
        await expect(form.registerButton).toBeEnabled();
        await form.registerButton.click();
        await expect(page.getByText('Registration complete')).toBeVisible();
        await form.logoutLink.click(); //sign-out

        //Login check
        await form.signInButton.click();
        await form.signIneEmailField.fill(email);
        await form.signInPasswordField.fill(password);
        await form.loginButton.click();
        await expect(page.getByText('You have been successfully logged in')).toBeVisible();
    })


    
})