import { uiTest } from '../fixtures';
import { expect } from '@playwright/test';
import { type CarouselItem, type ProductOverview, Section } from '@e2e-shared/models';

uiTest.describe('Emulsive Store Home Page', () => {
  uiTest.beforeEach(async ({ui}) => {
    await ui.navigate.To(Section.Home);
  });

  uiTest('should return intro content', async ({ ui }) => {
    const {heading, introBody } = await ui.home.getIntroContent();
    expect(heading).toBe('Bringing film emulsive love!');
    expect(introBody).toBe('We’re passionate about supporting photographers - big and small - and know what it means to have a shop you can trust and rely on.')
  });

  uiTest('should return a link to Products', async ({ui}) => {
    await ui.home.selectProductLink();
    expect(await ui.products.Filters.hasLoaded()).toBe(true);
  })

  uiTest('should display the carousel', async ({ui})=> {
    const expectedCarouselInfo: CarouselItem[] = [
      {"imageUrl":"/src/assets/hero1.webp","visible":true},
      {"imageUrl":"/src/assets/hero2.webp","visible":true},
      {"imageUrl":"/src/assets/hero3.webp","visible":true},
      {"imageUrl":"/src/assets/hero4.webp","visible":true},
      {"imageUrl":"/src/assets/hero5.webp","visible":true}
    ];

    expect(await ui.home.getAllCarouselDetail(5)).toStrictEqual(expectedCarouselInfo);
  })

  uiTest('should display correct featured products', async ({ui}) => {
    const featureProducts = await ui.home.getFeaturedProductOverviews();

    const expectedFeaturedProducts: ProductOverview[] = [
      {
        id: 19,
        imageUrl: "http://localhost:3003/assets/KodakGold200-35mmFilm-36exp.webp",
        name: 'Gold 200',
        priceWithCurrency: '£9.50',
        detailsUrlPart: '/products/19'
      },
      {
        id: 6,
        imageUrl: "http://localhost:3003/assets/Ilford_HP5_Plus_-_35mm_Film_-_Retro_Packaging.webp",
        name: 'Hp5 Plus',
        priceWithCurrency: '£7.35',
        detailsUrlPart: '/products/6'
      },
      {
        id: 7,
        imageUrl: "http://localhost:3003/assets/kodak-portra-400-35mm-film-877035.webp",
        name: 'Portra 400',
        priceWithCurrency: '£12.90',
        detailsUrlPart: '/products/7'
      },
      {
        id: 24,
        imageUrl: "http://localhost:3003/assets/cinestill-800t-120-film-471304.webp",
        name: '800T',
        priceWithCurrency: '£19.00',
        detailsUrlPart: '/products/24'
      },
      {
        id: 25,
        imageUrl: "http://localhost:3003/assets/rollei-infrared-120-film-at-analogue-wonderland-922102.webp",
        name: 'Rollei Infrared',
        priceWithCurrency: '£19.00',
        detailsUrlPart: '/products/25'
      }
    ]

    expect(featureProducts).toStrictEqual(expectedFeaturedProducts);
  });
  
  uiTest.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== "passed") {
        await page.screenshot({ path: `screenshots/${testInfo.title}.png` });
    }
  });

  uiTest.afterEach(async ({page}) => {
    await page.close();
  });
});