
import BasePage from './base.page';

class MercadoLibreProductDetailPage extends BasePage {
    public get productPrice() {
        return $('div.ui-pdp-price__second-line span.andes-money-amount__fraction');
    }

    public async getProductPrice(): Promise<number> {

        try {
            await this.productPrice.waitForDisplayed({ timeout: 20000 });
            const priceText = await this.productPrice.getText();

            let cleanedPrice = priceText
                .replace(/\./g, '')
                .replace(',', '.')  
                .trim();

            const price = parseFloat(cleanedPrice);

            if (isNaN(price)) {
                throw new Error(`Could not parse price from text on detail page.`);
            }
            return price;
        } catch (error) {
            throw error; 
        }
    }
}

export default new MercadoLibreProductDetailPage();