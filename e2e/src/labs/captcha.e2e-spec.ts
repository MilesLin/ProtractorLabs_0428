import { browser, element, by, ExpectedConditions as EC, until } from 'protractor';

fdescribe('the user submit a questionnaire', () => {

  it('should navigate to captcha page', async () => {
    await browser.get('labs/captcha');
    expect(await browser.getCurrentUrl()).toBe(browser.baseUrl + 'labs/captcha');
  });

  it('should wait for typing', async () => {

    await browser.wait(waitForTyping , 10000, '等待輸入驗證碼');
    const value = await element(by.name('captchaCode')).getAttribute('value');
    expect(value.length).toBe(4);
  });

  function waitForTyping() {
    return new Promise(function(resolve, reject) {
      const interval = setInterval(() => {
          element(by.name('captchaCode')).getAttribute('value').then(val => {
            if (val.length === 4) {
              clearInterval(interval);
              resolve('輸入完畢');
            }
          });
      }, 500);
    });
  }
  it('should click submit', async () => {
    await element(by.buttonText('送出')).click();
    const formSource = await element(by.tagName('form')).getText();
    expect(formSource).toContain('驗證碼正確');
  });

});
