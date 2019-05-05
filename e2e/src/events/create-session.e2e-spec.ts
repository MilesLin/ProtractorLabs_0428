import { browser, by, element, ElementFinder, ElementArrayFinder, $$, ExpectedConditions as EC } from 'protractor';


describe('add a new session', () => {

  let name: ElementFinder;
  let presenter: ElementFinder;
  let duration: ElementFinder;
  let period: ElementArrayFinder;
  let level1: ElementFinder;
  let level2: ElementFinder;
  let level3: ElementFinder;
  let abstract: ElementFinder;
  let saveBtn: ElementFinder;

  beforeEach(() => {
    name = element(by.name('name'));
    presenter = element(by.name('presenter'));
    duration = element(by.name('duration'));
    period = element.all(by.name('period'));
    level1 = element(by.css(`input[type=checkbox][name=level][value=初級]`));
    level2 = element(by.css(`input[type=checkbox][name='level'][value='中級']`));
    level3 = element(by.css(`input[type=checkbox][name='level'][value='進階']`));
    abstract = element(by.name('abstract'));
    saveBtn = element(by.buttonText('儲存'));
  });

  it('should navigate to exist event', async () => {
    await browser.get('/events/1');
    expect(await browser.getCurrentUrl()).toContain('/events/1');
  });

  it('should click add session', async () => {

    const addSessionLink = element(by.linkText('建立議程'));

    await addSessionLink.click();

    // 確認有跳出輸入議程成的表單
    expect(await name.getAttribute('value')).toBe('');
  });

  it('should type in a session name', async () => {
    await name.sendKeys('Protractor 表單練習');
    expect(await name.getAttribute('value')).toEqual('Protractor 表單練習');
  });

  it('should type in a presenter', async () => {
    await presenter.sendKeys('John');
    expect(await presenter.getAttribute('value')).toEqual('John');
  });

  it('should type in an duration', async () => {

    // 方法一
    // await duration.all(by.tagName('option')).get(1).click();

    // 方法二
    await duration.element(by.cssContainingText('option', '一小時')).click();

    expect(await duration.getAttribute('value')).toEqual('2');
  });

  it('should select period radio button', async () => {
    await period.get(1).click();
    expect(await period.get(1).getAttribute('checked') ).toBeTruthy();
  });

  it('should check a level', async () => {
    await level1.click();
    await level2.click();
    expect(await level1.getAttribute('checked') ).toBeTruthy();
    expect(await level2.getAttribute('checked') ).toBeTruthy();
  });

  it('should type in a abstract', async () => {
    await abstract.sendKeys('自動化 Protractor 表單');
    expect(await abstract.getAttribute('value')).toEqual('自動化 Protractor 表單');
  });

  it('should click save button', async () => {
    await saveBtn.click();
    const wellTitle = await $$('div[well-title]').last().getText();
    expect(wellTitle).toContain('Protractor 表單練習');
  });

});
