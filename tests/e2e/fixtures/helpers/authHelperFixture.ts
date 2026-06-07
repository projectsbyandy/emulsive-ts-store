import { Section } from "@/e2e/shared/models";
import { uiFixture } from "../uiTestFixture";
import { testConfig } from "@/e2e/shared/models/testConfig";

export const authHelper = uiFixture.extend<{
  loginHelper: {
    asTestUser(): Promise<void>;
  }
}>({
  loginHelper: async ({ ui }, use) => {
    const auth = {
      async asTestUser() {
        await ui.navigate.To(Section.Home);
        await ui.header.UserManagement.select(Section.SignIn);
        await ui.signIn.login({email: testConfig.userEmail, password: testConfig.userPassword});
        await ui.home.hasLoaded();      
      }
    }

    await use(auth);
  }
})