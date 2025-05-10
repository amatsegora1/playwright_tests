import { expect, Page, Locator } from '@playwright/test';

export class RegistrationForm {
  readonly page: Page;
  readonly signUpButton: Locator;
  readonly registerButton: Locator;
  readonly nameField: Locator;
  readonly lastNameField: Locator;
  readonly emailField: Locator;
  readonly passwordField: Locator;
  readonly reEnterPasswordField: Locator;
  readonly clickAway: Locator;
  readonly signInButton: Locator;
  readonly signIneEmailField: Locator;
  readonly signInPasswordField: Locator;
  readonly loginButton: Locator;
  readonly logoutLink: Locator;
  readonly errorBorderColor = 'rgb(220, 53, 69)';

  //Locators identifiers
  constructor(page: Page) {
    this.page = page;
    this.signUpButton = page.locator('.hero-descriptor button.btn-primary');
    this.registerButton = page.locator('.modal-footer button.btn-primary');
    this.nameField = page.locator('#signupName');
    this.lastNameField = page.locator('#signupLastName');
    this.emailField = page.locator('#signupEmail');
    this.passwordField = page.locator('#signupPassword');
    this.reEnterPasswordField = page.locator('#signupRepeatPassword');
    this.clickAway = page.locator ('app-signup-modal .modal-header');
    this.signInButton = page.locator('button', { hasText: 'Sign In' });
    this.signIneEmailField = page.locator('#signinEmail');
    this.signInPasswordField = page.locator('#signinPassword');
    this.loginButton = page.locator('button', { hasText: 'Login' });
    this.logoutLink = page.locator('a', { hasText: 'Log out' });
  }

  //Red border coloer function
  async expectErrorBorder(locator: Locator) {
    await expect(locator).toHaveCSS('border-color', this.errorBorderColor);
  }

  //Unique email generator
  generateUniqueEmail(): string {
    const random = Math.floor(Math.random() * 100000);
    return `test${random}@example.com`;
  }
}