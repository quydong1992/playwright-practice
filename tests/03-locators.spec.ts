import { test, expect } from '@playwright/test';

/**
 * 03 - Locators Practice
 * Target: https://practice.expandtesting.com
 *
 * Covers different locator strategies:
 * - getByRole
 * - getByText
 * - getByLabel
 * - getByPlaceholder
 * - locator (CSS)
 * - locator (XPath)
 */

test.describe('Locator Strategies', () => {

  test('TC01 - getByRole: find heading on homepage', async ({ page }) => {
    await page.goto('/');

    const heading = page.getByRole('heading', { level: 1 });
    await expect(heading).toBeVisible();
  });

  test('TC02 - getByText: find element by visible text', async ({ page }) => {
    await page.goto('/');

    // Find any link or element containing "Login"
    const loginLink = page.getByText('Login Page', { exact: false });
    await expect(loginLink.first()).toBeVisible();
  });

  test('TC03 - getByLabel: find input by its label', async ({ page }) => {
    await page.goto('/login');

    const usernameField = page.getByLabel('Username');
    const passwordField = page.getByLabel('Password');

    await expect(usernameField).toBeVisible();
    await expect(passwordField).toBeVisible();
  });

  test('TC04 - CSS locator: find button by class', async ({ page }) => {
    await page.goto('/login');

    const loginBtn = page.locator('button[type="submit"]');
    await expect(loginBtn).toBeVisible();
    await expect(loginBtn).toBeEnabled();
  });

  test('TC05 - nth locator: select specific item from list', async ({ page }) => {
    await page.goto('/checkboxes');

    const checkboxes = page.locator('input[type="checkbox"]');

    // Verify at least 2 checkboxes exist
    await expect(checkboxes).toHaveCount(2);

    // Access each one individually
    const first = checkboxes.nth(0);
    const second = checkboxes.nth(1);

    await expect(first).toBeVisible();
    await expect(second).toBeVisible();
  });

  test('TC06 - filter locator: find link by text inside a container', async ({ page }) => {
    await page.goto('/login');

    // Verify the form container exists and contains a button
    const form = page.locator('form');
    await expect(form).toBeVisible();

    const submitBtn = form.getByRole('button');
    await expect(submitBtn).toBeVisible();
  });

});
