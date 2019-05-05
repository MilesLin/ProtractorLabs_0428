import { browser, element, by } from 'protractor';
import { compareScreenshot } from 'blue-harvest';

describe('main page present', () => {
    it('should compare pages', async () => {
        await browser.get('/');
        await browser.manage().window().setSize(1366, 1024);
        const golden  = 'e2e/goldens/home.png';
        const diffDir = 'e2e/goldens/'; // 會產生 diff-home.png
        await browser.waitForAngular(); // 截圖前一定要 wait
        const actual = await browser.takeScreenshot();
        const result = await compareScreenshot(actual, golden, diffDir);
        expect(result).toBeTruthy();
    });
    
});
