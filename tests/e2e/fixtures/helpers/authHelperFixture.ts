import { Section } from "@/e2e/shared/models";
import { uiFixture } from "../uiTestFixture";
import z from 'zod';

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
        await ui.signIn.login({email: z.string().parse(process.env.USER_EMAIL), password: z.string().parse(process.env.USER_PASSWORD)});
        await ui.home.hasLoaded();      
      }
    }

    await use(auth);
  }
})