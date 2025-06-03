// prueba-e2e/page-objects/Google Search.page.ts
import BasePage from './base.page';

class GoogleSearchPage extends BasePage {
    // Selector para el campo de búsqueda de Google.
    public get searchInput() {
        return $('textarea[name="q"]');
    }

    // Selector para el botón de búsqueda de Google (si usas Enter, no es estrictamente necesario, pero es bueno tenerlo).
    public get searchButton() {
        return $('input[name="btnK"]');
    }

    // Selector para los resultados de búsqueda de Google.
    // Buscamos un enlace que contenga el texto "Mercado Libre" o su dominio.
    public get mercadoLibreLink() {
        return $('span.V9tjod a[href*="mercadolibre.com.co"]');
    }

    /**
     * Navega a la página de inicio de Google.
     */
    public async openGoogle() {
        await super.open('https://www.google.com');
        console.log('Navigated to Google.com');
        // Espera a que el campo de búsqueda esté visible
        await this.searchInput.waitForDisplayed({ timeout: 15000 });
    }

    /**
     * Escribe un término de búsqueda en Google simulando escritura humana.
     * @param text El término a buscar.
     */
    public async typeSearchTermHumanLike(text: string) {
        console.log(`Typing "${text}" with human-like delays in Google search bar...`);
        await this.searchInput.waitForDisplayed({ timeout: 10000 });
        await this.searchInput.clearValue();

        for (const char of text) {
            await this.searchInput.addValue(char);
            // Pausa aleatoria entre 50ms y 200ms
            const delay = Math.floor(Math.random() * (200 - 50 + 1)) + 50;
            await browser.pause(delay);
        }
        // Después de escribir, presiona Enter para buscar
        await browser.keys('Enter');
        console.log('Pressed Enter to search on Google.');
    }

    /**
     * Hace clic en el enlace de Mercado Libre en los resultados de búsqueda de Google.
     */
    public async clickMercadoLibreLink() {
        // Espera a que el enlace de Mercado Libre sea visible y cliqueable
        await this.mercadoLibreLink.waitForClickable({ timeout: 20000 });
        await this.mercadoLibreLink.click();
        // Espera a que la URL cambie para reflejar el dominio de Mercado Libre
        await this.waitUntilUrlContains('mercadolibre.com', 20000, 'Failed to navigate to Mercado Libre from Google results');
    }
}

export default new GoogleSearchPage();