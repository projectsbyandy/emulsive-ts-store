import { ApiClient } from '../shared/api-components/apiClient.ts';
import { test as base, request as playwrightRequest } from '@playwright/test';
import { z } from 'zod';

type ApiFixtures = {
  apiClient: ApiClient;
  apiClientWithoutAuth: ApiClient;
};

const baseConfig = {
  baseURL: process.env.API_BASE_URL,
  extraHTTPHeaders: {
    'Content-Type': 'application/json',
  },
};

export const apiFixture = base.extend<ApiFixtures>({
  // eslint-disable-next-line no-empty-pattern
  apiClientWithoutAuth: async ({}, use) => {
    const context = await playwrightRequest.newContext(baseConfig);
    await use(new ApiClient(context));
    await context.dispose();
  },

  apiClient: async ({ apiClientWithoutAuth }, use) => {
    const { jwt } = await apiClientWithoutAuth.auth.login(
      z.string().parse(process.env.USER_EMAIL),
      z.string().parse(process.env.USER_PASSWORD),
    );

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
