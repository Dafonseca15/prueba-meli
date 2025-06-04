export default class BasePage {

    public async open(path: string) {
        await browser.url(path);
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