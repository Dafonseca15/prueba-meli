// prueba-e2e/page-objects/base.page.ts
export default class BasePage {
    /**
     * Abre una URL en el navegador y maximiza la ventana.
     * @param path La ruta relativa o absoluta a abrir.
     */
    public async open(path: string) {
        await browser.url(path);
        // Maximizar la ventana es una buena práctica para asegurar la visibilidad de elementos
        // y evitar problemas con elementos ocultos o responsividad.
        await browser.maximizeWindow();
    }

    public async waitUntilUrlContains(expectedUrlPart: string, timeout: number = 10000, errorMessage: string = 'URL did not contain expected part') {
        await browser.waitUntil(
            async () => (await browser.getUrl()).includes(expectedUrlPart),
            {
                timeout: timeout,
                timeoutMsg: errorMessage
            }
        );
    }
}