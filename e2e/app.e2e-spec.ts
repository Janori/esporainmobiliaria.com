import { EsporainmobiliariaPage } from './app.po';

describe('esporainmobiliaria App', () => {
  let page: EsporainmobiliariaPage;

  beforeEach(() => {
    page = new EsporainmobiliariaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
