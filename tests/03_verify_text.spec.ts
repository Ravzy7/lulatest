import { test as baseTest, expect } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

const test = baseTest.extend<{
  baseURL: string;
}>({
  baseURL: async ({}, use) => {
    await use(process.env.BASE_URL);
  },
});

test('Verify that Username and Password input placeholders are displayed correctly', async ({ page, baseURL }) => {
    await page.goto(baseURL as string);
  
    // Check the "Username" input placeholder
    const usernamePlaceholder = await page.getAttribute('input[id="user-name"]', 'placeholder');
    expect(usernamePlaceholder).toBe('Username');

    // Check the "Password" input placeholder (assuming it's similar to the "Username" input)
    const passwordPlaceholder = await page.getAttribute('input[id="password"]', 'placeholder');
    expect(passwordPlaceholder).toBe('Password');
});

