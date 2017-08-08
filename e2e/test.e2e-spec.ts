import { browser, element, by, ElementFinder, protractor } from 'protractor';
 
describe('Create Event Test', () => {
  beforeEach(() => {
    browser.get('');
    browser.driver.sleep(500);

    // User login
    let email: ElementFinder = element(by.css('input[name=email]'));
    let password: ElementFinder = element(by.css('input[name=password]'));

    email.sendKeys('b.wilson@gmail.com');
    password.sendKeys('123');
    element(by.css('.loginButton')).click();
    browser.driver.sleep(1000);
  });

  it('the user cannot create events', () => {
    // Create events, but left out the location field --> expects an error
    browser.driver.sleep(1000);
    element(by.css('page-home-tab .createEvent')).click().then(() => { 
      let title: ElementFinder = element(by.css('input[name=title]'));
      let description: ElementFinder = element(by.css('textarea[name=description]'));
      let startdate: ElementFinder = element(by.css('[ng-reflect-name=startdate]'));
      let starttime: ElementFinder = element(by.css('[ng-reflect-name=starttime]'));
      let endtime: ElementFinder = element(by.css('[ng-reflect-name=endtime]'));
      title.sendKeys('Test Event');
      description.sendKeys('This is just a test event');
      startdate.click();
      browser.driver.sleep(1000);
      element(by.css('.picker-toolbar .picker-toolbar-button:nth-child(2) button')).click();
      browser.driver.sleep(1000);
      starttime.click();
      browser.driver.sleep(1000);
      element(by.css('.picker-toolbar .picker-toolbar-button:nth-child(2) button')).click();
      browser.driver.sleep(1000);
      endtime.click();
      browser.driver.sleep(1000);
      element(by.css('.picker-toolbar .picker-toolbar-button:nth-child(2) button')).click();
      browser.driver.sleep(1000);
      element(by.css('page-create .create-btn')).click();
      browser.driver.sleep(2000);
      expect(element(by.css('.alert-wrapper .alert-title')).getAttribute('innerHTML')).toContain('Empty Field'); 
    });
  });

  it('the user can create events', () => {
    browser.driver.sleep(1000);
    element(by.css('page-home-tab .createEvent')).click();
    browser.driver.sleep(1000);
    let title: ElementFinder = element(by.css('input[name=title]'));
    let description: ElementFinder = element(by.css('textarea[name=description]'));
    let location: ElementFinder = element(by.css('button.search-btn'));
    let startdate: ElementFinder = element(by.css('[ng-reflect-name=startdate]'));
    let starttime: ElementFinder = element(by.css('[ng-reflect-name=starttime]'));
    let endtime: ElementFinder = element(by.css('[ng-reflect-name=endtime]'));

    title.sendKeys('Meal at Cavendish');
    description.sendKeys('This is just a test event');
    
    location.click();
    browser.driver.sleep(2000);
    
    element(by.css('.searchbar-input')).sendKeys("cavendish west street");
    browser.driver.sleep(28000);
    let test: ElementFinder = element(by.css('page-search-location ion-item:nth-child(1)'));
    test.click();
    browser.driver.sleep(2000);
    
    startdate.click();
    browser.driver.sleep(1000);
    element(by.css('.picker-toolbar .picker-toolbar-button:nth-child(2) button')).click();
    browser.driver.sleep(1000);
    starttime.click();
    browser.driver.sleep(1000);
    element(by.css('.picker-toolbar .picker-toolbar-button:nth-child(2) button')).click();
    browser.driver.sleep(1000);
    endtime.click();
    browser.driver.sleep(1000);
    element(by.css('.picker-toolbar .picker-toolbar-button:nth-child(2) button')).click();
    browser.driver.sleep(1000);
    element(by.css('page-create .create-btn')).click();
    browser.driver.sleep(2000);

    expect(element(by.css('page-home-tab ion-card .cardTitle')).getAttribute('innerHTML')).toContain('Meal at Cavendish'); 
    
  }, 60000);
});

describe('Search Test', () => {
  beforeEach(() => {
    browser.get('');
    browser.driver.sleep(500);

    // User login
    let email: ElementFinder = element(by.css('input[name=email]'));
    let password: ElementFinder = element(by.css('input[name=password]'));
    email.sendKeys('b.wilson@gmail.com');
    password.sendKeys('123');
    element(by.css('.loginButton')).click();
    browser.driver.sleep(1000);

  });

  it('the user can search events by city', () => {
    // Go to search tab, automatically search events in user location, expects some events
    browser.driver.sleep(1000);
    element(by.css('[aria-controls=tabpanel-t0-1]')).click();
    browser.driver.sleep(1000);
    expect(element.all(by.css('.eventsList'))).toBeTruthy();
  });

  it('the user cannot find any events in the inputted city', () => {
    // Go to search tab, clear search input, type 'London', expects no event found
    browser.driver.sleep(1000);
    element(by.css('[aria-controls=tabpanel-t0-1]')).click();
    let search: ElementFinder = element(by.css('page-event-tab input[name=search]'));
    browser.driver.sleep(1000);
    search.clear();
    search.sendKeys("London");
    browser.actions().sendKeys(protractor.Key.ENTER).click().perform();
    browser.driver.sleep(2000);
    expect(element(by.css('page-event-tab .no-result h3')).getAttribute('innerHTML')).toContain('NO EVENT FOUND'); 
  });
});

describe('Login Test', () => {
  beforeEach(() => {
    browser.get('');

    browser.driver.sleep(500);
  });
 
  it('the login page is displayed by default', () => {
 
    expect(element(by.css('h1')) // Grab the title of the selected tab
      .getAttribute('innerHTML')) // Get the text content
      .toContain("Let's Eat Together"); // Check if it contains the text "Home"
   
  });

  it('the user cannot login to the application', () => {
    var alert = element(by.css('.alert-wrapper .alert-title'));
    element(by.css('.loginButton')).click().then(() => { 
      expect(element(by.css('.alert-wrapper .alert-title'))
      .getAttribute('innerHTML'))
      .toContain('Login Error'); 
    });
  });

  it('the user can login to the application', () => {
    let email: ElementFinder = element(by.css('input[name=email]'));
    let password: ElementFinder = element(by.css('input[name=password]'));
    email.sendKeys('b.wilson@gmail.com');
    password.sendKeys('123');
    element(by.css('.loginButton')).click();
    browser.driver.sleep(1000);
    expect(element(by.css('.sectionTitle')).getAttribute('innerHTML')).toContain('UPCOMING EVENT'); 
  });
});