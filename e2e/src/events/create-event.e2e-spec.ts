import { browser, by, element, ElementFinder } from 'protractor';
import * as path from 'path';

describe('add a new event', () => {

  let name: ElementFinder;
  let calendarBtn: ElementFinder;
  let time: ElementFinder;
  let price: ElementFinder;
  let address: ElementFinder;
  let city: ElementFinder;
  let country: ElementFinder;
  let onlineUrl: ElementFinder;
  let imageFile: ElementFinder;
  let saveBtn: ElementFinder;

  beforeAll(async () => {
    await browser.get('/events/new');
  });

  beforeEach(() => {
    name = element(by.name('name'));
    calendarBtn = element(by.className('mat-icon-button'));
    time = element(by.name('time'));
    price = element(by.name('price'));
    address = element(by.name('address'));
    city = element(by.name('city'));
    country = element(by.name('country'));
    onlineUrl = element(by.name('onlineUrl'));
    imageFile = element(by.name('imageFile'));
    saveBtn = element(by.buttonText('儲存'));
  });

  it('should type in an event name', async () => {
    await name.sendKeys('Protractor 實戰');
    expect(await name.getAttribute('value')).toEqual('Protractor 實戰');
  });

  it('should type in a date with calendar', async () => {
    const dateInput = element(by.name('date'));

    await calendarBtn.click();
    const calendarElem = element(by.tagName('mat-calendar'));

    await calendarElem.element(by.className('mat-calendar-period-button'))
          .click();

    await calendarElem.element(by.className('mat-calendar-previous-button'))
          .click();

    await calendarElem.element(by.tagName('mat-multi-year-view'))
          .element(by.tagName('tbody'))
          .all(by.tagName('td')).filter(async td => {
            const val = await td.getText();
            return val === '1997'
          }).first().click();

    await element(by.className('mat-calendar-body'))
          .all(by.tagName('tr')).get(3)
          .all(by.tagName('td')).get(3)
          .click();

    await calendarElem.element(by.tagName('mat-month-view'))
          .element(by.tagName('tbody'))
          .all(by.tagName('td')).filter(async td => {
            const val = await td.getText();
            return val === '31'
          }).first().click();

    expect(await dateInput.getAttribute('value')).toBe('12/31/1997');
  });

  it('should type in a time', async () => {
    await time.sendKeys('10:00 - 16:00');
    expect(await time.getAttribute('value')).toEqual('10:00 - 16:00');
  });

  it('should type in a price', async () => {
    await price.sendKeys('500');
    expect(await price.getAttribute('value')).toEqual('500');
  });

  it('should type in an address', async () => {
    await address.sendKeys('永和區文化路');
    expect(await address.getAttribute('value')).toEqual('永和區文化路');
  });

  it('should type in a city', async () => {
    await city.sendKeys('新北市');
    expect(await city.getAttribute('value')).toEqual('新北市');
  });

  it('should type in a country', async () => {
    await country.sendKeys('台灣');
    expect(await country.getAttribute('value')).toEqual('台灣');
  });

  it('should type in a online url', async () => {
    await onlineUrl.sendKeys('http://abc.com');
    expect(await onlineUrl.getAttribute('value')).toEqual('http://abc.com');
  });

  it('should update a image file', async () => {

    expect(await imageFile.getAttribute('value')).toBeFalsy();
    const imgPath = path.resolve('./e2e/src/assets/Protractor.png');
    await imageFile.sendKeys(imgPath);
    expect(await imageFile.getAttribute('value')).toBeTruthy();
  });

  it('should click save', async () => {
    await saveBtn.click();
    await browser.waitForAngular();
    const text = await element.all(by.css('.well.hoverwell.thumbnail')).last().getText();
    expect(await browser.getCurrentUrl()).toEqual(browser.baseUrl + 'events');
    expect(text).toContain('PROTRACTOR 實戰');
  });

  it('should valid created event', async () => {
    const createdEvent = element.all(by.css('.well.hoverwell.thumbnail')).filter( (elem, index) => {
      return elem.getText().then((t) => {
        return t.includes('PROTRACTOR 實戰');
      });
    }).first();
    expect(await createdEvent.isPresent()).toBe(true);
  });

});
