// spec.js
describe('Protractor Demo App', function () {
  var name = element(by.id('characterName'));
  var link = element(by.id('evepraisalLink'));
  var submitLink = element(by.id('submitLink'));
  var quoteResult = element(by.id('quoteResult'));
  var submitOrder = element(by.id('submitOrder'));
  var orderSubmittedMessage = element(by.id('orderSubmittedMessage'));
  var showStatusButton = element(by.id('showStatusButton'));
  var statusDiv = element(by.id('status'));
  var showFeedbackButton = element(by.id('showFeedbackForm'));
  var feedbackInput = element(by.id('feedbackInput'));
  var feedbackSubmittedMessage = element(by.id('feedbackSubmittedMessage'));
  var submitFeedback = element(by.id('submitFeedback'));

  var EC = protractor.ExpectedConditions;

  var orderId;

  beforeEach(function () {
    browser.get('http://127.0.0.1:4200');
  });

  it('should have a title', function () {
    expect(browser.getTitle()).toEqual('Horde Delivery Service');
  });

  it('should get quote and submitting should show result page', function () {
    name.sendKeys('Test');
    link.sendKeys('http://evepraisal.com/e/11856686');

    submitLink.click();

    browser.wait(EC.presenceOf(quoteResult), 10000);
    expect(quoteResult.isPresent()).toBeTruthy();
    expect(quoteResult.getText()).toContain(".00 ISK");

    submitOrder.click();

    browser.wait(EC.presenceOf(orderSubmittedMessage), 3000);

    expect(orderSubmittedMessage.isPresent()).toBeTruthy();

    orderSubmittedMessage.getText().then(function (text) {
      orderId = text.match(/([0-9a-z]{24})/gm);
      expect(orderId.length).not.toBe(0);
    });
  });

  it('should show status box and retrieve requested status', function () {
    showStatusButton.click();

    browser.wait(EC.presenceOf(statusDiv), 500);
    expect(statusDiv.isPresent()).toBeTruthy();
  });

});
