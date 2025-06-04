import { Given, When, Then } from '@wdio/cucumber-framework';
import GoogleSearchPage from '../features/page-objects/google_search.page'; 
import MercadoLibreSearchPage from '../features/page-objects/mercadolibre_search.page';
import MercadoLibreProductDetailPage from '../features/page-objects/mercadolibre_product_detail.page';

let expectedProductPrice: number;

Given(/^I open website Google Chrome$/, async () => { 
    await GoogleSearchPage.openGoogle();
});

When(/^I search for "([^"]*)"$/, async (searchTerm: string) => {
    await GoogleSearchPage.typeSearchTermHumanLike(searchTerm); 
});

When(/^I click on the Mercado Libre link in the search results$/, async () => {
    await GoogleSearchPage.clickMercadoLibreLink();
});

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
    
    await MercadoLibreSearchPage.clickFirstProduct();
});

Then(/^the product price on the detail page should match the price from the list$/, async () => {
    const actualProductPrice = await MercadoLibreProductDetailPage.getProductPrice();
    
    expect(actualProductPrice).toEqual(expectedProductPrice);
});