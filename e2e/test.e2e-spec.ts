import { browser, element, by, ElementFinder } from 'protractor';
 
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

  // Click the 'About' tab
  // element(by.css('[aria-controls=tabpanel-t0-2]')).click().then(() => { 

  //   // Wait for the page transition
  //   browser.driver.sleep(1000);

  //   expect(element(by.css('ion-list ion-item ion-label')) // Grab the label of the list item
  //     .getAttribute('innerHTML')) // Get the text content
  //     .toContain('@ionicframework'); // Check if it contains the text "@ionicframework"

  // });

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