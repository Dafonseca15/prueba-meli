// prueba-e2e/step-definitions/search_product_steps.ts
import { Given, When, Then } from '@wdio/cucumber-framework';
import GoogleSearchPage from '../features/page-objects/google_search.page'; // ¡NUEVO IMPORT!
import MercadoLibreSearchPage from '../features/page-objects/mercadolibre_search.page';
import MercadoLibreProductDetailPage from '../features/page-objects/mercadolibre_product_detail.page';

let expectedProductPrice: number;

// PASO NUEVO/MODIFICADO: Buscar en Google usando la escritura "humana"
Given(/^I search for "([^"]*)"$/, async (searchTerm: string) => {
    await GoogleSearchPage.openGoogle(); // Abre Google
    await GoogleSearchPage.typeSearchTermHumanLike(searchTerm); // Escribe con demoras
});

// PASO NUEVO: Hacer clic en el enlace de Mercado Libre en los resultados de Google
When(/^I click on the Mercado Libre link in the search results$/, async () => {
    await GoogleSearchPage.clickMercadoLibreLink();
});

// Los siguientes pasos son los mismos que ya tenías y que funcionan bien:

When(/^I handle any cookie banner if it appears$/, async () => {
    await MercadoLibreSearchPage.handleCookieBanner();
});

When(/^I apply the "([^"]*)" filter for the brand$/, async (brandName: string) => {
    console.log(`STEP: Attempting to apply brand filter: ${brandName}`);
    await MercadoLibreSearchPage.applyBrandFilter(brandName);
    console.log(`STEP: Brand filter "${brandName}" applied successfully.`);
});

When(/^I get the price of the first product in the list$/, async () => {
    console.log('STEP: Getting price of the first product in the list...');
    expectedProductPrice = await MercadoLibreSearchPage.getFirstProductPrice();
    console.log(`STEP: Expected product price from list: ${expectedProductPrice}`);
});

When(/^I click on the first product in the list$/, async () => {
    console.log('STEP: Clicking on the first product in the list...');
    await MercadoLibreSearchPage.clickFirstProduct();
    console.log('STEP: Clicked on the first product.');
});

Then(/^the product price on the detail page should match the price from the list$/, async () => {
    console.log('STEP: Validating product price on detail page...');
    console.log('--- Depuración de Precios ---');
    console.log('Precio esperado (de la lista):', expectedProductPrice);
    const actualProductPrice = await MercadoLibreProductDetailPage.getProductPrice();
    console.log(`Precio actual (de la página de detalle): ${actualProductPrice}`);
    console.log('--- Fin Depuración ---', actualProductPrice , expectedProductPrice);
    expect(actualProductPrice).toEqual(expectedProductPrice);
    console.log('STEP: Product price validated successfully.');
});