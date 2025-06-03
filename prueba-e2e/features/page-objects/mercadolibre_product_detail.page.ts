// prueba-e2e/page-objects/mercadolibre_product_detail.page.ts
import BasePage from './base.page';

class MercadoLibreProductDetailPage extends BasePage {
    public get productPrice() {
        return $('div.ui-pdp-price__second-line span.andes-money-amount__fraction');
    }

    public async getProductPrice(): Promise<number> {
        // console.log('--- Debug: getProductPrice() ---');

        try {
            // No aseguramos de que el elemento esté visible antes de intentar interactuar
            await this.productPrice.waitForDisplayed({ timeout: 20000 });
            console.log(`Element found using selector: ${this.productPrice.selector}`);

            const priceText = await this.productPrice.getText();
            console.log(`Raw price text on detail page: "${priceText}"`);

            // Limpiamos el texto del precio para eliminar puntos y convertir comas a puntos
            let cleanedPrice = priceText
                .replace(/\./g, '')
                .replace(',', '.')  
                .trim();

            const price = parseFloat(cleanedPrice);

            if (isNaN(price)) {
                console.error(`ERROR: Could not parse price. Cleaned text: "${cleanedPrice}", Original text: "${priceText}"`);
                throw new Error(`Could not parse price from text on detail page.`);
            }
            // console.log(`Parsed product price on detail page: ${price}`);
            return price;
        } catch (error) {
            // console.error(`ERROR in getProductPrice(): ${error}`);
            // Re-lanza el error para que la prueba falle
            throw error; 
        }
    }
}

export default new MercadoLibreProductDetailPage();