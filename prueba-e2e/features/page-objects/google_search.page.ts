
import BasePage from './base.page';

class GoogleSearchPage extends BasePage {
    
    public get searchInput() {
        return $('textarea[name="q"]');
    }

    public get searchButton() {
        return $('input[name="btnK"]');
    }

    public get mercadoLibreLink() {
        
        const allMercadoLibreLinks = $$('a[href*="mercadolibre.com.co"]');

        return allMercadoLibreLinks.filter(async (el) => {
            const linkText = await el.getText();
                     
            return linkText.includes('Mercado Libre') ||
                   linkText.includes('Creatina | MercadoLibre') ||
                   linkText.includes('MercadoLibre - Categorías'); 
        }).then(filteredLinks => {            
            return filteredLinks[0];
        });
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

    public async clickMercadoLibreLink(): Promise<void> {
        const linkToClick = await this.mercadoLibreLink;

        if (!linkToClick || !(await linkToClick.isExisting())) {
            throw new Error('The Mercado Libre link was not found in the search results.');
        }
 
        await linkToClick.waitForDisplayed({ timeout: 15000 });
        await linkToClick.waitForClickable({ timeout: 15000 });
        await linkToClick.click();

        await browser.waitUntil(async () => {
            const currentUrl = await browser.getUrl();
            return currentUrl.includes('mercadolibre.com.co');
        }, {
            timeout: 20000,
            timeoutMsg: 'It was expected to navigate to the Mercado Libre page in 20 seconds, but the waiting time ran out.'
        });
    }

}

export default new GoogleSearchPage();