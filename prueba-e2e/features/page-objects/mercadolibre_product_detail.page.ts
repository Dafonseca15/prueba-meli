// prueba-e2e/page-objects/mercadolibre_product_detail.page.ts
import BasePage from './base.page';

class MercadoLibreProductDetailPage extends BasePage {
    // Selector para el precio en la página de detalle del producto
    // CRÍTICO: DEBES INSPECCIONAR EL DOM DE UNA PÁGINA DE DETALLE DE PRODUCTO EN MERCADO LIBRE
    // para encontrar el selector EXACTO y más robusto para el precio.
    // Los selectores a continuación son EJEMPLOS comunes.

    public get productPrice() {
        // Opción 1: Selector común para la parte entera del precio
        return $('div.ui-pdp-price__second-line span.andes-money-amount__fraction');

        // Opción 2: Si el precio está dentro de un elemento con una clase específica para el precio total
        // return $('div.ui-pdp-price__second-line span.andes-money-amount__fraction');

        // Opción 3: XPath que busca un span con un formato de dinero (ej. '$', '€', etc.)
        // return $(`//span[contains(text(), '$') and contains(@class, 'andes-money-amount__fraction')]`);

        // Opción 4: A veces el precio puede estar en un elemento con un ID
        // return $('#price_column > div.price-tag > span'); // Ejemplo hipotético

        // Revisa una página de producto real como esta (ejemplo):
        // https://articulo.mercadolibre.com.co/MCO-XXXX-creatina-monohidratada-muscletech-platinum-100-creatine-400gr-_JM
        // Y busca el elemento que contiene el precio visible.
    }

    /**
     * Obtiene el precio del producto en la página de detalle.
     * Espera a que el elemento del precio esté visible y luego extrae y limpia el texto.
     * @returns El precio como número (parseFloat).
     */
    public async getProductPrice(): Promise<number> {
        console.log('Attempting to get product price from detail page...');
        await this.productPrice.waitForDisplayed({ timeout: 20000 }); // Espera hasta 15 segundos para que el precio aparezca
        const priceText = await this.productPrice.getText();
        console.log(`Raw price text on detail page: "${priceText}"`);

        // Limpiar el texto del precio:
        // 1. Reemplazar cualquier punto '.' o coma ',' que se use como separador de miles.
        // 2. Reemplazar la coma ',' por un punto '.' si se usa como separador decimal.
        // 3. Eliminar símbolos de moneda ($, €, etc.) y espacios no deseados.
        let cleanedPrice = priceText
            .replace(/\./g, '') // Elimina puntos, $, €, etc. (separadores de miles o símbolos de moneda)
            .replace(',', '.')   // Cambia la coma decimal por punto decimal (si tu región usa coma)
            .trim();             // Elimina espacios en blanco al inicio/final

        // Para mercados donde el punto es separador de miles y la coma es decimal (ej. Argentina),
        // necesitarías una lógica más sofisticada o el regex adecuado.
        // Para Colombia, generalmente el punto es separador de miles y la coma no se usa en la parte entera.
        // Si el precio es "1.234.567" sin decimales:
        //  .replace(/\./g, '') -> "1234567"

        const price = parseFloat(cleanedPrice);

        if (isNaN(price)) {
            throw new Error(`Could not parse price from text on detail page. Cleaned text: "${cleanedPrice}", Original text: "${priceText}"`);
        }
        console.log(`Parsed product price on detail page: ${price}`);
        return price;
    }
}

export default new MercadoLibreProductDetailPage();