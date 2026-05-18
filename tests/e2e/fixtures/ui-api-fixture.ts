import { apiTest } from './apiTest';
import { uiTest } from './uiTest';
import { mergeTests } from '@playwright/test';

export const uiApiTest = mergeTests(apiTest, uiTest);
export { expect } from '@playwright/test';