import { test as base } from 'playwright/test';
import { Home } from '../support/ui-components/home';
import { Navigate } from '../support/ui-components/navigate';

export const uiFixtures = base.extend<{
  ui: {
    home: Home,
    navigate: Navigate
  };
 }>({
  ui: async ({page}, use) => {
    await use({
      home: new Home(page),
      navigate: new Navigate(page)
    })
  }
});

export const test = uiFixtures;