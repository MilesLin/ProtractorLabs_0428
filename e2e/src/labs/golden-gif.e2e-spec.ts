import { browser, element, by } from "protractor";
import { addMask, compareScreenshot } from "blue-harvest";

describe('gif page present', () => {
    it('should compare gif lab page', async () => {
        await browser.get('/labs/gif');
        await browser.manage().window().setSize(1024, 768);
        const golden = `e2e/goldens/giflab.png`;
        const diffDir = 'e2e/goldens/';
        const gif_img = element(by.id('gif-img'));
        await addMask(gif_img, 'gray');
        await browser.waitForAngular();
        const actual = await browser.takeScreenshot();
        const result = await compareScreenshot(actual, golden, diffDir);
        expect(result).toBeTruthy();
    });
});
