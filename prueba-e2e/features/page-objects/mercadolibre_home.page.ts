// prueba-e2e/page-objects/mercadolibre_home.page.ts (EJEMPLO, DEBES ADAPTARLO)
import BasePage from './base.page';

class MercadoLibreHomePage extends BasePage {
    public get searchInput() {
        // Selector de tu barra de búsqueda en Mercado Libre
        // ¡DEBES INSPECCIONAR EL DOM PARA OBTENER EL SELECTOR CORRECTO!
        return $('#cb1-edit'); // Ejemplo común para la barra de búsqueda de ML
    }

    /**
     * Escribe texto en la barra de búsqueda simulando escritura humana.
     * @param text El texto a escribir.
     */
    public async typeSearchTermHumanLike(text: string) {
        console.log(`Typing "${text}" with human-like delays...`);
        await this.searchInput.waitForDisplayed({ timeout: 10000 }); // Espera que la barra de búsqueda esté visible
        await this.searchInput.clearValue(); // Limpia el campo primero si es necesario

        for (const char of text) {
            await this.searchInput.addValue(char);
            // Pausa aleatoria entre 50ms y 200ms (puedes ajustar estos valores)
            const delay = Math.floor(Math.random() * (200 - 50 + 1)) + 50;
            await browser.pause(delay);
        }
        console.log('Finished human-like typing.');
        // Después de escribir, podrías presionar Enter
        // await browser.keys('Enter');
    }
}

export default new MercadoLibreHomePage();