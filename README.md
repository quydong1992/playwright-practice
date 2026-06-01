# 🎭 playwright-practice

Playwright TypeScript practice project — hands-on automation exercises covering UI testing, locators, assertions, form validation, alerts, navigation, and the Page Object Model pattern.

Built while learning Playwright through the [Playwright Việt Nam](https://github.com/playwrightvn) community course.

---

## 📁 Project Structure

```
playwright-practice/
├── tests/
│   ├── 01-login.spec.ts          # Login: valid, invalid, logout
│   ├── 02-form.spec.ts           # Forms: inputs, checkboxes, dropdowns
│   ├── 03-locators.spec.ts       # Locator strategies: role, text, label, CSS
│   ├── 04-assertions.spec.ts     # Assertions: visible, text, value, count...
│   ├── 05-navigation.spec.ts     # Navigation, alerts, new tab handling
│   └── 06-page-object-model.spec.ts  # POM pattern demo
├── pages/
│   └── LoginPage.ts              # Page Object for login page
├── utils/                        # (helpers — upcoming)
├── playwright.config.ts
├── package.json
└── tsconfig.json
```

---

## ✅ What's Covered

| # | File | Topics |
|---|------|--------|
| 01 | `01-login.spec.ts` | Valid login, invalid credentials, logout flow |
| 02 | `02-form.spec.ts` | Number input, checkbox check/uncheck, dropdown select |
| 03 | `03-locators.spec.ts` | `getByRole`, `getByText`, `getByLabel`, CSS selector, `nth()`, `filter()` |
| 04 | `04-assertions.spec.ts` | `toBeVisible`, `toHaveText`, `toHaveValue`, `toBeChecked`, soft assertions |
| 05 | `05-navigation.spec.ts` | `goto`, `goBack`, `goForward`, `reload`, JS alerts, new tab |
| 06 | `06-page-object-model.spec.ts` | Page Object Model (POM) pattern with `LoginPage` class |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm

### Install

```bash
git clone https://github.com/quydong1992/playwright-practice.git
cd playwright-practice
npm install
npx playwright install
```

### Run All Tests

```bash
npm test
```

### Run Specific Test File

```bash
npm run test:login
npm run test:form
npm run test:locators
npm run test:assertions
npm run test:navigation
```

### Run with Headed Browser (see the browser)

```bash
npm run test:headed
```

### Open HTML Report

```bash
npm run report
```

---

## 🌐 Test Target

Tests run against **[Expand Testing Practice Site](https://practice.expandtesting.com)** — a free, stable site designed for automation practice.

Pages used:
- `/login` — login form
- `/inputs` — number input
- `/checkboxes` — checkbox interactions
- `/dropdown` — dropdown select
- `/javascript-alerts` — JS alert, confirm, prompt
- `/windows` — new tab handling

---

## 📚 Learning Path

```
Week 1  → Basic navigation + locators (01, 03)
Week 2  → Forms + assertions (02, 04)
Week 3  → Alerts + navigation (05)
Week 4  → Page Object Model (06)
Next    → API testing, fixtures, CI/CD with GitHub Actions
```

---

## 🛠️ Tech Stack

![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=flat-square&logo=playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)

---

## 👤 Author

**Dong Quy Nguyen** — QA Engineer transitioning into automation testing

- 📧 quydong1992@gmail.com
- 🌏 Ho Chi Minh City, Vietnam
- 💼 10+ years QA experience | 5+ years manual testing on B2B/EDI platforms

---

*⭐ Star this repo if it helps you learn Playwright!*
