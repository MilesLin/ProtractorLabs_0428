import { browser, by, element } from 'protractor';

fdescribe('leave add new event page', () => {

  it('should navigate to create event page', async () => {
    await browser.get('/events/new');
    expect(await browser.getCurrentUrl()).toEqual(browser.baseUrl + 'events/new');
  });

  it('should click cancel button', async () => {
    const allEventLink = element(by.buttonText('取消'));
    await allEventLink.click();
    await browser.switchTo().alert().accept();
    expect(await browser.getCurrentUrl()).toEqual(browser.baseUrl + 'events');
  });

});
