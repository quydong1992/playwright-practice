import { test, expect } from '@playwright/test';

/**
 * 02 - Form Tests
 * Target: https://practice.expandtesting.com/inputs
 *         https://practice.expandtesting.com/checkboxes
 *         https://practice.expandtesting.com/dropdown
 *
 * Covers:
 * - Number input field behavior
 * - Checkbox check/uncheck
 * - Dropdown selection
 */

test.describe('Form Inputs', () => {

  test('TC01 - Number input: type a number and verify value', async ({ page }) => {
    await page.goto('/inputs');

    const input = page.locator('input[type="number"]');
    await input.fill('42');

    await expect(input).toHaveValue('42');
  });

  test('TC02 - Number input: clear field should be empty', async ({ page }) => {
    await page.goto('/inputs');

    const input = page.locator('input[type="number"]');
    await input.fill('99');
    await input.clear();

    await expect(input).toHaveValue('');
  });

  test('TC03 - Checkbox: check first checkbox', async ({ page }) => {
    await page.goto('/checkboxes');

    const checkboxes = page.locator('input[type="checkbox"]');
    const first = checkboxes.first();

    // Ensure it's unchecked first, then check it
    if (await first.isChecked()) {
      await first.uncheck();
    }
    await first.check();

    await expect(first).toBeChecked();
  });

  test('TC04 - Checkbox: uncheck second checkbox', async ({ page }) => {
    await page.goto('/checkboxes');

    const checkboxes = page.locator('input[type="checkbox"]');
    const second = checkboxes.last();

    // Second checkbox is checked by default
    await expect(second).toBeChecked();
    await second.uncheck();
    await expect(second).not.toBeChecked();
  });

  test('TC05 - Dropdown: select option 2', async ({ page }) => {
    await page.goto('/dropdown');

    const dropdown = page.locator('#dropdown');
    await dropdown.selectOption('2');

    await expect(dropdown).toHaveValue('2');
    await expect(page.locator('#dropdown option:checked')).toHaveText('Option 2');
  });

  test('TC06 - Dropdown: select option 1 then verify', async ({ page }) => {
    await page.goto('/dropdown');

    const dropdown = page.locator('#dropdown');
    await dropdown.selectOption({ label: 'Option 1' });

    await expect(dropdown).toHaveValue('1');
  });

});
