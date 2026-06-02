import { test, expect } from '@playwright/test';

/**
 * 05 - Navigation & Alerts
 * Target: https://practice.expandtesting.com
 *
 * Covers:
 * - Page navigation (goto, back, forward, reload)
 * - JavaScript alerts: alert, confirm, prompt
 * - New tab / window handling
 */

test.describe('Navigation', () => {

  test('TC01 - Navigate to page and verify URL', async ({ page }) => {
    await page.goto('/login');
    await expect(page).toHaveURL(/login/);

    await page.goto('/inputs');
    await expect(page).toHaveURL(/inputs/);
  });

test('TC02 - Browser back and forward', async ({ page }) => {
  await page.goto('https://practice.expandtesting.com/login');
  await expect(page).toHaveURL(/\/login/);

  await page.goto('https://practice.expandtesting.com/inputs');
  await expect(page).toHaveURL(/\/inputs/);

  await page.goBack();
  await expect(page).toHaveURL(/\/login/);

  await page.goForward();
  await expect(page).toHaveURL(/\/inputs/);
});

  test('TC03 - Reload page resets input state', async ({ page }) => {
    await page.goto('/inputs');

    const input = page.locator('input[type="number"]');
    await input.fill('999');
    await expect(input).toHaveValue('999');

    await page.reload();
    await expect(input).toHaveValue('');
  });

});

test.describe('JavaScript Dialogs', () => {

  test('TC04 - Accept a JS alert', async ({ page }) => {
    await page.goto('/js-dialogs');

    page.once('dialog', async (dialog) => {
      expect(dialog.type()).toBe('alert');
      await dialog.accept();
    });

    await page.getByRole('button', { name: 'Js Alert' }).click();

    await expect(page.locator('#dialog-response'))
      .toContainText('OK');
  });

  test('TC05 - Accept a JS Confirm dialog', async ({ page }) => {
    await page.goto('/js-dialogs');

    page.once('dialog', async (dialog) => {
      expect(dialog.type()).toBe('confirm');
      await dialog.accept();
    });

    await page.getByRole('button', { name: 'Js Confirm' }).click();

    await expect(page.locator('#dialog-response'))
      .toContainText('Ok');
  });

  test('TC06 - Dismiss a JS Confirm dialog', async ({ page }) => {
    await page.goto('/js-dialogs');

    page.once('dialog', async (dialog) => {
      expect(dialog.type()).toBe('confirm');
      await dialog.dismiss();
    });

    await page.getByRole('button', { name: 'Js Confirm' }).click();

    await expect(page.locator('#dialog-response'))
      .toContainText('Cancel');
  });

  test('TC07 - JS Prompt: enter text and accept', async ({ page }) => {
    await page.goto('/js-dialogs');

    page.once('dialog', async (dialog) => {
      expect(dialog.type()).toBe('prompt');
      await dialog.accept('Dong Quy');
    });

    await page.getByRole('button', { name: 'Js Prompt' }).click();

    await expect(page.locator('#dialog-response'))
      .toContainText('Dong Quy');
  });

});

test.describe('New Tab Handling', () => {

  test('TC08 - Open new tab and verify its URL', async ({ page, context }) => {
    await page.goto('/windows');

    // Wait for new page to open
    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      page.getByRole('link', { name: 'Click Here' }).click(),
    ]);

    await newPage.waitForLoadState();
    await expect(newPage).toHaveURL(/new/);
    await expect(newPage.getByText('New Window')).toBeVisible();
  });

});
