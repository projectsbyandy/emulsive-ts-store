import { uiTest } from '../fixtures';
import { expect } from '@playwright/test';
import { ProductOverview, Section } from '../support/models';


uiTest.describe('Emulsive Store Home Page', () => {
  uiTest.beforeEach(async ({ui}) => {
    await ui.navigate.To(Section.Home);
  });

  uiTest('should return intro content', async ({ ui }) => {
    const {heading, introBody } = await ui.home.getIntroContent();
    expect(heading).toBe('Bringing film emulsive love!');
    expect(introBody).toBe('We’re passionate about supporting photographers - big and small - and know what it means to have a shop you can trust and rely on.')
  });

  uiTest('should display correct featured products', async ({ui}) => {
    const featureProducts = await ui.home.getFeaturedProductOverviews();

    const expectedFeaturedProducts: ProductOverview[] = [
      {
        id: 19,
        imageUrl: 'https://iili.io/2iqmyF9.webp',
        name: 'Gold 200',
        priceWithCurrency: '£9.50',
        detailsUrlPart: '/products/19'
      },
      {
        id: 6,
        imageUrl: 'https://iili.io/2iqmbGS.webp',
        name: 'Hp5 Plus',
        priceWithCurrency: '£7.35',
        detailsUrlPart: '/products/6'
      },
      {
        id: 7,
        imageUrl: 'https://iili.io/2iqmm67.webp',
        name: 'Portra 400',
        priceWithCurrency: '£12.90',
        detailsUrlPart: '/products/7'
      },
      {
        id: 24,
        imageUrl: 'https://iili.io/2iqmiyG.webp',
        name: '800T',
        priceWithCurrency: '£19.00',
        detailsUrlPart: '/products/24'
      },
      {
        id: 25,
        imageUrl: 'https://iili.io/2iqm43X.webp',
        name: 'Rollei Infrared',
        priceWithCurrency: '£19.00',
        detailsUrlPart: '/products/25'
      }
    ]

    expect(featureProducts).toStrictEqual(expectedFeaturedProducts);
  });

  uiTest.afterEach(async ({page}) => {
    await page.close();
  });
});