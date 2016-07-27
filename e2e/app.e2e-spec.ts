import { EveSupermarketUiPage } from './app.po';

describe('eve-supermarket-ui App', function() {
  let page: EveSupermarketUiPage;

  beforeEach(() => {
    page = new EveSupermarketUiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
