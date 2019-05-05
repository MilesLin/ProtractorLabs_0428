import { browser, by, element, ExpectedConditions as EC, $, ElementFinder } from 'protractor';

fdescribe('add a new user', () => {

  let username: ElementFinder;
  let password: ElementFinder;
  let firstName: ElementFinder;
  let lastName: ElementFinder;
  let addBtn: ElementFinder;
  let membershipPopup: ElementFinder;
  let acceptBtn: ElementFinder;

  beforeEach(() => {
    username = element(by.id('username'));
    password = element(by.id('password'));
    firstName = element(by.id('firstName'));
    lastName = element(by.id('lastName'));
    addBtn = element(by.buttonText('新增'));
    membershipPopup = element(by.id('membershipterm'));
    acceptBtn = element(by.id('accept'));
  });

  it('should direct to add new user page', async () => {
    await browser.get('/user/new');
    expect(await browser.getCurrentUrl()).toContain(browser.baseUrl + 'user/new');
  });

  it('should type in user information', async () => {
    await username.sendKeys('mike');
    await password.sendKeys('123');
    await firstName.sendKeys('bob');
    await lastName.sendKeys('joe');
    expect(await username.getAttribute('value')).toBe('mike');
    expect(await password.getAttribute('value')).toBe('123');
    expect(await firstName.getAttribute('value')).toBe('bob');
    expect(await lastName.getAttribute('value')).toBe('joe');
  });

  it('should click membership term', async () => {
    await membershipPopup.click();
    const handles = await browser.getAllWindowHandles();
    expect(2).toBe(handles.length);
  });

  it('should switch to pop up window', async () => {
    await browser.waitForAngularEnabled(false);
    const handles = await browser.getAllWindowHandles();
    await browser.switchTo().window(handles[1]);
    expect(await browser.getTitle()).toBe('會員權益');
  });

  it('should scroll down to the bottom', async () => {
    await browser.executeScript('window.scrollTo(0, document.body.scrollHeight);');
    await browser.wait(EC.elementToBeClickable($('#accept')), 5000);
    expect(await acceptBtn.isEnabled()).toBe(true);
  });

  it('should click accept button', async () => {
    await acceptBtn.click();
    const handles = await browser.getAllWindowHandles();
    expect(1).toBe(handles.length);
  });

  it('should click add button', async () => {
    await browser.waitForAngularEnabled(true);
    const handles = await browser.getAllWindowHandles();
    await browser.switchTo().window(handles[0]);
    await addBtn.click();
    expect(await browser.getCurrentUrl()).toBe(browser.baseUrl + 'events');
  });
});
