import { browser, by, element, $, $$, ExpectedConditions as EC } from 'protractor';
fdescribe('the user submit a questionnaire', () => {
    it('should type information', async () => {
        await browser.get('labs/questionnaire');
        await element(by.name('username')).sendKeys('John');
        await element(by.name('codeLanguage')).sendKeys('javascript');
        await element(by.buttonText('送出')).click();
        const formText = await element(by.tagName('form')).getText();
        expect(formText).toContain('送出成功');
    });
});
