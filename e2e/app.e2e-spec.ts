import { WsnV1Page } from './app.po';

describe('wsn-v1 App', () => {
  let page: WsnV1Page;

  beforeEach(() => {
    page = new WsnV1Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
