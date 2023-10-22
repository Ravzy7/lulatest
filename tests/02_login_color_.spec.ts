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

test.describe('Sauce Demo Tests', () => {

  test('Verify the webpage gives a 200 response', async ({ page, baseURL }) => {
    let responseStatus: number | null = null;

    page.on('response', response => {
      if (response.url() === baseURL) {
        responseStatus = response.status();
      }
    });

    await page.goto(baseURL as string);

    expect(responseStatus).toBe(200);
  });

  test('Confirm that the Login button has the correct css value', async ({ page, baseURL }) => {
    await page.goto(baseURL as string);
  
    // Get the computed background color of the Login button
    const bgColor = await page.$eval('input[id="login-button"]', (button) => {
      const computedStyle = window.getComputedStyle(button);
      return computedStyle.backgroundColor;
    });
    
    // Convert the rgb format to a hex format for comparison
    const hexColor = rgbToHex(bgColor);
    expect(hexColor.toLowerCase()).toBe('#3ddc91');
  });

  test('Page response status should be 200', async ({ page, baseURL }) => {
    const response = await page.goto(baseURL as string, { waitUntil: 'domcontentloaded' });

    // Check if the response object is not null before accessing its status
    if (response) {
      const responseStatus = response.status();
      expect(responseStatus).toBe(200);
    } else {
      throw new Error('Page did not load successfully');
    }
  });

});

function rgbToHex(rgb: string): string {
  const result = /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/.exec(rgb);
  return result 
    ? '#' +
      (1 << 24 | parseInt(result[1]) << 16 | parseInt(result[2]) << 8 | parseInt(result[3])).toString(16).slice(1).toUpperCase()
    : '';
}
