// prueba-e2e/step-definitions/search_product_steps.ts
import { Given, When, Then } from '@wdio/cucumber-framework';

// YA NO IMPORTES GooglePage
// import GooglePage from '../page-objects/google.page';

// import MercadoLibreSearchPage from '../page-objects/mercadolibre_search.page';
import MercadoLibreSearchPage from '../features/page-objects/mercadolibre_search.page';
// import MercadoLibreProductDetailPage from '../page-objects/mercadolibre_product_detail.page';
import MercadoLibreProductDetailPage from '../features/page-objects/mercadolibre_product_detail.page';

let expectedProductPrice: number;

// **** NUEVO PASO INICIAL ****
Given(/^I am on the Mercado Libre search results page for "([^"]*)"$/, async (searchTerm: string) => {
    console.log(`STEP: Navigating to Mercado Libre search results for "${searchTerm}"...`);
    await MercadoLibreSearchPage.openSearch(searchTerm);
    console.log('STEP: Mercado Libre search results page opened successfully.');
});

When(/^I handle any cookie banner if it appears$/, async () => {
    console.log('STEP: Handling cookie banner...');
    await MercadoLibreSearchPage.handleCookieBanner();
    console.log('STEP: Cookie banner handling complete.');
});

When(/^I apply the "([^"]*)" filter for the brand$/, async (brandName: string) => {
    console.log(`STEP: Applying filter for brand "${brandName}"...`);
    await MercadoLibreSearchPage.applyBrandFilter(brandName);
    console.log(`STEP: Filter for brand "${brandName}" applied.`);
});

When(/^I get the price of the first product in the list$/, async () => {
    console.log('STEP: Getting price of the first product...');
    expectedProductPrice = await MercadoLibreSearchPage.getFirstProductPrice();
    console.log(`STEP: Got first product price: ${expectedProductPrice}`);
});

When(/^I click on the first product in the list$/, async () => {
    console.log('STEP: Clicking on the first product...');
    await MercadoLibreSearchPage.clickFirstProduct();
    console.log('STEP: First product clicked.');
});

Then(/^the product price on the detail page should match the price from the list$/, async () => {
    console.log('STEP: Validating product price on detail page...');
    // await browser.debug(); // <--- ELIMINA O COMENTA ESTA LÍNEA

    // Log del precio esperado
    console.log('--- Depuración de Precios ---');
    console.log('Precio esperado (de la lista):', expectedProductPrice);

    const actualProductPrice = await MercadoLibreProductDetailPage.getProductPrice();
    console.log(`Precio actual (de la página de detalle): ${actualProductPrice}`);

    // Aquí puedes añadir más logs si necesitas ver el texto crudo o el paso a paso de la limpieza
    // Para ver el texto crudo de la página de detalle:
    // const detailPriceElement = await MercadoLibreProductDetailPage.productPrice;
    // const rawDetailPriceText = await detailPriceElement.getText();
    // console.log('Texto crudo del precio en la página de detalle (antes de limpiar):', rawDetailPriceText);
    // console.log('--- Fin Depuración ---');


    expect(actualProductPrice).toEqual(expectedProductPrice);
    console.log('STEP: Product price validated successfully.');
});