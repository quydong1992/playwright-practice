import { test, expect } from '@playwright/test';

/**
 * 01 - Login Tests
 * Target: https://practice.expandtesting.com/login
 *
 * Covers:
 * - Valid login → redirect to secure area
 * - Invalid password → error message shown
 * - Empty fields → validation message
 * - Logout → redirect back to login
 */

const LOGIN_URL = '/login';
const VALID_USER = 'practice';
const VALID_PASS = 'SuperSecretPassword!';

test.describe('Login Page', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(LOGIN_URL);
  });

  test('TC01 - Valid login should redirect to secure area', async ({ page }) => {
    await page.getByLabel('Username').fill(VALID_USER);
    await page.getByLabel('Password').fill(VALID_PASS);
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL(/secure/);
    await expect(page.getByText('You logged into a secure area!')).toBeVisible();
  });

  test('TC02 - Invalid password should show error message', async ({ page }) => {
    await page.getByLabel('Username').fill(VALID_USER);
    await page.getByLabel('Password').fill('wrongpassword');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByText('Your password is invalid!')).toBeVisible();
    await expect(page).toHaveURL(/login/);
  });

  test('TC03 - Invalid username should show error message', async ({ page }) => {
    await page.getByLabel('Username').fill('wronguser');
    await page.getByLabel('Password').fill(VALID_PASS);
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByText('Your username is invalid!')).toBeVisible();
  });

  test('TC04 - Empty username should show validation', async ({ page }) => {
    await page.getByLabel('Password').fill(VALID_PASS);
    await page.getByRole('button', { name: 'Login' }).click();

    // HTML5 validation prevents submit — username field should be focused
    const usernameField = page.getByLabel('Username');
    await expect(usernameField).toBeFocused();
  });

  test('TC05 - Successful login then logout should return to login page', async ({ page }) => {
    await page.getByLabel('Username').fill(VALID_USER);
    await page.getByLabel('Password').fill(VALID_PASS);
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL(/secure/);

    await page.getByRole('link', { name: 'Logout' }).click();

    await expect(page).toHaveURL(/login/);
    await expect(page.getByText('You logged out of the secure area!')).toBeVisible();
  });

});
