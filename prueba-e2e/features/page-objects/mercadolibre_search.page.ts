// prueba-e2e/page-objects/mercadolibre_search.page.ts
import BasePage from './base.page';

class MercadoLibreSearchPage extends BasePage {
    // Selectores para la página de resultados de búsqueda de Mercado Libre
    // CRÍTICO: DEBES INSPECCIONAR EL DOM DE UNA PÁGINA DE BÚSQUEDA DE MERCADO LIBRE
    // para estos selectores. Los selectores a continuación son EJEMPLOS,
    // y pueden variar por país o por actualizaciones del sitio.

    // Selector para el banner/mensaje de cookies (ej. un botón "Aceptar" o un elemento para cerrarlo)
    public get cookieBanner() {
        // Ejemplo de selectores comunes, necesitarás verificar el que usa ML para tu región:
        // return $('button.cookie-consent-button'); // Un botón con esta clase
        // return $('div.cookie-warning-banner button.andes-button--loud'); // Botón específico dentro de un banner
        // return $('aria/Aceptar cookies'); // Si hay un elemento con un texto accesible (ARIA)
        return $('button[data-testid="action:understood-button"]'); // Un botón que a veces usan para aceptar cookies
    }

    // Selector para el filtro de marca "MuscleTech"
    public get brandFilterMuscleTech() {
        // Esto es un EJEMPLO de cómo podrías encontrar el filtro "MuscleTech".
        // Necesitas inspeccionar la página de resultados de Mercado Libre
        // después de buscar "creatina" y ver cómo se representa el filtro de marca.
        // Podría ser:
        // 1. Un checkbox con un valor o ID específico.
        // 2. Un enlace en la barra lateral con el texto "MuscleTech".
        // 3. Un elemento dentro de una sección de "filtros por marca".

        // Ejemplo 1: XPath para un enlace de filtro que contenga el texto "MuscleTech"
        // Este es a menudo un enfoque robusto para elementos de texto.
        return $(`//a[span[@class="ui-search-filter-name" and normalize-space()='MuscleTech']]`);

        // Ejemplo 2: XPath para un checkbox si el filtro es un checkbox
        // return $(`//input[@type="checkbox" and @value="27393"]`); // '27393' sería el ID/value de MuscleTech
        // return $(`//label[contains(.,'MuscleTech')]//input[@type='checkbox']`); // Checkbox asociado a una label
    }

    // Selector del primer producto en el listado de resultados
    public get firstProductInList() {
        // Este selector apunta al enlace que te lleva a la página de detalle del primer producto.
        // Es común que los resultados estén dentro de un `div` o `li` con una clase específica,
        // y el enlace principal esté dentro de él.
        return $('div.poly-card--list h3.poly-component__title-wrapper a.poly-component__title');
    }

    public get firstProductPrice() {
        // Selector para el span que contiene la fracción del precio actual, dentro del primer "poly-card".
        return $('div.poly-card--list div.poly-price__current span.andes-money-amount__fraction');
    }


    /**
     * Navega directamente a la página de resultados de búsqueda de Mercado Libre.
     * @param searchTerm El término de búsqueda (ej. "creatina").
     */
    public async openSearch(searchTerm: string) {
        // Define la URL base de Mercado Libre para tu región (ej. Colombia: .com.co, Argentina: .com.ar)
        // Puedes cambiarlo si tu prueba es para otra región.
        const baseUrl = 'https://listado.mercadolibre.com.co/';
        const searchUrl = `${baseUrl}${searchTerm}`;
        await super.open(searchUrl);
        console.log(`Mapsd to: ${searchUrl}`);
        // Espera hasta que la URL contenga el dominio de Mercado Libre y la palabra 'listado'
        await this.waitUntilUrlContains('listado.mercadolibre.com', 20000, 'Failed to open Mercado Libre search results');
    }

