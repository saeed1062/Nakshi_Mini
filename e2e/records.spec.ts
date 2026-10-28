import { test, expect } from '@playwright/test';

test.describe('Nakshi_Mini - Records Management UI Test', () => {
  test('should load Items page and display required elements', async ({ page }) => {
    // 1. Visit root (redirects directly to /items)
    await page.goto('/');
    await expect(page).toHaveURL(/.*\/items/);

    // 2. Check title
    await expect(page.locator('h1')).toContainText('Items & Craft Records');

    // 3. Check Form & Table elements
    await expect(page.locator('#item-form')).toBeVisible();
    await expect(page.locator('#item-title-input')).toBeVisible();
    await expect(page.locator('#item-category-input')).toBeVisible();
    await expect(page.locator('#item-price-input')).toBeVisible();
    await expect(page.locator('#item-submit-btn')).toBeVisible();
    await expect(page.locator('#items-table')).toBeVisible();
  });

  test('should submit a new record and display it in the table', async ({ page }) => {
    await page.goto('/items');

    const uniqueTitle = `Jamdani Scarf ${Date.now()}`;
    const price = '1500';

    // Fill form
    await page.fill('#item-title-input', uniqueTitle);
    await page.selectOption('#item-category-input', 'Textile');
    await page.fill('#item-price-input', price);
    await page.fill('#item-desc-input', 'Handcrafted traditional Jamdani motif');

    // Click submit
    await page.click('#item-submit-btn');

    // Verify row appears in table
    const table = page.locator('#items-table');
    await expect(table).toContainText(uniqueTitle);
  });
});
