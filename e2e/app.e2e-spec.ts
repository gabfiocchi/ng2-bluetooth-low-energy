import { Ng2BlePage } from './app.po';

describe('ng2-ble App', () => {
  let page: Ng2BlePage;

  beforeEach(() => {
    page = new Ng2BlePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
