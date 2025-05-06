import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.mercadolibre.co.cr/');
  await page.getByRole('combobox', { name: 'Ingresa lo que quieras' }).click();
  await page.getByRole('combobox', { name: 'Ingresa lo que quieras' }).fill('Playstation 5');
  await page.getByRole('combobox', { name: 'Ingresa lo que quieras' }).press('Enter');
  await page.getByRole('button', { name: 'Buscar' }).click();
  await page.getByRole('link', { name: 'Play Station 5 Ps5 Digital' }).click();
});