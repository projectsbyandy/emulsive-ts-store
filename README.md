# Emulsive Store
The one stop location for all of your film needs

# Implementation
Typescript 
- with vite, react and shadcn for the store
- express for backend
    - Using HMAC (password handling) and jwt (auth)
    - Fake repo
    - Mongo repo
- Jest API tests
  - note to switch to using mocks set the environment variable `process.env.Emulsive_Fake` or update the `/api/appConfig.json`
- Playwright E2E tests

# Setup
1. From the location `emulsive-store`
2. Run `npm install`

# Start
- start full stack `npm run all`
  - If there are any issues with running concurrently install globally `npm i -g concurrently`
- api only `npm run api`
- frontend only `npm run ui`
- tests `npm run tests`

## API Integration test notes
- various environment variables defined in `jest.env-variables.js` have been setup to enable the api to work with supertest
  - e.g. 
    - supertest will not handle transient cookies when the domain is set to localhost
    - tests are decoupled from external dependencies like db so use fakes
- only jest tests within the `tests/integration` directory and must have `.api.test.ts` extension will be picked up.

## E2E Integration test notes
- Configuration
  - config to target is controlled by `ENV_IN_TEST` environment variable. If not defined, this is local by default. See `playwright.config.ts` for more details.
  - environment configs are located in `e2e\configs`.
- To run
  - install playwright runner extension in vscode
  - or from cmd in the root directory `npm run test:playwright`

## Config support
The api uses config values defined in `apiConfig.json`

To read load the config
```typescript
const config = await getApiConfig();
```

The front end uses config handling built into Vite. Please see Testing notes section for note details.

## Testing notes
Added support for delaying rendering of UI to enable more synchronization testing scenarios.

By default the vite runs in QA mode as defined in `vite.config.ts`

The store configs are stored in the folder `storeConfig`. In order for variables to be made available to Vite, they should be prefixed with VITE e.g. VITE_QA_TEST_DELAY

To use the variables
```typescript
  if (import.meta.env.VITE_QA_TEST_DELAY)
    await Sleep(1000);
```

# External dependencies
- film product images are served from https://freeimage.host/