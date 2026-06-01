import { Page, Locator, expect } from '@playwright/test';

/**
 * LoginPage - Page Object Model
 *
 * Encapsulates all login page interactions.
 * Used to keep test files clean and reusable.
 */
export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly flashMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByLabel('Username');
    this.passwordInput = page.getByLabel('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.flashMessage = page.locator('#flash');
  }

  async goto() {
    await this.page.goto('/login');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async expectLoginSuccess() {
    await expect(this.page).toHaveURL(/secure/);
    await expect(this.flashMessage).toContainText('You logged into a secure area!');
  }

  async expectLoginFailed(errorText: string) {
    await expect(this.flashMessage).toContainText(errorText);
    await expect(this.page).toHaveURL(/login/);
  }
}
