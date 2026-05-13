import { uiTest } from "../fixtures/uiTest";
import { expect } from '@playwright/test';
import { Section } from "../shared/models";

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

  uiTest('should not display Register option after logging in', async ({ ui }) => {
      // Arrange
      await ui.navigate.To(Section.Home);
      await ui.header.UserManagement.select(Section.SignIn);

      // Act
      await ui.signIn.login({email: "InvalidEmail@test.com", password: "InvalidPassword"});
    
      // Assert
      // TODO: immplent toast manager and add check for toast error message here.
  });
});