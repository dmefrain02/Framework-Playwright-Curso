import { test, expect } from '@playwright/test';

/*test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});*/

test('primer_test',async({page})=>{
  await page.goto("https://www.mercadolibre.co.cr/")
  await page.getByPlaceholder("Buscar productos, marcas y más…").fill("Iphone")
  //await page.locator("#cb1-edit").fill('Iphone') // indicar localizador y escribir en el elemento.
  await page.keyboard.press("Enter")//presionar una tecla
  await expect(page.locator("//body/main[@id='root-app']/div[1]/div[2]/section[1]")).toBeVisible //esperar que elemento este visible
  await page.pause()

  //almancenar en una variable los textos de los titulos
  const titles = await page.locator("//ol[contains(@class,'ui-search-layout')]/li/div/div/div/div/h3").allInnerTexts()//extraer texto de los elementos
  
  console.log('Número de registros encontrados:', titles.length)
  for (let title of titles){
    console.log(title)
  }
});

test('segundo_test',async({page})=>{
  await page.goto("https://www.google.co.cr/")
  await page.getByRole("combobox").fill("QA TecnologyCRC Youtube")
  await page.keyboard.press("Enter")//presionar una tecla
  await page.pause()
});
