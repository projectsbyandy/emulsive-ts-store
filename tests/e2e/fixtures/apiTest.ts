import { ApiClient } from '../shared/api-components/apiClient.ts';
import { test as base, request as playwrightRequest } from '@playwright/test';
import { testConfig } from '../shared/models/testConfig.ts';

type Api = {
  apiClient: ApiClient;
  apiClientWithoutAuth: ApiClient;
};

const baseConfig = {
  baseURL: testConfig.apiBaseUrl,
  extraHTTPHeaders: {
    'Content-Type': 'application/json',
  },
};

export const apiTest = base.extend<Api>({
  // eslint-disable-next-line no-empty-pattern
  apiClientWithoutAuth: async ({}, use) => {
    const context = await playwrightRequest.newContext(baseConfig);

    await use(new ApiClient(context));
    await context.dispose();
  },

  apiClient: async ({ apiClientWithoutAuth }, use) => {
    const response = await apiClientWithoutAuth.auth.login(
      testConfig.userEmail,
      testConfig.userPassword
    );

    const { jwt } = await response.json();
    const context = await playwrightRequest.newContext({
      ...baseConfig,
      extraHTTPHeaders: {
        ...baseConfig.extraHTTPHeaders,
        Authorization: `Bearer ${jwt}`,
      },
    });

    await use(new ApiClient(context));
    await context.dispose();
  },
});
