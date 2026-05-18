import { apiFixture } from './apiFixture';
import { uiTest } from './uiTest';
import { mergeTests } from '@playwright/test';

export const uiApiTest = mergeTests(apiFixture, uiTest);
export { expect } from '@playwright/test';