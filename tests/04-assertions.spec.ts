import { test, expect } from '@playwright/test';

/**
 * 04 - Assertions Practice
 *
 * Covers common Playwright assertions:
 * - toBeVisible / toBeHidden
 * - toHaveText / toContainText
 * - toHaveValue
 * - toBeEnabled / toBeDisabled
 * - toHaveURL
 * - toHaveTitle
 * - toHaveCount
 * - toBeChecked
 */

test.describe('Playwright Assertions', () => {

  test('TC01 - toHaveTitle: verify page title', async ({ page }) => {
    await page.goto('/login');
    await expect(page).toHaveTitle(/Practice/i);
  });

  test('TC02 - toHaveURL: verify current URL', async ({ page }) => {
    await page.goto('/login');
    await expect(page).toHaveURL(/login/);
  });

  test('TC03 - toBeVisible / toBeHidden: verify element visibility', async ({ page }) => {
    await page.goto('/login');

    await expect(page.getByLabel('Username')).toBeVisible();
    await expect(page.getByLabel('Password')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();

    // Flash message should NOT be visible on fresh load
    await expect(page.locator('#flash')).toBeHidden();
  });

  test('TC04 - toHaveText: verify exact text content', async ({ page }) => {
    await page.goto('/login');

    const heading = page.getByRole('heading', { level: 2 });
    await expect(heading).toHaveText('Login Page');
  });

  test('TC05 - toContainText: verify partial text content', async ({ page }) => {
    await page.goto('/');

    const body = page.locator('body');
    await expect(body).toContainText('Welcome');
  });

  test('TC06 - toHaveValue: verify input field value', async ({ page }) => {
    await page.goto('/login');

    const usernameField = page.getByLabel('Username');
    await usernameField.fill('testuser');
    await expect(usernameField).toHaveValue('testuser');
  });

  test('TC07 - toBeEnabled / toBeDisabled: verify button state', async ({ page }) => {
    await page.goto('/login');

    const loginBtn = page.getByRole('button', { name: 'Login' });
    await expect(loginBtn).toBeEnabled();
  });

  test('TC08 - toHaveCount: verify number of elements', async ({ page }) => {
    await page.goto('/checkboxes');

    const checkboxes = page.locator('input[type="checkbox"]');
    await expect(checkboxes).toHaveCount(2);
  });

  test('TC09 - toBeChecked: verify checkbox state', async ({ page }) => {
    await page.goto('/checkboxes');

    const checkboxes = page.locator('input[type="checkbox"]');
    // Second checkbox is checked by default on this page
    await expect(checkboxes.last()).toBeChecked();
  });

  test('TC10 - soft assertions: collect multiple failures', async ({ page }) => {
    await page.goto('/login');

    // Soft assertions: test continues even if one fails
    await expect.soft(page.getByLabel('Username')).toBeVisible();
    await expect.soft(page.getByLabel('Password')).toBeVisible();
    await expect.soft(page.getByRole('button', { name: 'Login' })).toBeEnabled();
    await expect.soft(page).toHaveURL(/login/);
  });

});
