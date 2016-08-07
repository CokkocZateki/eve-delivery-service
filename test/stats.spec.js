// spec.js
describe('Protractor Demo App', function () {
  var statsDetails = element(by.id('statsDetails'));

  var EC = protractor.ExpectedConditions;

  beforeEach(function () {
    browser.get('http://127.0.0.1:4200');
  });

  it('stats are loaded', function () {
    browser.wait(EC.presenceOf(statsDetails), 5000);
    expect(statsDetails.isPresent()).toBeTruthy();
    expect(statsDetails.getText()).toContain("Average Delivery Time");
    expect(statsDetails.getText()).toContain("Open Requests");
    expect(statsDetails.getText()).toContain("Processing");
    expect(statsDetails.getText()).toContain("Completed");
  });

});
