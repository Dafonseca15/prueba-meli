// prueba-e2e/page-objects/mercadolibre_product_detail.page.ts
import BasePage from './base.page';

class MercadoLibreProductDetailPage extends BasePage {
    public get productPrice() {
        return $('div.ui-pdp-price__second-line span.andes-money-amount__fraction');
    }

    public async getProductPrice(): Promise<number> {
        console.log('--- Debug: getProductPrice() ---');
        console.log('Attempting to get product price from detail page...');

        try {
            // Asegúrate de que el elemento esté visible antes de intentar interactuar
            await this.productPrice.waitForDisplayed({ timeout: 20000 });
            console.log(`Element found using selector: ${this.productPrice.selector}`);

            const priceText = await this.productPrice.getText();
            console.log(`Raw price text on detail page: "${priceText}"`);

            let cleanedPrice = priceText
                .replace(/\./g, '') // Elimina todos los puntos (separadores de miles)
                .replace(',', '.')   // Si hubiera coma decimal, la cambia a punto
                .trim();

            const price = parseFloat(cleanedPrice);

            if (isNaN(price)) {
                console.error(`ERROR: Could not parse price. Cleaned text: "${cleanedPrice}", Original text: "${priceText}"`);
                throw new Error(`Could not parse price from text on detail page.`);
            }
            console.log(`Parsed product price on detail page: ${price}`);
            console.log('--- End Debug: getProductPrice() ---');
            return price;
        } catch (error) {
            console.error(`ERROR in getProductPrice(): ${error}`);
            // También puedes añadir una captura de pantalla aquí para ver qué está viendo el bot
            // await browser.saveScreenshot(`./screenshots/error_price_detail_${Date.now()}.png`);
            throw error; // Re-lanza el error para que la prueba falle
        }
    }
}

export default new MercadoLibreProductDetailPage();