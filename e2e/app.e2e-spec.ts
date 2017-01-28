import { CutthroatPage } from './app.po';

describe('cutthroat App', function() {
  let page: CutthroatPage;

  beforeEach(() => {
    page = new CutthroatPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
