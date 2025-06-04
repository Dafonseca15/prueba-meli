
import BasePage from './base.page';

class GoogleSearchPage extends BasePage {
    
    public get searchInput() {
        return $('textarea[name="q"]');
    }

    public get searchButton() {
        return $('input[name="btnK"]');
    }

    public get mercadoLibreLink() {
        // Obtiene todos los elementos 'a' (enlaces) que contengan "mercadolibre.com.co" en su atributo href.
        const allMercadoLibreLinks = $$('a[href*="mercadolibre.com.co"]');

        // Filtra estos enlaces para encontrar el que tiene el texto más relevante.
        // Esto es asíncrono porque 'getText()' es una operación de WebdriverIO.
        return allMercadoLibreLinks.filter(async (el) => {
            const linkText = await el.getText();
            // Verifica si el texto del enlace contiene alguna de las frases esperadas.
            // Esto lo hace más flexible ante pequeñas variaciones en el texto del resultado de búsqueda.
            return linkText.includes('Mercado Libre') ||
                   linkText.includes('Creatina | MercadoLibre') ||
                   linkText.includes('MercadoLibre - Categorías'); // Basado en la captura de pantalla
        }).then(filteredLinks => {
            // Retorna el primer enlace que cumpla con las condiciones de filtrado.
            // Si no se encuentra ninguno, filteredLinks[0] será undefined.
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

    // Método para hacer clic en el enlace de Mercado Libre
    public async clickMercadoLibreLink(): Promise<void> {
        const linkToClick = await this.mercadoLibreLink;

        // Verifica si se encontró el enlace antes de intentar interactuar con él.
        if (!linkToClick || !(await linkToClick.isExisting())) {
            throw new Error('No se encontró el enlace de Mercado Libre en los resultados de búsqueda.');
        }

        // Espera a que el enlace esté visible y clickeable antes de hacer clic.
        await linkToClick.waitForDisplayed({ timeout: 15000 });
        await linkToClick.waitForClickable({ timeout: 15000 });
        await linkToClick.click();

        // Opcional: Espera a que la URL cambie para confirmar que la navegación a Mercado Libre fue exitosa.
        await browser.waitUntil(async () => {
            const currentUrl = await browser.getUrl();
            return currentUrl.includes('mercadolibre.com.co');
        }, {
            timeout: 20000,
            timeoutMsg: 'Se esperaba navegar a la página de Mercado Libre en 20 segundos, pero el tiempo de espera se agotó.'
        });
    }

}

export default new GoogleSearchPage();