    /**
     * Maneja el banner de cookies si aparece.
     * Intenta hacer clic si el banner es visible, si no, simplemente ignora.
     */
    public async handleCookieBanner() {
        try {
            const bannerButton = await this.cookieBanner;
            // Espera brevemente por si el banner tarda en aparecer.
            // Si el banner no aparece, el waitForDisplayed lanzará un error que será capturado por el catch.
            await bannerButton.waitForDisplayed({ timeout: 5000 }); // Espera hasta 5 segundos para que aparezca

            if (await bannerButton.isDisplayed()) {
                console.log('Cookie banner displayed. Attempting to accept/close...');
                await bannerButton.click();
                await browser.pause(1000); // Pequeña pausa para que el banner desaparezca
                console.log('Cookie banner handled.');
            } else {
                console.log('No cookie banner displayed.');
            }
        } catch (error) {
            console.log('No cookie banner found or could not interact within timeout. Continuing...');
            // Esto es normal si el banner no aparece o ya fue aceptado.
            // Si quieres ver el error completo para depurar: console.error(error);
        }
    }

    /**
     * Aplica el filtro de marca en la página de resultados.
     * @param brand Nombre de la marca (ej. "MuscleTech").
     */
    public async applyBrandFilter(brand: string) {
        console.log(`Attempting to apply brand filter: ${brand}`);
        // El selector de `brandFilterMuscleTech` es un ejemplo.
        // Deberás usar el selector que hayas encontrado para el filtro de marca "MuscleTech" en ML.
        const filterElement = await this.brandFilterMuscleTech; // Usa el getter definido arriba
        await filterElement.waitForClickable({ timeout: 15000 }); // Espera a que el filtro sea cliqueable
        await filterElement.click();

        const expectedUrlPart = `/${brand.toLowerCase()}/`; // Esto resultará en '/muscletech/'
        console.log(`Waiting for URL to contain: ${expectedUrlPart}`);

        await this.waitUntilUrlContains(expectedUrlPart, 20000, `Failed to apply ${brand} filter or URL did not update`);
        console.log(`Brand filter "${brand}" applied successfully.`);
    }

    /**
     * Obtiene y parsea el precio del primer producto listado en la página de resultados.
     * @returns El precio del primer producto como un número.
     */
    public async getFirstProductPrice(): Promise<number> {
        console.log('Attempting to get price of the first product in the list...');
        await this.firstProductPrice.waitForDisplayed({ timeout: 10000 });
        const priceText = await this.firstProductPrice.getText();
        console.log(`Raw price text from list: "${priceText}"`);

        // Lógica para limpiar el texto del precio.
        // Esto es crucial para manejar formatos de moneda y separadores.
        // Ejemplo para precios como "$ 1.234.567" o "$ 1.234,56"
        let cleanedPrice = priceText
            .replace(/\./g, '') // Elimina puntos, $, €, etc. (separadores de miles o símbolos de moneda)
            .replace(',', '.')   // Cambia la coma decimal por punto decimal (si tu región usa coma)
            .trim();             // Elimina espacios en blanco al inicio/final

        const price = parseFloat(cleanedPrice);

        if (isNaN(price)) {
            throw new Error(`Could not parse price from list text. Cleaned text: "${cleanedPrice}", Original text: "${priceText}"`);
        }
        console.log(`Parsed first product price from list: ${price}`);
        return price;
    }

    /**
     * Hace clic en el primer producto del listado de resultados.
     */
    public async clickFirstProduct() {
        console.log('Attempting to click on the first product in the list...');
        await this.firstProductInList.waitForClickable({ timeout: 15000 });
        await this.firstProductInList.click();
        console.log('Clicked on the first product in the list.');
        // Después de hacer clic, la URL cambiará a la página de detalle del producto.
        // No hay un URL fijo para esperar aquí, el siguiente paso (obtener precio en detalle)
        // confirmará la navegación al buscar el elemento de precio en la nueva página.
    }
}

export default new MercadoLibreSearchPage();