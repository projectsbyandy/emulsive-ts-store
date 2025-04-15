# End-to-End tests
## Introduction
This is an E2E test framework for verifying functionality on the Emulsive Store at a user level. The tests are written using the Playwright framework and make use of the built-in test runner. The structure of the E2E framework incorporates loose coupling, allowing components to be reused.

## Structure
### Fixtures
Ui components are setup in the custom `uiTest` fixture, enabling access within the test. Other fixtures in future include data generators, client wrappers for API tests etc.

### Shared
All assets e.g. models, ui components needed to support the tests.

##### ___Models___
These detail the business entities within the Emulsive Store e.g. ProductOverview

##### ___Playwright Helpers___
All UI components extend the `Ui` class which provides them with playwright capabilities such as the Page.

The framework uses an extension method on the expect library to move and verify elements are in the viewport, ensuring checks performed on visual elements not just the DOM.

##### ___UI Components___
The mapping of functionality in the Emulsive store is broken down into logical UI components. It is interactions with these components that form a E2E user journey test.

Tests are coupled to abstractions (interfaces) enabling the underling concrete implementations (classes) to be switched out e.g. if a V1 and V2 version of the UI needs to be tested or the underling automation tooling needs to be changed. See the [Tutorials Section](#Tutorials) for more details.

##### ___Scenarios___
The E2E test scenarios use Playwright Test structure and runner. All tests have the `spec.test.ts` extension.

### Configs
- config to target is controlled by `ENV_IN_TEST` environment variable. If not defined, this is __local__ by default. See `playwright.config.ts` for more details.
- environment configs are located in `e2e\configs`.

## Running Tests
- install playwright runner extension in vscode
or 
- from cmd in the root directory `npm run test:playwright`
- `npx playwright tests --ui` to run within the playwright sandbox.

# Tutorials
## Adding new UI Component
Note a UI Component can be a functional area that makes up a screen or it can map the whole page (if the functionality is small enough).
1. Examine the existing folders within `ui-components` and identify if the ui component can be created in an existing area or requires a new logical section folder.
  e.g. Support of authentication is being added to the automation framework, the functionality is not currently supported so a new section folder `authentication` is created.

2. In the section folder, create an interface and detail the operations that will be performed using the ui component
  e.g. Create the interface file `IAuthentication.ts` with the operations. Remember to create any supporting models.
  ```typescript
  export interface IAuthentication extends ILoadVerification {
    performLogin(user: User): Promise<void>;
  }
  ```
3. Create an `internals` folder inside the section folder and write the concrete implementation of the interface above. Remember to extend `Ui` as this will provide access to the playwright `page`.
   - implement the hasLoaded method passing in the locators that can be used signify that component has fully loaded before continuing the test.
4. Make the section folder a module. In the new `index.ts` add export references to both the interface and class.
5. Add an export of the section folder to the existing `index.ts` found the root of the `ui-components` folder
  e.g. 
  ``` typescript
  export * from './authentication';
  ```
6. Update the UiTest fixture with a reference to the new ui component.

The UI component should now be accessible within the tests.

## Playwright extension methods