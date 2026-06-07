import { apiTest } from "@e2e-fixtures";
import { expect } from "@playwright/test";
import { LoginRequest } from "@e2e-shared/models";
import { testConfig } from "@/e2e/shared/models/testConfig";

apiTest.describe('Verify Login endpoint', () => {
  apiTest('should successfully login with valid credentials', async ({apiClientWithoutAuth}) => {
    // Arrange
    const validCredentials : LoginRequest = {
      email : testConfig.userEmail,
      password: testConfig.userPassword,
    };
    
    // Act
    const response = await apiClientWithoutAuth.auth.login(validCredentials.email, validCredentials.password);
    
    // Assert
    expect(response.status()).toBe(200);
    
    const { jwt } = await response.json();
    expect(jwt).toBeDefined();
  });

  apiTest('should return error with valid credentials', async ({apiClientWithoutAuth}) => {    
    // Arrange / Act
    const response = await apiClientWithoutAuth.auth.login("na@na.com", "na");
    
    // Assert
    expect(response.status()).toBe(401);
    
    const { error } = await response.json();
    expect(error).toBe("Unable to login");
  });
});
  