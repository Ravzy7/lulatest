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

test('Verify the webpage gives a 200 response', async ({ page, baseURL }) => {
  let responseStatus: number | null = null;

  // Listen to the response event of the main page request
  page.on('response', response => {
    if (response.url() === baseURL) {
      responseStatus = response.status();
    }
  });

  await page.goto(baseURL as string);

  // Assert that the status code is 200
  expect(responseStatus).toBe(200);
});
