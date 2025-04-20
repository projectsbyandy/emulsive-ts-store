import { mergeTests } from "@playwright/test";
import { authHelper } from "./helpers/authHelperFixture";
import { productsHelper } from "./helpers/productsHelperFixture";

export const uiTest = mergeTests(authHelper, productsHelper);