import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

/**
 * 06 - Page Object Model (POM) Demo
 *
 * Same login tests as 01-login.spec.ts but refactored
 * using the Page Object Model pattern for better reusability.
 *
 * Why POM?
 * - Centralize locators in one place
 * - Reuse page methods across test files
 * - Easier to maintain when UI changes
 */

test.describe('Login with Page Object Model', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('TC01 - Valid login using POM', async () => {
    await loginPage.login('practice', 'SuperSecretPassword!');
    await loginPage.expectLoginSuccess();
  });

  test('TC02 - Invalid password using POM', async () => {
    await loginPage.login('practice', 'wrongpassword');
    await loginPage.expectLoginFailed('Your password is invalid!');
  });

  test('TC03 - Invalid username using POM', async () => {
    await loginPage.login('wronguser', 'SuperSecretPassword!');
    await loginPage.expectLoginFailed('Your username is invalid!');
  });

});
