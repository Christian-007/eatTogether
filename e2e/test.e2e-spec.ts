import { browser, element, by, ElementFinder, protractor } from 'protractor';
 
describe('E2E Application Test', () => {
 
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

  it('the user can search events by city', () => {
    // User login
    let email: ElementFinder = element(by.css('input[name=email]'));
    let password: ElementFinder = element(by.css('input[name=password]'));
    email.sendKeys('b.wilson@gmail.com');
    password.sendKeys('123');
    element(by.css('.loginButton')).click();
    browser.driver.sleep(1000);
    expect(element(by.css('.sectionTitle')).getAttribute('innerHTML')).toContain('UPCOMING EVENT'); 

    // Go to search tab, automatically search events in user location, expects some events
    browser.driver.sleep(1000);
    element(by.css('[aria-controls=tabpanel-t0-1]')).click();
    browser.driver.sleep(1000);
    expect(element.all(by.css('.eventsList'))).toBeTruthy();
  });

  it('the user cannot find any events in the inputted city', () => {
    // User login
    let search: ElementFinder = element(by.css('input[name=search]'));
    let email: ElementFinder = element(by.css('input[name=email]'));
    let password: ElementFinder = element(by.css('input[name=password]'));

    email.sendKeys('b.wilson@gmail.com');
    password.sendKeys('123');
    element(by.css('.loginButton')).click();
    browser.driver.sleep(1000);
    expect(element(by.css('.sectionTitle')).getAttribute('innerHTML')).toContain('UPCOMING EVENT'); 

    // Go to search tab, clear search input, type 'London', expects no event found
    browser.driver.sleep(1000);
    element(by.css('[aria-controls=tabpanel-t0-1]')).click();
    browser.driver.sleep(1000);
    search.clear();
    search.sendKeys("London");
    browser.actions().sendKeys(protractor.Key.ENTER).click().perform();
    browser.driver.sleep(2000);
    expect(element(by.css('page-event-tab .no-result h3')).getAttribute('innerHTML')).toContain('NO EVENT FOUND'); 
  });
 
});