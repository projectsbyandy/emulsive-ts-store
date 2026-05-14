import { uiTest } from "../fixtures/uiTest";
import { expect } from '@playwright/test';
import { LoginToast, Section } from "../shared/models";
import { dismissToast, hasToastAppeared, toastText } from "../shared/ui-components/common/toast";

uiTest.describe('Login tests', () => {
  uiTest('should display greeting when logged in', async ({ loginHelper, ui }) => {  
    // Arrange  
    await loginHelper.asTestUser();

    // Assert
    expect(await ui.header.UserManagement.getGreetingText()).toBe('Hello BobDoe');
  });

  uiTest('should display logout option when logged in', async ({ loginHelper, ui }) => {  
    // Arrange  
    await loginHelper.asTestUser();
    
    // Assert
    expect(await ui.header.UserManagement.isDisplayed(Section.Logout)).toBeTruthy();
  });

  uiTest('should not display SignIn option after logging in', async ({ loginHelper, ui }) => {
    // Arrange
    await loginHelper.asTestUser();

    // Assert
    expect(await ui.header.UserManagement.isDisplayed(Section.SignIn)).toBeFalsy();
  });

  uiTest('should display Login Failed toast when logging in with invalid credentials', async ({ ui, page }) => {
      // Arrange
      await ui.navigate.To(Section.Home);
      await ui.header.UserManagement.select(Section.SignIn);

      // Act
      await ui.signIn.login({email: "InvalidEmail@test.com", password: "InvalidPassword"});
    
      // Assert
      expect(await toastText(LoginToast.LoginFailed, page)).toBe("Login failed: Unable to login");
  });

   uiTest('should be able to dismiss a Login Failed toast', async ({ ui, page }) => {
      // Arrange
      await ui.navigate.To(Section.Home);
      await ui.header.UserManagement.select(Section.SignIn);
      await ui.signIn.login({email: "InvalidEmail@test.com", password: "InvalidPassword"});

      // Act
      await dismissToast(LoginToast.LoginFailed, page);

      // Assert
      expect(await hasToastAppeared(LoginToast.LoginFailed, page)).toBeFalsy();
  });
});