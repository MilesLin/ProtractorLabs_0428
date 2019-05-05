import { browser, element, by, $, ExpectedConditions as EC } from 'protractor';

describe('the user does search on angular.io', () => {

  const searchResultsElement = element(by.className('search-results'));

  it('should navigate to angular.io', async () => {
    await browser.driver.get('https://angular.io/');
    expect(await browser.getCurrentUrl()).toBe('https://angular.io/');
  });

  it('should type NgZone on search input', async () => {
    await $('aio-search-box > input[type="search"]').sendKeys('NgZone');

    const wait = EC.textToBePresentInElement(searchResultsElement, 'NgZone');
    await browser.wait(wait, 5000, '搜尋結果等待過久!');

    // 如果上面發生 Timeout 意味著找不到 NgZone，且會發生錯誤，不會執行到這一行！
    const searchResult = await searchResultsElement.getText();
    expect(searchResult).toContain('NgZone');
  });

  it('should click NgZone on search result', async () => {
    await element(by.linkText('NgZone')).click();

    const wait = EC.textToBePresentInElement(element(by.id('ngzone')), 'NgZone');
    await browser.wait(wait, 5000);
    
    expect(await browser.getTitle()).toContain('NgZone');
  });
});
