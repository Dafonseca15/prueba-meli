// prueba-e2e/step-definitions/search_product_steps.ts
import { Given, When, Then } from '@wdio/cucumber-framework';
import GoogleSearchPage from '../features/page-objects/google_search.page'; // ¡NUEVO IMPORT!
import MercadoLibreSearchPage from '../features/page-objects/mercadolibre_search.page';
import MercadoLibreProductDetailPage from '../features/page-objects/mercadolibre_product_detail.page';

let expectedProductPrice: number;

// PASO 1: Buscar en Google usando la escritura "humana"
Given(/^I open website Google Chrome$/, async () => { // <--- ¡CORREGIDO! La regex ahora coincide exactamente.
    await GoogleSearchPage.openGoogle();
});

// PASO 2: Escribimos lo que queremos buscar
When(/^I search for "([^"]*)"$/, async (searchTerm: string) => {
    await GoogleSearchPage.typeSearchTermHumanLike(searchTerm); // Escribe con demoras
});

// PASO 3: Hacer clic en el enlace de Mercado Libre en los resultados de Google
When(/^I click on the Mercado Libre link in the search results$/, async () => {
    await GoogleSearchPage.clickMercadoLibreLink();
});

// PASO 4: Manejamos el cookie banner si aparece
When(/^I handle any cookie banner if it appears$/, async () => {
    await MercadoLibreSearchPage.handleCookieBanner();
});

// PASO 5: Aplicar el filtro de marca
When(/^I apply the "([^"]*)" filter for the brand$/, async (brandName: string) => {
    console.log(`STEP: Attempting to apply brand filter: ${brandName}`);
    await MercadoLibreSearchPage.applyBrandFilter(brandName);
    console.log(`STEP: Brand filter "${brandName}" applied successfully.`);
});

// PASO 6: Obtener el precio del primer producto en la lista
When(/^I get the price of the first product in the list$/, async () => {
    console.log('STEP: Getting price of the first product in the list...');
    expectedProductPrice = await MercadoLibreSearchPage.getFirstProductPrice();
    console.log(`STEP: Expected product price from list: ${expectedProductPrice}`);
});

// PASO 7: Hacer clic en el primer producto de la lista
When(/^I click on the first product in the list$/, async () => {
    // console.log('STEP: Clicking on the first product in the list...');
    await MercadoLibreSearchPage.clickFirstProduct();
});

// PASO 8: Validar el precio del producto en la página de detalle respecto al precio de la lista
Then(/^the product price on the detail page should match the price from the list$/, async () => {
    const actualProductPrice = await MercadoLibreProductDetailPage.getProductPrice();
    // console.log('--- Fin Depuración ---', actualProductPrice , expectedProductPrice);
    expect(actualProductPrice).toEqual(expectedProductPrice);
});