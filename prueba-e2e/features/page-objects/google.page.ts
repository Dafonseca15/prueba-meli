// prueba-e2e/page-objects/google.page.ts
import BasePage from './base.page';

class GooglePage extends BasePage {
    public get searchInput() {
        return $('textarea[name="q"]');
    }

    public get mercadolibreLink() {
        return $(`//h3[normalize-space()="Creatina | MercadoLibre – Categorías"]/ancestor::a`);
    }

    /**
     * Abre la página principal de Google.
     */
    public async open() {
        await super.open('https://www.google.com');
    }

    /**
     * Realiza una búsqueda en Google.
     * Añadimos una simulación de escritura más lenta.
     * @param text El texto a buscar.
     */
    public async search(text: string) {
        await this.searchInput.waitForDisplayed({ timeout: 10000 });

        // Simular escritura lenta
        for (const char of text) {
            await this.searchInput.addValue(char); // Añade un carácter a la vez
            await browser.pause(60); // Pausa de 50ms entre cada carácter (ajusta si es necesario)
        }

        await browser.pause(500); // Pequeña pausa después de escribir, antes de presionar Enter
        await browser.keys('Enter');
        await this.waitUntilUrlContains('search?q=', 15000);

        // Añadir una espera adicional después de la búsqueda, antes de interactuar con los resultados.
        await browser.waitUntil(
            async () => await browser.execute(() => document.readyState === 'complete'),
            {
                timeout: 10000,
                timeoutMsg: 'Google search results page did not load completely within 10 seconds'
            }
        );
    }

    /**
     * Hace clic en el enlace de MercadoLibre en los resultados de búsqueda de Google.
     * Añadimos una pequeña pausa antes del clic forzado con JavaScript.
     */
    public async clickMercadoLibreLink() {
        await this.mercadolibreLink.waitForDisplayed({ timeout: 30000 });

        await browser.pause(1000); // Pequeña pausa antes de intentar el clic (1 segundo)
        console.log("Intentando hacer clic en el enlace de Mercado Libre con JavaScript...");
        await browser.execute((el) => {
            el.click();
        }, await this.mercadolibreLink);

        await this.waitUntilUrlContains('mercadolibre.com', 30000, 'Failed to navigate to Mercado Libre after clicking link');
        console.log("Clic en Mercado Libre exitoso (forzado con JS).");
    }
}

export default new GooglePage();