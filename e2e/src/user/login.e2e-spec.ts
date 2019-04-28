import { element, by, browser } from "protractor";

describe('the user try to login', () => {
    beforeEach(() => {
        browser.get('/user/login');
    });
    it('should login to event page', () => {
        element(by.id('userName')).sendKeys('John');
        element(by.id('password')).sendKeys('123456');
        element(by.buttonText('登入')).click();
        const url = browser.getCurrentUrl();
        expect(url).toBe(browser.baseUrl + 'events');
    });

    it('should show login failed when typing wrong password', () => {
        element(by.id('userName')).sendKeys('John');
        element(by.id('password')).sendKeys('abc');
        element(by.buttonText('登入')).click();
        const isAlertPresent = element(by.className('alert-danger')).isPresent();
        expect(isAlertPresent).toBe(true, '錯誤密碼案例驗證失敗');
    });
});
