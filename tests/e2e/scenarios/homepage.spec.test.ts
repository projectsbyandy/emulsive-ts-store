import { test } from '../fixtures';
import { Section } from '../support/types';
import { expect } from '@playwright/test';


test.describe('Emulsive Store Home Page', () => {
  test.beforeEach(async ({ui}) => {
    await ui.navigate.To(Section.Home);
  });

  test('should return intro content', async ({ ui }) => {
    const content = await ui.home.getIntroContent();
    expect(content).toStrictEqual(
      {
        heading: 'Bringing film emulsive love!',
        introBody: 'We’re passionate about supporting photographers - big and small - and know what it means to have a shop you can trust and rely on.'
      }
    );
  });

  test.afterEach(async ({page}) => {
    await page.close();
  });
});