// prueba-e2e/page-objects/mercadolibre_search.page.ts
import BasePage from './base.page';

class MercadoLibreSearchPage extends BasePage {
    // Selectores para la página de resultados de búsqueda de Mercado Libre
    public get cookieBanner() {
        return $('button[data-testid="action:understood-button"]');
    }

    public get brandFilterMuscleTech() {
        return $(`//a[span[@class="ui-search-filter-name" and normalize-space()='MuscleTech']]`);
    }

    public get firstProductInList() {
        return $('div.poly-card--list h3.poly-component__title-wrapper a.poly-component__title');
    }

    public get firstProductPrice() {
        return $('div.poly-card--list div.poly-price__current span.andes-money-amount__fraction');
    }

    /**
     * NOTA: openSearch ya no se usará directamente para el inicio si vienes de Google.
     * Se mantiene por si lo necesitas para otros escenarios o depuración.
     */
    public async openSearch(searchTerm: string) {
        const baseUrl = 'https://listado.mercadolibre.com.co/';
        const searchUrl = `${baseUrl}${searchTerm}`;
        await super.open(searchUrl);
        // console.log(`Mapsd directly to: ${searchUrl}`);
        await this.waitUntilUrlContains('listado.mercadolibre.com', 20000, 'Failed to open Mercado Libre search results');
    }

    public async handleCookieBanner() {
        try {
            const bannerButton = await this.cookieBanner;
            await bannerButton.waitForClickable({ timeout: 10000 });
            if (await bannerButton.isDisplayed()) {
                console.log('Cookie banner displayed. Attempting to accept/close...');
                await bannerButton.click();
                await browser.pause(500);
                console.log('Cookie banner handled.');
            } else {
                console.log('No cookie banner displayed.');
            }
        } catch (error) {
            console.log('No cookie banner found or could not interact within timeout. Continuing...');
        }
    }

    public async applyBrandFilter(brand: string) {
        // console.log(`Attempting to apply brand filter: ${brand}`);
        const filterElement = await this.brandFilterMuscleTech;
        await filterElement.waitForClickable({ timeout: 15000 });
        await filterElement.click();
        const expectedUrlPart = `/${brand.toLowerCase()}/`;
        // console.log(`Waiting for URL to contain: ${expectedUrlPart}`);
        await this.waitUntilUrlContains(expectedUrlPart, 20000, `Failed to apply ${brand} filter or URL did not update as expected.`);
        // console.log(`Brand filter "${brand}" applied successfully.`);
    }

    public async getFirstProductPrice(): Promise<number> {
        // console.log('Attempting to get price of the first product in the list...');
        await this.firstProductPrice.waitForDisplayed({ timeout: 10000 });
        const priceText = await this.firstProductPrice.getText();
        // console.log(`Raw price text from list: "${priceText}"`);
        let cleanedPrice = priceText.replace(/\./g, '').replace(',', '.').trim();
        const price = parseFloat(cleanedPrice);
        if (isNaN(price)) {
            throw new Error(`Could not parse price from list text. Cleaned text: "${cleanedPrice}", Original text: "${priceText}"`);
        }
        console.log(`Parsed first product price from list: ${price}`);
        return price;
    }

    public async clickFirstProduct() {
        // console.log('Attempting to click on the first product in the list...');
        await this.firstProductInList.waitForClickable({ timeout: 15000 });
        await this.firstProductInList.click();
        // console.log('Clicked on the first product in the list.');
    }
}

export default new MercadoLibreSearchPage();