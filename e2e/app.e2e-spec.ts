import { PerformancePlaygroundPage } from './app.po';

describe('performance-playground App', () => {
  let page: PerformancePlaygroundPage;

  beforeEach(() => {
    page = new PerformancePlaygroundPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
