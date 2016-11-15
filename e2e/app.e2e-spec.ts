import { AuthApp3Page } from './app.po';

describe('auth-app3 App', function() {
  let page: AuthApp3Page;

  beforeEach(() => {
    page = new AuthApp3Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
