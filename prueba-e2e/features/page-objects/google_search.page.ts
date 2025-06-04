
import BasePage from './base.page';

class GoogleSearchPage extends BasePage {
    
    public get searchInput() {
        return $('textarea[name="q"]');
    }

    public get searchButton() {
        return $('input[name="btnK"]');
    }

    public get mercadoLibreLink() {
        return $('span.V9tjod a[href*="mercadolibre.com.co"]');
    }

    public async openGoogle() {
        await super.open('https://www.google.com');
        await this.searchInput.waitForDisplayed({ timeout: 15000 });
    }

    public async typeSearchTermHumanLike(text: string) {
        await this.searchInput.waitForDisplayed({ timeout: 10000 });
        await this.searchInput.clearValue();

        for (const char of text) {
            await this.searchInput.addValue(char);
            
            const delay = Math.floor(Math.random() * (200 - 50 + 1)) + 50;
            await browser.pause(delay);
        }
        
        await browser.keys('Enter');
    }

    public async clickMercadoLibreLink() {
        
        await this.mercadoLibreLink.waitForClickable({ timeout: 20000 });
        await this.mercadoLibreLink.click();
    
        await this.waitUntilUrlContains('mercadolibre.com', 20000, 'Failed to navigate to Mercado Libre from Google results');
    }
}

export default new GoogleSearchPage();