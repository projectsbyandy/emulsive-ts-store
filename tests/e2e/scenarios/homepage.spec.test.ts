import { uiTest } from '../fixtures';
import { Section } from '../support/types';
import { expect } from '@playwright/test';


uiTest.describe('Emulsive Store Home Page', () => {
  uiTest.beforeEach(async ({ui}) => {
    await ui.navigate.To(Section.Home);
  });

  uiTest('should return intro content', async ({ ui }) => {
    const {heading, introBody } = await ui.home.getIntroContent();
    expect(heading).toBe('Bringing film emulsive love!');
    expect(introBody).toBe('We’re passionate about supporting photographers - big and small - and know what it means to have a shop you can trust and rely on.')
  });

  uiTest.afterEach(async ({page}) => {
    await page.close();
  });
});