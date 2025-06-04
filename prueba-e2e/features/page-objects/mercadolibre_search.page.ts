import BasePage from './base.page';

class MercadoLibreSearchPage extends BasePage {
    
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

    public async openSearch(searchTerm: string) {
        const baseUrl = 'https://listado.mercadolibre.com.co/';
        const searchUrl = `${baseUrl}${searchTerm}`;
        await super.open(searchUrl);
        
        await this.waitUntilUrlContains('listado.mercadolibre.com', 20000, 'Failed to open Mercado Libre search results');
    }

    public async handleCookieBanner() {
        try {
            const bannerButton = await this.cookieBanner;
            await bannerButton.waitForClickable({ timeout: 10000 });
            if (await bannerButton.isDisplayed()) {
                await bannerButton.click();
                await browser.pause(500);
            } else {
                console.log('No cookie banner displayed.');
            }
        } catch (error) {
            console.log('No cookie banner found or could not interact within timeout. Continuing...', error);
        }
    }

    public async applyBrandFilter(brand: string) {
        
        const filterElement = await this.brandFilterMuscleTech;
        await filterElement.waitForClickable({ timeout: 15000 });
        await filterElement.click();
        const expectedUrlPart = `/${brand.toLowerCase()}/`;
        await this.waitUntilUrlContains(expectedUrlPart, 20000, `Failed to apply ${brand} filter or URL did not update as expected.`);
        
    }

    public async getFirstProductPrice(): Promise<number> {
        
        await this.firstProductPrice.waitForDisplayed({ timeout: 10000 });
        const priceText = await this.firstProductPrice.getText();
        
        let cleanedPrice = priceText.replace(/\./g, '').replace(',', '.').trim();
        const price = parseFloat(cleanedPrice);
        if (isNaN(price)) {
            throw new Error(`Could not parse price from list text. Cleaned text: "${cleanedPrice}", Original text: "${priceText}"`);
        }
        console.log(`Parsed first product price from list: ${price}`);
        return price;
    }

    public async clickFirstProduct() {
        await this.firstProductInList.waitForClickable({ timeout: 15000 });
        await this.firstProductInList.click();
        
    }
}

export default new MercadoLibreSearchPage();